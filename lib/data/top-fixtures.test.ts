import assert from "node:assert/strict";
import test from "node:test";
import { getLatestFinishedFixture, getNextFixture, getUpcomingFixtures } from "./fixture-selectors.ts";
import { topFixtures as currentTopFixtures } from "./top-fixtures.ts";
import { validateFixtures } from "./fixture-validation.ts";

const now = new Date("2026-09-03T00:00:00+09:00");

// 鳥取戦終了時点の履歴検証。広島戦の結果登録後も当時のselector条件を再現する。
const topFixtures = currentTopFixtures.map((fixture) => {
  if (fixture.id === "sched-hiroshima") return { ...fixture, status: "scheduled" as const, score: undefined, detailMatchId: undefined, kickoffAt: "2026-10-11T15:00:00+09:00" };
  if (fixture.id === "sched-fc-tokyo") return { ...fixture, status: "scheduled" as const, score: undefined, detailMatchId: undefined, kickoffAt: "2026-10-17T14:00:00+09:00" };
  if (fixture.id === "sched-yokohama-fm") return { ...fixture, status: "scheduled" as const, score: undefined, detailMatchId: undefined, kickoffAt: "2026-10-21T19:00:00+09:00" };
  return fixture;
});

test("TOP schedule adapter produces valid CommonFixtures", () => {
  assert.equal(validateFixtures(topFixtures).length, 0);
  assert.equal(topFixtures.length, 19);
  assert.deepEqual(topFixtures.find((fixture) => fixture.id === "sched-cerezo")?.score, { home: 0, away: 0 });
  assert.equal(topFixtures.find((fixture) => fixture.id === "sched-cerezo")?.detailMatchId, "match-11");
  assert.deepEqual(topFixtures.find((fixture) => fixture.id === "sched-kashima")?.score, { home: 0, away: 2 });
  assert.equal(topFixtures.find((fixture) => fixture.id === "sched-kashima")?.detailMatchId, "match-9");
});

test("TOP NEXT5 spans every competition (J1 / Levain / Emperor's Cup), not J1 only", () => {
  // 浦和戦（match-14）・サガン鳥栖戦（match-15）の公式結果反映によりfinished化したため、
  // NEXTはガイナーレ鳥取戦になる。
  const beforeTottoriFinish = topFixtures.map((fixture) => fixture.id === "sched-emperor-tottori" ? { ...fixture, status: "scheduled" as const, score: undefined } : fixture);
  assert.equal(getNextFixture(beforeTottoriFinish, now)?.opponentName, "ガイナーレ鳥取");
  const next5 = getUpcomingFixtures(beforeTottoriFinish, now, 5);
  assert.deepEqual(next5.map((fixture) => fixture.opponentName), [
    "ガイナーレ鳥取", "サンフレッチェ広島", "FC東京", "横浜F・マリノス", "アビスパ福岡",
  ]);
  assert.equal(next5.length, 5);
  assert.equal(new Set(next5.map((fixture) => fixture.id)).size, 5);
  // 日付昇順であること。
  const kickoffTimes = next5.map((fixture) => new Date(fixture.kickoffAt!).getTime());
  assert.deepEqual(kickoffTimes, [...kickoffTimes].sort((a, b) => a - b));
  // J1だけでなく天皇杯を含む（大会別に分けた別配列を作っていないことの確認）。
  // ルヴァン（サガン鳥栖戦）はfinished化したためNEXT5には含まれない。
  const competitionNames = next5.map((fixture) => fixture.competition.name);
  assert.equal(competitionNames.includes("ルヴァン"), false);
  assert.ok(competitionNames.includes("天皇杯 JFA 第106回全日本サッカー選手権大会"));
  assert.ok(competitionNames.includes("2026 J1リーグ"));
  // サガン鳥栖戦（match-15）はfinished化しNEXT5から外れるが、detailMatchIdは維持される。
  assert.equal(topFixtures.find((fixture) => fixture.id === "sched-levain-tosu")?.detailMatchId, "match-15");
  // 公式メンバーを登録した鳥取戦は既存fixture IDの詳細へ接続する。
  assert.equal(next5.find((fixture) => fixture.opponentName === "ガイナーレ鳥取")?.detailMatchId, "sched-emperor-tottori");
  // 詳細データ未登録のfixtureには引き続き付与しない。
  assert.equal(next5.find((fixture) => fixture.opponentName === "サンフレッチェ広島")?.detailMatchId, undefined);
  assert.equal(next5.find((fixture) => fixture.opponentName === "FC東京")?.detailMatchId, undefined);
});

test("TOP LAST is 10.07 鳥取 and finished fixtures never enter NEXT", () => {
  assert.equal(getLatestFinishedFixture(topFixtures)?.opponentName, "ガイナーレ鳥取");
  assert.deepEqual(getLatestFinishedFixture(topFixtures)?.score, { home: 0, away: 0 });
  assert.equal(getUpcomingFixtures(topFixtures, now).some((fixture) => fixture.status === "finished"), false);
});

test("TOP finishing simulation (次戦：サガン鳥栖) updates NEXT and LAST without changing detail IDs", () => {
  const simulated = topFixtures.map((fixture) => fixture.id === "sched-levain-tosu" ? { ...fixture, status: "finished" as const, score: { home: 0, away: 1 } } : fixture);
  assert.equal(getNextFixture(simulated, now)?.opponentName, "サンフレッチェ広島");
  assert.equal(getLatestFinishedFixture(simulated)?.opponentName, "ガイナーレ鳥取");
  assert.equal(topFixtures.find((fixture) => fixture.id === "sched-kashima")?.detailMatchId, "match-9");
});

test("TOP schedule keeps 浦和 (sched-urawa/match-14) as LAST once finished, and detailMatchId stays unique", () => {
  const urawa = topFixtures.find((fixture) => fixture.id === "sched-urawa")!;
  assert.equal(urawa.opponentName, "浦和レッズ");
  assert.equal(urawa.detailMatchId, "match-14");
  assert.equal(urawa.isHome, false);
  assert.equal(urawa.status, "finished");
  assert.deepEqual(urawa.score, { home: 3, away: 1 });
  // detailMatchIdはfixture全体で一意（重複登録なし）。
  const detailIds = topFixtures.flatMap((fixture) => fixture.detailMatchId ? [fixture.detailMatchId] : []);
  assert.equal(new Set(detailIds).size, detailIds.length);
  assert.equal(getNextFixture(topFixtures, now)?.opponentName, "サンフレッチェ広島");
});

test("TOP schedule can hold two future fixtures with detailMatchId at the same time (back-to-back detail pages)", () => {
  // 連戦時に「NEXT MATCH」「NEXT+1 MATCH」の2試合分を同時にdetail公開できることの回帰テスト。
  // 本番データ（scheduleMatches / matches[]）は変更せず、検証用のfixture配列でのみ確認する。
  // 鳥栖戦finished化により、以後はsched-emperor-tottori（NEXT）とsched-hiroshima（次の未確定detail）を
  // 用いて同じ回帰を検証する。
  const withTwoFutureDetails = topFixtures.map((fixture) => {
    if (fixture.id === "sched-emperor-tottori") return { ...fixture, status: "scheduled" as const, score: undefined, detailMatchId: "match-14-plus-1-test" };
    if (fixture.id === "sched-hiroshima") return { ...fixture, detailMatchId: "match-14-plus-2-test" };
    return fixture;
  });
  assert.equal(validateFixtures(withTwoFutureDetails).length, 0);
  const next5 = getUpcomingFixtures(withTwoFutureDetails, now, 5);
  assert.equal(next5[0]?.detailMatchId, "match-14-plus-1-test");
  assert.equal(next5[1]?.detailMatchId, "match-14-plus-2-test");
});

test("TOP NEXT5 on 2026-10-10 follows the official schedule (広島 / FC東京 / 横浜FM / 福岡 / 長崎)", () => {
  const today = new Date("2026-10-10T16:00:00+09:00");
  const next5 = getUpcomingFixtures(topFixtures, today, 5);
  assert.deepEqual(next5.map((fixture) => `${fixture.kickoffAt}|${fixture.opponentName}|${fixture.isHome ? "H" : "A"}|${fixture.competition.round}|${fixture.venue}`), [
    "2026-10-11T15:00:00+09:00|サンフレッチェ広島|H|第9節|味の素スタジアム",
    "2026-10-17T14:00:00+09:00|FC東京|H|第10節|味の素スタジアム",
    "2026-10-21T19:00:00+09:00|横浜F・マリノス|A|第11節|ＭＵＦＧスタジアム",
    "2026-10-24T15:00:00+09:00|アビスパ福岡|H|第12節|味の素スタジアム",
    "2026-11-01T14:00:00+09:00|V・ファーレン長崎|A|第13節|PEACE STADIUM Connected by SoftBank",
  ]);
  assert.equal(getNextFixture(topFixtures, today)?.id, next5[0].id);
  assert.equal(new Set(next5.map((fixture) => fixture.id)).size, 5);
  assert.equal(next5.every((fixture) => fixture.status === "scheduled" && fixture.score === undefined), true);
  assert.equal(getLatestFinishedFixture(topFixtures)?.opponentName, "ガイナーレ鳥取");
});
