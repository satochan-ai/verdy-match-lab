import type { LeagueStandings } from "@/types/standings";

/** Jリーグ公式順位表（2026/11/1 15:57更新）を同日照合。
 * https://www.jleague.jp/u-21/standings/
 * 東西リーグ・交流戦の合算をEAST/WEST別に掲載。独自再計算・並べ替えはしない。
 * WESTの直近成績欄は公式表示のまま（試合数と表示数に差あり）。
 */
export const u21EastStandings: LeagueStandings = {
  competition: "2026/27 U-21 Jリーグ 東西リーグラウンド・交流戦ラウンド（EAST）",
  asOfLabel: "2026/11/01 15:57 公式更新・同日照合",
  entries: [
    { rank: 1, teamName: "U-21 東京ヴェルディ", played: 6, wins: 4, draws: 0, losses: 2, goalsFor: 16, goalsAgainst: 16, goalDifference: 0, points: 12, recentForm: [ "L", "W", "W", "L", "W" ] },
    { rank: 2, teamName: "U-21 川崎フロンターレ", played: 5, wins: 3, draws: 1, losses: 1, goalsFor: 12, goalsAgainst: 5, goalDifference: 7, points: 10, recentForm: [ "W", "W", "D", "W", "L" ] },
    { rank: 3, teamName: "U-21 FC東京", played: 5, wins: 3, draws: 1, losses: 1, goalsFor: 11, goalsAgainst: 4, goalDifference: 7, points: 10, recentForm: [ "W", "W", "D", "L", "W" ] },
    { rank: 4, teamName: "U-21 浦和レッズ", played: 5, wins: 2, draws: 0, losses: 3, goalsFor: 6, goalsAgainst: 10, goalDifference: -4, points: 6, recentForm: [ "L", "L", "L", "W", "W" ] },
    { rank: 5, teamName: "U-21 清水エスパルス", played: 6, wins: 2, draws: 0, losses: 4, goalsFor: 10, goalsAgainst: 18, goalDifference: -8, points: 6, recentForm: [ "W", "L", "L", "W", "L" ] },
    { rank: 6, teamName: "U-21 ジュビロ磐田", played: 6, wins: 1, draws: 0, losses: 5, goalsFor: 9, goalsAgainst: 15, goalDifference: -6, points: 3, recentForm: [ "L", "L", "W", "L", "L" ] }
  ]
};

export const u21WestStandings: LeagueStandings = {
  competition: "2026/27 U-21 Jリーグ 東西リーグラウンド・交流戦ラウンド（WEST）",
  asOfLabel: "2026/11/01 15:57 公式更新・同日照合",
  entries: [
    { rank: 1, teamName: "U-21 ヴィッセル神戸", played: 5, wins: 4, draws: 0, losses: 1, goalsFor: 11, goalsAgainst: 4, goalDifference: 7, points: 12, recentForm: [ "W", "L", "W", "W" ] },
    { rank: 2, teamName: "U-21 ガンバ大阪", played: 4, wins: 3, draws: 0, losses: 1, goalsFor: 6, goalsAgainst: 2, goalDifference: 4, points: 9, recentForm: [ "W", "W", "L", "W" ] },
    { rank: 3, teamName: "U-21 名古屋グランパス", played: 5, wins: 2, draws: 1, losses: 2, goalsFor: 9, goalsAgainst: 9, goalDifference: 0, points: 7, recentForm: [ "W", "W", "D", "L" ] },
    { rank: 4, teamName: "U-21 ファジアーノ岡山", played: 5, wins: 1, draws: 1, losses: 3, goalsFor: 11, goalsAgainst: 11, goalDifference: 0, points: 4, recentForm: [ "L", "L", "D", "L" ] },
    { rank: 5, teamName: "U-21 V・ファーレン長崎", played: 4, wins: 1, draws: 0, losses: 3, goalsFor: 5, goalsAgainst: 12, goalDifference: -7, points: 3, recentForm: [ "L", "L", "L", "W" ] }
  ]
};
