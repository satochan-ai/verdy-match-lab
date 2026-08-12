type Variant =
  | "live"
  | "half_time"
  | "finished"
  | "scheduled"
  | "home"
  | "away"
  | "win"
  | "draw"
  | "loss"
  | "hit"
  | "partial"
  | "miss";

const styles: Record<Variant, string> = {
  live: "bg-error text-white",
  half_time: "bg-text-secondary text-white",
  finished: "border border-border text-text-secondary",
  scheduled: "border border-border text-text-secondary",
  home: "border border-border text-text-secondary",
  away: "border border-border text-text-secondary",
  win: "bg-primary-green text-white",
  draw: "border border-border text-text-secondary",
  loss: "bg-error text-white",
  hit: "bg-primary-green text-white",
  partial: "bg-warning text-white",
  miss: "bg-error text-white",
};

const labels: Record<Variant, string> = {
  live: "LIVE",
  half_time: "HALF TIME",
  finished: "終了",
  scheduled: "試合前",
  home: "HOME",
  away: "AWAY",
  win: "W",
  draw: "D",
  loss: "L",
  hit: "○ 的中",
  partial: "△ 一部的中",
  miss: "× 外れ",
};

export function StatusBadge({
  variant,
  label,
}: {
  variant: Variant;
  label?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-bold tracking-wide ${styles[variant]}`}
    >
      {variant === "live" && (
        <span aria-hidden="true" className="live-pulse inline-block size-1.5 rounded-full bg-white" />
      )}
      {label ?? labels[variant]}
    </span>
  );
}
