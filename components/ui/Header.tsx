import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex items-center justify-between gap-3 py-3">
        <div className="flex min-w-0 items-baseline gap-2">
          <Link href="/" className="text-[15px] font-bold text-text-primary">
            Verdy Match Lab
          </Link>
          {/*
            非公式表記は削除せず、Footerの正式な注記（東京ヴェルディ株式会社・Jリーグとは
            無関係である旨）を本文として維持したうえで、ヘッダー側は極小ラベルに留める。
            ファーストビューで最初に読む言葉が免責表記にならないようにするための整理であり、
            表記の法的な意味は変更していない。
          */}
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">
            Unofficial
          </span>
        </div>
        <Link href="/archive" className="shrink-0 text-[13px] font-bold text-deep-green">
          Archive
        </Link>
      </Container>
    </header>
  );
}
