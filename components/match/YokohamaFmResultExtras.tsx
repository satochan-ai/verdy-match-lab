import { SectionHeader } from "@/components/ui/SectionHeader";
import { YokohamaFmPredictions } from "@/components/match/YokohamaFmPreContent";
import { yokohamaFmPredictionCheck, type TeamCheck } from "@/lib/match/yokohama-fm-check";
import { yokohamaFmViewerReview } from "@/lib/match/yokohama-fm-review";

/** 観戦者本人のレビュー。公式の試合結果・記録とは別セクションとして、主観を含むことを明示して掲載する。 */
export function YokohamaFmViewerReview() {
  return (
    <section aria-label="観戦レビュー" className="space-y-3 border-y border-border bg-surface px-4 py-5">
      <SectionHeader title="観戦レビュー" eyebrow="VIEWER REVIEW" />
      <p className="inline-block border border-deep-green px-2 py-0.5 text-[11px] font-bold text-deep-green">観戦者本人の主観を含むレビュー</p>
      <h3 className="text-[18px] font-extrabold leading-snug text-text-primary lg:text-[20px]">{yokohamaFmViewerReview.title}</h3>
      <div className="space-y-3 text-[14px] leading-relaxed text-text-primary">
        {yokohamaFmViewerReview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <p className="text-[13px] font-bold leading-relaxed text-deep-green">{yokohamaFmViewerReview.notice}</p>
    </section>
  );
}

function CheckBlock({ check }: { check: TeamCheck }) {
  const { changes } = check;
  return (
    <article aria-label={`${check.teamName} 予想の答え合わせ`} className="min-w-0 space-y-2 border border-border bg-surface-tint p-3 text-[13px] leading-relaxed text-text-primary">
      <h4 className="text-[15px] font-extrabold text-text-primary">{check.teamName}</h4>
      <p><span className="font-bold">予想11名と先発11名の一致：</span><span className="tabular-nums font-extrabold">{check.matched.length}名</span> / 11名</p>
      <p className="text-text-secondary">一致：{check.matched.join("、")}</p>
      <p className="text-text-secondary">予想したが先発しなかった選手：{check.predictedNotStarted.map((p) => `${p.name}（${p.appearance}）`).join("、")}</p>
      <p className="text-text-secondary">予想外の先発：{check.startedNotPredicted.join("、")}</p>
      <p><span className="font-bold">入れ替え予想の的中：</span><span className="tabular-nums font-extrabold">{changes.correct}件</span> / {changes.total}件（起用予想した{changes.entrants.length}名のうち先発 {changes.entrants.filter((r) => r.started).length}名、外す予想の{changes.leavers.length}名のうち非先発 {changes.leavers.filter((r) => !r.started).length}名）</p>
      <p className="text-text-secondary">起用予想：{changes.entrants.map((r) => `${r.name}（${r.started ? "先発 ○" : "先発せず ×"}）`).join("、")}</p>
      <p className="text-text-secondary">外す予想：{changes.leavers.map((r) => `${r.name}（${r.started ? "先発 ×" : "先発せず ○"}）`).join("、")}</p>
      <p className="text-text-secondary">主な予想の結果：{check.keyPlayers.map((p) => `${p.name}（${p.appearance}）`).join("、")}</p>
      <p><span className="font-bold">フォーメーション：</span>予想 {check.predictedFormation} ／ 公式の開始時フォーメーション {check.actualFormation ?? "未確認"} → <span className="font-bold">{check.formationVerdict}</span></p>
    </article>
  );
}

/** 試合前に公開した予想スタメンと公式先発の答え合わせ。予想データは変更せず、公開時点のまま別に表示する。 */
export function YokohamaFmPredictionCheck() {
  const { verdy, marinos } = yokohamaFmPredictionCheck;
  return (
    <section aria-label="予想スタメンの答え合わせ" className="space-y-4">
      <SectionHeader title="予想スタメンの答え合わせ" eyebrow="PREDICTION CHECK" />
      <p className="text-[13px] leading-relaxed text-text-secondary">
        試合前に公開した独自予想と、公式記録の先発11名を選手単位で比べています。公式の開始時フォーメーションを確認できていないため、フォーメーションとピッチ上の役割（サイド・ボランチ等）の一致は判定していません。
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <CheckBlock check={verdy} />
        <CheckBlock check={marinos} />
      </div>
      <details className="border border-border bg-surface p-4">
        <summary className="cursor-pointer text-[13px] font-bold text-text-primary">試合前に公開した予想スタメン（公開時点のまま）</summary>
        <div className="mt-4"><YokohamaFmPredictions /></div>
      </details>
    </section>
  );
}
