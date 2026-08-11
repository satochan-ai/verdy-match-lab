import Link from "next/link";
import { notFound } from "next/navigation";
import { getMatchDetail } from "@/lib/data/matches";
import { MatchScoreboard } from "@/components/match/MatchScoreboard";
import { MatchMeta } from "@/components/match/MatchMeta";
import { StrategyList } from "@/components/match/StrategyList";
import { PredictedLineups } from "@/components/match/PredictedLineups";
import { AiGuidePanel } from "@/features/ai-guide/ui/AiGuidePanel";
import { LiveGuidePanel } from "@/features/ai-guide/ui/LiveGuidePanel";
import { AnalysisReportView } from "@/features/ai-guide/ui/AnalysisReportView";
import {
  getHalfTimeAnalysis,
  getPostMatchAnalysis,
} from "@/features/ai-guide/mockResponses";

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const match = await getMatchDetail(id);

  if (!match) {
    notFound();
  }

  const statusLabel = {
    scheduled: "試合前",
    live: "LIVE",
    half_time: "ハーフタイム",
    finished: "試合終了",
  }[match.status];

  return (
    <div className="space-y-6 pb-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-[13px] font-bold text-deep-green">
          ← 戻る
        </Link>
        <h1 className="text-[15px] font-bold text-text-primary">{statusLabel}</h1>
        <span className="w-8" />
      </div>

      <MatchScoreboard match={match} />

      {match.status === "scheduled" && (
        <>
          <MatchMeta match={match} showCountdown />
          {match.predictedLineups && (
            <PredictedLineups
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              lineups={match.predictedLineups}
            />
          )}
          <StrategyList strategies={match.strategies} />
          <AiGuidePanel match={match} />
          <details className="border border-border bg-surface p-4">
            <summary className="cursor-pointer text-[13px] font-bold text-text-primary">
              もっと見る
            </summary>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-[13px] font-bold text-text-primary">注目ポイント</h3>
                <ul className="mt-1 list-disc space-y-0.5 pl-4">
                  {match.focusPoints.map((p) => (
                    <li key={p} className="text-[13px] text-text-primary">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-text-primary">
                  東京ヴェルディの特徴
                </h3>
                <p className="mt-1 text-[13px] text-text-primary">
                  攻撃：{match.verdyProfile.characteristics.attack}
                </p>
                <p className="mt-1 text-[13px] text-text-primary">
                  守備：{match.verdyProfile.characteristics.defense}
                </p>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-text-primary">相手の特徴</h3>
                <p className="mt-1 text-[13px] text-text-primary">
                  攻撃：{match.opponentProfile.characteristics.attack}
                </p>
                <p className="mt-1 text-[13px] text-text-primary">
                  守備：{match.opponentProfile.characteristics.defense}
                </p>
              </div>
            </div>
          </details>
        </>
      )}

      {match.status === "live" && <LiveGuidePanel match={match} />}

      {match.status === "half_time" && (
        <section className="border border-border bg-surface p-4">
          <h2 className="text-[15px] font-bold text-text-primary">AI軍師</h2>
          <AnalysisReportView state="ready" report={getHalfTimeAnalysis(match)} />
        </section>
      )}

      {match.status === "finished" && (
        <>
          <section className="border border-border bg-surface p-4">
            <h2 className="text-[15px] font-bold text-text-primary">AI軍師 試合総括</h2>
            <AnalysisReportView state="ready" report={getPostMatchAnalysis(match)} />
          </section>
          <StrategyList
            strategies={match.strategies}
            showResult
            title="軍師の三策 答え合わせ"
          />
        </>
      )}
    </div>
  );
}
