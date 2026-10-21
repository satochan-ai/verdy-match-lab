import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

const preview = 'aria-label="福岡戦 MATCH PREVIEW（東京V／福岡）"';
const strategies = 'aria-label="福岡戦 軍師の三策（東京V／福岡）"';
const predictions = 'aria-label="福岡戦 両チーム予想スタメン"';

test("actual TOP renders Fukuoka PRE content in NEXT and LIVE, with Verdy perspective first", async () => {
  for (const time of ["2026-10-22T12:00:00+09:00", "2026-10-24T14:59:00+09:00", "2026-10-24T15:00:00+09:00"]) {
    const html = await renderContext(time).render("app/top/page.tsx");
    const ordered = ['aria-labelledby="soma-feature-title"', preview, strategies, predictions, "J1 STANDINGS"];
    let previous = -1;
    for (const marker of ordered) {
      const index = html.indexOf(marker);
      assert.ok(index > previous, `${time} ${marker}`);
      previous = index;
    }
    assert.ok(!html.includes('aria-label="横浜FM戦 MATCH PREVIEW'));
    for (const text of ["追いついた横浜FM戦。その粘りを今度こそ勝利へ", "横浜FM戦の粘りを初勝利へつなげられるか", "福岡の2シャドーを封じ、中央を固めよ", "一美と山田の連係で、先制点を奪え", "3-4-2-1", "チョ ユミン", "森田 晃樹", "師岡 柊生", "クラブ発表のスターティングメンバーではありません"]) assert.ok(html.includes(text), text);
    // 視点切り替えの初期表示は東京V（福岡視点はhiddenで描画済み）。
    assert.match(html, /aria-pressed="true"[^>]*>東京V</);
    const card = html.match(/<section\b[\s\S]*?<\/section>/)[0];
    assert.match(card, time.endsWith("T15:00:00+09:00") ? />LIVE MATCH</ : />NEXT MATCH</);
    assert.match(card, /アビスパ福岡/);
    assert.doesNotMatch(card, /href="\/matches\/sched-fukuoka"/);
  }
});

test("finished Fukuoka fixture removes PRE content from TOP but keeps the source data", async () => {
  const ctx = renderContext("2026-10-24T18:00:00+09:00", fixtures => fixtures.map(f => f.id === "sched-fukuoka" ? { ...f, status: "finished", score: { home: 1, away: 1 } } : f));
  const html = await ctx.render("app/top/page.tsx");
  for (const marker of [preview, strategies, predictions]) assert.ok(!html.includes(marker), marker);
  assert.match(html, /相馬直樹新監督特集/);
  assert.match(html, /V・ファーレン長崎/);
});
