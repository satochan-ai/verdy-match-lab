import { SectionHeader } from "@/components/ui/SectionHeader";
import type { AvailabilityInfo as AvailabilityInfoData } from "@/types/domain";

export function AvailabilityInfo({ availability }: { availability: AvailabilityInfoData }) {
  return (
    <section>
      <SectionHeader title="出場情報" eyebrow="AVAILABILITY" />
      <div className="divide-y divide-border border-y border-border bg-surface px-3 text-[12px]">
        <div className="py-3">
          <p className="text-[11px] font-bold tracking-[0.08em] text-text-secondary">欠場濃厚</p>
          <ul className="mt-1.5 space-y-1 text-text-secondary">
            {availability.likelyUnavailable.map(({ team, players }) => (
              <li key={team}>
                <span className="font-bold text-text-primary">{team}</span>：{players.join("、")}
              </li>
            ))}
          </ul>
        </div>
        <p className="py-3 text-text-secondary">
          <span className="text-[11px] font-bold tracking-[0.08em]">出場停止</span>：{availability.suspensionNote}
        </p>
        <p className="py-3 text-text-secondary">
          <span className="text-[11px] font-bold tracking-[0.08em]">契約上出場不可</span>：{availability.ineligibleNote}
        </p>
      </div>
    </section>
  );
}
