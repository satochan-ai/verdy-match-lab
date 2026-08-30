import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  u21Match,
  u21HomeOfficialLineup,
  u21AwayOfficialLineup,
  u21OfficialRecord,
  u21Goals,
  u21Cards,
  u21Substitutions,
} from "@/lib/mock/u21";
import { resolveMatchStatus } from "@/lib/match/status";
import { U21LiveSection } from "@/components/match/U21LiveSection";
import { U21OfficialLineups } from "@/components/match/U21OfficialLineups";
import { MatchRecord } from "@/components/match/MatchRecord";
import { StatusBadge } from "@/components/ui/StatusBadge";

/**
 * U-21の個別試合詳細（現在は u21Match のスナップショット1件のみ）。
 * カテゴリートップ（/u21）から LAST MATCH の導線で到達する。
 * PRE/LIVE判定は kickoffAt と現在時刻の比較（resolveMatchStatus）に依存するため、
 * 静的prerenderにしない。
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "U-21 試合詳細 | Verdy Match Lab",
  description: "東京ヴェルディU-21の試合結果・記録。",
};

export default async function U21MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 現状 U-21 の詳細データは u21Match の1件のみ。該当しないIDは404にする
  // （TOP TEAMの /matches/[id] とはデータ構造が別のため共通化しない）。
  if (id !== u21Match.id) {
    notFound();
  }

  const displayStatus = resolveMatchStatus(u21Match, new Date());
  const statusLabel = {
    scheduled: "試合前",
    live: "LIVE",
    half_time: "ハーフタイム",
    finished: "試合終了",
  }[displayStatus];
  const isFinished = displayStatus === "finished";
  const resultLabel =
    u21Match.homeScore === u21Match.awayScore
      ? "draw"
      : u21Match.homeScore > u21Match.awayScore
      ? "win"
      : "loss";

  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center justify-between">
        <Link href="/u21" className="text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
        <h1 className="text-[15px] font-bold text-text-primary">{statusLabel}</h1>
        <span className="w-8" />
      </div>

      <section className="border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
        <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
          {u21Match.competition}
        </p>

        {isFinished && (
          <div className="mt-2 flex justify-center">
            <StatusBadge variant={resultLabel} label={resultLabel.toUpperCase()} />
          </div>
        )}

        <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 lg:mt-5 lg:gap-6">
          <div className="min-w-0 text-right">
            <p className="truncate text-[14px] font-extrabold leading-[1.15] text-text-primary lg:text-[24px]">
              {u21Match.homeTeamName}
            </p>
            <p className="mt-0.5 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
              HOME
            </p>
          </div>
          {isFinished ? (
            <p className="tabular-nums text-[26px] font-extrabold leading-none text-text-primary lg:text-[38px]">
              {u21Match.homeScore} - {u21Match.awayScore}
            </p>
          ) : (
            <div className="px-1.5 text-[13px] font-extrabold text-fusion-black lg:px-4 lg:text-[18px]">
              VS
            </div>
          )}
          <div className="min-w-0 text-left">
            <p className="truncate text-[14px] font-extrabold leading-[1.15] text-text-primary lg:text-[24px]">
              {u21Match.awayTeamName}
            </p>
            <p className="mt-0.5 text-[10px] font-bold tracking-wide text-text-secondary lg:text-[11px]">
              AWAY
            </p>
          </div>
        </div>

        {isFinished && u21Goals.length > 0 && (
          <ul className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 border-t border-border pt-3 text-[12px] text-text-secondary">
            {u21Goals.map((goal) => (
              <li key={`${goal.minute}-${goal.scorer}`} className="tabular-nums">
                {goal.minute} <span className="text-text-primary">{goal.scorer}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-col items-center gap-1 border-t border-border pt-3 text-center lg:mt-6 lg:flex-row lg:items-baseline lg:justify-between lg:border-t-0 lg:pt-0 lg:text-left">
          <p className="tabular-nums text-[15px] font-bold text-text-primary lg:text-[16px]">
            {u21Match.kickoffLabel}{" "}
            <span className="text-[11px] font-bold text-text-secondary lg:text-[12px]">
              {isFinished ? "予定KICK OFF" : "KICK OFF"}
            </span>
          </p>
          <p className="text-[12px] text-text-secondary">{u21Match.venue}</p>
        </div>
        {u21Match.scheduleNote && (
          <p className="mt-3 border-t border-border pt-3 text-[11px] leading-relaxed text-text-secondary">
            {u21Match.scheduleNote}
          </p>
        )}
      </section>

      {displayStatus === "live" && (
        <U21LiveSection
          matchId={u21Match.id}
          homeTeamName={u21Match.homeTeamName}
          awayTeamName={u21Match.awayTeamName}
        />
      )}
      {displayStatus === "scheduled" && (
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

      {isFinished && (
        <MatchRecord
          homeTeamName={u21Match.homeTeamName}
          awayTeamName={u21Match.awayTeamName}
          goals={u21Goals}
          cards={u21Cards}
          substitutions={u21Substitutions}
          officialRecord={u21OfficialRecord}
        />
      )}
    </div>
  );
}
