import assert from "node:assert/strict";
import test from "node:test";
import { weLeagueStandings, kracieCupStandings } from "./beleza-standings.ts";

test("WE League standings match all 12 official records as of 2026/11/08 15:01", () => {
  assert.equal(weLeagueStandings.entries.length, 12);
  assert.equal(new Set(weLeagueStandings.entries.map((entry) => entry.teamName)).size, 12);
  // 公式列順：順位・クラブ・勝点・試合・勝・分・敗・得点・失点・得失。
  assert.deepEqual(weLeagueStandings.entries.map(e => [e.rank, e.teamName, e.points, e.played, e.wins, e.draws, e.losses, e.goalsFor, e.goalsAgainst, e.goalDifference]), [
    [1, "三菱重工浦和レッズレディース", 18, 8, 6, 0, 2, 16, 5, 11],
    [2, "ジェフ千葉レディース", 16, 8, 5, 1, 2, 11, 7, 4],
    [3, "セレッソ大阪ヤンマーレディース", 15, 8, 4, 3, 1, 16, 9, 7],
    [4, "日テレ・東京ヴェルディベレーザ", 15, 8, 5, 0, 3, 17, 12, 5],
    [5, "マイナビ仙台", 13, 8, 4, 1, 3, 12, 12, 0],
    [6, "サンフレッチェ広島レジーナ", 12, 8, 4, 0, 4, 11, 11, 0],
    [7, "ノジマステラ神奈川相模原", 12, 8, 3, 3, 2, 7, 11, -4],
    [8, "INAC神戸レオネッサ", 10, 7, 3, 1, 3, 14, 13, 1],
    [9, "ちふれASエルフェン埼玉", 7, 8, 2, 1, 5, 8, 15, -7],
    [10, "RB大宮アルディージャWOMEN", 6, 8, 2, 0, 6, 5, 12, -7],
    [11, "アルビレックス新潟レディース", 5, 7, 1, 2, 4, 5, 9, -4],
    [12, "AC長野パルセイロ・レディース", 4, 8, 0, 4, 4, 6, 12, -6],
  ]);
});

test("WE League standings register 日テレ・東京ヴェルディベレーザ at 4th with the official values", () => {
  const belezaEntries = weLeagueStandings.entries.filter((entry) => entry.teamName === "日テレ・東京ヴェルディベレーザ");
  assert.equal(belezaEntries.length, 1);
  assert.deepEqual(belezaEntries[0], {
    rank: 4,
    teamName: "日テレ・東京ヴェルディベレーザ",
    played: 8,
    wins: 5,
    draws: 0,
    losses: 3,
    goalsFor: 17,
    goalsAgainst: 12,
    goalDifference: 5,
    points: 15,
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
  assert.equal(weLeagueStandings.asOfLabel, "2026/11/08 15:01 現在");
});

test("Kracie Cup standings hold exactly 12 clubs with unique ranks (no ties this matchday)", () => {
  assert.equal(kracieCupStandings.entries.length, 12);
  assert.equal(new Set(kracieCupStandings.entries.map((entry) => entry.teamName)).size, 12);
  const ranks = kracieCupStandings.entries.map((entry) => entry.rank);
  assert.equal(new Set(ranks).size, ranks.length);
});

test("Kracie Cup standings register 日テレ・東京ヴェルディベレーザ at 2nd with the official values", () => {
  const belezaEntries = kracieCupStandings.entries.filter((entry) => entry.teamName === "日テレ・東京ヴェルディベレーザ");
  assert.equal(belezaEntries.length, 1);
  assert.deepEqual(belezaEntries[0], {
    rank: 2,
    teamName: "日テレ・東京ヴェルディベレーザ",
    played: 6,
    wins: 4,
    draws: 0,
    losses: 2,
    goalsFor: 14,
    goalsAgainst: 11,
    goalDifference: 3,
    points: 12,
    regulationWins: 4,
    penaltyWins: 0,
    penaltyLosses: 0,
    regulationLosses: 2,
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
  assert.equal(kracieCupStandings.asOfLabel, "2026/10/12 08:36 現在（公式速報）");
});
