"use client";

import { useState } from "react";
import { Config, ConfigState } from "@/app/components/counting/config";
import { Game } from "@/app/components/counting/game";
import { FLASH_COUNTING } from "../Data";

function generateNumber() {
  const number = ~~(Math.random() * 10) - 2;
  if (number === 0) {
    return generateNumber();
  }
  return number;
}

function generateGame(config: ConfigState) {
  const values = FLASH_COUNTING.filter(
    (value: any) => value.level === +config.difficulty
  );
  const randomIndex = Math.floor(Math.random() * values.length);
  const value = values[randomIndex];
  const terms: Array<number> = [];
  (["a", "b", "c", "d"] as Array<keyof typeof value>).forEach((key) => {
    if (value && value.hasOwnProperty(key)) {
      if (Number.isInteger(+value[key])) {
        terms.push(+value[key]);
      }
    }
  });
  return terms;
}

export default function Counting() {
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
            Counting
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
