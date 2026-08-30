import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { belezaFixtures, toBelezaSeasonHistoryEntry } from "./beleza-fixtures.ts";
import { validateFixtures } from "./fixture-validation.ts";

const now = new Date("2026-08-30T00:00:00+09:00");

test("BELEZA fixture collection is valid", () => {
  assert.equal(validateFixtures(belezaFixtures).length, 0);
  assert.equal(belezaFixtures.length, 7);
  assert.equal(belezaFixtures.find((fixture) => fixture.id === "beleza-match-2")?.detailMatchId, "beleza-match-2");
});

test("BELEZA NEXT is 09.05浦和 and NEXT5 excludes 08.29 finished", () => {
  assert.equal(getNextFixture(belezaFixtures, now)?.opponentName, "三菱重工浦和レッズレディース");
  const upcoming = getUpcomingFixtures(belezaFixtures, now, 5);
  assert.equal(upcoming.length, 5);
  assert.equal(upcoming.every((fixture) => fixture.status === "scheduled"), true);
  assert.deepEqual(upcoming.map((fixture) => fixture.opponentName), ["三菱重工浦和レッズレディース", "INAC神戸レオネッサ", "ちふれASエルフェン埼玉", "アルビレックス新潟レディース", "セレッソ大阪ヤンマーレディース"]);
});

test("BELEZA LAST, HISTORY and 08.29 result are derived", () => {
  const last = getLatestFinishedFixture(belezaFixtures)!;
  assert.equal(last.opponentName, "AC長野パルセイロ・レディース");
  assert.equal(getSeasonHistory(belezaFixtures).some((fixture) => fixture.id === "beleza-match-2"), true);
  assert.equal(toBelezaSeasonHistoryEntry(last).result, "win");
});

test("finishing 09.05 automatically moves BELEZA NEXT, LAST and HISTORY", () => {
  const simulated = belezaFixtures.map((fixture) => fixture.id === "beleza-next-2"
    ? { ...fixture, status: "finished" as const, score: { home: 0, away: 1 } }
    : fixture);
  assert.equal(getNextFixture(simulated, now)?.opponentName, "INAC神戸レオネッサ");
  assert.equal(getLatestFinishedFixture(simulated)?.opponentName, "三菱重工浦和レッズレディース");
  assert.deepEqual(getSeasonHistory(simulated).map((fixture) => fixture.opponentName), ["三菱重工浦和レッズレディース", "AC長野パルセイロ・レディース", "ジェフユナイテッド市原・千葉レディース"]);
});
