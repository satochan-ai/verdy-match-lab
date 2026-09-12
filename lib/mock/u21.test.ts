import assert from "node:assert/strict";
import test from "node:test";
import {
  u21AwayOfficialLineup,
  u21Cards,
  u21Goals,
  u21HomeOfficialLineup,
  u21Match,
  u21Substitutions,
} from "./u21.ts";

const positions = ["GK", "DF", "MF", "FW"] as const;

function flatten(lineup: typeof u21HomeOfficialLineup, group: "starters" | "bench") {
  return positions.flatMap((position) => lineup[group][position]);
}

function numberOf(entry: string) {
  return entry.split(" ")[0];
}

test("U-21浦和レッズ (home) official lineup has 11 starters and 5 bench, GK is マルコム アレックス恵太", () => {
  const starters = flatten(u21HomeOfficialLineup, "starters");
  const bench = flatten(u21HomeOfficialLineup, "bench");
  assert.equal(starters.length, 11);
  assert.equal(bench.length, 5);
  assert.deepEqual(u21HomeOfficialLineup.starters.GK, ["1 マルコム アレックス恵太"]);
});

test("東京ヴェルディU-21 (away) official lineup has 11 starters and 5 bench, GK is 中村 圭佑", () => {
  const starters = flatten(u21AwayOfficialLineup, "starters");
  const bench = flatten(u21AwayOfficialLineup, "bench");
  assert.equal(starters.length, 11);
  assert.equal(bench.length, 5);
  assert.deepEqual(u21AwayOfficialLineup.starters.GK, ["41 中村 圭佑"]);
});

test("no starter/bench overlap and no duplicate squad numbers within either team", () => {
  for (const lineup of [u21HomeOfficialLineup, u21AwayOfficialLineup]) {
    const starters = flatten(lineup, "starters");
    const bench = flatten(lineup, "bench");
    const allNumbers = [...starters, ...bench].map(numberOf);
    assert.equal(new Set(allNumbers).size, allNumbers.length);
    assert.equal(starters.some((player) => bench.includes(player)), false);
  }
});

test("teams are not swapped: known players stay on their own side", () => {
  const homeAll = [...flatten(u21HomeOfficialLineup, "starters"), ...flatten(u21HomeOfficialLineup, "bench")];
  const awayAll = [...flatten(u21AwayOfficialLineup, "starters"), ...flatten(u21AwayOfficialLineup, "bench")];
  assert.equal(homeAll.includes("7 宮﨑 叶"), true);
  assert.equal(awayAll.includes("7 宮﨑 叶"), false);
  assert.equal(awayAll.includes("80 キム ヒョンウ"), true);
  assert.equal(homeAll.includes("80 キム ヒョンウ"), false);
});

test("no formation is registered for either team's official lineup (not confirmed from official source)", () => {
  assert.equal("formation" in u21HomeOfficialLineup, false);
  assert.equal("formation" in u21AwayOfficialLineup, false);
});

test("U-21浦和レッズ match stays scheduled with no score/goals/cards/substitutions registered this phase", () => {
  assert.equal(u21Match.status, "scheduled");
  assert.equal(u21Match.homeScore, undefined);
  assert.equal(u21Match.awayScore, undefined);
  assert.deepEqual(u21Goals, []);
  assert.deepEqual(u21Cards, []);
  assert.deepEqual(u21Substitutions, []);
});
