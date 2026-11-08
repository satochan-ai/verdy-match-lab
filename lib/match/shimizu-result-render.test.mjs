import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

test("清水戦レビューと試合前保存版を表示する", async () => {
  const html = await renderContext("2026-11-08T12:00:00+09:00").render("app/matches/[id]/page.tsx", { params: Promise.resolve({ id: "sched-shimizu" }) });
  for (const text of ["熊取谷", "72", "平川", "新井", "観戦者", "11/11", "8/11", "19/22", "判断材料不足", "清水戦 MATCH PREVIEW", "清水戦 両チーム予想スタメン", "保存版"]) assert.ok(html.includes(text), text);
  assert.doesNotMatch(html, /13試合すべてを4-1-2-3|11得点のうち4点|走行距離はリーグ2位/);
  assert.match(html, /\/top\/analysis\/jofuku-soma-transition/);
});
