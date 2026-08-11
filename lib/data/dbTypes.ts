/**
 * Neon(PostgreSQL)テーブル行の型。ORMは導入せず、
 * migration（db/migrations/0001_init_schema.sql）と手動で対応させる。
 * MVP規模では自動生成/ORM導入の運用コストの方が高いと判断（第5回17章・第6回7章の判定）。
 */

export type MatchStatusRow = "scheduled" | "live" | "half_time" | "finished";
export type PredictionResultRow = "pending" | "hit" | "partial" | "miss";

export interface TeamRow {
  id: string;
  name: string;
  short_name: string | null;
  is_verdy: boolean;
}

export interface MatchRow {
  id: string;
  home_team_id: string;
  away_team_id: string;
  kickoff_at: string;
  venue: string | null;
  status: MatchStatusRow;
  home_score: number | null;
  away_score: number | null;
  elapsed_minutes: number | null;
  home_team: TeamRow;
  away_team: TeamRow;
}

export interface TeamProfileRow {
  id: string;
  match_id: string;
  team_id: string;
  formation: string | null;
  characteristics: { attack: string; defense: string } | null;
  key_players: { name: string; note: string }[] | null;
  recent_trend: string | null;
}

export interface MatchNoteRow {
  id: string;
  match_id: string;
  note: string;
}

export interface PredictionRow {
  id: string;
  match_id: string;
  order_no: number;
  title: string;
  description: string;
  result: PredictionResultRow;
  result_comment: string | null;
}
