"use client";

import { useState } from "react";
import type {
  Match,
  ScoreSituation,
  SpecialSituation,
  TimeSegment,
} from "@/types/domain";
import type { AiPanelState } from "@/features/ai-guide/types";
import { getLiveAnalysis } from "@/features/ai-guide/mockResponses";
import { SituationSelector } from "@/features/ai-guide/ui/SituationSelector";
import { AnalysisReportView } from "@/features/ai-guide/ui/AnalysisReportView";
import { StickyCta } from "@/components/ui/StickyCta";
import { MatchScoreboard } from "@/components/match/MatchScoreboard";
import { LiveScoreControl } from "@/components/match/LiveScoreControl";

export function LiveGuidePanel({ match }: { match: Match }) {
  const [homeScore, setHomeScore] = useState(match.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState(match.awayScore ?? 0);
  const [scoreSituation, setScoreSituation] = useState<ScoreSituation | null>(null);
  const [timeSegment, setTimeSegment] = useState<TimeSegment | null>(match.timeSegment);
  const [specials, setSpecials] = useState<SpecialSituation[]>([]);
  const [state, setState] = useState<AiPanelState>("idle");

  const canSubmit = Boolean(scoreSituation && timeSegment);
  const report =
    state === "ready" && scoreSituation && timeSegment
      ? getLiveAnalysis(match, scoreSituation, timeSegment, specials)
      : undefined;

  function toggleSpecial(v: SpecialSituation) {
    setSpecials((prev) =>
      prev.includes(v) ? prev.filter((s) => s !== v) : [...prev, v]
    );
  }

  function handleSubmit() {
    if (!canSubmit) return;
    setState("loading");
    window.setTimeout(() => setState("ready"), 600);
  }

  return (
    <div className="space-y-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 lg:space-y-0">
      <div className="space-y-6">
        <MatchScoreboard match={match} displayHomeScore={homeScore} displayAwayScore={awayScore} />
        <LiveScoreControl
          homeTeamName={match.homeTeam.name}
          awayTeamName={match.awayTeam.name}
          homeScore={homeScore}
          awayScore={awayScore}
          onHomeIncrement={() => setHomeScore((prev) => prev + 1)}
          onHomeDecrement={() => setHomeScore((prev) => Math.max(0, prev - 1))}
          onAwayIncrement={() => setAwayScore((prev) => prev + 1)}
          onAwayDecrement={() => setAwayScore((prev) => Math.max(0, prev - 1))}
        />
        <section className="border border-border bg-surface p-4 pb-2">
          <h2 className="text-[15px] font-bold text-text-primary">状況を入力</h2>
          <div className="mt-3">
            <SituationSelector
              scoreSituation={scoreSituation}
              timeSegment={timeSegment}
              specials={specials}
              onScoreChange={setScoreSituation}
              onTimeChange={setTimeSegment}
              onSpecialToggle={toggleSpecial}
            />
          </div>
        </section>
      </div>

      <section
        className={
          state === "idle"
            ? "hidden border border-border bg-surface p-4 lg:block"
            : "lg:border lg:border-border lg:bg-surface lg:p-4"
        }
      >
        {state === "idle" ? (
          <p className="text-[13px] leading-relaxed text-text-secondary">
            状況を選ぶと、ここに戦術軍師 βの分析が表示されます。
          </p>
        ) : (
          <AnalysisReportView state={state} report={report} onRetry={handleSubmit} />
        )}
      </section>

      <StickyCta
        label="軍師に聞く"
        disabled={!canSubmit}
        hint="スコア状況と時間帯を選んでください"
        onClick={handleSubmit}
      />
    </div>
  );
}
