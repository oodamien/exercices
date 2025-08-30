"use client";

import { useState } from "react";
import { Config, ConfigState } from "@/app/components/counting/config";
import { Game } from "@/app/components/counting/game";

function generateNumber() {
  const number = ~~(Math.random() * 10) - 2;
  if (number === 0) {
    return generateNumber();
  }
  return number;
}

function generateGame(config: ConfigState) {
  return [...Array(config.terms)].map((e) => generateNumber());
}

export default function Counting() {
  const [play, setPlay] = useState<boolean>(false);
  const [terms, setTerms] = useState<Array<number>>([]);
  const [config, setConfig] = useState<ConfigState>({
    module: 0,
    operations: 0,
    difficulty: 0,
    terms: 3,
    interval: 2,
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
                      // console.log(Generator);
                      // var generator = Generator.generate(1, 1, 1, 1, [], true);
                      // console.log(generator.result);
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
