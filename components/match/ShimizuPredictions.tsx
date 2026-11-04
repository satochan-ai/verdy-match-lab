import { PredictionPitch } from "@/components/match/PredictionPitch";
import { Sources } from "@/components/match/YokohamaFmPreContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { shimizuFormation, shimizuPredictionNumbers, shimizuPredictionRows, shimizuPredictionSources } from "@/lib/match/shimizu-prediction";
import { shimizuOpponentFormation, shimizuOpponentNumbers, shimizuOpponentRows, shimizuOpponentSources } from "@/lib/match/shimizu-opponent-prediction";

export function ShimizuPredictions() {
  return <section aria-label="清水戦 両チーム予想スタメン" className="space-y-4">
    <SectionHeader title="清水戦 両チーム予想スタメン" eyebrow="PREDICTED LINEUP / 2026.11.07" />
    <p className="text-[13px] font-bold leading-relaxed text-deep-green">※掲載内容は両チームともVerdy Match Labによる独自予想です。公式発表のスターティングメンバーではありません。</p>
    <div className="grid gap-6 lg:grid-cols-2">
      <article aria-label={`東京ヴェルディ ${shimizuFormation}`} className="min-w-0">
        <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-deep-green"><span>東京ヴェルディ</span><span>{shimizuFormation}</span></h3>
        <PredictionPitch rows={shimizuPredictionRows} numbers={shimizuPredictionNumbers} tone="verdy" />
      </article>
      <article aria-label={`清水エスパルス ${shimizuOpponentFormation}`} className="min-w-0">
        <h3 className="mb-2 flex justify-between gap-3 text-[16px] font-extrabold text-orange-900"><span>清水エスパルス</span><span>{shimizuOpponentFormation}</span></h3>
        <PredictionPitch rows={shimizuOpponentRows} numbers={shimizuOpponentNumbers} tone="shimizu" />
      </article>
    </div>
    <div className="space-y-2 text-[13px] leading-relaxed text-text-secondary">
      <h3 className="font-extrabold text-deep-green">東京Vの起用予想と根拠</h3>
      <p>長崎戦の先発メンバーを基本に、齋藤功佑→森田晃樹の1人変更を予想。4-4-2を継続します。</p>
      <p>森田は直近3試合（横浜FM戦61分、福岡戦67分、長崎戦45+10分）とも齋藤に代わって途中出場し、長崎戦では後半をすべてプレーしました。</p>
      <p>齋藤は長崎戦で公式記録上の脳振盪交代となりました。その後の状態と清水戦の出場可否は未発表で、欠場を断定するものではありません。出場可能となれば、長崎戦と同じ11人も考えられます。</p>
      <p>2トップの左右（染野左・一美右）と中央MFの左右（平川左）は、長崎戦の公式開始時配置に合わせています。</p>
      <p>ピッチ上の位置は独自の起用予想です。各ラインは画面左から右の順に表示しています。</p>
    </div>
    <Sources sources={shimizuPredictionSources} />
    <div className="space-y-2 text-[13px] leading-relaxed text-text-secondary">
      <h3 className="font-extrabold text-orange-900">清水の起用予想と根拠</h3>
      <p>京都戦の先発メンバーを基本に、蓮川壮大→パク スンウクの1人変更を予想。直近5試合の公式配置図はいずれも4-1-2-3です。</p>
      <p>蓮川は京都戦の14分に負傷交代しました。診断や東京V戦の出場可否は発表されておらず、欠場を断定するものではありません。パクは京都戦で蓮川に代わって出場し、交代後は左CBの位置に入りました。</p>
      <p>アンカーの弓場将輝は直近4試合連続、右SBの須貝英大と左SBのマテウス ブルネッティは直近5試合すべてで先発しています。</p>
      <p>GKは京都戦で先発した沖悠哉を予想しましたが、それ以前の4試合は梅田透吾が先発しています。左WGの藤井智也は直近5試合すべてで途中出場、左IHは嶋本悠大・平戸太貴も候補です。候補は先発・ベンチ入りの確定情報ではありません。</p>
      <p>配置は攻撃方向を上にそろえ、各ラインを画面左から右の順に表示しています。左右は公式配置図からの判断を含む独自予想です。</p>
    </div>
    <Sources sources={shimizuOpponentSources} />
  </section>;
}
