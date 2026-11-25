import assert from "node:assert/strict";
import test from "node:test";
import { hiroshimaPreMatchStandings, j1Standings } from "./standings.ts";

test("J1 standings hold exactly 20 clubs with unique, sequential ranks 1-20", () => {
  assert.equal(j1Standings.entries.length, 20);
  const ranks = j1Standings.entries.map((entry) => entry.rank);
  assert.deepEqual(ranks, Array.from({ length: 20 }, (_, i) => i + 1));
  assert.equal(new Set(j1Standings.entries.map((entry) => entry.teamName)).size, 20);
});

test("東京ヴェルディの第16節成績", () => {
  assert.deepEqual(j1Standings.entries.find(e => e.teamName === "東京ヴェルディ"), {
    rank: 15, teamName: "東京ヴェルディ", played: 16, wins: 3, draws: 6, losses: 7,
    goalsFor: 12, goalsAgainst: 23, goalDifference: -11, points: 15,
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
  assert.equal(j1Standings.asOfLabel, "2026年11月25日21:59更新");
});

test("J1 standings snapshot includes the 7 completed round 16 matches and has balanced totals", () => {
  const entries = j1Standings.entries;
  assert.equal(entries.filter((entry) => entry.played === 16).length, 14);
  assert.equal(entries.reduce((sum, e) => sum + e.wins, 0), entries.reduce((sum, e) => sum + e.losses, 0));
  assert.equal(entries.reduce((sum, e) => sum + e.goalsFor, 0), entries.reduce((sum, e) => sum + e.goalsAgainst, 0));
  assert.equal(entries.find((entry) => entry.teamName === "横浜F・マリノス")?.rank, 7);
});

test("全20クラブの順位と公式成績", () => {
  assert.deepEqual(j1Standings.entries.map(e => [e.teamName, e.points, e.played, e.wins, e.draws, e.losses, e.goalsFor, e.goalsAgainst, e.goalDifference]), [
    ["FC東京", 37, 16, 11, 4, 1, 38, 10, 28],
    ["サンフレッチェ広島", 32, 16, 9, 5, 2, 36, 14, 22],
    ["柏レイソル", 31, 15, 10, 1, 4, 31, 21, 10],
    ["FC町田ゼルビア", 30, 15, 8, 6, 1, 30, 10, 20],
    ["川崎フロンターレ", 28, 16, 8, 4, 4, 31, 25, 6],
    ["ヴィッセル神戸", 27, 15, 8, 3, 4, 24, 16, 8],
    ["横浜F・マリノス", 26, 16, 6, 8, 2, 25, 18, 7],
    ["鹿島アントラーズ", 24, 15, 7, 3, 5, 30, 25, 5],
    ["ファジアーノ岡山", 23, 16, 7, 2, 7, 19, 22, -3],
    ["浦和レッズ", 23, 16, 7, 2, 7, 26, 33, -7],
    ["京都サンガF.C.", 19, 15, 5, 4, 6, 21, 24, -3],
    ["名古屋グランパス", 18, 16, 5, 3, 8, 17, 24, -7],
    ["セレッソ大阪", 18, 16, 4, 6, 6, 18, 30, -12],
    ["ジェフユナイテッド千葉", 16, 16, 4, 4, 8, 18, 26, -8],
    ["東京ヴェルディ", 15, 16, 3, 6, 7, 12, 23, -11],
    ["水戸ホーリーホック", 15, 16, 4, 3, 9, 15, 27, -12],
    ["清水エスパルス", 15, 16, 4, 3, 9, 11, 26, -15],
    ["V・ファーレン長崎", 14, 16, 3, 5, 8, 18, 24, -6],
    ["ガンバ大阪", 12, 15, 2, 6, 7, 16, 25, -9],
    ["アビスパ福岡", 8, 16, 2, 2, 12, 15, 28, -13],
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
