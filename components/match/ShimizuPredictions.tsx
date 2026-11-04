import { PredictionPitch } from "@/components/match/PredictionPitch";
import { Sources } from "@/components/match/YokohamaFmPreContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { shimizuFormation, shimizuPredictionNumbers, shimizuPredictionRows, shimizuPredictionSources } from "@/lib/match/shimizu-prediction";

export function ShimizuPredictions() {
  return <section aria-label="清水戦 東京V予想スタメン" className="space-y-4">
    <SectionHeader title="清水戦 東京V予想スタメン" eyebrow="PREDICTED LINEUP / 2026.11.07" />
    <p className="text-[13px] font-bold leading-relaxed text-deep-green">※掲載内容はVerdy Match Labによる独自予想です。公式発表のスターティングメンバーではありません。</p>
    <article aria-label={`東京ヴェルディ ${shimizuFormation}`} className="min-w-0 lg:max-w-[560px]">
      <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-deep-green"><span>東京ヴェルディ</span><span>{shimizuFormation}</span></h3>
      <PredictionPitch rows={shimizuPredictionRows} numbers={shimizuPredictionNumbers} tone="verdy" />
    </article>
    <div className="space-y-2 text-[13px] leading-relaxed text-text-secondary">
      <p>長崎戦の先発メンバーを基本に、齋藤功佑→森田晃樹の1人変更を予想。4-4-2を継続します。</p>
      <p>森田は直近3試合（横浜FM戦61分、福岡戦67分、長崎戦45+10分）とも齋藤に代わって途中出場し、長崎戦では後半をすべてプレーしました。</p>
      <p>齋藤は長崎戦で公式記録上の脳振盪交代となりました。その後の状態と清水戦の出場可否は未発表で、欠場を断定するものではありません。出場可能となれば、長崎戦と同じ11人も考えられます。</p>
      <p>2トップの左右（染野左・一美右）と中央MFの左右（平川左）は、長崎戦の公式開始時配置に合わせています。</p>
      <p>ピッチ上の位置は独自の起用予想です。各ラインは画面左から右の順に表示しています。清水の予想スタメンは、配置を確認できる根拠が不足しているため掲載していません。</p>
    </div>
    <Sources sources={shimizuPredictionSources} />
  </section>;
}
