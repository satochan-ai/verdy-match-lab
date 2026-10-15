import { StrategyList } from "@/components/match/StrategyList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamPerspective } from "@/components/match/TeamPerspective";
import { DERBY_ANALYSIS_DISCLAIMER, fcTokyoDerbyStrategies, verdyDerbyStrategies } from "@/lib/match/fc-tokyo-preview";

/** 10/17 FC東京戦（sched-fc-tokyo）の軍師の三策。東京V／FC東京の視点を切り替えて表示する（初期は東京V）。 */
export function FcTokyoStrategies() {
  return (
    <section aria-label="東京ダービー 軍師の三策（東京V／FC東京）" className="space-y-4">
      <SectionHeader title="軍師の三策" eyebrow="MATCH PLAN / 2026.10.17" variant="emphasis" />
      <TeamPerspective
        label="軍師の三策"
        opponentLabel="FC東京"
        opponentTone="fctokyo"
        verdy={
          <div className="min-w-0 border-t-2 border-primary-green bg-surface-tint px-4 py-5">
            <StrategyList strategies={verdyDerbyStrategies} title="東京ヴェルディ視点" />
          </div>
        }
        hiroshima={
          <div className="min-w-0 border-t-2 border-red-600 bg-blue-50 px-4 py-5">
            <StrategyList strategies={fcTokyoDerbyStrategies} title="FC東京視点" opponent numberClass="text-blue-800" />
          </div>
        }
      />
      <p className="text-[13px] font-bold leading-relaxed text-text-secondary">{DERBY_ANALYSIS_DISCLAIMER}</p>
    </section>
  );
}
