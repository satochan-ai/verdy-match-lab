import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

const preview = 'aria-label="長崎戦 MATCH PREVIEW"';
const strategies = 'aria-label="長崎戦 軍師の三策"';
const prediction = 'aria-label="長崎戦 両チーム予想スタメン"';

test("Nagasaki PRE content renders in NEXT and LIVE with four chapters and source boundaries", async () => {
  for (const time of ["2026-11-01T13:59:00+09:00", "2026-11-01T14:00:00+09:00"]) {
    const html = await renderContext(time).render("app/top/page.tsx");
    const body = html.split(preview)[1].split("</section>")[0];
    assert.ok(html.indexOf(preview) < html.indexOf(strategies));
    assert.ok(html.indexOf(strategies) < html.indexOf(prediction));
    assert.equal([...body.matchAll(/<h4\b/g)].length, 4);
    for (const text of ["連勝を目指す東京V、長崎の攻撃の軸をどう抑えるか", "1勝1分2敗、5得点4失点", "千葉に1-1、鹿島に0-2、広島に4-0、浦和に0-1", "36分", "45分", "66分の広島・アレー退場後", "73分と90+7分", "4試合連続先発", "3試合連続先発", "広島に0-2、FC東京に0-4、横浜FMに2-2、福岡に3-1", "勝点12、東京Vは8", "仮説", "試合映像の確認に基づく評価ではなく"]) assert.ok(body.includes(text), text);
    for (const source of ["match_card_id=34601", "match_card_id=34613", "match_card_id=34625", "match_card_id=34631", "match_card_id=34628", "football-lab.jp/tk-v/preview", "football-lab.jp/ngsk/preview", "102115/", "102503/#lineup"]) assert.ok(body.includes(source), source);
  }
});

test("Nagasaki three strategies explain distinct actions and condition unannounced substitutes", async () => {
  const html = await renderContext("2026-11-01T12:00:00+09:00").render("app/top/page.tsx");
  const plans = html.split(strategies)[1].split(prediction)[0];
  assert.equal([...plans.matchAll(/<li\b/g)].length, 3);
  for (const text of ["第一策", "第二策", "第三策", "長崎の中央の連係を制限する", "左サイドの連係から好機をつくる", "交代カードで終盤の勝負を決める", "平川怜と齋藤功佑は両方が前へ出ず", "右CBの土肥幹太", "右WBが翁長聖", "松橋優安と寺沼星文", "出場停止明けの染野唯月", "森田晃樹を起用できる場合", "ベンチ入りは公式発表を待つ"]) assert.ok(plans.includes(text), text);
  assert.doesNotMatch(plans, /的中|評価待ち|resultComment/);
  const body = html.split(preview)[1].split("</section>")[0];
  const descriptions = [...plans.matchAll(/<p class="mt-1 text-\[13px\][^"]*">([^<]+)<\/p>/g)].map(m => m[1]);
  assert.equal(descriptions.length, 3);
  for (const description of descriptions) assert.ok(!body.includes(description));
});

test("Nagasaki preview and strategies disappear together with predictions for another NEXT fixture", async () => {
  const html = await renderContext("2026-11-01T18:00:00+09:00", fixtures => fixtures.map(f => f.id === "sched-nagasaki" ? { ...f, status: "finished", score: { home: 0, away: 0 } } : f)).render("app/top/page.tsx");
  for (const marker of [preview, strategies, prediction]) assert.ok(!html.includes(marker));
  assert.match(html, /清水エスパルス/);
  assert.match(html, /相馬直樹新監督特集/);
  assert.match(html, /2026年11月8日19:24更新/);
  assert.match(html, /href="\/matches\/sched-nagasaki"/);
});
