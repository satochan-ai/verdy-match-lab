import type { LeagueStandings } from "@/types/standings";

/**
 * 2026/27 WEリーグ 順位表。
 * 出典：ユーザー提供の公式順位表データ（一次入力）。
 * 公式ページに表示されている列（順位・チーム名・勝点・試合数・勝敗分・得点・失点・得失点差）
 * のみを保持し、存在しない列は追加しない。全12クラブを提供値どおり保持する。
 * 数値は推測・補完しない。同順位は許可する（rankの重複を禁止しない）。
 */
export const weLeagueStandings: LeagueStandings = {
  competition: "2026/27 WEリーグ",
  asOfLabel: "2026/09/06 18:57 現在",
  entries: [
    { rank: 1, teamName: "三菱重工浦和レッズレディース", played: 3, wins: 3, draws: 0, losses: 0, goalsFor: 9, goalsAgainst: 2, goalDifference: 7, points: 9 },
    { rank: 2, teamName: "INAC神戸レオネッサ", played: 4, wins: 2, draws: 1, losses: 1, goalsFor: 9, goalsAgainst: 6, goalDifference: 3, points: 7 },
    { rank: 3, teamName: "日テレ・東京ヴェルディベレーザ", played: 3, wins: 2, draws: 0, losses: 1, goalsFor: 7, goalsAgainst: 5, goalDifference: 2, points: 6 },
    { rank: 4, teamName: "サンフレッチェ広島レジーナ", played: 3, wins: 2, draws: 0, losses: 1, goalsFor: 4, goalsAgainst: 2, goalDifference: 2, points: 6 },
    { rank: 5, teamName: "セレッソ大阪ヤンマーレディース", played: 3, wins: 1, draws: 1, losses: 1, goalsFor: 4, goalsAgainst: 3, goalDifference: 1, points: 4 },
    { rank: 6, teamName: "アルビレックス新潟レディース", played: 3, wins: 1, draws: 1, losses: 1, goalsFor: 5, goalsAgainst: 5, goalDifference: 0, points: 4 },
    { rank: 7, teamName: "ちふれASエルフェン埼玉", played: 3, wins: 1, draws: 1, losses: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 4 },
    { rank: 8, teamName: "ジェフ千葉レディース", played: 3, wins: 1, draws: 0, losses: 2, goalsFor: 4, goalsAgainst: 5, goalDifference: -1, points: 3 },
    { rank: 9, teamName: "マイナビ仙台", played: 3, wins: 1, draws: 0, losses: 2, goalsFor: 4, goalsAgainst: 6, goalDifference: -2, points: 3 },
    { rank: 10, teamName: "RB大宮アルディージャWOMEN", played: 3, wins: 1, draws: 0, losses: 2, goalsFor: 2, goalsAgainst: 4, goalDifference: -2, points: 3 },
    { rank: 11, teamName: "ノジマステラ神奈川相模原", played: 3, wins: 1, draws: 0, losses: 2, goalsFor: 3, goalsAgainst: 9, goalDifference: -6, points: 3 },
    { rank: 12, teamName: "AC長野パルセイロ・レディース", played: 4, wins: 0, draws: 2, losses: 2, goalsFor: 4, goalsAgainst: 8, goalDifference: -4, points: 2 },
  ],
};

/**
 * 2026/27 WEリーグ クラシエカップ リーグステージ 順位表。
 * 出典：ユーザー提供の公式順位表データ（一次入力、2026/09/27 19:57時点）。
 * 90分勝/PK勝/PK負/敗の列解釈は既存の数値構造（wins = regulationWins + penaltyWins、
 * losses = regulationLosses + penaltyLosses、draws = 0）を踏襲し、提供された勝点との
 * 整合（90分勝×3 + PK勝×2 + PK負×1 + 敗×0）を確認済み。公式ページの列名が確認できた
 * 場合は、この解釈より公式表記を優先する。全12クラブを提供値どおり保持する
 * （今回は同順位なし）。
 */
export const kracieCupStandings: LeagueStandings = {
  competition: "2026/27 WEリーグ クラシエカップ",
  asOfLabel: "2026/09/27 19:57 現在",
  entries: [
    { rank: 1, teamName: "ジェフ千葉レディース", played: 4, wins: 4, draws: 0, losses: 0, goalsFor: 8, goalsAgainst: 5, goalDifference: 3, points: 11, regulationWins: 3, penaltyWins: 1, penaltyLosses: 0, regulationLosses: 0 },
    { rank: 2, teamName: "ノジマステラ神奈川相模原", played: 4, wins: 3, draws: 0, losses: 1, goalsFor: 7, goalsAgainst: 2, goalDifference: 5, points: 10, regulationWins: 3, penaltyWins: 0, penaltyLosses: 1, regulationLosses: 0 },
    { rank: 3, teamName: "日テレ・東京ヴェルディベレーザ", played: 4, wins: 3, draws: 0, losses: 1, goalsFor: 9, goalsAgainst: 6, goalDifference: 3, points: 9, regulationWins: 3, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 1 },
    { rank: 4, teamName: "RB大宮アルディージャWOMEN", played: 4, wins: 2, draws: 0, losses: 2, goalsFor: 6, goalsAgainst: 4, goalDifference: 2, points: 7, regulationWins: 2, penaltyWins: 0, penaltyLosses: 1, regulationLosses: 1 },
    { rank: 5, teamName: "ちふれASエルフェン埼玉", played: 4, wins: 3, draws: 0, losses: 1, goalsFor: 5, goalsAgainst: 5, goalDifference: 0, points: 7, regulationWins: 1, penaltyWins: 2, penaltyLosses: 0, regulationLosses: 1 },
    { rank: 6, teamName: "マイナビ仙台", played: 4, wins: 2, draws: 0, losses: 2, goalsFor: 4, goalsAgainst: 4, goalDifference: 0, points: 7, regulationWins: 2, penaltyWins: 0, penaltyLosses: 1, regulationLosses: 1 },
    { rank: 7, teamName: "サンフレッチェ広島レジーナ", played: 4, wins: 2, draws: 0, losses: 2, goalsFor: 6, goalsAgainst: 5, goalDifference: 1, points: 6, regulationWins: 2, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 2 },
    { rank: 8, teamName: "セレッソ大阪ヤンマーレディース", played: 4, wins: 2, draws: 0, losses: 2, goalsFor: 7, goalsAgainst: 7, goalDifference: 0, points: 6, regulationWins: 2, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 2 },
    { rank: 9, teamName: "アルビレックス新潟レディース", played: 4, wins: 2, draws: 0, losses: 2, goalsFor: 5, goalsAgainst: 6, goalDifference: -1, points: 5, regulationWins: 1, penaltyWins: 1, penaltyLosses: 0, regulationLosses: 2 },
    { rank: 10, teamName: "三菱重工浦和レッズレディース", played: 4, wins: 1, draws: 0, losses: 3, goalsFor: 6, goalsAgainst: 6, goalDifference: 0, points: 4, regulationWins: 1, penaltyWins: 0, penaltyLosses: 1, regulationLosses: 2 },
    { rank: 11, teamName: "INAC神戸レオネッサ", played: 4, wins: 0, draws: 0, losses: 4, goalsFor: 5, goalsAgainst: 11, goalDifference: -6, points: 0, regulationWins: 0, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 4 },
    { rank: 12, teamName: "AC長野パルセイロ・レディース", played: 4, wins: 0, draws: 0, losses: 4, goalsFor: 0, goalsAgainst: 7, goalDifference: -7, points: 0, regulationWins: 0, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 4 },
  ],
};
