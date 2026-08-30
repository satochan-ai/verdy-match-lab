import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { validateFixture, validateFixtures } from "./fixture-validation.ts";
import type { CommonFixture } from "../types/fixture.ts";

const base = (overrides: Partial<CommonFixture> = {}): CommonFixture => ({
  id: "fixture-1", category: "top", teamName: "Tokyo Verdy", opponentName: "Opponent",
  competition: { name: "League" }, kickoffStatus: "confirmed", kickoffAt: "2026-09-01T10:00:00Z",
  isHome: true, status: "scheduled", ...overrides,
});
const now = new Date("2026-08-30T00:00:00Z");

test("upcoming selectors sort confirmed fixtures and retain TBD order", () => {
  const fixtures = [
    base({ id: "tbd", kickoffStatus: "tbd", kickoffAt: undefined, category: "beleza" }),
    base({ id: "late", kickoffAt: "2026-09-05T10:00:00Z", category: "u21" }),
    base({ id: "early", kickoffAt: "2026-09-02T10:00:00Z" }),
    base({ id: "range", kickoffStatus: "date_range", kickoffAt: undefined }),
    base({ id: "finished", status: "finished", kickoffAt: "2026-08-01T10:00:00Z", score: { home: 1, away: 0 } }),
  ];
  assert.equal(getNextFixture(fixtures, now)?.id, "early");
  assert.deepEqual(getUpcomingFixtures(fixtures, now, 4).map((f) => f.id), ["early", "late", "tbd", "range"]);
  assert.deepEqual(getUpcomingFixtures(fixtures, now, 0), []);
});

test("upcoming falls back to pending fixture when no confirmed future exists", () => {
  const fixtures = [base({ id: "past", kickoffAt: "2026-08-01T10:00:00Z" }), base({ id: "pending", kickoffStatus: "date_range", kickoffAt: undefined })];
  assert.equal(getNextFixture(fixtures, now)?.id, "pending");
});

test("latest and season history return finished scored fixtures", () => {
  const fixtures = [
    base({ id: "top-old", status: "finished", kickoffAt: "2026-07-01T10:00:00Z", score: { home: 0, away: 1 } }),
    base({ id: "u21-new", category: "u21", status: "finished", kickoffAt: "2026-08-01T10:00:00Z", score: { home: 2, away: 2 } }),
    base({ id: "live", status: "live", kickoffAt: "2026-08-20T10:00:00Z" }),
  ];
  assert.equal(getLatestFinishedFixture(fixtures)?.id, "u21-new");
  assert.deepEqual(getSeasonHistory(fixtures).map((f) => f.id), ["u21-new", "top-old"]);
  assert.deepEqual(getSeasonHistory(fixtures, { category: "u21" }).map((f) => f.id), ["u21-new"]);
});

test("validation accepts a confirmed finished fixture", () => {
  assert.deepEqual(validateFixture(base({ status: "finished", score: { home: 2, away: 1 }, sourceUrl: "https://example.com/match" })), []);
});

test("validation catches kickoff, score, required fields and URL errors", () => {
  const errors = validateFixture(base({ id: "", teamName: "", kickoffAt: "invalid", score: { home: -1, away: 1 }, sourceUrl: "ftp://example.com" }));
  assert.ok(errors.some((error) => error.field === "id"));
  assert.ok(errors.some((error) => error.field === "teamName"));
  assert.ok(errors.some((error) => error.field === "kickoffAt"));
  assert.ok(errors.some((error) => error.field === "score"));
  assert.ok(errors.some((error) => error.field === "sourceUrl"));
});

test("validation catches duplicate fixture and detail ids", () => {
  const fixtures = [base({ id: "same", detailMatchId: "detail" }), base({ id: "same", detailMatchId: "detail" })];
  assert.ok(validateFixtures(fixtures).some((error) => error.message === "duplicate fixture id"));
  assert.ok(validateFixtures(fixtures).some((error) => error.message === "duplicate detailMatchId"));
});
