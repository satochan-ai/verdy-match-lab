import { SectionHeader } from "@/components/ui/SectionHeader";
import type { CommonFixture } from "@/lib/types/fixture";

const keyPoints = [
  { no: "01", title: "新監督の選手起用", text: "選考がフラットとされる中、従来の序列から変化があるか。" },
  { no: "02", title: "フォーメーション", text: "4-4-2と3-4-1-2のどちらを採用するか。" },
  { no: "03", title: "藤本寛也のポジション", text: "右SHかトップ下か。配置によって攻撃の形が変わる。" },
  { no: "04", title: "広島の攻撃への対応", text: "3-4-2-1の両WBと2シャドーにどう対応するか。アレーの先発は独自予想として扱う。" },
];

function formatKickoff(iso: string) {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo", month: "numeric", day: "numeric", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("month")}月${part("day")}日（${part("weekday")}）${part("hour")}:${part("minute")}`;
}

/**
 * 広島戦（sched-hiroshima）の試合前プレビュー。公式の試合情報（日程・会場）は既存のfixtureから出し、
 * 見立て・注目点はVerdy Match Labの独自分析として区別する。勝敗・スコアの予想や、
 * 出場・先発を確定する記述は含めない。試合開始後も「試合前時点」の表記を残す。
 * 順位・成績は既存の順位表スナップショットが試合前の最新値と一致しないため掲載しない。
 */
export function HiroshimaMatchPreview({ fixture }: { fixture: CommonFixture }) {
  return (
    <section aria-labelledby="hiroshima-preview-title" className="space-y-5 border-y border-border bg-surface px-4 py-5 lg:px-6 lg:py-6">
      <div>
        <SectionHeader title="新体制の初陣。相馬ヴェルディはどう変わるのか" eyebrow="MATCH PREVIEW" />
        <p className="inline-block border border-deep-green px-2 py-0.5 text-[11px] font-bold text-deep-green">試合前時点の独自プレビュー</p>
      </div>

      <div className="space-y-3 text-[14px] leading-relaxed text-text-primary">
        <p>リーグ戦8試合未勝利の東京ヴェルディが、相馬直樹新監督のもとでサンフレッチェ広島に挑みます。</p>
        <p>直近の天皇杯鳥取戦は、延長0-0、PK戦3-4（鳥取3-4東京V）で東京ヴェルディが勝ち上がりました。</p>
        <p>
          注目は、鳥取戦で用いた3-4-1-2を継続するのか、4-4-2に変更するのかという点です。広島は3-4-2-1を基本とする相手と見ており、ウイングバックと2シャドーへの対応が重要になりそうです。
        </p>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-bold tracking-[0.15em] text-pioneer-gold-deep">KEY POINTS</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {keyPoints.map((point) => (
            <li key={point.no} className="flex gap-3 border border-border bg-surface-tint p-3">
              <span className="tabular-nums text-[15px] font-extrabold text-primary-green">{point.no}</span>
              <div className="min-w-0">
                <h3 className="text-[14px] font-extrabold text-text-primary">{point.title}</h3>
                <p className="mt-0.5 text-[13px] leading-relaxed text-text-secondary">{point.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-bold tracking-[0.15em] text-pioneer-gold-deep">MATCH DATA</p>
        <dl className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-[13px]">
          <dt className="font-bold text-text-secondary">大会</dt>
          <dd className="text-text-primary">{fixture.competition.name}{fixture.competition.round ? ` ${fixture.competition.round}` : ""}</dd>
          {fixture.kickoffAt && (<><dt className="font-bold text-text-secondary">キックオフ</dt><dd className="tabular-nums text-text-primary">{formatKickoff(fixture.kickoffAt)}</dd></>)}
          {fixture.venue && (<><dt className="font-bold text-text-secondary">会場</dt><dd className="text-text-primary">{fixture.venue}</dd></>)}
        </dl>
      </div>

      <p className="text-[13px] font-bold leading-relaxed text-deep-green">
        本プレビューは試合前時点のVerdy Match Labによる独自分析です。クラブ発表の公式情報ではなく、勝敗・スコアの予想や、出場・先発を確定する内容でもありません。
      </p>
      <p className="text-[12px] leading-relaxed text-text-secondary">
        試合日程・会場：
        <a href="https://www.verdy.co.jp/match/schedule/" target="_blank" rel="noopener noreferrer" className="font-bold text-deep-green underline">東京ヴェルディ公式 試合日程</a>
      </p>
    </section>
  );
}
