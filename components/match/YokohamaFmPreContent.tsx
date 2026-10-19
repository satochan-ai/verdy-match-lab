import { SectionHeader } from "@/components/ui/SectionHeader";
import { PredictionPitch } from "@/components/match/PredictionPitch";
import { StrategyList } from "@/components/match/StrategyList";
import { TeamPerspective } from "@/components/match/TeamPerspective";
import {
  verdyFormation, marinosFormation, verdyYokohamaRows, marinosYokohamaRows,
  verdyYokohamaNumbers, marinosYokohamaNumbers, verdyYokohamaPreview, marinosPreview,
  verdyYokohamaStrategies, marinosStrategies, predictionSources, previewSources,
  YOKOHAMA_FM_PREDICTION_DISCLAIMER, YOKOHAMA_FM_ANALYSIS_DISCLAIMER,
  type YokohamaFmPreview,
} from "@/lib/match/yokohama-fm-content";

function Sources({ sources }: { sources: { label: string; url: string }[] }) {
  return <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] leading-relaxed">
    {sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="font-bold text-deep-green underline">{source.label}</a></li>)}
  </ul>;
}

function PreviewBody({ preview }: { preview: YokohamaFmPreview }) {
  return <div className="space-y-4">
    <h3 className="text-[18px] font-extrabold leading-snug text-text-primary lg:text-[22px]">{preview.title}</h3>
    <div className="space-y-3 text-[14px] leading-relaxed text-text-primary">
      {preview.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    </div>
    <div>
      <p className="mb-2 text-[11px] font-bold tracking-[0.15em] text-pioneer-gold-deep">KEY POINTS</p>
      <ol className="grid gap-2 sm:grid-cols-2">
        {preview.keyPoints.map((point, index) => <li key={point} className="flex gap-3 border border-border bg-white p-3">
          <span className="tabular-nums font-extrabold text-text-secondary">{String(index + 1).padStart(2, "0")}</span>
          <span className="min-w-0 text-[14px] font-bold text-text-primary">{point}</span>
        </li>)}
      </ol>
    </div>
  </div>;
}

export function YokohamaFmMatchPreview() {
  return <section aria-label="横浜FM戦 MATCH PREVIEW（東京V／横浜FM）" className="space-y-4 border-y border-border bg-surface px-4 py-5 lg:px-6 lg:py-6">
    <SectionHeader title="横浜FM戦 MATCH PREVIEW" eyebrow="MATCH PREVIEW / 2026.10.21" />
    <TeamPerspective label="横浜FM戦 MATCH PREVIEW" opponentLabel="横浜FM" opponentTone="marinos"
      verdy={<div className="border-t-2 border-primary-green bg-surface-tint p-4 lg:p-6"><PreviewBody preview={verdyYokohamaPreview} /></div>}
      hiroshima={<div className="border-t-2 border-red-600 bg-blue-50 p-4 lg:p-6"><PreviewBody preview={marinosPreview} /></div>} />
    <p className="text-[13px] font-bold leading-relaxed text-deep-green">{YOKOHAMA_FM_ANALYSIS_DISCLAIMER}</p>
    <Sources sources={previewSources} />
  </section>;
}

export function YokohamaFmStrategies() {
  return <section aria-label="横浜FM戦 軍師の三策（東京V／横浜FM）" className="space-y-4">
    <SectionHeader title="横浜FM戦 軍師の三策" eyebrow="MATCH PLAN / 2026.10.21" variant="emphasis" />
    <TeamPerspective label="横浜FM戦 軍師の三策" opponentLabel="横浜FM" opponentTone="marinos"
      verdy={<div className="min-w-0 border-t-2 border-primary-green bg-surface-tint px-4 py-5"><StrategyList strategies={verdyYokohamaStrategies} title="東京ヴェルディ視点" /></div>}
      hiroshima={<div className="min-w-0 border-t-2 border-red-600 bg-blue-50 px-4 py-5"><StrategyList strategies={marinosStrategies} title="横浜F・マリノス視点" opponent numberClass="text-blue-800" /></div>} />
    <p className="text-[13px] font-bold leading-relaxed text-text-secondary">{YOKOHAMA_FM_ANALYSIS_DISCLAIMER}</p>
  </section>;
}

export function YokohamaFmPredictions() {
  return <section aria-label="横浜FM戦 両チーム予想スタメン" className="space-y-4">
    <SectionHeader title="横浜FM戦 両チーム予想スタメン" eyebrow="PREDICTED LINEUP / 2026.10.21" />
    <p className="text-[13px] font-bold leading-relaxed text-deep-green">{YOKOHAMA_FM_PREDICTION_DISCLAIMER}</p>
    <div className="grid gap-6 lg:grid-cols-2">
      <article aria-label={`東京ヴェルディ ${verdyFormation}`} className="min-w-0">
        <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-deep-green"><span>東京ヴェルディ</span><span>{verdyFormation}</span></h3>
        <PredictionPitch rows={verdyYokohamaRows} numbers={verdyYokohamaNumbers} tone="verdy" />
      </article>
      <article aria-label={`横浜F・マリノス ${marinosFormation}`} className="min-w-0">
        <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-blue-900"><span className="border-b-2 border-red-600">横浜F・マリノス</span><span>{marinosFormation}</span></h3>
        <PredictionPitch rows={marinosYokohamaRows} numbers={marinosYokohamaNumbers} tone="marinos" />
      </article>
    </div>
    <div className="space-y-2 text-[13px] leading-relaxed text-text-secondary">
      <p>東京VはFC東京戦から、マテウス→長沢祐弥、鈴木海音→内田陽介、齋藤功佑→平川怜、福田湧矢→熊取谷一星、染野唯月→一美和成の5名変更を予想します。</p>
      <p>染野唯月は横浜FM戦・福岡戦の2試合出場停止。福田湧矢は前節の負傷交代、マテウスは試合中の負傷が疑われるという観戦所感を踏まえた変更予想です。両選手の欠場が公式発表されたとするものではありません。</p>
      <p>横浜FMは10/10 C大阪戦・10/17千葉戦でGK以外の先発10名を継続。中3日の連戦を踏まえ、山根陸→知念慶、宮市亮→ジョルディ・クルークスの2名変更を本命とします。谷村海那は先発継続、二田理央は今回の先発予想に含めていません。</p>
      <p>ピッチ上の位置は独自の起用予想です。公式登録では新井悠太・木村卓斗・鈴木冬一はMF、熊取谷一星・ジョルディ・クルークス・近藤友喜はFWです。松村晃助はJFA・Jリーグ特別指定選手として登録されています。出場可否や先発を確約する情報ではありません。</p>
    </div>
    <Sources sources={predictionSources} />
  </section>;
}
