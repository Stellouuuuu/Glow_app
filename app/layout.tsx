import type { Metadata } from "next";
import { Dancing_Script, Fraunces, Poppins } from "next/font/google";
import CartProvider from "@/components/CartProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const dancingScript = Dancing_Script({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-script",
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
    <html lang="fr">
      <body
        className={`${fraunces.variable} ${poppins.variable} ${dancingScript.variable}`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
