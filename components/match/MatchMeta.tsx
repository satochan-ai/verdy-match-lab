import type { Match } from "@/types/domain";

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

function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function MatchMeta({ match, showCountdown }: { match: Match; showCountdown?: boolean }) {
  const days = daysUntil(match.kickoffAt);

  return (
    <div className="space-y-1 text-[14px] text-text-primary">
      {showCountdown && match.status === "scheduled" && (
        <p className="text-[12px] font-bold text-primary-green">
          {days > 0 ? `あと${days}日` : "本日開催"}
        </p>
      )}
      <p>{formatDate(match.kickoffAt)}</p>
      <p className="text-text-secondary">{match.venue}</p>
    </div>
  );
}
