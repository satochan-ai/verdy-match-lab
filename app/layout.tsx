import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Verdy Match Lab",
  description: "東京ヴェルディの試合を戦術軍師と楽しむβ版の非公式ファンサイト",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full">
      <body className="flex min-h-full flex-col bg-background text-text-primary antialiased">
        <Header />
        <main className="mx-auto w-full max-w-[480px] flex-1 px-4 py-6 md:max-w-5xl md:px-6 md:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
