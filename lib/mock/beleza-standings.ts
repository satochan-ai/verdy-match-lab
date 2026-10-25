import type { LeagueStandings } from "@/types/standings";

/**
 * 2026/27 WEリーグ 順位表。
 * 出典：WEリーグ公式順位表（2026/10/25 15:58更新）。
 * 公式ページに表示されている列（順位・チーム名・勝点・試合数・勝敗分・得点・失点・得失点差）
 * のみを保持し、存在しない列は追加しない。全12クラブを提供値どおり保持する。
 * 数値は推測・補完しない。同順位は許可する（rankの重複を禁止しない）。
 */
export const weLeagueStandings: LeagueStandings = {
  competition: "2026/27 WEリーグ",
  asOfLabel: "2026/10/25 15:58 現在",
  sourceUrl: "https://weleague.jp/standings/",
  entries: [
    {"rank":1,"teamName":"三菱重工浦和レッズレディース","played":5,"wins":4,"draws":0,"losses":1,"goalsFor":12,"goalsAgainst":4,"goalDifference":8,"points":12},
    {"rank":2,"teamName":"日テレ・東京ヴェルディベレーザ","played":5,"wins":4,"draws":0,"losses":1,"goalsFor":14,"goalsAgainst":8,"goalDifference":6,"points":12},
    {"rank":3,"teamName":"ジェフ千葉レディース","played":6,"wins":4,"draws":0,"losses":2,"goalsFor":9,"goalsAgainst":7,"goalDifference":2,"points":12},
    {"rank":4,"teamName":"INAC神戸レオネッサ","played":7,"wins":3,"draws":1,"losses":3,"goalsFor":14,"goalsAgainst":13,"goalDifference":1,"points":10},
    {"rank":5,"teamName":"サンフレッチェ広島レジーナ","played":5,"wins":3,"draws":0,"losses":2,"goalsFor":7,"goalsAgainst":5,"goalDifference":2,"points":9},
    {"rank":6,"teamName":"セレッソ大阪ヤンマーレディース","played":5,"wins":2,"draws":2,"losses":1,"goalsFor":8,"goalsAgainst":6,"goalDifference":2,"points":8},
    {"rank":7,"teamName":"ノジマステラ神奈川相模原","played":6,"wins":2,"draws":2,"losses":2,"goalsFor":6,"goalsAgainst":11,"goalDifference":-5,"points":8},
    {"rank":8,"teamName":"マイナビ仙台","played":6,"wins":2,"draws":1,"losses":3,"goalsFor":9,"goalsAgainst":11,"goalDifference":-2,"points":7},
    {"rank":9,"teamName":"ちふれASエルフェン埼玉","played":6,"wins":2,"draws":1,"losses":3,"goalsFor":6,"goalsAgainst":8,"goalDifference":-2,"points":7},
    {"rank":10,"teamName":"アルビレックス新潟レディース","played":6,"wins":1,"draws":2,"losses":3,"goalsFor":5,"goalsAgainst":7,"goalDifference":-2,"points":5},
    {"rank":11,"teamName":"AC長野パルセイロ・レディース","played":6,"wins":0,"draws":3,"losses":3,"goalsFor":4,"goalsAgainst":9,"goalDifference":-5,"points":3},
    {"rank":12,"teamName":"RB大宮アルディージャWOMEN","played":5,"wins":1,"draws":0,"losses":4,"goalsFor":3,"goalsAgainst":8,"goalDifference":-5,"points":3},
  ],
};

/** WEリーグ公式データサイト 2026/10/12 08:36の速報順位。全12クラブを公式順位順で保持。 */
export const kracieCupStandings: LeagueStandings = {
  competition: "2026/27 WEリーグ クラシエカップ",
  asOfLabel: "2026/10/12 08:36 現在（公式速報）",
  sourceUrl: "https://data.weleague.jp/SFNF06/?competition_frame_id=79",
  entries: [
    { rank: 1, teamName: "ジェフ千葉レディース", played: 6, wins: 5, draws: 0, losses: 1, goalsFor: 12, goalsAgainst: 8, goalDifference: 4, points: 14, regulationWins: 4, penaltyWins: 1, penaltyLosses: 0, regulationLosses: 1 },
    { rank: 2, teamName: "日テレ・東京ヴェルディベレーザ", played: 6, wins: 4, draws: 0, losses: 2, goalsFor: 14, goalsAgainst: 11, goalDifference: 3, points: 12, regulationWins: 4, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 2 },
    { rank: 3, teamName: "RB大宮アルディージャWOMEN", played: 6, wins: 4, draws: 0, losses: 2, goalsFor: 10, goalsAgainst: 7, goalDifference: 3, points: 12, regulationWins: 3, penaltyWins: 1, penaltyLosses: 1, regulationLosses: 1 },
    { rank: 4, teamName: "ノジマステラ神奈川相模原", played: 6, wins: 3, draws: 0, losses: 3, goalsFor: 9, goalsAgainst: 6, goalDifference: 3, points: 11, regulationWins: 3, penaltyWins: 0, penaltyLosses: 2, regulationLosses: 1 },
    { rank: 5, teamName: "三菱重工浦和レッズレディース", played: 6, wins: 3, draws: 0, losses: 3, goalsFor: 12, goalsAgainst: 9, goalDifference: 3, points: 10, regulationWins: 3, penaltyWins: 0, penaltyLosses: 1, regulationLosses: 2 },
    { rank: 6, teamName: "ちふれASエルフェン埼玉", played: 5, wins: 4, draws: 0, losses: 1, goalsFor: 7, goalsAgainst: 6, goalDifference: 1, points: 10, regulationWins: 2, penaltyWins: 2, penaltyLosses: 0, regulationLosses: 1 },
    { rank: 7, teamName: "サンフレッチェ広島レジーナ", played: 6, wins: 3, draws: 0, losses: 3, goalsFor: 10, goalsAgainst: 8, goalDifference: 2, points: 9, regulationWins: 3, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 3 },
    { rank: 8, teamName: "セレッソ大阪ヤンマーレディース", played: 6, wins: 3, draws: 0, losses: 3, goalsFor: 11, goalsAgainst: 11, goalDifference: 0, points: 9, regulationWins: 3, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 3 },
    { rank: 9, teamName: "マイナビ仙台", played: 6, wins: 2, draws: 0, losses: 4, goalsFor: 5, goalsAgainst: 6, goalDifference: -1, points: 8, regulationWins: 2, penaltyWins: 0, penaltyLosses: 2, regulationLosses: 2 },
    { rank: 10, teamName: "アルビレックス新潟レディース", played: 5, wins: 2, draws: 0, losses: 3, goalsFor: 6, goalsAgainst: 8, goalDifference: -2, points: 5, regulationWins: 1, penaltyWins: 1, penaltyLosses: 0, regulationLosses: 3 },
    { rank: 11, teamName: "INAC神戸レオネッサ", played: 6, wins: 2, draws: 0, losses: 4, goalsFor: 6, goalsAgainst: 12, goalDifference: -6, points: 4, regulationWins: 0, penaltyWins: 2, penaltyLosses: 0, regulationLosses: 4 },
    { rank: 12, teamName: "AC長野パルセイロ・レディース", played: 6, wins: 0, draws: 0, losses: 6, goalsFor: 1, goalsAgainst: 11, goalDifference: -10, points: 1, regulationWins: 0, penaltyWins: 0, penaltyLosses: 1, regulationLosses: 5 },
  ],
};
