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
  assert.equal(Object.values(away.bench).flat().length, 9);
  // 予想2案は公式スタメンで上書きされず、predictedLineups（HOME/AWAY必須ペア）にも入れていない。
  assert.equal(match.verdyLineupOptions?.length, 2);
  assert.equal(match.predictedLineups, undefined);
  assert.notDeepEqual(
    match.verdyLineupOptions![0].lineup.starters.map((player) => player.number),
    [1, 15, 29, 4, 40, 8, 2, 14, 38, 19, 9],
  );
});

test("match-15 Saga Tosu lineup is 3-4-2-1 with 11 starters and provided bench incl. #47 伊澤 璃来 / #41 松岡 響祈 (#13 exists on both teams)", () => {
  const home = match.actualLineups!.home;
  assert.equal(home.formation, "3-4-2-1");
  assert.equal(Object.values(home.starters).flat().length, 11);
  assert.equal(Object.values(home.bench).flat().length, 9);
  assert.ok(home.bench.MF.includes("47 伊澤 璃来") && home.bench.MF.includes("41 松岡 響祈"));
  const away = match.actualLineups!.away;
  assert.deepEqual(Object.values(away.bench).flat(), [
    "21 長沢 祐弥", "5 井上 竜太", "18 溝口 修平", "7 松橋 優安", "16 平川 怜", "28 山本 丈偉", "13 山田 剛綺", "25 熊取谷 一星", "27 白井 亮丞",
  ]);
  assert.deepEqual(Object.values(home.bench).flat().filter((player) => player.startsWith("13 ")), ["13 城定 幹大"]);
  assert.deepEqual(Object.values(away.bench).flat().filter((player) => player.startsWith("13 ")), ["13 山田 剛綺"]);
  assert.equal(Object.values(home.bench).flat().some((player) => player.includes("山田 剛綺")), false);
});

test("match-15 substitutions: Verdy 6 (incl. 91') and Tosu 6, each IN player belongs to that team's bench", () => {
  const verdy = match.substitutions!.filter((sub) => sub.team === "東京V");
  const tosu = match.substitutions!.filter((sub) => sub.team === "鳥栖");
  assert.equal(verdy.length, 6);
  assert.equal(verdy.at(-1)?.minute, "91'");
  assert.equal(tosu.length, 6);
  const bench = (side: "home" | "away") => Object.values(match.actualLineups![side].bench).flat().map((p) => p.replace(/^\d+\s+/, ""));
  assert.ok(tosu.every((sub) => bench("home").includes(sub.playerIn)));
  assert.ok(verdy.every((sub) => bench("away").includes(sub.playerIn)));
  assert.deepEqual(tosu.slice(3, 5).map((sub) => `${sub.minute} ${sub.playerOut}→${sub.playerIn}`), ["61' 芳野 凱斗→伊澤 璃来", "86' 松本 凪生→松岡 響祈"]);
});

test("match-15 cards, stats and official record match the provided data", () => {
  assert.deepEqual(match.cards?.filter((card) => card.team === "東京V").map((card) => card.player), ["佐古 真礼", "新井 悠太", "福田 湧矢"]);
  assert.deepEqual(match.cards?.filter((card) => card.team === "鳥栖").map((card) => card.player), ["森下 怜哉", "西澤 健太"]);
  assert.equal(match.matchStats?.home.shots, 18);
  assert.equal(match.matchStats?.away.shots, 19);
  assert.equal(match.officialRecord?.attendance, 2658);
  assert.equal(match.officialRecord?.referee, "上田 益也");
});
