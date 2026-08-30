import type { Match } from "@/types/domain";
import { isDbConfigured, sql } from "@/lib/db/server";
import * as mock from "@/lib/mock/matches";
import { mapMatch } from "./mappers";
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

export async function getMatchDetail(id: string): Promise<Match | undefined> {
  if (!isDbConfigured()) {
    return mock.getMatchById(id);
  }

  const db = sql();
  const rows = (await db`${db.unsafe(MATCH_WITH_TEAMS_SQL)} where m.id = ${id}`) as FlatMatchRow[];

  if (rows.length === 0) return undefined;
  return assembleMatch(toMatchRow(rows[0]));
}

export async function getNextMatch(): Promise<Match | null> {
  if (!isDbConfigured()) {
    return mock.getNextMatch();
  }

  const db = sql();
  const rows = (await db`
    ${db.unsafe(MATCH_WITH_TEAMS_SQL)}
    where m.status = 'scheduled'
    order by m.kickoff_at asc
    limit 1
  `) as FlatMatchRow[];

  // scheduledな試合が無い場合はnullを返す（過去試合をNEXT MATCHとして返さない）。
  if (rows.length === 0) return null;
  return assembleMatch(toMatchRow(rows[0]));
}

/** トップ画面の「直近の試合」表示用。三策・分析は不要なので軽量クエリのみ。 */
export async function getRecentFinishedMatchSummary(): Promise<Match> {
  if (!isDbConfigured()) {
    return mock.getRecentFinishedMatch();
  }

  const db = sql();
  const rows = (await db`
    ${db.unsafe(MATCH_WITH_TEAMS_SQL)}
    where m.status = 'finished'
    order by m.kickoff_at desc
    limit 1
  `) as FlatMatchRow[];

  if (rows.length === 0) return mock.getRecentFinishedMatch();
  return mapMatch(toMatchRow(rows[0]), [], [], []);
}

/** アーカイブ一覧用。三策・分析は不要なので軽量クエリのみ（件数に関わらず1クエリ）。 */
export async function getArchiveMatches(): Promise<Match[]> {
  if (!isDbConfigured()) {
    return mock.getArchiveMatches();
  }

  const db = sql();
  const rows = (await db`
    ${db.unsafe(MATCH_WITH_TEAMS_SQL)}
    where m.status = 'finished'
    order by m.kickoff_at desc
  `) as FlatMatchRow[];

  return rows.map((row) => mapMatch(toMatchRow(row), [], [], []));
}
