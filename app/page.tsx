import Link from "next/link";
import { getNextMatch, getRecentFinishedMatchSummary } from "@/lib/data/matches";
import { StrategyList } from "@/components/match/StrategyList";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { resolveMatchStatus } from "@/lib/match/status";

function formatMatchday(iso: string) {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return {
    mmdd: `${part("month")}.${part("day")}`,
    weekday: part("weekday").toUpperCase(),
    time: `${part("hour")}:${part("minute")}`,
  };
}

function formatShortDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function jstDateKey(d: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/**
 * JSTの暦日ベースでの日数差分。時刻差ではなく、試合日と今日の「calendar day」差分を返す。
 * 例：現在 8/14 11:10 JST・キックオフ 8/14 19:00 JSTなら、時刻差(約8時間)ではなく0を返す。
 */
function daysUntil(kickoffIso: string, now: Date) {
  const [ky, km, kd] = jstDateKey(new Date(kickoffIso)).split("-").map(Number);
  const [ny, nm, nd] = jstDateKey(now).split("-").map(Number);
  const kickoffUTCMidnight = Date.UTC(ky, km - 1, kd);
  const nowUTCMidnight = Date.UTC(ny, nm - 1, nd);
  return Math.round((kickoffUTCMidnight - nowUTCMidnight) / (1000 * 60 * 60 * 24));
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

  const now = new Date();
  const fixture = formatMatchday(nextMatch.kickoffAt);
  const days = daysUntil(nextMatch.kickoffAt, now);
  const displayStatus = resolveMatchStatus(nextMatch, now);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
      <div className="space-y-8 lg:space-y-10">
        <section className="section-reveal border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
              NEXT MATCH
            </p>
            {displayStatus === "scheduled" && (
              <p className="text-[11px] font-bold text-primary-green">
                {days > 0 ? `あと${days}日` : "今日"}
              </p>
            )}
            {displayStatus === "live" && (
              <p className="text-[11px] font-bold text-primary-green">試合中</p>
            )}
          </div>

          <p className="mt-2 tabular-nums text-[15px] font-extrabold tracking-wide text-text-secondary lg:text-[17px]">
            {fixture.mmdd} <span className="ml-1">{fixture.weekday}</span>
          </p>

          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 lg:mt-5 lg:gap-6">
            <div className="min-w-0 text-right">
              <p className="truncate text-[15px] font-extrabold leading-[1.15] text-text-primary lg:text-[36px]">
                東京ヴェルディ
              </p>
              <p className="mt-0.5 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
                {nextMatch.isVerdyHome ? "HOME" : "AWAY"}
              </p>
            </div>
            <div className="px-1.5 text-[13px] font-extrabold text-fusion-black lg:px-4 lg:text-[18px]">
              VS
            </div>
            <div className="min-w-0 text-left">
              <p className="truncate text-[15px] font-extrabold leading-[1.15] text-text-primary lg:text-[36px]">
                {opponent.name}
              </p>
              <p className="mt-0.5 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
                {nextMatch.isVerdyHome ? "AWAY" : "HOME"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center gap-1 border-t border-border pt-3 text-center lg:mt-6 lg:flex-row lg:items-baseline lg:justify-between lg:border-t-0 lg:pt-0 lg:text-left">
            <p className="tabular-nums text-[15px] font-bold text-text-primary lg:text-[16px]">
              {fixture.time} <span className="text-[11px] font-bold text-text-secondary lg:text-[12px]">KICK OFF</span>
            </p>
            <p className="text-[12px] text-text-secondary">{nextMatch.venue}</p>
            <Link
              href={`/matches/${nextMatch.id}`}
              className="mt-3 flex h-12 w-full items-center justify-center bg-primary-green text-[14px] font-bold text-white lg:mt-0 lg:inline-flex lg:h-10 lg:w-auto lg:px-5"
            >
              試合詳細を見る
            </Link>
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
