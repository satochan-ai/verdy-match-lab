import type { Match } from "../../types/domain";

export function getMatchResult(match: Pick<Match, "homeScore" | "awayScore" | "isVerdyHome" | "penaltyShootout">): "win" | "draw" | "loss" {
  const home = match.penaltyShootout?.homeScore ?? match.homeScore;
  const away = match.penaltyShootout?.awayScore ?? match.awayScore;
  if (home === away) return "draw";
  return (match.isVerdyHome ? home! > away! : away! > home!) ? "win" : "loss";
}
