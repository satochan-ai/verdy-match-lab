import type { ScheduleMatch, UpcomingFixture } from "@/types/domain";
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

/** TOP TEAMのNEXT 5表示用。getUpcomingMatches（source of truth）をUpcomingFixture形状へ変換するのみ。 */
export async function getUpcomingFixtures(limit = 5): Promise<UpcomingFixture[]> {
  return mock.getUpcomingFixtures(limit);
}
