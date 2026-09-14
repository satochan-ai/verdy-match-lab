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
}

export interface LeagueStandings {
  competition: string;
  /** 公式ページに表示されている更新時点の表記をそのまま使う（推測で断定しない）。 */
  asOfLabel: string;
  sourceUrl?: string;
  entries: LeagueStandingEntry[];
}
