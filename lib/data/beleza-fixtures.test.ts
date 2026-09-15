import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { belezaFixtures, toBelezaSeasonHistoryEntry } from "./beleza-fixtures.ts";
import { belezaActualLineup, belezaActualFormation, inacKobeActualLineup } from "../mock/beleza.ts";
import { validateFixtures } from "./fixture-validation.ts";

const now = new Date("2026-09-13T00:00:00+09:00");

test("BELEZA fixture collection is valid", () => {
  assert.equal(validateFixtures(belezaFixtures).length, 0);
  assert.equal(belezaFixtures.length, 9);
  // /beleza/matches/[id] now renders beleza-match-1/2/3 (archived) individually in addition
  // to the current snapshot (beleza-next-3, INAC), so every finished BELEZA match carries a
  // real (non-fabricated) detailMatchId equal to its own id.
  for (const id of ["beleza-match-1", "beleza-match-2", "beleza-match-3", "beleza-next-3"]) {
    assert.equal(belezaFixtures.find((fixture) => fixture.id === id)?.detailMatchId, id);
  }
});

test("BELEZA vs INAC official live lineups preserve confirmed counts and formation", () => {
  assert.equal(belezaActualLineup.formation, "3-4-2-1");
  assert.equal(Object.values(belezaActualLineup.starters).flat().length, 11);
  assert.equal(Object.values(belezaActualLineup.bench).flat().length, 6);
  assert.equal(Object.values(inacKobeActualLineup.starters).flat().length, 11);
  assert.equal(Object.values(inacKobeActualLineup.bench).flat().length, 7);
  assert.equal(belezaActualFormation.formation, "3-4-2-1");
  assert.equal(belezaFixtures.find((fixture) => fixture.id === "beleza-next-3")?.status, "finished");
});

test("BELEZA actual formation preserves the confirmed DF and MF horizontal order", () => {
  assert.deepEqual(belezaActualFormation.starters.slice(1, 4).map((player) => `${player.number} ${player.name}`), [
    "5 松田 紫野", "3 村松 智子", "32 松岡 瑛茉",
  ]);
  assert.deepEqual(belezaActualFormation.starters.slice(4, 8).map((player) => `${player.number} ${player.name}`), [
    "7 北村 菜々美", "6 隅田 凜", "35 須長 穂乃果", "24 伊藤 琴音",
  ]);
});

test("BELEZA season history entries carry detailMatchId through for mobile/desktop history links", () => {
  const history = getSeasonHistory(belezaFixtures).map(toBelezaSeasonHistoryEntry);
  assert.equal(history.length, 4);
  assert.equal(history.every((entry) => entry.detailMatchId === entry.id), true);
});

test("BELEZA NEXT is 09.19 ちふれ and NEXT5 excludes finished fixtures", () => {
  assert.equal(getNextFixture(belezaFixtures, now)?.opponentName, "ちふれASエルフェン埼玉");
  const upcoming = getUpcomingFixtures(belezaFixtures, now, 5);
  assert.equal(upcoming.length, 5);
  assert.equal(upcoming.every((fixture) => fixture.status === "scheduled"), true);
  assert.deepEqual(upcoming.map((fixture) => fixture.opponentName), [
    "ちふれASエルフェン埼玉", "アルビレックス新潟レディース", "セレッソ大阪ヤンマーレディース", "三菱重工浦和レッズレディース", "サンフレッチェ広島レジーナ",
  ]);
});

test("BELEZA LAST, HISTORY and 09.05 浦和 result are derived", () => {
  const last = getLatestFinishedFixture(belezaFixtures)!;
  assert.equal(last.opponentName, "INAC神戸レオネッサ");
  assert.equal(toBelezaSeasonHistoryEntry(last).result, "win");
  const history = getSeasonHistory(belezaFixtures);
  assert.equal(history.length, 4);
  assert.deepEqual(history.map((fixture) => fixture.opponentName), [
    "INAC神戸レオネッサ", "三菱重工浦和レッズレディース", "AC長野パルセイロ・レディース", "ジェフユナイテッド市原・千葉レディース",
  ]);
  assert.equal(history.filter((fixture) => fixture.id === "beleza-match-3").length, 1);
});

test("BELEZA INAC official result is represented once in history", () => {
  assert.equal(getSeasonHistory(belezaFixtures).filter((fixture) => fixture.id === "beleza-next-3").length, 1);
});
