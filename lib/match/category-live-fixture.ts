import type { CommonFixture } from "../types/fixture";
import { resolveMatchStatus } from "./status.ts";

/** NEXT抽出とは独立して、明示LIVE・ハーフタイムと予定時刻到達を拾う。 */
export function getCategoryLiveFixture(fixtures: readonly CommonFixture[], now: Date) {
  return fixtures.find((fixture) => {
    if (fixture.status === "live" || fixture.status === "half_time") return true;
    return fixture.status === "scheduled" && fixture.kickoffStatus === "confirmed" && Boolean(fixture.kickoffAt) &&
      resolveMatchStatus({ status: "scheduled", kickoffAt: fixture.kickoffAt! }, now) === "live";
  });
}
