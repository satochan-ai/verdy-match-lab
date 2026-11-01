import assert from "node:assert/strict";
import test from "node:test";
import { yokohamaFmResult } from "../mock/top-yokohama-fm-result.ts";
import {
  verdyFukuokaRows, avispaRows, verdyFukuokaNumbers, avispaNumbers,
  verdyFukuokaPreview, avispaPreview, verdyFukuokaStrategies, avispaStrategies,
  verdyFukuokaFormation, avispaFormation, shouldShowFukuokaContent,
} from "./fukuoka-content.ts";

const describe = (rows: typeof verdyFukuokaRows, numbers: Record<string, number>) => rows.map(row => row.map(p => `${p.role}:${p.name}#${numbers[p.name]}`));

test("Fukuoka predictions keep the user-decided 22 players, numbers and left-to-right order", () => {
  assert.equal(verdyFukuokaFormation, "4-4-2");
  assert.equal(avispaFormation, "3-4-2-1");
  assert.deepEqual(describe(verdyFukuokaRows, verdyFukuokaNumbers), [
    ["FW:一美 和成#33", "FW:山田 剛綺#13"],
    ["左MF:新井 悠太#40", "中央MF:柴戸 海#2", "中央MF:森田 晃樹#10", "右MF:藤本 寛也#19"],
    ["左SB:溝口 修平#18", "CB:佐古 真礼#29", "CB:チョ ユミン#96", "右SB:内田 陽介#22"], ["GK:マテウス#1"],
  ]);
  assert.deepEqual(describe(avispaRows, avispaNumbers), [
    ["CF:師岡 柊生#13"], ["シャドー:北島 祐二#25", "シャドー:重見 柾斗#6"],
    ["左WB:前嶋 洋太#29", "中央MF:椎橋 慧也#34", "中央MF:見木 友哉#11", "右WB:湯澤 聖人#2"],
    ["CB:岡 哲平#16", "CB:上島 拓巳#5", "CB:辻岡 佑真#15"], ["GK:小畑 裕馬#24"],
  ]);
  for (const rows of [verdyFukuokaRows, avispaRows]) assert.equal(new Set(rows.flat().map(p => p.name)).size, 11);
  assert.ok(!verdyFukuokaRows.flat().some(p => p.name === "染野 唯月"));
});

test("Verdy changes five from the official Yokohama FM XI; Fukuoka changes one from the G Osaka XI", () => {
  const previousVerdy = Object.values(yokohamaFmResult.actualLineups!.away.starters).flat().map(p => p.replace(/^\d+ /, ""));
  const nextVerdy = verdyFukuokaRows.flat().map(p => p.name);
  assert.deepEqual(nextVerdy.filter(n => !previousVerdy.includes(n)).sort(), ["内田 陽介", "佐古 真礼", "山田 剛綺", "柴戸 海", "森田 晃樹"].sort());
  // Jリーグ公式 10/21 福岡 vs G大阪の先発11名。試合データへは追加しない。
  const previousAvispa = ["小畑 裕馬", "岡 哲平", "上島 拓巳", "辻岡 佑真", "湯澤 聖人", "前田 快", "見木 友哉", "前嶋 洋太", "北島 祐二", "重見 柾斗", "師岡 柊生"];
  const nextAvispa = avispaRows.flat().map(p => p.name);
  assert.deepEqual(nextAvispa.filter(n => !previousAvispa.includes(n)), ["椎橋 慧也"]);
  assert.deepEqual(previousAvispa.filter(n => !nextAvispa.includes(n)), ["前田 快"]);
});

test("both perspectives keep the provided preview and three unevaluated strategies", () => {
  assert.equal(verdyFukuokaPreview.title, "追いついた横浜FM戦。その粘りを今度こそ勝利へ");
  assert.equal(avispaPreview.title, "連敗からの立て直し。中盤の安定と得点力回復が鍵");
  assert.equal(verdyFukuokaPreview.paragraphs.length, 7);
  assert.equal(avispaPreview.paragraphs.length, 6);
  for (const p of [verdyFukuokaPreview, avispaPreview]) assert.equal(p.keyPoints.length, 4);
  assert.deepEqual(verdyFukuokaStrategies.map(s => s.title), ["福岡の2シャドーを封じ、中央を固めよ", "新井と藤本を起点に、福岡の両サイドを攻略せよ", "一美と山田の連係で、先制点を奪え"]);
  assert.deepEqual(avispaStrategies.map(s => s.title), ["2シャドーで東京Vの中盤と最終ラインの間を突け", "両ウイングバックを押し上げ、東京Vのサイドを制せよ", "中盤のセカンドボールを回収し、攻撃を継続せよ"]);
  for (const strategies of [verdyFukuokaStrategies, avispaStrategies]) {
    assert.deepEqual(strategies.map(s => s.orderNo), [1, 2, 3]);
    assert.ok(strategies.every(s => s.result === "pending"));
  }
  assert.ok(verdyFukuokaStrategies[2].description.endsWith("先制点を奪い、試合を優位に進めることが重要になる。"));
  assert.ok(avispaStrategies[2].description.endsWith("守備の安定を確保しながら、師岡や2シャドーへの供給を増やしてゴールにつなげる。"));
});

test("only the Fukuoka fixture in scheduled/live/half_time exposes the content", () => {
  for (const status of ["scheduled", "live", "half_time"]) assert.equal(shouldShowFukuokaContent({ id: "sched-fukuoka", status }), true);
  for (const status of ["finished", "postponed", "cancelled"]) assert.equal(shouldShowFukuokaContent({ id: "sched-fukuoka", status }), false);
  assert.equal(shouldShowFukuokaContent({ id: "sched-nagasaki", status: "scheduled" }), false);
  assert.equal(shouldShowFukuokaContent(undefined), false);
});
