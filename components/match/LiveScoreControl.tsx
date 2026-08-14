"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";

export function LiveScoreControl({
  homeTeamName,
  awayTeamName,
  homeScore,
  awayScore,
  onHomeIncrement,
  onHomeDecrement,
  onAwayIncrement,
  onAwayDecrement,
}: {
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
  onHomeIncrement: () => void;
  onHomeDecrement: () => void;
  onAwayIncrement: () => void;
  onAwayDecrement: () => void;
}) {
  return (
    <section className="border-y border-border bg-surface p-4">
      <SectionHeader eyebrow="CURRENT SCORE" title="現在スコア" />
      <div className="grid grid-cols-2 gap-2">
        <ScoreStepper
          teamLabel={homeTeamName}
          score={homeScore}
          onIncrement={onHomeIncrement}
          onDecrement={onHomeDecrement}
        />
        <ScoreStepper
          teamLabel={awayTeamName}
          score={awayScore}
          onIncrement={onAwayIncrement}
          onDecrement={onAwayDecrement}
        />
      </div>
    </section>
  );
}

function ScoreStepper({
  teamLabel,
  score,
  onIncrement,
  onDecrement,
}: {
  teamLabel: string;
  score: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="text-center">
      <p className="truncate text-[12px] font-bold text-text-secondary">{teamLabel}</p>
      <div className="mt-2 flex items-center justify-center gap-1.5">
        <button
          type="button"
          aria-label={`${teamLabel}の得点を1減らす`}
          onClick={onDecrement}
          disabled={score <= 0}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-fusion-black text-[18px] font-extrabold text-fusion-black disabled:opacity-30"
        >
          −
        </button>
        <span className="tabular-nums w-6 shrink-0 text-center text-[22px] font-extrabold text-text-primary">
          {score}
        </span>
        <button
          type="button"
          aria-label={`${teamLabel}の得点を1増やす`}
          onClick={onIncrement}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-fusion-black text-[18px] font-extrabold text-fusion-black"
        >
          ＋
        </button>
      </div>
    </div>
  );
}
