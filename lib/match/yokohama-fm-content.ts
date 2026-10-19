import type { Strategy } from "../../types/domain";
import type { PredictionPlayer } from "./prediction.ts";

/** 10/21 横浜FM戦の非公式な独自予想。公式スタメン・試合結果とは別に保持する。 */
export const YOKOHAMA_FM_FIXTURE_ID = "sched-yokohama-fm";
export function shouldShowYokohamaFmContent(fixture: { id: string; status: string } | null | undefined): boolean {
  return fixture?.id === YOKOHAMA_FM_FIXTURE_ID && ["scheduled", "live", "half_time"].includes(fixture.status);
}
export const YOKOHAMA_FM_PREDICTION_DISCLAIMER = "※掲載内容はVerdy Match Labによる非公式の独自予想です。クラブ発表のスターティングメンバーではありません。";
export const YOKOHAMA_FM_ANALYSIS_DISCLAIMER = "※MATCH PREVIEW・軍師の三策は、Verdy Match Labによる非公式の独自分析・予想です。";
export const verdyFormation = "4-4-2";
export const marinosFormation = "4-2-3-1";
// 背番号・登録ポジションは両クラブの公式選手一覧（2026-10-19確認）。ピッチ上の役割は独自予想。
export const predictionSources = [
  { label: "東京ヴェルディ公式 選手一覧", url: "https://www.verdy.co.jp/team/" },
  { label: "横浜F・マリノス公式 選手一覧", url: "https://www.f-marinos.com/team/player" },
  { label: "Jリーグ公式 出場停止情報（10/19）", url: "https://www.jleague.jp/news/article/35155/?navicode=j2" },
  { label: "横浜FM公式 松村晃助 特別指定認定", url: "https://www.f-marinos.com/news/team/9559" },
];
export const previewSources = [
  { label: "横浜FM公式 C大阪戦（10/10）", url: "https://www.f-marinos.com/matches/20261010/matchdata" },
  { label: "横浜FM公式 千葉戦（10/17）", url: "https://www.f-marinos.com/matches/20261017/matchdata" },
  { label: "横浜FM公式 東京V戦（10/21）", url: "https://www.f-marinos.com/matches/20261021/event/" },
];
export type YokohamaFmPreview = { title: string; paragraphs: string[]; keyPoints: string[] };

export const verdyYokohamaRows: PredictionPlayer[][] = [
  [
    {
      "name": "一美 和成",
      "role": "FW"
    },
    {
      "name": "キム ヒョンウ",
      "role": "FW"
    }
  ],
  [
    {
      "name": "熊取谷 一星",
      "role": "左SH"
    },
    {
      "name": "平川 怜",
      "role": "中央MF"
    },
    {
      "name": "柴戸 海",
      "role": "中央MF"
    },
    {
      "name": "藤本 寛也",
      "role": "右SH"
    }
  ],
  [
    {
      "name": "新井 悠太",
      "role": "左SB"
    },
    {
      "name": "佐古 真礼",
      "role": "左CB"
    },
    {
      "name": "林 尚輝",
      "role": "右CB"
    },
    {
      "name": "内田 陽介",
      "role": "右SB"
    }
  ],
  [
    {
      "name": "長沢 祐弥",
      "role": "GK"
    }
  ]
];
export const verdyYokohamaNumbers: Record<string, number> = {
  "一美 和成": 33,
  "キム ヒョンウ": 17,
  "熊取谷 一星": 25,
  "平川 怜": 16,
  "柴戸 海": 2,
  "藤本 寛也": 19,
  "新井 悠太": 40,
  "佐古 真礼": 29,
  "林 尚輝": 4,
  "内田 陽介": 22,
  "長沢 祐弥": 21
};

export const marinosYokohamaRows: PredictionPlayer[][] = [
  [
    {
      "name": "谷村 海那",
      "role": "CF"
    }
  ],
  [
    {
      "name": "近藤 友喜",
      "role": "左SH"
    },
    {
      "name": "天野 純",
      "role": "トップ下"
    },
    {
      "name": "ジョルディ・クルークス",
      "role": "右SH",
      "nameBreak": "ジョルディ・"
    }
  ],
  [
    {
      "name": "知念 慶",
      "role": "ボランチ"
    },
    {
      "name": "松村 晃助",
      "role": "ボランチ"
    }
  ],
  [
    {
      "name": "鈴木 冬一",
      "role": "左SB"
    },
    {
      "name": "木村 卓斗",
      "role": "左CB"
    },
    {
      "name": "諏訪間 幸成",
      "role": "右CB"
    },
    {
      "name": "ジェイソン・キニョーネス",
      "role": "右SB",
      "nameBreak": "ジェイソン・"
    }
  ],
  [
    {
      "name": "朴 一圭",
      "role": "GK"
    }
  ]
];
export const marinosYokohamaNumbers: Record<string, number> = {
  "谷村 海那": 9,
  "近藤 友喜": 24,
  "天野 純": 40,
  "ジョルディ・クルークス": 11,
  "知念 慶": 14,
  "松村 晃助": 41,
  "鈴木 冬一": 25,
  "木村 卓斗": 34,
  "諏訪間 幸成": 33,
  "ジェイソン・キニョーネス": 17,
  "朴 一圭": 1
};

export const verdyYokohamaPreview: YokohamaFmPreview = {
  "title": "0-4からの再出発。相馬ヴェルディに求められる修正力",
  "paragraphs": [
    "FC東京との東京ダービーで0-4と敗れた東京ヴェルディ。相馬直樹監督の就任3試合目は、中3日で迎えるアウェイの横浜F・マリノス戦となる。",
    "今回の予想では4-4-2を継続しながら、先発5名の入れ替えを想定した。",
    "染野唯月の出場停止により、前線は一美和成とキム ヒョンウの2トップを予想。中盤では平川怜を起用し、ボールを保持した際の配球と攻撃の組み立てに変化を加えたい。",
    "左サイドには熊取谷一星、右サイドには藤本寛也を配置。両サイドの攻撃参加と、前線へのサポートが得点機会を作る鍵になる。",
    "守備では、FC東京戦で4失点した反省を踏まえ、最終ラインと中盤の距離感、攻守の切り替え、サイドの守備対応を改善できるかが焦点となる。",
    "大敗から短期間でどこまで立て直せるか。相馬監督の修正力が問われる一戦となる。"
  ],
  "keyPoints": [
    "4-4-2を継続するか",
    "染野不在の2トップ",
    "平川怜の先発起用",
    "守備の立て直しと失点防止"
  ]
};
export const marinosPreview: YokohamaFmPreview = {
  "title": "連戦のなかで主導権を握れるか。横浜FMの攻撃力に注目",
  "paragraphs": [
    "10月10日のC大阪戦、17日の千葉戦をともに0-0で終えた横浜F・マリノス。東京ヴェルディ戦では、ホーム扱いの一戦で攻撃面の改善が求められる。",
    "今回の独自予想では4-2-3-1を継続し、直近の先発から2名を変更する。",
    "右サイドにはジョルディ・クルークス、ボランチには知念慶を起用すると予想。CFの谷村海那は引き続き先発し、トップ下の天野純や両サイドとの連係によって得点機会を作りたい。",
    "東京Vは前節0-4で敗れているものの、相馬監督が選手配置や守備の組織を修正する可能性がある。横浜FMとしては、相手の出方に対応しながら自分たちの攻撃を展開できるかが重要になる。",
    "中3日の連戦でどこまで攻撃の質を高められるかが注目される。"
  ],
  "keyPoints": [
    "4-2-3-1の継続",
    "クルークスの右サイド起用",
    "知念慶の中盤起用",
    "谷村海那を中心とした得点機会の創出"
  ]
};
export const verdyYokohamaStrategies: Strategy[] = [
  {
    "orderNo": 1,
    "title": "中央の守備を固め、失点を防げ",
    "description": "前節の4失点を踏まえ、最終ラインと中盤の距離を適切に保つ。横浜FMの谷村・天野らが中央で自由にプレーできるスペースを制限する。",
    "result": "pending"
  },
  {
    "orderNo": 2,
    "title": "平川を起点に攻撃を組み立てよ",
    "description": "平川怜の配球を生かし、前線への縦パスとサイドチェンジを使い分ける。熊取谷と藤本を攻撃に参加させ、一美とキム ヒョンウへの供給を増やす。",
    "result": "pending"
  },
  {
    "orderNo": 3,
    "title": "両サイドの守備と攻撃を連動させよ",
    "description": "横浜FMのサイド攻撃に対応しながら、ボール奪取後は素早く前方へ展開する。サイドバックとサイドハーフの連係を徹底し、攻守の切り替えで後手に回らないようにする。",
    "result": "pending"
  }
];
export const marinosStrategies: Strategy[] = [
  {
    "orderNo": 1,
    "title": "クルークスの突破で右サイドを制せよ",
    "description": "クルークスを起点に右サイドから仕掛け、東京Vの左サイド守備を崩す。クロスとカットインを使い分けて得点機会を作る。",
    "result": "pending"
  },
  {
    "orderNo": 2,
    "title": "天野と知念で中央の主導権を握れ",
    "description": "中盤で知念が守備の安定を担い、天野が攻撃を組み立てる。東京Vの中盤に自由な配球を許さず、ボール奪取から素早く攻撃へつなげる。",
    "result": "pending"
  },
  {
    "orderNo": 3,
    "title": "谷村への供給を増やし、決定機を作れ",
    "description": "谷村海那の動き出しを生かし、中央とサイドからゴール前へボールを供給する。直近2試合の無得点を打破するため、フィニッシュまでの人数と動きを増やす。",
    "result": "pending"
  }
];
