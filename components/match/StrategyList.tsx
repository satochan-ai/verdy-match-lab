import type { Strategy } from "@/types/domain";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StrategyItem } from "@/components/match/StrategyItem";

export function StrategyList({
  strategies,
  showResult,
  title = "軍師の三策",
  opponent = false,
  numberClass,
}: {
  strategies: Strategy[];
  showResult?: boolean;
  title?: string;
  opponent?: boolean;
  numberClass?: string;
}) {
  return (
    <section className="section-reveal">
      <SectionHeader title={title} eyebrow="MATCH PLAN" variant="emphasis" />
      <ul className="strategy-reveal-list divide-y divide-border border-y border-border">
        {strategies.map((s) => (
          <StrategyItem key={s.orderNo} strategy={s} showResult={showResult} opponent={opponent} numberClass={numberClass} />
        ))}
      </ul>
    </section>
  );
}
