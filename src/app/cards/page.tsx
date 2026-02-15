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
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <Config
              config={config}
              categories={CARDS_CATS}
              onChange={(state: ConfigState) => {
                setConfig(state);
              }}
            />
          </div>
          <div className="w-full md:w-3/4 min-h-[400px] bg-gray-100 rounded-xl">
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
    </>
  );
}
