import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";

test("清水戦レビューと試合前保存版を表示する", async () => {
  const html = await renderContext("2026-11-08T12:00:00+09:00").render("app/matches/[id]/page.tsx", { params: Promise.resolve({ id: "sched-shimizu" }) });
  for (const text of ["熊取谷", "72", "平川", "新井", "観戦者", "11/11", "8/11", "19/22", "判断材料不足", "清水戦 MATCH PREVIEW", "清水戦 両チーム予想スタメン", "保存版"]) assert.ok(html.includes(text), text);
  assert.match(html, /熊取谷の決勝点と無失点で、リーグ3連勝/);
  assert.doesNotMatch(html, /敵地3連勝|13試合すべてを4-1-2-3|11得点のうち4点|走行距離はリーグ2位|清水はホームで2勝2分3敗/);
  assert.match(html, /苦しい状況にある清水が立ち上がりから強く出てくることも想定し/);
  assert.match(html, /【事実】広島戦後には吉田孝行監督/);
  assert.match(html, /3つ目は、クロスとこぼれ球、セカンドボールへの対応。溝口のクロス/);
  assert.match(html, /\/top\/analysis\/jofuku-soma-transition/);
});

test("清水戦の公式スタメンを実際の開始時配置でピッチ表示し、試合前の予想とは分ける", async () => {
  const html = await renderContext("2026-11-08T12:00:00+09:00").render("app/matches/[id]/page.tsx", { params: Promise.resolve({ id: "sched-shimizu" }) });
  const pitch = (id) => html.split(`aria-labelledby="official-formation-${id}"`)[1].split("</section>")[0];
  const numbers = (section) => [...section.matchAll(/tabular-nums[^"]*">(\d+)<\/span>/g)].map(m => Number(m[1]));
  // Jリーグ公式「前半0分」の並び（前線→GKの表示順、各行は左→右）。
  const shimizu = pitch("shimizu-s-pulse");
  const verdy = pitch("verdy");
  assert.match(shimizu, /4-1-2-3/);
  assert.match(verdy, /4-4-2/);
  assert.deepEqual(numbers(shimizu), [50, 9, 8, 18, 17, 37, 25, 14, 3, 24, 1]);
  assert.deepEqual(numbers(verdy), [9, 33, 40, 16, 10, 19, 18, 96, 4, 22, 1]);
  for (const name of ["沖 悠哉", "小泉 慶", "平戸 太貴", "弓場 将輝", "藤井 智也", "オ セフン", "井上 健太"]) assert.ok(shimizu.includes(name), name);
  for (const name of ["マテウス", "溝口 修平", "チョ ユミン", "林 尚輝", "内田 陽介", "新井 悠太", "平川 怜", "森田 晃樹", "藤本 寛也", "染野 唯月", "一美 和成"]) assert.ok(verdy.includes(name), name);
  // 控えはピッチに混ぜない。
  for (const bench of ["梅田 透吾", "カピシャーバ", "松崎 快", "ジャーメイン 良"]) assert.ok(!shimizu.includes(bench), bench);
  for (const bench of ["佐古 真礼", "熊取谷 一星", "柴戸 海"]) assert.ok(!verdy.includes(bench), bench);
  assert.match(html, /フォーメーションと選手配置：Jリーグ公式 フォーメーション「前半0分」/);
  assert.match(html, /試合前の予想フォーメーションとは別の、実際の配置です/);
  // 試合前の予想（保存版）は清水4-1-2-3の予想配置のまま残す。
  const saved = html.split('aria-label="清水エスパルス 4-1-2-3"')[1].split("</article>")[0];
  assert.deepEqual([...saved.matchAll(/rounded-full[^>]*>(\d+)<\/span>/g)].map(m => Number(m[1])), [7, 9, 13, 21, 37, 17, 25, 14, 3, 24, 1]);
  assert.ok(html.includes('aria-label="東京ヴェルディ 4-4-2"'));
});
