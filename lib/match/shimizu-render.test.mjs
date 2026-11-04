import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";
import { shouldShowShimizuPrediction } from "./shimizu-prediction.ts";
import { shimizuStrategies } from "./shimizu-content.ts";

const preview = 'aria-label="清水戦 MATCH PREVIEW"';
const strategies = 'aria-label="清水戦 勝敗を左右する三策"';
const prediction = 'aria-label="清水戦 両チーム予想スタメン"';
const expected = [9, 33, 40, 16, 10, 19, 18, 96, 4, 22, 1];
const shimizuExpected = [7, 9, 13, 21, 37, 17, 25, 14, 3, 24, 1];
const shimizuNames = ["カピシャーバ", "オ セフン", "ジャーメイン ", "良", "松崎快", "小泉慶", "弓場将輝", "マテウス ", "ブルネッティ", "パク ", "スンウク", "高橋祐治", "須貝英大", "沖悠哉"];
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
    for (const note of ["両チームともVerdy Match Labによる独自予想", "公式発表のスターティングメンバーではありません", "齋藤功佑→森田晃樹の1人変更", "欠場を断定するものではありません"]) assert.ok(section.includes(note), note);
    for (const source of ["/match/j1/2026/110706/", "match_card_id=34641", "match_card_id=34628", "match_card_id=34619"]) assert.ok(section.includes(source), source);

    // 清水の予想は東京Vの下（PCでは右列）に、4-1-2-3の3/2/1/4/1で表示する。
    assert.ok(section.indexOf('aria-label="東京ヴェルディ 4-4-2"') < section.indexOf('aria-label="清水エスパルス 4-1-2-3"'));
    assert.match(section, /grid gap-6 lg:grid-cols-2/);
    const shimizu = section.split('aria-label="清水エスパルス 4-1-2-3"')[1].split("</article>")[0];
    const shimizuNumbers = [...shimizu.matchAll(/rounded-full[^>]*>(\d+)<\/span>/g)].map(m => Number(m[1]));
    assert.deepEqual(shimizuNumbers, shimizuExpected);
    assert.equal(new Set(shimizuNumbers).size, 11);
    assert.deepEqual([...shimizu.matchAll(/grid-template-columns:repeat\((\d+),/g)].map(m => Number(m[1])), [3, 2, 1, 4, 1]);
    for (const name of shimizuNames) assert.ok(shimizu.includes(name), name);
    for (const alternative of ["候補：藤井智也", "候補：嶋本悠大・平戸太貴", "候補：蓮川壮大", "候補：梅田透吾"]) assert.ok(shimizu.includes(alternative), alternative);
    assert.match(shimizu, /bg-orange-700 ring-2 ring-blue-900/);
    assert.ok(!shimizu.includes("蓮川壮大</p>") && !shimizu.includes(">蓮川"), "蓮川 is listed only as a candidate");
    for (const note of ["蓮川壮大→パク スンウクの1人変更", "欠場を断定するものではありません", "直近4試合連続", "先発・ベンチ入りの確定情報ではありません"]) assert.ok(section.split("清水の起用予想と根拠")[1].includes(note), note);
    for (const source of ["match_card_id=34645", "match_card_id=34627", "match_card_id=34620", "match_card_id=34615", "match_card_id=34602", "103112/#lineup", "102406/#lineup", "102110/#lineup", "101715/#lineup"]) assert.ok(section.includes(source), source);
  }
});

test("Shimizu preview separates facts from hypotheses and lists its sources", async () => {
  const html = await renderContext("2026-11-07T10:00:00+09:00").render("app/top/page.tsx");
  const body = html.split(preview)[1].split("</section>")[0];
  assert.equal([...body.matchAll(/<h4\b/g)].length, 6);
  for (const text of ["3連勝を懸けて日本平へ。東京V、苦しむ清水の「こぼれ球」と左サイドを突けるか", "試合情報", "東京Vの2連勝の評価", "清水の戦術と直近の課題", "勝敗を左右する3つのポイント", "予想スタメンと先発変更の理由", "試合展望", "【事実】", "【仮説】", "町田に0-5、広島に0-4、京都に0-2", "合計11失点", "断定できない", "4-1-2-3", "直近4試合のアンカーはいずれも弓場将輝", "脳振盪交代", "試合映像の確認に基づく評価ではありません"]) assert.ok(body.includes(text), text);
  for (const source of ["match_card_id=34620", "match_card_id=34627", "match_card_id=34645", "match_card_id=34641", "football-lab.jp/tk-v/preview", "football-lab.jp/shim/preview", "football-lab.jp/shim/formation", "news.at-s.com/article/2088988", "at-s.com/snews/article/ats/2081754.html", "news.at-s.com/article/2083768", "football-zone.net/archives/680684/2", "targma.jp/standbygreen/2026/11/02/post93276/"]) assert.ok(body.includes(source), source);
  const plans = html.split(strategies)[1].split(prediction)[0];
  assert.equal([...plans.matchAll(/<li\b/g)].length, 3);
  for (const text of ["清水の左サイドを抑え、その背後を突く", "2トップの守備で中盤の数的不利を補う", "クロスとセカンドボールで2次攻撃を続ける", "ベンチ入りは公式発表を待つ"]) assert.ok(plans.includes(text), text);
  assert.doesNotMatch(plans, /的中|評価待ち/);
  // KEY POINTSは三策と同じ3テーマ（左サイド／中盤／クロス・セカンドボール）に対応させる。
  const keyPoints = [...body.split("KEY POINTS")[1].matchAll(/<span class="min-w-0[^"]*">([^<]+)<\/span>/g)].map(m => m[1]);
  assert.deepEqual(keyPoints, ["清水の左サイドと東京Vの右サイドの攻防", "4-4-2と4-1-2-3の中盤の噛み合わせ", "クロス・こぼれ球とセカンドボール"]);
  for (const [index, theme] of [["1", "左サイド"], ["2", "中盤"], ["3", "セカンドボール"]]) assert.ok(keyPoints[index - 1].includes(theme) && shimizuStrategies[index - 1].title.includes(theme), theme);
  // 森田の先発理由と齋藤の未確定状況は、本文と予想スタメン欄に残す。
  const lineup = html.split(prediction)[1].split("</section>")[0];
  for (const area of [body, lineup]) for (const text of ["森田晃樹", "後半をすべてプレー", "齋藤", "脳振盪交代", "欠場を断定するもので"]) assert.ok(area.includes(text), text);
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
