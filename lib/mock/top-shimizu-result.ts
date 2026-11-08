import type { Match } from "@/types/domain";

// Jリーグ公式速報と清水公式試合情報を照合。シュート数の集計差はレビューで明示する。
// formation／pitchOrderは2026-11-09にJリーグ公式サイトのフォーメーション「前半0分」で確認（試合前の予想配置は流用しない）。
const profile = { formation: "", characteristics: { attack: "", defense: "" }, keyPlayers: [], recentTrend: "" };
export const shimizuResult: Match = {
  id: "sched-shimizu", homeTeam: { id: "shimizu-s-pulse", name: "清水エスパルス", isVerdy: false }, awayTeam: { id: "verdy", name: "東京ヴェルディ", isVerdy: true },
  isVerdyHome: false, kickoffAt: "2026-11-07T13:03:00+09:00", venue: "ＩＡＩスタジアム日本平", status: "finished", homeScore: 0, awayScore: 1, timeSegment: null,
  fixtureMeta: { competition: "2026 J1リーグ", roundLabel: "第14節" }, verdyProfile: profile, opponentProfile: profile,
  matchNotes: ["清水 0-1 東京ヴェルディ。72分に熊取谷一星が決勝点。"], focusPoints: [], strategies: [],
  officialRecord: { kickoff: "13:03", attendance: 15476, weather: "晴", temperature: "23.5℃", humidity: "36%", referee: "長峯 滉希", assistantReferees: ["淺田 武士", "船橋 昭次"], fourthOfficial: "竹長 泰彦", sourceUrl: "https://www.jleague.jp/match/j1/2026/110706/" },
  goals: [{ minute: "72'", scorer: "熊取谷 一星", team: "東京ヴェルディ", assist: "新井 悠太" }],
  cards: [
    { minute: "21'", player: "林 尚輝", team: "東京ヴェルディ", type: "yellow" },
    { minute: "65'", player: "高橋 祐治", team: "清水エスパルス", type: "yellow" },
    { minute: "90+1'", player: "寺沼 星文", team: "東京ヴェルディ", type: "yellow" },
    { minute: "90+2'", player: "カピシャーバ", team: "清水エスパルス", type: "yellow" },
  ],
  substitutions: [
    { minute: "18'", team: "東京ヴェルディ", playerOut: "チョ ユミン", playerIn: "佐古 真礼" },
    { minute: "46'", team: "清水エスパルス", playerOut: "平戸 太貴", playerIn: "嶋本 悠大" },
    { minute: "59'", team: "東京ヴェルディ", playerOut: "森田 晃樹", playerIn: "柴戸 海" },
    { minute: "59'", team: "東京ヴェルディ", playerOut: "藤本 寛也", playerIn: "熊取谷 一星" },
    { minute: "67'", team: "清水エスパルス", playerOut: "藤井 智也", playerIn: "ジャーメイン 良" },
    { minute: "67'", team: "清水エスパルス", playerOut: "井上 健太", playerIn: "松崎 快" },
    { minute: "67'", team: "東京ヴェルディ", playerOut: "染野 唯月", playerIn: "松橋 優安" },
    { minute: "78'", team: "清水エスパルス", playerOut: "小泉 慶", playerIn: "ウォン ドゥジェ" },
    { minute: "86'", team: "東京ヴェルディ", playerOut: "一美 和成", playerIn: "寺沼 星文" },
    { minute: "89'", team: "清水エスパルス", playerOut: "パク スンウク", playerIn: "カピシャーバ" },
  ],
  actualLineups: {
    home: {
      formation: "4-1-2-3", formationBasis: "Jリーグ公式 フォーメーション「前半0分」。攻撃方向を上にそろえ、各ラインは左→右。登録ポジションとは別",
      pitchOrder: ["1 沖 悠哉", "25 マテウス ブルネッティ", "14 パク スンウク", "3 高橋 祐治", "24 須貝 英大", "37 小泉 慶", "18 平戸 太貴", "17 弓場 将輝", "50 藤井 智也", "9 オ セフン", "8 井上 健太"],
      starters: { GK: ["1 沖 悠哉"], DF: ["24 須貝 英大", "3 高橋 祐治", "14 パク スンウク", "25 マテウス ブルネッティ"], MF: ["37 小泉 慶", "17 弓場 将輝", "18 平戸 太貴"], FW: ["8 井上 健太", "50 藤井 智也", "9 オ セフン"] }, bench: { GK: ["16 梅田 透吾"], DF: ["28 吉田 豊", "97 大畑 凜生"], MF: ["6 ウォン ドゥジェ", "7 カピシャーバ", "21 松崎 快", "47 嶋本 悠大", "81 小塚 和季"], FW: ["13 ジャーメイン 良"] } },
    away: {
      formation: "4-4-2", formationBasis: "Jリーグ公式 フォーメーション「前半0分」。攻撃方向を上にそろえ、各ラインは左→右。登録ポジションとは別",
      pitchOrder: ["1 マテウス", "18 溝口 修平", "96 チョ ユミン", "4 林 尚輝", "22 内田 陽介", "40 新井 悠太", "16 平川 怜", "10 森田 晃樹", "19 藤本 寛也", "9 染野 唯月", "33 一美 和成"],
      starters: { GK: ["1 マテウス"], DF: ["22 内田 陽介", "4 林 尚輝", "96 チョ ユミン", "18 溝口 修平"], MF: ["19 藤本 寛也", "10 森田 晃樹", "16 平川 怜", "40 新井 悠太"], FW: ["33 一美 和成", "9 染野 唯月"] }, bench: { GK: ["21 長沢 祐弥"], DF: ["15 鈴木 海音", "29 佐古 真礼"], MF: ["2 柴戸 海", "7 松橋 優安", "14 福田 湧矢"], FW: ["13 山田 剛綺", "25 熊取谷 一星", "45 寺沼 星文"] } },
  },
};
