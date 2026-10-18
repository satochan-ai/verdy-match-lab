import type { Match } from "@/types/domain";

/** Jリーグ公式・FC東京公式を2026-10-18照合。配置はJリーグ公式「前半0分」。 */
const sourceUrl = "https://www.jleague.jp/match/j1/2026/101708/";
const emptyProfile = { formation: "4-4-2", characteristics: { attack: "未分析", defense: "未分析" }, keyPlayers: [], recentTrend: "未分析" };
export const fcTokyoResult: Match = {
  id: "sched-fc-tokyo",
  homeTeam: { id: "verdy", name: "東京ヴェルディ", isVerdy: true },
  awayTeam: { id: "fc-tokyo", name: "FC東京", isVerdy: false }, isVerdyHome: true,
  kickoffAt: "2026-10-17T14:03:00+09:00", venue: "味の素スタジアム", status: "finished", homeScore: 0, awayScore: 4, timeSegment: null,
  fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第10節" }, verdyProfile: emptyProfile, opponentProfile: emptyProfile,
  matchNotes: [
    "東京ヴェルディは10月17日、味の素スタジアムでFC東京に0-4で敗れた。前半0-1、後半0-3。",
    "18分に染野唯月が退場。FC東京は41分にアレクサンダー ショルツ、55分にマルセロ ヒアン、68分に長倉幹樹、90+4分にダニ ゴメスが得点した。",
    "開始時フォーメーション：東京V 4-4-2 ／ FC東京 4-4-2（Jリーグ公式・前半0分）。",
    "監督：東京V 相馬 直樹 ／ FC東京 松橋 力蔵。VAR：上原 直人 ／ AVAR：唐紙 学志。",
  ], focusPoints: [], strategies: [],
  officialRecord: { kickoff: "14:03", attendance: 28945, weather: "晴れ", temperature: "29.2℃", humidity: "20%", referee: "上村 篤史", assistantReferees: ["西橋 勲", "友政 利貴"], fourthOfficial: "篠藤 巧", sourceUrl },
  goals: [
    { minute: "41'", scorer: "アレクサンダー ショルツ", team: "FC東京" },
    { minute: "55'", scorer: "マルセロ ヒアン", team: "FC東京" },
    { minute: "68'", scorer: "長倉 幹樹", team: "FC東京" },
    { minute: "90+4'", scorer: "ダニ ゴメス", team: "FC東京" },
  ],
  cards: [
    { minute: "18'", player: "染野 唯月", team: "東京ヴェルディ", type: "red" },
    { minute: "58'", player: "新井 悠太", team: "東京ヴェルディ", type: "yellow" },
    { minute: "81'", player: "一美 和成", team: "東京ヴェルディ", type: "yellow" },
  ],
  substitutions: [
    { minute: "29'", team: "東京ヴェルディ", playerOut: "福田 湧矢", playerIn: "熊取谷 一星" },
    { minute: "HT", team: "東京ヴェルディ", playerOut: "キム ヒョンウ", playerIn: "一美 和成" },
    { minute: "66'", team: "東京ヴェルディ", playerOut: "齋藤 功佑", playerIn: "平川 怜" },
    { minute: "66'", team: "FC東京", playerOut: "俵積田 晃太", playerIn: "佐藤 恵允" },
    { minute: "66'", team: "FC東京", playerOut: "バングーナガンデ 佳史扶", playerIn: "大森 理生" },
    { minute: "74'", team: "FC東京", playerOut: "高 宇洋", playerIn: "常盤 亨太" },
    { minute: "80'", team: "東京ヴェルディ", playerOut: "藤本 寛也", playerIn: "森田 晃樹" },
    { minute: "80'", team: "東京ヴェルディ", playerOut: "柴戸 海", playerIn: "チョ ユミン" },
    { minute: "83'", team: "FC東京", playerOut: "マルセロ ヒアン", playerIn: "ダニ ゴメス" },
    { minute: "83'", team: "FC東京", playerOut: "安斎 颯馬", playerIn: "山田 楓喜" },
  ],
  actualLineups: {
    home: { formation: "4-4-2", starters: { GK: ["1 マテウス"], DF: ["40 新井 悠太", "29 佐古 真礼", "4 林 尚輝", "15 鈴木 海音"], MF: ["14 福田 湧矢", "8 齋藤 功佑", "2 柴戸 海", "19 藤本 寛也"], FW: ["9 染野 唯月", "17 キム ヒョンウ"] }, bench: { GK: ["21 長沢 祐弥"], DF: ["22 内田 陽介", "96 チョ ユミン"], MF: ["7 松橋 優安", "10 森田 晃樹", "16 平川 怜"], FW: ["13 山田 剛綺", "25 熊取谷 一星", "33 一美 和成"] } },
    away: { formation: "4-4-2", starters: { GK: ["81 キム スンギュ"], DF: ["6 バングーナガンデ 佳史扶", "4 稲村 隼翔", "24 アレクサンダー ショルツ", "22 石原 広教"], MF: ["33 俵積田 晃太", "20 永野 修都", "8 高 宇洋", "7 安斎 颯馬"], FW: ["9 マルセロ ヒアン", "26 長倉 幹樹"] }, bench: { GK: ["1 田中 颯"], DF: ["3 森重 真人", "15 大森 理生", "44 鈴木 楓"], MF: ["27 常盤 亨太", "71 山田 楓喜"], FW: ["10 佐藤 恵允", "39 仲川 輝人", "99 ダニ ゴメス"] } },
  },
};
