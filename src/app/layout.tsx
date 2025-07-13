import { ToggleDarkModeButtonStateful } from "@/components/general/toggle-dark-mode-button/toggle-dark-mode-button.stateful";
import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
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
        className={`${montserratSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster duration={1000} position="top-right" />
          <ToggleDarkModeButtonStateful />
        </Providers>
      </body>
    </html>
  );
}
