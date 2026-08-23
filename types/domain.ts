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
  /** アシスト。公式結果で確認できた場合のみ設定する（推測で埋めない）。 */
  assist?: string;
}

/** Matchの自試合の得点記録。前節参照用のPreviousMatchGoalと同一形状のため型を共有する。 */
export type MatchGoal = PreviousMatchGoal;

export interface MatchCard {
  /** 公式結果ページで確認できた場合のみ設定する。未確認ならundefinedのまま。 */
  minute?: string;
  player: string;
  team: string;
  type: "yellow" | "red";
}

/** 公式試合記録で確認できた交代。 */
export interface MatchSubstitution {
  minute: string;
  team: string;
  playerIn: string;
  playerOut: string;
}

/** チームごとの公式試合終了スタッツ。 */
export interface TeamMatchStats {
  shots: number;
  shotsOnTarget: number;
  possession: string;
  passSuccessRate: string;
  distance: string;
  sprints: number;
  offsides: number;
  corners: number;
  freeKicks: number;
  yellowCards: number;
  redCards: number;
}

export interface MatchStats {
  home: TeamMatchStats;
  away: TeamMatchStats;
}

/** 公式試合記録で確認できた試合運営情報。 */
export interface OfficialMatchRecord {
  kickoff?: string;
  attendance?: number;
  weather?: string;
  temperature?: string;
  humidity?: string;
  sourceUrl?: string;
}

/** 公式発表された実際のStarting XI / Bench。予想（PredictedLineup）とは別物として扱う。 */
export interface ActualLineup {
  /** 公式発表画面で確認できた場合のみ設定する。 */
  formation?: string;
  starters: PositionPlayerGroups;
  bench: PositionPlayerGroups;
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
  /** この試合自体の得点記録。finished以降、公式結果が確認できた場合のみ設定する。 */
  goals?: MatchGoal[];
  /** この試合自体の警告・退場記録。finished以降、公式結果が確認できた場合のみ設定する。 */
  cards?: MatchCard[];
  /** 公式試合記録で確認できた交代。 */
  substitutions?: MatchSubstitution[];
  /** 公式試合終了スタッツ。 */
  matchStats?: MatchStats;
  /** 公式試合記録で確認できたキックオフ時刻・天候等。 */
  officialRecord?: OfficialMatchRecord;
  /**
   * 公式発表された実際のStarting XI / Bench。predictedLineupsとは独立したフィールドで、
   * 予想を実績で上書きしない（PRE_MATCHのpredictedLineupsはそのまま残す）。
   */
  actualLineups?: {
    home: ActualLineup;
    away: ActualLineup;
  };
  matchNotes: string[];
  focusPoints: string[];
  strategies: Strategy[];
  /** 大会名・ステージ・節/回戦をfixture card上で表示するためのメタデータ。確認できた試合のみ設定する。 */
  fixtureMeta?: FixtureMeta;
  /**
   * mock運用専用のoptional field。trueの場合、Top/Archiveなど公開一覧からは除外する
   * （URL直接アクセスでの開発回帰確認は維持）。DBマッパー（lib/data/mappers.ts）は
   * この値を設定しないため、DB由来のMatchは常にundefined＝公開扱いとなる。
   */
  isDemo?: boolean;
}

/**
 * TOP TEAM / BELEZA / U-21の3カテゴリーで再利用する、fixture表示用の大会メタデータ。
 * 「大会名」「ステージ」「節・回戦」を分離して保持し、大会ごとに異なる節/回戦表現
 * （第○節・○回戦・リーグステージ 第○節 等）を無理に単一のsectionNumber等へ統一しない。
 */
export interface FixtureMeta {
  /** 大会名。例："2026 J1リーグ" "天皇杯 JFA 第106回全日本サッカー選手権大会"。 */
  competition: string;
  /** ステージ名（該当する大会のみ）。例："リーグステージ" "東西リーグラウンド"。 */
  stage?: string;
  /** 節・回戦・ラウンド表記。例："第2節" "2回戦"。公式で確認できた場合のみ設定する。 */
  roundLabel?: string;
}

/**
 * BELEZA / U-21のNEXT 5（今後の公式日程）表示用の軽量fixture情報。
 * 日時・会場が未確定の場合は、単一の値を勝手に確定しない
 * （dateLabelに範囲表記、kickoffLabelに"TBD"を許容し、venueは未確認ならundefinedのまま）。
 */
export interface UpcomingFixture {
  id: string;
  /** 表示用日付ラベル。例："08.29 SAT"。日程未確定の場合は "10.31 - 11.02" のような範囲表記も許容する。 */
  dateLabel: string;
  /** 表示用キックオフラベル。例："18:00"。未確定の場合は "TBD"。 */
  kickoffLabel: string;
  fixtureMeta: FixtureMeta;
  isHome: boolean;
  opponentName: string;
  /** 公式サイトで確認できた場合のみ設定する（推測で埋めない）。未設定ならUI側でTBD扱い。 */
  venue?: string;
}

/** MATCH SCHEDULE表示用の大会区分。東京ヴェルディトップチームの公式戦のみを対象とする。 */
export type Competition = "j1" | "emperor_cup" | "levain_cup";

/**
 * MATCH SCHEDULE（前後最大5試合）表示専用の軽量な試合情報。
 * Matchのように詳細画面向けの重いフィールド（predictedLineups・strategies等）を持たず、
 * 一覧表示に必要な最小限の項目のみを持つ。detailMatchIdがある試合のみ詳細ページへリンクする。
 */
export interface ScheduleMatch {
  id: string;
  competition: Competition;
  /** 公式サイトで節数・ラウンドが確認できた場合のみ設定する（推測で埋めない）。 */
  round?: string;
  kickoffAt: string;
  venue: string;
  isVerdyHome: boolean;
  opponentName: string;
  /** 対戦相手が未定の場合（例：天皇杯の抽選待ち）にtrue。 */
  opponentTbd?: boolean;
  status: MatchStatus;
  homeScore?: number | null;
  awayScore?: number | null;
  /** 詳細Matchが存在する試合のみ設定する。未設定の行はリンクしない。 */
  detailMatchId?: string;
}
