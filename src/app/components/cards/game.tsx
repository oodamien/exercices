"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { CardsConfigState, ScoreState } from "@/app/types";
import AbacusGame from "./abacus";
import { useLanguage, useTranslation } from "@/app/components/language-context";

type Phase = "ready" | "flashing" | "answering" | "complete";

interface Props {
  play: boolean;
  terms: Array<number>;
  onPlay: () => void;
  config: CardsConfigState;
  score: ScoreState;
  onScoreUpdate: (score: ScoreState) => void;
}

export function Game(props: Props) {
  const { language } = useLanguage();
  const t = useTranslation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<Phase>("ready");
  const [round, setRound] = useState(0);
  const [flashIndex, setFlashIndex] = useState(0);
  const [showAbacus, setShowAbacus] = useState(false);
  const [error, setError] = useState(false);
  const [val, setVal] = useState("");
  const [firstAttempt, setFirstAttempt] = useState(true);
  const [answerIndex, setAnswerIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Split terms into rounds based on impulses
  const rounds = useMemo(() => {
    const result: number[][] = [];
    const imp = props.config.impulses;
    for (let i = 0; i < props.terms.length; i += imp) {
      result.push(props.terms.slice(i, i + imp));
    }
    return result;
  }, [props.terms, props.config.impulses]);

  // Timer helpers
  const clearTimeoutIfNeeded = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleTimeout = useCallback(
    (callback: () => void, ms: number) => {
      clearTimeoutIfNeeded();
      timerRef.current = window.setTimeout(callback, ms);
    },
    [clearTimeoutIfNeeded]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimeoutIfNeeded();
  }, [clearTimeoutIfNeeded]);

  // Speech synthesis
  const speakText = useCallback(
    (text: string) => {
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = language;
      synth.speak(u);
    },
    [language]
  );

  // Reset when play changes from parent
  useEffect(() => {
    if (props.play && !isPlaying) {
      setIsPlaying(true);
      setRound(0);
      setFlashIndex(0);
      setPhase("ready");
      setError(false);
      setVal("");
      setFirstAttempt(true);
      setAnswerIndex(0);
    }
    if (!props.play) {
      setIsPlaying(false);
      clearTimeoutIfNeeded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.play]);

  // READY phase: show "Pret..." then start flashing
  useEffect(() => {
    if (isPlaying && phase === "ready") {
      speakText(t("game.readyVoice"));
      scheduleTimeout(() => {
        setPhase("flashing");
        setFlashIndex(0);
        setShowAbacus(true);
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, phase]);

  // FLASHING phase: show abacus for interval, blank between flashes
  useEffect(() => {
    if (phase !== "flashing" || !isPlaying) return;
    if (rounds.length === 0 || round >= rounds.length) return;

    if (showAbacus) {
      // Abacus is visible - wait for interval then hide
      scheduleTimeout(() => {
        setShowAbacus(false);
      }, props.config.interval);
    } else {
      // Brief blank between flashes
      const nextIndex = flashIndex + 1;
      if (nextIndex < rounds[round].length) {
        // More flashes in this round
        scheduleTimeout(() => {
          setFlashIndex(nextIndex);
          setShowAbacus(true);
        }, 200);
      } else {
        // All flashes done - go to answering
        scheduleTimeout(() => {
          setPhase("answering");
          setFirstAttempt(true);
          setError(false);
          setVal("");
        }, 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, flashIndex, showAbacus]);

  // Auto-focus input when entering answering phase
  useEffect(() => {
    if (phase === "answering") {
      // Small delay to let React render the input first
      const id = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(id);
    }
  }, [phase, answerIndex]);

  // Submit answer
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentRound = rounds[round];
    const expected = currentRound[answerIndex];

    if (Number(val) === expected) {
      // Correct answer for this number
      const newScore: ScoreState = {
        correct: firstAttempt
          ? props.score.correct + 1
          : props.score.correct,
        total: props.score.total + 1,
      };
      props.onScoreUpdate(newScore);

      const nextAnswerIndex = answerIndex + 1;
      if (nextAnswerIndex < currentRound.length) {
        // More numbers to answer in this round
        setAnswerIndex(nextAnswerIndex);
        setVal("");
        setError(false);
        setFirstAttempt(true);
      } else {
        // All numbers in this round answered — move to next round or complete
        const nextRound = round + 1;
        if (nextRound < rounds.length) {
          setRound(nextRound);
          setAnswerIndex(0);
          setFlashIndex(0);
          setShowAbacus(true);
          setPhase("flashing");
          setError(false);
          setVal("");
          setFirstAttempt(true);
        } else {
          setPhase("complete");
        }
      }
    } else {
      // Wrong
      setError(true);
      setFirstAttempt(false);
    }
  }

  // Anew: replay current round flashes
  function handleAnew() {
    setAnswerIndex(0);
    setFlashIndex(0);
    setShowAbacus(true);
    setPhase("flashing");
    setError(false);
    setVal("");
  }

  // Replay: same terms, reset rounds
  function handleReplay() {
    setAnswerIndex(0);
    setRound(0);
    setFlashIndex(0);
    setShowAbacus(false);
    setPhase("ready");
    setError(false);
    setVal("");
    setFirstAttempt(true);
  }

  // New game: generate new terms
  function handleNewGame() {
    setIsPlaying(false);
    clearTimeoutIfNeeded();
    props.onPlay();
  }

  return (
    <div className="play media h-full relative w-full bg-transparent flex justify-center items-center rounded-2xl">
      {/* Score overlay */}
      {isPlaying && (
        <div className="absolute top-3 right-3 bg-sc-bg-secondary/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-semibold text-sc-text">
          {t("cards.score")}: {props.score.correct}/{props.score.total}
          {props.score.total > 0 && (
            <span className="ml-1 text-sc-text-dim">
              ({Math.round((props.score.correct / props.score.total) * 100)}%)
            </span>
          )}
        </div>
      )}

      {/* IDLE: New Game button */}
      {!isPlaying && (
        <button
          onClick={() => props.onPlay()}
          type="button"
          className="rounded-xl bg-sc-gold px-8 py-4 text-lg font-bold text-sc-bg-primary shadow-lg hover:bg-sc-gold/90 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          {t("game.newGame")}
        </button>
      )}

      {isPlaying && (
        <>
          {/* READY phase */}
          {phase === "ready" && (
            <p className="text-6xl font-[family-name:var(--font-chakra-petch)]">
              {t("game.ready")}
            </p>
          )}

          {/* FLASHING phase */}
          {phase === "flashing" && (
            <>
              {showAbacus && rounds[round] && (
                <AbacusGame
                  value={`${rounds[round][flashIndex]}`}
                  rotation={props.config.rotation}
                  colorScheme={props.config.colorScheme}
                />
              )}
            </>
          )}

          {/* ANSWERING phase */}
          {phase === "answering" && (
            <div className="text-sm font-[family-name:var(--font-chakra-petch)]">
              {rounds[round] && rounds[round].length > 1 && (
                <div className="text-center text-sc-text-dim mb-3 text-base">
                  {t("cards.answerProgress")
                    .replace("{current}", String(answerIndex + 1))
                    .replace("{total}", String(rounds[round].length))}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  id="result"
                  name="result"
                  type="text"
                  inputMode="numeric"
                  placeholder={t("cards.placeholder")}
                  autoFocus
                  onChange={(e) => setVal(e.target.value)}
                  value={val}
                  className="block w-full rounded-lg bg-sc-bg-tertiary px-3 py-2 text-base text-sc-text border border-sc-orange/20 placeholder:text-sc-text-dim/50 focus:outline-2 focus:outline-sc-orange sm:text-sm"
                />
                {error && (
                  <div className="pt-2 text-sc-red">
                    {t("cards.tryAgain")}
                  </div>
                )}
                <div className="flex gap-3 pt-3">
                  <button
                    type="submit"
                    className="rounded-xl bg-sc-gold px-6 py-3 text-base font-bold text-sc-bg-primary shadow-lg hover:bg-sc-gold/90 hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    {t("cards.submit")}
                  </button>
                  <button
                    type="button"
                    onClick={handleAnew}
                    className="rounded-xl bg-sc-cyan/20 px-6 py-3 text-base font-bold text-sc-cyan border border-sc-cyan/30 shadow-lg hover:bg-sc-cyan/30 hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    {t("cards.anew")}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* COMPLETE phase */}
          {phase === "complete" && (
            <div className="block text-center animate-bounce-in">
              <div className="text-9xl font-[family-name:var(--font-chakra-petch)] text-sc-gold">
                {t("cards.bravo")}
              </div>
              <div className="text-xl pt-2 text-sc-text">
                {t("cards.score")}: {props.score.correct}/{props.score.total}
              </div>
              <div className="text-lg pt-1 text-sc-text-dim">
                {props.terms.join(", ")}
              </div>
              <div className="flex gap-4 pt-6 items-center justify-center">
                <button
                  onClick={handleReplay}
                  type="button"
                  className="rounded-xl bg-sc-cyan/20 px-6 py-3 text-base font-bold text-sc-cyan border border-sc-cyan/30 shadow-lg hover:bg-sc-cyan/30 hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                  {t("game.replay")}
                </button>
                <button
                  onClick={handleNewGame}
                  type="button"
                  className="rounded-xl bg-sc-orange/20 px-6 py-3 text-base font-bold text-sc-orange border border-sc-orange/30 shadow-lg hover:bg-sc-orange/30 hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                  {t("game.newGameShort")}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
