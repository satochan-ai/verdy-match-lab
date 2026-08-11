import Link from "next/link";
import { getNextMatch, getRecentFinishedMatchSummary } from "@/lib/data/matches";
import { StrategyList } from "@/components/match/StrategyList";
import { StatusBadge } from "@/components/ui/StatusBadge";

function formatFixture(iso: string) {
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
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return {
    date: `${part("month")}/${part("day")}(${part("weekday")})`,
    time: `${part("hour")}:${part("minute")} KICK OFF`,
  };
}

function formatShortDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function daysUntil(iso: string) {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export default async function Home() {
  const [nextMatch, recent] = await Promise.all([
    getNextMatch(),
    getRecentFinishedMatchSummary(),
  ]);
  const opponent = nextMatch.isVerdyHome ? nextMatch.awayTeam : nextMatch.homeTeam;
  const recentOpponent = recent.isVerdyHome ? recent.awayTeam : recent.homeTeam;
  const recentResult =
    recent.homeScore! === recent.awayScore!
      ? "draw"
      : (recent.isVerdyHome && recent.homeScore! > recent.awayScore!) ||
        (!recent.isVerdyHome && recent.awayScore! > recent.homeScore!)
      ? "win"
      : "loss";

  const fixture = formatFixture(nextMatch.kickoffAt);
  const days = daysUntil(nextMatch.kickoffAt);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
      <div className="space-y-8 lg:space-y-10">
        <section className="border-t-2 border-fusion-black pt-4 lg:pt-5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
              NEXT MATCH
            </p>
            {nextMatch.status === "scheduled" && (
              <p className="text-[11px] font-bold text-primary-green">
                {days > 0 ? `あと${days}日` : "本日開催"}
              </p>
            )}
          </div>

          <div className="mt-3 lg:flex lg:items-end lg:justify-between lg:gap-10">
            <div className="flex items-center justify-center gap-3 lg:justify-start lg:gap-6">
              <div className="flex-1 text-right lg:flex-none">
                <p className="text-[18px] font-extrabold leading-tight text-text-primary lg:text-[28px]">
                  東京ヴェルディ
                </p>
                <p className="text-[10px] text-text-secondary lg:text-[11px]">
                  {nextMatch.isVerdyHome ? "HOME" : "AWAY"}
                </p>
              </div>
              <div className="text-[12px] font-bold text-text-secondary lg:text-[14px]">
                VS
              </div>
              <div className="flex-1 text-left lg:flex-none">
                <p className="text-[18px] font-extrabold leading-tight text-text-primary lg:text-[28px]">
                  {opponent.name}
                </p>
                <p className="text-[10px] text-text-secondary lg:text-[11px]">
                  {nextMatch.isVerdyHome ? "AWAY" : "HOME"}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-3 text-center lg:mt-0 lg:shrink-0 lg:border-t-0 lg:pt-0 lg:text-right">
              <p className="tabular-nums text-[14px] font-bold text-text-primary lg:text-[15px]">
                {fixture.date} {fixture.time}
              </p>
              <p className="mt-0.5 text-[12px] text-text-secondary">{nextMatch.venue}</p>
              <Link
                href={`/matches/${nextMatch.id}`}
                className="mt-3 flex h-12 w-full items-center justify-center bg-primary-green text-[14px] font-bold text-white lg:mt-4 lg:inline-flex lg:h-10 lg:w-auto lg:px-5"
              >
                試合詳細を見る
              </Link>
            </div>
          </div>
        </section>

        <StrategyList strategies={nextMatch.strategies} />
      </div>

      <div className="mt-8 space-y-6 border-t border-border pt-6 lg:mt-0 lg:border-t-0 lg:pt-0">
        <section>
          <p className="text-[10px] font-bold tracking-[0.15em] text-text-secondary">
            LAST MATCH
          </p>
          <Link
            href={`/matches/${recent.id}`}
            className="mt-2 flex items-center justify-between border-t border-border py-2 text-[13px]"
          >
            <span className="min-w-0 truncate text-text-primary">
              {formatShortDate(recent.kickoffAt)}　{recentOpponent.name}
            </span>
            <span className="ml-2 flex shrink-0 items-center gap-2">
              <span className="tabular-nums font-bold text-text-primary">
                {recent.homeScore}-{recent.awayScore}
              </span>
              <StatusBadge variant={recentResult} />
            </span>
          </Link>
        </section>

        <Link href="/archive" className="block text-[12px] font-bold text-deep-green">
          過去の試合を見る →
        </Link>
      </div>
    </div>
  );
}
