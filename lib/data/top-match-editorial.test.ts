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
  assert.deepEqual(match10.actualLineups?.away.starters.DF, [
    "17 髙橋 壱晟", "4 山川 哲史", "3 マテウス トゥーレル", "15 ジエゴ",
  ]);
  assert.deepEqual(match10.actualLineups?.away.starters.MF, [
    "2 飯野 七聖", "7 井手口 陽介", "24 酒井 高徳", "5 郷家 友太",
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
