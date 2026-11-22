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
/** Jリーグ公式2026/11/21 18:13更新（第15節終了時点）を照合。全20クラブを公式順位順で保持。 */
export const j1Standings: LeagueStandings = {
  competition: "2026／27 明治安田J1リーグ", asOfLabel: "2026年11月21日18:13更新",
  sourceUrl: "https://www.jleague.jp/j1/standings/2026-27/",
  entries: [
    { rank: 1, teamName: "FC東京", played: 15, wins: 11, draws: 3, losses: 1, goalsFor: 36, goalsAgainst: 8, goalDifference: 28, points: 36 },
    { rank: 2, teamName: "サンフレッチェ広島", played: 15, wins: 9, draws: 4, losses: 2, goalsFor: 34, goalsAgainst: 12, goalDifference: 22, points: 31 },
    { rank: 3, teamName: "柏レイソル", played: 15, wins: 10, draws: 1, losses: 4, goalsFor: 31, goalsAgainst: 21, goalDifference: 10, points: 31 },
    { rank: 4, teamName: "FC町田ゼルビア", played: 15, wins: 8, draws: 6, losses: 1, goalsFor: 30, goalsAgainst: 10, goalDifference: 20, points: 30 },
    { rank: 5, teamName: "ヴィッセル神戸", played: 15, wins: 8, draws: 3, losses: 4, goalsFor: 24, goalsAgainst: 16, goalDifference: 8, points: 27 },
    { rank: 6, teamName: "川崎フロンターレ", played: 15, wins: 7, draws: 4, losses: 4, goalsFor: 29, goalsAgainst: 24, goalDifference: 5, points: 25 },
    { rank: 7, teamName: "鹿島アントラーズ", played: 15, wins: 7, draws: 3, losses: 5, goalsFor: 30, goalsAgainst: 25, goalDifference: 5, points: 24 },
    { rank: 8, teamName: "横浜F・マリノス", played: 15, wins: 5, draws: 8, losses: 2, goalsFor: 23, goalsAgainst: 17, goalDifference: 6, points: 23 },
    { rank: 9, teamName: "浦和レッズ", played: 15, wins: 7, draws: 1, losses: 7, goalsFor: 24, goalsAgainst: 31, goalDifference: -7, points: 22 },
    { rank: 10, teamName: "ファジアーノ岡山", played: 15, wins: 6, draws: 2, losses: 7, goalsFor: 17, goalsAgainst: 22, goalDifference: -5, points: 20 },
    { rank: 11, teamName: "京都サンガF.C.", played: 15, wins: 5, draws: 4, losses: 6, goalsFor: 21, goalsAgainst: 24, goalDifference: -3, points: 19 },
    { rank: 12, teamName: "セレッソ大阪", played: 15, wins: 4, draws: 5, losses: 6, goalsFor: 16, goalsAgainst: 28, goalDifference: -12, points: 17 },
    { rank: 13, teamName: "ジェフユナイテッド千葉", played: 15, wins: 4, draws: 4, losses: 7, goalsFor: 17, goalsAgainst: 24, goalDifference: -7, points: 16 },
    { rank: 14, teamName: "名古屋グランパス", played: 15, wins: 4, draws: 3, losses: 8, goalsFor: 15, goalsAgainst: 23, goalDifference: -8, points: 15 },
    { rank: 15, teamName: "東京ヴェルディ", played: 15, wins: 3, draws: 6, losses: 6, goalsFor: 12, goalsAgainst: 22, goalDifference: -10, points: 15 },
    { rank: 16, teamName: "清水エスパルス", played: 15, wins: 4, draws: 3, losses: 8, goalsFor: 11, goalsAgainst: 24, goalDifference: -13, points: 15 },
    { rank: 17, teamName: "V・ファーレン長崎", played: 15, wins: 3, draws: 5, losses: 7, goalsFor: 17, goalsAgainst: 22, goalDifference: -5, points: 14 },
    { rank: 18, teamName: "ガンバ大阪", played: 15, wins: 2, draws: 6, losses: 7, goalsFor: 16, goalsAgainst: 25, goalDifference: -9, points: 12 },
    { rank: 19, teamName: "水戸ホーリーホック", played: 15, wins: 3, draws: 3, losses: 9, goalsFor: 14, goalsAgainst: 27, goalDifference: -13, points: 12 },
    { rank: 20, teamName: "アビスパ福岡", played: 15, wins: 2, draws: 2, losses: 11, goalsFor: 14, goalsAgainst: 26, goalDifference: -12, points: 8 },
  ],
};
