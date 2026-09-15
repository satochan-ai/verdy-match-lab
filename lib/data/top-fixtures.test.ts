import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getUpcomingFixtures } from "./fixture-selectors.ts";
import { topFixtures } from "./top-fixtures.ts";
import { validateFixtures } from "./fixture-validation.ts";

const now = new Date("2026-09-03T00:00:00+09:00");

test("TOP schedule adapter produces valid CommonFixtures", () => {
  assert.equal(validateFixtures(topFixtures).length, 0);
  assert.equal(topFixtures.length, 14);
  assert.deepEqual(topFixtures.find((fixture) => fixture.id === "sched-cerezo")?.score, { home: 0, away: 0 });
  assert.equal(topFixtures.find((fixture) => fixture.id === "sched-cerezo")?.detailMatchId, "match-11");
  assert.deepEqual(topFixtures.find((fixture) => fixture.id === "sched-kashima")?.score, { home: 0, away: 2 });
  assert.equal(topFixtures.find((fixture) => fixture.id === "sched-kashima")?.detailMatchId, "match-9");
});

test("TOP NEXT5 spans every competition (J1 / Levain / Emperor's Cup), not J1 only", () => {
  // 千葉戦（match-13）の公式結果反映によりfinished化したため、NEXTは浦和戦になる。
  assert.equal(getNextFixture(topFixtures, now)?.opponentName, "浦和レッズ");
  const next5 = getUpcomingFixtures(topFixtures, now, 5);
  assert.deepEqual(next5.map((fixture) => fixture.opponentName), [
    "浦和レッズ", "サガン鳥栖", "ガイナーレ鳥取", "サンフレッチェ広島", "FC東京",
  ]);
  assert.equal(next5.length, 5);
  // 日付昇順であること。
  const kickoffTimes = next5.map((fixture) => new Date(fixture.kickoffAt!).getTime());
  assert.deepEqual(kickoffTimes, [...kickoffTimes].sort((a, b) => a - b));
  // J1だけでなくルヴァン・天皇杯を含む（大会別に分けた別配列を作っていないことの確認）。
  const competitionNames = next5.map((fixture) => fixture.competition.name);
  assert.ok(competitionNames.includes("ルヴァン"));
  assert.ok(competitionNames.includes("天皇杯 JFA 第106回全日本サッカー選手権大会"));
  assert.ok(competitionNames.includes("2026 J1リーグ"));
  // 新規追加分にdetailMatchIdを推測で付与していないこと。
  assert.equal(next5.find((fixture) => fixture.opponentName === "サガン鳥栖")?.detailMatchId, undefined);
  assert.equal(next5.find((fixture) => fixture.opponentName === "ガイナーレ鳥取")?.detailMatchId, undefined);
  assert.equal(next5.find((fixture) => fixture.opponentName === "サンフレッチェ広島")?.detailMatchId, undefined);
  assert.equal(next5.find((fixture) => fixture.opponentName === "FC東京")?.detailMatchId, undefined);
});

test("TOP LAST is 09.13 千葉 (finished) and finished fixtures never enter NEXT", () => {
  assert.equal(getLatestFinishedFixture(topFixtures)?.opponentName, "ジェフユナイテッド千葉");
  assert.deepEqual(getLatestFinishedFixture(topFixtures)?.score, { home: 1, away: 1 });
  assert.equal(getUpcomingFixtures(topFixtures, now).some((fixture) => fixture.status === "finished"), false);
});

test("TOP finishing simulation (浦和) updates NEXT and LAST without changing detail IDs", () => {
  const simulated = topFixtures.map((fixture) => fixture.id === "sched-urawa" ? { ...fixture, status: "finished" as const, score: { home: 0, away: 1 } } : fixture);
  assert.equal(getNextFixture(simulated, now)?.opponentName, "サガン鳥栖");
  assert.equal(getLatestFinishedFixture(simulated)?.opponentName, "浦和レッズ");
  assert.equal(topFixtures.find((fixture) => fixture.id === "sched-kashima")?.detailMatchId, "match-9");
});

test("TOP schedule promotes 浦和 (sched-urawa/match-14) to NEXT once 千葉戦 is finished", () => {
  const urawa = topFixtures.find((fixture) => fixture.id === "sched-urawa")!;
  assert.equal(urawa.opponentName, "浦和レッズ");
  assert.equal(urawa.detailMatchId, "match-14");
  assert.equal(urawa.isHome, false);
  assert.equal(urawa.status, "scheduled");
  // detailMatchIdはfixture全体で一意（重複登録なし）。
  const detailIds = topFixtures.flatMap((fixture) => fixture.detailMatchId ? [fixture.detailMatchId] : []);
  assert.equal(new Set(detailIds).size, detailIds.length);
  assert.equal(getNextFixture(topFixtures, now)?.opponentName, "浦和レッズ");
});

test("TOP schedule can hold two future fixtures with detailMatchId at the same time (back-to-back detail pages)", () => {
  // 連戦時に「NEXT MATCH」「NEXT+1 MATCH」の2試合分を同時にdetail公開できることの回帰テスト。
  // 本番データ（scheduleMatches / matches[]）は変更せず、検証用のfixture配列でのみ確認する。
  // 千葉戦finished化により、以後はsched-urawa（NEXT）とsched-levain-tosu（次の未確定detail）を
  // 用いて同じ回帰を検証する。
  const withTwoFutureDetails = topFixtures.map((fixture) => {
    if (fixture.id === "sched-urawa") return { ...fixture, detailMatchId: "match-14" };
    if (fixture.id === "sched-levain-tosu") return { ...fixture, detailMatchId: "match-14-plus-1-test" };
    return fixture;
  });
  assert.equal(validateFixtures(withTwoFutureDetails).length, 0);
  const next5 = getUpcomingFixtures(withTwoFutureDetails, now, 5);
  assert.equal(next5[0]?.detailMatchId, "match-14");
  assert.equal(next5[1]?.detailMatchId, "match-14-plus-1-test");
});
