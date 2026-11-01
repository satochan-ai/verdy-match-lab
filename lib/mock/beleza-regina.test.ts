import assert from "node:assert/strict";
import test from "node:test";
import { belezaReginaMatch as match, belezaReginaGoals as goals, belezaReginaActualLineup as own, reginaActualLineup as opponent, belezaReginaSubstitutions as subs, belezaReginaHalfScores as halves } from "./beleza.ts";
test("BELEZA Regina result preserves 3-1, half scores and 90+3 goal", () => {
  assert.equal(match.id, "beleza-next-8");
  assert.equal(match.status, "finished");
  assert.deepEqual([match.homeScore, match.awayScore], [3, 1]);
  assert.deepEqual(halves, { firstHalf: "2-0", secondHalf: "1-1" });
  assert.deepEqual(goals.map(g => g.minute), ["5'", "23'", "90'", "90+3'"]);
});
test("BELEZA Regina official squads have 11 starters and 7 bench, no inferred formation", () => {
  for (const lineup of [own, opponent]) {
    assert.equal(Object.values(lineup.starters).flat().length, 11);
    assert.equal(Object.values(lineup.bench).flat().length, 7);
    assert.equal(lineup.formation, undefined);
  }
});
test("BELEZA Regina substitutions preserve confirmed 81 minute pairs and 5 changes each", () => {
  assert.equal(subs.filter(s => s.team === match.homeTeamName).length, 5);
  assert.equal(subs.filter(s => s.team === match.awayTeamName).length, 5);
  assert.deepEqual(subs.filter(s => s.minute === "81'").map(s => [s.playerOut, s.playerIn]), [["猶本 光", "松永 未夢"], ["氏原 里穂菜", "井手 ひなた"], ["古賀 花野", "瀧澤 千聖"], ["左山 桃子", "島袋 奈美恵"]]);
});
