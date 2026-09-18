/**
 * J1リーグ順位表用の型。Matchドメイン（types/domain.ts）とは独立した型群として定義する
 * （順位表は個別試合に紐付かない、リーグ全体のスナップショットのため）。
 */
export interface LeagueStandingEntry {
  rank: number;
  teamName: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  /**
   * ノックアウト系カップ戦（例：WEリーグ クラシエカップ）でのみ設定する、90分/PK戦の
   * 勝敗内訳。J1 STANDINGSのような通常リーグの表では未設定のまま
   * （既存TOP standingsの表示・型を壊さない）。設定する場合は
   * regulationWins + penaltyWins === wins、regulationLosses + penaltyLosses === losses
   * を満たす値のみを登録する（推測で埋めない）。
   */
  regulationWins?: number;
  penaltyWins?: number;
  penaltyLosses?: number;
  regulationLosses?: number;
  /**
   * 直近の試合結果（例：U-21 東西リーグラウンド）。存在する結果のみを保持し、
   * 消化試合数に満たない分を"-"やnullで埋めない。J1 STANDINGS等では未設定のまま
   * （既存表示・型を壊さない）。
   */
  recentForm?: Array<"W" | "D" | "L">;
}

export interface LeagueStandings {
  competition: string;
  /** 公式ページに表示されている更新時点の表記をそのまま使う（推測で断定しない）。 */
  asOfLabel: string;
  sourceUrl?: string;
  entries: LeagueStandingEntry[];
}
