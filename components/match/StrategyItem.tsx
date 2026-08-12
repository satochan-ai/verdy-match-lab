import type { Strategy, StrategyResult } from "@/types/domain";

const ORDER_LABEL: Record<Strategy["orderNo"], string> = {
  1: "第一策",
  2: "第二策",
  3: "第三策",
};

const RESULT_MARK: Record<StrategyResult, string> = {
  pending: "－",
  hit: "○",
  partial: "△",
  miss: "×",
};

const RESULT_LABEL: Record<StrategyResult, string> = {
  pending: "評価待ち",
  hit: "的中",
  partial: "一部的中",
  miss: "外れ",
};

/** 評価は文字色のみで表現し、塗りつぶしbadge化はしない。 */
const RESULT_CLASS: Record<StrategyResult, string> = {
  pending: "text-text-secondary",
  hit: "text-primary-green",
  partial: "text-pioneer-gold-deep",
  miss: "text-error",
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
        <p className="mt-0.5 text-[15px] font-bold text-text-primary lg:text-[17px]">
          {strategy.title}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-text-secondary lg:text-[14px]">
          {strategy.description}
        </p>
        {showResult && (
          <div className="mt-2 border-t border-border pt-2">
            <p className={`text-[12px] font-bold tracking-wide lg:text-[13px] ${RESULT_CLASS[strategy.result]}`}>
              {RESULT_MARK[strategy.result]} {RESULT_LABEL[strategy.result]}
            </p>
            {strategy.resultComment && (
              <p className="mt-1 text-[13px] leading-relaxed text-text-primary lg:text-[14px]">
                {strategy.resultComment}
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
