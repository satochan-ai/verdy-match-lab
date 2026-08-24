import type {
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
 * 日テレ・東京ヴェルディベレーザ（WEリーグ）専用の軽量PREデータ。
 * トップチーム用のMatch型・matches.tsとは意図的に分離する
 * （ベレーザは今回、軍師の三策・LIVE・POST等のフル機能を持たないため、
 * トップチームのデータ構造に無理に載せない）。
 * 出典：https://www.verdy.co.jp/beleza/match/ 、 https://www.verdy.co.jp/beleza/team/ 他（Phase 6-H調査）。
 */

export const belezaTeam: Team = {
  id: "beleza",
  name: "日テレ・東京ヴェルディベレーザ",
  isVerdy: true,
};

export const jefChibaLadiesTeam: Team = {
  id: "jef-chiba-ladies",
  name: "ジェフユナイテッド市原・千葉レディース",
  isVerdy: false,
};

/**
 * 公式確定結果（Phase 6-H.16確認）。ベレーザ 2-1 ジェフ千葉レディースでBELEZA WIN。
 * id/kickoffAtはPhase 6-J.1でPRE/LIVE/POST判定（resolveMatchStatus）・LIVE Score/Noteの
 * localStorageキーとして追加。次節以降はstatusを"scheduled"に更新するだけで
 * キックオフ後に自動でLIVE状態へ切り替わる汎用設計にする（開幕戦は既にfinishedのため
 * kickoffAtの値自体は表示へ影響しない）。
 */
export const belezaMatch = {
  id: "beleza-match-1",
  competition: "2026／27 SOMPO WEリーグ 第1節",
  /** fixture metadata統一表示用（大会名／節を分離）。既存のcompetition文字列は表示互換のため維持する。 */
  fixtureMeta: { competition: "2026/27 WEリーグ", roundLabel: "第1節" } satisfies FixtureMeta,
  dateLabel: "08.23 SUN",
  kickoffLabel: "18:00",
  kickoffAt: "2026-08-23T18:00:00+09:00",
  venue: "味の素フィールド西が丘",
  status: "finished" as const,
  homeScore: 2,
  awayScore: 1,
};

/** 前半・後半のスコア推移（公式確認済み）。 */
export const belezaHalfScores = {
  firstHalf: "1-1",
  secondHalf: "1-0",
};

/** 得点記録（公式確認済み）。 */
export const belezaGoals: MatchGoal[] = [
  { minute: "10'", scorer: "井上 綾香", team: jefChibaLadiesTeam.name },
  { minute: "23'", scorer: "氏原 里穂菜", team: belezaTeam.name },
  { minute: "89'", scorer: "眞城 美春", team: belezaTeam.name },
];

/**
 * WEリーグ公式試合記録（Phase 6-H.16／6-H.17確認）。予定KO 18:00とは別に、
 * 実績のKick Off 18:05をofficialRecord側で保持する（予定と実績を混同しない）。
 * sourceUrlはユーザー確認済みのアドレスバーURLをそのまま使用（推測で埋めない）。
 */
export const belezaOfficialRecord: OfficialMatchRecord = {
  kickoff: "18:05",
  attendance: 2513,
  weather: "曇時々雨",
  temperature: "28.7℃",
  humidity: "73%",
  sourceUrl: "https://weleague.jp/matches/2026082305/",
};

/** MatchRecordのSOURCEリンク表示名（大会名がJ.LEAGUEではないため上書きする）。 */
export const belezaOfficialSourceLabel = "WE LEAGUE Official Match Record";

/** 警告・退場（公式確認済み）。ベレーザ側・退場は今回確認できるものなし。 */
export const belezaCards: MatchCard[] = [
  { minute: "84'", player: "栗本 悠加", team: jefChibaLadiesTeam.name, type: "yellow" },
];

/** 交代記録（公式確認済み）。 */
export const belezaSubstitutions: MatchSubstitution[] = [
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

/**
 * 公式記録で確認できたスタッツのみ（シュート・FK・CK）。
 * 支配率・パス成功率・走行距離等、未確認の項目は推測で追加しない。
 */
export const belezaMatchStats = {
  beleza: { shots: 10, freeKicks: 7, corners: 4 },
  opponent: { shots: 11, freeKicks: 8, corners: 2 },
};

/**
 * PREDICTED（公式未発表）。登録選手・これまでの起用傾向を基にした予想。
 * formationは直近公式戦の詳細が確認できなかったため、一般的傾向からの推測値。
 * DF/MF行の並びは「右から」のユーザー指定を左→右の配列順へ変換済み
 * （PredictedFormationは配列順=画面左→右で描画するため）。
 */
export const belezaPredictedLineup: PredictedLineup = {
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

export const belezaKeyPlayers: KeyPlayer[] = [
  { name: "6 隅田 凜", note: "MF／中盤の基準点。ボール回収、配球、攻守の切り替えに注目。" },
  { name: "14 眞城 美春", note: "MF／ダブルボランチ。前進への関与、隅田との距離感、攻撃参加に注目。" },
  { name: "19 塩越 柚歩", note: "AM／2列目中央。ライン間での受け方、ラストパス、ゴール前への関与に注目。" },
  { name: "11 樋渡 百花", note: "FW／1トップ。前線での起点、裏への動き、フィニッシュに注目。" },
];

/**
 * 開幕戦 公式スタメン（ベレーザ・actual）。PREDICTED LINEUPとは別物として扱い、上書きしない。
 * PredictedLineupと同形状のためFormationPitchをそのまま再利用する。
 * 配置はユーザー確認情報（公式発表画像）を正として採用。
 */
export const belezaOfficialLineup: PredictedLineup = {
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

/** 開幕戦 公式ベンチ（ベレーザ）。公式ページでポジション未照合のため背番号＋氏名のみ（推測でPosを付けない）。 */
export const belezaOfficialBench: string[] = [
  "21 水口 茉優",
  "5 松田 紫野",
  "22 井手 ひなた",
  "7 北村 菜々美",
  "8 猶本 光",
  "30 武田 和",
  "40 安藤 梢",
];

/**
 * 開幕戦 公式スタメン（ジェフユナイテッド市原・千葉レディース）。actual formation。
 * ユーザー確認済みの配置（4-4-2）をそのまま採用し、左右は入れ替えない。
 * DF：99 鈴木菫（左）／4 林香奈絵／3 石田菜々海／17 山口千尋（右）
 * MF：18 稲山美優（左サイド）／19 曽根七海（中央左）／14 植本愛実（中央右）／13 角谷瑠菜（右サイド）
 * FW：9 井上綾香（左）／10 小川由姫（右）
 */
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

/** 開幕戦 公式ベンチ（ジェフ千葉レディース）。公式ページでポジション未照合のため背番号＋氏名のみ。 */
export const jefChibaLadiesOfficialBench: string[] = [
  "30 足立 橙",
  "5 田中 真理子",
  "16 エラ ジョンソン",
  "20 正野 瑠菜",
  "36 栗本 悠加",
  "47 小久保 まい",
  "84 北沢 明未",
];

/**
 * 開幕戦の欠場予定選手（公式確認済み）。理由・復帰時期は未確定のため推測で追加しない。
 * 出典：東京ヴェルディ公式「日テレ・東京ヴェルディベレーザ 選手・スタッフ」https://www.verdy.co.jp/beleza/content/team/
 */
export const belezaUnavailablePlayers: string[] = ["10 MF 菅野 奏音", "16 DF 本多 桃華"];

/** U-20日本女子代表選出（公式確認済み）。開幕戦後に代表活動へ合流予定。欠場・出場不透明とは書かない。 */
export const belezaU20Note =
  "青木夕菜・朝生珠実・眞城美春・松永未夢は、開幕戦後にU-20日本女子代表活動へ参加予定。";

export const belezaPreNote =
  "日テレ・東京ヴェルディベレーザは8/23、WEリーグ開幕戦でジェフ千葉レディースと対戦。予想スタメンは登録選手や直近の起用実績、開幕戦に向けた選手構成を基に作成。4-2-3-1を予想し、中盤の隅田凜・眞城美春、2列目の塩越柚歩、1トップの樋渡百花を中心に注目する。";

/** ジェフ千葉L簡易情報。過剰分析はしない（最大3点）。 */
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
 * この開幕戦がRECENT 1として履歴の起点となる。
 */
export const belezaSeasonHistory: BelezaSeasonHistoryEntry[] = [
  {
    id: "beleza-match-1",
    dateLabel: "08.23",
    round: "第1節",
    homeTeamName: belezaTeam.name,
    awayTeamName: jefChibaLadiesTeam.name,
    homeScore: belezaMatch.homeScore,
    awayScore: belezaMatch.awayScore,
    result: "win",
  },
];

/**
 * 開幕戦終了後のNEXT 5（公式日程のみ）。会場は公式サイトで確認できた場合のみ設定し、
 * 未確認の試合はvenueを省略する（推測で埋めない）。
 */
export const belezaUpcomingMatches: UpcomingFixture[] = [
  {
    id: "beleza-next-1",
    dateLabel: "08.29 SAT",
    kickoffLabel: "18:00",
    fixtureMeta: { competition: "2026/27 WEリーグ", roundLabel: "第2節" },
    isHome: false,
    opponentName: "AC長野パルセイロ・レディース",
  },
  {
    id: "beleza-next-2",
    dateLabel: "09.05 SAT",
    kickoffLabel: "18:00",
    fixtureMeta: { competition: "2026/27 WEリーグ", roundLabel: "第3節" },
    isHome: false,
    opponentName: "三菱重工浦和レッズレディース",
  },
  {
    id: "beleza-next-3",
    dateLabel: "09.12 SAT",
    kickoffLabel: "18:00",
    fixtureMeta: {
      competition: "2026/27 WEリーグ クラシエカップ",
      stage: "リーグステージ",
      roundLabel: "第1節",
    },
    isHome: true,
    opponentName: "INAC神戸レオネッサ",
  },
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
  },
];
