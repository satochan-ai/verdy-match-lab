import assert from "node:assert/strict";
import test from "node:test";
import { matches } from "../mock/matches.ts";

const match10 = matches.find((item) => item.id === "match-10")!;

test("match-10 carries the pre-match editorial layer", () => {
  assert.equal(match10.strategies.length, 3);
  assert.equal(match10.focusPoints.length, 3);
  assert.ok(match10.matchNotes.length > 0, "試合前短評 (matchNotes) should be present");
});

test("match-10 strategies are pre-match (pending, no result comment)", () => {
  assert.deepEqual(
    match10.strategies.map((s) => s.orderNo),
    [1, 2, 3],
  );
  for (const s of match10.strategies) {
    assert.equal(s.result, "pending");
    assert.equal(s.resultComment, undefined);
    assert.ok(s.title.length > 0);
    assert.ok(s.description.length > 0);
  }
});

test("match-10 actual formations and benches are confirmed separately from predictions", () => {
  assert.equal(match10.actualLineups?.home.formation, "3-4-2-1");
  assert.equal(match10.actualLineups?.away.formation, "4-1-2-3");
  assert.deepEqual(match10.actualLineups?.home.starters.DF, [
    "5 井上 竜太", "4 林 尚輝", "15 鈴木 海音",
  ]);
  assert.deepEqual(match10.actualLineups?.home.starters.MF, [
    "18 溝口 修平", "20 食野 壮磨", "16 平川 怜", "22 内田 陽介",
  ]);
  assert.deepEqual(match10.actualLineups?.home.starters.FW, [
    "14 福田 湧矢", "7 松橋 優安", "9 染野 唯月",
  ]);
  assert.deepEqual(match10.actualLineups?.away.starters.DF, [
    "17 髙橋 壱晟", "4 山川 哲史", "3 マテウス トゥーレル", "15 ジエゴ",
  ]);
  assert.deepEqual(match10.actualLineups?.away.starters.MF, [
    "24 酒井 高徳", "7 井手口 陽介", "5 郷家 友太",
  ]);
  assert.deepEqual(match10.actualLineups?.away.starters.FW, [
    "2 飯野 七聖", "29 小松 蓮", "41 永戸 勝也",
  ]);

  const homeStarters = Object.values(match10.actualLineups!.home.starters).flat();
  const awayStarters = Object.values(match10.actualLineups!.away.starters).flat();
  assert.equal(homeStarters.length, 11);
  assert.equal(awayStarters.length, 11);

  const homeBench = Object.values(match10.actualLineups!.home.bench).flat();
  const awayBench = Object.values(match10.actualLineups!.away.bench).flat();
  assert.equal(homeBench.length, 9);
  assert.equal(awayBench.length, 9);
  assert.equal(new Set(awayStarters.concat(awayBench)).size, 20);
  assert.equal(homeBench.includes("14 福田 湧矢"), false);
  assert.equal(awayBench.includes("14 福田 湧矢"), false);

  for (const player of ["29 佐古 真礼", "40 新井 悠太", "8 齋藤 功佑", "38 神田 奏真", "71 平尾 勇人"]) {
    assert.ok(homeBench.includes(player), `${player} should be on the Tokyo Verdy bench`);
  }
  for (const player of ["44 日髙 光揮", "10 大迫 勇也", "25 鍬先 祐弥", "62 川端 彪英"]) {
    assert.ok(awayBench.includes(player), `${player} should be on the Vissel Kobe bench`);
  }
  assert.ok(match10.predictedLineups, "pre-match predictions should remain");
});

test("match-10 official stats match the confirmed final totals", () => {
  assert.deepEqual(match10.matchStats, {
    home: { shots: 6, shotsOnTarget: 0, possession: "56%", passSuccessRate: "78%", distance: "117km", sprints: 132, offsides: 1, corners: 3, freeKicks: 13, fouls: 15, yellowCards: 3, redCards: 0 },
    away: { shots: 16, shotsOnTarget: 7, possession: "44%", passSuccessRate: "70%", distance: "116km", sprints: 130, offsides: 3, corners: 6, freeKicks: 10, fouls: 12, yellowCards: 1, redCards: 0 },
  });
});

test("match-10 substitutions match every official J.League change", () => {
  assert.deepEqual(match10.substitutions, [
    { minute: "44'", team: "東京V", playerIn: "川端 彪英", playerOut: "髙橋 壱晟" },
    { minute: "44'", team: "東京V", playerIn: "平尾 勇人", playerOut: "溝口 修平" },
    { minute: "31'", team: "東京V", playerIn: "神田 奏真", playerOut: "平川 怜" },
    { minute: "14'", team: "東京V", playerIn: "大迫 勇也", playerOut: "小松 蓮" },
    { minute: "14'", team: "東京V", playerIn: "新井 悠太", playerOut: "内田 陽介" },
    { minute: "14'", team: "東京V", playerIn: "齋藤 功佑", playerOut: "松橋 優安" },
    { minute: "0'", team: "神戸", playerIn: "日髙 光揮", playerOut: "郷家 友太" },
    { minute: "0'", team: "神戸", playerIn: "佐古 真礼", playerOut: "林 尚輝" },
    { minute: "31'", team: "神戸", playerIn: "鍬先 祐弥", playerOut: "飯野 七聖" },
  ]);
});
