import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex items-center justify-between py-3">
        <Link href="/" className="text-[15px] font-bold text-text-primary">
          Verdy Match Lab
        </Link>
        <Link href="/archive" className="text-[13px] font-bold text-deep-green">
          Archive
        </Link>
      </Container>
      <Container className="pb-2">
        <span className="text-[11px] text-text-secondary">
          UNOFFICIAL / 非公式ファンサイト
        </span>
      </Container>
    </header>
  );
}
