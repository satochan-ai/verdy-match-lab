import Link from "next/link";
import { FixtureMetaLine } from "@/components/match/FixtureMetaLine";
import type { CommonFixture } from "@/lib/types/fixture";
import { homeFeatureLabels } from "@/components/home/home-copy";

function formatFixture(iso: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return {
    date: `${part("month")}.${part("day")} ${part("weekday").toUpperCase()}`,
    time: `${part("hour")}:${part("minute")}`,
  };
}

export function HomeNextMatch({ fixture }: { fixture?: CommonFixture }) {
  if (!fixture?.kickoffAt) return null;

  const { date, time } = formatFixture(fixture.kickoffAt);
  const detailHref = fixture.detailMatchId ? `/matches/${fixture.detailMatchId}` : undefined;

  return (
    <section aria-labelledby="home-next-match" className="border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
            NEXT MATCH
          </p>
          <h2 id="home-next-match" className="mt-1 text-[17px] font-extrabold text-text-primary lg:text-[20px]">
            TOP TEAM 次戦
          </h2>
        </div>
        <p className="shrink-0 tabular-nums text-[13px] font-extrabold text-text-primary lg:text-[15px]">
          {date}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 lg:mt-5 lg:gap-8">
        <div className="min-w-0 text-right">
          <p className="min-w-0 break-words text-[14px] font-black leading-[1.05] tracking-tight text-text-primary sm:text-[22px] lg:text-[38px]">
            東京ヴェルディ
          </p>
          <p className="mt-1 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
            {fixture.isHome ? "HOME" : "AWAY"}
          </p>
        </div>
        <p className="px-1 text-[14px] font-extrabold text-fusion-black lg:px-3 lg:text-[19px]">VS</p>
        <div className="min-w-0 text-left">
          <p className="min-w-0 break-words text-[14px] font-black leading-[1.05] tracking-tight text-text-primary sm:text-[22px] lg:text-[38px]">
            {fixture.opponentName}
          </p>
          <p className="mt-1 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
            {fixture.isHome ? "AWAY" : "HOME"}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8">
        <div className="space-y-2">
          <FixtureMetaLine meta={{ competition: fixture.competition.name, roundLabel: fixture.competition.round }} />
          <p className="tabular-nums text-[16px] font-extrabold text-text-primary lg:text-[18px]">
            {time} <span className="text-[11px] text-text-secondary lg:text-[12px]">KICK OFF</span>
          </p>
          {fixture.venue && <p className="text-[12px] text-text-secondary lg:text-[13px]">{fixture.venue}</p>}
        </div>
        {detailHref && (
          <Link
            href={detailHref}
            className="mt-5 flex h-12 items-center justify-center bg-primary-green px-6 text-[14px] font-bold text-white transition-colors duration-200 hover:bg-deep-green focus-ring lg:mt-0 lg:inline-flex"
          >
            試合詳細を見る
          </Link>
        )}
      </div>

      <ul aria-label="Verdy Match Labで見られること" className="mt-5 grid border-t border-border pt-4 sm:grid-cols-3 sm:gap-5">
        {homeFeatureLabels.map(([label, description]) => (
          <li key={label} className="border-b border-border py-3 last:border-b-0 sm:border-b-0 sm:py-0">
            <p className="text-[10px] font-bold tracking-[0.16em] text-pioneer-gold-deep">{label}</p>
            <p className="mt-1 text-[12px] font-bold text-text-primary lg:text-[13px]">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
