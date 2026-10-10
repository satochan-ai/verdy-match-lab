import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getSeasonHistory, getUpcomingFixtures } from "./fixture-selectors.ts";
import { toU21SeasonHistoryEntry, u21Fixtures } from "./u21-fixtures.ts";
import { validateFixtures } from "./fixture-validation.ts";

const now = new Date("2026-08-30T00:00:00+09:00");

test("U-21 fixture collection is valid and has one finished plus five upcoming fixtures", () => {
  assert.equal(validateFixtures(u21Fixtures).length, 0);
  assert.equal(u21Fixtures.length, 10);
  assert.equal(u21Fixtures.find((fixture) => fixture.id === "u21-match-1")?.detailMatchId, "u21-match-1");
  assert.equal(u21Fixtures.find((fixture) => fixture.id === "u21-next-1")?.detailMatchId, "u21-next-1");
});

test("U-21 NEXT advances to U-21磐田 after the finalized U-21川崎 match", () => {
  assert.equal(getNextFixture(u21Fixtures, now)?.opponentName, "U-21ジュビロ磐田");
  const upcoming = getUpcomingFixtures(u21Fixtures, now, 5);
  assert.equal(upcoming.length, 5);
  assert.equal(upcoming.some((fixture) => fixture.status === "finished"), false);
  assert.equal(upcoming.some((fixture) => fixture.id === "u21-next-1"), false);
});

test("U-21 NEXT5 follows the official schedule (all confirmed, in date order, with venues)", () => {
  // 名古屋戦（交流戦第1節）は11/01 13:00に確定したため、date_range扱いではなくconfirmedの日付順に並ぶ。
  const upcoming = getUpcomingFixtures(u21Fixtures, now, 5);
  assert.deepEqual(upcoming.map((fixture) => `${fixture.kickoffAt}|${fixture.opponentName}|${fixture.isHome ? "H" : "A"}|${fixture.venue}`), [
    "2026-10-17T15:00:00+09:00|U-21ジュビロ磐田|A|大久保G",
    "2026-11-01T13:00:00+09:00|U-21名古屋グランパス|H|AGFフィールド",
    "2026-11-22T14:00:00+09:00|U-21ガンバ大阪|A|パナソニック スタジアム 吹田",
    "2026-11-29T13:00:00+09:00|U-21ヴィッセル神戸|H|味の素フィールド西が丘",
    "2026-12-06T13:00:00+09:00|U-21V・ファーレン長崎|A|PEACE STADIUM Connected by SoftBank",
  ]);
  assert.equal(upcoming.every((fixture) => fixture.kickoffStatus === "confirmed"), true);
  assert.equal(new Set(upcoming.map((fixture) => fixture.id)).size, 5);
  assert.equal(getNextFixture(u21Fixtures, now)?.id, upcoming[0].id);
});

test("U-21 LAST and HISTORY include the finalized U-21川崎 result", () => {
  const last = getLatestFinishedFixture(u21Fixtures);
  assert.equal(last?.id, "u21-next-3");
  assert.deepEqual(last?.score, { home: 4, away: 1 });
  assert.equal(toU21SeasonHistoryEntry(last!).result, "loss");
  const urawa = u21Fixtures.find((fixture) => fixture.id === "u21-next-1")!;
  assert.equal(urawa.opponentName, "U-21浦和レッズ");
  assert.deepEqual(urawa.score, { home: 1, away: 2 });
  assert.equal(toU21SeasonHistoryEntry(urawa).result, "win");

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
  const withoutShimizu = u21Fixtures.filter((fixture) => fixture.id !== "u21-next-2" && fixture.id !== "u21-next-3");
  const last = getLatestFinishedFixture(withoutShimizu);
  assert.equal(last?.opponentName, "U-21浦和レッズ");
  assert.equal(last?.id, "u21-next-1");
  assert.equal(getUpcomingFixtures(u21Fixtures, wellAfterKickoff, 5).some((fixture) => fixture.id === "u21-next-1"), false);
});

test("U-21 09.12 U-21浦和 result is a WIN for Verdy despite Verdy scoring on the AWAY side", () => {
  // isVerdyHomeがfalse（アウェイ開催）のため、HOME得点(浦和=1)をヴェルディの得点と
  // 取り違えて判定しないこと（AWAY=2がヴェルディの得点でVerdy視点はWIN）。
  const last = getLatestFinishedFixture(u21Fixtures.filter((fixture) => fixture.id !== "u21-next-2" && fixture.id !== "u21-next-3"))!;
  assert.equal(last.isHome, false);
  assert.equal(toU21SeasonHistoryEntry(last).result, "win");
});

test("finishing 09.12 automatically moves NEXT, LAST and HISTORY", () => {
  const simulated = u21Fixtures.map((fixture) => fixture.id === "u21-next-1"
    ? { ...fixture, status: "finished" as const, score: fixture.isHome ? { home: 2, away: 1 } : { home: 1, away: 2 } }
    : fixture);
  assert.equal(getNextFixture(simulated, now)?.opponentName, "U-21ジュビロ磐田");
  assert.equal(getLatestFinishedFixture(simulated)?.opponentName, "U-21川崎フロンターレ");
  assert.deepEqual(getSeasonHistory(simulated).map((fixture) => fixture.opponentName), ["U-21川崎フロンターレ", "U-21清水エスパルス", "U-21浦和レッズ", "FC東京U-21"]);
});
