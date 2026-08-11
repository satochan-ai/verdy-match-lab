import type { Strategy } from "@/types/domain";
import { StatusBadge } from "@/components/ui/StatusBadge";

const ORDER_LABEL: Record<Strategy["orderNo"], string> = {
  1: "第一策",
  2: "第二策",
  3: "第三策",
};

export function StrategyItem({
  strategy,
  showResult,
}: {
  strategy: Strategy;
  showResult?: boolean;
}) {
  return (
    <li className="flex gap-3 py-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-green text-[13px] font-bold tabular-nums text-white">
        {String(strategy.orderNo).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold tracking-wide text-text-primary">
          {ORDER_LABEL[strategy.orderNo]}
        </p>
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          <p className="font-bold text-text-primary">{strategy.title}</p>
          {showResult && strategy.result !== "pending" && (
            <StatusBadge variant={strategy.result} />
          )}
        </div>
        <p className="mt-0.5 text-[13px] text-text-secondary">
          {strategy.description}
        </p>
        {showResult && strategy.resultComment && (
          <p className="mt-1 text-[13px] text-text-primary">{strategy.resultComment}</p>
        )}
      </div>
    </li>
  );
}
