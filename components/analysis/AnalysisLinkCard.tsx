import Link from "next/link";

/** 特別分析記事への導線カード。記事ごとのeyebrow・title・summary・hrefを渡して再利用する。 */
export function AnalysisLinkCard({ eyebrow, title, summary, href }: { eyebrow: string; title: string; summary: string; href: string }) {
  return (
    <Link href={href} aria-label={`${eyebrow} ${title}`} className="block border-y-2 border-deep-green bg-surface-tint px-4 py-4 focus-ring lg:px-6 lg:py-5">
      <p className="text-[11px] font-bold tracking-[0.15em] text-pioneer-gold-deep">{eyebrow}</p>
      <p className="mt-1 text-[17px] font-extrabold leading-snug text-text-primary lg:text-[20px]">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">{summary}</p>
      <p className="mt-3 text-[13px] font-bold text-deep-green">記事を読む →</p>
    </Link>
  );
}
