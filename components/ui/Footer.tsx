import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="py-4">
        <p className="text-[11px] leading-relaxed text-text-secondary">
          Verdy Match Labは非公式のファンサイトです。東京ヴェルディ株式会社・Jリーグとは無関係です。戦術分析は独自見解です。β版として試験運用中です。
        </p>
      </Container>
    </footer>
  );
}
