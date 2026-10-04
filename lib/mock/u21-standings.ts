import type { LeagueStandings } from "@/types/standings";

/**
 * 2026 U-21 Jリーグ 東西リーグラウンド 順位表。
 * 出典：ユーザー提供の順位表データ（一次入力）。
 * EASTとWESTは別々に順位付けされており、混ぜて11クラブの単一順位表にはしない。
 * 順位はユーザー提供データをそのまま使用し、勝点だけから独自に並べ替えない
 * （WESTの神戸(1位・3試合)と名古屋(2位・2試合)のように消化試合数が異なっていても、
 * 提供された順位を優先する）。
 * recentFormは消化済みの結果のみを保持し、空き枠を"-"やnullで埋めない。
 */
export const u21EastStandings: LeagueStandings = {
  competition: "2026 U-21 Jリーグ 東西リーグラウンド（EAST）",
  asOfLabel: "2026/10/03 更新",
  entries: [
    { rank: 1, teamName: "U-21 川崎フロンターレ", played: 4, wins: 3, draws: 1, losses: 0, goalsFor: 12, goalsAgainst: 4, goalDifference: 8, points: 10, recentForm: ["W", "W", "D", "W"] },
    { rank: 2, teamName: "U-21 FC東京", played: 3, wins: 2, draws: 1, losses: 0, goalsFor: 6, goalsAgainst: 0, goalDifference: 6, points: 7, recentForm: ["W", "W", "D"] },
    { rank: 3, teamName: "U-21 清水エスパルス", played: 4, wins: 2, draws: 0, losses: 2, goalsFor: 8, goalsAgainst: 10, goalDifference: -2, points: 6, recentForm: ["W", "L", "L", "W"] },
    { rank: 4, teamName: "U-21 東京ヴェルディ", played: 4, wins: 2, draws: 0, losses: 2, goalsFor: 7, goalsAgainst: 10, goalDifference: -3, points: 6, recentForm: ["L", "W", "W", "L"] },
    { rank: 5, teamName: "U-21 ジュビロ磐田", played: 4, wins: 1, draws: 0, losses: 3, goalsFor: 6, goalsAgainst: 9, goalDifference: -3, points: 3, recentForm: ["L", "L", "W", "L"] },
    { rank: 6, teamName: "U-21 浦和レッズ", played: 3, wins: 0, draws: 0, losses: 3, goalsFor: 2, goalsAgainst: 8, goalDifference: -6, points: 0, recentForm: ["L", "L", "L"] },
  ],
};

export const u21WestStandings: LeagueStandings = {
  competition: "2026 U-21 Jリーグ 東西リーグラウンド（WEST）",
  asOfLabel: "2026/10/03 更新",
  entries: [
    { rank: 1, teamName: "U-21 ヴィッセル神戸", played: 3, wins: 2, draws: 0, losses: 1, goalsFor: 8, goalsAgainst: 4, goalDifference: 4, points: 6, recentForm: ["W", "L", "W"] },
    { rank: 2, teamName: "U-21 名古屋グランパス", played: 2, wins: 2, draws: 0, losses: 0, goalsFor: 4, goalsAgainst: 1, goalDifference: 3, points: 6, recentForm: ["W", "W"] },
    { rank: 3, teamName: "U-21 ガンバ大阪", played: 3, wins: 2, draws: 0, losses: 1, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 6, recentForm: ["W", "W", "L"] },
    { rank: 4, teamName: "U-21 ファジアーノ岡山", played: 2, wins: 0, draws: 0, losses: 2, goalsFor: 2, goalsAgainst: 5, goalDifference: -3, points: 0, recentForm: ["L", "L"] },
    { rank: 5, teamName: "U-21 V・ファーレン長崎", played: 2, wins: 0, draws: 0, losses: 2, goalsFor: 1, goalsAgainst: 7, goalDifference: -6, points: 0, recentForm: ["L", "L"] },
  ],
};
