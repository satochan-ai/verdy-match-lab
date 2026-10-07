import assert from "node:assert/strict";
import test from "node:test";
import { matches } from "../mock/matches.ts";
import { getMatchResult } from "../match/result.ts";
import { hasPenaltyKicks } from "../match/penalty.ts";

const tottori = matches.find((item) => item.id === "sched-emperor-tottori")!;
const count = (kicks: { result: string }[] | undefined, result: string) => kicks?.filter((kick) => kick.result === result).length;

test("Tottori cup match keeps the 0-0 / extra time 0-0 / PK 3-4 score and is a Verdy WIN", () => {
  assert.deepEqual([tottori.homeScore, tottori.awayScore], [0, 0]);
  assert.deepEqual(tottori.extraTimeScore, { home: 0, away: 0 });
  assert.equal(tottori.penaltyShootout?.homeScore, 3);
  assert.equal(tottori.penaltyShootout?.awayScore, 4);
  assert.equal(getMatchResult(tottori), "win");
});

test("Tottori PK kickers: 5 each, goals/misses match the PK score", () => {
  const pk = tottori.penaltyShootout!;
  assert.equal(pk.homeKicks?.length, 5);
  assert.equal(pk.awayKicks?.length, 5);
  assert.equal(count(pk.homeKicks, "goal"), 3);
  assert.equal(count(pk.homeKicks, "miss"), 2);
  assert.equal(count(pk.awayKicks, "goal"), 4);
  assert.equal(count(pk.awayKicks, "miss"), 1);
  assert.equal(count(pk.homeKicks, "goal"), pk.homeScore);
  assert.equal(count(pk.awayKicks, "goal"), pk.awayScore);
  assert.deepEqual(pk.homeKicks?.map((kick) => kick.order), [1, 2, 3, 4, 5]);
  assert.deepEqual(pk.awayKicks?.map((kick) => kick.player), ["染野 唯月", "神田 奏真", "福田 湧矢", "山本 丈偉", "食野 壮磨"]);
});

test("PK detail is shown only when kicker data exists on a finished match", () => {
  assert.equal(hasPenaltyKicks(tottori), true);
  // PKスコアのみ（キッカーなし）の試合は従来表示のまま＝詳細は出さない。
  assert.equal(hasPenaltyKicks({ ...tottori, penaltyShootout: { homeScore: 3, awayScore: 4 } }), false);
  assert.equal(hasPenaltyKicks({ ...tottori, status: "scheduled" }), false);
  // PK戦のない通常試合・延長決着の試合でも出さない。
  for (const id of ["match-14", "match-15"]) {
    assert.equal(hasPenaltyKicks(matches.find((item) => item.id === id)!), false);
  }
  assert.equal(matches.filter((item) => hasPenaltyKicks(item)).length, 1);
});
