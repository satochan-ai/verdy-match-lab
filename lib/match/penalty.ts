import type { Match } from "../../types/domain";

/** PK戦のキッカー個別結果を表示できるか（終了済みで、HOME/AWAYどちらかにキッカーデータがある）。 */
export function hasPenaltyKicks(match: Pick<Match, "status" | "penaltyShootout">): boolean {
  const pk = match.penaltyShootout;
  if (match.status !== "finished" || !pk) return false;
  return (pk.homeKicks?.length ?? 0) > 0 || (pk.awayKicks?.length ?? 0) > 0;
}
