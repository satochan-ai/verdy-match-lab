import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";
import { shouldShowShimizuPrediction } from "./shimizu-prediction.ts";

const preview = 'aria-label="清水戦 MATCH PREVIEW"';
const strategies = 'aria-label="清水戦 勝敗を左右する三策"';
const prediction = 'aria-label="清水戦 東京V予想スタメン"';
const expected = [9, 33, 40, 16, 10, 19, 18, 96, 4, 22, 1];
const names = ["染野唯月", "一美和成", "新井悠太", "平川怜", "森田晃樹", "藤本寛也", "溝口修平", "チョ ", "ユミン", "林尚輝", "内田陽介", "マテウス"];

test("Shimizu preview, strategies and Verdy prediction render in order for NEXT and LIVE", async () => {
  for (const time of ["2026-11-07T12:59:00+09:00", "2026-11-07T13:00:00+09:00"]) {
    const html = await renderContext(time).render("app/top/page.tsx");
    for (const marker of [preview, strategies, prediction]) assert.ok(html.includes(marker), marker);
    assert.ok(html.indexOf(preview) < html.indexOf(strategies));
    assert.ok(html.indexOf(strategies) < html.indexOf(prediction));
    const card = html.match(/<section\b[\s\S]*?<\/section>/)[0];
    assert.match(card, time.includes("12:59") ? />NEXT MATCH</ : />LIVE MATCH</);
    assert.match(card, /清水エスパルス/);

    const section = html.split(prediction)[1].split("</section>")[0];
    const verdy = section.split('aria-label="東京ヴェルディ 4-4-2"')[1].split("</article>")[0];
    const numbers = [...verdy.matchAll(/rounded-full[^>]*>(\d+)<\/span>/g)].map(m => Number(m[1]));
    assert.deepEqual(numbers, expected);
    assert.equal(new Set(numbers).size, 11);
    assert.deepEqual([...verdy.matchAll(/grid-template-columns:repeat\((\d+),/g)].map(m => Number(m[1])), [2, 4, 4, 1]);
    for (const name of names) assert.ok(verdy.includes(name), name);
    assert.ok(verdy.indexOf("染野唯月") < verdy.indexOf("一美和成"));
    assert.ok(verdy.indexOf("平川怜") < verdy.indexOf("森田晃樹"));
    assert.match(verdy, /bg-primary-green/);
    assert.ok(!verdy.includes("齋藤功佑"));
    for (const note of ["Verdy Match Labによる独自予想", "公式発表のスターティングメンバーではありません", "齋藤功佑→森田晃樹の1人変更", "欠場を断定するものではありません", "清水の予想スタメンは"]) assert.ok(section.includes(note), note);
    for (const source of ["/match/j1/2026/110706/", "match_card_id=34641", "match_card_id=34628", "match_card_id=34619"]) assert.ok(section.includes(source), source);
  }
});

test("Shimizu preview separates facts from hypotheses and lists its sources", async () => {
  const html = await renderContext("2026-11-07T10:00:00+09:00").render("app/top/page.tsx");
  const body = html.split(preview)[1].split("</section>")[0];
  assert.equal([...body.matchAll(/<h4\b/g)].length, 6);
  for (const text of ["3連勝を懸けて日本平へ。東京V、苦しむ清水の「こぼれ球」と左サイドを突けるか", "試合情報", "東京Vの2連勝の評価", "清水の戦術と直近の課題", "勝敗を左右する3つのポイント", "予想スタメンと先発変更の理由", "試合展望", "【事実】", "【仮説】", "町田に0-5、広島に0-4、京都に0-2", "合計11失点", "断定できない", "4-1-2-3", "脳振盪交代", "試合映像の確認に基づく評価ではありません"]) assert.ok(body.includes(text), text);
  for (const source of ["match_card_id=34620", "match_card_id=34627", "match_card_id=34645", "match_card_id=34641", "football-lab.jp/tk-v/preview", "football-lab.jp/shim/preview", "football-lab.jp/shim/formation", "news.at-s.com/article/2088988", "at-s.com/snews/article/ats/2081754.html", "news.at-s.com/article/2083768", "football-zone.net/archives/680684/2", "targma.jp/standbygreen/2026/11/02/post93276/"]) assert.ok(body.includes(source), source);
  const plans = html.split(strategies)[1].split(prediction)[0];
  assert.equal([...plans.matchAll(/<li\b/g)].length, 3);
  for (const text of ["清水の左サイドを抑え、その背後を突く", "2トップの守備で中盤の数的不利を補う", "クロスとセカンドボールで2次攻撃を続ける", "ベンチ入りは公式発表を待つ"]) assert.ok(plans.includes(text), text);
  assert.doesNotMatch(plans, /的中|評価待ち/);
});

test("Shimizu prediction differs from the official Nagasaki start only by Saito to Morita", async () => {
  const html = await renderContext("2026-11-07T10:00:00+09:00").render("app/matches/[id]/page.tsx", { params: Promise.resolve({ id: "sched-nagasaki" }) });
  const pitch = html.split('aria-labelledby="official-formation-verdy"')[1].split("</section>")[0];
  const previous = [...pitch.matchAll(/tabular-nums[^"]*">(\d+)<\/span>/g)].map(m => Number(m[1]));
  assert.equal(previous.length, 11);
  assert.deepEqual(previous.filter(n => !expected.includes(n)), [8]);
  assert.deepEqual(expected.filter(n => !previous.includes(n)), [10]);
});

test("Shimizu content is limited to sched-shimizu in scheduled, live and half_time", async () => {
  for (const status of ["scheduled", "live", "half_time"]) assert.equal(shouldShowShimizuPrediction({ id: "sched-shimizu", status }), true);
  assert.equal(shouldShowShimizuPrediction({ id: "sched-shimizu", status: "finished" }), false);
  assert.equal(shouldShowShimizuPrediction({ id: "sched-nagoya", status: "scheduled" }), false);
  assert.equal(shouldShowShimizuPrediction(null), false);

  const before = await renderContext("2026-11-01T13:59:00+09:00").render("app/top/page.tsx");
  assert.ok(before.includes('aria-label="長崎戦 MATCH PREVIEW"'));
  for (const marker of [preview, strategies, prediction]) assert.ok(!before.includes(marker), marker);

  const after = await renderContext("2026-11-07T18:00:00+09:00", fixtures => fixtures.map(f => f.id === "sched-shimizu" ? { ...f, status: "finished", score: { home: 0, away: 0 } } : f)).render("app/top/page.tsx");
  for (const marker of [preview, strategies, prediction]) assert.ok(!after.includes(marker), marker);
  assert.match(after, /名古屋グランパス/);
});
