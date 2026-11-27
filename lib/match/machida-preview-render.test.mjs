import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { renderContext } from "./render-context.mjs";
import { machidaVerdyLineup, machidaVerdyRotationLineup, machidaOpponentLineup, machidaStrategies, machidaScorePrediction, shouldShowMachidaPreview } from "./machida-preview.ts";

const mainRows = [[9, 33], [30, 16, 10, 25], [18, 29, 4, 22], [1]];
const rotationRows = [[9, 33], [30, 16, 10, 7], [18, 29, 4, 22], [1]];
const opponentRows = [[99], [7, 20], [33, 16, 31, 88], [3, 24, 6], [1]];
const marker = 'aria-label="町田戦 MATCH PREVIEW"';

test("A/B案は指定の左右・11人で、差は右MFだけ。停止選手と福田を含めない", () => {
  for (const [lineup, expected] of [[machidaVerdyLineup, mainRows], [machidaVerdyRotationLineup, rotationRows], [machidaOpponentLineup, opponentRows]]) {
    const players = lineup.rows.flat();
    assert.deepEqual(lineup.rows.map((row) => row.map((p) => p.number)), expected);
    assert.equal(players.length, 11);
    assert.equal(new Set(players.map((p) => p.number)).size, 11);
    assert.equal(new Set(players.map((p) => p.name)).size, 11);
    assert.ok(players.every((p) => p.role && p.reason));
  }
  for (const lineup of [machidaVerdyLineup, machidaVerdyRotationLineup]) {
    assert.equal(lineup.formation, "4-4-2");
    assert.ok(!lineup.rows.flat().some((p) => p.number === 14 || p.number === 40));
  }
  const a = machidaVerdyLineup.rows.flat();
  const b = machidaVerdyRotationLineup.rows.flat();
  assert.deepEqual(a.flatMap((p, i) => p.number === b[i].number ? [] : [[p.number, b[i].number, p.role]]), [[25, 7, "右MF"]]);
});

test("TOPの町田J1 NEXT/LIVEで最新の本文・布陣・三策・予想を実際に描画する", async () => {
  for (const [time, heading] of [["2026-11-27T20:00:00+09:00", "NEXT MATCH"], ["2026-11-29T16:00:00+09:00", "LIVE MATCH"]]) {
    const html = await renderContext(time).render("app/top/page.tsx");
    assert.ok(html.includes(heading));
    assert.equal(html.split(marker).length, 2);
    for (const [title, rows] of [["東京ヴェルディ 本命案（A案） 4-4-2", mainRows], ["東京ヴェルディ 別案（B案） 4-4-2", rotationRows], ["FC町田ゼルビア 3-4-2-1", opponentRows]]) {
      const article = html.split('aria-label="' + title + '"')[1]?.split("</article>")[0];
      assert.ok(article, title);
      assert.deepEqual([...article.matchAll(/rounded-full[^>]*>(\d+)<\/span>/g)].map((m) => Number(m[1])), rows.flat());
      assert.deepEqual([...article.matchAll(/grid-template-columns:repeat\((\d+),/g)].map((m) => Number(m[1])), rows.map((row) => row.length));
      assert.equal([...article.matchAll(/<dt[^>]*>/g)].length, 11);
    }
    assert.match(html, /出場停止の新井に代わって川村楽人を左MF/);
    assert.match(html, /【観戦者の評価】/);
    assert.match(html, /右MF適性そのものを否定/);
    assert.match(html, /155分、松橋43分/);
    assert.match(html, /実際の疲労状態は未確認/);
    assert.match(html, /川村→福田（左MF）/);
    assert.match(html, /A案では熊取谷→松橋（右MF）、B案では松橋→熊取谷（右MF）/);
    assert.match(html, /染野または一美→山見（FW）/);
    assert.match(html, /平川または森田→齋藤（CM）/);
    assert.match(html, /内田→鈴木海音（右SB）/);
    assert.match(html, /固定順ではなく/);
    assert.match(html, /川村・溝口 vs 中村・望月/);
    assert.ok(html.includes("町田 1–0 東京V"));
    assert.ok(!html.includes('aria-label="水戸戦 MATCH PREVIEW"'));
    assert.ok(!html.includes("新井の代役に熊取谷"));
  }
});

test("J1町田戦だけに限定し、終了後・天皇杯・他カテゴリに漏れない", async () => {
  for (const status of ["scheduled", "live", "half_time"]) assert.equal(shouldShowMachidaPreview({ id: "sched-machida-j1", status }), true);
  for (const fixture of [undefined, { id: "sched-machida-j1", status: "finished" }, { id: "sched-machida-emperor", status: "scheduled" }, { id: "sched-kyoto", status: "scheduled" }]) assert.equal(shouldShowMachidaPreview(fixture), false);
  const after = await renderContext("2026-11-30T12:00:00+09:00", (fixtures) => fixtures.map((f) => f.id === "sched-machida-j1" ? { ...f, status: "finished" } : f)).render("app/top/page.tsx");
  const emperor = await renderContext("2026-12-09T18:30:00+09:00", (fixtures) => fixtures.map((f) =>
    f.kickoffAt && Date.parse(f.kickoffAt) < Date.parse("2026-12-09T00:00:00+09:00") ? { ...f, status: "finished" } : f)).render("app/top/page.tsx");
  assert.ok(emperor.includes("LIVE MATCH"));
  assert.ok(emperor.includes("天皇杯 JFA 第106回全日本サッカー選手権大会"));
  for (const html of [after, emperor, await renderContext("2026-11-27T12:00:00+09:00").render("app/beleza/page.tsx"), await renderContext("2026-11-27T12:00:00+09:00").render("app/u21/page.tsx")]) assert.ok(!html.includes(marker));
});

test("三策は未実施の提案で、原案と観戦者評価の出所を調査資料に残す", () => {
  assert.deepEqual(machidaStrategies.map((s) => s.orderNo), [1, 2, 3]);
  for (const s of machidaStrategies) {
    assert.equal(s.result, "pending");
    for (const label of ["狙い：", "選手・配置：", "実行方法：", "成功条件：", "失敗条件：", "観察ポイント："]) assert.ok(s.description.includes(label));
  }
  assert.equal(machidaScorePrediction.score, "町田 1–0 東京V");
  const doc = readFileSync(new URL("../../docs/machida-preview-20261129-research.md", import.meta.url), "utf8");
  assert.match(doc, /当初の調査原案（履歴として保存・現行予想ではない）/);
  assert.match(doc, /左MF熊取谷、右MF福田/);
  for (const label of ["【公式情報】", "【調査分析】", "【観戦者評価】", "【最終予想】"]) assert.ok(doc.includes(label));
});
