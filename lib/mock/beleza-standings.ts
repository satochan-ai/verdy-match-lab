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
 * 2026/27 WEリーグ クラシエカップ 順位表。
 * 出典：ユーザー提供の公式順位表データ（一次入力）。
 * ユーザー貼付元ではheader行が欠けていたため、90分勝/PK勝/PK敗/90分敗の列解釈は
 * ユーザー提供の順位決定ルールおよび数値構造（wins = regulationWins + penaltyWins、
 * losses = regulationLosses + penaltyLosses、draws = 0）に基づく。公式ページの列名が
 * 確認できた場合は、この解釈より公式表記を優先する。
 * 全12クラブを提供値どおり保持し、同順位（2位・4位・7位・11位に重複）を許可する。
 */
export const kracieCupStandings: LeagueStandings = {
  competition: "2026/27 WEリーグ クラシエカップ",
  asOfLabel: "2026/09/13 19:57 現在",
  entries: [
    { rank: 1, teamName: "サンフレッチェ広島レジーナ", played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 3, regulationWins: 1, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 0 },
    { rank: 2, teamName: "RB大宮アルディージャWOMEN", played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 2, goalsAgainst: 0, goalDifference: 2, points: 3, regulationWins: 1, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 0 },
    { rank: 2, teamName: "ノジマステラ神奈川相模原", played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 2, goalsAgainst: 0, goalDifference: 2, points: 3, regulationWins: 1, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 0 },
    { rank: 4, teamName: "ちふれASエルフェン埼玉", played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 3, regulationWins: 1, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 0 },
    { rank: 4, teamName: "ジェフ千葉レディース", played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 3, regulationWins: 1, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 0 },
    { rank: 4, teamName: "日テレ・東京ヴェルディベレーザ", played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 3, regulationWins: 1, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 0 },
    { rank: 7, teamName: "三菱重工浦和レッズレディース", played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 0, regulationWins: 0, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 1 },
    { rank: 7, teamName: "セレッソ大阪ヤンマーレディース", played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 0, regulationWins: 0, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 1 },
    { rank: 7, teamName: "INAC神戸レオネッサ", played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 0, regulationWins: 0, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 1 },
    { rank: 10, teamName: "アルビレックス新潟レディース", played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 0, regulationWins: 0, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 1 },
    { rank: 11, teamName: "マイナビ仙台", played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0, regulationWins: 0, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 1 },
    { rank: 11, teamName: "AC長野パルセイロ・レディース", played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0, regulationWins: 0, penaltyWins: 0, penaltyLosses: 0, regulationLosses: 1 },
  ],
};
