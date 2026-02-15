"use client";

import Link from "next/link";
import { useTranslation } from "@/app/components/language-context";
import { Astronaut } from "@/app/components/icons/astronaut";
import { PlanetCounting } from "@/app/components/icons/planet-counting";
import { PlanetAbacus } from "@/app/components/icons/planet-abacus";
import { Rocket } from "@/app/components/icons/rocket";

export default function Home() {
  const t = useTranslation();

  const games = [
    {
      href: "/counting",
      title: t("home.counting.title"),
      description: t("home.counting.description"),
      cta: t("home.counting.cta"),
      Planet: PlanetCounting,
      glowClass: "glow-cyan",
      borderClass: "border-sc-cyan/20 hover:border-sc-cyan/40",
    },
    {
      href: "/cards",
      title: t("home.cards.title"),
      description: t("home.cards.description"),
      cta: t("home.cards.cta"),
      Planet: PlanetAbacus,
      glowClass: "glow-orange",
      borderClass: "border-sc-orange/20 hover:border-sc-orange/40",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="animate-float inline-block mb-6">
            <Astronaut className="w-32 h-32 mx-auto" />
          </div>
          <h1 className="font-[family-name:var(--font-fredoka)] text-5xl md:text-6xl font-bold text-sc-gold text-glow-gold mb-3">
            {t("home.title")}
          </h1>
          <p className="text-lg text-sc-text-dim font-[family-name:var(--font-nunito)]">
            {t("home.subtitle")}
          </p>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {games.map((game) => (
            <Link
              key={game.href}
              href={game.href}
              className={`group block rounded-2xl bg-sc-bg-secondary p-8 border ${game.borderClass} hover:scale-[1.03] transition-all duration-300 ${game.glowClass}`}
            >
              <div className="flex justify-center mb-6">
                <game.Planet className="w-28 h-28 group-hover:animate-planet-pulse" />
              </div>
              <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-bold text-sc-text text-center mb-2">
                {game.title}
              </h2>
              <p className="text-sc-text-dim text-center mb-6">
                {game.description}
              </p>
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 bg-sc-gold text-sc-bg-primary font-bold px-6 py-2.5 rounded-xl group-hover:animate-glow-pulse transition-all">
                  <Rocket className="w-5 h-5" />
                  {game.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
