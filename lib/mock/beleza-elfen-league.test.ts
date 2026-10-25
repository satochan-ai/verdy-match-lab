import assert from "node:assert/strict";
import test from "node:test";
import { belezaElfenLeagueMatch as match, belezaElfenLeagueGoals as goals, belezaElfenLeagueFormation as formation, belezaElfenLeagueSubstitutions as subs, belezaElfenLeagueReview as review } from "./beleza-elfen-league.ts";
import { belezaFixtures } from "../data/beleza-fixtures.ts";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory } from "../data/fixture-selectors.ts";
import { getCategoryDetailHref } from "../data/category-match-details.ts";

test("10/24 result registers the existing ID, advances LAST/NEXT and preserves both previous results", () => {
  const fixture = belezaFixtures.find(f => f.id === match.id)!;
  assert.deepEqual([fixture.status, fixture.kickoffAt, fixture.score], ["finished", "2026-10-24T12:03:00+09:00", { home: 4, away: 1 }]);
  assert.equal(getLatestFinishedFixture(belezaFixtures)?.id, match.id);
  assert.equal(getNextFixture(belezaFixtures, new Date("2026-10-25T12:00:00+09:00"))?.id, "beleza-next-11");
  assert.equal(getCategoryDetailHref("beleza", fixture.detailMatchId), "/beleza/matches/beleza-next-10");
  const history = getSeasonHistory(belezaFixtures);
  for (const id of ["beleza-next-4", "beleza-next-9", "beleza-next-10"]) assert.equal(history.filter(f => f.id === id).length, 1);
  assert.deepEqual(goals.map(g => g.minute), ["7'", "14'", "35'", "65'", "81'"]);
});

test("confirmed 3-4-2-1 preserves screen left-to-right order and substitution consistency", () => {
  assert.equal(formation.formation, "3-4-2-1");
  assert.equal(new Set(formation.starters.map(p => p.number)).size, 11);
  assert.deepEqual(formation.starters.slice(1, 4).map(p => p.name), ["松岡 瑛茉", "土光 真代", "青木 夕菜"]);
  assert.deepEqual(formation.starters.slice(4, 8).map(p => p.name), ["氏原 里穂菜", "塩越 柚歩", "眞城 美春", "式田 和"]);
  assert.deepEqual(formation.starters.slice(8, 10).map(p => p.name), ["北村 菜々美", "猶本 光"]);
  assert.equal(formation.starters[10].name, "樋渡 百花");
  assert.deepEqual(subs.map(s => s.minute), ["HT", "HT", "HT", "66'", "85'"]);
  for (const sub of subs) assert.ok(formation.starters.some(p => p.name === sub.playerOut));
  assert.equal(review.length, 6);
  assert.ok(review[4].includes("13本に対し、EL埼玉が15本"));
});
