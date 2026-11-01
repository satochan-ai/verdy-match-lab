import assert from "node:assert/strict";
import test from "node:test";
import { u21EastStandings, u21WestStandings } from "./u21-standings.ts";

test("11/1 15:57 official combined standings keep EAST/WEST separate", () => {
  assert.equal(u21EastStandings.entries.length, 6);
  assert.equal(u21WestStandings.entries.length, 5);
  assert.deepEqual(u21EastStandings.entries.map(e => [e.rank,e.points,e.played,e.goalsFor,e.goalsAgainst]), [[1,12,6,16,16],[2,10,5,12,5],[3,10,5,11,4],[4,6,5,6,10],[5,6,6,10,18],[6,3,6,9,15]]);
  assert.deepEqual(u21WestStandings.entries.map(e => [e.rank,e.points,e.played,e.goalsFor,e.goalsAgainst]), [[1,12,5,11,4],[2,9,4,6,2],[3,7,5,9,9],[4,4,5,11,11],[5,3,4,5,12]]);
  assert.equal(u21EastStandings.entries[0].teamName, "U-21 東京ヴェルディ");
});
for (const standings of [u21EastStandings,u21WestStandings]) {
  test(`${standings.competition}: timestamp and arithmetic are consistent`, () => {
    assert.equal(standings.asOfLabel,"2026/11/01 15:57 公式更新・同日照合");
    assert.equal(new Set(standings.entries.map(e => e.teamName)).size,standings.entries.length);
    for (const e of standings.entries) {
      assert.equal(e.wins+e.draws+e.losses,e.played);
      assert.equal(e.wins*3+e.draws,e.points);
      assert.equal(e.goalsFor-e.goalsAgainst,e.goalDifference);
      assert.ok(e.recentForm!.length <= Math.min(5,e.played));
    }
  });
}
