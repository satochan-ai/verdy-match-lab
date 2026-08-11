import type { Strategy } from "@/types/domain";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StrategyItem } from "@/components/match/StrategyItem";

export function StrategyList({
  strategies,
  showResult,
  title = "軍師の三策",
}: {
  strategies: Strategy[];
  showResult?: boolean;
  title?: string;
}) {
  return (
    <section>
      <SectionHeader title={title} eyebrow="MATCH PLAN" variant="emphasis" />
      <ul className="divide-y divide-border border-y border-border">
        {strategies.map((s) => (
          <StrategyItem key={s.orderNo} strategy={s} showResult={showResult} />
        ))}
      </ul>
    </section>
  );
}
