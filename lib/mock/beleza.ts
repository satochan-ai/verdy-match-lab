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

/**
 * 第2節 AC長野パルセイロ・レディース戦（Phase 6-N.1確認）。
 * 出典：WEリーグ公式 https://weleague.jp/matches/2026082925/ （ユーザー確認）。
 * 最終スコアと実キックオフのみユーザー確認済み。それ以外の試合経過（得点者・スタメン等）は
 * 未確認のため、このファイル内では推測で埋めていない（各項目のコメント参照）。
 */
export const belezaMatch = {
  id: "beleza-match-2",
  competition: "2026／27 SOMPO WEリーグ 第2節",
  /** fixture metadata統一表示用（大会名／節を分離）。既存のcompetition文字列は表示互換のため維持する。 */
  fixtureMeta: { competition: "2026/27 WEリーグ", roundLabel: "第2節" } satisfies FixtureMeta,
  dateLabel: "08.29 SAT",
  kickoffLabel: "18:00",
  kickoffAt: "2026-08-29T18:00:00+09:00",
  venue: "長野Uスタジアム",
  status: "finished" as const,
  homeTeamName: acNaganoTeam.name,
  awayTeamName: belezaTeam.name,
  /** ベレーザ視点の勝敗判定用（今節はAWAY）。 */
  isBelezaHome: false,
  homeScore: 1,
  awayScore: 4,
};

/**
 * 前半・後半のスコア推移。WEリーグ公式の試合経過が未確認のため、今節は未登録
 * （推測で埋めない）。
 */
export const belezaHalfScores: { firstHalf: string; secondHalf: string } | undefined = undefined;

/**
 * 得点記録。WEリーグ公式の試合経過（得点者・時間）が未確認のため、今節は未登録
 * （最終スコアAC長野 1-4 BELEZAの内訳を推測で埋めない）。
 */
export const belezaGoals: MatchGoal[] = [];

/**
 * WEリーグ公式試合記録。実キックオフのみユーザー確認済み。入場者数・天候・気温・湿度は
 * 未確認のため未登録（推測で埋めない）。
 */
export const belezaOfficialRecord: OfficialMatchRecord = {
  kickoff: "18:05",
  sourceUrl: "https://weleague.jp/matches/2026082925/",
};

/** MatchRecordのSOURCEリンク表示名（大会名がJ.LEAGUEではないため上書きする）。 */
export const belezaOfficialSourceLabel = "WE LEAGUE Official Match Record";

/** 警告・退場。WEリーグ公式の試合経過が未確認のため、今節は未登録。 */
export const belezaCards: MatchCard[] = [];

/** 交代記録。WEリーグ公式の試合経過が未確認のため、今節は未登録。 */
export const belezaSubstitutions: MatchSubstitution[] = [];

/**
 * 公式記録スタッツ（シュート・FK・CK）。WEリーグ公式ページの掲載スタッツが未確認のため、
 * 今節は未登録（undefinedのままMATCH STATSセクションを非表示にする）。
 */
export const belezaMatchStats: { beleza: { shots: number; freeKicks: number; corners: number }; opponent: { shots: number; freeKicks: number; corners: number } } | undefined = undefined;

/**
 * POST MATCH summary。最終スコア（AC長野 1-4 BELEZA）から確定できる範囲のみ記載する。
 * 開幕2連勝／首位／得失点差／順位等は公式順位表が未確認のため含めない。
 */
export const belezaPostMatchSummary =
  "アウェイでAC長野パルセイロ・レディースと対戦。4得点を挙げ、1-4で勝利した。第1節に続く勝利で勝点3を加えた。";

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
    homeScore: belezaMatch.homeScore,
    awayScore: belezaMatch.awayScore,
    result: "win",
  },
];

/**
 * 第2節終了後のNEXT 5（公式日程のみ）。AC長野戦はfinishedになったため一覧から外す。
 * 会場は公式サイトで確認できた場合のみ設定し、未確認の試合はvenueを省略する（推測で埋めない）。
 */
export const belezaUpcomingMatches: UpcomingFixture[] = [
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
