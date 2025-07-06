import { ToggleDarkModeButtonStateful } from "@/components/general/toggle-dark-mode-button/toggle-dark-mode-button.stateful";
import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

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
    <html lang="pt-br" className="dark">
      <body
        className={`${montserratSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster duration={1000} />
        <ToggleDarkModeButtonStateful />
      </body>
    </html>
  );
}
