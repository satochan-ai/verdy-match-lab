import { Fragment } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StrategyList } from "@/components/match/StrategyList";
import { Sources } from "@/components/match/YokohamaFmPreContent";
import { SHIMIZU_ANALYSIS_DISCLAIMER, shimizuPreview, shimizuPreviewHeadings, shimizuPreviewSources, shimizuStrategies } from "@/lib/match/shimizu-content";

export function ShimizuMatchPreview({ archive = false }: { archive?: boolean }) {
  const paragraphs = archive ? shimizuPreview.paragraphs.map((paragraph, index) => {
    if (index === 0) return paragraph.replace(/Football LABの11月2日更新時点で、.*?勝点で並ぶ。/, "");
    if (index === 3) return paragraph.replace(/【事実】Football LABの集計では、.*?こぼれ球から4点。/, "【事実】");
    if (index === 7) return paragraph.replace(/Football LABによると、.*?4点ある。/, "");
    if (index === 9) return paragraph.replace(/清水はホームで2勝2分3敗。/, "").replace(/走行距離はリーグ2位の東京Vに対し、清水は20位。/, "");
    return paragraph;
  }) : shimizuPreview.paragraphs;
  return <section aria-label="清水戦 MATCH PREVIEW" className="space-y-4 border-y border-border bg-surface px-4 py-5 lg:px-6 lg:py-6">
    <SectionHeader title="清水戦 MATCH PREVIEW" eyebrow="MATCH PREVIEW / 2026.11.07" />
    <div className="space-y-4 border-t-2 border-primary-green bg-surface-tint p-4 lg:p-6">
      <h3 className="text-[18px] font-extrabold leading-snug text-text-primary lg:text-[22px]">{shimizuPreview.title}</h3>
      <p className="text-[13px] font-bold leading-relaxed text-deep-green">{SHIMIZU_ANALYSIS_DISCLAIMER}</p>
      <div className="space-y-3 text-[14px] leading-relaxed text-text-primary">
        {paragraphs.map((paragraph, index) => <Fragment key={paragraph}>
          {shimizuPreviewHeadings[index] && <h4 className="pt-2 text-[16px] font-extrabold text-deep-green">{shimizuPreviewHeadings[index]}</h4>}
          <p>{paragraph}</p>
        </Fragment>)}
      </div>
      <div>
        <p className="mb-2 text-[11px] font-bold tracking-[0.15em] text-pioneer-gold-deep">KEY POINTS</p>
        <ol className="grid gap-2 sm:grid-cols-2">
          {shimizuPreview.keyPoints.map((point, index) => <li key={point} className="flex gap-3 border border-border bg-white p-3">
            <span className="tabular-nums font-extrabold text-text-secondary">{String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0 text-[14px] font-bold text-text-primary">{point}</span>
          </li>)}
        </ol>
      </div>
    </div>
    <Sources sources={shimizuPreviewSources} />
  </section>;
}

export function ShimizuStrategies() {
  return <section aria-label="清水戦 勝敗を左右する三策" className="space-y-4">
    <StrategyList strategies={shimizuStrategies} title="清水戦 勝敗を左右する三策" />
    <p className="text-[13px] leading-relaxed text-text-secondary">{SHIMIZU_ANALYSIS_DISCLAIMER}</p>
  </section>;
}
