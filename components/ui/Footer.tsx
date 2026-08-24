import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="py-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
          Unofficial Fan Site / 非公式ファンサイト
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
          Verdy Match Labは非公式のファンサイトです。東京ヴェルディ株式会社・Jリーグとは無関係です。戦術分析は独自見解です。β版として試験運用中です。
        </p>
      </Container>
    </footer>
  );
}
