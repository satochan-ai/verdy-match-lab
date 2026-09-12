import type {
  ActualLineup,
  FixtureMeta,
  KeyPlayer,
  MatchCard,
  MatchGoal,
  MatchSubstitution,
  OfficialMatchRecord,
  PredictedLineup,
  Team,
  UpcomingFixture,
} from "@/types/domain";

/**
 * 日テレ・東京ヴェルディベレーザ（WEリーグ）専用の軽量データ。
 * トップチーム用のMatch型・matches.tsとは意図的に分離する
 * （ベレーザは今回、軍師の三策・LIVE・POST等のフル機能を持たないため、
 * トップチームのデータ構造に無理に載せない）。
 *
 * 各定数（belezaMatch・belezaGoals等）は「現在表示中の1試合」のスナップショットとして
 * 節ごとに上書きする設計（詳細は都度置き換え、今季の履歴はbelezaSeasonHistoryにのみ蓄積する）。
 */

export const belezaTeam: Team = {
  id: "beleza",
  name: "日テレ・東京ヴェルディベレーザ",
  isVerdy: true,
};

/** 第2節 対戦相手（Phase 6-N.1確認）。 */
export const acNaganoTeam: Team = {
  id: "ac-nagano",
  name: "AC長野パルセイロ・レディース",
  isVerdy: false,
};

/** 第3節 対戦相手。 */
export const urawaTeam: Team = {
  id: "urawa-reds-ladies",
  name: "三菱重工浦和レッズレディース",
  isVerdy: false,
};

/**
 * INAC神戸レオネッサ（2026/27 WEリーグ クラシエカップ リーグステージ第1節 対戦相手）。
 */
export const inacKobeTeam: Team = {
  id: "inac-kobe",
  name: "INAC神戸レオネッサ",
  isVerdy: false,
};

/**
 * === クラシエカップ リーグステージ第1節（INAC神戸レオネッサ戦）：現在表示中の1試合 ===
 * IDは既存のNEXT5エントリ「beleza-next-3」をそのまま再利用する（重複作成しない）。
 * WEリーグ公式試合記録（2026/9/12）に基づき、結果を確定登録する。
 */
export const belezaMatch = {
  id: "beleza-next-3",
  competition: "2026/27 WEリーグ クラシエカップ リーグステージ第1節",
  fixtureMeta: {
    competition: "2026/27 WEリーグ クラシエカップ",
    stage: "リーグステージ",
    roundLabel: "第1節",
  } satisfies FixtureMeta,
  dateLabel: "09.12 SAT",
  kickoffLabel: "18:00",
  kickoffAt: "2026-09-12T18:00:00+09:00",
  venue: "味の素フィールド西が丘",
  status: "finished" as const,
  homeTeamName: belezaTeam.name,
  awayTeamName: inacKobeTeam.name,
  /** ベレーザ視点の勝敗判定用（今節はHOME）。 */
  isBelezaHome: true,
  homeScore: 3,
  awayScore: 2,
};

export const belezaHalfScores = { firstHalf: "1-2", secondHalf: "2-0" };
export const belezaGoals: MatchGoal[] = [
  { minute: "3'", scorer: "山本 摩也", team: inacKobeTeam.name },
  { minute: "7'", scorer: "久保田 真生", team: inacKobeTeam.name },
  { minute: "45+2'", scorer: "須長 穂乃果", team: belezaTeam.name },
  { minute: "55'", scorer: "式田 和", team: belezaTeam.name },
  { minute: "87'", scorer: "土光 真代", team: belezaTeam.name },
];
export const belezaCards: MatchCard[] = [
  { minute: "18'", player: "箕輪 千慧", team: inacKobeTeam.name, type: "yellow" },
];
export const belezaSubstitutions: MatchSubstitution[] = [
  { minute: "46'", team: belezaTeam.name, playerOut: "伊藤 琴音", playerIn: "式田 和" },
  { minute: "59'", team: inacKobeTeam.name, playerOut: "箕輪 千慧", playerIn: "大田 ありす" },
  { minute: "59'", team: inacKobeTeam.name, playerOut: "髙瀬 愛実", playerIn: "道上 彩花" },
  { minute: "59'", team: belezaTeam.name, playerOut: "安藤 梢", playerIn: "樋渡 百花" },
  { minute: "62'", team: inacKobeTeam.name, playerOut: "山本 摩也", playerIn: "中平 怜那" },
  { minute: "79'", team: belezaTeam.name, playerOut: "猶本 光", playerIn: "土光 真代" },
  { minute: "79'", team: inacKobeTeam.name, playerOut: "金月 夏萌", playerIn: "北村 礼" },
  { minute: "90+3'", team: belezaTeam.name, playerOut: "氏原 里穂菜", playerIn: "ダネル タン" },
];
export const belezaMatchStats: { beleza: { shots: number; freeKicks: number; corners: number }; opponent: { shots: number; freeKicks: number; corners: number } } | undefined = undefined;
export const belezaOfficialRecord: OfficialMatchRecord = {
  kickoff: "18:04", attendance: 2086, weather: "雨のち曇", temperature: "22.8℃", humidity: "80%",
  sourceUrl: "https://weleague.jp/matches/2026091224/",
};
export const belezaOfficialSourceLabel = "WE LEAGUE Official Match Record";
export const belezaPostMatchSummary = "";

/**
 * BELEZA 公式スタメン・ベンチ・フォーメーション（ユーザー提供、公式結果ページ確認済み）。
 * 出典：https://www.verdy.co.jp/beleza/match/info/12026091224/result
 */
export const belezaActualLineup: ActualLineup = {
  formation: "3-4-2-1",
  starters: {
    GK: ["1 野田 にな"],
    DF: ["32 松岡 瑛茉", "3 村松 智子", "5 松田 紫野"],
    MF: ["6 隅田 凜", "35 須長 穂乃果", "7 北村 菜々美", "24 伊藤 琴音", "13 氏原 里穂菜", "8 猶本 光"],
    FW: ["40 安藤 梢"],
  },
  bench: {
    GK: ["21 水口 茉優"],
    DF: ["4 土光 真代", "22 井手 ひなた"],
    MF: [],
    FW: ["11 樋渡 百花", "25 ダネル タン", "38 式田 和"],
  },
};

/**
 * BELEZAクラシエカップ第1節の実際の並び。3-4-2-1のフォーメーション図表示に用いる。
 * startersはFormationPitchが要求する順序（GK → DF3 → MF4 → シャドー2 → FW1）。
 * 画面左→右の並びは公式開始時画像で確認できていないため、ユーザー提供リストの記載順を
 * そのまま用いる（推測での左右入れ替えはしない）。選手11名・背番号・氏名・formationは
 * belezaActualLineupと一致させ、変更しない。
 */
export const belezaActualFormation: PredictedLineup = {
  formation: "3-4-2-1",
  starters: [
    { number: 1, name: "野田 にな", position: "GK" },
    { number: 32, name: "松岡 瑛茉", position: "DF" },
    { number: 3, name: "村松 智子", position: "DF" },
    { number: 5, name: "松田 紫野", position: "DF" },
    { number: 6, name: "隅田 凜", position: "MF" },
    { number: 35, name: "須長 穂乃果", position: "MF" },
    { number: 7, name: "北村 菜々美", position: "MF" },
    { number: 24, name: "伊藤 琴音", position: "MF" },
    { number: 13, name: "氏原 里穂菜", position: "MF" },
    { number: 8, name: "猶本 光", position: "MF" },
    { number: 40, name: "安藤 梢", position: "FW" },
  ],
};

/**
 * INAC神戸レオネッサ 公式スタメン・ベンチ（ユーザー提供、公式結果ページ確認済み）。
 * ポジション区分（GK/DF/MF/FW）だけを根拠に4-3-3と断定できないため、開始時フォーメーションは
 * 公式開始時画像等で別途確認できるまで未設定とする（formationはActualLineupのoptional項目）。
 */
export const inacKobeActualLineup: ActualLineup = {
  starters: {
    GK: ["1 田中 桃子"],
    DF: ["22 万力 安純", "30 松浦 加奈", "5 三宅 史織", "18 金月 夏萌"],
    MF: ["8 山本 摩也", "25 大熊 環", "40 岸田 優花"],
    FW: ["17 箕輪 千慧", "11 髙瀬 愛実", "19 久保田 真生"],
  },
  bench: {
    GK: ["99 船田 麻友"],
    DF: ["44 北村 礼", "15 松尾 菜月"],
    MF: ["35 榊 愛花", "20 大田 ありす"],
    FW: ["39 中平 怜那", "16 道上 彩花"],
  },
};

/**
 * === 第3節（三菱重工浦和レッズレディース戦）アーカイブ ===
 * クラシエカップ第1節（INAC神戸戦）が新たな「現在表示中の1試合」スナップショットに
 * なったため、このファイルの他の定数群（belezaMatch等）から本節のデータを退避する。
 * belezaMatch1／belezaMatch2の archive と同じ方針：値は変更せず、名称にMatch3サフィックス
 * を付けて保持する。詳細ページ（/beleza/matches/[id]）はbelezaMatchの1件のみを描画する
 * 設計のため、本節の詳細URL（beleza-match-3）は退避後は到達不能になる（既知の制約）。
 */
export const belezaMatch3 = {
  id: "beleza-match-3",
  competition: "2026／27 SOMPO WEリーグ 第3節",
  fixtureMeta: { competition: "2026/27 WEリーグ", roundLabel: "第3節" } satisfies FixtureMeta,
  dateLabel: "09.05 SAT",
  kickoffLabel: "18:05",
  kickoffAt: "2026-09-05T18:05:00+09:00",
  venue: "浦和駒場スタジアム",
  status: "finished" as const,
  homeTeamName: urawaTeam.name,
  awayTeamName: belezaTeam.name,
  isBelezaHome: false,
  homeScore: 3,
  awayScore: 1,
};

export const belezaMatch3HalfScores = {
  firstHalf: "3-1",
  secondHalf: "0-0",
};

export const belezaMatch3Goals: MatchGoal[] = [
  { minute: "4'", scorer: "榊原 琴乃", team: urawaTeam.name },
  { minute: "28'", scorer: "大西 若菜", team: urawaTeam.name },
  { minute: "37'", scorer: "伊藤 美紀", team: urawaTeam.name },
  { minute: "39'", scorer: "氏原 里穂菜", team: belezaTeam.name },
];

export const belezaMatch3OfficialRecord: OfficialMatchRecord = {
  kickoff: "18:05",
  attendance: 2770,
  weather: "晴",
  temperature: "24.4℃",
  sourceUrl: "https://www.verdy.co.jp/beleza/match/info/12026090516/result",
};

export const belezaMatch3Cards: MatchCard[] = [];

export const belezaMatch3Substitutions: MatchSubstitution[] = [
  { minute: "31'", team: belezaTeam.name, playerOut: "井手 ひなた", playerIn: "諸田 彩渚" },
  { minute: "46'", team: belezaTeam.name, playerOut: "安藤 梢", playerIn: "猶本 光" },
  { minute: "64'", team: belezaTeam.name, playerOut: "須長 穂乃果", playerIn: "伊藤 琴音" },
  { minute: "64'", team: belezaTeam.name, playerOut: "北村 菜々美", playerIn: "式田 和" },
  { minute: "81'", team: belezaTeam.name, playerOut: "氏原 里穂菜", playerIn: "樋渡 百花" },
  { minute: "46'", team: urawaTeam.name, playerOut: "サンシャイン フォンテス", playerIn: "川船 暁海" },
  { minute: "67'", team: urawaTeam.name, playerOut: "大西 若菜", playerIn: "丹野 凜々香" },
  { minute: "76'", team: urawaTeam.name, playerOut: "加藤 千佳", playerIn: "柴田 華絵" },
  { minute: "89'", team: urawaTeam.name, playerOut: "櫻井 まどか", playerIn: "エスタ マイ キス" },
  { minute: "89'", team: urawaTeam.name, playerOut: "伊藤 美紀", playerIn: "高塚 映奈" },
];

export const belezaMatch3Stats = {
  beleza: { shots: 8, freeKicks: 11, corners: 6 },
  opponent: { shots: 12, freeKicks: 5, corners: 6 },
};

export const belezaMatch3ActualLineup: ActualLineup = {
  starters: {
    GK: ["1 野田 にな"],
    DF: ["22 井手 ひなた", "32 松岡 瑛茉", "3 村松 智子", "5 松田 紫野"],
    MF: ["6 隅田 凜", "35 須長 穂乃果", "7 北村 菜々美", "19 塩越 柚歩"],
    FW: ["13 氏原 里穂菜", "40 安藤 梢"],
  },
  bench: {
    GK: ["21 水口 茉優"],
    DF: ["43 諸田 彩渚"],
    MF: ["8 猶本 光"],
    FW: ["11 樋渡 百花", "20 小林 里歌子", "24 伊藤 琴音", "38 式田 和"],
  },
};

/** 三菱重工浦和レッズレディース 公式スタメン・ベンチ（公式結果ページで確認済み）。 */
export const urawaActualLineup: ActualLineup = {
  starters: {
    GK: ["1 池田 咲紀子"],
    DF: ["28 櫻井 まどか", "7 高橋 はな", "13 長嶋 玲奈", "30 長尾 ののか"],
    MF: ["14 菊池 まりあ", "8 榊原 琴乃", "6 加藤 千佳", "5 伊藤 美紀", "16 大西 若菜"],
    FW: ["19 サンシャイン フォンテス"],
  },
  bench: {
    GK: ["12 福田 史織"],
    DF: ["2 エスタ マイ キス"],
    MF: ["18 柴田 華絵", "20 高塚 映奈", "21 タンチュリエ ローリー", "26 丹野 凜々香"],
    FW: ["11 川船 暁海"],
  },
};

/**
 * 第3節の開始時formationはユーザー確認済み（ベレーザ4-2-3-1／浦和4-1-4-1）。
 * belezaMatch3ActualLineup/urawaActualLineup（GK/DF/MF/FWのポジション区分）だけでは
 * 4-2-3-1のボランチ2/前3や4-1-4-1のアンカー1/中盤4の行分割を表現できないため、
 * FormationPitchが要求する行順（GK→…→FW、各行内は左→右）でstartersを組み直す。
 * ベレーザの役割分け（ボランチ：隅田・須長／前3：北村・塩越・氏原／ストライカー：安藤）は
 * 同一チームの既存前例（belezaMatch2ActualFormation、第2節AC長野戦アーカイブ）と
 * 同じ選手ロールをユーザー確認のうえ踏襲。浦和のアンカー（菊池 まりあ）はユーザー確認済み。
 * 左右の並びは登録済みポジション区分の順序をそのまま使用し、後日ユーザー調整可能。
 */
export const belezaMatch3ActualFormation: PredictedLineup | undefined = {
  formation: "4-2-3-1",
  starters: [
    { number: 1, name: "野田 にな", position: "GK" },
    { number: 22, name: "井手 ひなた", position: "DF" },
    { number: 32, name: "松岡 瑛茉", position: "DF" },
    { number: 3, name: "村松 智子", position: "DF" },
    { number: 5, name: "松田 紫野", position: "DF" },
    { number: 6, name: "隅田 凜", position: "MF" },
    { number: 35, name: "須長 穂乃果", position: "MF" },
    { number: 7, name: "北村 菜々美", position: "MF" },
    { number: 19, name: "塩越 柚歩", position: "MF" },
    { number: 13, name: "氏原 里穂菜", position: "MF" },
    { number: 40, name: "安藤 梢", position: "FW" },
  ],
};

export const urawaActualFormation: PredictedLineup | undefined = {
  formation: "4-1-4-1",
  starters: [
    { number: 1, name: "池田 咲紀子", position: "GK" },
    { number: 28, name: "櫻井 まどか", position: "DF" },
    { number: 7, name: "高橋 はな", position: "DF" },
    { number: 13, name: "長嶋 玲奈", position: "DF" },
    { number: 30, name: "長尾 ののか", position: "DF" },
    { number: 14, name: "菊池 まりあ", position: "MF" },
    { number: 8, name: "榊原 琴乃", position: "MF" },
    { number: 6, name: "加藤 千佳", position: "MF" },
    { number: 5, name: "伊藤 美紀", position: "MF" },
    { number: 16, name: "大西 若菜", position: "MF" },
    { number: 19, name: "サンシャイン フォンテス", position: "FW" },
  ],
};

export const belezaMatch3PostMatchSummary =
  "アウェイで三菱重工浦和レッズレディースと対戦。前半に3失点を許したが、39分に氏原里穂菜がゴールを返した。後半は無得点で終わり、1-3で敗れた。";

/**
 * === 第2節（AC長野パルセイロ・レディース戦）アーカイブ ===
 * このファイルの他の定数は「現在表示中の1試合」のスナップショットとして節ごとに
 * 上書きされるため、第3節への更新でページ上には表示されなくなる。この節では、
 * 第2節でPhase 6-N.1c等にて公式確認済みだった詳細記録を、確認済み事実として
 * 消去せずここに保持する（BELEZAページからは参照しない）。
 */
export const belezaMatch2 = {
  id: "beleza-match-2",
  competition: "2026／27 SOMPO WEリーグ 第2節",
  fixtureMeta: { competition: "2026/27 WEリーグ", roundLabel: "第2節" } satisfies FixtureMeta,
  dateLabel: "08.29 SAT",
  kickoffLabel: "18:00",
  kickoffAt: "2026-08-29T18:00:00+09:00",
  venue: "長野Uスタジアム",
  status: "finished" as const,
  homeTeamName: acNaganoTeam.name,
  awayTeamName: belezaTeam.name,
  isBelezaHome: false,
  homeScore: 1,
  awayScore: 4,
};

export const belezaMatch2HalfScores = {
  firstHalf: "1-1",
  secondHalf: "0-3",
};

export const belezaMatch2Goals: MatchGoal[] = [
  { minute: "27'", scorer: "隅田 凜", team: belezaTeam.name },
  { minute: "34'", scorer: "吉野 真央", team: acNaganoTeam.name },
  { minute: "59'", scorer: "北村 菜々美", team: belezaTeam.name },
  { minute: "67'", scorer: "式田 和", team: belezaTeam.name },
  { minute: "86'", scorer: "北村 菜々美", team: belezaTeam.name },
];

export const belezaMatch2OfficialRecord: OfficialMatchRecord = {
  kickoff: "18:03",
  attendance: 1319,
  weather: "曇",
  temperature: "21.5℃",
  humidity: "94%",
  sourceUrl: "https://weleague.jp/matches/2026082925/",
};

export const belezaMatch2Cards: MatchCard[] = [];

export const belezaMatch2Substitutions: MatchSubstitution[] = [
  { minute: "65'", team: acNaganoTeam.name, playerOut: "久保田 明未", playerIn: "濱田 優音" },
  { minute: "65'", team: acNaganoTeam.name, playerOut: "三谷 沙也加", playerIn: "松浦 芽育子" },
  { minute: "76'", team: acNaganoTeam.name, playerOut: "塩谷 瑠南", playerIn: "北川 愛莉" },
  { minute: "83'", team: acNaganoTeam.name, playerOut: "知久 奈菜穂", playerIn: "松岡 優空" },
  { minute: "83'", team: acNaganoTeam.name, playerOut: "常田 麻友", playerIn: "町田 実香" },
  { minute: "66'", team: belezaTeam.name, playerOut: "松岡 瑛美", playerIn: "松田 紫野" },
  { minute: "66'", team: belezaTeam.name, playerOut: "氏原 里穂菜", playerIn: "式田 和" },
  { minute: "66'", team: belezaTeam.name, playerOut: "小林 里歌子", playerIn: "猶本 光" },
  { minute: "75'", team: belezaTeam.name, playerOut: "須長 穂乃果", playerIn: "諸田 彩渚" },
  { minute: "81'", team: belezaTeam.name, playerOut: "井手 ひなた", playerIn: "安藤 梢" },
];

export const belezaMatch2Stats = {
  beleza: { shots: 14, freeKicks: 7, corners: 5 },
  opponent: { shots: 3, freeKicks: 4, corners: 1 },
};

export const belezaMatch2ActualLineup: ActualLineup = {
  starters: {
    GK: ["1 野田 にな"],
    DF: ["22 井手 ひなた", "4 土光 真代", "3 村松 智子", "32 松岡 瑛美"],
    MF: ["6 隅田 凜", "35 須長 穂乃果", "7 北村 菜々美", "19 塩越 柚歩", "13 氏原 里穂菜"],
    FW: ["20 小林 里歌子"],
  },
  bench: {
    GK: ["21 水口 茉優"],
    DF: ["5 松田 紫野"],
    MF: ["8 猶本 光"],
    FW: ["25 ダネル タン", "38 式田 和", "40 安藤 梢", "43 諸田 彩渚"],
  },
};

export const belezaMatch2ActualFormation: PredictedLineup = {
  formation: "4-2-3-1",
  starters: [
    { number: 1, name: "野田 にな", position: "GK" },
    { number: 32, name: "松岡 瑛美", position: "DF" },
    { number: 3, name: "村松 智子", position: "DF" },
    { number: 4, name: "土光 真代", position: "DF" },
    { number: 22, name: "井手 ひなた", position: "DF" },
    { number: 6, name: "隅田 凜", position: "MF" },
    { number: 35, name: "須長 穂乃果", position: "MF" },
    { number: 13, name: "氏原 里穂菜", position: "MF" },
    { number: 19, name: "塩越 柚歩", position: "MF" },
    { number: 7, name: "北村 菜々美", position: "MF" },
    { number: 20, name: "小林 里歌子", position: "FW" },
  ],
};

/** AC長野パルセイロ・レディース 公式スタメン・ベンチ（Phase 6-N.1c確認）。formationは未確認のため設定しない。 */
export const acNaganoActualLineup: ActualLineup = {
  starters: {
    GK: ["21 垣内 愛菜"],
    DF: ["34 鈴木 こなつ", "5 橘 麗衣", "25 奥川 千沙", "3 久保田 明未"],
    MF: ["7 三谷 沙也加", "27 籔島 彩佳", "6 常田 麻友", "15 知久 奈菜穂", "14 塩谷 瑠南"],
    FW: ["33 吉野 真央"],
  },
  bench: {
    GK: ["1 梅村 真央"],
    DF: ["18 町田 実香", "22 児玉 一穂"],
    MF: ["23 松浦 芽育子"],
    FW: ["10 北川 愛莉", "20 松岡 優空", "35 濱田 優音"],
  },
};

export const acNaganoActualFormation: PredictedLineup = {
  formation: "4-2-3-1",
  starters: [
    { number: 21, name: "垣内 愛菜", position: "GK" },
    { number: 3, name: "久保田 明未", position: "DF" },
    { number: 25, name: "奥川 千沙", position: "DF" },
    { number: 5, name: "橘 麗衣", position: "DF" },
    { number: 34, name: "鈴木 こなつ", position: "DF" },
    { number: 27, name: "籔島 彩佳", position: "MF" },
    { number: 7, name: "三谷 沙也加", position: "MF" },
    { number: 14, name: "塩谷 瑠南", position: "MF" },
    { number: 15, name: "知久 奈菜穂", position: "MF" },
    { number: 6, name: "常田 麻友", position: "MF" },
    { number: 33, name: "吉野 真央", position: "FW" },
  ],
};

export const belezaMatch2PostMatchSummary =
  "アウェイでAC長野パルセイロ・レディースと対戦。27分に隅田凜のゴールで先制し、一度は同点とされたものの、後半に北村菜々美が2得点、式田和が1得点を挙げ、1-4で勝利した。";

/**
 * === 第1節（ジェフ千葉レディース戦）アーカイブ ===
 * このファイルの他の定数は「現在表示中の1試合」のスナップショットとして節ごとに
 * 上書きされるため、第2節への更新でページ上には表示されなくなる。この節では、
 * 第1節でPhase 6-H／6-Jにて公式確認済みだった詳細記録（得点者・スタメン・ベンチ・
 * 交代・カード・スタッツ・入場者数等）を、確認済み事実として消去せずここに保持する。
 * BELEZAページからは参照しない（アーカイブ専用ページが存在しないため未使用importとなるが、
 * データそのものは意図的に残している）。
 */
export const jefChibaLadiesTeam: Team = {
  id: "jef-chiba-ladies",
  name: "ジェフユナイテッド市原・千葉レディース",
  isVerdy: false,
};

export const belezaMatch1 = {
  id: "beleza-match-1",
  competition: "2026／27 SOMPO WEリーグ 第1節",
  fixtureMeta: { competition: "2026/27 WEリーグ", roundLabel: "第1節" } satisfies FixtureMeta,
  dateLabel: "08.23 SUN",
  kickoffLabel: "18:00",
  kickoffAt: "2026-08-23T18:00:00+09:00",
  venue: "味の素フィールド西が丘",
  status: "finished" as const,
  homeScore: 2,
  awayScore: 1,
};

export const belezaMatch1HalfScores = {
  firstHalf: "1-1",
  secondHalf: "1-0",
};

export const belezaMatch1Goals: MatchGoal[] = [
  { minute: "10'", scorer: "井上 綾香", team: jefChibaLadiesTeam.name },
  { minute: "23'", scorer: "氏原 里穂菜", team: belezaTeam.name },
  { minute: "89'", scorer: "眞城 美春", team: belezaTeam.name },
];

export const belezaMatch1OfficialRecord: OfficialMatchRecord = {
  kickoff: "18:05",
  attendance: 2513,
  weather: "曇時々雨",
  temperature: "28.7℃",
  humidity: "73%",
  sourceUrl: "https://weleague.jp/matches/2026082305/",
};

export const belezaMatch1Cards: MatchCard[] = [
  { minute: "84'", player: "栗本 悠加", team: jefChibaLadiesTeam.name, type: "yellow" },
];

export const belezaMatch1Substitutions: MatchSubstitution[] = [
  { minute: "60'", team: belezaTeam.name, playerIn: "猶本 光", playerOut: "小林 里歌子" },
  { minute: "60'", team: belezaTeam.name, playerIn: "北村 菜々美", playerOut: "松永 未夢" },
  { minute: "81'", team: belezaTeam.name, playerIn: "松田 紫野", playerOut: "朝生 珠実" },
  { minute: "81'", team: belezaTeam.name, playerIn: "武田 和", playerOut: "氏原 里穂菜" },
  { minute: "90+1'", team: belezaTeam.name, playerIn: "安藤 梢", playerOut: "眞城 美春" },
  { minute: "37'", team: jefChibaLadiesTeam.name, playerIn: "正野 瑠菜", playerOut: "曽根 七海" },
  { minute: "70'", team: jefChibaLadiesTeam.name, playerIn: "田中 真理子", playerOut: "鈴木 菫" },
  { minute: "70'", team: jefChibaLadiesTeam.name, playerIn: "栗本 悠加", playerOut: "角谷 瑠菜" },
  { minute: "70'", team: jefChibaLadiesTeam.name, playerIn: "エラ ジョンソン", playerOut: "林 香奈絵" },
];

export const belezaMatch1Stats = {
  beleza: { shots: 10, freeKicks: 7, corners: 4 },
  opponent: { shots: 11, freeKicks: 8, corners: 2 },
};

export const belezaMatch1PredictedLineup: PredictedLineup = {
  formation: "4-2-3-1",
  starters: [
    { number: 1, name: "野田 にな", position: "GK" },
    { number: 5, name: "松田 紫野", position: "DF" },
    { number: 3, name: "村松 智子", position: "DF" },
    { number: 2, name: "青木 夕菜", position: "DF" },
    { number: 4, name: "土光 真代", position: "DF", alternative: "井手 ひなた" },
    { number: 14, name: "眞城 美春", position: "MF" },
    { number: 6, name: "隅田 凜", position: "MF" },
    { number: 20, name: "小林 里歌子", position: "MF" },
    { number: 19, name: "塩越 柚歩", position: "MF" },
    { number: 18, name: "松永 未夢", position: "MF" },
    { number: 11, name: "樋渡 百花", position: "FW" },
  ],
};

export const belezaMatch1KeyPlayers: KeyPlayer[] = [
  { name: "6 隅田 凜", note: "MF／中盤の基準点。ボール回収、配球、攻守の切り替えに注目。" },
  { name: "14 眞城 美春", note: "MF／ダブルボランチ。前進への関与、隅田との距離感、攻撃参加に注目。" },
  { name: "19 塩越 柚歩", note: "AM／2列目中央。ライン間での受け方、ラストパス、ゴール前への関与に注目。" },
  { name: "11 樋渡 百花", note: "FW／1トップ。前線での起点、裏への動き、フィニッシュに注目。" },
];

export const belezaMatch1OfficialLineup: PredictedLineup = {
  formation: "4-2-3-1",
  starters: [
    { number: 1, name: "野田 にな", position: "GK" },
    { number: 17, name: "朝生 珠実", position: "DF" },
    { number: 3, name: "村松 智子", position: "DF" },
    { number: 2, name: "青木 夕菜", position: "DF" },
    { number: 4, name: "土光 真代", position: "DF" },
    { number: 14, name: "眞城 美春", position: "MF" },
    { number: 6, name: "隅田 凜", position: "MF" },
    { number: 13, name: "氏原 里穂菜", position: "MF" },
    { number: 19, name: "塩越 柚歩", position: "MF" },
    { number: 18, name: "松永 未夢", position: "MF" },
    { number: 20, name: "小林 里歌子", position: "FW" },
  ],
};

export const belezaMatch1OfficialBench: string[] = [
  "21 水口 茉優",
  "5 松田 紫野",
  "22 井手 ひなた",
  "7 北村 菜々美",
  "8 猶本 光",
  "30 武田 和",
  "40 安藤 梢",
];

export const jefChibaLadiesOfficialLineup: PredictedLineup = {
  formation: "4-4-2",
  starters: [
    { number: 1, name: "清水 美紅", position: "GK" },
    { number: 99, name: "鈴木 菫", position: "DF" },
    { number: 4, name: "林 香奈絵", position: "DF" },
    { number: 3, name: "石田 菜々海", position: "DF" },
    { number: 17, name: "山口 千尋", position: "DF" },
    { number: 18, name: "稲山 美優", position: "MF" },
    { number: 19, name: "曽根 七海", position: "MF" },
    { number: 14, name: "植本 愛実", position: "MF" },
    { number: 13, name: "角谷 瑠菜", position: "MF" },
    { number: 9, name: "井上 綾香", position: "FW" },
    { number: 10, name: "小川 由姫", position: "FW" },
  ],
};

export const jefChibaLadiesOfficialBench: string[] = [
  "30 足立 橙",
  "5 田中 真理子",
  "16 エラ ジョンソン",
  "20 正野 瑠菜",
  "36 栗本 悠加",
  "47 小久保 まい",
  "84 北沢 明未",
];

export const belezaMatch1UnavailablePlayers: string[] = ["10 MF 菅野 奏音", "16 DF 本多 桃華"];

export const belezaMatch1U20Note =
  "青木夕菜・朝生珠実・眞城美春・松永未夢は、開幕戦後にU-20日本女子代表活動へ参加予定。";

export const belezaMatch1PreNote =
  "日テレ・東京ヴェルディベレーザは8/23、WEリーグ開幕戦でジェフ千葉レディースと対戦。予想スタメンは登録選手や直近の起用実績、開幕戦に向けた選手構成を基に作成。4-2-3-1を予想し、中盤の隅田凜・眞城美春、2列目の塩越柚歩、1トップの樋渡百花を中心に注目する。";

export const jefChibaLadiesNotes = [
  "元ベレーザGKの清水美紅が今季加入。",
  "開幕戦のため新体制の配置・起用はまだ読みづらい。",
  "ベレーザ側はまず自分たちの立ち位置・選手構成を見る試合。",
];

export type BelezaMatchResult = "win" | "draw" | "loss";

export interface BelezaSeasonHistoryEntry {
  id: string;
  dateLabel: string;
  round: string;
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
  /** ベレーザから見た結果。 */
  result: BelezaMatchResult;
}

/**
 * 2026/27シーズンのベレーザ試合履歴。今季の試合のみを蓄積する（過去シーズンは混ぜない）。
 * 各試合の得点・スタメン等の詳細はbelezaMatch等のスナップショットが次節データで上書きされるため、
 * このリストが今季の確定結果を保持する唯一の記録になる。
 */
export const belezaSeasonHistory: BelezaSeasonHistoryEntry[] = [
  {
    id: "beleza-match-1",
    dateLabel: "08.23",
    round: "第1節",
    homeTeamName: "日テレ・東京ヴェルディベレーザ",
    awayTeamName: "ジェフユナイテッド市原・千葉レディース",
    homeScore: 2,
    awayScore: 1,
    result: "win",
  },
  {
    id: "beleza-match-2",
    dateLabel: "08.29",
    round: "第2節",
    homeTeamName: acNaganoTeam.name,
    awayTeamName: belezaTeam.name,
    /** 確定結果を固定値として保持する（次節以降のbelezaMatch更新で変わらないようにする）。 */
    homeScore: 1,
    awayScore: 4,
    result: "win",
  },
  {
    id: "beleza-match-3",
    dateLabel: "09.05",
    round: "第3節",
    homeTeamName: urawaTeam.name,
    awayTeamName: belezaTeam.name,
    /** 確定結果を固定値として保持する（次節以降のbelezaMatch更新で変わらないようにする）。 */
    homeScore: 3,
    awayScore: 1,
    result: "loss",
  },
];

/**
 * 第3節終了後のNEXT 5（公式日程のみ）。浦和戦はfinishedになったため一覧から外す。
 * クラシエカップ第1節（INAC神戸戦）はbelezaMatch（現在表示中の1試合）へ昇格したため、
 * 重複登録を避けるためこの一覧からは外す。
 * WEリーグとクラシエカップを大会横断で開催日時の早い順に並べる。
 * 会場は公式日程で確認できた場合のみ設定する（推測で埋めない）。
 */
export const belezaUpcomingMatches: UpcomingFixture[] = [
  {
    id: "beleza-next-4",
    dateLabel: "09.19 SAT",
    kickoffLabel: "16:00",
    fixtureMeta: {
      competition: "2026/27 WEリーグ クラシエカップ",
      stage: "リーグステージ",
      roundLabel: "第2節",
    },
    isHome: false,
    opponentName: "ちふれASエルフェン埼玉",
    venue: "熊谷スポーツ文化公園陸上競技場",
  },
  {
    id: "beleza-next-5",
    dateLabel: "09.23 WED",
    kickoffLabel: "14:00",
    fixtureMeta: {
      competition: "2026/27 WEリーグ クラシエカップ",
      stage: "リーグステージ",
      roundLabel: "第3節",
    },
    isHome: true,
    opponentName: "アルビレックス新潟レディース",
    venue: "多摩市立陸上競技場",
  },
  {
    id: "beleza-next-6",
    dateLabel: "09.27 SUN",
    kickoffLabel: "18:00",
    fixtureMeta: {
      competition: "2026/27 WEリーグ クラシエカップ",
      stage: "リーグステージ",
      roundLabel: "第4節",
    },
    isHome: false,
    opponentName: "セレッソ大阪ヤンマーレディース",
    venue: "YANMAR HANASAKA STADIUM",
  },
];
