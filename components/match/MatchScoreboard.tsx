import type { Match, TimeSegment } from "@/types/domain";
import { StatusBadge } from "@/components/ui/StatusBadge";

const timeSegmentLabel: Record<TimeSegment, string> = {
  first_early: "前半序盤",
  first_mid: "前半中盤",
  first_late: "前半終盤",
  second_early: "後半序盤",
  second_mid: "後半中盤",
  second_late: "後半終盤",
};

export function MatchScoreboard({
  match,
  displayHomeScore,
  displayAwayScore,
}: {
  match: Match;
  /** LIVE手動スコア入力など、match本体をmutateせずに表示だけ上書きしたい場合に使用。 */
  displayHomeScore?: number;
  displayAwayScore?: number;
}) {
  const hasScore = match.status !== "scheduled";
  const homeScore = displayHomeScore ?? match.homeScore;
  const awayScore = displayAwayScore ?? match.awayScore;

  return (
    <div className="section-reveal border-2 border-fusion-black bg-surface">
      <div className="flex items-center justify-center gap-2 border-b border-border bg-background px-4 py-2">
        {match.status === "live" && <StatusBadge variant="live" />}
        {match.status === "half_time" && <StatusBadge variant="half_time" />}
        {match.status === "finished" && <StatusBadge variant="finished" />}
        {match.status === "scheduled" && <StatusBadge variant="scheduled" />}
        {match.timeSegment && (
          <span className="text-[12px] text-text-secondary">
            {timeSegmentLabel[match.timeSegment]}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 px-4 py-5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 lg:px-8 lg:py-8">
        <div className="text-center lg:min-w-0 lg:text-right">
          <p className="text-[19px] font-extrabold leading-tight text-text-primary lg:truncate lg:text-[26px]">
            {match.homeTeam.name}
          </p>
          <p className="mt-1 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">HOME</p>
        </div>

        <div className="flex flex-col items-center lg:border-x lg:border-border lg:px-6">
          {hasScore ? (
            <p className="tabular-nums text-[34px] font-extrabold leading-none text-text-primary lg:text-[54px]">
              {homeScore} - {awayScore}
            </p>
          ) : (
            <p className="text-[15px] font-extrabold text-fusion-black lg:text-[20px]">VS</p>
          )}
        </div>

        <div className="text-center lg:min-w-0 lg:text-left">
          <p className="text-[19px] font-extrabold leading-tight text-text-primary lg:truncate lg:text-[26px]">
            {match.awayTeam.name}
          </p>
          <p className="mt-1 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">AWAY</p>
        </div>
      </div>
    </div>
  );
}
