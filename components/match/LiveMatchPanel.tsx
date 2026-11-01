import type { CommonFixture } from "@/lib/types/fixture";
import { FixtureMetaLine } from "@/components/match/FixtureMetaLine";
import Link from "next/link";
import { topLiveNotice, topDetailPendingNotice } from "@/lib/match/top-card-presentation";

export function LiveMatchPanel({ fixture, teamName, detailHref }: { fixture: CommonFixture; teamName: string; detailHref?: string }) {
  const homeName = fixture.isHome ? teamName : fixture.opponentName;
  const awayName = fixture.isHome ? fixture.opponentName : teamName;

  return (
    <section className="border-y-2 border-error bg-error/[0.04] px-4 py-5 lg:px-8 lg:py-7" aria-label="LIVE MATCH">
      <p className="text-[11px] font-bold tracking-[0.2em] text-error lg:text-[12px]">LIVE MATCH</p>
      <p className="mt-2 text-[12px] font-bold text-error">試合中</p>
      <p className="mt-2 tabular-nums text-[15px] font-extrabold tracking-wide text-text-secondary lg:text-[17px]">
        {fixture.dateLabel}
      </p>
      <div className="mt-2">
        <FixtureMetaLine meta={{ competition: fixture.competition.name, roundLabel: fixture.competition.round }} />
      </div>
      <div className="mt-4 flex flex-col items-center gap-1.5 text-center lg:mt-5">
        <p className="text-[16px] font-extrabold leading-snug text-text-primary lg:text-[22px]">{homeName}</p>
        <p className="text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">HOME</p>
        <p className="py-1 text-[13px] font-extrabold text-fusion-black lg:text-[16px]">VS</p>
        <p className="text-[16px] font-extrabold leading-snug text-text-primary lg:text-[22px]">{awayName}</p>
        <p className="text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">AWAY</p>
      </div>
      {detailHref ? (
        <Link href={detailHref} className="mt-5 flex h-12 items-center justify-center bg-primary-green px-6 text-[14px] font-bold text-white transition-colors duration-200 hover:bg-deep-green focus-ring lg:inline-flex">
          試合詳細を見る
        </Link>
      ) : <p className="mt-3 text-[12px] leading-relaxed text-text-secondary">{topDetailPendingNotice}</p>}
      <p className="mt-3 text-[12px] leading-relaxed text-text-secondary">{topLiveNotice}</p>
    </section>
  );
}
