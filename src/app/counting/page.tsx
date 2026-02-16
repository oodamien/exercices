"use client";

import { useState } from "react";
import { CountingConfigState } from "@/app/types";
import { Game } from "@/app/components/counting/game";
import { CountingConfig } from "@/app/components/counting/counting-config";
import { generateCountingTerms } from "@/app/generators";
import { useTranslation } from "@/app/components/language-context";

export default function Counting() {
  const t = useTranslation();
  const [play, setPlay] = useState<boolean>(false);
  const [terms, setTerms] = useState<Array<number>>([]);
  const [config, setConfig] = useState<CountingConfigState>({
    difficulty: 1,
    interval: 2000,
    operation: "+",
    terms: 4,
    pauseTime: 500,
    fontSize: 120,
    lineHeight: 200,
    showSeparator: false,
    showSymbols: false,
  });

  return (
    <>
      <header className="border-b border-sc-cyan/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-fredoka)] text-3xl font-bold text-sc-cyan text-glow-cyan">
            ⚡ {t("page.counting.title")}
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <CountingConfig
              config={config}
              onChange={(state: CountingConfigState) => {
                setConfig(state);
              }}
            />
          </div>
          <div className="w-full md:w-3/4 min-h-[400px] nebula-bg rounded-2xl">
            <Game
              play={play}
              terms={terms}
              onPlay={() => {
                setTerms(generateCountingTerms(config));
                setPlay(true);
              }}
              config={config}
            />
          </div>
        </div>
      </div>
    </>
  );
}
