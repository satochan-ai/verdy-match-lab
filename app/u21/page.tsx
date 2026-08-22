import type { Metadata } from "next";
import Link from "next/link";
import { u21Match, u21HomeOfficialLineup, u21AwayOfficialLineup } from "@/lib/mock/u21";
import { resolveMatchStatus } from "@/lib/match/status";
import { U21LiveSection } from "@/components/match/U21LiveSection";
import { U21OfficialLineups } from "@/components/match/U21OfficialLineups";

/**
 * このページはPRE/LIVEの判定を毎リクエスト評価する必要があるため、
 * 静的prerenderにしない（Topページと同じ落とし穴を避ける）。
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "U-21 MATCH | Verdy Match Lab",
  description: "東京ヴェルディU-21の試合情報。",
};

export default function U21Page() {
  const displayStatus = resolveMatchStatus(u21Match, new Date());
  const statusLabel = displayStatus === "live" ? "LIVE" : "試合前";

  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
        <h1 className="text-[15px] font-bold text-text-primary">{statusLabel}</h1>
        <span className="w-8" />
      </div>

      <section className="border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
        <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
          {u21Match.competition}
        </p>

        <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 lg:mt-5 lg:gap-6">
          <div className="min-w-0 text-right">
            <p className="truncate text-[14px] font-extrabold leading-[1.15] text-text-primary lg:text-[24px]">
              {u21Match.homeTeamName}
            </p>
            <p className="mt-0.5 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
              HOME
            </p>
          </div>
          <div className="px-1.5 text-[13px] font-extrabold text-fusion-black lg:px-4 lg:text-[18px]">
            VS
          </div>
          <div className="min-w-0 text-left">
            <p className="truncate text-[14px] font-extrabold leading-[1.15] text-text-primary lg:text-[24px]">
              {u21Match.awayTeamName}
            </p>
            <p className="mt-0.5 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
              AWAY
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1 border-t border-border pt-3 text-center lg:mt-6 lg:flex-row lg:items-baseline lg:justify-between lg:border-t-0 lg:pt-0 lg:text-left">
          <p className="tabular-nums text-[15px] font-bold text-text-primary lg:text-[16px]">
            {u21Match.kickoffLabel}{" "}
            <span className="text-[11px] font-bold text-text-secondary lg:text-[12px]">KICK OFF</span>
          </p>
          <p className="text-[12px] text-text-secondary">{u21Match.venue}</p>
        </div>
        {u21Match.scheduleNote && (
          <p className="mt-3 border-t border-border pt-3 text-[11px] leading-relaxed text-text-secondary">
            {u21Match.scheduleNote}
          </p>
        )}
      </section>

      {displayStatus === "live" ? (
        <U21LiveSection
          matchId={u21Match.id}
          homeTeamName={u21Match.homeTeamName}
          awayTeamName={u21Match.awayTeamName}
        />
      ) : (
        <p className="text-[13px] text-text-secondary">
          キックオフ後、この画面でLIVE Scoreとメモを記録できます。
        </p>
      )}

      <U21OfficialLineups
        homeTeamName={u21Match.homeTeamName}
        awayTeamName={u21Match.awayTeamName}
        homeLineup={u21HomeOfficialLineup}
        awayLineup={u21AwayOfficialLineup}
      />
    </div>
  );
}
