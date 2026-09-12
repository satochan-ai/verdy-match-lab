import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { toU21SeasonHistoryEntry, u21Fixtures } from "./u21-fixtures.ts";
import { validateFixtures } from "./fixture-validation.ts";

const now = new Date("2026-08-30T00:00:00+09:00");

test("U-21 fixture collection is valid and has one finished plus five upcoming fixtures", () => {
  assert.equal(validateFixtures(u21Fixtures).length, 0);
  assert.equal(u21Fixtures.length, 6);
  // u21-match-1 (FC東京) is archived: /u21/matches/[id] now renders only the current
  // snapshot (u21-next-1, U-21浦和レッズ), so the archived match no longer carries a
  // detailMatchId (same known constraint as BELEZA's belezaMatch1/2/3 archives).
  assert.equal(u21Fixtures.find((fixture) => fixture.id === "u21-match-1")?.detailMatchId, undefined);
  assert.equal(u21Fixtures.find((fixture) => fixture.id === "u21-next-1")?.detailMatchId, "u21-next-1");
});

test("U-21 NEXT is 09.20 U-21清水 (U-21浦和戦finished後) and NEXT 5 excludes finished", () => {
  assert.equal(getNextFixture(u21Fixtures, now)?.opponentName, "U-21清水エスパルス");
  const upcoming = getUpcomingFixtures(u21Fixtures, now, 5);
  assert.equal(upcoming.length, 4);
  assert.equal(upcoming.some((fixture) => fixture.status === "finished"), false);
  assert.equal(upcoming.some((fixture) => fixture.id === "u21-next-1"), false);
});

test("U-21 TBD Nagoya remains after confirmed fixtures", () => {
  const upcoming = getUpcomingFixtures(u21Fixtures, now, 5);
  assert.equal(upcoming.at(-1)?.opponentName, "U-21名古屋グランパス");
  assert.equal(upcoming.at(-1)?.kickoffAt, undefined);
  assert.equal(upcoming.at(-1)?.kickoffStatus, "date_range");
});

test("U-21 LAST and HISTORY reflect the finalized U-21浦和 result (U-21浦和 1-2 東京V)", () => {
  const last = getLatestFinishedFixture(u21Fixtures);
  assert.equal(last?.id, "u21-next-1");
  assert.equal(last?.opponentName, "U-21浦和レッズ");
  assert.deepEqual(last?.score, { home: 1, away: 2 });
  assert.equal(toU21SeasonHistoryEntry(last!).result, "win");

  const history = getSeasonHistory(u21Fixtures);
  // 09/12浦和戦・08/22 FC東京戦の2件がSeason Historyに存在し、重複はない。
  assert.equal(history.filter((fixture) => fixture.id === "u21-next-1").length, 1);
  assert.equal(history.some((fixture) => fixture.id === "u21-match-1"), true);
});

test("U-21 09.12 U-21浦和 keeps its explicit finished status regardless of kickoffAt vs now", () => {
  // statusは元データのfinishedをそのまま尊重する。kickoffAtを過ぎているかどうかで
  // finished判定を左右しない（試合前後の時刻だけを理由にfinished扱いされていた
  // 不具合の再発防止：時刻だけを理由に非finished扱いへ戻さないことも合わせて検証する）。
  const wellAfterKickoff = new Date("2026-09-13T00:00:00+09:00");
  const todayMatch = u21Fixtures.find((fixture) => fixture.id === "u21-next-1")!;
  assert.equal(todayMatch.status, "finished");
  const last = getLatestFinishedFixture(u21Fixtures);
  assert.equal(last?.opponentName, "U-21浦和レッズ");
  assert.equal(last?.id, "u21-next-1");
  assert.equal(getUpcomingFixtures(u21Fixtures, wellAfterKickoff, 5).some((fixture) => fixture.id === "u21-next-1"), false);
});

test("U-21 09.12 U-21浦和 result is a WIN for Verdy despite Verdy scoring on the AWAY side", () => {
  // isVerdyHomeがfalse（アウェイ開催）のため、HOME得点(浦和=1)をヴェルディの得点と
  // 取り違えて判定しないこと（AWAY=2がヴェルディの得点でVerdy視点はWIN）。
  const last = getLatestFinishedFixture(u21Fixtures)!;
  assert.equal(last.isHome, false);
  assert.equal(toU21SeasonHistoryEntry(last).result, "win");
});

test("finishing 09.12 automatically moves NEXT, LAST and HISTORY", () => {
  const simulated = u21Fixtures.map((fixture) => fixture.id === "u21-next-1"
    ? { ...fixture, status: "finished" as const, score: fixture.isHome ? { home: 2, away: 1 } : { home: 1, away: 2 } }
    : fixture);
  assert.equal(getNextFixture(simulated, now)?.opponentName, "U-21清水エスパルス");
  assert.equal(getLatestFinishedFixture(simulated)?.opponentName, "U-21浦和レッズ");
  assert.deepEqual(getSeasonHistory(simulated).map((fixture) => fixture.opponentName), ["U-21浦和レッズ", "FC東京U-21"]);
});
