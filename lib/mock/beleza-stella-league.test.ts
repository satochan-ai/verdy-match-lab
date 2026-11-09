import assert from "node:assert/strict";
import test from "node:test";
import {
  belezaStellaLeagueMatch as match, belezaStellaLeagueHalfScores as halves, belezaStellaLeagueGoals as goals,
  belezaStellaLeagueCards as cards, belezaStellaLeagueSubstitutions as subs, belezaStellaLeagueOfficialRecord as record,
  belezaStellaLeagueStats as stats, belezaStellaLeagueActualLineup as own, stellaLeagueActualLineup as opponent,
  stellaLeagueTeam, belezaStellaLeagueReview as review, belezaStellaLeagueViewerNotes as notes,
} from "./beleza-stella-league.ts";
import { belezaTeam } from "./beleza.ts";
import { belezaFixtures, toBelezaSeasonHistoryEntry } from "../data/beleza-fixtures.ts";
import { getLatestFinishedFixture, getSeasonHistory } from "../data/fixture-selectors.ts";
import { getCategoryDetailHref } from "../data/category-match-details.ts";

test("11/7 N相模原 official result keeps the existing ID, away 0-1 loss and becomes linkable from LAST/HISTORY", () => {
  assert.deepEqual(
    [match.id, match.competition, match.kickoffAt, match.venue, match.isBelezaHome, match.homeTeamName, match.awayTeamName, match.homeScore, match.awayScore],
    ["beleza-next-13", "2026/27 WEリーグ 第8節", "2026-11-07T14:03:00+09:00", "相模原ギオンスタジアム", false, "ノジマステラ神奈川相模原", belezaTeam.name, 1, 0],
  );
  assert.deepEqual(halves, { firstHalf: "1-0", secondHalf: "0-0" });
  const fixture = belezaFixtures.find((f) => f.id === match.id)!;
  assert.deepEqual([fixture.status, fixture.score, fixture.isHome, fixture.detailMatchId], ["finished", { home: 1, away: 0 }, false, "beleza-next-13"]);
  assert.equal(getCategoryDetailHref("beleza", fixture.detailMatchId), "/beleza/matches/beleza-next-13");
  assert.equal(getLatestFinishedFixture(belezaFixtures)?.detailMatchId, "beleza-next-13");
  const history = getSeasonHistory(belezaFixtures).map(toBelezaSeasonHistoryEntry);
  assert.deepEqual([history[0].detailMatchId, history[0].result], ["beleza-next-13", "loss"]);
});

test("official timeline: goal, card and substitutions are attributed to the correct team", () => {
  assert.deepEqual(goals.map((g) => [g.minute, g.scorer, g.team]), [["31'", "南里 杏", stellaLeagueTeam.name]]);
  // 82分の警告は公式試合経過の東京NB列。
  assert.deepEqual(cards.map((c) => [c.minute, c.player, c.team, c.type]), [["82'", "樋渡 百花", belezaTeam.name, "yellow"]]);
  assert.deepEqual(subs.map((s) => [s.minute, s.team === belezaTeam.name ? "NB" : "NS", s.playerOut, s.playerIn]), [
    ["62'", "NB", "小林 里歌子", "北村 菜々美"], ["62'", "NB", "松永 未夢", "土光 真代"], ["70'", "NS", "川島 はるな", "祐村 ひかる"],
    ["73'", "NB", "松岡 瑛茉", "松田 紫野"], ["73'", "NB", "氏原 里穂菜", "隅田 凜"], ["90+3'", "NS", "笹井 一愛", "笹井 優愛"],
  ]);
});

test("official squads: 11 starters and 7 substitutes each, numbers unique, substitutions consistent", () => {
  for (const [lineup, team] of [[own, belezaTeam.name], [opponent, stellaLeagueTeam.name]] as const) {
    const starters = Object.values(lineup.starters).flat();
    const bench = Object.values(lineup.bench).flat();
    assert.equal(starters.length, 11);
    assert.equal(bench.length, 7);
    assert.equal(new Set([...starters, ...bench].map((p) => p.split(" ")[0])).size, 18);
    // 開始時フォーメーションは公式に確認できないため登録しない。
    assert.equal(lineup.formation, undefined);
    for (const change of subs.filter((s) => s.team === team)) {
      assert.ok(starters.some((p) => p.endsWith(` ${change.playerOut}`)), change.playerOut);
      assert.ok(bench.some((p) => p.endsWith(` ${change.playerIn}`)), change.playerIn);
    }
  }
  assert.deepEqual(own.starters, {
    GK: ["21 水口 茉優"], DF: ["2 青木 夕菜", "3 村松 智子", "32 松岡 瑛茉"], MF: ["14 眞城 美春", "19 塩越 柚歩", "18 松永 未夢"],
    FW: ["38 式田 和", "13 氏原 里穂菜", "11 樋渡 百花", "20 小林 里歌子"],
  });
  assert.deepEqual(opponent.starters, {
    GK: ["1 岩崎 有波"], DF: ["14 南里 杏", "5 大賀 理紗子", "6 パオラ ソルデヴィラ", "19 築地 育"],
    MF: ["17 川島 はるな", "24 明 詩音梨", "4 伊東 珠梨", "9 笹井 一愛"], FW: ["11 片山 由菜", "10 大竹 麻友"],
  });
});

test("official environment and website record values", () => {
  assert.deepEqual([record.kickoff, record.attendance, record.weather, record.temperature, record.humidity, record.referee], ["14:03", 850, "晴", "19.9℃", "29%", "山田 昌輝"]);
  assert.equal(record.sourceUrl, "https://weleague.jp/matches/2026110725/");
  assert.deepEqual(stats, { beleza: { shots: 7, freeKicks: 8, corners: 7 }, opponent: { shots: 3, freeKicks: 9, corners: 5 } });
});

test("review states the 0-1 facts without unsupported verdicts and leaves viewer notes empty", () => {
  assert.equal(review.length, 5);
  const text = review.join("");
  assert.ok(text.includes("0-1で敗れた"));
  assert.ok(text.includes("シュート数だけでは決定機の数や内容の優劣は判断できない"));
  for (const banned of ["決定機を外", "不調", "守備が堅", "堅守"]) assert.equal(text.includes(banned), false, banned);
  assert.deepEqual(notes, []);
});

test("this is BELEZA's first scoreless WE League match of the season (as stated in the review)", () => {
  const league = getSeasonHistory(belezaFixtures).filter((f) => f.competition.name === "2026/27 WEリーグ").map(toBelezaSeasonHistoryEntry);
  const ownGoals = league.map((e) => (e.homeTeamName === belezaTeam.name ? e.homeScore : e.awayScore));
  assert.deepEqual(league.filter((_, i) => ownGoals[i] === 0).map((e) => e.id), ["beleza-next-13"]);
});
