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
/** Jリーグ公式2026/11/8 19:24更新（第14節終了時点）を照合。全20クラブを公式順位順で保持。 */
export const j1Standings: LeagueStandings = {
  competition: "2026／27 明治安田J1リーグ", asOfLabel: "2026年11月8日19:24更新",
  sourceUrl: "https://www.jleague.jp/j1/standings/2026-27/",
  entries: [
    { rank: 1, teamName: "FC東京", played: 14, wins: 10, draws: 3, losses: 1, goalsFor: 33, goalsAgainst: 8, goalDifference: 25, points: 33 },
    { rank: 2, teamName: "柏レイソル", played: 14, wins: 10, draws: 1, losses: 3, goalsFor: 31, goalsAgainst: 20, goalDifference: 11, points: 31 },
    { rank: 3, teamName: "サンフレッチェ広島", played: 14, wins: 9, draws: 3, losses: 2, goalsFor: 32, goalsAgainst: 10, goalDifference: 22, points: 30 },
    { rank: 4, teamName: "FC町田ゼルビア", played: 14, wins: 8, draws: 5, losses: 1, goalsFor: 30, goalsAgainst: 10, goalDifference: 20, points: 29 },
    { rank: 5, teamName: "ヴィッセル神戸", played: 14, wins: 8, draws: 3, losses: 3, goalsFor: 23, goalsAgainst: 14, goalDifference: 9, points: 27 },
    { rank: 6, teamName: "鹿島アントラーズ", played: 14, wins: 7, draws: 2, losses: 5, goalsFor: 29, goalsAgainst: 24, goalDifference: 5, points: 23 },
    { rank: 7, teamName: "横浜F・マリノス", played: 14, wins: 5, draws: 7, losses: 2, goalsFor: 21, goalsAgainst: 15, goalDifference: 6, points: 22 },
    { rank: 8, teamName: "川崎フロンターレ", played: 14, wins: 6, draws: 4, losses: 4, goalsFor: 28, goalsAgainst: 24, goalDifference: 4, points: 22 },
    { rank: 9, teamName: "浦和レッズ", played: 14, wins: 7, draws: 1, losses: 6, goalsFor: 23, goalsAgainst: 29, goalDifference: -6, points: 22 },
    { rank: 10, teamName: "ファジアーノ岡山", played: 14, wins: 5, draws: 2, losses: 7, goalsFor: 16, goalsAgainst: 22, goalDifference: -6, points: 17 },
    { rank: 11, teamName: "セレッソ大阪", played: 14, wins: 4, draws: 5, losses: 5, goalsFor: 16, goalsAgainst: 25, goalDifference: -9, points: 17 },
    { rank: 12, teamName: "京都サンガF.C.", played: 14, wins: 4, draws: 4, losses: 6, goalsFor: 19, goalsAgainst: 23, goalDifference: -4, points: 16 },
    { rank: 13, teamName: "名古屋グランパス", played: 14, wins: 4, draws: 2, losses: 8, goalsFor: 15, goalsAgainst: 23, goalDifference: -8, points: 14 },
    { rank: 14, teamName: "東京ヴェルディ", played: 14, wins: 3, draws: 5, losses: 6, goalsFor: 12, goalsAgainst: 22, goalDifference: -10, points: 14 },
    { rank: 15, teamName: "清水エスパルス", played: 14, wins: 4, draws: 2, losses: 8, goalsFor: 10, goalsAgainst: 23, goalDifference: -13, points: 14 },
    { rank: 16, teamName: "V・ファーレン長崎", played: 14, wins: 3, draws: 4, losses: 7, goalsFor: 17, goalsAgainst: 22, goalDifference: -5, points: 13 },
    { rank: 17, teamName: "ジェフユナイテッド千葉", played: 14, wins: 3, draws: 4, losses: 7, goalsFor: 16, goalsAgainst: 24, goalDifference: -8, points: 13 },
    { rank: 18, teamName: "ガンバ大阪", played: 14, wins: 2, draws: 6, losses: 6, goalsFor: 16, goalsAgainst: 24, goalDifference: -8, points: 12 },
    { rank: 19, teamName: "水戸ホーリーホック", played: 14, wins: 2, draws: 3, losses: 9, goalsFor: 12, goalsAgainst: 26, goalDifference: -14, points: 9 },
    { rank: 20, teamName: "アビスパ福岡", played: 14, wins: 2, draws: 2, losses: 10, goalsFor: 14, goalsAgainst: 25, goalDifference: -11, points: 8 },
  ],
};
