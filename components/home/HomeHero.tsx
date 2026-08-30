import Image from "next/image";
import Link from "next/link";
import heroPhoto from "@/public/images/home/verdy-match-lab-hero.jpg";

/**
 * 総合TOP（`/`）のfull-bleed Hero。
 *
 * レイヤー構成は「背景（写真）→ オーバーレイ → コピー」の3層で固定してある。背景は
 * ユーザー本人が撮影したスタジアム写真（味の素スタジアム、試合開始前の夕景）1枚のみ。
 * ダミー画像・ストック写真・AI生成画像の類は一切使用しない。
 *
 * 元画像は縦長（1152×1536）でHero自体は横長のため、object-fit: coverは縦方向を
 * 大きくクロップする。object-positionは「空だけ／ピッチだけ」に振り切らず、
 * スタンドの弧＋ピッチ上部が同時に収まる縦位置（56%付近）を基準に、breakpointごとに
 * 微調整している（詳細はcontent layer直前のコメントを参照）。
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
      {/*
        background layer：ユーザー撮影のスタジアム写真1枚。Heroは画面表示直後に見える
        LCP要素になるためpriorityを付け、fill + sizes="100vw"でCLSなく全幅表示する。
        object-positionはbreakpointごとに縦位置だけ変える（横は常にcenter）。
      */}
      <Image
        src={heroPhoto}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_60%] md:object-[center_58%] lg:object-[center_56%]"
      />

      {/*
        overlay layer：Verdy Greenを写真の上に重ね、「写真だと分かる」かつ
        「Verdy GreenのHero」に見える濃度に調整。左側（テキストが乗る側）を最も濃く、
        右側へ向かって薄くするhorizontal gradientと、下端を締めるvertical gradientの二重。
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-deep-green/85 via-deep-green/55 to-primary-green/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-green/50"
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

          <p className="mt-4 text-[16px] font-extrabold leading-snug tracking-tight text-shine-white md:mt-5 md:text-[22px] lg:text-[28px]">
            TOP TEAMも、U-21も、BELEZAも。
          </p>

          <div className="mt-6 max-w-[34rem] md:mt-8">
            <span
              aria-hidden="true"
              className="block h-px w-full bg-pioneer-gold/70"
            />
            <p className="mt-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-shine-white/90 md:text-[13px]">
              TOP TEAM / U-21 / BELEZA
            </p>
          </div>

          <p className="mt-4 max-w-[30rem] text-[13px] leading-relaxed text-shine-white/90 md:mt-5 md:text-[15px]">
            東京ヴェルディの3カテゴリーを、ファンの視点で追う非公式メディア。
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
