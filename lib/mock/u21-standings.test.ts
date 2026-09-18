import assert from "node:assert/strict";
import test from "node:test";
import { u21EastStandings, u21WestStandings } from "./u21-standings.ts";

test("U-21 EAST standings hold exactly 6 clubs with no duplicate team names", () => {
  assert.equal(u21EastStandings.entries.length, 6);
  assert.equal(new Set(u21EastStandings.entries.map((entry) => entry.teamName)).size, 6);
});

test("U-21 EAST standings register 東京ヴェルディ at 3rd with the official values", () => {
  const verdyEntries = u21EastStandings.entries.filter((entry) => entry.teamName === "U-21 東京ヴェルディ");
  assert.equal(verdyEntries.length, 1);
  assert.deepEqual(verdyEntries[0], {
    rank: 3,
    teamName: "U-21 東京ヴェルディ",
    played: 2,
    wins: 1,
    draws: 0,
    losses: 1,
    goalsFor: 2,
    goalsAgainst: 4,
    goalDifference: -2,
    points: 3,
    recentForm: ["L", "W"],
  });
});

test("U-21 WEST standings hold exactly 5 clubs with no duplicate team names", () => {
  assert.equal(u21WestStandings.entries.length, 5);
  assert.equal(new Set(u21WestStandings.entries.map((entry) => entry.teamName)).size, 5);
});

test("U-21 WEST standings register ガンバ大阪 at 1st with the official values", () => {
  const entry = u21WestStandings.entries.find((e) => e.teamName === "U-21 ガンバ大阪");
  assert.deepEqual(entry, {
    rank: 1,
    teamName: "U-21 ガンバ大阪",
    played: 2,
    wins: 2,
    draws: 0,
    losses: 0,
    goalsFor: 3,
    goalsAgainst: 0,
    goalDifference: 3,
    points: 6,
    recentForm: ["W", "W"],
  });
});

test("U-21 WEST standings keep 神戸(2位・2試合)/名古屋(3位・1試合) in the provided order despite different games played", () => {
  // 消化試合数が異なっていても、勝点だけから独自に並べ替えていないことを確認する。
  const kobe = u21WestStandings.entries.find((e) => e.teamName === "U-21 ヴィッセル神戸")!;
  const nagoya = u21WestStandings.entries.find((e) => e.teamName === "U-21 名古屋グランパス")!;
  assert.equal(kobe.rank, 2);
  assert.equal(kobe.played, 2);
  assert.equal(nagoya.rank, 3);
  assert.equal(nagoya.played, 1);
});

for (const [label, standings] of [
  ["EAST", u21EastStandings],
  ["WEST", u21WestStandings],
] as const) {
  test(`U-21 ${label} standings entries are internally consistent (record/points/goal difference/recentForm)`, () => {
    for (const entry of standings.entries) {
      assert.equal(entry.wins + entry.draws + entry.losses, entry.played);
      assert.equal(entry.goalsFor - entry.goalsAgainst, entry.goalDifference);
      assert.equal(entry.wins * 3 + entry.draws, entry.points);
      assert.ok(entry.recentForm !== undefined, `${entry.teamName} should have recentForm`);
      assert.ok(entry.recentForm!.length <= entry.played, `${entry.teamName} recentForm should not exceed played`);
      for (const result of entry.recentForm!) {
        assert.ok(["W", "D", "L"].includes(result), `${entry.teamName} has invalid recentForm entry: ${result}`);
      }
    }
  });
}

test("U-21 EAST/WEST standings expose the shared as-of label", () => {
  assert.equal(u21EastStandings.asOfLabel, "2026/09/13 更新");
  assert.equal(u21WestStandings.asOfLabel, "2026/09/13 更新");
});
