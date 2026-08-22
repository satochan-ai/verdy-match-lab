import Link from "next/link";
import { getNextMatch, getRecentFinishedMatchSummary } from "@/lib/data/matches";
import { getPreviousMatches, getUpcomingMatches } from "@/lib/data/schedule";
import { StrategyList } from "@/components/match/StrategyList";
import { MatchSchedule } from "@/components/match/MatchSchedule";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getMatchDayLabel, daysUntilJST } from "@/lib/match/display";
import { belezaMatch } from "@/lib/mock/beleza";
import { u21Match } from "@/lib/mock/u21";

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

export default async function Home() {
  const [nextMatch, recent, pastSchedule, nextSchedule] = await Promise.all([
    getNextMatch(),
    getRecentFinishedMatchSummary(),
    getPreviousMatches(5),
    getUpcomingMatches(5),
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
  const dayLabel = getMatchDayLabel(nextMatch, now);
  const showU21Match = daysUntilJST(u21Match.kickoffAt, now) === 0;

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
      <div className="space-y-8 lg:space-y-10">
        <section className="section-reveal border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
              NEXT MATCH
            </p>
            {dayLabel.kind === "days" && (
              <p className="text-[11px] font-bold text-primary-green">あと{dayLabel.days}日</p>
            )}
            {dayLabel.kind === "today" && (
              <p className="text-[11px] font-bold text-primary-green">今日</p>
            )}
            {dayLabel.kind === "live" && (
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
        {showU21Match && (
          <section>
            <p className="text-[10px] font-bold tracking-[0.15em] text-text-secondary">
              U-21 MATCH
            </p>
            {u21Match.status === "finished" ? (
              <p className="mt-1 text-[11px] font-bold text-text-secondary">FT</p>
            ) : (
              <p className="mt-1 text-[11px] font-bold text-primary-green">本日、U-21も試合開催</p>
            )}
            <div className="mt-2 border-t border-border py-2 text-[13px]">
              {u21Match.status === "finished" ? (
                <p className="min-w-0 truncate text-text-primary">
                  {u21Match.homeTeamName} {u21Match.homeScore}-{u21Match.awayScore}{" "}
                  {u21Match.awayTeamName}
                </p>
              ) : (
                <p className="min-w-0 truncate text-text-primary">
                  {u21Match.homeTeamName} vs {u21Match.awayTeamName}
                </p>
              )}
              <p className="mt-1 text-text-secondary">
                {u21Match.kickoffLabel} KICK OFF ／ {u21Match.venue}
              </p>
              <Link href="/u21" className="mt-2 inline-block text-[12px] font-bold text-deep-green">
                {u21Match.status === "finished" ? "結果を見る →" : "MATCHを見る →"}
              </Link>
            </div>
          </section>
        )}

        <section>
          <p className="text-[10px] font-bold tracking-[0.15em] text-text-secondary">
            BELEZA
          </p>
          <div className="mt-2 border-t border-border py-2 text-[13px]">
            <p className="text-text-secondary">{belezaMatch.dateLabel}</p>
            <p className="mt-1 min-w-0 truncate text-text-primary">
              日テレ・東京ヴェルディベレーザ vs ジェフ千葉レディース
            </p>
            <p className="mt-1 text-text-secondary">
              {belezaMatch.kickoffLabel} KICK OFF ／ {belezaMatch.venue}
            </p>
            <Link href="/beleza" className="mt-2 inline-block text-[12px] font-bold text-deep-green">
              PREを見る →
            </Link>
          </div>
        </section>

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

      <div className="mt-8 border-t border-border pt-6 lg:col-span-2 lg:mt-10">
        <MatchSchedule past={pastSchedule} next={nextSchedule} />
      </div>
    </div>
  );
}
