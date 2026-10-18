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
/** Jリーグ公式2026/10/17 21:18更新。全20クラブを公式順位順で保持。 */
export const j1Standings: LeagueStandings = {
  competition: "2026／27 明治安田J1リーグ", asOfLabel: "2026年10月17日21:18更新",
  sourceUrl: "https://www.jleague.jp/j1/standings/2026-27/",
  entries: [
    { rank: 1, teamName: "サンフレッチェ広島", played: 10, wins: 7, draws: 2, losses: 1, goalsFor: 25, goalsAgainst: 6, goalDifference: 19, points: 23 },
    { rank: 2, teamName: "FC東京", played: 10, wins: 7, draws: 2, losses: 1, goalsFor: 21, goalsAgainst: 8, goalDifference: 13, points: 23 },
    { rank: 3, teamName: "柏レイソル", played: 10, wins: 7, draws: 0, losses: 3, goalsFor: 22, goalsAgainst: 17, goalDifference: 5, points: 21 },
    { rank: 4, teamName: "FC町田ゼルビア", played: 9, wins: 6, draws: 2, losses: 1, goalsFor: 22, goalsAgainst: 10, goalDifference: 12, points: 20 },
    { rank: 5, teamName: "鹿島アントラーズ", played: 10, wins: 6, draws: 1, losses: 3, goalsFor: 21, goalsAgainst: 16, goalDifference: 5, points: 19 },
    { rank: 6, teamName: "ヴィッセル神戸", played: 9, wins: 6, draws: 1, losses: 2, goalsFor: 14, goalsAgainst: 9, goalDifference: 5, points: 19 },
    { rank: 7, teamName: "川崎フロンターレ", played: 10, wins: 4, draws: 4, losses: 2, goalsFor: 21, goalsAgainst: 16, goalDifference: 5, points: 16 },
    { rank: 8, teamName: "横浜F・マリノス", played: 10, wins: 4, draws: 4, losses: 2, goalsFor: 13, goalsAgainst: 9, goalDifference: 4, points: 16 },
    { rank: 9, teamName: "浦和レッズ", played: 10, wins: 5, draws: 0, losses: 5, goalsFor: 17, goalsAgainst: 21, goalDifference: -4, points: 15 },
    { rank: 10, teamName: "清水エスパルス", played: 10, wins: 4, draws: 2, losses: 4, goalsFor: 10, goalsAgainst: 11, goalDifference: -1, points: 14 },
    { rank: 11, teamName: "ファジアーノ岡山", played: 9, wins: 4, draws: 1, losses: 4, goalsFor: 12, goalsAgainst: 12, goalDifference: 0, points: 13 },
    { rank: 12, teamName: "名古屋グランパス", played: 10, wins: 4, draws: 0, losses: 6, goalsFor: 12, goalsAgainst: 16, goalDifference: -4, points: 12 },
    { rank: 13, teamName: "セレッソ大阪", played: 10, wins: 3, draws: 3, losses: 4, goalsFor: 9, goalsAgainst: 16, goalDifference: -7, points: 12 },
    { rank: 14, teamName: "水戸ホーリーホック", played: 10, wins: 2, draws: 3, losses: 5, goalsFor: 12, goalsAgainst: 14, goalDifference: -2, points: 9 },
    { rank: 15, teamName: "V・ファーレン長崎", played: 10, wins: 2, draws: 3, losses: 5, goalsFor: 11, goalsAgainst: 18, goalDifference: -7, points: 9 },
    { rank: 16, teamName: "京都サンガF.C.", played: 10, wins: 2, draws: 2, losses: 6, goalsFor: 11, goalsAgainst: 19, goalDifference: -8, points: 8 },
    { rank: 17, teamName: "アビスパ福岡", played: 9, wins: 2, draws: 1, losses: 6, goalsFor: 11, goalsAgainst: 13, goalDifference: -2, points: 7 },
    { rank: 18, teamName: "ガンバ大阪", played: 10, wins: 1, draws: 4, losses: 5, goalsFor: 10, goalsAgainst: 18, goalDifference: -8, points: 7 },
    { rank: 19, teamName: "ジェフユナイテッド千葉", played: 10, wins: 1, draws: 3, losses: 6, goalsFor: 8, goalsAgainst: 19, goalDifference: -11, points: 6 },
    { rank: 20, teamName: "東京ヴェルディ", played: 10, wins: 0, draws: 4, losses: 6, goalsFor: 4, goalsAgainst: 18, goalDifference: -14, points: 4 },
  ],
};
