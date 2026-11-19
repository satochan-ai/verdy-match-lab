import assert from "node:assert/strict";
import test from "node:test";
import {
  belezaSendaiLeagueMatch as match, belezaSendaiLeagueHalfScores as halves, belezaSendaiLeagueGoals as goals,
  belezaSendaiLeagueCards as cards, belezaSendaiLeagueSubstitutions as subs, belezaSendaiLeagueOfficialRecord as record,
  belezaSendaiLeagueStats as stats, belezaSendaiLeagueActualLineup as own, sendaiLeagueActualLineup as opponent,
  sendaiLeagueTeam, belezaSendaiLeagueFormation as formation, belezaSendaiLeagueReview as review,
  belezaSendaiLeagueViewerNotes as notes, belezaSendaiLeagueManagers as managers,
} from "./beleza-sendai-league.ts";
import { belezaTeam, belezaUpcomingMatches } from "./beleza.ts";
import { belezaFixtures, toBelezaSeasonHistoryEntry, toBelezaUpcomingMatch } from "../data/beleza-fixtures.ts";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "../data/fixture-selectors.ts";
import { getCategoryDetailHref } from "../data/category-match-details.ts";

const now = new Date("2026-11-19T12:00:00+09:00");

test("11/18 仙台 official result reuses beleza-next-15 as an away 3-2 win kicked off at 14:03", () => {
  assert.deepEqual(
    [match.id, match.competition, match.kickoffAt, match.kickoffLabel, match.venue, match.isBelezaHome, match.homeTeamName, match.awayTeamName, match.homeScore, match.awayScore],
    ["beleza-next-15", "2026/27 WEリーグ 第10節", "2026-11-18T14:03:00+09:00", "14:03", "キューアンドエースタジアムみやぎ", false, "マイナビ仙台", belezaTeam.name, 2, 3],
  );
  assert.deepEqual(halves, { firstHalf: "0-2", secondHalf: "2-1" });
  const [h1, a1] = halves.firstHalf.split("-").map(Number); const [h2, a2] = halves.secondHalf.split("-").map(Number);
  assert.deepEqual([h1 + h2, a1 + a2], [match.homeScore, match.awayScore]);
  assert.equal(belezaFixtures.filter((f) => f.id === match.id).length, 1);
  assert.equal(belezaUpcomingMatches.filter((f) => f.id === match.id).length, 1);
});

test("goals (including the 90+3 own goal credited to 仙台) agree with the final score", () => {
  assert.deepEqual(goals.map((g) => [g.minute, g.scorer, g.team]), [
    ["33'", "小林 里歌子", belezaTeam.name], ["40'", "氏原 里穂菜", belezaTeam.name], ["52'", "安倍 乃花", sendaiLeagueTeam.name],
    ["90'", "青木 夕菜", belezaTeam.name], ["90+3'", "オウンゴール", sendaiLeagueTeam.name],
  ]);
  assert.equal(goals.filter((g) => g.team === sendaiLeagueTeam.name).length, match.homeScore);
  assert.equal(goals.filter((g) => g.team === belezaTeam.name).length, match.awayScore);
  assert.deepEqual(cards, []);
});

test("official squads: 11 starters each, bench and substitutions consistent", () => {
  for (const [lineup, team] of [[own, belezaTeam.name], [opponent, sendaiLeagueTeam.name]] as const) {
    const starters = Object.values(lineup.starters).flat();
    const bench = Object.values(lineup.bench).flat();
    assert.equal(starters.length, 11);
    assert.equal(bench.length, 7);
    assert.equal(new Set([...starters, ...bench].map((p) => p.split(" ")[0])).size, 18);
    assert.equal(lineup.formation, undefined);
    const changes = subs.filter((s) => s.team === team);
    for (const change of changes) {
      assert.ok(starters.some((p) => p.endsWith(` ${change.playerOut}`)), change.playerOut);
      assert.ok(bench.some((p) => p.endsWith(` ${change.playerIn}`)), change.playerIn);
    }
    assert.equal(new Set(changes.map((c) => c.playerOut)).size, changes.length);
  }
  assert.deepEqual(subs.map((s) => [s.minute, s.team === belezaTeam.name ? "NB" : "MS", s.playerOut, s.playerIn]), [
    ["HT", "NB", "松田 紫野", "青木 夕菜"], ["64'", "NB", "北村 菜々美", "猶本 光"], ["64'", "NB", "氏原 里穂菜", "松永 未夢"],
    ["64'", "MS", "遠藤 ゆめ", "矢形 海優"], ["64'", "MS", "篠田 帆花", "岩田 琳香"], ["73'", "NB", "小林 里歌子", "樋渡 百花"],
    ["78'", "MS", "江崎 世来", "菊地 花奈"], ["78'", "MS", "井上 陽菜", "太田 萌咲"], ["90+1'", "NB", "眞城 美春", "隅田 凜"],
  ]);
  // 90分の得点者・青木はハーフタイムの交代出場選手（交代前の選手に得点を付けない）。
  assert.ok(Object.values(own.bench).flat().includes("2 青木 夕菜"));
  assert.deepEqual(managers, { beleza: "楠瀬 直木", opponent: "池田 太" });
});

test("observed 3-4-2-1 matches the official starters and keeps the provided left-to-right order", () => {
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
    ["14:03", 426, "晴、弱風", "15.2℃", "68%", "小泉 朝香", ["谷本 菜々子", "勝又 美沙希"], "岩佐 丈"]);
  assert.deepEqual(stats, { beleza: { shots: 16, freeKicks: 5, corners: 6 }, opponent: { shots: 10, freeKicks: 6, corners: 7 } });
});

test("review states the verified facts without unsupported verdicts", () => {
  const text = review.join("");
  for (const fact of ["3-2で勝利", "33分", "40分", "52分", "90分", "90+3分", "オウンゴール", "16本", "10本"]) assert.ok(text.includes(fact), fact);
  for (const banned of ["プレスが", "ハイプレス", "圧倒", "支配", "不調", "好調"]) assert.equal(text.includes(banned), false, banned);
  assert.deepEqual(notes, []);
});

test("LAST MATCH, HISTORY, NEXT MATCH and NEXT 5 advance after the 仙台 win", () => {
  const fixture = belezaFixtures.find((f) => f.id === match.id)!;
  assert.deepEqual([fixture.status, fixture.score, fixture.isHome, fixture.kickoffAt, fixture.detailMatchId],
    ["finished", { home: 2, away: 3 }, false, "2026-11-18T14:03:00+09:00", "beleza-next-15"]);
  assert.equal(getCategoryDetailHref("beleza", fixture.detailMatchId), "/beleza/matches/beleza-next-15");
  assert.equal(getLatestFinishedFixture(belezaFixtures)?.id, "beleza-next-15");
  const history = getSeasonHistory(belezaFixtures);
  const view = history.map(toBelezaSeasonHistoryEntry);
  assert.deepEqual([view[0].id, view[0].result, view[0].homeTeamName, view[0].homeScore, view[0].awayScore, view[0].detailMatchId],
    ["beleza-next-15", "win", "マイナビ仙台", 2, 3, "beleza-next-15"]);
  assert.equal(view[1].id, "beleza-next-14");
  assert.equal(new Set(history.map((f) => f.id)).size, history.length);
  const next = getNextFixture(belezaFixtures, now)!;
  assert.deepEqual([next.id, next.opponentName, next.kickoffAt, next.isHome, next.venue, next.competition.round],
    ["beleza-next-16", "INAC神戸レオネッサ", "2026-11-23T15:00:00+09:00", true, "味の素フィールド西が丘", "第11節"]);
  const upcoming = getUpcomingFixtures(belezaFixtures, now, 5);
  // 公式に確定している未終了試合のみ。5件にするために未確認試合を創作しない。
  assert.deepEqual(upcoming.map((f) => f.id), ["beleza-next-16", "beleza-empress-2026-2", "beleza-league-2026-12"]);
  assert.equal(upcoming.some((f) => f.id === match.id), false);
  assert.deepEqual(upcoming.map((f) => toBelezaUpcomingMatch(f).dateLabel), ["11.23 MON", "11.28 SAT", "2027.02.06 or 02.07（開催日未定）"]);
});
