"use client";

import { useEffect, useState } from "react";
import { Rocket } from "@/app/components/icons/rocket";

interface Props {
  variant: "launch" | "flyby";
  trigger: number; // increment to re-trigger
  onComplete?: () => void;
}

export function RocketTransition({ variant, trigger, onComplete }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger <= 0) return;
    setActive(true);
    const duration = variant === "launch" ? 2500 : 2000;
    const timeout = setTimeout(() => {
      setActive(false);
      onComplete?.();
    }, duration);
    return () => clearTimeout(timeout);
  }, [trigger, variant, onComplete]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      <div
        className={`absolute ${
          variant === "launch"
            ? "bottom-0 left-1/2 -translate-x-1/2 animate-rocket-launch"
            : "top-1/2 -left-[100px] animate-rocket-flyby"
        }`}
      >
        <div className="relative">
          <Rocket className={variant === "launch" ? "w-16 h-16" : "w-12 h-12"} />
          {/* Flame trail particles */}
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full animate-flame"
              style={{
                width: 8 - i * 1.5,
                height: 8 - i * 1.5,
                backgroundColor: i < 2 ? "#FF8C42" : "#FFD700",
                opacity: 0.7 - i * 0.15,
                bottom: -(12 + i * 10),
                left: `calc(50% - ${(8 - i * 1.5) / 2}px)`,
                animationDelay: `${i * 0.05}s`,
                filter: `blur(${i}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
