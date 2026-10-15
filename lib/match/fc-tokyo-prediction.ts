import type { PredictionPlayer } from "./prediction.ts";

/**
 * 10/17 FC東京戦（東京ダービー）の両チーム予想スタメン。Verdy Match Labの非公式な独自予想で、
 * クラブ発表のスターティングメンバーではない。試合データには登録せず、表示対象の試合IDで制御する。
 * 各行は上段＝FW、下段＝GK、行内は画面左→右。
 */
export const FC_TOKYO_PREDICTION_FIXTURE_ID = "sched-fc-tokyo";

/** NEXT/LIVEの表示対象がFC東京戦のときだけ予想スタメンを出す（広島戦の取り残し再発防止）。 */
export function shouldShowFcTokyoPrediction(displayFixture: { id: string } | null | undefined): boolean {
  return displayFixture?.id === FC_TOKYO_PREDICTION_FIXTURE_ID;
}

export const FC_TOKYO_PREDICTION_FORMATION = "4-4-2";

// 背番号は2026/27公式選手一覧で照合。東京V: https://www.verdy.co.jp/team/
// FC東京: https://www.fctokyo.co.jp/team/players/202627（2026-10-15確認）。未確認の選手は登録しない。
export const verdyShirtNumbers: Record<string, number | undefined> = {
  "マテウス": 1, "新井 悠太": 40, "佐古 真礼": 29, "林 尚輝": 4, "鈴木 海音": 15,
  "熊取谷 一星": 25, "齋藤 功佑": 8, "柴戸 海": 2, "藤本 寛也": 19,
  "染野 唯月": 9, "キム ヒョンウ": 17,
};

export const fcTokyoShirtNumbers: Record<string, number | undefined> = {
  "キム スンギュ": 81, "バングーナガンデ佳史扶": 6, "稲村 隼翔": 4, "アレクサンダー・ショルツ": 24, "石原 広教": 22,
  "俵積田 晃太": 33, "常盤 亨太": 27, "高 宇洋": 8, "安斎 颯馬": 7,
  "長倉 幹樹": 26, "マルセロ・ヒアン": 9,
};

export const verdyDerbyRows: PredictionPlayer[][] = [
  [{ name: "染野 唯月", role: "FW" }, { name: "キム ヒョンウ", role: "FW" }],
  [
    { name: "熊取谷 一星", role: "左SH" },
    { name: "齋藤 功佑", role: "中央" },
    { name: "柴戸 海", role: "中央" },
    { name: "藤本 寛也", role: "右SH" },
  ],
  [
    { name: "新井 悠太", role: "左SB" },
    { name: "佐古 真礼", role: "左CB", alternative: "チョ・ユミン" },
    { name: "林 尚輝", role: "右CB" },
    { name: "鈴木 海音", role: "右SB", alternative: "チョ・ユミン／内田 陽介" },
  ],
  [{ name: "マテウス", role: "GK" }],
];

export const fcTokyoDerbyRows: PredictionPlayer[][] = [
  [{ name: "長倉 幹樹", role: "FW" }, { name: "マルセロ・ヒアン", role: "FW" }],
  [
    { name: "俵積田 晃太", role: "左SH" },
    { name: "常盤 亨太", role: "中央" },
    { name: "高 宇洋", role: "中央" },
    { name: "安斎 颯馬", role: "右SH" },
  ],
  [
    { name: "バングーナガンデ佳史扶", role: "左SB", nameBreak: "バングーナガンデ" },
    { name: "稲村 隼翔", role: "左CB" },
    { name: "アレクサンダー・ショルツ", role: "右CB", nameBreak: "アレクサンダー・" },
    { name: "石原 広教", role: "右SB" },
  ],
  [{ name: "キム スンギュ", role: "GK" }],
];
