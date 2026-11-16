import assert from "node:assert/strict";
import test from "node:test";
import {
  belezaNiigataLeagueMatch as match, belezaNiigataLeagueHalfScores as halves, belezaNiigataLeagueGoals as goals,
  belezaNiigataLeagueCards as cards, belezaNiigataLeagueSubstitutions as subs, belezaNiigataLeagueOfficialRecord as record,
  belezaNiigataLeagueStats as stats, belezaNiigataLeagueActualLineup as own, niigataLeagueActualLineup as opponent,
  niigataLeagueTeam, belezaNiigataLeagueFormation as formation, belezaNiigataLeagueReview as review,
  belezaNiigataLeagueViewerNotes as notes, belezaNiigataLeagueManagers as managers,
} from "./beleza-niigata-league.ts";
import { belezaTeam, belezaUpcomingMatches } from "./beleza.ts";
import { belezaFixtures, toBelezaSeasonHistoryEntry, toBelezaUpcomingMatch } from "../data/beleza-fixtures.ts";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "../data/fixture-selectors.ts";
import { getCategoryDetailHref } from "../data/category-match-details.ts";

const now = new Date("2026-11-17T12:00:00+09:00");

test("11/14 新潟L official result reuses beleza-next-14 as a home 2-1 win kicked off at 15:04", () => {
  assert.deepEqual(
    [match.id, match.competition, match.kickoffAt, match.kickoffLabel, match.venue, match.isBelezaHome, match.homeTeamName, match.awayTeamName, match.homeScore, match.awayScore],
    ["beleza-next-14", "2026/27 WEリーグ 第9節", "2026-11-14T15:04:00+09:00", "15:04", "味の素フィールド西が丘", true, belezaTeam.name, "アルビレックス新潟レディース", 2, 1],
  );
  assert.deepEqual(halves, { firstHalf: "1-1", secondHalf: "1-0" });
  // 前後半の合計が最終スコアと一致する。
  const [h1, a1] = halves.firstHalf.split("-").map(Number); const [h2, a2] = halves.secondHalf.split("-").map(Number);
  assert.deepEqual([h1 + h2, a1 + a2], [match.homeScore, match.awayScore]);
  // 試合は重複登録しない（同じIDのfixtureは1件のみ）。
  assert.equal(belezaFixtures.filter((f) => f.id === match.id).length, 1);
  assert.equal(belezaUpcomingMatches.filter((f) => f.id === match.id).length, 1);
});

test("goals are attributed to the correct team and agree with the final score", () => {
  assert.deepEqual(goals.map((g) => [g.minute, g.scorer, g.team]), [
    ["3'", "城和 怜奈", niigataLeagueTeam.name], ["13'", "式田 和", belezaTeam.name], ["57'", "塩越 柚歩", belezaTeam.name],
  ]);
  assert.equal(goals.filter((g) => g.team === belezaTeam.name).length, match.homeScore);
  assert.equal(goals.filter((g) => g.team === niigataLeagueTeam.name).length, match.awayScore);
  assert.deepEqual(cards, []);
});

test("official squads: 11 starters each, bench and substitutions consistent", () => {
  for (const [lineup, team, benchSize] of [[own, belezaTeam.name, 7], [opponent, niigataLeagueTeam.name, 7]] as const) {
    const starters = Object.values(lineup.starters).flat();
    const bench = Object.values(lineup.bench).flat();
    assert.equal(starters.length, 11);
    assert.equal(bench.length, benchSize);
    assert.equal(new Set([...starters, ...bench].map((p) => p.split(" ")[0])).size, 11 + benchSize);
    assert.equal(lineup.formation, undefined);
    const changes = subs.filter((s) => s.team === team);
    for (const change of changes) {
      assert.ok(starters.some((p) => p.endsWith(` ${change.playerOut}`)), change.playerOut);
      assert.ok(bench.some((p) => p.endsWith(` ${change.playerIn}`)), change.playerIn);
    }
    assert.equal(new Set(changes.map((c) => c.playerOut)).size, changes.length);
  }
  assert.deepEqual(subs.map((s) => [s.minute, s.team === belezaTeam.name ? "NB" : "NL", s.playerOut, s.playerIn]), [
    ["HT", "NB", "氏原 里穂菜", "猶本 光"], ["64'", "NB", "松田 紫野", "松永 未夢"], ["64'", "NB", "土光 真代", "青木 夕菜"],
    ["64'", "NB", "小林 里歌子", "樋渡 百花"], ["69'", "NL", "山本 結菜", "滝川 結女"], ["69'", "NL", "新堀 華波", "川澄 奈穂美"],
    ["79'", "NL", "城和 怜奈", "藤原 凛音"], ["79'", "NL", "下吉 優衣", "上尾野辺 めぐみ"], ["89'", "NL", "杉田 亜未", "富岡 千宙"],
  ]);
  assert.deepEqual(managers, { beleza: "楠瀬 直木", opponent: "阪倉 裕二" });
});

test("provided 3-4-2-1 matches the official starters and keeps the provided left-to-right order", () => {
  assert.equal(formation.formation, "3-4-2-1");
  assert.deepEqual(formation.starters.map((p) => `${p.number} ${p.name}`), [
    "21 水口 茉優", "5 松田 紫野", "3 村松 智子", "4 土光 真代",
    "32 松岡 瑛茉", "14 眞城 美春", "19 塩越 柚歩", "38 式田 和",
    "13 氏原 里穂菜", "7 北村 菜々美", "20 小林 里歌子",
  ]);
  const official = Object.values(own.starters).flat().sort();
  assert.deepEqual(formation.starters.map((p) => `${p.number} ${p.name}`).sort(), official);
});

test("official environment and stats", () => {
  assert.deepEqual([record.kickoff, record.attendance, record.weather, record.temperature, record.humidity, record.referee, record.assistantReferees, record.fourthOfficial],
    ["15:04", 1836, "曇、無風", "19.5℃", "44%", "荒川 里実", ["曽根 未宇", "稲葉 里美"], "田中 陽哉"]);
  assert.deepEqual(stats, { beleza: { shots: 24, freeKicks: 7, corners: 11 }, opponent: { shots: 4, freeKicks: 3, corners: 3 } });
});

test("review states the verified facts without unsupported verdicts", () => {
  const text = review.join("");
  for (const fact of ["2-1で逆転勝利", "開始3分", "13分", "57分", "24本", "4本"]) assert.ok(text.includes(fact), fact);
  for (const banned of ["プレスが", "ハイプレス", "圧倒", "支配", "不調", "好調"]) assert.equal(text.includes(banned), false, banned);
  assert.deepEqual(notes, []);
});

test("LAST MATCH, HISTORY, NEXT MATCH and NEXT 5 advance after the 新潟L win", () => {
  const fixture = belezaFixtures.find((f) => f.id === match.id)!;
  assert.deepEqual([fixture.status, fixture.score, fixture.isHome, fixture.kickoffAt, fixture.detailMatchId],
    ["finished", { home: 2, away: 1 }, true, "2026-11-14T15:04:00+09:00", "beleza-next-14"]);
  assert.equal(getCategoryDetailHref("beleza", fixture.detailMatchId), "/beleza/matches/beleza-next-14");
  assert.equal(getLatestFinishedFixture(belezaFixtures)?.id, "beleza-next-14");
  const history = getSeasonHistory(belezaFixtures).map(toBelezaSeasonHistoryEntry);
  assert.deepEqual([history[0].id, history[0].result, history[0].homeScore, history[0].awayScore, history[0].detailMatchId], ["beleza-next-14", "win", 2, 1, "beleza-next-14"]);
  const next = getNextFixture(belezaFixtures, now)!;
  assert.deepEqual([next.id, next.opponentName, next.kickoffAt, next.isHome, next.venue], ["beleza-next-15", "マイナビ仙台", "2026-11-18T14:00:00+09:00", false, "キューアンドエースタジアムみやぎ"]);
  const upcoming = getUpcomingFixtures(belezaFixtures, now, 5);
  // 公式に確定している未終了試合は4件のみ。5件にするために未確認試合を創作しない。
  assert.deepEqual(upcoming.map((f) => f.id), ["beleza-next-15", "beleza-next-16", "beleza-empress-2026-2", "beleza-league-2026-12"]);
  assert.equal(upcoming.some((f) => f.id === match.id), false);
  assert.deepEqual(upcoming.map((f) => toBelezaUpcomingMatch(f).dateLabel), ["11.18 WED", "11.23 MON", "11.28 SAT", "2027.02.06 or 02.07（開催日未定）"]);
});
