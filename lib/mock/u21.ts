import type {
  FixtureMeta,
  MatchCard,
  MatchGoal,
  MatchStatus,
  MatchSubstitution,
  OfficialMatchRecord,
  UpcomingFixture,
} from "@/types/domain";

/**
 * 東京ヴェルディU-21（U-21 Jリーグ）専用の軽量データ。
 * トップチーム用のMatch型・matches.tsとは意図的に分離する
 * （U-21はpredicted XI・戦術分析等を一切持たず、公式記録のみを扱う方針のため）。
 * matchIdはトップチームのmatch-0〜match-7と衝突しない専用の命名を用いる。
 * 出典：https://www.jleague.jp/special/u-21/ 、 https://www.jleague.jp/u-21/ 他（Phase 6-I調査）。
 */
export const u21Match = {
  id: "u21-match-1",
  status: "finished" as MatchStatus,
  competition: "2026／27Ｕ-21Ｊリーグ 東西リーグラウンド EAST 第1節",
  /** fixture metadata統一表示用（大会名／ステージ／節を分離）。既存のcompetition文字列は表示互換のため維持する。 */
  fixtureMeta: {
    competition: "2026/27 U-21 Jリーグ",
    stage: "東西リーグラウンド",
    roundLabel: "第1節",
  } satisfies FixtureMeta,
  /**
   * 雷雨の影響により、東京ヴェルディ公式発表でキックオフが19:00へ変更された
   * （当初18:00）。19:03と表記するJリーグ公式アプリ画面も確認されたが、
   * 東京ヴェルディ公式の開催案内（19:00キックオフ）を予定時刻として採用していた。
   * 実際の公式Kick Offは、Jリーグ公式試合記録（officialRecord.kickoff）で
   * 確認できる19:04が正。予定19:00と実績19:04を混同しないよう、
   * kickoffAt/kickoffLabelは予定時刻の記録として残し、実績はofficialRecordに分離する。
   */
  kickoffAt: "2026-08-22T19:00:00+09:00",
  kickoffLabel: "19:00",
  scheduleNote: "雷雨の影響により、キックオフ時刻が19:00に変更されました。",
  venue: "味の素フィールド西が丘",
  homeTeamName: "東京ヴェルディU-21",
  awayTeamName: "FC東京U-21",
  homeScore: 0,
  awayScore: 3,
};

/**
 * 公式試合記録（J.LEAGUE Official Match Record）で確認できた事実のみを登録する。
 * 出典：https://www.jleague.jp/match/u-21/2026/082229/（Phase 6-I.4確認）。
 */
export const u21OfficialRecord: OfficialMatchRecord = {
  kickoff: "19:04",
  attendance: 1606,
  weather: "雨のち曇",
  temperature: "27.9℃",
  humidity: "90%",
  sourceUrl: "https://www.jleague.jp/match/u-21/2026/082229/",
};

export const u21Goals: MatchGoal[] = [
  { minute: "10'", scorer: "永野 修都", team: "FC東京U-21" },
  { minute: "68'", scorer: "田中 希和", team: "FC東京U-21" },
  { minute: "84'", scorer: "田中 希和", team: "FC東京U-21" },
];

export const u21Cards: MatchCard[] = [
  { minute: "38'", player: "木下 晴天", team: "東京ヴェルディU-21", type: "yellow" },
  { minute: "30'", player: "田中 遥大", team: "FC東京U-21", type: "yellow" },
];

/**
 * 公式試合記録の「後半○分」表記を、前半45分基準の絶対分表記へ変換して統一する
 * （得点記録で既に採用している表記方式と揃える）。後半45+1分はアディショナルタイム
 * 表記（90+1'）へ変換。時刻自体は公式記録の値をそのまま使用し、推測は行わない。
 */
export const u21Substitutions: MatchSubstitution[] = [
  { minute: "45'", team: "FC東京U-21", playerIn: "相馬 陸人", playerOut: "永野 修都" },
  { minute: "74'", team: "東京ヴェルディU-21", playerIn: "川本 悠祐", playerOut: "下吉 洸平" },
  { minute: "74'", team: "東京ヴェルディU-21", playerIn: "沼田 晃人", playerOut: "川村 楽人" },
  { minute: "74'", team: "FC東京U-21", playerIn: "中野 寛基", playerOut: "友松 祐貴" },
  { minute: "84'", team: "東京ヴェルディU-21", playerIn: "若月 蓮", playerOut: "大藤 颯太" },
  { minute: "84'", team: "FC東京U-21", playerIn: "樋口 佳", playerOut: "小湊 絆" },
  { minute: "90+1'", team: "FC東京U-21", playerIn: "石村 琢人", playerOut: "橋本 凜来" },
  { minute: "90+1'", team: "FC東京U-21", playerIn: "オノノジュ 類主", playerOut: "田中 希和" },
];

/**
 * position別の選手グループ。"背番号 選手名" 形式の文字列で保持する
 * （トップチームのOfficialLineups.tsxと同じ記法だが、依存関係は持たない
 * 独立したデータ）。
 */
type U21PositionGroups = {
  GK: string[];
  DF: string[];
  MF: string[];
  FW: string[];
};

export type U21OfficialLineup = {
  starters: U21PositionGroups;
  bench: U21PositionGroups;
};

/**
 * 公式発表済みのStarting XI・控え（Phase 6-I.3確認）。
 * formationは公式画面から確認できないため登録しない（推測禁止）。
 */
export const u21HomeOfficialLineup: U21OfficialLineup = {
  starters: {
    GK: ["41 中村 圭佑"],
    DF: ["86 カマラ シェック セザール", "85 渡邉 春来", "79 佐古 真礼"],
    MF: ["88 木下 晴天", "87 下吉 洸平", "42 今井 健人", "92 原田 爽潤"],
    FW: ["24 仲山 獅恩", "51 大藤 颯太", "30 川村 楽人"],
  },
  bench: {
    GK: ["91 名和 優太朗"],
    DF: ["96 渡部 直宏"],
    MF: ["90 川本 悠祐", "93 若月 蓮"],
    FW: ["98 沼田 晃人"],
  },
};

export const u21AwayOfficialLineup: U21OfficialLineup = {
  starters: {
    GK: ["58 後藤 亘"],
    DF: ["69 田中 遥大", "72 松野 泰知", "44 鈴木 楓", "61 橋本 凜来", "20 永野 修都"],
    MF: ["65 梶山 蓮翔", "21 菅原 悠太", "62 友松 祐貴", "38 田中 希和"],
    FW: ["25 小湊 絆"],
  },
  bench: {
    GK: ["37 渡邊 麻舟"],
    DF: ["55 石村 琢人", "70 相馬 陸人"],
    MF: ["60 中野 寛基", "64 オノノジュ 類主", "67 冨田 真隆"],
    FW: ["63 樋口 佳"],
  },
};

export type U21MatchResult = "win" | "draw" | "loss";

export interface U21SeasonHistoryEntry {
  id: string;
  dateLabel: string;
  round: string;
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
  /** 東京ヴェルディU-21から見た結果。 */
  result: U21MatchResult;
}

/**
 * 2026/27シーズンのU-21試合履歴。今季の試合のみを蓄積する（過去シーズンは混ぜない）。
 * この第1節がRECENT 1として履歴の起点となる。
 */
export const u21SeasonHistory: U21SeasonHistoryEntry[] = [
  {
    id: u21Match.id,
    dateLabel: "08.22",
    round: "EAST 第1節",
    homeTeamName: u21Match.homeTeamName,
    awayTeamName: u21Match.awayTeamName,
    homeScore: u21Match.homeScore,
    awayScore: u21Match.awayScore,
    result: "loss",
  },
];

/**
 * 開幕節終了後のNEXT 5（公式日程のみ）。日時未確定の試合（5戦目）は単一の日付を確定させず、
 * dateLabelを範囲表記、kickoffLabelを"TBD"とする。会場は公式確認できた場合のみ設定する。
 */
export const u21UpcomingMatches: UpcomingFixture[] = [
  {
    id: "u21-next-1",
    dateLabel: "09.12 SAT",
    kickoffLabel: "18:00",
    fixtureMeta: {
      competition: "2026/27 U-21 Jリーグ",
      stage: "東西リーグラウンド",
      roundLabel: "第2節",
    },
    isHome: false,
    opponentName: "U-21浦和レッズ",
  },
  {
    id: "u21-next-2",
    dateLabel: "09.20 SUN",
    kickoffLabel: "14:00",
    fixtureMeta: {
      competition: "2026/27 U-21 Jリーグ",
      stage: "東西リーグラウンド",
      roundLabel: "第3節",
    },
    isHome: true,
    opponentName: "U-21清水エスパルス",
  },
  {
    id: "u21-next-3",
    dateLabel: "10.03 SAT",
    kickoffLabel: "15:00",
    fixtureMeta: {
      competition: "2026/27 U-21 Jリーグ",
      stage: "東西リーグラウンド",
      roundLabel: "第4節",
    },
    isHome: false,
    opponentName: "U-21川崎フロンターレ",
  },
  {
    id: "u21-next-4",
    dateLabel: "10.17 SAT",
    kickoffLabel: "15:00",
    fixtureMeta: {
      competition: "2026/27 U-21 Jリーグ",
      stage: "東西リーグラウンド",
      roundLabel: "第5節",
    },
    isHome: false,
    opponentName: "U-21ジュビロ磐田",
  },
  {
    id: "u21-next-5",
    dateLabel: "10.31 - 11.02",
    kickoffLabel: "TBD",
    fixtureMeta: {
      competition: "2026/27 U-21 Jリーグ",
      stage: "交流戦ラウンド",
      roundLabel: "第1節",
    },
    isHome: true,
    opponentName: "U-21名古屋グランパス",
  },
];
