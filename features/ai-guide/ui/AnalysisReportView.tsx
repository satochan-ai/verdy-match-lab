import type { AnalysisReport, AiPanelState } from "@/features/ai-guide/types";

export function AnalysisReportView({
  state,
  report,
  onRetry,
}: {
  state: AiPanelState;
  report?: AnalysisReport;
  onRetry?: () => void;
}) {
  if (state === "idle") {
    return null;
  }

  if (state === "loading") {
    return (
      <div className="mt-4 border-t border-border pt-4" aria-live="polite">
        <p className="text-[13px] font-bold text-text-secondary">分析中</p>
        <p className="mt-1 text-[13px] text-text-secondary">軍師が戦況を読んでいます…</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="mt-4 border-t border-border pt-4">
        <p className="text-[13px] text-error">軍師の分析を取得できませんでした。</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 border-b border-border pb-0.5 text-[13px] font-bold text-text-primary"
          >
            再試行
          </button>
        )}
      </div>
    );
  }

  if (!report || report.sections.length === 0) {
    return (
      <div className="mt-4 border-t border-border pt-4">
        <p className="text-[13px] text-text-secondary">まだ軍師の分析がありません。</p>
      </div>
    );
  }

  return (
    <div className="mt-4 border-t border-border pt-4">
      <p className="mb-2 text-[12px] font-bold text-text-secondary">▸ 分析結果</p>
      <div className="space-y-3">
        {report.sections.map((section) => (
          <div key={section.heading}>
            <h3 className="text-[13px] font-bold text-text-primary">{section.heading}</h3>
            {section.body && (
              <p className="mt-1 text-[13px] leading-relaxed text-text-primary">
                {section.body}
              </p>
            )}
            {section.bullets && (
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {section.bullets.map((b) => (
                  <li key={b} className="text-[13px] leading-relaxed text-text-primary">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {report.note && (
        <p className="mt-3 text-[12px] text-text-secondary">{report.note}</p>
      )}
    </div>
  );
}
