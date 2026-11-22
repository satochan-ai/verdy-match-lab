import assert from "node:assert/strict";
import test from "node:test";
import { hiroshimaPreMatchStandings, j1Standings } from "./standings.ts";

test("J1 standings hold exactly 20 clubs with unique, sequential ranks 1-20", () => {
  assert.equal(j1Standings.entries.length, 20);
  const ranks = j1Standings.entries.map((entry) => entry.rank);
  assert.deepEqual(ranks, Array.from({ length: 20 }, (_, i) => i + 1));
  assert.equal(new Set(j1Standings.entries.map((entry) => entry.teamName)).size, 20);
});

test("東京ヴェルディの第15節成績", () => {
  assert.deepEqual(j1Standings.entries.find(e => e.teamName === "東京ヴェルディ"), {
    rank: 15, teamName: "東京ヴェルディ", played: 15, wins: 3, draws: 6, losses: 6,
    goalsFor: 12, goalsAgainst: 22, goalDifference: -10, points: 15,
  });
});

test("J1 standings entries are internally consistent (points and goal difference derive from played record)", () => {
  for (const entry of j1Standings.entries) {
    assert.equal(entry.wins + entry.draws + entry.losses, entry.played);
    assert.equal(entry.wins * 3 + entry.draws, entry.points);
    assert.equal(entry.goalsFor - entry.goalsAgainst, entry.goalDifference);
  }
});

test("J1 standings expose the official source and as-of label", () => {
  assert.equal(j1Standings.sourceUrl, "https://www.jleague.jp/j1/standings/2026-27/");
  assert.equal(j1Standings.asOfLabel, "2026年11月21日18:13更新");
});

test("J1 standings snapshot is a complete round (all 20 clubs on 15 matches) with balanced totals", () => {
  const entries = j1Standings.entries;
  assert.equal(entries.every((entry) => entry.played === 15), true);
  assert.equal(entries.reduce((sum, e) => sum + e.wins, 0), entries.reduce((sum, e) => sum + e.losses, 0));
  assert.equal(entries.reduce((sum, e) => sum + e.goalsFor, 0), entries.reduce((sum, e) => sum + e.goalsAgainst, 0));
  assert.equal(entries.find((entry) => entry.teamName === "横浜F・マリノス")?.rank, 8);
});

test("全20クラブの順位と公式成績", () => {
  assert.deepEqual(j1Standings.entries.map(e => [e.teamName, e.points, e.played, e.wins, e.draws, e.losses, e.goalsFor, e.goalsAgainst, e.goalDifference]), [
    ["FC東京", 36, 15, 11, 3, 1, 36, 8, 28],
    ["サンフレッチェ広島", 31, 15, 9, 4, 2, 34, 12, 22],
    ["柏レイソル", 31, 15, 10, 1, 4, 31, 21, 10],
    ["FC町田ゼルビア", 30, 15, 8, 6, 1, 30, 10, 20],
    ["ヴィッセル神戸", 27, 15, 8, 3, 4, 24, 16, 8],
    ["川崎フロンターレ", 25, 15, 7, 4, 4, 29, 24, 5],
    ["鹿島アントラーズ", 24, 15, 7, 3, 5, 30, 25, 5],
    ["横浜F・マリノス", 23, 15, 5, 8, 2, 23, 17, 6],
    ["浦和レッズ", 22, 15, 7, 1, 7, 24, 31, -7],
    ["ファジアーノ岡山", 20, 15, 6, 2, 7, 17, 22, -5],
    ["京都サンガF.C.", 19, 15, 5, 4, 6, 21, 24, -3],
    ["セレッソ大阪", 17, 15, 4, 5, 6, 16, 28, -12],
    ["ジェフユナイテッド千葉", 16, 15, 4, 4, 7, 17, 24, -7],
    ["名古屋グランパス", 15, 15, 4, 3, 8, 15, 23, -8],
    ["東京ヴェルディ", 15, 15, 3, 6, 6, 12, 22, -10],
    ["清水エスパルス", 15, 15, 4, 3, 8, 11, 24, -13],
    ["V・ファーレン長崎", 14, 15, 3, 5, 7, 17, 22, -5],
    ["ガンバ大阪", 12, 15, 2, 6, 7, 16, 25, -9],
    ["水戸ホーリーホック", 12, 15, 3, 3, 9, 14, 27, -13],
    ["アビスパ福岡", 8, 15, 2, 2, 11, 14, 26, -12],
  ]);
});

test("広島戦の試合前スナップショットを維持", () => {
  assert.deepEqual(hiroshimaPreMatchStandings, {
    competition: "2026／27 明治安田J1リーグ", asOfLabel: "2026年10月9日21:29更新",
    sourceUrl: "https://www.jleague.jp/j1/standings/2026-27/",
    entries: [
      { rank: 3, teamName: "サンフレッチェ広島", played: 8, wins: 5, draws: 2, losses: 1, goalsFor: 20, goalsAgainst: 6, goalDifference: 14, points: 17 },
      { rank: 19, teamName: "東京ヴェルディ", played: 8, wins: 0, draws: 4, losses: 4, goalsFor: 4, goalsAgainst: 12, goalDifference: -8, points: 4 },
    ],
  });
});
