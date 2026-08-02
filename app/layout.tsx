import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBody from "@/components/AnimatedBody";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LolStats, Live game reviewing tool!",
  description: "This tool is meant to help me learn some basic react stuff :).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-slate-900 scrollbar-thumb-amber-100 bg-[url(/test.png)]"
    >
      <body className={`${inter.className} min-h-screen`}>
        <AnimatedBody>
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </AnimatedBody>
      </body>
    </html>
  );
}
