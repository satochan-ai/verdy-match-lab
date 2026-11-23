import assert from "node:assert/strict";
import test from "node:test";
import { belezaTeam, inacKobeTeam } from "./beleza.ts";
import {
  belezaInacLeagueMatch, belezaInacOfficialRecord, belezaInacHalfScores, belezaInacGoals, belezaInacCards,
  belezaInacSubstitutions, belezaInacStats, belezaInacActualLineup, inacLeagueActualLineup,
  belezaInacFormationPhases, inacFormationPhases, belezaInacGoalNotes,
} from "./beleza-inac-league.ts";
import { belezaFixtures, toBelezaSeasonHistoryEntry } from "../data/beleza-fixtures.ts";
import { getCategoryDetailHref } from "../data/category-match-details.ts";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory } from "../data/fixture-selectors.ts";

test("ベレーザの最新結果と履歴は既存の第11節IDにリンクし、次戦は皇后杯", () => {
  const matchId = "beleza-next-16";
  assert.equal(belezaInacLeagueMatch.id, matchId);
  assert.equal(belezaFixtures.filter((fixture) => fixture.id === matchId).length, 1);
  const last = getLatestFinishedFixture(belezaFixtures)!;
  const history = getSeasonHistory(belezaFixtures);
  assert.equal(history[0].id, matchId);
  assert.equal(history.filter((fixture) => fixture.id === matchId).length, 1);
  assert.equal(history.find((fixture) => fixture.id === "beleza-next-3")?.competition.round, "第1節");
  assert.deepEqual([last.id, last.status, last.score, toBelezaSeasonHistoryEntry(last).result], [matchId, "finished", { home: 6, away: 0 }, "win"]);
  for (const fixture of [last, history[0]]) {
    assert.equal(getCategoryDetailHref("beleza", fixture.detailMatchId), "/beleza/matches/beleza-next-16");
  }
  assert.equal(last.kickoffAt, "2026-11-23T15:04:00+09:00");
  assert.equal(belezaInacLeagueMatch.scheduledKickoff, "15:00");
  assert.equal(belezaInacOfficialRecord.kickoff, "15:04");
  const next = getNextFixture(belezaFixtures, new Date("2026-11-23T21:00:00+09:00"))!;
  assert.deepEqual([next.id, next.kickoffAt, next.opponentName, next.venue], [
    "beleza-empress-2026-2", "2026-11-28T14:00:00+09:00", "中京大学", "Axisバードスタジアム",
  ]);
});

test("得点6件、両チームの交代と公式スタッツが一致する", () => {
  assert.deepEqual(belezaInacHalfScores, { firstHalf: "2-0", secondHalf: "4-0" });
  assert.deepEqual(belezaInacGoals.map(({ minute, scorer, team }) => [minute, scorer, team]), [
    ["19'", "樋渡 百花", belezaTeam.name], ["35'", "樋渡 百花", belezaTeam.name], ["59'", "樋渡 百花", belezaTeam.name],
    ["65'", "塩越 柚歩", belezaTeam.name], ["69'", "樋渡 百花", belezaTeam.name], ["90'", "樋渡 百花", belezaTeam.name],
  ]);
  assert.ok(belezaInacGoals.every((goal) => !goal.assist));
  assert.deepEqual(belezaInacGoalNotes.map((note) => note.minute), belezaInacGoals.map((goal) => goal.minute));
  const changes = (team: string) => belezaInacSubstitutions.filter((sub) => sub.team === team)
    .map(({ minute, playerOut, playerIn }) => [minute, playerOut, playerIn]);
  assert.deepEqual(changes(belezaTeam.name), [
    ["63'", "小林 里歌子", "猶本 光"], ["63'", "氏原 里穂菜", "松永 未夢"],
    ["71'", "眞城 美春", "隅田 凜"], ["71'", "水口 茉優", "野田 にな"], ["85'", "式田 和", "北村 菜々美"],
  ]);
  assert.deepEqual(changes(inacKobeTeam.name), [
    ["46*'", "髙瀬 愛実", "辻澤 亜唯"], ["46*'", "山本 摩也", "大田 ありす"],
    ["75'", "桑原 藍", "金月 夏萌"], ["75'", "岸田 優花", "箕輪 千慧"], ["85'", "久保田 真生", "北村 礼"],
  ]);
  for (const lineup of [belezaInacActualLineup, inacLeagueActualLineup]) {
    assert.equal(lineup.formation, undefined);
    assert.equal(Object.values(lineup.starters).flat().length, 11);
    assert.equal(Object.values(lineup.bench).flat().length, 7);
  }
  assert.deepEqual(belezaInacCards, []);
  assert.deepEqual(belezaInacStats, {
    beleza: { shots: 16, freeKicks: 13, corners: 6, offsides: 3 },
    opponent: { shots: 9, freeKicks: 10, corners: 4, offsides: 2 },
  });
});

test("観戦メモの配置は両チームの交代と左右の並びを反映する", () => {
  const numbers = (phases: typeof belezaInacFormationPhases) =>
    phases.map(({ label, lineup }) => [label, lineup.formation, lineup.starters.map((player) => player.number)]);
  assert.deepEqual(numbers(belezaInacFormationPhases), [
    ["開始", "4-4-2", [21, 32, 3, 4, 2, 13, 14, 19, 38, 11, 20]],
    ["63分", "4-4-2", [21, 32, 3, 4, 2, 18, 14, 19, 38, 11, 8]],
    ["71分", "4-4-2", [1, 32, 3, 4, 2, 18, 6, 19, 38, 11, 8]],
    ["85分", "4-2-3-1", [1, 32, 3, 4, 2, 6, 19, 18, 7, 8, 11]],
  ]);
  assert.deepEqual(numbers(inacFormationPhases), [
    ["開始", "4-1-2-3", [1, 13, 5, 3, 14, 25, 10, 8, 19, 11, 40]],
    ["46分", "4-1-2-3", [1, 13, 5, 3, 14, 25, 10, 20, 19, 29, 40]],
    ["75分", "4-1-2-3", [1, 18, 5, 3, 14, 25, 10, 20, 19, 29, 17]],
    ["85分", "4-1-2-3", [1, 18, 5, 3, 14, 25, 10, 20, 44, 29, 17]],
  ]);
  assert.equal(belezaInacFormationPhases[3].lineup.starters[8].name, "北村 菜々美");
  assert.equal(inacFormationPhases[3].lineup.starters[8].name, "北村 礼");
});
