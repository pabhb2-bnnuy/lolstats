import type { Metadata } from "next";
// Importing the website font
import { Inter } from "next/font/google";
// Tailwind - CSS.
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Setting only the latin font
const inter = Inter({
  subsets: ["latin"],
});

// Setting up the metadata
export const metadata: Metadata = {
  title: "LolStats, Live game reviewing tool!",
  description: "This tool is meant to help me learn some basic react stuff :).",
};

// Returns the React default function
export default function RootLayout({
  children,
  // children object is only readable to protect from = null
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Navbar />
      {/* Setting up thhe Inter font with a class */}
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {/* Calling the Children object (page.tsx) */}
        {children}
      </body>
      <Footer />
    </html>
  );
}
