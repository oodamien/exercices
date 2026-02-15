"use client";

import { useEffect, useRef, useState } from "react";
import { ConfigState } from "@/app/types";
import { ClassTimer } from "../timer";
import AbacusGame from "./abacus";
import { useLanguage } from "@/app/components/language-context";

interface Props {
  play: boolean;
  terms: Array<number>;
  onPlay: () => void;
  config: ConfigState;
}

export function Game(props: Props) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tick, setTick] = useState<number>(-1);
  const [blink, setBlink] = useState<boolean>(false);
  const tickRef = useRef(-1);
  const [timer] = useState<ClassTimer>(new ClassTimer());
  const [response, setResponse] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [val, setVal] = useState<string>("");

  // Reset all variables
  useEffect(() => {
    if (!props.play) {
      setIsPlaying(false);
    }
  }, [props.play]);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const next = (noBlink = false) => {
    setBlink(true);
    timer.start(
      () => {
        timer.stop();
        setBlink(false);
        timer.start(() => {
          timer.stop();
          if (tickRef.current === -1) {
            setTick((tick) => tick + 1);
          }
          if (tickRef.current < props.terms.length) {
            timer.start(() => {
              timer.stop();
              setResponse(true);
            }, props.config.interval);
          }
        }, props.config.interval);
      },
      noBlink ? 0 : 100
    );
  };

  useEffect(() => {
    let textRead = "";
    if (tick === -1) {
      textRead = `Prêt`;
    }

    if (textRead && props.play) {
      const synth = window.speechSynthesis;
      const u = new SpeechSynthesisUtterance(`${textRead}`);
      u.lang = language;
      synth.speak(u);
      return () => {
        synth.cancel();
      };
    }
  }, [tick, props.terms, props.play]);

  useEffect(() => {
    if (props.play && !isPlaying) {
      setIsPlaying(true);
      next();
    }
  }, [props.play, isPlaying]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(false);
    const value = props.terms[tick];
    setError(value !== Number(val));
    if (value === Number(val)) {
      setTick((tick) => tick + 1);
      setResponse(false);
      setError(false);
      setVal("");
      next();
    }
  }

  return (
    <div
      className={`play media h-full relative w-full bg-gray-100 flex justify-center items-center`}
    >
      {!isPlaying && (
        <button
          onClick={() => {
            props.onPlay();
          }}
          type="submit"
          className="rounded-xl bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-green-400 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          Nouvelle partie !
        </button>
      )}
      {isPlaying && (
        <>
          {tick === -1 && (
            <p className="text-6xl font-[family-name:var(--font-chakra-petch)]">
              Prêt...
            </p>
          )}
          {!blink && (
            <>
              {tick > -1 && (
                <div>
                  {tick > -1 && tick < props.terms.length && (
                    <div className="text-9xl font-[family-name:var(--font-chakra-petch)]">
                      {!response ? (
                        <>
                          <AbacusGame value={`${props.terms[tick]}`} />
                        </>
                      ) : (
                        <div className="text-sm font-[family-name:var(--font-chakra-petch)]">
                          <form onSubmit={handleSubmit}>
                            <input
                              id="result"
                              name="result"
                              type="text"
                              placeholder="Ta réponse"
                              autoFocus
                              onChange={(e) => setVal(e.target.value)}
                              value={val}
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                            />
                            {error && (
                              <>
                                <div className="pt-2 text-orange-500">
                                  Essaie encore !
                                </div>
                              </>
                            )}
                          </form>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {tick === props.terms.length && (
                <div className="block text-center animate-bounce-in">
                  <div className="text-9xl font-[family-name:var(--font-chakra-petch)]">
                    Bravo ! ⭐
                  </div>
                  <div className="text-xl pt-3">{props.terms.join(", ")}</div>
                  <div className="flex gap-4 pt-6 items-center justify-center">
                    <button
                      onClick={() => {
                        setTick(-1);
                        next();
                      }}
                      type="button"
                      className="rounded-xl bg-orange-500 px-6 py-3 text-base font-bold text-white shadow-lg hover:bg-orange-400 hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      Rejouer 🔄
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setTick(-1);
                        timer.stop();
                        props.onPlay();
                      }}
                      type="button"
                      className="rounded-xl bg-orange-500 px-6 py-3 text-base font-bold text-white shadow-lg hover:bg-orange-400 hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      Nouvelle partie
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
