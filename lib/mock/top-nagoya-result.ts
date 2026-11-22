import type { ActualLineup, Match } from "@/types/domain";
import { nagoyaStrategies } from "../match/nagoya-preview.ts";

const homeTeam = { id: "verdy", name: "東京ヴェルディ", isVerdy: true };
const awayTeam = { id: "nagoya-grampus", name: "名古屋グランパス", isVerdy: false };
const formationBasis = "Jリーグ公式 フォーメーション「前半0分」。攻撃方向を上にそろえ、各ラインは左→右。登録ポジションとは別";
const profile = { formation: "", characteristics: { attack: "", defense: "" }, keyPlayers: [], recentTrend: "" };

const homeLineup = {
  formation: "4-4-2",
  formationBasis,
  pitchOrder: ["1 マテウス", "18 溝口 修平", "29 佐古 真礼", "4 林 尚輝", "22 内田 陽介", "40 新井 悠太", "16 平川 怜", "10 森田 晃樹", "25 熊取谷 一星", "9 染野 唯月", "33 一美 和成"],
  starters: {
    GK: ["1 マテウス"],
    DF: ["22 内田 陽介", "4 林 尚輝", "29 佐古 真礼", "18 溝口 修平"],
    MF: ["25 熊取谷 一星", "10 森田 晃樹", "16 平川 怜", "40 新井 悠太"],
    FW: ["33 一美 和成", "9 染野 唯月"],
  },
  bench: {
    GK: ["21 長沢 祐弥"],
    DF: ["15 鈴木 海音", "35 田邉 秀斗"],
    MF: ["2 柴戸 海", "7 松橋 優安", "8 齋藤 功佑"],
    FW: ["11 山見 大登", "13 山田 剛綺", "45 寺沼 星文"],
  },
} satisfies ActualLineup;

const awayLineup = {
  formation: "3-4-2-1",
  formationBasis,
  pitchOrder: ["1 シュミット ダニエル", "31 高嶺 朋樹", "13 藤井 陽也", "70 原 輝綺", "27 中山 克広", "15 稲垣 祥", "14 森島 司", "7 和泉 竜司", "22 木村 勇大", "17 内田 宅哉", "18 永井 謙佑"],
  starters: {
    GK: ["1 シュミット ダニエル"],
    DF: ["31 高嶺 朋樹", "15 稲垣 祥", "13 藤井 陽也", "70 原 輝綺"],
    MF: ["27 中山 克広", "14 森島 司", "17 内田 宅哉", "7 和泉 竜司"],
    FW: ["22 木村 勇大", "18 永井 謙佑"],
  },
  bench: {
    GK: ["35 ピサノ アレックス幸冬堀尾"],
    DF: ["2 野上 結貴", "3 佐藤 瑶大"],
    MF: ["19 甲田 英將", "33 菊地 泰智", "41 小野 雅史", "58 小屋松 知哉"],
    FW: ["10 マテウス カストロ", "11 山岸 祐也"],
  },
} satisfies ActualLineup;

const planReviews = [
  "左は後半5分に溝口から新井が背後を取り、短く折り返した。稲垣のクリアでシュートには至らず、松橋と内田陽介の先発での連係も成立しなかった。",
  "東京Vはクロスや折り返しを何度もクリアし、無失点。名古屋にはCK6本と枠内シュート4本を許し、相馬監督が指摘したセカンドボールの回収も課題として残った。",
  "同点の68分に松橋を右SHへ入れ、熊取谷を前線へ移す狙いは実現した。交代したFWは一美で、熊取谷は右FW。染野は残り、寺沼・柴戸の投入や得点はなかった。",
];

export const nagoyaResult = {
  id: "sched-nagoya",
  homeTeam,
  awayTeam,
  isVerdyHome: true,
  kickoffAt: "2026-11-21T14:03:00+09:00",
  venue: "味の素スタジアム",
  status: "finished",
  homeScore: 0,
  awayScore: 0,
  timeSegment: null,
  fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第15節" },
  verdyProfile: profile,
  opponentProfile: profile,
  matchNotes: ["東京Vは3連勝の後、名古屋と0–0。清水戦から2試合連続の無失点。"],
  focusPoints: [],
  strategies: nagoyaStrategies.map((strategy, index) => ({
    ...strategy,
    result: "partial",
    resultComment: planReviews[index],
  })),
  officialRecord: {
    kickoff: "14:03", attendance: 15448, weather: "晴", temperature: "15.6℃", humidity: "27%",
    referee: "山下 良美", assistantReferees: ["熊谷 幸剛", "岩﨑 創一"], fourthOfficial: "廣瀬 成昭",
    sourceUrl: "https://data.j-league.or.jp/SFMS02/?match_card_id=34657",
  },
  goals: [],
  cards: [
    { minute: "18'", player: "内田 陽介", team: homeTeam.name, type: "yellow" },
    { minute: "90+4'", player: "高嶺 朋樹", team: awayTeam.name, type: "yellow" },
  ],
  substitutions: [
    { minute: "62'", team: awayTeam.name, playerOut: "永井 謙佑", playerIn: "山岸 祐也" },
    { minute: "62'", team: awayTeam.name, playerOut: "和泉 竜司", playerIn: "甲田 英將" },
    { minute: "62'", team: awayTeam.name, playerOut: "森島 司", playerIn: "佐藤 瑶大" },
    { minute: "62'", team: awayTeam.name, playerOut: "内田 宅哉", playerIn: "野上 結貴" },
    { minute: "68'", team: homeTeam.name, playerOut: "内田 陽介", playerIn: "鈴木 海音" },
    { minute: "68'", team: homeTeam.name, playerOut: "一美 和成", playerIn: "松橋 優安" },
    { minute: "78'", team: awayTeam.name, playerOut: "木村 勇大", playerIn: "マテウス カストロ" },
    { minute: "86'", team: homeTeam.name, playerOut: "熊取谷 一星", playerIn: "山見 大登" },
  ],
  actualLineups: { home: homeLineup, away: awayLineup },
  matchStats: {
    sourceUrl: "https://www.jleague.jp/match/j1/2026/112101/",
    home: { shots: 8, shotsOnTarget: 4, possession: "38%", passSuccessRate: "73%", distance: "117.2km", sprints: 134, offsides: 3, corners: 3, freeKicks: 17, yellowCards: 1, redCards: 0 },
    away: { shots: 12, shotsOnTarget: 4, possession: "62%", passSuccessRate: "83%", distance: "112.1km", sprints: 127, offsides: 3, corners: 6, freeKicks: 17, yellowCards: 1, redCards: 0 },
  },
} satisfies Match;
