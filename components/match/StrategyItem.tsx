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
    <li className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 py-5 lg:grid-cols-[2.75rem_minmax(0,1fr)] lg:gap-5 lg:py-6">
      <p className="tabular-nums text-right text-[20px] font-extrabold leading-none text-primary-green lg:text-[24px]">
        {String(strategy.orderNo).padStart(2, "0")}
      </p>
      <div className="min-w-0 border-l border-border pl-3 lg:pl-4">
        <p className="text-[11px] font-bold tracking-wide text-text-secondary">
          {ORDER_LABEL[strategy.orderNo]}
        </p>
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          <p className="text-[15px] font-bold text-text-primary lg:text-[17px]">{strategy.title}</p>
          {showResult && strategy.result !== "pending" && (
            <StatusBadge variant={strategy.result} />
          )}
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-text-secondary lg:text-[14px]">
          {strategy.description}
        </p>
        {showResult && strategy.resultComment && (
          <p className="mt-1.5 text-[13px] leading-relaxed text-text-primary lg:text-[14px]">
            {strategy.resultComment}
          </p>
        )}
      </div>
    </li>
  );
}
