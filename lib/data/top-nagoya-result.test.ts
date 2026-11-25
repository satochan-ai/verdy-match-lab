import assert from "node:assert/strict";
import test from "node:test";
import { getArchiveMatches, matches } from "../mock/matches.ts";
import { scheduleMatches } from "../mock/schedule.ts";
import { nagoyaResult } from "../mock/top-nagoya-result.ts";
import { getMatchResult } from "../match/result.ts";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { topFixtures as currentTopFixtures } from "./top-fixtures.ts";
import { beforeMitoResult } from "./top-nagoya-test-fixture.ts";
import { validateTopFixtureConsistency } from "./top-fixture-consistency.ts";

test("名古屋戦の0–0を既存IDで1回だけ公開し、LASTとNEXT 5を更新する", () => {
  const topFixtures = beforeMitoResult(currentTopFixtures);
  const now = new Date("2026-11-22T12:00:00+09:00");
  const id = "sched-nagoya";
  const scheduled = scheduleMatches.filter((fixture) => fixture.id === id);
  assert.equal(scheduled.length, 1);
  assert.equal(matches.filter((match) => match.id === id).length, 1);
  assert.deepEqual(validateTopFixtureConsistency(scheduled, matches), []);
  assert.deepEqual(getSeasonHistory(topFixtures).filter((fixture) => fixture.id === id).map((fixture) => (
    [fixture.kickoffAt, fixture.isHome, fixture.score, fixture.detailMatchId]
  )), [["2026-11-21T14:03:00+09:00", true, { home: 0, away: 0 }, id]]);
  assert.equal(getArchiveMatches().filter((match) => match.id === id).length, 1);
  assert.equal(getMatchResult(nagoyaResult), "draw");
  assert.equal(getLatestFinishedFixture(topFixtures)?.id, id);
  assert.equal(getNextFixture(topFixtures, now)?.id, "sched-mito");
  assert.deepEqual(getUpcomingFixtures(topFixtures, now).map((fixture) => fixture.id), [
    "sched-mito", "sched-machida-j1", "sched-kyoto", "sched-machida-emperor", "sched-gamba-j1",
  ]);
});

test("公式の先発、控え、交代、カードを得点イベントなしで登録する", () => {
  const { actualLineups, substitutions, goals, cards, homeTeam, awayTeam, matchStats } = nagoyaResult;
  assert.deepEqual(goals, []);
  for (const [lineup, team] of [[actualLineups.home, homeTeam], [actualLineups.away, awayTeam]] as const) {
    const starters = Object.values(lineup.starters).flat();
    const bench = Object.values(lineup.bench).flat();
    assert.equal(new Set(starters).size, 11);
    assert.equal(new Set(bench).size, 9);
    assert.deepEqual([...lineup.pitchOrder].sort(), [...starters].sort());
    for (const sub of substitutions.filter((change) => change.team === team.name)) {
      assert.ok(starters.some((player) => player.endsWith(" " + sub.playerOut)));
      assert.ok(bench.some((player) => player.endsWith(" " + sub.playerIn)));
    }
  }
  assert.deepEqual(substitutions.map(({ minute }) => minute), ["62'", "62'", "62'", "62'", "68'", "68'", "78'", "86'"]);
  assert.deepEqual(cards.map(({ minute, type }) => [minute, type]), [["18'", "yellow"], ["90+4'", "yellow"]]);
  assert.deepEqual([matchStats.home, matchStats.away].map((s) => [
    s.shots, s.shotsOnTarget, s.possession, s.corners, s.freeKicks, s.offsides, s.redCards,
  ]), [[8, 4, "38%", 3, 17, 3, 0], [12, 4, "62%", 6, 17, 3, 0]]);
});
