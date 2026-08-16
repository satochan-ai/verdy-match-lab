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

    return {
      players: outfieldPlayers.slice(startIndex, startIndex + count),
      /**
       * 3-4-2-1の4人行はWB-CH-CH-WBの並び（配列側で既に保証済み）。
       * 均等4分割グリッドだとWBとCHが同一直線上に見えてしまうため、
       * この行のみ「WBを両端・CHを中央でまとめる」専用レイアウトに切り替える。
       * 他formationの4人行（4-4-2の最終ラインなど）は対象外で、既存の均等グリッドのまま。
       */
      isWingbackRow: lineup.formation === "3-4-2-1" && count === 4,
    };
  });

  return (
    <section aria-labelledby={`predicted-formation-${team.id}`}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 id={`predicted-formation-${team.id}`} className="min-w-0 text-[14px] font-extrabold text-text-primary lg:text-[16px]">
          {team.name}
        </h3>
        <p className="shrink-0 text-[12px] font-bold tabular-nums text-text-secondary">
          {lineup.formation}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative mt-1.5 overflow-hidden border-2 border-fusion-black bg-surface-tint px-2 py-3 lg:mx-auto lg:max-w-[440px] lg:px-4 lg:py-7"
      >
        <div className="pointer-events-none absolute inset-x-2 top-1/2 border-t border-fusion-black/15" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-fusion-black/15 lg:size-20" />
        <div className="pointer-events-none absolute inset-x-[18%] top-0 h-6 border-x border-b border-fusion-black/15 lg:h-11" />
        <div className="pointer-events-none absolute inset-x-[18%] bottom-0 h-6 border-x border-t border-fusion-black/15 lg:h-11" />

        <div className="relative z-10 flex min-h-56 flex-col justify-between gap-2 lg:min-h-[25rem] lg:gap-3">
          {[...outfieldRows].reverse().map((row, rowIndex) => {
            if (row.isWingbackRow && row.players.length === 4) {
              const [wbLeft, chLeft, chRight, wbRight] = row.players;
              return (
                <div key={`${lineup.formation}-${rowIndex}`} className="flex items-start justify-between">
                  <PlayerMarker player={wbLeft} team={team} />
                  <div className="flex gap-2 lg:gap-4">
                    <PlayerMarker player={chLeft} team={team} />
                    <PlayerMarker player={chRight} team={team} />
                  </div>
                  <PlayerMarker player={wbRight} team={team} />
                </div>
              );
            }
            return (
              <div key={`${lineup.formation}-${rowIndex}`} className="grid" style={{ gridTemplateColumns: `repeat(${row.players.length}, minmax(0, 1fr))` }}>
                {row.players.map((player) => (
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
  // 東京Vを主役に保つため、opponent markerには最小限の調整（Fusion Black枠）のみを加える。
  const markerClass = team.isVerdy
    ? "bg-primary-green text-white lg:size-10"
    : opponentAccent
      ? `${opponentAccent} border-2 border-fusion-black lg:size-9`
      : "border border-text-secondary bg-surface text-text-primary lg:size-9";

  return (
    <div className="min-w-0 text-center">
      <span
        className={`mx-auto flex size-5 items-center justify-center rounded-full text-[10px] font-bold tabular-nums lg:text-[13px] ${markerClass}`}
      >
        {player.number ?? "—"}
      </span>
      <p className="mx-auto mt-0.5 max-w-[5.5rem] truncate text-[10px] font-bold leading-tight text-text-primary lg:max-w-[7.5rem] lg:text-[13px]">
        {player.name}
      </p>
    </div>
  );
}
