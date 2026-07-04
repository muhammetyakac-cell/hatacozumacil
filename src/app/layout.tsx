import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "HataÇözümAcil | Tüm Hata Kodları ve Çözümleri",
  description: "İnternetteki hata çözümlerini derleyen, kategorize eden, detaylı ve kesin çözüm sunan platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <main className="page-wrapper container">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
