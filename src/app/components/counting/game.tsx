"use client";

import { useEffect, useRef, useState } from "react";
import { ConfigState } from "@/app/types";
import { ClassTimer } from "../timer";

interface Props {
  play: boolean;
  terms: Array<number>;
  onPlay: () => void;
  config: ConfigState;
}

export function Game(props: Props) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tick, setTick] = useState<number>(-1);
  const [result, setResult] = useState<number>(0);
  const [blink, setBlink] = useState<boolean>(false);
  const tickRef = useRef(-1);
  const [timer] = useState<ClassTimer>(new ClassTimer());
  const [pause, setPause] = useState<boolean>(false);
  const pauseRef = useRef(false);

  // Reset all variables
  useEffect(() => {
    if (!props.play) {
      setIsPlaying(false);
    }
  }, [props.play]);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  useEffect(() => {
    pauseRef.current = pause;
  }, [pause]);

  const next = (noBlink = false) => {
    if (pauseRef.current) {
      return;
    }
    setBlink(true);
    const interval =
      tickRef.current === props.terms.length - 1
        ? 5000
        : props.config.interval;
    timer.start(
      () => {
        timer.stop();
        if (pauseRef.current) {
          return;
        }
        setBlink(false);
        timer.start(() => {
          timer.stop();
          if (pauseRef.current) {
            return;
          }
          if (tickRef.current < props.terms.length + 1) {
            setTick((tick) => tick + 1);
            if (tickRef.current < props.terms.length) {
              next();
            }
          }
        }, interval);
      },
      noBlink ? 0 : 500
    );
  };

  useEffect(() => {
    let textRead = "";
    if (tick === -1) {
      textRead = `Ready`;
    }
    if (tick > -1 && tick <= props.terms.length - 1) {
      textRead = `${props.terms[tick]}`;
    }
    if (tick === props.terms.length + 1) {
      textRead = `${result}`;
    }

    if (textRead && props.play) {
      const synth = window.speechSynthesis;
      const u = new SpeechSynthesisUtterance(`${textRead}`);
      u.lang = "de-DE";
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

  useEffect(() => {
    setResult(props.terms.reduce((a, b) => a + b, 0));
  }, [props.terms]);

  return (
    <div
      className={`${
        pause ? "paused" : "play"
      } media h-full relative w-full bg-gray-100 flex justify-center items-center`}
    >
      {!isPlaying && (
        <button
          onClick={() => {
            props.onPlay();
          }}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 px-6 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
        >
          Start a New Game
        </button>
      )}
      {isPlaying && (
        <>
          {tick < props.terms.length + 1 && (
            <div className="toolbar">
              {/* <div className="bg-black absolute bottom-0 left-0 top-0 right-0 opacity-20"></div> */}
              <div className="flex justify-center items-end absolute bottom-0 left-0 top-0 right-0 py-4">
                {!pause ? (
                  <button
                    onClick={() => {
                      setPause(true);
                    }}
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 px-6 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Pause
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setPause(false);
                        setBlink(false);
                        setTimeout(() => {
                          next(true);
                        }, 100);
                      }}
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 px-6 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Play
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setPause(false);
                        setTick(-1);
                        timer.stop();
                        props.onPlay();
                      }}
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 px-6 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-4"
                    >
                      New Game
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
          {tick === -1 && (
            <p className="text-6xl font-[family-name:var(--font-chakra-petch)]">
              Ready...
            </p>
          )}
          {!blink && (
            <>
              {tick > -1 && (
                <div>
                  {tick > -1 && (
                    <div className="text-9xl font-[family-name:var(--font-chakra-petch)]">
                      {props.terms[tick]}
                    </div>
                  )}
                  {tick === props.terms.length && (
                    <div className="text-9xl font-[family-name:var(--font-chakra-petch)]">
                      ?
                    </div>
                  )}
                </div>
              )}
              {tick === props.terms.length + 1 && (
                <div className="flex justify-center items-center flex-col">
                  <div className="text-xl">{props.terms.join(" + ")}</div>
                  <div className="text-9xl font-[family-name:var(--font-chakra-petch)]">
                    {result}
                  </div>
                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={() => {
                        // setIsPlaying(false);
                        setTick(-1);
                        next();
                      }}
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 px-6 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Replay
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setTick(-1);
                        timer.stop();
                        props.onPlay();
                      }}
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 px-6 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      New Game
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
