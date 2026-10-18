import assert from "node:assert/strict";
import test from "node:test";
import { getNextFixture } from "../data/fixture-selectors.ts";
import { topFixtures as currentTopFixtures } from "../data/top-fixtures.ts";
import { shouldShowFcTokyoPrediction } from "./fc-tokyo-prediction.ts";
import { shouldShowHiroshimaPreContent } from "./hiroshima-content.ts";
import {
  DERBY_ANALYSIS_DISCLAIMER,
  fcTokyoDerbyPreview,
  fcTokyoDerbyStrategies,
  verdyDerbyPreview,
  verdyDerbyStrategies,
} from "./fc-tokyo-preview.ts";

// 10/15時点のプレビュー表示条件を再現する。
const topFixtures = currentTopFixtures.map(f => f.id === "sched-fc-tokyo" ? { ...f, status: "scheduled" as const, score: undefined, kickoffAt: "2026-10-17T14:00:00+09:00" } : f);

test("both teams have a MATCH PREVIEW with title, body and 4 key points", () => {
  assert.equal(verdyDerbyPreview.title, "東京ダービーで問われる、相馬ヴェルディの次なる一手");
  assert.equal(fcTokyoDerbyPreview.title, "東京ダービー、主導権を握るための90分");
  for (const preview of [verdyDerbyPreview, fcTokyoDerbyPreview]) {
    assert.equal(preview.paragraphs.length, 5);
    assert.equal(preview.keyPoints.length, 4);
    assert.ok(preview.disclaimer.startsWith("※"));
  }
  assert.match(DERBY_ANALYSIS_DISCLAIMER, /非公式の独自分析/);
});

test("both teams have exactly three strategies (1/2/3), all pending (no result claimed)", () => {
  for (const strategies of [verdyDerbyStrategies, fcTokyoDerbyStrategies]) {
    assert.deepEqual(strategies.map((s) => s.orderNo), [1, 2, 3]);
    assert.equal(strategies.every((s) => s.result === "pending" && s.title && s.description), true);
  }
  assert.equal(verdyDerbyStrategies.length + fcTokyoDerbyStrategies.length, 6);
});

test("preview text carries verified facts only: 広島0-2 / FC東京 浦和3-0 / 10/14 is the Levain Cup, not the Emperor's Cup", () => {
  assert.match(verdyDerbyPreview.paragraphs[0], /広島戦を0-2で落とした/);
  assert.match(fcTokyoDerbyPreview.paragraphs[0], /10月10日の浦和戦で3-0/);
  const fcText = fcTokyoDerbyPreview.paragraphs.join("") + fcTokyoDerbyPreview.keyPoints.join("");
  assert.equal(fcText.includes("天皇杯"), false);
  assert.match(fcText, /10月14日のルヴァンカップ3回戦/);
  // 勝敗・スコアの予想や確定表現は含めない。
  for (const text of [verdyDerbyPreview.paragraphs.join(""), fcText]) {
    assert.equal(/勝利する|勝てる|[0-9]-[0-9]で(勝|敗)/.test(text.replace(/広島戦を0-2で落とした|浦和戦で3-0と勝利し/g, "")), false);
  }
});

test("preview and strategies share the sched-fc-tokyo gate: only while FC Tokyo is NEXT/LIVE", () => {
  const now = new Date("2026-10-15T12:00:00+09:00");
  assert.equal(shouldShowFcTokyoPrediction(getNextFixture(topFixtures, now)), true);
  assert.equal(shouldShowHiroshimaPreContent(getNextFixture(topFixtures, now)), false);
  const finished = topFixtures.map((f) => f.id === "sched-fc-tokyo" ? { ...f, status: "finished" as const, score: { home: 2, away: 1 } } : f);
  assert.equal(shouldShowFcTokyoPrediction(getNextFixture(finished, new Date("2026-10-17T18:00:00+09:00"))), false);
  assert.equal(shouldShowFcTokyoPrediction(null), false);
});
