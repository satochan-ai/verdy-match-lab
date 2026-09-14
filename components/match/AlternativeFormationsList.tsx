import { SectionHeader } from "@/components/ui/SectionHeader";
import type { AlternativeFormation, Team } from "@/types/domain";

/**
 * 対戦相手の対抗フォーメーション案（本命＝predictedLineupsとは別枠）。
 * FormationPitchのようなピッチ図は描かず、ポジション別の構造化リストで
 * コンパクトに比較できる形にする（初回実装）。横スクロールが出ないよう、
 * カードは縦積み（デスクトップのみ2カラム）で表示する。
 */
export function AlternativeFormationsList({
  team,
  formations,
}: {
  team: Team;
  formations: AlternativeFormation[];
}) {
  if (formations.length === 0) return null;

  return (
    <section>
      <SectionHeader title="別プラン" eyebrow="FORMATION OPTIONS" caption={`${team.name}の対抗フォーメーション案（本命以外）`} />
      <div className="grid gap-4 border-y border-border bg-surface px-3 py-4 md:grid-cols-2">
        {formations.map((option) => (
          <div key={option.title} className="border border-border p-3">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="min-w-0 break-words text-[13px] font-bold text-text-primary">{option.title}</h3>
              <span className="shrink-0 text-[12px] font-bold tabular-nums text-text-secondary">{option.formation}</span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {option.starters.map((starter, index) => (
                <li
                  key={`${starter.role}-${starter.name}-${index}`}
                  className="grid min-w-0 grid-cols-[3rem_1.5rem_minmax(0,1fr)] gap-x-2 text-[12px]"
                >
                  <span className="font-bold text-text-secondary">{starter.role}</span>
                  <span className="tabular-nums text-right text-text-secondary">{starter.number ?? "—"}</span>
                  <span className="min-w-0 break-words">
                    <span className="font-bold text-text-primary">{starter.name}</span>
                    {starter.alternative && (
                      <span className="block text-[11px] font-normal leading-tight text-text-secondary">
                        代替候補：{starter.alternative}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            {option.note && (
              <p className="mt-2 border-t border-border pt-2 text-[11px] leading-relaxed text-text-secondary">
                {option.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
