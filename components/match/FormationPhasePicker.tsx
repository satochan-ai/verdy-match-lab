"use client";

import { useState } from "react";
import { FormationPitch } from "@/components/match/PredictedFormation";
import type { PredictedLineup, Team } from "@/types/domain";

export function FormationPhasePicker({
  team,
  phases,
  showPlayerCount = false,
}: {
  showPlayerCount?: boolean;
  team: Team;
  phases: { label: string; lineup: PredictedLineup }[];
}) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = phases[phaseIndex];

  return (
    <div className="min-w-0 space-y-2.5">
      <div role="group" aria-label={`${team.name}の配置を選ぶ`} className="flex flex-wrap gap-1.5">
        {phases.map(({ label }, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={index === phaseIndex}
            onClick={() => setPhaseIndex(index)}
            className="min-h-10 rounded-sm border border-border px-2.5 text-[13px] font-bold text-text-primary aria-pressed:border-deep-green aria-pressed:bg-deep-green aria-pressed:text-white"
          >
            {label}
          </button>
        ))}
      </div>
      {showPlayerCount && <p role="status" className="text-xs font-bold text-text-secondary">{phase.lineup.starters.length}人</p>}
      <FormationPitch team={team} lineup={phase.lineup} idPrefix="observed-formation" />
    </div>
  );
}
