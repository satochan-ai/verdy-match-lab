import assert from "node:assert/strict";
import test from "node:test";
import { hiroshimaResult as match } from "../mock/top-hiroshima-result.ts";
import { topFixtures } from "./top-fixtures.ts";
import { getLatestFinishedFixture, getUpcomingFixtures } from "./fixture-selectors.ts";
import { getMatchResult } from "../match/result.ts";
test("Hiroshima official result, squads, goals, substitutions and cards stay confirmed", () => {
  assert.equal(getMatchResult(match), "loss");
  assert.deepEqual([match.homeScore, match.awayScore], [0, 2]);
  for (const lineup of Object.values(match.actualLineups!)) {
    assert.equal(Object.values(lineup.starters).flat().length, 11);
    assert.equal(Object.values(lineup.bench).flat().length, 9);
    assert.equal(lineup.formation, undefined);
  }
  assert.deepEqual(match.goals!.map(g => g.minute), ["47'", "58'"]);
  assert.equal(match.substitutions!.length, 10);
  assert.deepEqual(match.cards!.map(c => c.minute), ["14'", "17'", "40'", "55'"]);
});
test("Hiroshima result advances LAST and NEXT5 without duplicate fixtures", () => {
  assert.equal(getLatestFinishedFixture(topFixtures)?.id, match.id);
  const next = getUpcomingFixtures(topFixtures, new Date("2026-10-12T00:00:00+09:00"), 5);
  assert.deepEqual(next.map(f => f.opponentName), ["FC東京", "横浜F・マリノス", "アビスパ福岡", "V・ファーレン長崎", "清水エスパルス"]);
  assert.equal(new Set(topFixtures.map(f => f.id)).size, topFixtures.length);
});
