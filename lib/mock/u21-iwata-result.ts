import type { MatchCard, MatchGoal, MatchSubstitution, OfficialMatchRecord } from "@/types/domain";
import type { U21OfficialLineup } from "./u21";

/** Jリーグ公式を2026-10-18照合。開始時フォーメーションは公式表示になく未登録。 */
export const u21IwataMatch = {
  id: "u21-next-4", status: "finished" as const,
  competition: "2026／27Ｕ-21Ｊリーグ 東西リーグラウンド EAST 第5節",
  fixtureMeta: { competition: "2026/27 U-21 Jリーグ", stage: "東西リーグラウンド", roundLabel: "第5節" },
  kickoffAt: "2026-10-17T15:00:00+09:00", kickoffLabel: "15:00",
  venue: "ヤマハ大久保グラウンド", isVerdyHome: false,
  homeTeamName: "U-21ジュビロ磐田", awayTeamName: "東京ヴェルディU-21", homeScore: 3, awayScore: 5,
  scheduleNote: "前半 2-2 ／ 後半 1-3（公式得点記録から集計）。開始時フォーメーションは未確認。",
};
export const u21IwataOfficialRecord: OfficialMatchRecord = {
  kickoff: "15:03", attendance: 197, weather: "晴", temperature: "24.5℃", humidity: "48%",
  referee: "田原 愼乃介", assistantReferees: ["内田 康介", "田邉 悠"], fourthOfficial: "高島 昌康",
  sourceUrl: "https://www.jleague.jp/match/u-21/2026/101734/",
};
export const u21IwataGoals: MatchGoal[] = [
  { minute: "31'", scorer: "佐久間 心輝", team: u21IwataMatch.homeTeamName },
  { minute: "38'", scorer: "佐久間 心輝", team: u21IwataMatch.homeTeamName },
  { minute: "39'", scorer: "大藤 颯太", team: u21IwataMatch.awayTeamName },
  { minute: "43'", scorer: "神田 奏真", team: u21IwataMatch.awayTeamName },
  { minute: "69'", scorer: "中谷 桜太朗", team: u21IwataMatch.homeTeamName },
  { minute: "82'", scorer: "川村 楽人", team: u21IwataMatch.awayTeamName },
  { minute: "83'", scorer: "仲山 獅恩", team: u21IwataMatch.awayTeamName },
  { minute: "85'", scorer: "川村 楽人", team: u21IwataMatch.awayTeamName },
];
export const u21IwataCards: MatchCard[] = [
  { minute: "55'", player: "縣 真汰", team: u21IwataMatch.homeTeamName, type: "yellow" },
  { minute: "59'", player: "食野 壮磨", team: u21IwataMatch.awayTeamName, type: "yellow" },
];
// 公式「後半0分」はHTで表示。東京Vの交代は公式記録にないため追加しない。
export const u21IwataSubstitutions: MatchSubstitution[] = [
  { minute: "32'", team: u21IwataMatch.homeTeamName, playerOut: "江﨑 巧朗", playerIn: "平岩 煌麻" },
  { minute: "HT", team: u21IwataMatch.homeTeamName, playerOut: "藤井 竜太", playerIn: "影原 望" },
  { minute: "HT", team: u21IwataMatch.homeTeamName, playerOut: "西岡 健斗", playerIn: "中谷 桜太朗" },
  { minute: "60'", team: u21IwataMatch.homeTeamName, playerOut: "水野 隼佑", playerIn: "伊藤 心音" },
  { minute: "60'", team: u21IwataMatch.homeTeamName, playerOut: "増井 利空士", playerIn: "服部 公紀" },
  { minute: "66'", team: u21IwataMatch.homeTeamName, playerOut: "縣 真汰", playerIn: "白濱 咲之丞" },
];
export const u21IwataHomeOfficialLineup: U21OfficialLineup = {
  starters: { GK: ["51 中島 佳太郎"], DF: ["5 江﨑 巧朗", "66 増田 大空", "86 水野 隼佑", "87 山本 晄大", "92 藤井 竜太"], MF: ["17 西岡 健斗", "83 藤本 神之介", "89 増井 利空士", "93 縣 真汰", "95 佐久間 心輝"], FW: [] },
  bench: { GK: ["91 櫨 瑞貴"], DF: ["85 伊藤 心音", "90 影原 望", "96 平岩 煌麻"], MF: ["82 中谷 桜太朗", "84 白濱 咲之丞"], FW: ["94 服部 公紀"] },
};
export const u21IwataAwayOfficialLineup: U21OfficialLineup = {
  starters: { GK: ["81 馬渡 洋樹"], DF: ["42 今井 健人", "83 松田 陸", "82 田邉 秀斗", "85 溝口 修平"], MF: ["24 仲山 獅恩", "28 山本 丈偉", "89 食野 壮磨", "30 川村 楽人"], FW: ["51 大藤 颯太", "38 神田 奏真"] },
  bench: { GK: ["91 高居 丈流"], DF: ["99 渡部 直宏"], MF: ["94 植月 瑛大"], FW: ["97 七久保 優", "98 沼田 晃人"] },
};
