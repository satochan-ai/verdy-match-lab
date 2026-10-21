import assert from "node:assert/strict";
import test from "node:test";
import { getNextFixture } from "../data/fixture-selectors.ts";
import { topFixtures as currentTopFixtures } from "../data/top-fixtures.ts";
import { shouldShowHiroshimaPreContent } from "./hiroshima-content.ts";
import {
  FC_TOKYO_PREDICTION_FIXTURE_ID,
  fcTokyoDerbyRows,
  fcTokyoShirtNumbers,
  shouldShowFcTokyoPrediction,
  verdyDerbyRows,
  verdyShirtNumbers,
} from "./fc-tokyo-prediction.ts";

const line = (rows: typeof verdyDerbyRows, numbers: Record<string, number | undefined>) =>
  rows.map((row) => row.map((p) => `${p.role}:${p.name}#${numbers[p.name] ?? ""}`));

// 試合前の予定時刻・状態を隔離fixtureで保持する。
const topFixtures = currentTopFixtures.map(f => {
  if (f.id === "sched-fc-tokyo") return { ...f, status: "scheduled" as const, score: undefined, kickoffAt: "2026-10-17T14:00:00+09:00" };
  if (f.id === "sched-yokohama-fm") return { ...f, status: "scheduled" as const, score: undefined, detailMatchId: undefined, kickoffAt: "2026-10-21T19:00:00+09:00" };
  return f;
});

test("Verdy predicted XI: 4-4-2, 11 players, left→right order, official numbers", () => {
  assert.deepEqual(verdyDerbyRows.map((row) => row.length), [2, 4, 4, 1]); // FW / MF / DF / GK（上→下）
  assert.deepEqual(line(verdyDerbyRows, verdyShirtNumbers), [
    ["FW:染野 唯月#9", "FW:キム ヒョンウ#17"],
    ["左SH:熊取谷 一星#25", "中央:齋藤 功佑#8", "中央:柴戸 海#2", "右SH:藤本 寛也#19"],
    ["左SB:新井 悠太#40", "左CB:佐古 真礼#29", "右CB:林 尚輝#4", "右SB:鈴木 海音#15"],
    ["GK:マテウス#1"],
  ]);
  assert.equal(new Set(verdyDerbyRows.flat().map((p) => p.name)).size, 11);
});

test("Verdy alternatives: 佐古→チョ・ユミン, 鈴木→チョ・ユミン／内田 陽介 (candidates only, no numbers registered)", () => {
  const alternatives = Object.fromEntries(verdyDerbyRows.flat().filter((p) => p.alternative).map((p) => [p.name, p.alternative]));
  assert.deepEqual(alternatives, { "佐古 真礼": "チョ・ユミン", "鈴木 海音": "チョ・ユミン／内田 陽介" });
  // 対抗候補は選手として先発に並ばず、背番号も未確認のため登録しない。
  assert.equal(verdyShirtNumbers["チョ・ユミン"], undefined);
});

test("FC東京 predicted XI: 4-4-2, 11 players, 常盤→高 left→right, full name 佳史扶, official numbers", () => {
  assert.deepEqual(fcTokyoDerbyRows.map((row) => row.length), [2, 4, 4, 1]);
  assert.deepEqual(line(fcTokyoDerbyRows, fcTokyoShirtNumbers), [
    ["FW:長倉 幹樹#26", "FW:マルセロ・ヒアン#9"],
    ["左SH:俵積田 晃太#33", "中央:常盤 亨太#27", "中央:高 宇洋#8", "右SH:安斎 颯馬#7"],
    ["左SB:バングーナガンデ佳史扶#6", "左CB:稲村 隼翔#4", "右CB:アレクサンダー・ショルツ#24", "右SB:石原 広教#22"],
    ["GK:キム スンギュ#81"],
  ]);
  assert.equal(new Set(fcTokyoDerbyRows.flat().map((p) => p.name)).size, 11);
  assert.equal(fcTokyoDerbyRows.flat().some((p) => p.name.includes("南野")), false);
  assert.equal(fcTokyoDerbyRows.flat().every((p) => p.alternative === undefined), true);
});

test("name break hints only split a name at a boundary, never alter the name", () => {
  for (const player of [...verdyDerbyRows, ...fcTokyoDerbyRows].flat()) {
    if (player.nameBreak) {
      assert.ok(player.name.startsWith(player.nameBreak) && player.name.length > player.nameBreak.length, player.name);
    }
  }
});

test("FC Tokyo prediction is bound to sched-fc-tokyo and follows NEXT/LIVE only", () => {
  const fixture = topFixtures.find((f) => f.id === FC_TOKYO_PREDICTION_FIXTURE_ID);
  assert.equal(fixture?.opponentName, "FC東京");
  assert.equal(fixture?.kickoffAt, "2026-10-17T14:00:00+09:00");
  // 現データ：NEXTはFC東京戦 → 表示、広島戦専用は非表示。
  const beforeKickoff = new Date("2026-10-15T12:00:00+09:00");
  const next = getNextFixture(topFixtures, beforeKickoff);
  assert.equal(shouldShowFcTokyoPrediction(next), true);
  assert.equal(shouldShowHiroshimaPreContent(next), false);
  // 試合終了後（結果登録済）は次戦エリアから消える（NEXTは横浜FMへ）。
  const finished = topFixtures.map((f) => f.id === FC_TOKYO_PREDICTION_FIXTURE_ID ? { ...f, status: "finished" as const, score: { home: 1, away: 0 } } : f);
  const after = getNextFixture(finished, new Date("2026-10-17T18:00:00+09:00"));
  assert.equal(after?.id, "sched-yokohama-fm");
  assert.equal(shouldShowFcTokyoPrediction(after), false);
  // NEXT未設定・他試合では出さない。
  assert.equal(shouldShowFcTokyoPrediction(null), false);
  assert.equal(shouldShowFcTokyoPrediction(undefined), false);
  assert.equal(shouldShowFcTokyoPrediction({ id: "sched-hiroshima" }), false);
});
