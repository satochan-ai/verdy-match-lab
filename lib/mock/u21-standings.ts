import type { LeagueStandings } from "@/types/standings";

// Jリーグ公式順位表の全11チームを照合。順位・直近成績も掲載順をそのまま採用。
// https://www.jleague.jp/u-21/standings/
export const u21StandingsUpdatedAt = "2026/11/22 17:10";
const asOfLabel = `${u21StandingsUpdatedAt} 公式更新・同日照合`;

export const u21EastStandings: LeagueStandings = {
  competition: "2026/27 U-21 Jリーグ 東西リーグラウンド・交流戦ラウンド（EAST）",
  asOfLabel,
  entries: [
    { rank: 1, teamName: "U-21 川崎フロンターレ", played: 7, wins: 5, draws: 1, losses: 1, goalsFor: 19, goalsAgainst: 5, goalDifference: 14, points: 16, recentForm: ["D", "W", "L", "W", "W"] },
    { rank: 2, teamName: "U-21 東京ヴェルディ", played: 7, wins: 5, draws: 0, losses: 2, goalsFor: 19, goalsAgainst: 18, goalDifference: 1, points: 15, recentForm: ["W", "L", "W", "W", "W"] },
    { rank: 3, teamName: "U-21 FC東京", played: 7, wins: 3, draws: 2, losses: 2, goalsFor: 13, goalsAgainst: 7, goalDifference: 6, points: 11, recentForm: ["D", "L", "W", "D", "L"] },
    { rank: 4, teamName: "U-21 浦和レッズ", played: 6, wins: 3, draws: 0, losses: 3, goalsFor: 9, goalsAgainst: 11, goalDifference: -2, points: 9, recentForm: ["L", "L", "W", "W", "W"] },
    { rank: 5, teamName: "U-21 ジュビロ磐田", played: 7, wins: 2, draws: 0, losses: 5, goalsFor: 11, goalsAgainst: 15, goalDifference: -4, points: 6, recentForm: ["W", "L", "L", "L", "W"] },
    { rank: 6, teamName: "U-21 清水エスパルス", played: 7, wins: 2, draws: 0, losses: 5, goalsFor: 10, goalsAgainst: 22, goalDifference: -12, points: 6, recentForm: ["L", "W", "L", "L", "L"] },
  ],
};

export const u21WestStandings: LeagueStandings = {
  competition: "2026/27 U-21 Jリーグ 東西リーグラウンド・交流戦ラウンド（WEST）",
  asOfLabel,
  entries: [
    { rank: 1, teamName: "U-21 ヴィッセル神戸", played: 6, wins: 5, draws: 0, losses: 1, goalsFor: 12, goalsAgainst: 4, goalDifference: 8, points: 15, recentForm: ["L", "W", "W", "W", "W"] },
    { rank: 2, teamName: "U-21 ガンバ大阪", played: 7, wins: 4, draws: 1, losses: 2, goalsFor: 14, goalsAgainst: 7, goalDifference: 7, points: 13, recentForm: ["L", "W", "D", "W", "L"] },
    { rank: 3, teamName: "U-21 名古屋グランパス", played: 6, wins: 2, draws: 1, losses: 3, goalsFor: 10, goalsAgainst: 12, goalDifference: -2, points: 7, recentForm: ["W", "D", "L", "L", "L"] },
    { rank: 4, teamName: "U-21 ファジアーノ岡山", played: 6, wins: 1, draws: 1, losses: 4, goalsFor: 11, goalsAgainst: 14, goalDifference: -3, points: 4, recentForm: ["L", "D", "L", "W", "L"] },
    { rank: 5, teamName: "U-21 V・ファーレン長崎", played: 6, wins: 1, draws: 0, losses: 5, goalsFor: 5, goalsAgainst: 18, goalDifference: -13, points: 3, recentForm: ["L", "L", "W", "L", "L"] },
  ],
};
