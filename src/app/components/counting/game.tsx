"use client";

import { useEffect, useRef, useState } from "react";
import { CountingConfigState } from "@/app/types";
import { ClassTimer } from "../timer";
import { useLanguage, useTranslation } from "@/app/components/language-context";
import { useSoundEffects } from "@/app/hooks/use-sound-effects";
import { CosmicCelebration } from "@/app/components/cosmic-celebration";
import { RocketTransition } from "@/app/components/rocket-transition";
import { AstronautMascot } from "@/app/components/astronaut-mascot";
import { Rocket } from "@/app/components/icons/rocket";

interface Props {
  play: boolean;
  terms: Array<number>;
  onPlay: () => void;
  config: CountingConfigState;
}

export function Game(props: Props) {
  const { language } = useLanguage();
  const t = useTranslation();
  const sfx = useSoundEffects();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [celebrationTrigger, setCelebrationTrigger] = useState(0);
  const [rocketTrigger, setRocketTrigger] = useState(0);
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
      textRead = t("game.readyVoice");
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
      u.lang = language;
      synth.speak(u);
      return () => {
        synth.cancel();
      };
    }
  }, [tick, props.terms, props.play]);

  // Trigger celebration on result reveal
  useEffect(() => {
    if (tick === props.terms.length + 1) {
      setCelebrationTrigger((t) => t + 1);
      sfx.playBravo();
    }
  }, [tick, props.terms.length, sfx]);

  useEffect(() => {
    if (props.play && !isPlaying) {
      setIsPlaying(true);
      sfx.playStart();
      setRocketTrigger((t) => t + 1);
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
      } media h-full relative w-full bg-transparent flex justify-center items-center`}
    >
      {!isPlaying && (
        <div className="animate-fade-in">
          <button
            onClick={() => {
              props.onPlay();
            }}
            type="submit"
            className="rounded-xl bg-sc-gold px-8 py-4 text-lg font-bold text-sc-bg-primary shadow-lg hover:bg-sc-gold/90 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <Rocket className="w-5 h-5 inline-block mr-1" />
            {t("game.newGame")}
          </button>
        </div>
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
                    className="rounded-xl bg-sc-cyan/20 px-6 py-3 text-base font-bold text-sc-cyan border border-sc-cyan/30 shadow-lg hover:bg-sc-cyan/30 hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    {t("counting.pause")}
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
                      className="rounded-xl bg-sc-cyan/20 px-6 py-3 text-base font-bold text-sc-cyan border border-sc-cyan/30 shadow-lg hover:bg-sc-cyan/30 hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      {t("counting.resume")}
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
                      className="rounded-xl bg-sc-orange/20 px-6 py-3 text-base font-bold text-sc-orange border border-sc-orange/30 shadow-lg hover:bg-sc-orange/30 hover:scale-105 transition-all duration-200 cursor-pointer ml-4"
                    >
                      <Rocket className="w-5 h-5 inline-block mr-1" />
                      {t("game.newGameShort")}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
          {tick === -1 && (
            <div className="animate-fade-in">
              <p className="text-6xl font-[family-name:var(--font-chakra-petch)] text-sc-cyan animate-neon-glow">
                {t("game.ready")}
              </p>
            </div>
          )}
          {!blink && (
            <>
              {tick > -1 && (
                <div key={tick} className="animate-fade-in">
                  {tick > -1 && (
                    <div className="text-9xl font-[family-name:var(--font-chakra-petch)] text-sc-text animate-number-reveal animate-hologram">
                      {props.terms[tick]}
                    </div>
                  )}
                  {tick === props.terms.length && (
                    <div className="text-9xl font-[family-name:var(--font-chakra-petch)] text-gradient-cyan animate-float">
                      ?
                    </div>
                  )}
                </div>
              )}
              {tick === props.terms.length + 1 && (
                <div className="flex justify-center items-center flex-col animate-bounce-in">
                  <AstronautMascot mood="cheering" className="w-24 h-24 animate-breathe" />
                  <div className="text-xl text-sc-text-dim">{props.terms.join(" + ")}</div>
                  <div className="text-9xl font-[family-name:var(--font-chakra-petch)] text-gradient-gold animate-golden-burst rounded-2xl">
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
                      className="rounded-xl bg-sc-cyan/20 px-6 py-3 text-base font-bold text-sc-cyan border border-sc-cyan/30 shadow-lg hover:bg-sc-cyan/30 hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      {t("game.replay")}
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setTick(-1);
                        timer.stop();
                        props.onPlay();
                      }}
                      type="submit"
                      className="rounded-xl bg-sc-orange/20 px-6 py-3 text-base font-bold text-sc-orange border border-sc-orange/30 shadow-lg hover:bg-sc-orange/30 hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      <Rocket className="w-5 h-5 inline-block mr-1" />
                      {t("game.newGameShort")}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
      <CosmicCelebration variant="bravo" trigger={celebrationTrigger} />
      <RocketTransition variant="launch" trigger={rocketTrigger} />
    </div>
  );
}
