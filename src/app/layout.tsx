import { ToggleDarkModeButtonStateful } from "@/components/general/toggle-dark-mode-button/toggle-dark-mode-button.stateful";
import { Analytics } from "@vercel/analytics/next";
import "dayjs/locale/pt-br";
import type { Metadata } from "next";
import { Geist_Mono, Outfit, Source_Sans_3 } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";

const outfitFont = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sourceSans3",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireMate",
  description: "Para te ajudar nas suas candidaturas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${outfitFont.variable} ${sourceSans3.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster duration={1000} position="top-right" />
          <ToggleDarkModeButtonStateful />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
