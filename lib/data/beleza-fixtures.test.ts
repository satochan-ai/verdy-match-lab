import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { belezaFixtures, toBelezaSeasonHistoryEntry } from "./beleza-fixtures.ts";
import { validateFixtures } from "./fixture-validation.ts";

const now = new Date("2026-09-06T00:00:00+09:00");

test("BELEZA fixture collection is valid", () => {
  assert.equal(validateFixtures(belezaFixtures).length, 0);
  assert.equal(belezaFixtures.length, 7);
  // /beleza/matches/[id] now renders beleza-match-1/2/3 (archived) individually in addition
  // to the current snapshot (beleza-next-3, INAC), so every finished BELEZA match carries a
  // real (non-fabricated) detailMatchId equal to its own id.
  for (const id of ["beleza-match-1", "beleza-match-2", "beleza-match-3", "beleza-next-3"]) {
    assert.equal(belezaFixtures.find((fixture) => fixture.id === id)?.detailMatchId, id);
  }
});

test("BELEZA season history entries carry detailMatchId through for mobile/desktop history links", () => {
  const history = getSeasonHistory(belezaFixtures).map(toBelezaSeasonHistoryEntry);
  assert.equal(history.length, 3);
  assert.equal(history.every((entry) => entry.detailMatchId === entry.id), true);
});

test("BELEZA NEXT is 09.12 INAC神戸 and NEXT5 excludes finished fixtures", () => {
  assert.equal(getNextFixture(belezaFixtures, now)?.opponentName, "INAC神戸レオネッサ");
  const upcoming = getUpcomingFixtures(belezaFixtures, now, 5);
  assert.equal(upcoming.length, 4);
  assert.equal(upcoming.every((fixture) => fixture.status === "scheduled"), true);
  assert.deepEqual(upcoming.map((fixture) => fixture.opponentName), ["INAC神戸レオネッサ", "ちふれASエルフェン埼玉", "アルビレックス新潟レディース", "セレッソ大阪ヤンマーレディース"]);
});

test("BELEZA LAST, HISTORY and 09.05 浦和 result are derived", () => {
  const last = getLatestFinishedFixture(belezaFixtures)!;
  assert.equal(last.opponentName, "三菱重工浦和レッズレディース");
  assert.equal(toBelezaSeasonHistoryEntry(last).result, "loss");
  const history = getSeasonHistory(belezaFixtures);
  assert.equal(history.length, 3);
  assert.deepEqual(history.map((fixture) => fixture.opponentName), [
    "三菱重工浦和レッズレディース", "AC長野パルセイロ・レディース", "ジェフユナイテッド市原・千葉レディース",
  ]);
  assert.equal(history.filter((fixture) => fixture.id === "beleza-match-3").length, 1);
});

test("finishing 09.12 automatically moves BELEZA NEXT, LAST and HISTORY", () => {
  const simulated = belezaFixtures.map((fixture) => fixture.id === "beleza-next-3"
    ? { ...fixture, status: "finished" as const, score: { home: 2, away: 0 } }
    : fixture);
  assert.equal(getNextFixture(simulated, now)?.opponentName, "ちふれASエルフェン埼玉");
  assert.equal(getLatestFinishedFixture(simulated)?.opponentName, "INAC神戸レオネッサ");
  assert.deepEqual(getSeasonHistory(simulated).map((fixture) => fixture.opponentName), [
    "INAC神戸レオネッサ", "三菱重工浦和レッズレディース", "AC長野パルセイロ・レディース", "ジェフユナイテッド市原・千葉レディース",
  ]);
});
