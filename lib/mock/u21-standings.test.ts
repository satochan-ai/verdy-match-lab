import assert from "node:assert/strict";
import test from "node:test";
import { u21EastStandings, u21WestStandings } from "./u21-standings.ts";

test("11/22 17:10 official combined standings keep EAST/WEST separate", () => {
  assert.equal(u21EastStandings.entries.length, 6);
  assert.equal(u21WestStandings.entries.length, 5);
  assert.deepEqual(u21EastStandings.entries.map(e => [e.rank,e.points,e.played,e.goalsFor,e.goalsAgainst]), [[1,16,7,19,5],[2,15,7,19,18],[3,11,7,13,7],[4,9,6,9,11],[5,6,7,11,15],[6,6,7,10,22]]);
  assert.deepEqual(u21WestStandings.entries.map(e => [e.rank,e.points,e.played,e.goalsFor,e.goalsAgainst]), [[1,15,6,12,4],[2,13,7,14,7],[3,7,6,10,12],[4,4,6,11,14],[5,3,6,5,18]]);
  assert.equal(u21EastStandings.entries[1].teamName, "U-21 東京ヴェルディ");
});
for (const standings of [u21EastStandings,u21WestStandings]) {
  test(`${standings.competition}: timestamp and arithmetic are consistent`, () => {
    assert.equal(standings.asOfLabel,"2026/11/22 17:10 公式更新・同日照合");
    assert.equal(new Set(standings.entries.map(e => e.teamName)).size,standings.entries.length);
    for (const e of standings.entries) {
      assert.equal(e.wins+e.draws+e.losses,e.played);
      assert.equal(e.wins*3+e.draws,e.points);
      assert.equal(e.goalsFor-e.goalsAgainst,e.goalDifference);
      assert.ok(e.recentForm!.length <= Math.min(5,e.played));
    }
  });
}
