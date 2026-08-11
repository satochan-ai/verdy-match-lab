export function SectionHeader({
  title,
  caption,
  eyebrow,
  accent,
}: {
  title: string;
  caption?: string;
  /** 見出し上の小さな英字サブラベル。多用しないこと。 */
  eyebrow?: string;
  /** trueの場合、左側にVerdy Greenの細い罫線を添えて存在感を少し高める。 */
  accent?: boolean;
}) {
  return (
    <div className={`mb-3 ${accent ? "border-l-2 border-primary-green pl-3" : ""}`}>
      {eyebrow && (
        <p className="text-[10px] font-bold tracking-[0.15em] text-pioneer-gold-deep">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[15px] font-bold text-text-primary">{title}</h2>
      {caption && (
        <p className="mt-0.5 text-[12px] text-text-secondary">{caption}</p>
      )}
    </div>
  );
}
