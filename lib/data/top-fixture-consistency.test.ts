import assert from "node:assert/strict";
import test from "node:test";
import { matches } from "../mock/matches.ts";
import { scheduleMatches } from "../mock/schedule.ts";
import { validateTopFixtureConsistency } from "./top-fixture-consistency.ts";

test("current schedule and Match/mock fixtures are consistent", () => {
  assert.deepEqual(validateTopFixtureConsistency(scheduleMatches, matches), []);
});

test("missing detail target is an error", () => {
  const schedule = [{ ...scheduleMatches[0], detailMatchId: "missing" }];
  assert.equal(validateTopFixtureConsistency(schedule, matches).find((i) => i.field === "detailMatchId")?.severity, "error");
});

test("finished score mismatch is an error", () => {
  const schedule = [{ ...scheduleMatches[4], homeScore: 9 }];
  const issue = validateTopFixtureConsistency(schedule, matches).find((i) => i.field === "score");
  assert.equal(issue?.severity, "error");
  assert.deepEqual(issue?.scheduleValue, { home: 9, away: 2 });
});

test("HOME/AWAY mismatch is an error", () => {
  const schedule = [{ ...scheduleMatches[4], isVerdyHome: false }];
  assert.equal(validateTopFixtureConsistency(schedule, matches).find((i) => i.field === "isVerdyHome")?.severity, "error");
});

test("kickoff mismatch is an error", () => {
  const schedule = [{ ...scheduleMatches[4], kickoffAt: "2026-08-30T19:00:00+09:00" }];
  assert.equal(validateTopFixtureConsistency(schedule, matches).find((i) => i.field === "kickoffAt")?.severity, "error");
});

test("known short/full opponent names do not create a false positive", () => {
  const schedule = [{ ...scheduleMatches[5], detailMatchId: "match-10" }];
  const match = matches.find((item) => item.id === "match-10")!;
  assert.equal(validateTopFixtureConsistency(schedule, [match]).some((i) => i.field === "opponent"), false);
});

test("round mismatch is reported as a warning", () => {
  const schedule = [{ ...scheduleMatches[4], round: "第99節" }];
  const issue = validateTopFixtureConsistency(schedule, matches).find((i) => i.field === "round");
  assert.equal(issue?.severity, "warning");
});

test("consistency validation does not mutate its inputs", () => {
  const schedule = structuredClone(scheduleMatches);
  const match = structuredClone(matches);
  const beforeSchedule = JSON.stringify(schedule);
  const beforeMatch = JSON.stringify(match);
  validateTopFixtureConsistency(schedule, match);
  assert.equal(JSON.stringify(schedule), beforeSchedule);
  assert.equal(JSON.stringify(match), beforeMatch);
});
