import type { Strategy } from "../../types/domain";
import type { PredictionPlayer } from "./prediction.ts";
import type { YokohamaFmPreview } from "./yokohama-fm-content.ts";

/** 10/24 福岡戦の非公式な独自予想。公式スタメン・試合結果とは別に保持する。 */
export const FUKUOKA_FIXTURE_ID = "sched-fukuoka";
export function shouldShowFukuokaContent(fixture: { id: string; status: string } | null | undefined): boolean {
  return fixture?.id === FUKUOKA_FIXTURE_ID && ["scheduled", "live", "half_time"].includes(fixture.status);
}
export const FUKUOKA_PREDICTION_DISCLAIMER = "※掲載内容はVerdy Match Labによる非公式の独自予想です。クラブ発表のスターティングメンバーではありません。";
export const FUKUOKA_ANALYSIS_DISCLAIMER = "※MATCH PREVIEW・軍師の三策は、Verdy Match Labによる非公式の独自分析・予想です。";
export const verdyFukuokaFormation = "4-4-2";
export const avispaFormation = "3-4-2-1";
// 背番号は東京ヴェルディ公式選手一覧とJリーグ公式試合記録（2026-10-22確認）。
// チョ ユミン（96）はクラブ選手一覧に未掲載のため、Jリーグ公式試合記録（10/17・10/21）の登録番号を採用。
// 福岡はJリーグ公式試合記録（10/10・10/18・10/21）の登録番号。ピッチ上の役割は独自予想。
export const fukuokaPredictionSources = [
  { label: "東京ヴェルディ公式 選手一覧", url: "https://www.verdy.co.jp/team/" },
  { label: "Jリーグ公式 横浜FM vs 東京V（10/21）", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34619" },
  { label: "Jリーグ公式 福岡 vs G大阪（10/21）", url: "https://www.jleague.jp/match/j1/2026/102114/" },
  { label: "Jリーグ公式 出場停止情報（10/19）", url: "https://www.jleague.jp/news/article/35155/" },
];
export const fukuokaPreviewSources = [
  { label: "Jリーグ公式 町田 vs 福岡（10/18）", url: "https://www.jleague.jp/match/j1/2026/101812/" },
  { label: "Jリーグ公式 福岡 vs G大阪（10/21）", url: "https://www.jleague.jp/match/j1/2026/102114/" },
  { label: "Jリーグ公式 横浜FM vs 東京V（10/21）", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34619" },
];

// rowsは上段＝FW、下段＝GK、各行は画面左→右（左サイドが左）。
export const verdyFukuokaRows: PredictionPlayer[][] = [
  [{ name: "一美 和成", role: "FW" }, { name: "山田 剛綺", role: "FW" }],
  [{ name: "新井 悠太", role: "左MF" }, { name: "柴戸 海", role: "中央MF" }, { name: "森田 晃樹", role: "中央MF" }, { name: "藤本 寛也", role: "右MF" }],
  [{ name: "溝口 修平", role: "左SB" }, { name: "佐古 真礼", role: "CB" }, { name: "チョ ユミン", role: "CB" }, { name: "内田 陽介", role: "右SB" }],
  [{ name: "マテウス", role: "GK" }],
];
export const verdyFukuokaNumbers: Record<string, number> = {
  "一美 和成": 33, "山田 剛綺": 13,
  "新井 悠太": 40, "柴戸 海": 2, "森田 晃樹": 10, "藤本 寛也": 19,
  "溝口 修平": 18, "佐古 真礼": 29, "チョ ユミン": 96, "内田 陽介": 22,
  "マテウス": 1,
};

export const avispaRows: PredictionPlayer[][] = [
  [{ name: "師岡 柊生", role: "CF" }],
  [{ name: "北島 祐二", role: "シャドー" }, { name: "重見 柾斗", role: "シャドー" }],
  [{ name: "前嶋 洋太", role: "左WB" }, { name: "椎橋 慧也", role: "中央MF" }, { name: "見木 友哉", role: "中央MF" }, { name: "湯澤 聖人", role: "右WB" }],
  [{ name: "岡 哲平", role: "CB" }, { name: "上島 拓巳", role: "CB" }, { name: "辻岡 佑真", role: "CB" }],
  [{ name: "小畑 裕馬", role: "GK" }],
];
export const avispaNumbers: Record<string, number> = {
  "師岡 柊生": 13,
  "北島 祐二": 25, "重見 柾斗": 6,
  "前嶋 洋太": 29, "椎橋 慧也": 34, "見木 友哉": 11, "湯澤 聖人": 2,
  "岡 哲平": 16, "上島 拓巳": 5, "辻岡 佑真": 15,
  "小畑 裕馬": 24,
};

export const verdyFukuokaPreview: YokohamaFmPreview = {
  title: "追いついた横浜FM戦。その粘りを今度こそ勝利へ",
  paragraphs: [
    "前節の横浜F・マリノス戦では、2点を先行されながら藤本寛也と山田剛綺のゴールで2-2に追いついた東京ヴェルディ。",
    "FC東京戦での0-4という大敗から、最後まで諦めずに勝点1をつかんだことは大きな収穫だった。一方で、リーグ戦では依然として勝利がなく、結果が求められる状況は変わらない。",
    "今回の予想スタメンでは4-4-2を継続し、最終ラインと中盤の構成を変更する。",
    "センターバックにはチョ・ユミンと佐古真礼、右サイドバックには内田陽介を起用すると予想。中盤中央は柴戸海と森田晃樹の組み合わせとし、左の新井悠太、右の藤本寛也とともに攻守のバランスを整えたい。",
    "前線は一美和成と山田剛綺の2トップを予想。横浜FM戦で劇的な同点ゴールを決めた山田が、先発起用された場合にどのようなプレーを見せるかにも注目したい。",
    "対する福岡は3-4-2-1を継続すると予想される。東京Vとしては相手のウイングバックへの対応と、中央のセカンドボール回収が重要になる。",
    "横浜FM戦で見せた粘りを、今度は勝利につなげられるか。相馬直樹監督のチームづくりが問われる一戦となる。",
  ],
  keyPoints: [
    "チョ・ユミンと佐古真礼を中心とした守備の立て直し",
    "柴戸海と森田晃樹による中盤の主導権争い",
    "一美和成と山田剛綺の2トップ",
    "横浜FM戦の粘りを初勝利へつなげられるか",
  ],
};
export const avispaPreview: YokohamaFmPreview = {
  title: "連敗からの立て直し。中盤の安定と得点力回復が鍵",
  paragraphs: [
    "直近の町田戦で0-3、G大阪戦で1-2と連敗したアビスパ福岡。中2日で迎える東京ヴェルディ戦では、守備の安定と攻撃の改善を両立できるかがポイントになる。",
    "今回の予想では、直近3試合で採用している3-4-2-1を継続する。",
    "1トップには師岡柊生を据え、2シャドーには北島祐二と重見柾斗を配置。中央MFには椎橋慧也と見木友哉を予想した。",
    "相手の東京Vは、前節の横浜FM戦で2点差を追いつく粘りを見せている。福岡としては相手の勢いを受けるだけでなく、ウイングバックの攻撃参加とシャドーの動きによって守備ラインの隙間を狙いたい。",
    "また、東京Vの4-4-2に対して、福岡の3バックと中盤がどのように数的優位を作るかも注目点になる。",
    "連敗から抜け出すためには、試合の主導権を握る時間を増やし、得点機会を確実に結果へつなげることが求められる。",
  ],
  keyPoints: [
    "3-4-2-1の継続と選手の連係",
    "椎橋慧也と見木友哉による中盤の安定",
    "師岡柊生を中心とした攻撃の組み立て",
    "ウイングバックとシャドーの連係による東京V守備陣の攻略",
  ],
};

// 確定原稿の段落はそのまま連結して1つの説明文として保持する（文言は変更しない）。
export const verdyFukuokaStrategies: Strategy[] = [
  {
    orderNo: 1,
    title: "福岡の2シャドーを封じ、中央を固めよ",
    description: [
      "福岡の3-4-2-1に対し、最も警戒したいのは2シャドーが中盤と最終ラインの間でボールを受ける場面。",
      "チョ・ユミンと佐古真礼を中心に、柴戸海と森田晃樹が連係して中央のスペースを管理する。",
      "最終ラインだけに守備を任せず、中盤を含めた組織的な対応で相手の攻撃を制限したい。",
    ].join(""),
    result: "pending",
  },
  {
    orderNo: 2,
    title: "新井と藤本を起点に、福岡の両サイドを攻略せよ",
    description: [
      "福岡の3バックに対しては、サイドのスペースをどのように使うかが重要となる。",
      "左の新井悠太、右の藤本寛也を起点に攻撃を展開。相手ウイングバックの背後を狙い、サイドからのクロスや中央への折り返しでチャンスを作りたい。",
      "内田陽介と溝口修平の攻撃参加も、福岡の守備を広げるための選択肢となる。",
    ].join(""),
    result: "pending",
  },
  {
    orderNo: 3,
    title: "一美と山田の連係で、先制点を奪え",
    description: [
      "前節の横浜FM戦では2点を追う展開から同点に追いついたが、毎試合追いかける展開では苦しい。",
      "今回は一美和成と山田剛綺の2トップによる連係を生かし、早い時間帯からゴールを狙いたい。",
      "一美が前線で起点を作り、山田がゴール前へ飛び込むなど、異なる動きを組み合わせて福岡の3バックを揺さぶる。",
      "先制点を奪い、試合を優位に進めることが重要になる。",
    ].join(""),
    result: "pending",
  },
];
export const avispaStrategies: Strategy[] = [
  {
    orderNo: 1,
    title: "2シャドーで東京Vの中盤と最終ラインの間を突け",
    description: [
      "東京Vの4-4-2に対して、福岡は北島祐二と重見柾斗の2シャドーを効果的に使いたい。",
      "柴戸海と森田晃樹の背後でボールを受け、師岡柊生との連係からゴール前へ侵入する。",
      "中央で相手守備陣の判断を迷わせることが、得点機会を増やす鍵となる。",
    ].join(""),
    result: "pending",
  },
  {
    orderNo: 2,
    title: "両ウイングバックを押し上げ、東京Vのサイドを制せよ",
    description: [
      "東京Vの両サイドには新井悠太と藤本寛也が配置されると予想される。",
      "福岡としては、湯澤聖人と前嶋洋太を積極的に押し上げ、相手サイドMFを守備に追わせたい。",
      "ウイングバックとシャドーの連係で数的優位を作り、クロスや中央への侵入から決定機を狙う。",
    ].join(""),
    result: "pending",
  },
  {
    orderNo: 3,
    title: "中盤のセカンドボールを回収し、攻撃を継続せよ",
    description: [
      "中2日の連戦では、試合を通じた運動量と集中力が重要になる。",
      "椎橋慧也と見木友哉を中心に、こぼれ球を回収して相手のカウンターを防ぎながら攻撃を継続する。",
      "東京Vの2トップに簡単にボールを収めさせず、攻守の切り替えで優位に立ちたい。",
      "守備の安定を確保しながら、師岡や2シャドーへの供給を増やしてゴールにつなげる。",
    ].join(""),
    result: "pending",
  },
];
