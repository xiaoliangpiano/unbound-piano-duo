import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/data/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dict = getDictionary("en");

export const metadata: Metadata = {
  title: dict.siteTitle,
};

// A separate root layout from src/app/zh/layout.tsx (Next.js "multiple root
// layouts" pattern) — this is what lets each locale set its own <html lang>
// without a client-side hack. See src/app/zh/layout.tsx for the counterpart.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={dict.htmlLang} className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
