import type { LeagueStandings } from "@/types/standings";

/** Jリーグ公式 2026/10/9 21:29更新の静的スナップショット。公式順位順と既存クラブ名を保持。 */
export const j1Standings: LeagueStandings = {
  competition: "2026／27 明治安田J1リーグ",
  asOfLabel: "2026年10月9日21:29更新",
  sourceUrl: "https://www.jleague.jp/j1/standings/2026-27/",
  entries: [
    { rank: 1, teamName: "柏レイソル", played: 9, wins: 7, draws: 0, losses: 2, goalsFor: 21, goalsAgainst: 14, goalDifference: 7, points: 21 },
    { rank: 2, teamName: "ヴィッセル神戸", played: 9, wins: 6, draws: 1, losses: 2, goalsFor: 14, goalsAgainst: 9, goalDifference: 5, points: 19 },
    { rank: 3, teamName: "サンフレッチェ広島", played: 8, wins: 5, draws: 2, losses: 1, goalsFor: 20, goalsAgainst: 6, goalDifference: 14, points: 17 },
    { rank: 4, teamName: "FC町田ゼルビア", played: 8, wins: 5, draws: 2, losses: 1, goalsFor: 21, goalsAgainst: 10, goalDifference: 11, points: 17 },
    { rank: 5, teamName: "FC東京", played: 8, wins: 5, draws: 2, losses: 1, goalsFor: 14, goalsAgainst: 8, goalDifference: 6, points: 17 },
    { rank: 6, teamName: "鹿島アントラーズ", played: 9, wins: 5, draws: 1, losses: 3, goalsFor: 19, goalsAgainst: 16, goalDifference: 3, points: 16 },
    { rank: 7, teamName: "横浜F・マリノス", played: 8, wins: 4, draws: 2, losses: 2, goalsFor: 13, goalsAgainst: 9, goalDifference: 4, points: 14 },
    { rank: 8, teamName: "川崎フロンターレ", played: 8, wins: 3, draws: 4, losses: 1, goalsFor: 16, goalsAgainst: 12, goalDifference: 4, points: 13 },
    { rank: 9, teamName: "ファジアーノ岡山", played: 8, wins: 4, draws: 1, losses: 3, goalsFor: 11, goalsAgainst: 10, goalDifference: 1, points: 13 },
    { rank: 10, teamName: "浦和レッズ", played: 8, wins: 4, draws: 0, losses: 4, goalsFor: 16, goalsAgainst: 18, goalDifference: -2, points: 12 },
    { rank: 11, teamName: "セレッソ大阪", played: 8, wins: 3, draws: 2, losses: 3, goalsFor: 7, goalsAgainst: 12, goalDifference: -5, points: 11 },
    { rank: 12, teamName: "清水エスパルス", played: 8, wins: 3, draws: 1, losses: 4, goalsFor: 6, goalsAgainst: 8, goalDifference: -2, points: 10 },
    { rank: 13, teamName: "水戸ホーリーホック", played: 8, wins: 2, draws: 3, losses: 3, goalsFor: 11, goalsAgainst: 11, goalDifference: 0, points: 9 },
    { rank: 14, teamName: "京都サンガF.C.", played: 8, wins: 2, draws: 2, losses: 4, goalsFor: 11, goalsAgainst: 15, goalDifference: -4, points: 8 },
    { rank: 15, teamName: "V・ファーレン長崎", played: 8, wins: 2, draws: 2, losses: 4, goalsFor: 10, goalsAgainst: 15, goalDifference: -5, points: 8 },
    { rank: 16, teamName: "名古屋グランパス", played: 8, wins: 2, draws: 0, losses: 6, goalsFor: 7, goalsAgainst: 14, goalDifference: -7, points: 6 },
    { rank: 17, teamName: "ガンバ大阪", played: 9, wins: 1, draws: 3, losses: 5, goalsFor: 8, goalsAgainst: 16, goalDifference: -8, points: 6 },
    { rank: 18, teamName: "アビスパ福岡", played: 8, wins: 1, draws: 1, losses: 6, goalsFor: 9, goalsAgainst: 12, goalDifference: -3, points: 4 },
    { rank: 19, teamName: "東京ヴェルディ", played: 8, wins: 0, draws: 4, losses: 4, goalsFor: 4, goalsAgainst: 12, goalDifference: -8, points: 4 },
    { rank: 20, teamName: "ジェフユナイテッド千葉", played: 8, wins: 1, draws: 1, losses: 6, goalsFor: 7, goalsAgainst: 18, goalDifference: -11, points: 4 },
  ],
};
