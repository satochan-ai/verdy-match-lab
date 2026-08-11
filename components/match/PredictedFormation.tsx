import type { PredictedLineup, Team } from "@/types/domain";

const formationRows: Record<string, number[]> = {
  "4-3-3": [4, 3, 3],
  "4-4-2": [4, 4, 2],
  "3-4-2-1": [3, 4, 2, 1],
  "4-2-3-1": [4, 2, 3, 1],
  "3-4-3": [3, 4, 3],
};

/**
 * 対戦相手識別用の背番号マーカーaccent。特定クラブのハードコードは
 * 今回のmatch-1（柏レイソル）分のみ。将来の対戦相手を汎用的に扱うには
 * Match型／DB側にクラブカラーを持たせる設計が必要になるため、
 * 今回はteam.id単位の最小限マッピングに留める（一般化はしない）。
 * マッピングにないチームは既存の中立表示にフォールバックする。
 */
const OPPONENT_MARKER_ACCENT: Record<string, string> = {
  "kashiwa-reysol": "bg-team-opponent-accent text-fusion-black",
};

export function PredictedFormation({
  team,
  lineup,
}: {
  team: Team;
  lineup: PredictedLineup;
}) {
  const rows = formationRows[lineup.formation];

  if (!rows || lineup.starters.length !== rows.reduce((total, count) => total + count, 0) + 1) {
    return null;
  }

  const [goalkeeper, ...outfieldPlayers] = lineup.starters;
  const outfieldRows = rows.map((count, rowIndex) => {
    const startIndex = rows.slice(0, rowIndex).reduce((total, rowCount) => total + rowCount, 0);

    return outfieldPlayers.slice(startIndex, startIndex + count);
  });

  return (
    <section aria-labelledby={`predicted-formation-${team.id}`}>
      <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
        <h3 id={`predicted-formation-${team.id}`} className="min-w-0 text-[13px] font-bold text-text-primary lg:text-[14px]">
          {team.name}
        </h3>
        <p className="shrink-0 text-[12px] font-bold tabular-nums text-text-secondary">
          {lineup.formation}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative mt-2 overflow-hidden border border-border bg-surface px-2 py-3 lg:px-4 lg:py-6"
      >
        <div className="pointer-events-none absolute inset-x-2 top-1/2 border-t border-border" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border lg:size-16" />
        <div className="pointer-events-none absolute inset-x-[18%] top-0 h-6 border-x border-b border-border lg:h-10" />
        <div className="pointer-events-none absolute inset-x-[18%] bottom-0 h-6 border-x border-t border-border lg:h-10" />

        <div className="relative z-10 flex min-h-56 flex-col justify-between gap-2 lg:min-h-[22rem] lg:gap-3">
          {[...outfieldRows].reverse().map((players, rowIndex) => {
            return (
              <div key={`${lineup.formation}-${rowIndex}`} className="grid" style={{ gridTemplateColumns: `repeat(${players.length}, minmax(0, 1fr))` }}>
                {players.map((player) => (
                  <PlayerMarker key={`${player.number ?? "tbd"}-${player.name}`} player={player} team={team} />
                ))}
              </div>
            );
          })}
          <div className="grid grid-cols-1">
            <PlayerMarker player={goalkeeper} team={team} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayerMarker({
  player,
  team,
}: {
  player: PredictedLineup["starters"][number];
  team: Team;
}) {
  const opponentAccent = !team.isVerdy ? OPPONENT_MARKER_ACCENT[team.id] : undefined;
  const markerClass = team.isVerdy
    ? "bg-primary-green text-white"
    : opponentAccent ?? "border border-text-secondary bg-surface text-text-primary";

  return (
    <div className="min-w-0 text-center">
      <span
        className={`mx-auto flex size-5 items-center justify-center rounded-full text-[10px] font-bold tabular-nums lg:size-8 lg:text-[13px] ${markerClass}`}
      >
        {player.number ?? "—"}
      </span>
      <p className="mx-auto mt-0.5 max-w-[5.5rem] truncate text-[10px] font-bold leading-tight text-text-primary lg:max-w-[7rem] lg:text-[12px]">
        {player.name}
      </p>
    </div>
  );
}
