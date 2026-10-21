import type { LeagueStandings } from "@/types/standings";

/** 10/9試合前プレビューの履歴スナップショット。最新順位で過去の見立てを上書きしない。 */
export const hiroshimaPreMatchStandings: LeagueStandings = {
  competition: "2026／27 明治安田J1リーグ", asOfLabel: "2026年10月9日21:29更新",
  sourceUrl: "https://www.jleague.jp/j1/standings/2026-27/",
  entries: [
    { rank: 3, teamName: "サンフレッチェ広島", played: 8, wins: 5, draws: 2, losses: 1, goalsFor: 20, goalsAgainst: 6, goalDifference: 14, points: 17 },
    { rank: 19, teamName: "東京ヴェルディ", played: 8, wins: 0, draws: 4, losses: 4, goalsFor: 4, goalsAgainst: 12, goalDifference: -8, points: 4 },
  ],
};
/** Jリーグ公式2026/10/21 21:59更新。全20クラブを公式順位順で保持。 */
export const j1Standings: LeagueStandings = {
  competition: "2026／27 明治安田J1リーグ", asOfLabel: "2026年10月21日21:59更新",
  sourceUrl: "https://www.jleague.jp/j1/standings/2026-27/",
  entries: [
    { rank: 1, teamName: "FC町田ゼルビア", played: 11, wins: 8, draws: 2, losses: 1, goalsFor: 30, goalsAgainst: 10, goalDifference: 20, points: 26 },
    { rank: 2, teamName: "FC東京", played: 11, wins: 7, draws: 3, losses: 1, goalsFor: 21, goalsAgainst: 8, goalDifference: 13, points: 24 },
    { rank: 3, teamName: "サンフレッチェ広島", played: 11, wins: 7, draws: 2, losses: 2, goalsFor: 25, goalsAgainst: 10, goalDifference: 15, points: 23 },
    { rank: 4, teamName: "ヴィッセル神戸", played: 11, wins: 7, draws: 1, losses: 3, goalsFor: 18, goalsAgainst: 11, goalDifference: 7, points: 22 },
    { rank: 5, teamName: "柏レイソル", played: 11, wins: 7, draws: 1, losses: 3, goalsFor: 22, goalsAgainst: 17, goalDifference: 5, points: 22 },
    { rank: 6, teamName: "鹿島アントラーズ", played: 11, wins: 6, draws: 2, losses: 3, goalsFor: 23, goalsAgainst: 18, goalDifference: 5, points: 20 },
    { rank: 7, teamName: "川崎フロンターレ", played: 11, wins: 5, draws: 4, losses: 2, goalsFor: 23, goalsAgainst: 17, goalDifference: 6, points: 19 },
    { rank: 8, teamName: "浦和レッズ", played: 11, wins: 6, draws: 0, losses: 5, goalsFor: 20, goalsAgainst: 23, goalDifference: -3, points: 18 },
    { rank: 9, teamName: "横浜F・マリノス", played: 11, wins: 4, draws: 5, losses: 2, goalsFor: 15, goalsAgainst: 11, goalDifference: 4, points: 17 },
    { rank: 10, teamName: "ファジアーノ岡山", played: 11, wins: 5, draws: 1, losses: 5, goalsFor: 14, goalsAgainst: 15, goalDifference: -1, points: 16 },
    { rank: 11, teamName: "清水エスパルス", played: 11, wins: 4, draws: 2, losses: 5, goalsFor: 10, goalsAgainst: 16, goalDifference: -6, points: 14 },
    { rank: 12, teamName: "名古屋グランパス", played: 11, wins: 4, draws: 1, losses: 6, goalsFor: 13, goalsAgainst: 17, goalDifference: -4, points: 13 },
    { rank: 13, teamName: "セレッソ大阪", played: 11, wins: 3, draws: 4, losses: 4, goalsFor: 10, goalsAgainst: 17, goalDifference: -7, points: 13 },
    { rank: 14, teamName: "V・ファーレン長崎", played: 11, wins: 3, draws: 3, losses: 5, goalsFor: 15, goalsAgainst: 18, goalDifference: -3, points: 12 },
    { rank: 15, teamName: "ガンバ大阪", played: 11, wins: 2, draws: 4, losses: 5, goalsFor: 12, goalsAgainst: 19, goalDifference: -7, points: 10 },
    { rank: 16, teamName: "水戸ホーリーホック", played: 11, wins: 2, draws: 3, losses: 6, goalsFor: 12, goalsAgainst: 16, goalDifference: -4, points: 9 },
    { rank: 17, teamName: "京都サンガF.C.", played: 11, wins: 2, draws: 3, losses: 6, goalsFor: 13, goalsAgainst: 21, goalDifference: -8, points: 9 },
    { rank: 18, teamName: "アビスパ福岡", played: 11, wins: 2, draws: 1, losses: 8, goalsFor: 12, goalsAgainst: 18, goalDifference: -6, points: 7 },
    { rank: 19, teamName: "ジェフユナイテッド千葉", played: 11, wins: 1, draws: 3, losses: 7, goalsFor: 10, goalsAgainst: 22, goalDifference: -12, points: 6 },
    { rank: 20, teamName: "東京ヴェルディ", played: 11, wins: 0, draws: 5, losses: 6, goalsFor: 6, goalsAgainst: 20, goalDifference: -14, points: 5 },
  ],
};
