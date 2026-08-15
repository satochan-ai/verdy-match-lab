import Link from "next/link";
import type { ScheduleMatch } from "@/types/domain";

const competitionLabel: Record<ScheduleMatch["competition"], string> = {
  j1: "J1",
  emperor_cup: "天皇杯",
  levain_cup: "ルヴァン",
};

function formatMD(iso: string) {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  return `${part("month")}.${part("day")}`;
}

function formatKickoffTime(iso: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(iso));
}

function ScheduleRow({ item }: { item: ScheduleMatch }) {
  const verdyLabel = "東京V";
  const opponentLabel = item.opponentTbd ? "対戦相手未定" : item.opponentName;
  const homeLabel = item.isVerdyHome ? verdyLabel : opponentLabel;
  const awayLabel = item.isVerdyHome ? opponentLabel : verdyLabel;
  const rightLabel =
    item.status === "finished"
      ? `${item.homeScore}-${item.awayScore}`
      : formatKickoffTime(item.kickoffAt);

  const content = (
    <div className="flex items-center gap-2 py-2 text-[12px]">
      <span className="w-9 shrink-0 tabular-nums text-text-secondary">{formatMD(item.kickoffAt)}</span>
      {item.competition !== "j1" && (
        <span className="shrink-0 text-[10px] font-bold text-pioneer-gold-deep">
          {competitionLabel[item.competition]}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate text-text-primary">
        {homeLabel} - {awayLabel}
      </span>
      <span className="shrink-0 tabular-nums font-bold text-text-primary">{rightLabel}</span>
    </div>
  );

  if (item.detailMatchId) {
    return (
      <li className="border-b border-border">
        <Link href={`/matches/${item.detailMatchId}`}>{content}</Link>
      </li>
    );
  }

  return <li className="border-b border-border">{content}</li>;
}

export function MatchSchedule({
  past,
  next,
}: {
  past: ScheduleMatch[];
  next: ScheduleMatch[];
}) {
  if (past.length === 0 && next.length === 0) return null;

  return (
    <section>
      <p className="text-[10px] font-bold tracking-[0.15em] text-text-secondary">MATCH SCHEDULE</p>

      {past.length > 0 && (
        <div className="mt-2">
          <p className="text-[10px] font-bold tracking-[0.1em] text-text-secondary">PAST</p>
          <ul className="border-t border-border">
            {past.map((item) => (
              <ScheduleRow key={item.id} item={item} />
            ))}
          </ul>
        </div>
      )}

      {next.length > 0 && (
        <div className="mt-4">
          <p className="text-[10px] font-bold tracking-[0.1em] text-text-secondary">NEXT</p>
          <ul className="border-t border-border">
            {next.map((item) => (
              <ScheduleRow key={item.id} item={item} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
