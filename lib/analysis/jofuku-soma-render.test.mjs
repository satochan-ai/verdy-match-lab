import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "../match/render-context.mjs";

test("article page renders the seven chapters, both pitches, data tables and sources", async () => {
  const html = await renderContext("2026-10-26T12:00:00+09:00").render("app/top/analysis/jofuku-soma-transition/page.tsx");
  assert.match(html, /城福体制から相馬体制へ。4試合で何が変わったのか？/);
  for (let i = 1; i <= 7; i++) assert.ok(html.includes(`id="chapter-${i}"`), `chapter ${i}`);
  for (const text of ["3-4-2-1", "4-4-2", "115.64km", "121.44km", "123.8回", "147.0回", "0.932", "0.858", "33.45m", "35.8m", "ボール支配率と対戦相手", "単純平均", "公式データとの照合はしていません", "football-lab.jp", "jleague.jp/match/j1/2026/102408"]) assert.ok(html.includes(text), text);
  assert.match(html, /aria-label="城福体制 3-4-2-1"/);
  assert.match(html, /aria-label="相馬体制 4-4-2"/);
});

test("TOP places the SPECIAL ANALYSIS card below LAST MATCH and above NEXT 5", async () => {
  const html = await renderContext("2026-10-26T12:00:00+09:00").render("app/top/page.tsx");
  const last = html.indexOf(">LAST MATCH<");
  const card = html.indexOf('href="/top/analysis/jofuku-soma-transition"');
  const next5 = html.indexOf(">NEXT 5<");
  assert.ok(last > 0 && card > last && next5 > card, `${last} ${card} ${next5}`);
  assert.match(html, /SPECIAL ANALYSIS｜特別分析/);
  assert.match(html, /基本スタメン、運動量、ボール奪取位置、選手起用の変化を比較/);
  assert.match(html, />NEXT MATCH</);
  assert.match(html, /href="\/matches\/sched-fukuoka"/);
});
