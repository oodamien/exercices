"use client";

import { useState } from "react";
import { Config } from "@/app/components/shared-config";
import { ConfigState, CardItem } from "@/app/types";
import { Game } from "@/app/components/cards/game";
import { CARDS, CARDS_CATS } from "../Data";

function generateGame(config: ConfigState) {
  const values = CARDS.filter(
    (value: CardItem) => value.level === +config.difficulty
  );
  const randomIndex = Math.floor(Math.random() * values.length);
  const value = values[randomIndex];
  const terms: Array<number> = [];
  Object.keys(value).forEach((key) => {
    if (value && Object.prototype.hasOwnProperty.call(value, key)) {
      const val: string | number = (value as CardItem)[key];
      if (val !== "" && Number.isInteger(+val)) {
        terms.push(+val);
      }
    }
  });
  return terms;
}

export default function Cards() {
  const [play, setPlay] = useState<boolean>(false);
  const [terms, setTerms] = useState<Array<number>>([]);
  const [config, setConfig] = useState<ConfigState>({
    difficulty: "1",
    interval: 2000,
  });

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Cards
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="min-h-full">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-6">
              <div className="flex flex-row">
                <div className="basis-1/4 h-full pr-6">
                  <Config
                    config={config}
                    categories={CARDS_CATS}
                    onChange={(state: ConfigState) => {
                      setConfig(state);
                    }}
                  />
                </div>
                <div className="basis-3/4 h-grow w-full bg-gray-100">
                  <Game
                    play={play}
                    terms={terms}
                    onPlay={() => {
                      setTerms(generateGame(config));
                      setPlay(true);
                    }}
                    config={config}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
