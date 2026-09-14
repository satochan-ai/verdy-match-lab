import assert from "node:assert/strict";
import test from "node:test";
import { j1Standings } from "./standings.ts";

test("J1 standings hold exactly 20 clubs with unique, sequential ranks 1-20", () => {
  assert.equal(j1Standings.entries.length, 20);
  const ranks = j1Standings.entries.map((entry) => entry.rank);
  assert.deepEqual(ranks, Array.from({ length: 20 }, (_, i) => i + 1));
  assert.equal(new Set(j1Standings.entries.map((entry) => entry.teamName)).size, 20);
});

test("J1 standings register 東京ヴェルディ exactly once with the official values", () => {
  const verdyEntries = j1Standings.entries.filter((entry) => entry.teamName === "東京ヴェルディ");
  assert.equal(verdyEntries.length, 1);
  assert.deepEqual(verdyEntries[0], {
    rank: 19,
    teamName: "東京ヴェルディ",
    played: 7,
    wins: 0,
    draws: 4,
    losses: 3,
    goalsFor: 3,
    goalsAgainst: 9,
    goalDifference: -6,
    points: 4,
  });
});

test("J1 standings register ジェフユナイテッド千葉 exactly once with the official values", () => {
  const chibaEntries = j1Standings.entries.filter((entry) => entry.teamName === "ジェフユナイテッド千葉");
  assert.equal(chibaEntries.length, 1);
  assert.deepEqual(chibaEntries[0], {
    rank: 20,
    teamName: "ジェフユナイテッド千葉",
    played: 7,
    wins: 1,
    draws: 1,
    losses: 5,
    goalsFor: 6,
    goalsAgainst: 16,
    goalDifference: -10,
    points: 4,
  });
});

test("J1 standings entries are internally consistent (points and goal difference derive from played record)", () => {
  for (const entry of j1Standings.entries) {
    assert.equal(entry.wins + entry.draws + entry.losses, entry.played);
    assert.equal(entry.wins * 3 + entry.draws, entry.points);
    assert.equal(entry.goalsFor - entry.goalsAgainst, entry.goalDifference);
  }
});

test("J1 standings expose the official source and as-of label", () => {
  assert.equal(j1Standings.sourceUrl, "https://www.verdy.co.jp/match/ranking/");
  assert.equal(j1Standings.asOfLabel, "2026.09.14 現在");
});
