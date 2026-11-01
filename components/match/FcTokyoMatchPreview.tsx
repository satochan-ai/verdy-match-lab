import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamPerspective } from "@/components/match/TeamPerspective";
import { DERBY_ANALYSIS_DISCLAIMER, fcTokyoDerbyPreview, verdyDerbyPreview, type DerbyPreview } from "@/lib/match/fc-tokyo-preview";

function PreviewBody({ preview, fcTokyo = false }: { preview: DerbyPreview; fcTokyo?: boolean }) {
  return (
    <div className="space-y-4">
      <SectionHeader title={preview.title} eyebrow="MATCH PREVIEW" />
      <div className="space-y-3 text-[14px] leading-relaxed text-text-primary">
        {preview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div>
        <p className="mb-2 text-[11px] font-bold tracking-[0.15em] text-pioneer-gold-deep">KEY POINTS</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {preview.keyPoints.map((point, index) => (
            <li key={point} className={`flex gap-3 border p-3 ${fcTokyo ? "border-blue-200 bg-white" : "border-border bg-surface-tint"}`}>
              <span className={`tabular-nums text-[15px] font-extrabold ${fcTokyo ? "text-blue-800" : "text-primary-green"}`}>{String(index + 1).padStart(2, "0")}</span>
              <h3 className="min-w-0 text-[14px] font-extrabold text-text-primary">{point}</h3>
            </li>
          ))}
        </ul>
      </div>
      <p className={`text-[13px] font-bold leading-relaxed ${fcTokyo ? "text-blue-900" : "text-deep-green"}`}>{preview.disclaimer}</p>
    </div>
  );
}

/** 10/17 FC東京戦（sched-fc-tokyo）の試合前プレビュー。東京V／FC東京の視点を切り替えて表示する（初期は東京V）。 */
export function FcTokyoMatchPreview() {
  return (
    <section aria-label="東京ダービー MATCH PREVIEW（東京V／FC東京）" className="space-y-4 border-y border-border bg-surface px-4 py-5 lg:px-6 lg:py-6">
      <TeamPerspective
        label="MATCH PREVIEW"
        opponentLabel="FC東京"
        opponentTone="fctokyo"
        verdy={<div className="border-t-2 border-primary-green bg-surface-tint p-4 lg:p-6"><PreviewBody preview={verdyDerbyPreview} /></div>}
        hiroshima={<div className="border-t-2 border-red-600 bg-blue-50 p-4 lg:p-6"><PreviewBody preview={fcTokyoDerbyPreview} fcTokyo /></div>}
      />
      <p className="text-[12px] leading-relaxed text-text-secondary">
        試合結果・日程：
        <a href="https://www.jleague.jp/match/j1/2026/101009/" target="_blank" rel="noopener noreferrer" className="font-bold text-deep-green underline">Jリーグ公式 FC東京 vs 浦和（10/10）</a>
        {" ／ "}
        <a href="https://www.jleague.jp/club/ftokyo/day/" target="_blank" rel="noopener noreferrer" className="font-bold text-deep-green underline">FC東京 試合日程・結果</a>
      </p>
      <p className="text-[13px] font-bold leading-relaxed text-deep-green">{DERBY_ANALYSIS_DISCLAIMER}</p>
    </section>
  );
}
