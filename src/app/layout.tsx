import type { Metadata } from "next";
import { Geist, Geist_Mono, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/app/components/app-shell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const chakraPetch = Chakra_Petch({ variable: "--font-chakra-petch", weight: "300", style: "normal", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeux Éducatifs",
  description: "Jeux de calcul avec boulier",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
