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
  const count = variant === "bravo" ? 20 : 10;
  const starCount = variant === "bravo" ? 5 : 2;

  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + Math.random() * 20 - 10,
    distance: 60 + Math.random() * (variant === "bravo" ? 120 : 80),
    delay: Math.random() * 0.3,
    duration: 0.6 + Math.random() * 0.6,
    size: 4 + Math.random() * 8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  const stars: ShootingStar[] = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 10 + Math.random() * 30,
    angle: 20 + Math.random() * 30,
    tx: 100 + Math.random() * 100,
    ty: 60 + Math.random() * 60,
    delay: Math.random() * 0.5,
    duration: 0.5 + Math.random() * 0.4,
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
    const timeout = setTimeout(() => setData(null), 2000);
    return () => clearTimeout(timeout);
  }, [trigger, variant]);

  if (!data) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Burst particles from center */}
      {data.particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
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
