import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";

/**
 * 和文の可変ウェイトfont。system font（Yu Gothic等）では太字が細く見え、Heroの
 * 見出しに必要な重さが出せないため導入する。next/fontによるself-host＋自動の
 * size-adjust fallbackを使い、外部CDNへのruntime fetchとlayout shiftを避ける。
 */
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "Verdy Match Lab",
  description: "東京ヴェルディの試合を戦術軍師と楽しむβ版の非公式ファンサイト",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`h-full ${notoSansJP.variable}`}>
      <body className="flex min-h-full flex-col bg-background text-text-primary antialiased">
        <Header />
        <main className="match-page-enter flex-1 py-6 md:py-8">
          <Container>{children}</Container>
        </main>
        <Footer />
      </body>
    </html>
  );
}
