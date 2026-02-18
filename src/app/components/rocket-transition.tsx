"use client";

import { useEffect, useState } from "react";
import { Rocket } from "@/app/components/icons/rocket";

interface Props {
  variant?: "launch";
  trigger: number; // increment to re-trigger
  onComplete?: () => void;
}

export function RocketTransition({ trigger, onComplete }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger <= 0) return;
    setActive(true);
    const timeout = setTimeout(() => {
      setActive(false);
      onComplete?.();
    }, 2500);
    return () => clearTimeout(timeout);
  }, [trigger, onComplete]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-rocket-launch">
        <div className="relative">
          <Rocket className="w-16 h-16" />
          {/* Enhanced flame trail - 6 particles */}
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full animate-flame"
              style={{
                width: 10 - i * 1.2,
                height: 10 - i * 1.2,
                backgroundColor: i < 2 ? "#FF8C42" : i < 4 ? "#FFD700" : "#FFE484",
                opacity: 0.8 - i * 0.12,
                bottom: -(10 + i * 9),
                left: `calc(50% - ${(10 - i * 1.2) / 2}px)`,
                animationDelay: `${i * 0.04}s`,
                filter: `blur(${i * 0.8}px)`,
                boxShadow: i < 2 ? `0 0 8px #FF8C42` : "none",
              }}
            />
          ))}
          {/* Speed lines during launch */}
          {[...Array(4)].map((_, i) => (
            <span
              key={`line-${i}`}
              className="absolute bg-white/40 rounded-full"
              style={{
                width: 1,
                height: 20 + i * 8,
                top: 10 + i * 15,
                left: i % 2 === 0 ? -(15 + i * 8) : undefined,
                right: i % 2 !== 0 ? -(15 + (i - 1) * 8) : undefined,
                opacity: 0.3 - i * 0.05,
                animation: `fade-in 0.3s ease-out ${i * 0.1}s both`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
