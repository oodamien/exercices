import type { Metadata } from "next";
import { Nunito, Chakra_Petch, Fredoka, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/app/components/app-shell";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const chakraPetch = Chakra_Petch({ variable: "--font-chakra-petch", weight: "300", style: "normal", subsets: ["latin"] });
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StarCalc",
  description: "Explore les maths dans l'espace !",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${nunito.variable} ${geistMono.variable} ${chakraPetch.variable} ${fredoka.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
