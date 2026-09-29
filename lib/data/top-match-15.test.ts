import assert from "node:assert/strict";
import test from "node:test";
import { matches } from "../mock/matches.ts";

const match = matches.find((item) => item.id === "match-15")!;

test("match-15 is the finished 09.29 サガン鳥栖 2-1 東京V (extra time) levain cup record", () => {
  assert.equal(match.status, "finished");
  assert.equal(match.homeTeam.name, "サガン鳥栖");
  assert.equal(match.awayTeam.name, "東京ヴェルディ");
  assert.deepEqual([match.homeScore, match.awayScore], [2, 1]);
  assert.equal(match.extraTime, true);
  assert.deepEqual(match.goals?.map((goal) => `${goal.minute} ${goal.scorer} ${goal.team}`), [
    "52' 塩浜 遼 鳥栖", "60' 藤本 寛也 東京V", "107' 塩浜 遼 鳥栖",
  ]);
  assert.equal(match.goals?.some((goal) => goal.assist !== undefined), false);
});

test("match-15 official Tokyo Verdy lineup is 3-4-2-1 and stays separate from the two predicted options", () => {
  const away = match.actualLineups!.away;
  assert.equal(away.formation, "3-4-2-1");
  assert.deepEqual(Object.values(away.starters).flat().length, 11);
  assert.deepEqual(Object.values(away.starters).flat(), [
    "1 マテウス", "15 鈴木 海音", "29 佐古 真礼", "4 林 尚輝",
    "40 新井 悠太", "8 齋藤 功佑", "2 柴戸 海", "14 福田 湧矢",
    "38 神田 奏真", "19 藤本 寛也", "9 染野 唯月",
  ]);
  assert.equal(Object.values(away.bench).flat().length, 10);
  // 予想2案は公式スタメンで上書きされず、predictedLineups（HOME/AWAY必須ペア）にも入れていない。
  assert.equal(match.verdyLineupOptions?.length, 2);
  assert.equal(match.predictedLineups, undefined);
  assert.notDeepEqual(
    match.verdyLineupOptions![0].lineup.starters.map((player) => player.number),
    [1, 15, 29, 4, 40, 8, 2, 14, 38, 19, 9],
  );
});

test("match-15 Saga Tosu lineup is 3-4-2-1 with 11 starters and provided bench (duplicate #13 kept as provided)", () => {
  const home = match.actualLineups!.home;
  assert.equal(home.formation, "3-4-2-1");
  assert.equal(Object.values(home.starters).flat().length, 11);
  assert.equal(Object.values(home.bench).flat().length, 8);
  assert.equal(Object.values(home.bench).flat().filter((player) => player.startsWith("13 ")).length, 2);
});

test("match-15 substitutions keep Verdy's 6 changes (incl. 91') and hold the two unverified Tosu rows", () => {
  const verdy = match.substitutions!.filter((sub) => sub.team === "東京V");
  const tosu = match.substitutions!.filter((sub) => sub.team === "鳥栖");
  assert.equal(verdy.length, 6);
  assert.equal(verdy.at(-1)?.minute, "91'");
  assert.equal(tosu.length, 4);
  assert.equal(tosu.some((sub) => sub.playerOut === "芳野 凱斗" || sub.playerOut === "松本 凪生"), false);
});

test("match-15 cards, stats and official record match the provided data", () => {
  assert.deepEqual(match.cards?.filter((card) => card.team === "東京V").map((card) => card.player), ["佐古 真礼", "新井 悠太", "福田 湧矢"]);
  assert.deepEqual(match.cards?.filter((card) => card.team === "鳥栖").map((card) => card.player), ["森下 怜哉", "西澤 健太"]);
  assert.equal(match.matchStats?.home.shots, 18);
  assert.equal(match.matchStats?.away.shots, 19);
  assert.equal(match.officialRecord?.attendance, 2658);
  assert.equal(match.officialRecord?.referee, "上田 益也");
});
