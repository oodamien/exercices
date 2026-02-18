"use client";

import { useEffect, useState } from "react";

interface Props {
  variant: "success" | "bravo";
  trigger: number; // increment to re-trigger
}

interface Particle {
  id: number;
  angle: number;
  distance: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  isStar: boolean;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  tx: number;
  ty: number;
  delay: number;
  duration: number;
}

const COLORS = ["#FFD700", "#00D4FF", "#FF8C42", "#22D17B", "#E8EDF5"];

function generateParticles(variant: "success" | "bravo"): {
  particles: Particle[];
  stars: ShootingStar[];
} {
  const count = variant === "bravo" ? 30 : 10;
  const starCount = variant === "bravo" ? 5 : 2;

  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + Math.random() * 20 - 10,
    distance: 60 + Math.random() * (variant === "bravo" ? 140 : 80),
    delay: Math.random() * 0.5,
    duration: 1.2 + Math.random() * 1.0,
    size: 4 + Math.random() * 8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    isStar: i % 5 === 0, // every 5th particle is a star shape
  }));

  const stars: ShootingStar[] = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 10 + Math.random() * 30,
    angle: 20 + Math.random() * 30,
    tx: 100 + Math.random() * 100,
    ty: 60 + Math.random() * 60,
    delay: Math.random() * 0.8,
    duration: 1.0 + Math.random() * 0.8,
  }));

  return { particles, stars };
}

export function CosmicCelebration({ variant, trigger }: Props) {
  const [data, setData] = useState<{
    particles: Particle[];
    stars: ShootingStar[];
  } | null>(null);

  useEffect(() => {
    if (trigger <= 0) return;
    setData(generateParticles(variant));
    const timeout = setTimeout(() => setData(null), 3500);
    return () => clearTimeout(timeout);
  }, [trigger, variant]);

  if (!data) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Screen flash for bravo */}
      {variant === "bravo" && (
        <div className="absolute inset-0 bg-sc-gold/[0.08] animate-screen-flash" />
      )}

      {/* Golden ring burst for bravo */}
      {variant === "bravo" && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-sc-gold animate-golden-burst" />
      )}

      {/* Burst particles from center */}
      {data.particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;

        if (p.isStar) {
          return (
            <svg
              key={`p-${p.id}`}
              className="absolute left-1/2 top-1/2 animate-particle"
              width={p.size * 2}
              height={p.size * 2}
              viewBox="0 0 24 24"
              style={{
                "--tx": `${tx}px`,
                "--ty": `${ty}px`,
                "--delay": `${p.delay}s`,
                "--duration": `${p.duration}s`,
                filter: `drop-shadow(0 0 ${p.size}px ${p.color})`,
              } as React.CSSProperties}
            >
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill={p.color}
              />
            </svg>
          );
        }

        return (
          <span
            key={`p-${p.id}`}
            className="absolute left-1/2 top-1/2 rounded-full animate-particle"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size}px ${p.color}`,
              "--tx": `${tx}px`,
              "--ty": `${ty}px`,
              "--delay": `${p.delay}s`,
              "--duration": `${p.duration}s`,
            } as React.CSSProperties}
          />
        );
      })}
      {/* Shooting stars */}
      {data.stars.map((s) => (
        <span
          key={`s-${s.id}`}
          className="absolute h-[2px] bg-gradient-to-r from-white to-transparent rounded-full animate-shooting-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            "--angle": `${s.angle}deg`,
            "--tx": `${s.tx}px`,
            "--ty": `${s.ty}px`,
            "--delay": `${s.delay}s`,
            "--duration": `${s.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
