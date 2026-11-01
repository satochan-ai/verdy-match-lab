import assert from "node:assert/strict";
import test from "node:test";
import { fcTokyoResult } from "../mock/top-fc-tokyo-result.ts";
import {
  verdyYokohamaRows, marinosYokohamaRows, verdyYokohamaNumbers, marinosYokohamaNumbers,
  verdyYokohamaPreview, marinosPreview, verdyYokohamaStrategies, marinosStrategies,
  shouldShowYokohamaFmContent,
} from "./yokohama-fm-content.ts";

test("Yokohama predictions preserve 11 players, numbers and left-to-right role order", () => {
  const describe = (rows: typeof verdyYokohamaRows, numbers: Record<string, number>) => rows.map(row => row.map(p => `${p.role}:${p.name}#${numbers[p.name]}`));
  assert.deepEqual(describe(verdyYokohamaRows, verdyYokohamaNumbers), [
    ["FW:一美 和成#33", "FW:キム ヒョンウ#17"],
    ["左SH:熊取谷 一星#25", "中央MF:平川 怜#16", "中央MF:柴戸 海#2", "右SH:藤本 寛也#19"],
    ["左SB:新井 悠太#40", "左CB:佐古 真礼#29", "右CB:林 尚輝#4", "右SB:内田 陽介#22"], ["GK:長沢 祐弥#21"],
  ]);
  assert.deepEqual(describe(marinosYokohamaRows, marinosYokohamaNumbers), [
    ["CF:谷村 海那#9"], ["左SH:近藤 友喜#24", "トップ下:天野 純#40", "右SH:ジョルディ・クルークス#11"],
    ["ボランチ:知念 慶#14", "ボランチ:松村 晃助#41"],
    ["左SB:鈴木 冬一#25", "左CB:木村 卓斗#34", "右CB:諏訪間 幸成#33", "右SB:ジェイソン・キニョーネス#17"], ["GK:朴 一圭#1"],
  ]);
  for (const rows of [verdyYokohamaRows, marinosYokohamaRows]) assert.equal(new Set(rows.flat().map(p => p.name)).size, 11);
});

test("Verdy changes five from official derby XI; Marinos changes two from Chiba XI", () => {
  const previousVerdy = Object.values(fcTokyoResult.actualLineups!.home.starters).flat().map(p => p.replace(/^\d+ /, ""));
  const nextVerdy = verdyYokohamaRows.flat().map(p => p.name);
  assert.deepEqual(nextVerdy.filter(n => !previousVerdy.includes(n)).sort(), ["一美 和成", "内田 陽介", "平川 怜", "熊取谷 一星", "長沢 祐弥"].sort());
  assert.deepEqual(previousVerdy.filter(n => !nextVerdy.includes(n)).sort(), ["マテウス", "染野 唯月", "福田 湧矢", "鈴木 海音", "齋藤 功佑"].sort());
  // 横浜FM公式 10/17千葉戦の先発11名。試合データへは追加しない。
  const previousMarinos = ["朴 一圭", "木村 卓斗", "ジェイソン・キニョーネス", "諏訪間 幸成", "鈴木 冬一", "山根 陸", "松村 晃助", "天野 純", "近藤 友喜", "谷村 海那", "宮市 亮"];
  const nextMarinos = marinosYokohamaRows.flat().map(p => p.name);
  assert.deepEqual(nextMarinos.filter(n => !previousMarinos.includes(n)).sort(), ["ジョルディ・クルークス", "知念 慶"].sort());
  assert.deepEqual(previousMarinos.filter(n => !nextMarinos.includes(n)).sort(), ["宮市 亮", "山根 陸"].sort());
});

test("both perspectives retain provided preview and three unevaluated strategies", () => {
  assert.equal(verdyYokohamaPreview.title, "0-4からの再出発。相馬ヴェルディに求められる修正力");
  assert.equal(marinosPreview.title, "連戦のなかで主導権を握れるか。横浜FMの攻撃力に注目");
  assert.equal(verdyYokohamaPreview.paragraphs.length, 6);
  assert.equal(marinosPreview.paragraphs.length, 5);
  for (const p of [verdyYokohamaPreview, marinosPreview]) assert.equal(p.keyPoints.length, 4);
  for (const strategies of [verdyYokohamaStrategies, marinosStrategies]) {
    assert.deepEqual(strategies.map(s => s.orderNo), [1, 2, 3]);
    assert.ok(strategies.every(s => s.result === "pending"));
  }
});

test("only target scheduled/live/half_time fixture may expose Yokohama content", () => {
  for (const status of ["scheduled", "live", "half_time"]) assert.equal(shouldShowYokohamaFmContent({ id: "sched-yokohama-fm", status }), true);
  for (const status of ["finished", "postponed", "cancelled"]) assert.equal(shouldShowYokohamaFmContent({ id: "sched-yokohama-fm", status }), false);
  assert.equal(shouldShowYokohamaFmContent({ id: "sched-fukuoka", status: "scheduled" }), false);
  assert.equal(shouldShowYokohamaFmContent(undefined), false);
});
