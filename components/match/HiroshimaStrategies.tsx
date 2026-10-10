import type { Strategy } from "@/types/domain";
import { StrategyList } from "@/components/match/StrategyList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamPerspective } from "@/components/match/TeamPerspective";

// 公式試合データとは別の、試合前時点の独自戦術提案。
const verdy: Strategy[] = [
  { orderNo: 1, title: "広島の両翼を封じよ", description: "広島の両ウイングバックに自由を与えず、サイドでの数的不利を避ける。4-4-2ならSHとSB、3-4-1-2ならWBとCBの連係が鍵となる。", result: "pending" },
  { orderNo: 2, title: "二枚の刃で最終ラインを崩せ", description: "染野と一美の2トップで広島の最終ラインを揺さぶる。藤本のパスと、前線の背後への動き出しを組み合わせてチャンスを生み出す。", result: "pending" },
  { orderNo: 3, title: "新体制の勢いを先手に変えよ", description: "守備の連動と球際の強さを立ち上がりから示し、攻守の切り替えで主導権を握る。序盤の勢いを得点機会につなげたい。", result: "pending" },
];
const hiroshima: Strategy[] = [
  { orderNo: 1, title: "両翼を高く張り、守備を引き裂け", description: "両WBを高い位置に配置してピッチの幅を確保。東京Vのサイド守備を広げ、中央の2シャドーが使えるスペースを生み出す。", result: "pending" },
  { orderNo: 2, title: "新布陣の隙を突け", description: "東京Vが4バックへ変更する場合は、SBとCBの間や中盤との間のスペースを狙う。3バックを継続する場合も、WBの背後を攻撃の起点とする。", result: "pending" },
  { orderNo: 3, title: "前線の圧力で主導権を奪え", description: "予想先発のアレーを起点に攻撃を組み立て、加藤・鈴木の2シャドーが連動。前線からのプレスで東京Vのビルドアップを制限する。", result: "pending" },
];

export function HiroshimaStrategies() {
  return (
    <section aria-label="軍師の三策（東京V／広島）" className="space-y-4">
      <SectionHeader title="軍師の三策" eyebrow="MATCH PLAN / 2026.10.11" variant="emphasis" />
      <TeamPerspective label="軍師の三策" verdy={
        <div className="min-w-0 border-t-2 border-primary-green bg-surface-tint px-4 py-5">
          <StrategyList strategies={verdy} title="東京ヴェルディ視点" />
        </div>
      } hiroshima={<div className="min-w-0 border-t-2 border-purple-700 bg-purple-50 px-4 py-5">
          <StrategyList strategies={hiroshima} title="サンフレッチェ広島視点" opponent />
        </div>
      } />
      <p className="text-[13px] font-bold leading-relaxed text-text-secondary">
        ※軍師の三策はVerdy Match Lab独自の戦術提案です。両クラブの公式見解や実際の試合指示を示すものではありません。
      </p>
    </section>
  );
}
