import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-[480px] items-center justify-between px-4 py-3 md:max-w-5xl md:px-6">
        <Link href="/" className="text-[15px] font-bold text-text-primary">
          Verdy Match Lab
        </Link>
        <Link href="/archive" className="text-[13px] font-bold text-deep-green">
          Archive
        </Link>
      </div>
      <div className="mx-auto max-w-[480px] px-4 pb-2 md:max-w-5xl md:px-6">
        <span className="text-[11px] text-text-secondary">
          UNOFFICIAL / 非公式ファンサイト
        </span>
      </div>
    </header>
  );
}
