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
  title: "LolStats, Herramienta para revisar tus partidas!",
  description:
    "Revisa tu perfil, partidas, elo y la partida en vivo que estas jugando!",

  openGraph: {
    title: "LolStats",
    description:
      "Revisa tu perfil, partidas, elo y la partida en vivo que estas jugando!",
    url: "https://lolstats.bnnuytech.net",
    siteName: "LolStats",
    images: [
      {
        url: "https://lolstats.bnnuytech.net/og-image.png",
        width: 1200,
        height: 630,
        alt: "LolStats - League of Legends Stats",
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LolStats",
    description:
      "Revisa tu perfil, partidas, elo y la partida en vivo que estas jugando!",
    images: ["https://lolstats.bnnuytech.net/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-slate-900 bg-[url('/test.png')] bg-fixed">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AnimatedBody>
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </AnimatedBody>
      </body>
    </html>
  );
}