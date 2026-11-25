import assert from "node:assert/strict";
import test from "node:test";
import { getArchiveMatches, getRecentFinishedMatch, matches } from "../mock/matches.ts";
import { mitoDaznStats, mitoFormationPhases, mitoResult } from "../mock/top-mito-result.ts";
import { getMatchResult } from "../match/result.ts";
import { getLatestFinishedFixture, getUpcomingFixtures } from "./fixture-selectors.ts";
import { topFixtures } from "./top-fixtures.ts";

test("水戸戦は既存IDで一度だけ公開し、町田戦からのNEXT 5を表示する", () => {
  const id = "sched-mito";
  assert.equal(mitoResult.id, id);
  assert.equal(matches.filter((match) => match.id === id).length, 1);
  assert.equal(getRecentFinishedMatch().id, id);
  assert.equal(getArchiveMatches().filter((match) => match.id === id).length, 1);
  assert.deepEqual([mitoResult.status, mitoResult.homeScore, mitoResult.awayScore, getMatchResult(mitoResult)], ["finished", 1, 0, "loss"]);
  const latest = getLatestFinishedFixture(topFixtures);
  assert.deepEqual([latest?.id, latest?.detailMatchId, latest?.score], [id, id, { home: 1, away: 0 }]);
  assert.deepEqual(getUpcomingFixtures(topFixtures, new Date("2026-11-25T22:00:00+09:00")).map((fixture) => fixture.id), [
    "sched-machida-j1", "sched-kyoto", "sched-machida-emperor", "sched-gamba-j1", "sched-kashima-away",
  ]);
});

test("公式記録は68分の得点、17分の退場、両チーム各5交代を保持する", () => {
  assert.deepEqual(mitoResult.goals, [{ minute: "68'", scorer: "木本 恭生", assist: "舩橋 佑", team: mitoResult.homeTeam.name }]);
  assert.deepEqual(mitoResult.cards.map(({ minute, player, type }) => [minute, player, type]), [
    ["17'", "新井 悠太", "red"], ["20'", "舩橋 佑", "yellow"], ["67'", "熊取谷 一星", "yellow"],
  ]);
  assert.deepEqual(mitoResult.substitutions.filter((s) => s.team === mitoResult.homeTeam.name).map((s) => s.minute),
    ["57'", "73'", "73'", "73'", "87'"]);
  assert.deepEqual(mitoResult.substitutions.filter((s) => s.team === mitoResult.awayTeam.name).map((s) => s.minute),
    ["46'", "69'", "69'", "82'", "82'"]);
});

const expectedPhases = {
  home: [
    ["開始", [[27], [3, 17, 15, 25], [44, 19, 20, 16], [30, 9]]],
    ["57分", [[27], [3, 17, 15, 25], [44, 19, 20, 30], [22, 9]]],
    ["73分", [[27], [6, 17, 15, 25], [22, 3, 19, 30], [10, 18]]],
    ["87分", [[27], [3, 17, 15, 6], [22, 19, 8, 30], [10, 18]]],
  ],
  away: [
    ["開始", [[1], [18, 29, 4, 35], [40, 16, 10, 14], [9, 25]]],
    ["17分", [[1], [18, 29, 4, 35], [10, 16], [25, 14], [9]]],
    ["46分", [[1], [18, 29, 4, 22], [10, 16], [25, 14], [9]]],
    ["69分", [[1], [18, 29, 4, 22], [10, 16], [7, 14], [33]]],
    ["82分", [[1], [18, 29, 4, 22], [10, 8], [30, 7], [33]]],
  ],
} as const;

test("全9段階で、配置順、在場選手、退場・交代後の人数が正しい", () => {
  for (const side of ["home", "away"] as const) {
    const team = side === "home" ? mitoResult.homeTeam : mitoResult.awayTeam;
    const official = mitoResult.actualLineups[side];
    const starters = Object.values(official.starters).flat().map((player) => player.slice(player.indexOf(" ") + 1));
    assert.equal(starters.length, 11);
    assert.equal(Object.values(official.bench).flat().length, 9);
    assert.equal(mitoFormationPhases[side].length, expectedPhases[side].length);

    mitoFormationPhases[side].forEach(({ label, lineup }, i) => {
      const [expectedLabel, rows] = expectedPhases[side][i];
      const minute = Number.parseInt(label, 10) || 0;
      const expectedPlayers = new Set(starters);
      for (const card of mitoResult.cards) {
        if (card.team === team.name && card.type === "red" && Number.parseInt(card.minute, 10) <= minute) expectedPlayers.delete(card.player);
      }
      for (const change of mitoResult.substitutions) {
        if (change.team === team.name && Number.parseInt(change.minute, 10) <= minute) {
          assert.ok(expectedPlayers.delete(change.playerOut));
          expectedPlayers.add(change.playerIn);
        }
      }
      assert.equal(label, expectedLabel);
      assert.equal(lineup.formation, side === "away" && i > 0 ? "4-2-2-1" : "4-4-2");
      assert.deepEqual(lineup.starters.map((player) => player.number), rows.flat());
      assert.equal(lineup.starters.length, expectedPlayers.size);
      assert.deepEqual(new Set(lineup.starters.map((player) => player.name)), expectedPlayers);
    });
  }
});

test("Jリーグの集計とDAZN試合終了時表示の数値をそれぞれ保持する", () => {
  assert.match(mitoResult.matchStats.sourceUrl, /jleague\.jp/);
  assert.equal(mitoDaznStats.source, "DAZN試合終了時表示");
  assert.deepEqual([mitoResult.matchStats.home.shotsOnTarget, mitoResult.matchStats.away.shotsOnTarget], [6, 0]);
  assert.deepEqual(Object.values(mitoDaznStats.home), [1.53, 15, 12, "64%", 662, "85%", 0, 6, 13, 1, 0]);
  assert.deepEqual(Object.values(mitoDaznStats.away), [0.40, 5, 4, "36%", 360, "73%", 3, 2, 10, 1, 1]);
});
