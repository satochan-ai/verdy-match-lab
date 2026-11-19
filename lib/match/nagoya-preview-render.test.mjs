import assert from "node:assert/strict";
import test from "node:test";
import { renderContext } from "./render-context.mjs";
import { shouldShowNagoyaPreview } from "./nagoya-preview.ts";

const markers = [
  'aria-label="名古屋戦 MATCH PREVIEW"',
  'aria-label="名古屋戦 軍師の三策"',
  'aria-label="名古屋戦 両チーム予想スタメン"',
  'aria-label="名古屋戦 勝敗予想"',
];

const preMatch = (fixtures) => fixtures.map((fixture) => fixture.id === "sched-nagoya"
  ? { ...fixture, status: "scheduled", score: undefined, detailMatchId: undefined }
  : fixture);

test("名古屋戦の表示中だけ予想ピッチと試合前分析を描画する", async () => {
  for (const [time, heading] of [
    ["2026-11-21T13:59:00+09:00", "NEXT MATCH"],
    ["2026-11-21T14:00:00+09:00", "LIVE MATCH"],
  ]) {
    const html = await renderContext(time, preMatch).render("app/top/page.tsx");
    const header = html.split("</section>", 1)[0];
    assert.ok(header.includes(heading));
    assert.ok(header.includes("名古屋グランパス"));
    for (const marker of markers) assert.equal(html.split(marker).length, 2, marker);
    assert.match(html, /<details[^>]*><summary[^>]*>染野が先発可能な場合の別案<\/summary>/);
    for (const [team, rows] of [
      ["東京ヴェルディ 本命案 4-4-2", [
        ["25 熊取谷一星（左FW）", "33 一美和成（右FW）"],
        ["40 新井悠太（左SH）", "16 平川怜（左CM）", "10 森田晃樹（右CM）", "7 松橋優安（右SH）"],
        ["18 溝口修平（左SB）", "29 佐古真礼（左CB）", "4 林尚輝（右CB）", "22 内田陽介（右SB）"],
        ["1 マテウス（GK）"],
      ]],
      ["東京ヴェルディ 染野先発案 4-4-2", [
        ["9 染野唯月（左FW）", "33 一美和成（右FW）"],
        ["40 新井悠太（左SH）", "16 平川怜（左CM）", "10 森田晃樹（右CM）", "25 熊取谷一星（右SH）"],
        ["18 溝口修平（左SB）", "29 佐古真礼（左CB）", "4 林尚輝（右CB）", "22 内田陽介（右SB）"],
        ["1 マテウス（GK）"],
      ]],
      ["名古屋グランパス 3-4-2-1", [
        ["11 山岸祐也（CF）"],
        ["22 木村勇大（左シャドー）", "17 内田宅哉（右シャドー）"],
        ["27 中山克広（左WB）", "31 高嶺朋樹（左CM）", "15 稲垣祥（右CM）", "7 和泉竜司（右WB）"],
        ["3 佐藤瑶大（左CB）", "13 藤井陽也（中央CB）", "70 原輝綺（右CB）"],
        ["1 シュミット ダニエル（GK）"],
      ]],
    ]) {
      const pitch = html.split('aria-label="' + team + '"')[1].split("</article>")[0];
      const numbers = [...pitch.matchAll(/rounded-full[^>]*>(\d+)<\/span>/g)].map((match) => Number(match[1]));
      const lineupLabels = [...pitch.matchAll(/<dt[^>]*>([^<]+)<\/dt>/g)].map((match) => match[1]);
      const rowSizes = [...pitch.matchAll(/grid-template-columns:repeat\((\d+),/g)].map((match) => Number(match[1]));
      assert.deepEqual(rowSizes, rows.map((row) => row.length));
      assert.deepEqual(lineupLabels, rows.flat());
      assert.deepEqual(numbers, rows.flat().map((player) => Number(player.split(" ")[0])));
      assert.equal(new Set(numbers).size, 11);
    }

    assert.match(html, /直近3試合の先発は0回/);
    assert.match(html, /59分に右SHで入り、67分に左FWへ移って72分に決勝点/);
    assert.doesNotMatch(html, /右SHから決勝点/);
    assert.match(html, /染野唯月｜清水戦67分に公式記録上の脳振盪交代。[^<]+今節の出場可否は未確認/);
    assert.match(html, /藤本寛也｜清水戦で負傷し、59分に交代。[^<]+今節の出場可否は未確認/);
    assert.match(html, /チョ ユミン｜清水戦18分に負傷交代。[^<]+今節の出場可否は未確認/);
    const strategies = html.split(markers[1])[1].split("</section>")[0];
    assert.match(strategies, /松橋が内側で受け、内田陽介を外に走らせる/);
    assert.match(strategies, /右SHの松橋（染野先発案では熊取谷）が左WBの中山に寄せ/);
    assert.match(strategies, /本命案では松橋に代えて寺沼を前線に入れ、熊取谷を右SHへ/);
    assert.match(strategies, /染野先発案では染野に代えて松橋を右SHに入れ、清水戦と同様に熊取谷を左FWへ移す/);
    assert.doesNotMatch(strategies, /藤本|熊取谷を投入/);
    assert.ok(html.includes("東京V 1–0 名古屋"));
    assert.ok(html.includes("/match/j1/2026/112101/"));
    assert.ok(!html.includes('aria-label="清水戦 MATCH PREVIEW"'));
  }
});

test("別カード・名古屋戦の結果登録後・他カテゴリに名古屋戦プレビューを出さない", async () => {
  const before = await renderContext("2026-11-07T12:59:00+09:00").render("app/top/page.tsx");
  assert.ok(before.includes('aria-label="清水戦 MATCH PREVIEW"'));

  const finished = (fixtures) => fixtures.map((fixture) => fixture.id === "sched-nagoya"
    ? { ...fixture, status: "finished", score: { home: 0, away: 0 } }
    : fixture);
  const nextTime = "2026-11-21T18:00:00+09:00";
  const after = await renderContext(nextTime, finished).render("app/top/page.tsx");
  const header = after.split("</section>", 1)[0];
  assert.ok(header.includes("NEXT MATCH"));
  assert.ok(header.includes("水戸ホーリーホック"));

  const categoryTime = "2026-11-19T19:00:00+09:00";
  const category = renderContext(categoryTime);
  const [beleza, u21] = await Promise.all([
    category.render("app/beleza/page.tsx"),
    category.render("app/u21/page.tsx"),
  ]);
  for (const html of [before, after, beleza, u21]) {
    for (const marker of markers) assert.ok(!html.includes(marker), marker);
  }

  assert.equal(shouldShowNagoyaPreview({ id: "sched-nagoya", status: "half_time" }), true);
  assert.equal(shouldShowNagoyaPreview({ id: "sched-nagoya", status: "finished" }), false);
  assert.equal(shouldShowNagoyaPreview(undefined), false);
});
