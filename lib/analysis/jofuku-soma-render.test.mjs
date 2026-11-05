import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "../match/render-context.mjs";

test("article presents qualitative analysis through Nagasaki without Football LAB statistics", async () => {
  const html = await renderContext("2026-11-05T12:00:00+09:00").render("app/top/analysis/jofuku-soma-transition/page.tsx");
  assert.match(html, /東京ヴェルディの戦い方はどう変わったのか/);
  for (let i = 1; i <= 7; i++) assert.ok(html.includes(`id="chapter-${i}"`), `chapter ${i}`);
  for (const text of ["3-4-2-1", "4-4-2", "概念図", "長崎戦", "熊取谷", "スルーパス", "FC東京戦", "Jリーグ：長崎戦", "旧記事に記された見立て", "溝口と新井", "齋藤功佑", "再検証は行っていません"]) assert.ok(html.includes(text), text);
  for (const text of ["football-lab.jp", "ゴール期待値", "ボール支配率と対戦相手", "FC東京戦を除く相馬体制3試合", "115.64km"]) assert.ok(!html.includes(text), text);
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
  assert.match(html, /フォーメーション、攻守、選手起用と交代策から変化を考える/);
  assert.match(html, />NEXT MATCH</);
  assert.match(html, /href="\/matches\/sched-fukuoka"/);
});
