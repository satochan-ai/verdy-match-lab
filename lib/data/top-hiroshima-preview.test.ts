import assert from "node:assert/strict";
import test from "node:test";
import { topFixtures } from "./top-fixtures.ts";

test("Hiroshima MATCH PREVIEW reads its match data from the existing fixture (第9節 / 10.11 15:00 / 味の素スタジアム)", () => {
  const fixture = topFixtures.find((item) => item.id === "sched-hiroshima")!;
  assert.equal(fixture.competition.round, "第9節");
  assert.equal(fixture.kickoffAt, "2026-10-11T15:00:00+09:00");
  assert.equal(fixture.venue, "味の素スタジアム");
  assert.equal(fixture.opponentName, "サンフレッチェ広島");
  assert.equal(fixture.isHome, true);
});
