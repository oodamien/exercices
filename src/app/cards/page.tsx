"use client";

import { useState } from "react";
import { CardsConfigState, ScoreState } from "@/app/types";
import { Game } from "@/app/components/cards/game";
import { CardsConfig } from "@/app/components/cards/cards-config";
import { generateCardsTerms } from "@/app/generators";
import { useTranslation } from "@/app/components/language-context";
import { PlanetAbacus } from "@/app/components/icons/planet-abacus";

export default function Cards() {
  const t = useTranslation();
  const [play, setPlay] = useState<boolean>(false);
  const [terms, setTerms] = useState<Array<number>>([]);
  const [score, setScore] = useState<ScoreState>({ correct: 0, total: 0 });
  const [config, setConfig] = useState<CardsConfigState>({
    level: 1,
    interval: 2000,
    impulses: 1,
    rotation: 0,
    colorScheme: "default",
  });

  return (
    <>
      <header className="border-b border-sc-orange/10 animate-slide-up">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-fredoka)] text-4xl font-bold text-gradient-gold flex items-center gap-3">
            <PlanetAbacus className="w-9 h-9" />
            {t("page.cards.title")}
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 animate-slide-up-delay-1">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <CardsConfig
              config={config}
              onChange={(state: CardsConfigState) => {
                setConfig(state);
              }}
            />
          </div>
          <div className="w-full md:w-3/4 min-h-[400px] nebula-bg rounded-2xl">
            <Game
              play={play}
              terms={terms}
              onPlay={() => {
                setTerms(generateCardsTerms(config));
                setScore({ correct: 0, total: 0 });
                setPlay(true);
              }}
              config={config}
              score={score}
              onScoreUpdate={setScore}
            />
          </div>
        </div>
      </div>
    </>
  );
}
