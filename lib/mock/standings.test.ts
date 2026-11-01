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
    rank: 17,
    teamName: "東京ヴェルディ",
    played: 13,
    wins: 2,
    draws: 5,
    losses: 6,
    goalsFor: 11,
    goalsAgainst: 22,
    goalDifference: -11,
    points: 11,
  });
});

test("J1 standings register ジェフユナイテッド千葉 exactly once with the official values", () => {
  const chibaEntries = j1Standings.entries.filter((entry) => entry.teamName === "ジェフユナイテッド千葉");
  assert.equal(chibaEntries.length, 1);
  assert.deepEqual(chibaEntries[0], {
    rank: 18,
    teamName: "ジェフユナイテッド千葉",
    played: 13,
    wins: 2,
    draws: 4,
    losses: 7,
    goalsFor: 15,
    goalsAgainst: 24,
    goalDifference: -9,
    points: 10,
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
  assert.equal(j1Standings.sourceUrl, "https://www.jleague.jp/j1/standings/2026-27/");
  assert.equal(j1Standings.asOfLabel, "2026年11月1日18:28更新");
});

test("J1 standings snapshot is a complete round (all 20 clubs on 13 matches) with balanced totals", () => {
  const entries = j1Standings.entries;
  assert.equal(entries.every((entry) => entry.played === 13), true);
  assert.equal(entries.reduce((sum, e) => sum + e.wins, 0), entries.reduce((sum, e) => sum + e.losses, 0));
  assert.equal(entries.reduce((sum, e) => sum + e.goalsFor, 0), entries.reduce((sum, e) => sum + e.goalsAgainst, 0));
  assert.equal(entries.find((entry) => entry.teamName === "横浜F・マリノス")?.rank, 8);
});

test("all clubs retain official round-13 points and goal differences in published order", () => {
  assert.deepEqual(j1Standings.entries.map(e => [e.points,e.goalDifference]),[[30,23],[29,22],[28,20],[28,10],[26,9],[23,7],[22,5],[21,6],[21,-6],[16,-6],[14,-6],[14,-10],[14,-12],[13,-6],[12,-5],[12,-7],[11,-11],[10,-9],[9,-13],[7,-11]]);
});
