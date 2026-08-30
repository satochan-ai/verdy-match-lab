import assert from "node:assert/strict";
import test from "node:test";
import { matches } from "../mock/matches.ts";
import { scheduleMatches } from "../mock/schedule.ts";
import { topFixtures } from "./top-fixtures.ts";
import { enrichMatchFixtureMeta, enrichMatchesFixtureMeta } from "./top-match-fixture-meta.ts";
import { validateTopFixtureConsistency } from "./top-fixture-consistency.ts";

test("adds fixtureMeta from the explicit detailMatchId relationship", () => {
  const match = { ...matches.find((item) => item.id === "match-10")!, fixtureMeta: undefined };
  const enriched = enrichMatchFixtureMeta(match, topFixtures);
  assert.deepEqual(enriched.fixtureMeta, { competition: "2026 J1リーグ", roundLabel: "第5節" });
});

test("preserves existing metadata and does not mutate the input", () => {
  const match = matches.find((item) => item.id === "match-9")!;
  const before = structuredClone(match);
  const enriched = enrichMatchFixtureMeta(match, topFixtures);
  assert.equal(enriched, match);
  assert.deepEqual(match, before);
});

test("leaves unmatched and historical matches unchanged", () => {
  const match = { ...matches[0], id: "old-match" };
  assert.equal(enrichMatchFixtureMeta(match, topFixtures), match);
});

test("enriches Kashima, Emperor Cup, and Kobe DB-like matches", () => {
  const ids = ["match-9", "match-8", "match-10"];
  const dbLike = ids.map((id) => ({ ...matches.find((item) => item.id === id)!, fixtureMeta: undefined }));
  const enriched = enrichMatchesFixtureMeta(dbLike, topFixtures);
  assert.deepEqual(enriched.map((item) => item.fixtureMeta), [
    { competition: "2026 J1リーグ", roundLabel: "第4節" },
    { competition: "天皇杯 JFA 第106回全日本サッカー選手権大会", roundLabel: "2回戦" },
    { competition: "2026 J1リーグ", roundLabel: "第5節" },
  ]);
});

test("enriched DB-like matches remove metadata warnings from consistency validation", () => {
  const dbLike = matches.map((match) => ({ ...match, fixtureMeta: undefined }));
  const issues = validateTopFixtureConsistency(scheduleMatches, enrichMatchesFixtureMeta(dbLike, topFixtures));
  assert.equal(issues.filter((issue) => issue.severity === "error").length, 0);
  assert.equal(issues.filter((issue) => issue.severity === "warning").length, 0);
});
