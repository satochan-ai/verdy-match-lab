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
/** Jリーグ公式2026/11/1 18:28更新（第13節終了時点）を同日照合。全20クラブを公式順位順で保持。 */
export const j1Standings: LeagueStandings = {
  competition: "2026／27 明治安田J1リーグ", asOfLabel: "2026年11月1日18:28更新",
  sourceUrl: "https://www.jleague.jp/j1/standings/2026-27/",
  entries: [
    { rank: 1, teamName: "FC東京", played: 13, wins: 9, draws: 3, losses: 1, goalsFor: 31, goalsAgainst: 8, goalDifference: 23, points: 30 },
    { rank: 2, teamName: "サンフレッチェ広島", played: 13, wins: 9, draws: 2, losses: 2, goalsFor: 32, goalsAgainst: 10, goalDifference: 22, points: 29 },
    { rank: 3, teamName: "FC町田ゼルビア", played: 13, wins: 8, draws: 4, losses: 1, goalsFor: 30, goalsAgainst: 10, goalDifference: 20, points: 28 },
    { rank: 4, teamName: "柏レイソル", played: 13, wins: 9, draws: 1, losses: 3, goalsFor: 29, goalsAgainst: 19, goalDifference: 10, points: 28 },
    { rank: 5, teamName: "ヴィッセル神戸", played: 13, wins: 8, draws: 2, losses: 3, goalsFor: 21, goalsAgainst: 12, goalDifference: 9, points: 26 },
    { rank: 6, teamName: "鹿島アントラーズ", played: 13, wins: 7, draws: 2, losses: 4, goalsFor: 29, goalsAgainst: 22, goalDifference: 7, points: 23 },
    { rank: 7, teamName: "川崎フロンターレ", played: 13, wins: 6, draws: 4, losses: 3, goalsFor: 27, goalsAgainst: 22, goalDifference: 5, points: 22 },
    { rank: 8, teamName: "横浜F・マリノス", played: 13, wins: 5, draws: 6, losses: 2, goalsFor: 20, goalsAgainst: 14, goalDifference: 6, points: 21 },
    { rank: 9, teamName: "浦和レッズ", played: 13, wins: 7, draws: 0, losses: 6, goalsFor: 21, goalsAgainst: 27, goalDifference: -6, points: 21 },
    { rank: 10, teamName: "ファジアーノ岡山", played: 13, wins: 5, draws: 1, losses: 7, goalsFor: 15, goalsAgainst: 21, goalDifference: -6, points: 16 },
    { rank: 11, teamName: "名古屋グランパス", played: 13, wins: 4, draws: 2, losses: 7, goalsFor: 15, goalsAgainst: 21, goalDifference: -6, points: 14 },
    { rank: 12, teamName: "セレッソ大阪", played: 13, wins: 3, draws: 5, losses: 5, goalsFor: 13, goalsAgainst: 23, goalDifference: -10, points: 14 },
    { rank: 13, teamName: "清水エスパルス", played: 13, wins: 4, draws: 2, losses: 7, goalsFor: 10, goalsAgainst: 22, goalDifference: -12, points: 14 },
    { rank: 14, teamName: "京都サンガF.C.", played: 13, wins: 3, draws: 4, losses: 6, goalsFor: 17, goalsAgainst: 23, goalDifference: -6, points: 13 },
    { rank: 15, teamName: "V・ファーレン長崎", played: 13, wins: 3, draws: 3, losses: 7, goalsFor: 16, goalsAgainst: 21, goalDifference: -5, points: 12 },
    { rank: 16, teamName: "ガンバ大阪", played: 13, wins: 2, draws: 6, losses: 5, goalsFor: 14, goalsAgainst: 21, goalDifference: -7, points: 12 },
    { rank: 17, teamName: "東京ヴェルディ", played: 13, wins: 2, draws: 5, losses: 6, goalsFor: 11, goalsAgainst: 22, goalDifference: -11, points: 11 },
    { rank: 18, teamName: "ジェフユナイテッド千葉", played: 13, wins: 2, draws: 4, losses: 7, goalsFor: 15, goalsAgainst: 24, goalDifference: -9, points: 10 },
    { rank: 19, teamName: "水戸ホーリーホック", played: 13, wins: 2, draws: 3, losses: 8, goalsFor: 12, goalsAgainst: 25, goalDifference: -13, points: 9 },
    { rank: 20, teamName: "アビスパ福岡", played: 13, wins: 2, draws: 1, losses: 10, goalsFor: 13, goalsAgainst: 24, goalDifference: -11, points: 7 },
  ],
};
