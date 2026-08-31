import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getUpcomingFixtures } from "./fixture-selectors.ts";
import { topFixtures } from "./top-fixtures.ts";
import { validateFixtures } from "./fixture-validation.ts";

const now = new Date("2026-08-30T00:00:00+09:00");

test("TOP schedule adapter produces valid CommonFixtures", () => {
  assert.equal(validateFixtures(topFixtures).length, 0);
  assert.equal(topFixtures.length, 10);
  assert.deepEqual(topFixtures.find((fixture) => fixture.id === "sched-kashima")?.score, { home: 0, away: 2 });
  assert.equal(topFixtures.find((fixture) => fixture.id === "sched-kashima")?.detailMatchId, "match-9");
});

test("TOP NEXT and NEXT5 use the schedule-derived CommonFixture selector", () => {
  assert.equal(getNextFixture(topFixtures, now)?.opponentName, "ヴィッセル神戸");
  assert.deepEqual(getUpcomingFixtures(topFixtures, now, 5).map((fixture) => fixture.opponentName), ["ヴィッセル神戸", "セレッソ大阪", "レイラック滋賀", "ジェフユナイテッド千葉", "浦和レッズ"]);
  assert.equal(getUpcomingFixtures(topFixtures, now, 5).length, 5);
});

test("TOP LAST is 08.29鹿島 and finished fixtures never enter NEXT", () => {
  assert.equal(getLatestFinishedFixture(topFixtures, )?.opponentName, "鹿島アントラーズ");
  assert.equal(getUpcomingFixtures(topFixtures, now).some((fixture) => fixture.status === "finished"), false);
});

test("TOP finishing simulations update NEXT and LAST without changing detail IDs", () => {
  const first = topFixtures.map((fixture) => fixture.id === "sched-kobe" ? { ...fixture, status: "finished" as const, score: { home: 0, away: 1 } } : fixture);
  assert.equal(getNextFixture(first, now)?.opponentName, "セレッソ大阪");
  assert.equal(getLatestFinishedFixture(first)?.opponentName, "ヴィッセル神戸");
  const second = first.map((fixture) => fixture.id === "sched-cerezo" ? { ...fixture, status: "finished" as const, score: { home: 1, away: 0 } } : fixture);
  assert.equal(getNextFixture(second, now)?.opponentName, "レイラック滋賀");
  assert.equal(getLatestFinishedFixture(second)?.opponentName, "セレッソ大阪");
  assert.equal(topFixtures.find((fixture) => fixture.id === "sched-kashima")?.detailMatchId, "match-9");
});
