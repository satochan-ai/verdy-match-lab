import type { MatchStatus } from "@/types/domain";

/**
 * 表示用のstatusを解決する。元データのstatusが"scheduled"かつkickoffAtを過ぎていれば
 * "live"として扱う（キックオフ後の自動リロードでLIVE画面へ入れるようにするため）。
 * live/half_time/finishedなど明示statusはそのまま優先する。
 */
export function resolveMatchStatus(
  match: { status: MatchStatus; kickoffAt: string },
  now: Date,
): MatchStatus {
  if (match.status !== "scheduled") {
    return match.status;
  }
  return now.getTime() >= new Date(match.kickoffAt).getTime() ? "live" : "scheduled";
}
