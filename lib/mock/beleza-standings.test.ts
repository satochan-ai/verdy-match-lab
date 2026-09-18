import assert from "node:assert/strict";
import test from "node:test";
import { weLeagueStandings, kracieCupStandings } from "./beleza-standings.ts";

test("WE League standings hold exactly 12 clubs with no duplicate team names", () => {
  assert.equal(weLeagueStandings.entries.length, 12);
  assert.equal(new Set(weLeagueStandings.entries.map((entry) => entry.teamName)).size, 12);
});

test("WE League standings register 日テレ・東京ヴェルディベレーザ at 3rd with the official values", () => {
  const belezaEntries = weLeagueStandings.entries.filter((entry) => entry.teamName === "日テレ・東京ヴェルディベレーザ");
  assert.equal(belezaEntries.length, 1);
  assert.deepEqual(belezaEntries[0], {
    rank: 3,
    teamName: "日テレ・東京ヴェルディベレーザ",
    played: 3,
    wins: 2,
    draws: 0,
    losses: 1,
    goalsFor: 7,
    goalsAgainst: 5,
    goalDifference: 2,
    points: 6,
  });
});

test("WE League standings entries are internally consistent (played/points/goal difference derive from record)", () => {
  for (const entry of weLeagueStandings.entries) {
    assert.equal(entry.wins + entry.draws + entry.losses, entry.played);
    assert.equal(entry.wins * 3 + entry.draws, entry.points);
    assert.equal(entry.goalsFor - entry.goalsAgainst, entry.goalDifference);
    assert.ok(entry.played >= 0 && entry.points >= 0 && entry.goalsFor >= 0 && entry.goalsAgainst >= 0);
  }
});

test("WE League standings expose the as-of label", () => {
  assert.equal(weLeagueStandings.asOfLabel, "2026/09/06 18:57 現在");
});

test("Kracie Cup standings hold exactly 12 clubs and allow tied ranks (no unique-rank assertion)", () => {
  assert.equal(kracieCupStandings.entries.length, 12);
  assert.equal(new Set(kracieCupStandings.entries.map((entry) => entry.teamName)).size, 12);
  // 同順位を許可する（2位・4位・7位・11位に重複あり）。
  const ranks = kracieCupStandings.entries.map((entry) => entry.rank);
  assert.equal(new Set(ranks).size < ranks.length, true);
});

test("Kracie Cup standings register 日テレ・東京ヴェルディベレーザ at (tied) 4th with the official values", () => {
  const belezaEntries = kracieCupStandings.entries.filter((entry) => entry.teamName === "日テレ・東京ヴェルディベレーザ");
  assert.equal(belezaEntries.length, 1);
  assert.deepEqual(belezaEntries[0], {
    rank: 4,
    teamName: "日テレ・東京ヴェルディベレーザ",
    played: 1,
    wins: 1,
    draws: 0,
    losses: 0,
    goalsFor: 3,
    goalsAgainst: 2,
    goalDifference: 1,
    points: 3,
    regulationWins: 1,
    penaltyWins: 0,
    penaltyLosses: 0,
    regulationLosses: 0,
  });
});

test("Kracie Cup standings entries are internally consistent (regulation/PK breakdown sums to wins/losses, played, goal difference)", () => {
  for (const entry of kracieCupStandings.entries) {
    assert.equal(entry.wins + entry.draws + entry.losses, entry.played);
    assert.equal(entry.goalsFor - entry.goalsAgainst, entry.goalDifference);
    assert.ok(entry.played >= 0 && entry.points >= 0 && entry.goalsFor >= 0 && entry.goalsAgainst >= 0);
    // 90分/PK戦の内訳が勝敗の合計と一致すること（推測補完していないことの確認）。
    assert.equal((entry.regulationWins ?? 0) + (entry.penaltyWins ?? 0), entry.wins);
    assert.equal((entry.regulationLosses ?? 0) + (entry.penaltyLosses ?? 0), entry.losses);
  }
});

test("Kracie Cup standings expose the as-of label", () => {
  assert.equal(kracieCupStandings.asOfLabel, "2026/09/13 19:57 現在");
});
