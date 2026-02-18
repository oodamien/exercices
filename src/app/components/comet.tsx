"use client";

import { useState, useEffect, useCallback } from "react";

export function Comet() {
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);

  const scheduleNext = useCallback(() => {
    const delay = 10000 + Math.random() * 12000; // 10-22s between comets
    const timer = setTimeout(() => {
      setKey((k) => k + 1);
      setVisible(true);
    }, delay);
    return timer;
  }, []);

  useEffect(() => {
    const timer = scheduleNext();
    return () => clearTimeout(timer);
  }, [scheduleNext, key]);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  const top = 10 + Math.random() * 40; // 10-50% from top

  return (
    <div
      key={key}
      className="fixed pointer-events-none z-[1] animate-comet"
      style={{ top: `${top}%`, left: 0 }}
      aria-hidden="true"
    >
      <div
        className="h-[2px] rounded-full"
        style={{
          width: 60,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), rgba(0,212,255,0.6), transparent)",
          boxShadow: "0 0 8px rgba(0,212,255,0.4), 0 0 16px rgba(255,255,255,0.2)",
        }}
      />
    </div>
  );
}
