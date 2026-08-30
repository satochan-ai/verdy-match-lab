import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { BelezaMatchStats } from "@/components/match/BelezaMatchStats";
import { MatchRecord } from "@/components/match/MatchRecord";
import { FormationPitch } from "@/components/match/PredictedFormation";
import { BelezaLiveSection } from "@/components/match/BelezaLiveSection";
import { resolveMatchStatus } from "@/lib/match/status";
import {
  belezaTeam,
  acNaganoTeam,
  belezaMatch,
  belezaHalfScores,
  belezaGoals,
  belezaCards,
  belezaSubstitutions,
  belezaOfficialRecord,
  belezaOfficialSourceLabel,
  belezaMatchStats,
  belezaActualLineup,
  belezaActualFormation,
  acNaganoActualLineup,
  acNaganoActualFormation,
  belezaPostMatchSummary,
} from "@/lib/mock/beleza";

/**
 * BELEZAの個別試合詳細（現在は belezaMatch のスナップショット1件のみ）。
 * カテゴリートップ（/beleza）から LAST MATCH / NEXT MATCH の導線で到達する。
 * PRE/LIVE判定は kickoffAt と現在時刻の比較（resolveMatchStatus）に依存するため、
 * U-21ページと同じ理由で静的prerenderにしない。
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ベレーザ 試合詳細 | Verdy Match Lab",
  description: "日テレ・東京ヴェルディベレーザの試合結果・記録。",
};

export default async function BelezaMatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 現状 BELEZA の詳細データは belezaMatch の1件のみ。該当しないIDは404にする
  // （TOP TEAMの /matches/[id] とはデータ構造が別のため共通化しない）。
  if (id !== belezaMatch.id) {
    notFound();
  }

  const displayStatus = resolveMatchStatus(belezaMatch, new Date());
  const isFinished = displayStatus === "finished";
  const isLive = displayStatus === "live";
  const isScheduled = displayStatus === "scheduled";
  const belezaScore = belezaMatch.isBelezaHome ? belezaMatch.homeScore : belezaMatch.awayScore;
  const opponentScore = belezaMatch.isBelezaHome ? belezaMatch.awayScore : belezaMatch.homeScore;
  const resultLabel =
    belezaScore === opponentScore ? "draw" : belezaScore > opponentScore ? "win" : "loss";

  return (
    <div className="space-y-8 pb-4">
      <div className="flex items-center justify-between">
        <Link href="/beleza" className="text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
        <h1 className="text-[15px] font-bold text-text-primary">
          {isFinished ? "試合終了" : isLive ? "LIVE" : "BELEZA MATCH PREVIEW"}
        </h1>
        <span className="w-8" />
      </div>

      <section className="border-y-2 border-fusion-black bg-surface-tint px-4 py-5 lg:px-8 lg:py-7">
        <p className="text-[11px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[12px]">
          {belezaMatch.competition}
        </p>
        <p className="mt-2 tabular-nums text-[15px] font-extrabold tracking-wide text-text-secondary lg:text-[17px]">
          {belezaMatch.dateLabel}
        </p>

        {isFinished && (
          <div className="mt-2 flex justify-center">
            <StatusBadge variant={resultLabel} label={resultLabel.toUpperCase()} />
          </div>
        )}

        {/* mobile: 正式名称を省略せず縦積みで表示する（横並びgridだとtruncateで名称が切れるため） */}
        <div className="mt-4 flex flex-col items-center gap-1.5 text-center lg:hidden">
          <p className="text-[16px] font-extrabold leading-snug text-text-primary">
            {belezaMatch.homeTeamName}
          </p>
          <p className="text-[10px] font-bold tracking-wide text-text-secondary">HOME</p>
          {isFinished ? (
            <p className="tabular-nums py-1 text-[22px] font-extrabold text-text-primary">
              {belezaMatch.homeScore} - {belezaMatch.awayScore}
            </p>
          ) : (
            <p className="py-1 text-[13px] font-extrabold text-fusion-black">VS</p>
          )}
          <p className="text-[16px] font-extrabold leading-snug text-text-primary">
            {belezaMatch.awayTeamName}
          </p>
          <p className="text-[10px] font-bold tracking-wide text-text-secondary">AWAY</p>
        </div>

        {isFinished && belezaHalfScores && (
          <div className="mt-3 flex flex-col items-center gap-2 border-t border-border pt-3 text-center lg:hidden">
            <p className="text-[11px] font-bold text-text-secondary">
              前半 {belezaHalfScores.firstHalf} ／ 後半 {belezaHalfScores.secondHalf}
            </p>
            {belezaGoals.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[12px] text-text-secondary">
                {belezaGoals.map((goal) => (
                  <li key={`${goal.minute}-${goal.scorer}`} className="tabular-nums">
                    {goal.minute} <span className="text-text-primary">{goal.scorer}</span>（{goal.team}）
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-4 flex flex-col items-center gap-1 border-t border-border pt-3 text-center lg:hidden">
          <p className="tabular-nums text-[15px] font-bold text-text-primary">
            {belezaMatch.kickoffLabel}{" "}
            <span className="text-[11px] font-bold text-text-secondary">
              {isFinished ? "予定KICK OFF" : "KICK OFF"}
            </span>
          </p>
          <p className="text-[12px] text-text-secondary">{belezaMatch.venue}</p>
        </div>

        {/* desktop: 既存の横並びレイアウトを維持 */}
        <div className="hidden lg:block">
          <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div className="min-w-0 text-right">
              <p className="truncate text-[24px] font-extrabold leading-[1.15] text-text-primary">
                {belezaMatch.homeTeamName}
              </p>
              <p className="mt-0.5 text-[11px] font-bold tracking-wide text-text-secondary">
                HOME
              </p>
            </div>
            {isFinished ? (
              <p className="tabular-nums px-4 text-[30px] font-extrabold text-text-primary">
                {belezaMatch.homeScore} - {belezaMatch.awayScore}
              </p>
            ) : (
              <div className="px-4 text-[18px] font-extrabold text-fusion-black">VS</div>
            )}
            <div className="min-w-0 text-left">
              <p className="truncate text-[24px] font-extrabold leading-[1.15] text-text-primary">
                {belezaMatch.awayTeamName}
              </p>
              <p className="mt-0.5 text-[11px] font-bold tracking-wide text-text-secondary">
                AWAY
              </p>
            </div>
          </div>

          {isFinished && belezaHalfScores && (
            <div className="mt-4 flex flex-col items-center gap-2 border-t border-border pt-4 text-center">
              <p className="text-[12px] font-bold text-text-secondary">
                前半 {belezaHalfScores.firstHalf} ／ 後半 {belezaHalfScores.secondHalf}
              </p>
              {belezaGoals.length > 0 && (
                <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-text-secondary">
                  {belezaGoals.map((goal) => (
                    <li key={`${goal.minute}-${goal.scorer}`} className="tabular-nums">
                      {goal.minute} <span className="text-text-primary">{goal.scorer}</span>（{goal.team}）
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="mt-6 flex items-baseline justify-between text-left">
            <p className="tabular-nums text-[16px] font-bold text-text-primary">
              {belezaMatch.kickoffLabel}{" "}
              <span className="text-[12px] font-bold text-text-secondary">
                {isFinished ? "予定KICK OFF" : "KICK OFF"}
              </span>
            </p>
            <p className="text-[12px] text-text-secondary">{belezaMatch.venue}</p>
          </div>
        </div>
      </section>

      {isLive && (
        <BelezaLiveSection
          matchId={belezaMatch.id}
          homeTeamName={belezaMatch.homeTeamName}
          awayTeamName={belezaMatch.awayTeamName}
        />
      )}
      {isScheduled && (
        <p className="text-[13px] text-text-secondary">
          キックオフ後、この画面でLIVE Scoreとメモを記録できます。
        </p>
      )}

      {isFinished && (
        <section>
          <SectionHeader title="POST MATCH SUMMARY" />
          <p className="text-[13px] leading-relaxed text-text-secondary">{belezaPostMatchSummary}</p>
        </section>
      )}

      {isFinished && (
        <section>
          <SectionHeader title="実際の並び" eyebrow="FORMATION" />
          <div className="space-y-7 border-y border-border bg-surface px-3 py-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            <FormationPitch
              team={belezaTeam}
              lineup={belezaActualFormation}
              idPrefix="actual-formation"
            />
            <FormationPitch
              team={acNaganoTeam}
              lineup={acNaganoActualFormation}
              idPrefix="actual-formation"
            />
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
            両チームの実際の並び（4-2-3-1）。試合終了後のスクリーンショットに基づく配置です。
          </p>
        </section>
      )}

      {isFinished && (
        <MatchRecord
          homeTeamName={belezaMatch.homeTeamName}
          awayTeamName={belezaMatch.awayTeamName}
          goals={belezaGoals}
          cards={belezaCards}
          substitutions={belezaSubstitutions}
          officialRecord={belezaOfficialRecord}
          officialSourceLabel={belezaOfficialSourceLabel}
          actualLineups={
            belezaMatch.isBelezaHome
              ? { home: belezaActualLineup, away: acNaganoActualLineup }
              : { home: acNaganoActualLineup, away: belezaActualLineup }
          }
        />
      )}

      {isFinished && belezaMatchStats && (
        <BelezaMatchStats
          belezaTeamName={belezaTeamStatsLabel(belezaMatch)}
          opponentTeamName={opponentTeamStatsLabel(belezaMatch)}
          stats={belezaMatchStats}
        />
      )}
    </div>
  );
}

function belezaTeamStatsLabel(match: { homeTeamName: string; awayTeamName: string; isBelezaHome: boolean }) {
  return match.isBelezaHome ? match.homeTeamName : match.awayTeamName;
}

function opponentTeamStatsLabel(match: { homeTeamName: string; awayTeamName: string; isBelezaHome: boolean }) {
  return match.isBelezaHome ? match.awayTeamName : match.homeTeamName;
}
