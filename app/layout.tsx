import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Verdy Match Lab",
  description: "東京ヴェルディの試合を戦術軍師と楽しむβ版の非公式ファンサイト",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full">
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
