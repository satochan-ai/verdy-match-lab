import type { ScheduleMatch } from "@/types/domain";
import * as mock from "@/lib/mock/schedule";

/**
 * MATCH SCHEDULE用データアクセス層。schedule情報を持つDBテーブルはまだ存在しないため、
 * lib/data/matches.tsと異なりDB分岐は持たず、常にmockから返す
 * （DBスキーマ変更は今回のPhase対象外）。
 */
export async function getPreviousMatches(limit = 5): Promise<ScheduleMatch[]> {
  return mock.getPreviousMatches(limit);
}

export async function getUpcomingMatches(limit = 5): Promise<ScheduleMatch[]> {
  return mock.getUpcomingMatches(limit);
}
