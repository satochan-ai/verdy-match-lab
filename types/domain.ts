export type MatchStatus = "scheduled" | "live" | "half_time" | "finished";

export type HomeAway = "home" | "away";

export interface Team {
  id: string;
  name: string;
  isVerdy: boolean;
}

export interface KeyPlayer {
  name: string;
  note: string;
}

export interface TeamProfile {
  formation: string;
  characteristics: {
    attack: string;
    defense: string;
  };
  keyPlayers: KeyPlayer[];
  recentTrend: string;
}

export interface PredictedStarter {
  number?: number;
  name: string;
  position: string;
  alternative?: string;
}

export interface PredictedLineup {
  formation: string;
  starters: PredictedStarter[];
}

export interface PositionPlayerGroups {
  GK: string[];
  DF: string[];
  MF: string[];
  FW: string[];
}

export interface PreviousMatch {
  label: string;
  opponent: string;
  score: string;
  goals?: PreviousMatchGoal[];
  starters: PositionPlayerGroups;
  bench: PositionPlayerGroups;
}

export interface PreviousMatchGoal {
  minute: string;
  scorer: string;
  team: string;
}

export interface AvailabilityInfo {
  likelyUnavailable: {
    team: string;
    players: string[];
  }[];
  suspensionNote: string;
  ineligibleNote: string;
}

export type StrategyResult = "pending" | "hit" | "partial" | "miss";

export interface Strategy {
  orderNo: 1 | 2 | 3;
  title: string;
  description: string;
  result: StrategyResult;
  resultComment?: string;
}

export type TimeSegment =
  | "first_early"
  | "first_mid"
  | "first_late"
  | "second_early"
  | "second_mid"
  | "second_late";

export type ScoreSituation =
  | "even"
  | "lead_1"
  | "behind_1"
  | "lead_2plus"
  | "behind_2plus";

export type SpecialSituation =
  | "red_card_own"
  | "red_card_opponent"
  | "under_pressure"
  | "attacking_no_goal"
  | "cannot_keep_possession";

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  isVerdyHome: boolean;
  kickoffAt: string;
  venue: string;
  status: MatchStatus;
  homeScore: number | null;
  awayScore: number | null;
  timeSegment: TimeSegment | null;
  verdyProfile: TeamProfile;
  opponentProfile: TeamProfile;
  predictedLineups?: {
    home: PredictedLineup;
    away: PredictedLineup;
  };
  previousMatch?: PreviousMatch;
  availability?: AvailabilityInfo;
  matchNotes: string[];
  focusPoints: string[];
  strategies: Strategy[];
  /**
   * mock運用専用のoptional field。trueの場合、Top/Archiveなど公開一覧からは除外する
   * （URL直接アクセスでの開発回帰確認は維持）。DBマッパー（lib/data/mappers.ts）は
   * この値を設定しないため、DB由来のMatchは常にundefined＝公開扱いとなる。
   */
  isDemo?: boolean;
}
