import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";
import { mitoOpponentLineup, mitoVerdyLineup, mitoVerdySomenoLineup, shouldShowMitoPreview } from "./mito-preview.ts";

const markers = [
  'aria-label="水戸戦 MATCH PREVIEW"',
  'aria-label="水戸戦 軍師の三策"',
  'aria-label="水戸戦 両チーム予想スタメン"',
  'aria-label="水戸戦 勝敗予想"',
];

const verdyMain = [
  ["33 一美和成（左FW）", "25 熊取谷一星（右FW）"],
  ["40 新井悠太（左SH）", "16 平川怜（左CM）", "10 森田晃樹（右CM）", "7 松橋優安（右SH）"],
  ["18 溝口修平（左SB）", "29 佐古真礼（左CB）", "4 林尚輝（右CB）", "22 内田陽介（右SB）"],
  ["1 マテウス（GK）"],
];
const verdySomeno = [
  ["9 染野唯月（左FW）", "25 熊取谷一星（右FW）"],
  ...verdyMain.slice(1),
];
const mito = [
  ["30 奥村仁（左FW）", "9 根本凌（右FW）"],
  ["44 西原源樹（左SH）", "20 舩橋佑（左CM）", "19 仙波大志（右CM）", "16 田村遊吏（右SH）"],
  ["3 大崎航詩（左SB）", "17 板倉健太（左CB）", "15 木本恭生（右CB）", "25 真瀬拓海（右SB）"],
  ["27 ヤクブ スウォビィク（GK）"],
];

test("予想布陣は3案とも4-4-2の11人で重複がなく、本命案と別案の差は左FWだけ", () => {
  for (const lineup of [mitoVerdyLineup, mitoVerdySomenoLineup, mitoOpponentLineup]) {
    const players = lineup.rows.flat();
    assert.equal(lineup.formation, "4-4-2");
    assert.deepEqual(lineup.rows.map((row) => row.length), [2, 4, 4, 1]);
    assert.equal(new Set(players.map((player) => player.name)).size, 11);
    assert.equal(new Set(players.map((player) => player.number)).size, 11);
  }
  const main = mitoVerdyLineup.rows.flat();
  const someno = mitoVerdySomenoLineup.rows.flat();
  const changed = main.flatMap((player, index) => player.name === someno[index].name ? [] : [[player.name, someno[index].name, player.role]]);
  assert.deepEqual(changed, [["一美和成", "染野唯月", "左FW"]]);
  assert.ok(!main.some((player) => player.name === "染野唯月"));
});

test("水戸戦が表示中のとき、3つの予想布陣と三策・予想スコアを描画する", async () => {
  for (const [time, heading] of [
    ["2026-11-22T12:00:00+09:00", "NEXT MATCH"],
    ["2026-11-25T19:00:00+09:00", "LIVE MATCH"],
  ]) {
    const html = await renderContext(time).render("app/top/page.tsx");
    const header = html.split("</section>", 1)[0];
    assert.ok(header.includes(heading));
    assert.ok(header.includes("水戸ホーリーホック"));
    for (const marker of markers) assert.equal(html.split(marker).length, 2, marker);
    assert.match(html, /<details[^>]*><summary[^>]*>染野が先発する場合の別案<\/summary>/);
    for (const [team, rows] of [
      ["東京ヴェルディ 本命案 4-4-2", verdyMain],
      ["東京ヴェルディ 染野先発案 4-4-2", verdySomeno],
      ["水戸ホーリーホック 4-4-2", mito],
    ]) {
      const pitch = html.split('aria-label="' + team + '"')[1].split("</article>")[0];
      const numbers = [...pitch.matchAll(/rounded-full[^>]*>(\d+)<\/span>/g)].map((match) => Number(match[1]));
      const labels = [...pitch.matchAll(/<dt[^>]*>([^<]+)<\/dt>/g)].map((match) => match[1]);
      const rowSizes = [...pitch.matchAll(/grid-template-columns:repeat\((\d+),/g)].map((match) => Number(match[1]));
      assert.deepEqual(rowSizes, rows.map((row) => row.length));
      assert.deepEqual(labels, rows.flat());
      assert.deepEqual(numbers, rows.flat().map((player) => Number(player.split(" ")[0])));
    }

    const strategies = html.split(markers[1])[1].split("</section>")[0];
    assert.match(strategies, /途中で松橋を入れる交代は使わない/);
    assert.match(strategies, /一美に代えて染野を入れ、左FWに置く/);
    assert.match(strategies, /内田に代えて鈴木海音を右SBへ/);
    assert.match(strategies, /松橋に代えて山見を入れ、熊取谷を右SHへ戻して山見を右FWに置く/);
    assert.doesNotMatch(strategies, /松橋を投入|松橋を入れ、/);
    assert.match(html, /神戸が10人になった後のプレー/);
    assert.match(html, /染野唯月｜名古屋戦は先発して交代なし。[^<]+負傷や欠場を示すものではない/);
    assert.match(html, /藤本寛也・チョ ユミン｜[^<]+今節の出場可否は未確認/);
    assert.match(html, /11月8日の千葉戦で消化済み/);
    assert.ok(html.includes("水戸 0–1 東京V"));
    assert.ok(html.includes("0-0の可能性"));
    assert.ok(html.includes("/match/j1/2026/112003/lineup/"));
    assert.ok(!html.includes('aria-label="名古屋戦 MATCH PREVIEW"'));
  }
});

test("試合終了後・別カード・他カテゴリに水戸戦プレビューを出さない", async () => {
  const nagoyaDay = await renderContext("2026-11-21T13:59:00+09:00").render("app/top/page.tsx");
  assert.ok(nagoyaDay.includes('aria-label="名古屋戦 MATCH PREVIEW"'));
  const category = renderContext("2026-11-22T12:00:00+09:00");
  const [beleza, u21] = await Promise.all([category.render("app/beleza/page.tsx"), category.render("app/u21/page.tsx")]);
  const afterMatch = await renderContext("2026-11-26T12:00:00+09:00", (fixtures) => fixtures.map((fixture) =>
    fixture.id === "sched-mito" ? { ...fixture, status: "finished", score: { verdy: 1, opponent: 0 } } : fixture)).render("app/top/page.tsx");
  for (const html of [nagoyaDay, beleza, u21, afterMatch]) {
    for (const marker of markers) assert.ok(!html.includes(marker), marker);
  }

  assert.equal(shouldShowMitoPreview({ id: "sched-mito", status: "scheduled" }), true);
  assert.equal(shouldShowMitoPreview({ id: "sched-mito", status: "half_time" }), true);
  assert.equal(shouldShowMitoPreview({ id: "sched-mito", status: "finished" }), false);
  assert.equal(shouldShowMitoPreview({ id: "sched-nagoya", status: "scheduled" }), false);
  assert.equal(shouldShowMitoPreview(undefined), false);
});
