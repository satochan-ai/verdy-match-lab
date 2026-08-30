import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { belezaFixtures, toBelezaSeasonHistoryEntry } from "./beleza-fixtures.ts";
import { u21Fixtures } from "./u21-fixtures.ts";
import type { CommonFixture } from "../types/fixture.ts";

const now = new Date("2026-08-30T00:00:00+09:00");
const withStatus = (fixtures: readonly CommonFixture[], ids: readonly string[], status: "finished" | "postponed" | "cancelled" | "abandoned") =>
  fixtures.map((fixture) => ids.includes(fixture.id) ? { ...fixture, status, score: status === "finished" ? { home: 1, away: 1 } : undefined } : fixture);

test("U-21 and BELEZA have unique IDs and stay within category boundaries", () => {
  const all = [...u21Fixtures, ...belezaFixtures];
  assert.equal(new Set(all.map((fixture) => fixture.id)).size, all.length);
  assert.equal(new Set(all.flatMap((fixture) => fixture.detailMatchId ? [fixture.detailMatchId] : [])).size, 2);
  assert.equal(u21Fixtures.every((fixture) => fixture.category === "u21"), true);
  assert.equal(belezaFixtures.every((fixture) => fixture.category === "beleza"), true);
});

test("both categories keep NEXT5 capped at five with a past scheduled fixture excluded", () => {
  for (const fixtures of [u21Fixtures, belezaFixtures]) {
    const pastScheduled = { ...fixtures[2], id: `${fixtures[0].category}-past`, kickoffAt: "2026-08-29T18:00:00+09:00" };
    const extended = [...fixtures, pastScheduled, pastScheduled, pastScheduled];
    assert.equal(getUpcomingFixtures(extended, now, 5).length, 5);
    assert.equal(getUpcomingFixtures(extended, now, 5).some((fixture) => fixture.id.endsWith("-past")), false);
  }
});

test("postponed, cancelled, abandoned, live and half_time are excluded from all selectors", () => {
  const base = u21Fixtures.slice(1, 2)[0];
  const statuses = ["postponed", "cancelled", "abandoned", "live", "half_time"] as const;
  for (const status of statuses) {
    const fixture = { ...base, id: `status-${status}`, status, score: undefined };
    assert.equal(getNextFixture([fixture], now), undefined);
    assert.deepEqual(getUpcomingFixtures([fixture], now), []);
    assert.equal(getLatestFinishedFixture([fixture]), undefined);
    assert.deepEqual(getSeasonHistory([fixture]), []);
  }
});

test("TBD-only collections provide a provisional NEXT, while confirmed fixtures stay first", () => {
  const tbd = { ...u21Fixtures.at(-1)!, id: "tbd-only", kickoffAt: undefined, kickoffStatus: "date_range" as const };
  assert.equal(getNextFixture([tbd], now)?.id, "tbd-only");
  assert.equal(getUpcomingFixtures([tbd, u21Fixtures[1]], now)[0].id, u21Fixtures[1].id);
  assert.equal(getUpcomingFixtures([tbd, u21Fixtures[1]], now).at(-1)?.id, "tbd-only");
});

test("kickoff boundary includes 17:59 and excludes a still-scheduled 18:01 fixture", () => {
  const kickoff = { ...u21Fixtures[2], id: "boundary", kickoffAt: "2026-09-12T18:00:00+09:00" };
  assert.equal(getNextFixture([kickoff], new Date("2026-09-12T17:59:00+09:00"))?.id, "boundary");
  assert.equal(getNextFixture([kickoff], new Date("2026-09-12T18:01:00+09:00")), undefined);
});

test("two consecutive finishes update NEXT, LAST and HISTORY for both categories", () => {
  const cases = [[u21Fixtures, ["u21-next-1", "u21-next-2"], "u21-next-3", "u21-next-2"], [belezaFixtures, ["beleza-next-2", "beleza-next-3"], "beleza-next-4", "beleza-next-3"]] as const;
  for (const [fixtures, finishedIds, nextId, lastId] of cases) {
    const simulated = withStatus(fixtures, finishedIds, "finished");
    assert.equal(getNextFixture(simulated, now)?.id, nextId);
    assert.equal(getLatestFinishedFixture(simulated)?.id, lastId);
    assert.deepEqual(getSeasonHistory(simulated).slice(0, 2).map((fixture) => fixture.id), [lastId, finishedIds[0]]);
  }
});

test("adapters preserve stored home/away score direction and derive DRAW", () => {
  assert.deepEqual(u21Fixtures.find((fixture) => fixture.id === "u21-match-1")?.score, { home: 0, away: 3 });
  assert.deepEqual(belezaFixtures.find((fixture) => fixture.id === "beleza-match-2")?.score, { home: 1, away: 4 });
  const draw = { ...belezaFixtures.find((fixture) => fixture.id === "beleza-match-2")!, id: "draw", score: { home: 1, away: 1 } };
  assert.equal(toBelezaSeasonHistoryEntry(getSeasonHistory([draw])[0]).result, "draw");
});
