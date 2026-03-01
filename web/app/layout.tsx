import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Awesome Agent Skills — The AI Agent Skills Directory",
  description:
    "The unified, auto-updating directory of AI agent skills, MCP servers, and tools across every platform. 8,000+ entries from 10+ sources.",
  openGraph: {
    title: "Awesome Agent Skills",
    description:
      "The unified directory for AI agent skills, MCP servers, Cursor rules, and more. Updated daily.",
    url: "https://awesomeagentskills.dev",
    siteName: "Awesome Agent Skills",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awesome Agent Skills",
    description:
      "The unified directory for AI agent skills, MCP servers, Cursor rules, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
