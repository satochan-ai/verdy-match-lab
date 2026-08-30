import type { Metadata } from "next";
import Link from "next/link";
import { getNextMatch, getRecentFinishedMatchSummary } from "@/lib/data/matches";
import { topFixtures, toTopUpcomingFixture } from "@/lib/data/top-fixtures";
import { getNextFixture, getUpcomingFixtures } from "@/lib/data/fixture-selectors";
import { StrategyList } from "@/components/match/StrategyList";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FixtureMetaLine } from "@/components/match/FixtureMetaLine";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { UpcomingFixtureList } from "@/components/match/UpcomingFixtureList";
import { getMatchDayLabel } from "@/lib/match/display";

export const metadata: Metadata = {
  title: "東京ヴェルディ TOP TEAM | Verdy Match Lab",
  description: "東京ヴェルディ トップチームの試合情報・軍師の三策・NEXT 5。",
};

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

export default async function TopTeamPage() {
  const [nextMatch, recent] = await Promise.all([
    getNextMatch(),
    getRecentFinishedMatchSummary(),
  ]);
  const now = new Date();
  const nextFixture = getNextFixture(topFixtures, now);
  const topUpcoming = getUpcomingFixtures(topFixtures, now, 5).map(toTopUpcomingFixture);
  // nextMatchがnull（scheduledな試合が未登録）の場合は、過去試合を出さずに
  // 「次戦情報準備中」の空状態を表示する。LAST MATCH / NEXT 5は独立して表示する。
  const opponent = nextFixture
    ? { name: nextFixture.opponentName }
    : null;
  const recentOpponent = recent.isVerdyHome ? recent.awayTeam : recent.homeTeam;
  const recentResult =
    recent.homeScore! === recent.awayScore!
      ? "draw"
      : (recent.isVerdyHome && recent.homeScore! > recent.awayScore!) ||
        (!recent.isVerdyHome && recent.awayScore! > recent.homeScore!)
      ? "win"
      : "loss";

  const fixture = nextFixture?.kickoffAt ? formatMatchday(nextFixture.kickoffAt) : null;
  const dayLabel = nextMatch ? getMatchDayLabel(nextMatch, now) : null;

  return (
    <div className="space-y-6">
      <Link href="/" className="text-[13px] font-bold text-deep-green">
        ← 戻る
      </Link>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
        <div className="space-y-8 lg:space-y-10">
              {nextFixture && fixture && opponent && dayLabel ? (
          <section className="section-reveal border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
                NEXT MATCH
              </p>
              {dayLabel.kind === "days" && <p className="text-[11px] font-bold text-primary-green">あと{dayLabel.days}日</p>}
              {dayLabel.kind === "today" && <p className="text-[11px] font-bold text-primary-green">今日</p>}
              {dayLabel.kind === "live" && <p className="text-[11px] font-bold text-primary-green">試合中</p>}
            </div>

            <p className="mt-2 tabular-nums text-[15px] font-extrabold tracking-wide text-text-secondary lg:text-[17px]">
              {fixture.mmdd} <span className="ml-1">{fixture.weekday}</span>
            </p>

              {nextFixture.competition && (
                <div className="mt-2">
                <FixtureMetaLine meta={{ competition: nextFixture.competition.name, roundLabel: nextFixture.competition.round }} />
              </div>
            )}

            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 lg:mt-5 lg:gap-6">
              <div className="min-w-0 text-right">
                <p className="truncate text-[15px] font-extrabold leading-[1.15] text-text-primary lg:text-[36px]">
                  東京ヴェルディ
                </p>
                <p className="mt-0.5 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
                  {nextFixture.isHome ? "HOME" : "AWAY"}
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
                  {nextFixture.isHome ? "AWAY" : "HOME"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center gap-1 border-t border-border pt-3 text-center lg:mt-6 lg:flex-row lg:items-baseline lg:justify-between lg:border-t-0 lg:pt-0 lg:text-left">
              <p className="tabular-nums text-[15px] font-bold text-text-primary lg:text-[16px]">
                {fixture.time}{" "}
                <span className="text-[11px] font-bold text-text-secondary lg:text-[12px]">
                  KICK OFF
                </span>
              </p>
              <p className="text-[12px] text-text-secondary">{nextFixture.venue}</p>
              <Link
                href={nextFixture.detailMatchId ? `/matches/${nextFixture.detailMatchId}` : "/top"}
                className="mt-3 flex h-12 w-full items-center justify-center bg-primary-green text-[14px] font-bold text-white lg:mt-0 lg:inline-flex lg:h-10 lg:w-auto lg:px-5"
              >
                試合詳細を見る
              </Link>
            </div>
          </section>
          ) : (
          <section className="section-reveal border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
            <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
              NEXT MATCH
            </p>
            <p className="mt-3 text-[15px] font-extrabold text-text-primary lg:text-[17px]">
              次戦情報準備中
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
              次の試合日程が確定し次第、ここに表示します。
            </p>
          </section>
          )}

          {nextMatch && <StrategyList strategies={nextMatch.strategies} />}

          {topUpcoming.length > 0 && (
            <section>
              <SectionHeader title="NEXT 5" eyebrow="UPCOMING FIXTURES" />
              <UpcomingFixtureList fixtures={topUpcoming} />
            </section>
          )}
        </div>

        <div className="mt-8 space-y-6 border-t border-border pt-6 lg:mt-0 lg:border-t-0 lg:pt-0">
          <section>
            <p className="text-[10px] font-bold tracking-[0.15em] text-text-secondary">
              LAST MATCH
            </p>
            <Link href={`/matches/${recent.id}`} className="mt-2 block border-t border-border py-2 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="min-w-0 truncate text-text-primary">
                  {formatShortDate(recent.kickoffAt)}　{recentOpponent.name}
                </span>
                <span className="ml-2 flex shrink-0 items-center gap-2">
                  <span className="tabular-nums font-bold text-text-primary">
                    {recent.homeScore}-{recent.awayScore}
                  </span>
                  <StatusBadge variant={recentResult} />
                </span>
              </div>
              {recent.fixtureMeta && (
                <div className="mt-1">
                  <FixtureMetaLine meta={recent.fixtureMeta} compact />
                </div>
              )}
            </Link>
          </section>

          <Link href="/archive" className="block text-[12px] font-bold text-deep-green">
            過去の試合を見る →
          </Link>
        </div>
      </div>
    </div>
  );
}
