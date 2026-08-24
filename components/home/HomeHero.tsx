import Link from "next/link";

/**
 * 総合TOP（`/`）のfull-bleed Hero。
 *
 * レイヤー構成は「背景 → オーバーレイ → コピー」の3層で固定してある。現時点の背景は
 * VERDY GREENのベタ面のみだが、将来ユーザー撮影写真を導入する際は背景レイヤー（下記
 * `background layer`）へNext/Image等を差し込み、オーバーレイの不透明度を上げるだけで
 * 移行できる。現段階ではダミー画像・ストック写真の類は一切使用しない。
 *
 * full-bleed化は`layout.tsx`のContainer（max-w-1280 + 左右padding）とmainのpaddingを
 * 打ち消す負のmarginで行う。スクロールバー幅の分だけviewport端を僅かに超えるが、
 * bodyの`overflow-x: clip`（globals.css）で切り取られるため横スクロールは発生しない。
 */
export function HomeHero({
  ctaHref,
  ctaLabel,
}: {
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <section className="relative -mt-6 mx-[calc(50%-50vw)] overflow-hidden bg-primary-green text-shine-white md:-mt-8">
      {/* background layer：将来ここに写真が入る。現在は親のbg-primary-greenがそのまま見える。 */}

      {/* overlay layer：下端をdeep-greenへ落とすごく弱いgradient。写真導入時はここを濃くする。 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-green/45"
      />

      {/* content layer */}
      <div className="relative flex min-h-[52svh] flex-col justify-center px-4 py-14 md:min-h-[60vh] md:px-6 md:py-20 lg:min-h-[68vh] xl:px-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-shine-white/90 md:text-[12px]">
            Verdy Match Lab
          </p>

          <h1 className="mt-5 text-[30px] font-black leading-[1.0] tracking-tight min-[360px]:text-[36px] md:mt-6 md:text-[44px] lg:text-[56px] xl:text-[72px]">
            緑は、ひとつ。
          </h1>

          <div className="mt-6 max-w-[34rem] md:mt-8">
            <span
              aria-hidden="true"
              className="block h-px w-full bg-pioneer-gold/70"
            />
            <p className="mt-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-shine-white/90 md:text-[13px]">
              TOP TEAM / U-21 / BELEZA
            </p>
          </div>

          <p className="mt-5 max-w-[30rem] text-[13px] leading-relaxed text-shine-white/90 md:mt-6 md:text-[15px]">
            東京ヴェルディの現在と未来を、試合・LIVE・記録から追う。
          </p>

          <Link
            href={ctaHref}
            className="mt-8 inline-flex h-12 items-center justify-center bg-shine-white px-6 text-[14px] font-bold text-deep-green transition-colors duration-200 hover:bg-surface-tint focus-ring-inverse md:mt-10 md:h-[52px] md:px-8 md:text-[15px]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
