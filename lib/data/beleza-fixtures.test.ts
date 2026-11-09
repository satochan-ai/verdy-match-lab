import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { belezaFixtures, toBelezaSeasonHistoryEntry } from "./beleza-fixtures.ts";
import { belezaActualLineup, belezaActualFormation, inacKobeActualLineup, belezaElfenMatch } from "../mock/beleza.ts";
import { validateFixtures } from "./fixture-validation.ts";
import { weLeagueStandings } from "../mock/beleza-standings.ts";

test("BELEZA fixture collection is valid", () => {
  assert.equal(validateFixtures(belezaFixtures).length, 0);
  assert.equal(belezaFixtures.length, 17);
  // /beleza/matches/[id] now renders beleza-match-1/2/3/4/5 (archived) individually in addition
  // to the current snapshot (beleza-next-4, EL埼玉), so every finished BELEZA match carries a
  // real (non-fabricated) detailMatchId equal to its own id.
  for (const id of ["beleza-match-1", "beleza-match-2", "beleza-match-3", "beleza-next-4", "beleza-match-4", "beleza-match-5"]) {
    assert.equal(belezaFixtures.find((fixture) => fixture.id === id)?.detailMatchId, id);
  }
});

test("BELEZA vs INAC official live lineups preserve confirmed counts and formation", () => {
  assert.equal(belezaActualLineup.formation, "3-4-2-1");
  assert.equal(Object.values(belezaActualLineup.starters).flat().length, 11);
  assert.equal(Object.values(belezaActualLineup.bench).flat().length, 6);
  assert.equal(Object.values(inacKobeActualLineup.starters).flat().length, 11);
  assert.equal(Object.values(inacKobeActualLineup.bench).flat().length, 7);
  assert.equal(belezaActualFormation.formation, "3-4-2-1");
  assert.equal(belezaFixtures.find((fixture) => fixture.id === "beleza-next-3")?.status, "finished");
});

test("BELEZA actual formation preserves the confirmed DF and MF horizontal order", () => {
  assert.deepEqual(belezaActualFormation.starters.slice(1, 4).map((player) => `${player.number} ${player.name}`), [
    "5 松田 紫野", "3 村松 智子", "32 松岡 瑛茉",
  ]);
  assert.deepEqual(belezaActualFormation.starters.slice(4, 8).map((player) => `${player.number} ${player.name}`), [
    "7 北村 菜々美", "6 隅田 凜", "35 須長 穂乃果", "24 伊藤 琴音",
  ]);
});

test("BELEZA season history entries carry detailMatchId through for mobile/desktop history links", () => {
  const history = getSeasonHistory(belezaFixtures).map(toBelezaSeasonHistoryEntry);
  assert.equal(history.length, 14);
});

test("BELEZA NEXT advances to the official 11.14 新潟L home match after the finished 11.07 N相模原 match", () => {
  const asOf = new Date("2026-11-09T12:00:00+09:00");
  const nextFixture = getNextFixture(belezaFixtures, asOf);
  assert.equal(nextFixture?.id, "beleza-next-14");
  assert.equal(nextFixture?.opponentName, "アルビレックス新潟レディース");
  assert.equal(nextFixture?.kickoffAt, "2026-11-14T15:00:00+09:00");
  // /beleza のNEXT MATCH詳細CTA（app/beleza/page.tsx）は、この一致を条件に
  // /beleza/matches/${belezaElfenMatch.id} へのリンクを表示する。
  assert.notEqual(nextFixture?.id, belezaElfenMatch.id);
  const upcoming = getUpcomingFixtures(belezaFixtures, asOf, 5);
  // WEリーグ公式で確認できた未終了日程は3件。未確認の日程で5件に補完しない。
  assert.equal(upcoming.length, 3);
  assert.equal(upcoming.every((fixture) => fixture.status === "scheduled" && fixture.score === undefined), true);
  assert.deepEqual(upcoming.map((fixture) => fixture.kickoffAt), [
    "2026-11-14T15:00:00+09:00", "2026-11-18T14:00:00+09:00", "2026-11-23T15:00:00+09:00",
  ]);
  assert.deepEqual(upcoming.map((fixture) => `${fixture.opponentName}|${fixture.competition.name}|${fixture.competition.round}|${fixture.isHome ? "H" : "A"}|${fixture.venue}|${fixture.dateLabel}`), [
    "アルビレックス新潟レディース|2026/27 WEリーグ|第9節|H|味の素フィールド西が丘|11.14 SAT",
    "マイナビ仙台|2026/27 WEリーグ|第10節|A|キューアンドエースタジアムみやぎ|11.18 WED",
    "INAC神戸レオネッサ|2026/27 WEリーグ|第11節|H|味の素フィールド西が丘|11.23 MON",
  ]);
  assert.deepEqual(upcoming.map((fixture) => fixture.sourceUrl), [
    "https://weleague.jp/matches/2026111411/", "https://weleague.jp/matches/2026111804/", "https://weleague.jp/matches/2026112304/",
  ]);
  // 詳細ページ未作成の予定試合へはリンクしない。
  assert.equal(upcoming.every((fixture) => fixture.detailMatchId === undefined), true);
  assert.equal(new Set(upcoming.map((fixture) => fixture.id)).size, 3);
});

test("BELEZA 11.07 N相模原 official result is finished as an away 0-1 loss linked to its own detail page", () => {
  const fixture = belezaFixtures.find((f) => f.id === "beleza-next-13")!;
  assert.deepEqual(
    [fixture.status, fixture.kickoffAt, fixture.isHome, fixture.venue, fixture.competition.name, fixture.competition.round, fixture.score],
    ["finished", "2026-11-07T14:03:00+09:00", false, "相模原ギオンスタジアム", "2026/27 WEリーグ", "第8節", { home: 1, away: 0 }],
  );
  assert.equal(fixture.sourceUrl, "https://weleague.jp/matches/2026110725/");
  assert.equal(fixture.detailMatchId, "beleza-next-13");
  const entry = toBelezaSeasonHistoryEntry(fixture);
  assert.deepEqual([entry.homeTeamName, entry.awayTeamName, entry.homeScore, entry.awayScore, entry.result], [
    "ノジマステラ神奈川相模原", "日テレ・東京ヴェルディベレーザ", 1, 0, "loss",
  ]);
});

test("BELEZA WE League and Kracie Cup fixtures stay separated and the league record matches the official table", () => {
  const finished = getSeasonHistory(belezaFixtures);
  const league = finished.filter((f) => f.competition.name === "2026/27 WEリーグ");
  const cup = finished.filter((f) => f.competition.name.includes("クラシエカップ"));
  assert.equal(league.length + cup.length, finished.length);
  assert.deepEqual(league.map((f) => f.competition.round).sort(), ["第1節", "第2節", "第3節", "第4節", "第5節", "第6節", "第7節", "第8節"].sort());
  assert.equal(cup.length, 6);
  const tally = league.map(toBelezaSeasonHistoryEntry).reduce((acc, e) => {
    const own = e.homeTeamName === "日テレ・東京ヴェルディベレーザ" ? e.homeScore : e.awayScore;
    const other = e.homeTeamName === "日テレ・東京ヴェルディベレーザ" ? e.awayScore : e.homeScore;
    return { w: acc.w + (e.result === "win" ? 1 : 0), d: acc.d + (e.result === "draw" ? 1 : 0), l: acc.l + (e.result === "loss" ? 1 : 0), gf: acc.gf + own, ga: acc.ga + other };
  }, { w: 0, d: 0, l: 0, gf: 0, ga: 0 });
  const official = weLeagueStandings.entries.find((e) => e.teamName === "日テレ・東京ヴェルディベレーザ")!;
  assert.deepEqual(tally, { w: official.wins, d: official.draws, l: official.losses, gf: official.goalsFor, ga: official.goalsAgainst });
  assert.equal(official.played, league.length);
});

test("BELEZA LAST, HISTORY and 10.03 浦和 result are derived", () => {
  const last = getLatestFinishedFixture(belezaFixtures)!;
  assert.equal(last.opponentName, "ノジマステラ神奈川相模原");
  assert.deepEqual(last.score, { home: 1, away: 0 });
  assert.equal(toBelezaSeasonHistoryEntry(last).result, "loss");
  const history = getSeasonHistory(belezaFixtures);
  assert.equal(history.length, 14);
  assert.deepEqual(history.map((fixture) => fixture.opponentName), [
    "ノジマステラ神奈川相模原", "RB大宮アルディージャWOMEN", "セレッソ大阪ヤンマーレディース", "ちふれASエルフェン埼玉", "サンフレッチェ広島レジーナ", "サンフレッチェ広島レジーナ", "三菱重工浦和レッズレディース", "セレッソ大阪ヤンマーレディース", "アルビレックス新潟レディース", "ちふれASエルフェン埼玉", "INAC神戸レオネッサ",
    "三菱重工浦和レッズレディース", "AC長野パルセイロ・レディース", "ジェフユナイテッド市原・千葉レディース",
  ]);
  assert.equal(history.filter((fixture) => fixture.id === "beleza-match-3").length, 1);
});

test("BELEZA INAC official result is represented once in history", () => {
  assert.equal(getSeasonHistory(belezaFixtures).filter((fixture) => fixture.id === "beleza-next-3").length, 1);
});
