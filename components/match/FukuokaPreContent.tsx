import { SectionHeader } from "@/components/ui/SectionHeader";
import { PredictionPitch } from "@/components/match/PredictionPitch";
import { StrategyList } from "@/components/match/StrategyList";
import { TeamPerspective } from "@/components/match/TeamPerspective";
import { PreviewBody, Sources } from "@/components/match/YokohamaFmPreContent";
import {
  verdyFukuokaFormation, avispaFormation, verdyFukuokaRows, avispaRows,
  verdyFukuokaNumbers, avispaNumbers, verdyFukuokaPreview, avispaPreview,
  verdyFukuokaStrategies, avispaStrategies, fukuokaPredictionSources, fukuokaPreviewSources,
  FUKUOKA_PREDICTION_DISCLAIMER, FUKUOKA_ANALYSIS_DISCLAIMER,
} from "@/lib/match/fukuoka-content";

export function FukuokaMatchPreview() {
  return <section aria-label="福岡戦 MATCH PREVIEW（東京V／福岡）" className="space-y-4 border-y border-border bg-surface px-4 py-5 lg:px-6 lg:py-6">
    <SectionHeader title="福岡戦 MATCH PREVIEW" eyebrow="MATCH PREVIEW / 2026.10.24" />
    <TeamPerspective label="福岡戦 MATCH PREVIEW" opponentLabel="福岡" opponentTone="avispa"
      verdy={<div className="border-t-2 border-primary-green bg-surface-tint p-4 lg:p-6"><PreviewBody preview={verdyFukuokaPreview} /></div>}
      hiroshima={<div className="border-t-2 border-blue-950 bg-slate-50 p-4 lg:p-6"><PreviewBody preview={avispaPreview} /></div>} />
    <p className="text-[13px] font-bold leading-relaxed text-deep-green">{FUKUOKA_ANALYSIS_DISCLAIMER}</p>
    <Sources sources={fukuokaPreviewSources} />
  </section>;
}

export function FukuokaStrategies() {
  return <section aria-label="福岡戦 軍師の三策（東京V／福岡）" className="space-y-4">
    <SectionHeader title="福岡戦 軍師の三策" eyebrow="MATCH PLAN / 2026.10.24" variant="emphasis" />
    <TeamPerspective label="福岡戦 軍師の三策" opponentLabel="福岡" opponentTone="avispa"
      verdy={<div className="min-w-0 border-t-2 border-primary-green bg-surface-tint px-4 py-5"><StrategyList strategies={verdyFukuokaStrategies} title="東京ヴェルディ視点" /></div>}
      hiroshima={<div className="min-w-0 border-t-2 border-blue-950 bg-slate-50 px-4 py-5"><StrategyList strategies={avispaStrategies} title="アビスパ福岡視点" opponent numberClass="text-blue-950" /></div>} />
    <p className="text-[13px] font-bold leading-relaxed text-text-secondary">{FUKUOKA_ANALYSIS_DISCLAIMER}</p>
  </section>;
}

export function FukuokaPredictions() {
  return <section aria-label="福岡戦 両チーム予想スタメン" className="space-y-4">
    <SectionHeader title="福岡戦 両チーム予想スタメン" eyebrow="PREDICTED LINEUP / 2026.10.24" />
    <p className="text-[13px] font-bold leading-relaxed text-deep-green">{FUKUOKA_PREDICTION_DISCLAIMER}</p>
    <div className="grid gap-6 lg:grid-cols-2">
      <article aria-label={`東京ヴェルディ ${verdyFukuokaFormation}`} className="min-w-0">
        <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-deep-green"><span>東京ヴェルディ</span><span>{verdyFukuokaFormation}</span></h3>
        <PredictionPitch rows={verdyFukuokaRows} numbers={verdyFukuokaNumbers} tone="verdy" />
      </article>
      <article aria-label={`アビスパ福岡 ${avispaFormation}`} className="min-w-0">
        <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-blue-950"><span>アビスパ福岡</span><span>{avispaFormation}</span></h3>
        <PredictionPitch rows={avispaRows} numbers={avispaNumbers} tone="avispa" />
      </article>
    </div>
    <div className="space-y-2 text-[13px] leading-relaxed text-text-secondary">
      <p>東京Vは横浜FM戦から、鈴木海音→内田陽介、林尚輝→佐古真礼、齋藤功佑→森田晃樹、平川怜→柴戸海、熊取谷一星→山田剛綺の5名変更を予想します。染野唯月は横浜FM戦・福岡戦の2試合出場停止です。</p>
      <p>福岡はG大阪戦から、前田快→椎橋慧也の1名変更を予想します。</p>
      <p>ピッチ上の位置は独自の起用予想です。出場可否や先発を確約する情報ではありません。</p>
    </div>
    <Sources sources={fukuokaPredictionSources} />
  </section>;
}
