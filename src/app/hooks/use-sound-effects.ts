"use client";

import { useCallback, useRef } from "react";

export function useSoundEffects() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = "sine", volume = 0.15) => {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    },
    [getCtx]
  );

  const playSuccess = useCallback(() => {
    playTone(523, 0.15, "sine", 0.12);
    setTimeout(() => playTone(659, 0.2, "sine", 0.12), 100);
  }, [playTone]);

  const playError = useCallback(() => {
    playTone(150, 0.2, "sawtooth", 0.06);
  }, [playTone]);

  const playStart = useCallback(() => {
    playTone(262, 0.15, "sine", 0.1);
    setTimeout(() => playTone(392, 0.15, "sine", 0.1), 120);
    setTimeout(() => playTone(523, 0.25, "triangle", 0.1), 240);
  }, [playTone]);

  const playTransition = useCallback(() => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  }, [getCtx]);

  const playBravo = useCallback(() => {
    playTone(523, 0.2, "sine", 0.1);
    setTimeout(() => playTone(659, 0.2, "sine", 0.1), 150);
    setTimeout(() => playTone(784, 0.2, "sine", 0.1), 300);
    setTimeout(() => playTone(1047, 0.4, "triangle", 0.12), 450);
  }, [playTone]);

  return { playSuccess, playError, playStart, playTransition, playBravo };
}
