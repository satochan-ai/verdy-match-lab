import { SectionHeader } from "@/components/ui/SectionHeader";
import type { AvailabilityInfo as AvailabilityInfoData } from "@/types/domain";

export function AvailabilityInfo({ availability }: { availability: AvailabilityInfoData }) {
  return (
    <section>
      <SectionHeader title="出場情報" eyebrow="AVAILABILITY" />
      <div className="space-y-3 border-y border-border bg-surface px-3 py-3 text-[12px]">
        <div>
          <p className="font-bold text-text-primary">欠場濃厚</p>
          <ul className="mt-1 space-y-1 text-text-secondary">
            {availability.likelyUnavailable.map(({ team, players }) => (
              <li key={team}>
                <span className="font-bold text-text-primary">{team}</span>：{players.join("、")}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-text-secondary">
          <span className="font-bold text-text-primary">出場停止</span>：{availability.suspensionNote}
        </p>
        <p className="text-text-secondary">
          <span className="font-bold text-text-primary">契約上出場不可</span>：{availability.ineligibleNote}
        </p>
      </div>
    </section>
  );
}
