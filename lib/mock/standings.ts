import type { LeagueStandings } from "@/types/standings";

/**
 * 2026/27 明治安田J1リーグ 順位表。
 * 出典：東京ヴェルディ公式（https://www.verdy.co.jp/match/ranking/、ユーザー確認済み）。
 * 公式ページに表示されている列（順位・チーム名・勝点・試合数・勝敗分・得点・失点・得失点差）
 * のみを保持し、存在しない列（順位変動、直近5試合等）は追加しない。
 * 全20クラブを公式値どおり保持する。数値は推測・補完しない。
 */
export const j1Standings: LeagueStandings = {
  competition: "2026／27 明治安田J1リーグ",
  asOfLabel: "2026.09.14 現在",
  sourceUrl: "https://www.verdy.co.jp/match/ranking/",
  entries: [
    { rank: 1, teamName: "FC町田ゼルビア", played: 7, wins: 5, draws: 2, losses: 0, goalsFor: 19, goalsAgainst: 6, goalDifference: 13, points: 17 },
    { rank: 2, teamName: "ヴィッセル神戸", played: 7, wins: 5, draws: 1, losses: 1, goalsFor: 11, goalsAgainst: 5, goalDifference: 6, points: 16 },
    { rank: 3, teamName: "柏レイソル", played: 7, wins: 5, draws: 0, losses: 2, goalsFor: 13, goalsAgainst: 10, goalDifference: 3, points: 15 },
    { rank: 4, teamName: "サンフレッチェ広島", played: 7, wins: 4, draws: 2, losses: 1, goalsFor: 19, goalsAgainst: 6, goalDifference: 13, points: 14 },
    { rank: 5, teamName: "FC東京", played: 7, wins: 4, draws: 2, losses: 1, goalsFor: 13, goalsAgainst: 8, goalDifference: 5, points: 14 },
    { rank: 6, teamName: "ファジアーノ岡山", played: 7, wins: 4, draws: 1, losses: 2, goalsFor: 10, goalsAgainst: 8, goalDifference: 2, points: 13 },
    { rank: 7, teamName: "川崎フロンターレ", played: 7, wins: 3, draws: 3, losses: 1, goalsFor: 13, goalsAgainst: 9, goalDifference: 4, points: 12 },
    { rank: 8, teamName: "鹿島アントラーズ", played: 7, wins: 4, draws: 0, losses: 3, goalsFor: 14, goalsAgainst: 13, goalDifference: 1, points: 12 },
    { rank: 9, teamName: "横浜F・マリノス", played: 7, wins: 3, draws: 2, losses: 2, goalsFor: 11, goalsAgainst: 9, goalDifference: 2, points: 11 },
    { rank: 10, teamName: "セレッソ大阪", played: 7, wins: 3, draws: 1, losses: 3, goalsFor: 6, goalsAgainst: 11, goalDifference: -5, points: 10 },
    { rank: 11, teamName: "水戸ホーリーホック", played: 7, wins: 2, draws: 3, losses: 2, goalsFor: 11, goalsAgainst: 9, goalDifference: 2, points: 9 },
    { rank: 12, teamName: "浦和レッズ", played: 7, wins: 3, draws: 0, losses: 4, goalsFor: 13, goalsAgainst: 17, goalDifference: -4, points: 9 },
    { rank: 13, teamName: "清水エスパルス", played: 7, wins: 2, draws: 1, losses: 4, goalsFor: 4, goalsAgainst: 7, goalDifference: -3, points: 7 },
    { rank: 14, teamName: "V・ファーレン長崎", played: 7, wins: 2, draws: 1, losses: 4, goalsFor: 9, goalsAgainst: 14, goalDifference: -5, points: 7 },
    { rank: 15, teamName: "ガンバ大阪", played: 7, wins: 1, draws: 3, losses: 3, goalsFor: 8, goalsAgainst: 13, goalDifference: -5, points: 6 },
    { rank: 16, teamName: "名古屋グランパス", played: 7, wins: 2, draws: 0, losses: 5, goalsFor: 7, goalsAgainst: 13, goalDifference: -6, points: 6 },
    { rank: 17, teamName: "京都サンガF.C.", played: 7, wins: 1, draws: 2, losses: 4, goalsFor: 9, goalsAgainst: 14, goalDifference: -5, points: 5 },
    { rank: 18, teamName: "アビスパ福岡", played: 7, wins: 1, draws: 1, losses: 5, goalsFor: 9, goalsAgainst: 11, goalDifference: -2, points: 4 },
    { rank: 19, teamName: "東京ヴェルディ", played: 7, wins: 0, draws: 4, losses: 3, goalsFor: 3, goalsAgainst: 9, goalDifference: -6, points: 4 },
    { rank: 20, teamName: "ジェフユナイテッド千葉", played: 7, wins: 1, draws: 1, losses: 5, goalsFor: 6, goalsAgainst: 16, goalDifference: -10, points: 4 },
  ],
};
