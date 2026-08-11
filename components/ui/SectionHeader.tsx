export function SectionHeader({
  title,
  caption,
  eyebrow,
  variant = "standard",
}: {
  title: string;
  caption?: string;
  /** 見出し上の小さな英字サブラベル。多用しないこと。 */
  eyebrow?: string;
  /**
   * standard: 通常の見出し。
   * emphasis: Gold罫線＋一回り大きい見出し。Match Plan等、
   * Verdy Match Labのブランドコアとなるセクションにのみ使用（乱用禁止）。
   */
  variant?: "standard" | "emphasis";
}) {
  const isEmphasis = variant === "emphasis";

  return (
    <div className={`mb-3 ${isEmphasis ? "border-l-2 border-pioneer-gold pl-3" : ""}`}>
      {eyebrow && (
        <p className="text-[10px] font-bold tracking-[0.2em] text-pioneer-gold-deep lg:text-[11px]">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-bold text-text-primary ${
          isEmphasis
            ? "text-[17px] lg:text-[19px]"
            : "text-[15px] lg:text-[17px]"
        }`}
      >
        {title}
      </h2>
      {caption && (
        <p className="mt-0.5 text-[12px] text-text-secondary">{caption}</p>
      )}
    </div>
  );
}
