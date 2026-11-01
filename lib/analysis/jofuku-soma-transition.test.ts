import assert from "node:assert/strict";
import test from "node:test";
import {
  analysisMatches, eraAverage, eraRecord, recoveryAverage, startCounts, startersOf,
  jofukuRepresentative, somaRepresentative, lineupChanges, ANALYSIS_PATH, analysisCard,
} from "./jofuku-soma-transition.ts";

test("8 target matches: 4 per era with official scores and records", () => {
  assert.deepEqual(analysisMatches.map((m) => `${m.short}${m.goalsFor}-${m.goalsAgainst}`), ["神戸0-2", "C大阪0-0", "千葉1-1", "浦和1-3", "広島0-2", "FC東京0-4", "横浜FM2-2", "福岡3-1"]);
  assert.deepEqual(eraRecord("jofuku"), { wins: 0, draws: 2, losses: 2, goalsFor: 2, goalsAgainst: 6 });
  assert.deepEqual(eraRecord("soma"), { wins: 1, draws: 1, losses: 2, goalsFor: 5, goalsAgainst: 9 });
  assert.deepEqual(analysisMatches.filter((m) => m.excludedReason).map((m) => m.short), ["FC東京"]);
});

test("Football LAB averages reproduce the pre-researched values (FC Tokyo excluded)", () => {
  assert.deepEqual([eraAverage("jofuku", "shots"), eraAverage("soma", "shots")], [9.25, 10.33]);
  assert.deepEqual([eraAverage("jofuku", "xg", 3), eraAverage("soma", "xg", 3)], [0.932, 0.858]);
  assert.deepEqual([eraAverage("jofuku", "distanceKm"), eraAverage("soma", "distanceKm")], [115.64, 121.44]);
  assert.deepEqual([eraAverage("jofuku", "sprints", 1), eraAverage("soma", "sprints", 1)], [123.8, 147]);
});

test("ball recovery simple averages match the provided analysis values", () => {
  assert.deepEqual(["avgPosition", "as", "ms"].map((k) => recoveryAverage("jofuku", k as "as")), [33.45, 10, 33.75]);
  assert.deepEqual(["avgPosition", "as", "ms"].map((k) => recoveryAverage("soma", k as "as")), [35.8, 7.67, 39.33]);
});

test("start counts total 44 per era and representative XIs come from official starters", () => {
  const counts = startCounts();
  assert.equal(counts.reduce((s, c) => s + c.jofuku, 0), 44);
  assert.equal(counts.reduce((s, c) => s + c.soma, 0), 44);
  const byName = Object.fromEntries(counts.map((c) => [c.name, c]));
  // 城福体制の基本スタメン＝3試合以上先発した11人で、千葉戦・浦和戦の先発と一致する。
  const jofukuXI = jofukuRepresentative.rows.flat().map((p) => p.name).sort();
  assert.deepEqual(counts.filter((c) => c.jofuku >= 3).map((c) => c.name).sort(), jofukuXI);
  for (const id of jofukuRepresentative.basisMatchIds) assert.deepEqual(startersOf(id).sort(), jofukuXI);
  assert.deepEqual(startersOf("sched-fukuoka").sort(), somaRepresentative.rows.flat().map((p) => p.name).sort());
  for (const rep of [jofukuRepresentative, somaRepresentative]) {
    assert.equal(rep.rows.flat().length, 11);
    for (const p of rep.rows.flat()) assert.ok(rep.numbers[p.name], p.name);
  }
  assert.deepEqual([byName["藤本 寛也"].jofuku, byName["藤本 寛也"].soma], [0, 4]);
  assert.deepEqual([byName["井上 竜太"].jofuku, byName["井上 竜太"].soma], [4, 0]);
  assert.deepEqual([byName["染野 唯月"].jofuku, byName["染野 唯月"].soma], [4, 2]);
  const both = jofukuXI.filter((n) => somaRepresentative.rows.flat().some((p) => p.name === n)).sort();
  assert.deepEqual(both, [...lineupChanges.continued].sort());
  assert.equal(analysisCard.href, ANALYSIS_PATH);
});
