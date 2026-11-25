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
/** Jリーグ公式2026/11/25 21:59更新（第16節11月25日開催分終了時点）を照合。全20クラブを公式順位順で保持。 */
export const j1Standings: LeagueStandings = {
  competition: "2026／27 明治安田J1リーグ", asOfLabel: "2026年11月25日21:59更新",
  sourceUrl: "https://www.jleague.jp/j1/standings/2026-27/",
  entries: [
    { rank: 1, teamName: "FC東京", played: 16, wins: 11, draws: 4, losses: 1, goalsFor: 38, goalsAgainst: 10, goalDifference: 28, points: 37 },
    { rank: 2, teamName: "サンフレッチェ広島", played: 16, wins: 9, draws: 5, losses: 2, goalsFor: 36, goalsAgainst: 14, goalDifference: 22, points: 32 },
    { rank: 3, teamName: "柏レイソル", played: 15, wins: 10, draws: 1, losses: 4, goalsFor: 31, goalsAgainst: 21, goalDifference: 10, points: 31 },
    { rank: 4, teamName: "FC町田ゼルビア", played: 15, wins: 8, draws: 6, losses: 1, goalsFor: 30, goalsAgainst: 10, goalDifference: 20, points: 30 },
    { rank: 5, teamName: "川崎フロンターレ", played: 16, wins: 8, draws: 4, losses: 4, goalsFor: 31, goalsAgainst: 25, goalDifference: 6, points: 28 },
    { rank: 6, teamName: "ヴィッセル神戸", played: 15, wins: 8, draws: 3, losses: 4, goalsFor: 24, goalsAgainst: 16, goalDifference: 8, points: 27 },
    { rank: 7, teamName: "横浜F・マリノス", played: 16, wins: 6, draws: 8, losses: 2, goalsFor: 25, goalsAgainst: 18, goalDifference: 7, points: 26 },
    { rank: 8, teamName: "鹿島アントラーズ", played: 15, wins: 7, draws: 3, losses: 5, goalsFor: 30, goalsAgainst: 25, goalDifference: 5, points: 24 },
    { rank: 9, teamName: "ファジアーノ岡山", played: 16, wins: 7, draws: 2, losses: 7, goalsFor: 19, goalsAgainst: 22, goalDifference: -3, points: 23 },
    { rank: 10, teamName: "浦和レッズ", played: 16, wins: 7, draws: 2, losses: 7, goalsFor: 26, goalsAgainst: 33, goalDifference: -7, points: 23 },
    { rank: 11, teamName: "京都サンガF.C.", played: 15, wins: 5, draws: 4, losses: 6, goalsFor: 21, goalsAgainst: 24, goalDifference: -3, points: 19 },
    { rank: 12, teamName: "名古屋グランパス", played: 16, wins: 5, draws: 3, losses: 8, goalsFor: 17, goalsAgainst: 24, goalDifference: -7, points: 18 },
    { rank: 13, teamName: "セレッソ大阪", played: 16, wins: 4, draws: 6, losses: 6, goalsFor: 18, goalsAgainst: 30, goalDifference: -12, points: 18 },
    { rank: 14, teamName: "ジェフユナイテッド千葉", played: 16, wins: 4, draws: 4, losses: 8, goalsFor: 18, goalsAgainst: 26, goalDifference: -8, points: 16 },
    { rank: 15, teamName: "東京ヴェルディ", played: 16, wins: 3, draws: 6, losses: 7, goalsFor: 12, goalsAgainst: 23, goalDifference: -11, points: 15 },
    { rank: 16, teamName: "水戸ホーリーホック", played: 16, wins: 4, draws: 3, losses: 9, goalsFor: 15, goalsAgainst: 27, goalDifference: -12, points: 15 },
    { rank: 17, teamName: "清水エスパルス", played: 16, wins: 4, draws: 3, losses: 9, goalsFor: 11, goalsAgainst: 26, goalDifference: -15, points: 15 },
    { rank: 18, teamName: "V・ファーレン長崎", played: 16, wins: 3, draws: 5, losses: 8, goalsFor: 18, goalsAgainst: 24, goalDifference: -6, points: 14 },
    { rank: 19, teamName: "ガンバ大阪", played: 15, wins: 2, draws: 6, losses: 7, goalsFor: 16, goalsAgainst: 25, goalDifference: -9, points: 12 },
    { rank: 20, teamName: "アビスパ福岡", played: 16, wins: 2, draws: 2, losses: 12, goalsFor: 15, goalsAgainst: 28, goalDifference: -13, points: 8 },
  ],
};
