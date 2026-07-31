import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AirbnbAI - Smart Rental Marketplace",
  description: "AI-powered Airbnb rental marketplace with price prediction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body 
        className="min-h-full flex flex-col bg-slate-950 text-white selection:bg-pink-500 selection:text-white"
        style={{ backgroundColor: '#020617' }}
      >
        <SmoothScrollProvider>
            {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
