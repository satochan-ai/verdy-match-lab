import type { PredictionPlayer } from "@/lib/match/prediction";

type Tone = "verdy" | "opponent" | "fctokyo";

const tones: Record<Tone, { frame: string; line: string; circle: string; role: string }> = {
  verdy: { frame: "border-deep-green bg-surface-tint", line: "border-primary-green/30", circle: "bg-primary-green", role: "text-deep-green" },
  opponent: { frame: "border-purple-800 bg-purple-50", line: "border-purple-700/30", circle: "bg-purple-700", role: "text-purple-900" },
  fctokyo: { frame: "border-blue-800 bg-blue-50", line: "border-blue-700/30", circle: "bg-blue-800 ring-2 ring-red-600", role: "text-blue-900" },
};

function PlayerName({ player }: { player: PredictionPlayer }) {
  const { name, nameBreak } = player;
  if (nameBreak && name.startsWith(nameBreak) && name.length > nameBreak.length) {
    return <>{nameBreak}<wbr />{name.slice(nameBreak.length)}</>;
  }
  return <>{name}</>;
}

/** 予想スタメンのピッチ図。rowsは上段＝FW・下段＝GK、行内は画面左→右。背番号は渡されたmapにある選手のみ表示する。 */
export function PredictionPitch({ rows, numbers, tone }: { rows: PredictionPlayer[][]; numbers: Record<string, number | undefined>; tone: Tone }) {
  const t = tones[tone];
  return (
    <div className={`relative overflow-hidden border-2 px-1 py-6 lg:px-3 ${t.frame}`}>
      <div aria-hidden="true" className={`pointer-events-none absolute inset-2 border ${t.line}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-2 top-1/2 border-t ${t.line}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border ${t.line}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-[25%] top-2 h-8 border-x border-b ${t.line}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-[25%] bottom-2 h-8 border-x border-t ${t.line}`} />
      <div className="relative grid min-h-[480px] content-between gap-6 lg:min-h-[520px]">
        {rows.map((row, index) => (
          <div key={index} className="grid items-start gap-1" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
            {row.map((player) => (
              <div key={player.name} className="min-w-0 text-center">
                <span className={`mx-auto flex size-7 items-center justify-center rounded-full text-[12px] font-extrabold text-white lg:size-9 lg:text-[14px] ${t.circle}`}>
                  {numbers[player.name] ?? ""}
                </span>
                <p className={`mt-1 text-[10px] font-bold lg:text-[12px] ${t.role}`}>{player.role}</p>
                <p className={`break-keep break-words font-extrabold leading-snug text-text-primary lg:text-[15px] ${player.nameBreak ? "text-[10px]" : "text-[12px]"}`}><PlayerName player={player} /></p>
                {player.alternative && <p className="mt-1 break-keep break-words text-[11px] leading-snug text-text-secondary lg:text-[12px]">{tone === "verdy" ? `（対抗：${player.alternative}）` : `（${player.alternative}）`}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
