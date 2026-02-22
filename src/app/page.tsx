"use client";

import Link from "next/link";
import { useTranslation } from "@/app/components/language-context";
import { Astronaut } from "@/app/components/icons/astronaut";
import { PlanetAbacus } from "@/app/components/icons/planet-abacus";
import { Rocket } from "@/app/components/icons/rocket";

export default function Home() {
  const t = useTranslation();

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-4xl px-4 py-12 relative">
        {/* Hero */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="relative inline-block mb-8">
            <Astronaut className="w-36 h-36 mx-auto" />
          </div>
          <h1 className="font-[family-name:var(--font-fredoka)] text-5xl md:text-7xl font-bold text-gradient-gold mb-4">
            {t("home.title")}
          </h1>
          <p className="text-xl text-sc-text-dim font-[family-name:var(--font-nunito)] animate-slide-up-delay-1">
            {t("home.subtitle")}
          </p>
        </div>

        {/* Game Card */}
        <div className="flex justify-center">
          <Link
            href="/cards"
            className="group relative block rounded-3xl glass-panel p-10 border border-sc-orange/20 hover:border-sc-orange/40 hover:scale-[1.04] transition-all duration-500 glow-orange animate-scale-in max-w-sm w-full"
          >
            {/* Hover glow overlay */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(circle at center, rgba(255, 140, 66, 0.06) 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div className="flex justify-center mb-6">
                <PlanetAbacus className="w-28 h-28 transition-transform duration-500" />
              </div>
              <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-bold text-sc-text text-center mb-2">
                {t("home.cards.title")}
              </h2>
              <p className="text-sc-text-dim text-center mb-6">
                {t("home.cards.description")}
              </p>
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 bg-sc-gold text-sc-bg-primary font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer">
                  <Rocket className="w-5 h-5" />
                  {t("home.cards.cta")}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
