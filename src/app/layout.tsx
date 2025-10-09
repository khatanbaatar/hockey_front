import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Монголын хоккейн холбоо",
  description: "Монголын хоккейн спортын хөгжүүлэлт, тэмцээн зохион байгуулалт",
  icons: {
    icon: '/assets/logo.webp',
    shortcut: '/assets/logo.webp',
    apple: '/assets/logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="light scroll-smooth" dir="ltr">
      <body
        className={`font-nunito text-base text-slate-900 dark:text-white dark:bg-slate-900 antialiased min-h-screen flex flex-col bg-gray-50`}
      >
        <LanguageProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
