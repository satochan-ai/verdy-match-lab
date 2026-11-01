import type { Strategy } from "../../types/domain";

/**
 * 10/17 FC東京戦（東京ダービー、sched-fc-tokyo）のMATCH PREVIEWと軍師の三策。
 * Verdy Match Labの試合前時点の独自分析で、公式見解・確定した先発・勝敗予想ではない。
 * 表示対象の試合ID制御は fc-tokyo-prediction.ts の shouldShowFcTokyoPrediction を共用する。
 * 事実は次で確認: 広島戦0-2（既存の公式結果データ）／FC東京の10/10浦和戦3-0（J公式
 * https://www.jleague.jp/match/j1/2026/101009/）／10/14はルヴァンカップ3回戦・水戸戦
 * （https://www.jleague.jp/club/ftokyo/day/）。
 */
export type DerbyPreview = { title: string; paragraphs: string[]; keyPoints: string[]; disclaimer: string };

export const verdyDerbyPreview: DerbyPreview = {
  title: "東京ダービーで問われる、相馬ヴェルディの次なる一手",
  paragraphs: [
    "10月11日のサンフレッチェ広島戦を0-2で落とした東京ヴェルディ。相馬直樹監督の就任2試合目は、FC東京との東京ダービーとなる。",
    "広島戦では4-4-2を採用したが、選手起用や組み合わせをどこまで変更するかが注目される。今節も4-4-2を継続するのか、それとも別の布陣を用意しているのか。",
    "攻撃では、染野唯月とキム ヒョンウの2トップを軸に、藤本寛也や熊取谷一星がどのように関わるかが鍵になる。特に前線への配球と、ボールを奪った後の攻守の切り替えに注目したい。",
    "守備では、FC東京の長倉幹樹とマルセロ・ヒアンの2トップを想定し、最終ラインの連係とセカンドボールへの対応が重要になる。",
    "新体制での初勝利を目指す東京ヴェルディにとって、攻守両面で改善の兆しを示したい一戦となる。",
  ],
  keyPoints: ["相馬監督が4-4-2を継続するか", "熊取谷一星の先発起用", "染野とキム ヒョンウの連係", "FC東京の2トップへの対応"],
  disclaimer: "※選手起用はVerdy Match Lab独自の予想であり、公式発表ではない。",
};

export const fcTokyoDerbyPreview: DerbyPreview = {
  title: "東京ダービー、主導権を握るための90分",
  paragraphs: [
    "FC東京は10月10日の浦和戦で3-0と勝利し、東京ヴェルディとのダービーに臨む。",
    "10月14日のルヴァンカップ3回戦ではメンバーを入れ替えており、今回の予想ではリーグ戦の主力が戻る展開を想定する。ただし、実際の先発起用は未確定である。",
    "攻撃では、長倉幹樹とマルセロ・ヒアンの2トップを予想。俵積田晃太と安斎颯馬によるサイドからの仕掛けを組み合わせ、東京Vの守備ラインに圧力をかけたい。",
    "中盤では常盤亨太と高宇洋の組み合わせを想定。中央でのボール奪取と攻守の切り替えが、試合の流れを左右するポイントとなりそうだ。",
    "相馬新体制の東京Vがどのような戦い方を見せるのかを見極めながら、FC東京が持ち味を発揮できるかが注目される。",
  ],
  keyPoints: ["カップ戦からのメンバー変更", "長倉・マルセロ・ヒアンの2トップ", "常盤・高の中央MF", "東京Vの新体制への対応"],
  disclaimer: "※FC東京の先発予想および戦術的な展望は非公式の独自分析。",
};

export const verdyDerbyStrategies: Strategy[] = [
  { orderNo: 1, title: "中央を固め、二枚の刃を封じよ", description: "FC東京の2トップに中央で自由を与えない。CBとボランチの距離を適切に保ち、縦パスの受け手とセカンドボールへの対応を徹底する。", result: "pending" },
  { orderNo: 2, title: "熊取谷と藤本で両翼を動かせ", description: "熊取谷の積極的な仕掛けと藤本の技術を生かし、サイドから攻撃の起点を作る。染野とキム ヒョンウへのラストパスや背後への動き出しにつなげたい。", result: "pending" },
  { orderNo: 3, title: "奪った瞬間を好機に変えよ", description: "中盤でボールを奪った後は、相手守備が整う前に前線へ運ぶ。齋藤と柴戸を中心に攻守の切り替えを速め、少ない手数で決定機を作る。", result: "pending" },
];

export const fcTokyoDerbyStrategies: Strategy[] = [
  { orderNo: 1, title: "二枚の前線で最終ラインを揺さぶれ", description: "長倉とマルセロ・ヒアンの2トップを生かし、東京VのCB間や背後を狙う。前線の動き出しを組み合わせ、守備ラインに継続的な判断を迫る。", result: "pending" },
  { orderNo: 2, title: "両翼から守備を切り崩せ", description: "俵積田と安斎によるサイド攻撃で幅を確保し、東京Vのサイドハーフとサイドバックを押し下げる。中央への折り返しやクロスで得点機会を作る。", result: "pending" },
  { orderNo: 3, title: "中盤の攻防を制し、試合を動かせ", description: "常盤と高を中心に中盤の主導権を狙う。東京Vの齋藤・柴戸に自由な配球を許さず、ボール奪取から素早く攻撃へ移行する。", result: "pending" },
];

export const DERBY_ANALYSIS_DISCLAIMER =
  "※MATCH PREVIEWおよび軍師の三策はVerdy Match Labによる非公式の独自分析です。各クラブ・監督の公式見解や実際の戦術指示ではありません。";
