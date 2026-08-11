import type { Match, Strategy, Team, TeamProfile, TimeSegment } from "@/types/domain";
import type {
  MatchNoteRow,
  MatchRow,
  PredictionRow,
  TeamProfileRow,
  TeamRow,
} from "./dbTypes";

function mapTeam(row: TeamRow): Team {
  return { id: row.id, name: row.name, isVerdy: row.is_verdy };
}

const emptyProfile: TeamProfile = {
  formation: "情報準備中",
  characteristics: { attack: "情報準備中", defense: "情報準備中" },
  keyPlayers: [],
  recentTrend: "情報準備中",
};

function mapTeamProfile(row: TeamProfileRow | undefined): TeamProfile {
  if (!row) return emptyProfile;
  return {
    formation: row.formation ?? "情報準備中",
    characteristics: {
      attack: row.characteristics?.attack ?? "情報準備中",
      defense: row.characteristics?.defense ?? "情報準備中",
    },
    keyPlayers: row.key_players ?? [],
    recentTrend: row.recent_trend ?? "情報準備中",
  };
}

function mapPrediction(row: PredictionRow): Strategy {
  return {
    orderNo: row.order_no as 1 | 2 | 3,
    title: row.title,
    description: row.description,
    result: row.result,
    resultComment: row.result_comment ?? undefined,
  };
}

/**
 * DBにはtime_segmentカラムが無く、elapsed_minutesのみ保持する（第2回設計どおり）。
 * elapsed_minutesが入力されていればスコアボード表示用に大まかな時間帯へ変換するが、
 * LIVE画面の状況選択（ユーザー入力）を代替するものではない。
 */
function estimateTimeSegment(elapsedMinutes: number | null): TimeSegment | null {
  if (elapsedMinutes === null) return null;
  if (elapsedMinutes <= 15) return "first_early";
  if (elapsedMinutes <= 30) return "first_mid";
  if (elapsedMinutes <= 45) return "first_late";
  if (elapsedMinutes <= 60) return "second_early";
  if (elapsedMinutes <= 75) return "second_mid";
  return "second_late";
}

export function mapMatch(
  matchRow: MatchRow,
  profileRows: TeamProfileRow[],
  predictionRows: PredictionRow[],
  noteRows: MatchNoteRow[]
): Match {
  const verdyProfileRow = profileRows.find((p) => p.team_id === matchRow.home_team.id && matchRow.home_team.is_verdy)
    ?? profileRows.find((p) => matchRow.away_team.is_verdy && p.team_id === matchRow.away_team.id);
  const isVerdyHome = matchRow.home_team.is_verdy;
  const opponentTeamId = isVerdyHome ? matchRow.away_team_id : matchRow.home_team_id;
  const opponentProfileRow = profileRows.find((p) => p.team_id === opponentTeamId);

  const notes = noteRows.map((n) => n.note);

  return {
    id: matchRow.id,
    homeTeam: mapTeam(matchRow.home_team),
    awayTeam: mapTeam(matchRow.away_team),
    isVerdyHome,
    kickoffAt: matchRow.kickoff_at,
    venue: matchRow.venue ?? "会場未定",
    status: matchRow.status,
    homeScore: matchRow.home_score,
    awayScore: matchRow.away_score,
    timeSegment: estimateTimeSegment(matchRow.elapsed_minutes),
    verdyProfile: mapTeamProfile(verdyProfileRow),
    opponentProfile: mapTeamProfile(opponentProfileRow),
    matchNotes: notes,
    // focusPoints専用テーブルは持たない設計のため、match_notesを注目ポイント表示にも流用する（最大2件）。
    focusPoints: notes.slice(0, 2),
    strategies: predictionRows
      .slice()
      .sort((a, b) => a.order_no - b.order_no)
      .map(mapPrediction),
  };
}
