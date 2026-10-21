import type { Metadata } from "next";
import localFont from "next/font/local";
import CartProvider from "@/components/CartProvider";
import "./globals.css";

// Jost (police de SHEIN, licence SIL OFL) servie localement : pas de dépendance réseau au build.
const jost = localFont({
  src: "./fonts/Jost-Latin-Variable.woff2",
  weight: "100 900",
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GLOW - Beauté, Mode & Mèches",
  description:
    "Soins, maquillage, mode et mèches : tout ce qu'il te faut, choisi avec soin, pour une routine qui te ressemble.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={jost.variable}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
