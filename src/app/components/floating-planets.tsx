"use client";

export function FloatingPlanets() {
  const planets = [
    { color: "#A855F7", size: 12, top: "15%", left: "8%", orbitRadius: 30, duration: 15, opacity: 0.25 },
    { color: "#00D4FF", size: 8, top: "70%", right: "12%", orbitRadius: 20, duration: 22, opacity: 0.2 },
    { color: "#FFD700", size: 10, top: "40%", right: "5%", orbitRadius: 25, duration: 18, opacity: 0.2 },
    { color: "#FF8C42", size: 6, bottom: "20%", left: "15%", orbitRadius: 15, duration: 25, opacity: 0.15 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {planets.map((p, i) => (
        <div
          key={i}
          className="absolute animate-orbit"
          style={{
            top: p.top,
            left: p.left,
            right: (p as { right?: string }).right,
            bottom: (p as { bottom?: string }).bottom,
            "--orbit-radius": `${p.orbitRadius}px`,
            "--orbit-duration": `${p.duration}s`,
            opacity: p.opacity,
          } as React.CSSProperties}
        >
          <div
            className="rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle at 30% 30%, ${p.color}, ${p.color}44)`,
              boxShadow: `0 0 ${p.size}px ${p.color}33`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
