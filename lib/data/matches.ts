import type { Match } from "@/types/domain";
import type { CommonFixture } from "@/lib/types/fixture";
import { isDbConfigured, sql } from "@/lib/db/server";
import * as mock from "@/lib/mock/matches";
import { nagoyaResult } from "@/lib/mock/top-nagoya-result";
import { mapMatch } from "./mappers";
import { topFixtures } from "./top-fixtures";
import { enrichMatchFixtureMeta, enrichMatchesFixtureMeta } from "./top-match-fixture-meta";
import type { MatchNoteRow, MatchRow, PredictionRow, TeamProfileRow } from "./dbTypes";

/**
 * matches行1件を、home_team/away_teamを結合した状態（MatchRow形状）で取得するSQL。
 * PostgRESTの埋め込みリレーション構文は使わず、明示的なJOINで書く。
 */
const MATCH_WITH_TEAMS_SQL = `
  select
    m.id, m.home_team_id, m.away_team_id, m.kickoff_at, m.venue, m.status,
    m.home_score, m.away_score, m.elapsed_minutes,
    ht.id as home_team__id, ht.name as home_team__name,
    ht.short_name as home_team__short_name, ht.is_verdy as home_team__is_verdy,
    at.id as away_team__id, at.name as away_team__name,
    at.short_name as away_team__short_name, at.is_verdy as away_team__is_verdy
  from matches m
  join teams ht on ht.id = m.home_team_id
  join teams at on at.id = m.away_team_id
`;

interface FlatMatchRow {
  id: string;
  home_team_id: string;
  away_team_id: string;
  kickoff_at: string;
  venue: string | null;
  status: MatchRow["status"];
  home_score: number | null;
  away_score: number | null;
  elapsed_minutes: number | null;
  home_team__id: string;
  home_team__name: string;
  home_team__short_name: string | null;
  home_team__is_verdy: boolean;
  away_team__id: string;
  away_team__name: string;
  away_team__short_name: string | null;
  away_team__is_verdy: boolean;
}

function toMatchRow(row: FlatMatchRow): MatchRow {
  return {
    id: row.id,
    home_team_id: row.home_team_id,
    away_team_id: row.away_team_id,
    kickoff_at: row.kickoff_at,
    venue: row.venue,
    status: row.status,
    home_score: row.home_score,
    away_score: row.away_score,
    elapsed_minutes: row.elapsed_minutes,
    home_team: {
      id: row.home_team__id,
      name: row.home_team__name,
      short_name: row.home_team__short_name,
      is_verdy: row.home_team__is_verdy,
    },
    away_team: {
      id: row.away_team__id,
      name: row.away_team__name,
      short_name: row.away_team__short_name,
      is_verdy: row.away_team__is_verdy,
    },
  };
}

/** team_profiles / predictions / match_notesを並行取得し、ドメイン型へ組み立てる。 */
async function assembleMatch(matchRow: MatchRow): Promise<Match> {
  const db = sql();
  const [profileRows, predictionRows, noteRows] = await Promise.all([
    db`select * from team_profiles where match_id = ${matchRow.id}` as unknown as Promise<TeamProfileRow[]>,
    db`select * from predictions where match_id = ${matchRow.id} order by order_no` as unknown as Promise<PredictionRow[]>,
    db`select * from match_notes where match_id = ${matchRow.id}` as unknown as Promise<MatchNoteRow[]>,
  ]);

  return mapMatch(matchRow, profileRows, predictionRows, noteRows);
}

const uuidPattern = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

// teams.id / matches.id はDBで生成するUUID。公式クラブIDや日程の文字列IDとの対応表はない。
// 名前の照合には確認済みの別名だけを使う。名古屋の正式名称は https://nagoya-grampus.jp/club/overview/ を参照。
const clubAliases: ReadonlyMap<string, string> = new Map([
  ["名古屋", "名古屋グランパス"],
  ["名古屋グランパスエイト", "名古屋グランパス"],
  ["水戸", "水戸ホーリーホック"],
]);

function canonicalClubName(name: string) {
  const normalized = name.normalize("NFKC").trim();
  return clubAliases.get(normalized) ?? normalized;
}

const dayInMs = 86_400_000;
const jstOffsetInMs = 9 * 60 * 60 * 1_000;

function getJstDay(kickoffAt: string) {
  const epoch = Date.parse(kickoffAt);
  if (!Number.isFinite(epoch)) return undefined;
  const start = Math.floor((epoch + jstOffsetInMs) / dayInMs) * dayInMs - jstOffsetInMs;
  return { start, end: start + dayInMs };
}

function isNagoyaResultRow(row: FlatMatchRow) {
  // 開催日とホーム側を確認し、14:03と14:05のような時刻差を許容する。
  const matchday = getJstDay(nagoyaResult.kickoffAt)!;
  const kickoff = Date.parse(row.kickoff_at);
  return kickoff >= matchday.start && kickoff < matchday.end
    && row.home_team__is_verdy === true && row.away_team__is_verdy === false
    && canonicalClubName(row.away_team__name) === nagoyaResult.awayTeam.name;
}

export async function getMatchDetail(id: string): Promise<Match | undefined> {
  if (id === nagoyaResult.id) return nagoyaResult;

  if (!isDbConfigured() || !uuidPattern.test(id)) {
    const match = mock.getMatchById(id);
    return match ? enrichMatchFixtureMeta(match, topFixtures) : undefined;
  }

  const db = sql();
  const rows = (await db`${db.unsafe(MATCH_WITH_TEAMS_SQL)} where m.id = ${id}`) as FlatMatchRow[];

  if (rows.length === 0) return undefined;
  if (isNagoyaResultRow(rows[0])) return nagoyaResult;
  return enrichMatchFixtureMeta(await assembleMatch(toMatchRow(rows[0])), topFixtures);
}

/** 直近の確定結果に対応する日程を、NEXTやLIVEの候補から外す。 */
export function getTopFixturesAfterResult(result: Match): CommonFixture[] {
  if (!isDbConfigured() || result.status !== "finished" || result.homeScore == null || result.awayScore == null) return topFixtures;
  const matchday = getJstDay(result.kickoffAt);
  if (!matchday) return topFixtures;

  const opponent = result.isVerdyHome ? result.awayTeam : result.homeTeam;
  const name = canonicalClubName(opponent.name);
  const scheduled = topFixtures.filter((fixture) => fixture.status === "scheduled");
  const linkedFixture = scheduled.find((fixture) => fixture.id === result.id || fixture.detailMatchId === result.id);
  const candidates = scheduled.filter((fixture) => {
    const kickoff = Date.parse(fixture.kickoffAt ?? "");
    return fixture.kickoffStatus === "confirmed" && fixture.isHome === result.isVerdyHome
      && kickoff >= matchday.start && kickoff < matchday.end
      && canonicalClubName(fixture.opponentName) === name;
  });
  const completed = linkedFixture ?? (candidates.length === 1 ? candidates[0] : undefined);
  return completed ? topFixtures.filter((fixture) => fixture !== completed) : topFixtures;
}

/** 表示中の日程に対応する試合だけを、戦術表示用に取得する。 */
export async function getScheduledMatchForFixture(fixture: CommonFixture | undefined): Promise<Match | null> {
  if (!fixture?.kickoffAt || fixture.kickoffStatus !== "confirmed" || fixture.status !== "scheduled") return null;

  if (!isDbConfigured()) {
    const match = mock.getMatchById(fixture.detailMatchId ?? fixture.id);
    return match?.status === "scheduled" ? enrichMatchFixtureMeta(match, topFixtures) : null;
  }

  const matchday = getJstDay(fixture.kickoffAt);
  const opponentName = canonicalClubName(fixture.opponentName);
  if (!matchday || !opponentName || opponentName === "対戦相手未定") return null;

  const fixtureDbId = [fixture.detailMatchId, fixture.id].find((id) => id && uuidPattern.test(id));
  const db = sql();
  const dayStart = new Date(matchday.start).toISOString();
  const dayEnd = new Date(matchday.end).toISOString();
  const rows = (await db`
    ${db.unsafe(MATCH_WITH_TEAMS_SQL)}
    where m.status = 'scheduled'
      and m.kickoff_at >= ${dayStart}::timestamptz and m.kickoff_at < ${dayEnd}::timestamptz
      and ht.is_verdy = ${fixture.isHome} and at.is_verdy = ${!fixture.isHome}
  `) as FlatMatchRow[];

  const linkedRow = rows.find((row) => row.id === fixtureDbId);
  const candidates = rows.filter((row) => canonicalClubName(
    fixture.isHome ? row.away_team__name : row.home_team__name,
  ) === opponentName);
  // 同日に対戦カードが複数ある場合、明示的な試合IDがなければ戦術を出さない。
  const row = linkedRow ?? (candidates.length === 1 ? candidates[0] : undefined);
  return row ? enrichMatchFixtureMeta(await assembleMatch(toMatchRow(row)), topFixtures) : null;
}

/** トップ画面の「直近の試合」表示用。三策・分析は不要なので軽量クエリのみ。 */
export async function getRecentFinishedMatchSummary(): Promise<Match> {
  if (!isDbConfigured()) {
    return enrichMatchFixtureMeta(mock.getRecentFinishedMatch(), topFixtures);
  }

  const db = sql();
  const rows = (await db`
    ${db.unsafe(MATCH_WITH_TEAMS_SQL)}
    where m.status = 'finished'
    order by m.kickoff_at desc
    limit 1
  `) as FlatMatchRow[];

  if (rows.length === 0) return mock.getRecentFinishedMatch();
  if (isNagoyaResultRow(rows[0]) || Date.parse(rows[0].kickoff_at) <= Date.parse(nagoyaResult.kickoffAt)) return nagoyaResult;
  return enrichMatchFixtureMeta(mapMatch(toMatchRow(rows[0]), [], [], []), topFixtures);
}

/** アーカイブ一覧用。三策・分析は不要なので軽量クエリのみ（件数に関わらず1クエリ）。 */
export async function getArchiveMatches(): Promise<Match[]> {
  if (!isDbConfigured()) {
    return enrichMatchesFixtureMeta(mock.getArchiveMatches(), topFixtures);
  }

  const db = sql();
  const rows = (await db`
    ${db.unsafe(MATCH_WITH_TEAMS_SQL)}
    where m.status = 'finished'
    order by m.kickoff_at desc
  `) as FlatMatchRow[];

  const matches = rows.filter((row) => !isNagoyaResultRow(row)).map((row) => mapMatch(toMatchRow(row), [], [], []));
  matches.push(nagoyaResult);
  matches.sort((a, b) => Date.parse(b.kickoffAt) - Date.parse(a.kickoffAt));
  return enrichMatchesFixtureMeta(matches, topFixtures);
}
