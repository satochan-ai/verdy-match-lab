import assert from "node:assert/strict";
import test from "node:test";
import {
  u21AwayOfficialLineup,
  u21Cards,
  u21Goals,
  u21HomeOfficialLineup,
  u21Match,
  u21OfficialRecord,
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

test("U-21浦和レッズ match is finalized: HOME 1 - 2 AWAY (U-21浦和レッズ 1-2 東京ヴェルディU-21)", () => {
  assert.equal(u21Match.status, "finished");
  assert.equal(u21Match.homeTeamName, "U-21浦和レッズ");
  assert.equal(u21Match.awayTeamName, "東京ヴェルディU-21");
  assert.equal(u21Match.homeScore, 1);
  assert.equal(u21Match.awayScore, 2);
});

test("U-21浦和レッズ match records all 3 goals in minute order", () => {
  assert.equal(u21Goals.length, 3);
  assert.deepEqual(u21Goals.map((goal) => [goal.minute, goal.scorer, goal.team]), [
    ["30'", "宮﨑 叶", "U-21浦和レッズ"],
    ["56'", "白井 亮丞", "東京ヴェルディU-21"],
    ["71'", "山田 剛綺", "東京ヴェルディU-21"],
  ]);
});

test("U-21浦和レッズ match records 2 yellow cards for 浦和 only, no red cards", () => {
  assert.equal(u21Cards.length, 2);
  assert.equal(u21Cards.every((card) => card.team === "U-21浦和レッズ" && card.type === "yellow"), true);
  assert.equal(u21Cards.some((card) => card.type === "red"), false);
});

test("U-21浦和レッズ match records 5 substitutions: 浦和 2件 / 東京V 3件", () => {
  assert.equal(u21Substitutions.length, 5);
  assert.equal(u21Substitutions.filter((sub) => sub.team === "U-21浦和レッズ").length, 2);
  assert.equal(u21Substitutions.filter((sub) => sub.team === "東京ヴェルディU-21").length, 3);
});

test("U-21浦和レッズ match official record has confirmed metadata only (no fabricated stats)", () => {
  assert.equal(u21OfficialRecord?.kickoff, "18:03");
  assert.equal(u21OfficialRecord?.attendance, 2531);
  assert.equal(u21OfficialRecord?.weather, "曇");
  assert.equal(u21OfficialRecord?.temperature, "23.2℃");
  assert.equal(u21OfficialRecord?.humidity, "84%");
});
