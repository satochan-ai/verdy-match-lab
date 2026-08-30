import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { toU21SeasonHistoryEntry, u21Fixtures } from "./u21-fixtures.ts";
import { validateFixtures } from "./fixture-validation.ts";

const now = new Date("2026-08-30T00:00:00+09:00");

test("U-21 fixture collection is valid and has one finished plus five upcoming fixtures", () => {
  assert.equal(validateFixtures(u21Fixtures).length, 0);
  assert.equal(u21Fixtures.length, 6);
  assert.equal(u21Fixtures.find((fixture) => fixture.id === "u21-match-1")?.detailMatchId, "u21-match-1");
});

test("U-21 NEXT is 09.12 U-21浦和 and NEXT 5 excludes finished", () => {
  assert.equal(getNextFixture(u21Fixtures, now)?.opponentName, "U-21浦和レッズ");
  const upcoming = getUpcomingFixtures(u21Fixtures, now, 5);
  assert.equal(upcoming.length, 5);
  assert.equal(upcoming.some((fixture) => fixture.status === "finished"), false);
});

test("U-21 TBD Nagoya remains after confirmed fixtures", () => {
  const upcoming = getUpcomingFixtures(u21Fixtures, now, 5);
  assert.equal(upcoming.at(-1)?.opponentName, "U-21名古屋グランパス");
  assert.equal(upcoming.at(-1)?.kickoffAt, undefined);
  assert.equal(upcoming.at(-1)?.kickoffStatus, "date_range");
});

test("U-21 LAST and HISTORY are derived from the finished fixture", () => {
  assert.equal(getLatestFinishedFixture(u21Fixtures)?.opponentName, "FC東京U-21");
  assert.equal(getSeasonHistory(u21Fixtures).some((fixture) => fixture.id === "u21-match-1"), true);
  assert.equal(toU21SeasonHistoryEntry(getLatestFinishedFixture(u21Fixtures)!).result, "loss");
});

test("finishing 09.12 automatically moves NEXT, LAST and HISTORY", () => {
  const simulated = u21Fixtures.map((fixture) => fixture.id === "u21-next-1"
    ? { ...fixture, status: "finished" as const, score: fixture.isHome ? { home: 2, away: 1 } : { home: 1, away: 2 } }
    : fixture);
  assert.equal(getNextFixture(simulated, now)?.opponentName, "U-21清水エスパルス");
  assert.equal(getLatestFinishedFixture(simulated)?.opponentName, "U-21浦和レッズ");
  assert.deepEqual(getSeasonHistory(simulated).map((fixture) => fixture.opponentName), ["U-21浦和レッズ", "FC東京U-21"]);
});
