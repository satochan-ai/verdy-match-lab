import assert from "node:assert/strict";
import test from "node:test";
import { hiroshimaPreMatchStandings, j1Standings } from "./standings.ts";

test("J1 standings hold exactly 20 clubs with unique, sequential ranks 1-20", () => {
  assert.equal(j1Standings.entries.length, 20);
  const ranks = j1Standings.entries.map((entry) => entry.rank);
  assert.deepEqual(ranks, Array.from({ length: 20 }, (_, i) => i + 1));
  assert.equal(new Set(j1Standings.entries.map((entry) => entry.teamName)).size, 20);
});

test("東京ヴェルディの第14節成績", () => {
  assert.deepEqual(j1Standings.entries.find(e => e.teamName === "東京ヴェルディ"), {
    rank: 14, teamName: "東京ヴェルディ", played: 14, wins: 3, draws: 5, losses: 6,
    goalsFor: 12, goalsAgainst: 22, goalDifference: -10, points: 14,
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
  assert.equal(j1Standings.asOfLabel, "2026年11月8日19:24更新");
});

test("J1 standings snapshot is a complete round (all 20 clubs on 14 matches) with balanced totals", () => {
  const entries = j1Standings.entries;
  assert.equal(entries.every((entry) => entry.played === 14), true);
  assert.equal(entries.reduce((sum, e) => sum + e.wins, 0), entries.reduce((sum, e) => sum + e.losses, 0));
  assert.equal(entries.reduce((sum, e) => sum + e.goalsFor, 0), entries.reduce((sum, e) => sum + e.goalsAgainst, 0));
  assert.equal(entries.find((entry) => entry.teamName === "横浜F・マリノス")?.rank, 7);
});

test("全20クラブの順位と公式成績", () => {
  assert.deepEqual(j1Standings.entries.map(e => [e.teamName, e.points, e.played, e.wins, e.draws, e.losses, e.goalsFor, e.goalsAgainst, e.goalDifference]), [
    ["FC東京", 33, 14, 10, 3, 1, 33, 8, 25],
    ["柏レイソル", 31, 14, 10, 1, 3, 31, 20, 11],
    ["サンフレッチェ広島", 30, 14, 9, 3, 2, 32, 10, 22],
    ["FC町田ゼルビア", 29, 14, 8, 5, 1, 30, 10, 20],
    ["ヴィッセル神戸", 27, 14, 8, 3, 3, 23, 14, 9],
    ["鹿島アントラーズ", 23, 14, 7, 2, 5, 29, 24, 5],
    ["横浜F・マリノス", 22, 14, 5, 7, 2, 21, 15, 6],
    ["川崎フロンターレ", 22, 14, 6, 4, 4, 28, 24, 4],
    ["浦和レッズ", 22, 14, 7, 1, 6, 23, 29, -6],
    ["ファジアーノ岡山", 17, 14, 5, 2, 7, 16, 22, -6],
    ["セレッソ大阪", 17, 14, 4, 5, 5, 16, 25, -9],
    ["京都サンガF.C.", 16, 14, 4, 4, 6, 19, 23, -4],
    ["名古屋グランパス", 14, 14, 4, 2, 8, 15, 23, -8],
    ["東京ヴェルディ", 14, 14, 3, 5, 6, 12, 22, -10],
    ["清水エスパルス", 14, 14, 4, 2, 8, 10, 23, -13],
    ["V・ファーレン長崎", 13, 14, 3, 4, 7, 17, 22, -5],
    ["ジェフユナイテッド千葉", 13, 14, 3, 4, 7, 16, 24, -8],
    ["ガンバ大阪", 12, 14, 2, 6, 6, 16, 24, -8],
    ["水戸ホーリーホック", 9, 14, 2, 3, 9, 12, 26, -14],
    ["アビスパ福岡", 8, 14, 2, 2, 10, 14, 25, -11],
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
