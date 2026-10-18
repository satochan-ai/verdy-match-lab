import assert from "node:assert/strict";
import test from "node:test";
import { belezaReginaLeagueMatch as match, belezaReginaLeagueGoals as goals, belezaReginaLeagueActualLineup as own, reginaLeagueActualLineup as opponent, belezaReginaLeagueSubstitutions as subs, belezaReginaLeagueHalfScores as halves, belezaReginaLeagueCards as cards } from "./beleza-regina-league.ts";
import { belezaReginaMatch } from "./beleza.ts";
import { belezaFixtures } from "../data/beleza-fixtures.ts";
import { getLatestFinishedFixture, getNextFixture, getUpcomingFixtures } from "../data/fixture-selectors.ts";
import { getCategoryDetailHref } from "../data/category-match-details.ts";

test("10/18 official result preserves 75 minute equalizer and separate 10/11 cup result", () => {
  assert.deepEqual([match.homeScore, match.awayScore], [2, 3]);
  assert.deepEqual(halves, { firstHalf: "1-1", secondHalf: "1-2" });
  assert.deepEqual(goals.map(g => g.minute), ["14'", "45'", "55'", "75'", "89'"]);
  assert.deepEqual([belezaReginaMatch.id, belezaReginaMatch.homeScore, belezaReginaMatch.awayScore], ["beleza-next-8", 3, 1]);
  assert.equal(cards.length, 0);
});
test("official squads and substitutions are consistent without inferred formations", () => {
  for (const lineup of [own, opponent]) {
    assert.equal(Object.values(lineup.starters).flat().length, 11);
    assert.equal(Object.values(lineup.bench).flat().length, 7);
    assert.equal(lineup.formation, undefined);
  }
  for (const [team, lineup, count] of [[match.awayTeamName, own, 5], [match.homeTeamName, opponent, 4]] as const) {
    const starters = new Set(Object.values(lineup.starters).flat().map(p => p.replace(/^\d+ /, "")));
    const bench = new Set(Object.values(lineup.bench).flat().map(p => p.replace(/^\d+ /, "")));
    const changes = subs.filter(s => s.team === team);
    assert.equal(changes.length, count);
    for (const change of changes) {
      assert.ok(starters.has(change.playerOut));
      assert.ok(bench.has(change.playerIn));
    }
  }
  assert.deepEqual(subs.filter(s => s.minute === "46*'").map(s => [s.playerOut, s.playerIn]), [["朝生 珠実", "式田 和"], ["小林 里歌子", "猶本 光"]]);
});
test("finished record advances selectors and exposes a valid detail route", () => {
  const now = new Date("2026-10-18T18:00:00+09:00");
  const fixture = belezaFixtures.find(f => f.id === match.id)!;
  assert.equal(fixture.status, "finished");
  assert.deepEqual(fixture.score, { home: 2, away: 3 });
  assert.equal(getLatestFinishedFixture(belezaFixtures)?.id, match.id);
  assert.equal(getNextFixture(belezaFixtures, now)?.id, "beleza-next-10");
  assert.deepEqual(getUpcomingFixtures(belezaFixtures, now, 5).map(f => f.id), ["beleza-next-10", "beleza-next-11", "beleza-next-12", "beleza-next-13"]);
  assert.equal(getCategoryDetailHref("beleza", fixture.detailMatchId), "/beleza/matches/beleza-next-9");
});
