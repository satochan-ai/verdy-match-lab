import type { Match } from "@/types/domain";
import { getMatchDayLabel } from "@/lib/match/display";

function formatDate(iso: string) {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? "";

  return `${part("month")}/${part("day")}(${part("weekday")}) ${part("hour")}:${part("minute")} KO`;
}

export function MatchMeta({ match, showCountdown }: { match: Match; showCountdown?: boolean }) {
  const dayLabel = getMatchDayLabel(match, new Date());

  return (
    <div className="space-y-1 text-[14px] text-text-primary">
      {showCountdown && dayLabel.kind === "days" && (
        <p className="text-[12px] font-bold text-primary-green">あと{dayLabel.days}日</p>
      )}
      {showCountdown && dayLabel.kind === "today" && (
        <p className="text-[12px] font-bold text-primary-green">今日</p>
      )}
      {showCountdown && dayLabel.kind === "live" && (
        <p className="text-[12px] font-bold text-primary-green">試合中</p>
      )}
      <p>{formatDate(match.kickoffAt)}</p>
      <p className="text-text-secondary">{match.venue}</p>
    </div>
  );
}
