"use client";

import Link from "next/link";
import { useTranslation } from "@/app/components/language-context";
import { Astronaut } from "@/app/components/icons/astronaut";
import { PlanetCounting } from "@/app/components/icons/planet-counting";
import { PlanetAbacus } from "@/app/components/icons/planet-abacus";
import { Rocket } from "@/app/components/icons/rocket";
import { FloatingPlanets } from "@/app/components/floating-planets";
import { StarIcon } from "@/app/components/icons/star-icon";

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
      hoverGlow: "rgba(0, 212, 255, 0.06)",
    },
    {
      href: "/cards",
      title: t("home.cards.title"),
      description: t("home.cards.description"),
      cta: t("home.cards.cta"),
      Planet: PlanetAbacus,
      glowClass: "glow-orange",
      borderClass: "border-sc-orange/20 hover:border-sc-orange/40",
      hoverGlow: "rgba(255, 140, 66, 0.06)",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-4xl px-4 py-12 relative">
        <FloatingPlanets />

        {/* Hero */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="relative inline-block mb-8">
            <div className="animate-float">
              <Astronaut className="w-36 h-36 mx-auto" />
            </div>
            {/* Orbiting stars */}
            {[
              { duration: 6, radius: 70, delay: 0 },
              { duration: 9, radius: 85, delay: -3 },
              { duration: 12, radius: 65, delay: -7 },
            ].map((star, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 animate-orbit pointer-events-none"
                style={{
                  "--orbit-radius": `${star.radius}px`,
                  "--orbit-duration": `${star.duration}s`,
                  animationDelay: `${star.delay}s`,
                } as React.CSSProperties}
              >
                <StarIcon className="w-3 h-3 text-sc-gold opacity-60" />
              </div>
            ))}
          </div>
          <h1 className="font-[family-name:var(--font-fredoka)] text-5xl md:text-7xl font-bold text-gradient-gold mb-4">
            {t("home.title")}
          </h1>
          <p className="text-xl text-sc-text-dim font-[family-name:var(--font-nunito)] animate-slide-up-delay-1">
            {t("home.subtitle")}
          </p>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {games.map((game, i) => (
            <Link
              key={game.href}
              href={game.href}
              className={`group relative block rounded-3xl glass-panel p-10 border ${game.borderClass} hover:scale-[1.04] transition-all duration-500 ${game.glowClass} ${i === 0 ? "animate-scale-in" : "animate-scale-in-delay-1"}`}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${game.hoverGlow} 0%, transparent 70%)` }}
              />
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <game.Planet className="w-28 h-28 group-hover:animate-float-drift transition-transform duration-500" />
                </div>
                <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-bold text-sc-text text-center mb-2">
                  {game.title}
                </h2>
                <p className="text-sc-text-dim text-center mb-6">
                  {game.description}
                </p>
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-2 bg-sc-gold text-sc-bg-primary font-bold px-6 py-2.5 rounded-xl group-hover:animate-glow-pulse transition-all cursor-pointer">
                    <Rocket className="w-5 h-5" />
                    {game.cta}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
