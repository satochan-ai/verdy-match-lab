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

export function MatchScoreboard({ match }: { match: Match }) {
  const hasScore = match.status !== "scheduled";

  return (
    <div className="section-reveal border border-border bg-surface p-4 lg:p-6">
      <div className="mb-3 flex items-center justify-center gap-2 border-b border-border pb-3 lg:mb-4 lg:pb-4">
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

      <div className="flex items-center justify-center gap-4 lg:gap-8">
        <div className="flex-1 text-right lg:flex-none">
          <p className="text-[16px] font-extrabold leading-tight text-text-primary lg:text-[22px]">
            {match.homeTeam.name}
          </p>
          <p className="text-[11px] text-text-secondary">HOME</p>
        </div>

        <div className="tabular-nums text-center text-[32px] font-extrabold text-text-primary lg:text-[44px]">
          {hasScore ? `${match.homeScore} - ${match.awayScore}` : "vs"}
        </div>

        <div className="flex-1 text-left lg:flex-none">
          <p className="text-[16px] font-extrabold leading-tight text-text-primary lg:text-[22px]">
            {match.awayTeam.name}
          </p>
          <p className="text-[11px] text-text-secondary">AWAY</p>
        </div>
      </div>
    </div>
  );
}
