import assert from "node:assert/strict";
import test from "node:test";
import { fukuokaResult as match } from "../mock/top-fukuoka-result.ts";
import { matches } from "../mock/matches.ts";
import { scheduleMatches } from "../mock/schedule.ts";
import { topFixtures } from "./top-fixtures.ts";
import { validateTopFixtureConsistency } from "./top-fixture-consistency.ts";
import { getLatestFinishedFixture, getNextFixture, getUpcomingFixtures } from "./fixture-selectors.ts";
import { resolveMatchStatus } from "../match/status.ts";
import { getMatchResult } from "../match/result.ts";
import { shouldShowFukuokaContent, verdyFukuokaRows, avispaRows, verdyFukuokaStrategies, avispaStrategies } from "../match/fukuoka-content.ts";
import { fukuokaViewerReview } from "../match/fukuoka-review.ts";
import { getPostMatchAnalysis } from "../../features/ai-guide/mockResponses.ts";

test("Fukuoka official result is consistent across schedule, fixture and published detail", () => {
  assert.deepEqual([match.homeScore, match.awayScore], [3, 1]);
  assert.equal(match.isVerdyHome, true);
  assert.equal(getMatchResult(match), "win");
  assert.equal(matches.filter((m) => m.id === "sched-fukuoka").length, 1);
  const schedule = scheduleMatches.filter((m) => m.id === "sched-fukuoka");
  assert.equal(schedule.length, 1);
  assert.deepEqual([schedule[0].status, schedule[0].homeScore, schedule[0].awayScore, schedule[0].detailMatchId, schedule[0].kickoffAt], ["finished", 3, 1, "sched-fukuoka", "2026-10-24T15:03:00+09:00"]);
  assert.deepEqual(validateTopFixtureConsistency(scheduleMatches, matches).filter((i) => i.fixtureId === "sched-fukuoka"), []);
  assert.deepEqual([match.officialRecord?.attendance, match.officialRecord?.weather, match.officialRecord?.kickoff], [12327, "雨", "15:03"]);
});

test("goals, assists, cards and substitutions follow the official record", () => {
  assert.deepEqual(match.goals?.map((g) => [g.minute, g.scorer, g.team, g.assist]), [
    ["10'", "熊取谷 一星", "東京ヴェルディ", undefined],
    ["56'", "ウェリック ポポ", "アビスパ福岡", "北島 祐二"],
    ["74'", "松橋 優安", "東京ヴェルディ", "一美 和成"],
    ["90'", "寺沼 星文", "東京ヴェルディ", "溝口 修平"],
  ]);
  assert.deepEqual(match.cards?.map((c) => `${c.minute}${c.player}`), ["41'椎橋 慧也", "46'師岡 柊生", "68'宮 大樹"]);
  const verdySubs = match.substitutions?.filter((s) => s.team === "東京ヴェルディ").map((s) => `${s.minute}${s.playerOut}→${s.playerIn}`);
  assert.deepEqual(verdySubs, ["49'林 尚輝→佐古 真礼", "67'熊取谷 一星→松橋 優安", "67'齋藤 功佑→森田 晃樹", "88'一美 和成→寺沼 星文", "88'新井 悠太→山田 剛綺"]);
  const avispaSubs = match.substitutions?.filter((s) => s.team === "アビスパ福岡").map((s) => `${s.minute}${s.playerOut}→${s.playerIn}`);
  assert.deepEqual(avispaSubs, ["46'椎橋 慧也→ウェリック ポポ", "61'橋本 悠→湯澤 聖人", "76'宮 大樹→辻岡 佑真", "76'北島 祐二→武本 匠平", "86'重見 柾斗→秋野 央樹"]);
  // 途中出場の2人がそれぞれ投入後に得点している。
  for (const [scorer, entered] of [["松橋 優安", 67], ["寺沼 星文", 88]] as const) {
    const goal = match.goals!.find((g) => g.scorer === scorer)!;
    assert.ok(parseInt(goal.minute) > entered, scorer);
    assert.ok(match.substitutions!.some((s) => s.playerIn === scorer && parseInt(s.minute) === entered));
  }
});

test("starting XIs, observed pitch order and benches register 11 starters and 9 subs per side", () => {
  const { home, away } = match.actualLineups!;
  assert.deepEqual([home.formation, away.formation], ["4-4-2", "3-4-2-1"]);
  assert.deepEqual(home.pitchOrder, ["1 マテウス", "18 溝口 修平", "96 チョ ユミン", "4 林 尚輝", "22 内田 陽介", "40 新井 悠太", "16 平川 怜", "8 齋藤 功佑", "19 藤本 寛也", "25 熊取谷 一星", "33 一美 和成"]);
  assert.deepEqual(away.pitchOrder, ["24 小畑 裕馬", "38 宮 大樹", "37 田代 雅也", "16 岡 哲平", "29 前嶋 洋太", "6 重見 柾斗", "34 椎橋 慧也", "47 橋本 悠", "11 見木 友哉", "25 北島 祐二", "13 師岡 柊生"]);
  for (const side of [home, away]) {
    const starters = Object.values(side.starters).flat();
    assert.equal(starters.length, 11);
    assert.deepEqual([...starters].sort(), [...side.pitchOrder!].sort());
    assert.equal(Object.values(side.bench).flat().length, 9);
  }
});

test("finish makes Fukuoka LAST, NEXT is Nagasaki and Fukuoka PRE content leaves TOP but is kept", () => {
  const now = new Date("2026-10-25T22:00:00+09:00");
  assert.equal(resolveMatchStatus(match, now), "finished");
  assert.equal(getLatestFinishedFixture(topFixtures)?.id, "sched-fukuoka");
  assert.equal(getNextFixture(topFixtures, now)?.id, "sched-nagasaki");
  assert.deepEqual(getUpcomingFixtures(topFixtures, now, 5).map((f) => f.id), ["sched-nagasaki", "sched-shimizu", "sched-nagoya"]);
  assert.equal(shouldShowFukuokaContent({ id: "sched-fukuoka", status: "finished" }), false);
  assert.equal(verdyFukuokaRows.flat().length + avispaRows.flat().length, 22);
  assert.equal(verdyFukuokaStrategies.length + avispaStrategies.length, 6);
});

test("viewer review is stored separately and the post-match analysis lists only confirmed notes", () => {
  assert.equal(fukuokaViewerReview.title, "交代策が的中！相馬ヴェルディ、福岡を3-1で下し待望の初勝利");
  assert.equal(fukuokaViewerReview.paragraphs.length, 8);
  assert.ok(fukuokaViewerReview.notice.includes("主観を含む"));
  assert.deepEqual(getPostMatchAnalysis(match).sections, [{ heading: "確認済み試合情報", bullets: match.matchNotes }]);
});
