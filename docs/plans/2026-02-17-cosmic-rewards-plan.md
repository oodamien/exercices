# Cosmic Rewards UX/UI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add cosmic celebration particles, rocket transitions, reactive astronaut mascot, sound effects, and game page polish to enhance the children's experience.

**Architecture:** 4 new standalone components/hooks (`CosmicCelebration`, `RocketTransition`, `AstronautMascot`, `useSoundEffects`) integrated into the existing Counting and Cards game components. All animations are CSS-only (no canvas). Sounds are synthesized via Web Audio API (no audio files). New CSS keyframes are added to `globals.css`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, CSS Animations, Web Audio API

---

### Task 1: Sound Effects Hook (`useSoundEffects`)

**Files:**
- Create: `src/app/hooks/use-sound-effects.ts`

**Step 1: Create the hook file**

```typescript
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
    // Ascending 2-note chord C5 -> E5
    playTone(523, 0.15, "sine", 0.12);
    setTimeout(() => playTone(659, 0.2, "sine", 0.12), 100);
  }, [playTone]);

  const playError = useCallback(() => {
    // Short low buzz
    playTone(150, 0.2, "sawtooth", 0.06);
  }, [playTone]);

  const playStart = useCallback(() => {
    // Ascending swoosh: C4 -> G4 -> C5
    playTone(262, 0.15, "sine", 0.1);
    setTimeout(() => playTone(392, 0.15, "sine", 0.1), 120);
    setTimeout(() => playTone(523, 0.25, "triangle", 0.1), 240);
  }, [playTone]);

  const playTransition = useCallback(() => {
    // Light whoosh
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
    // Victory melody: C5 -> E5 -> G5 -> C6
    playTone(523, 0.2, "sine", 0.1);
    setTimeout(() => playTone(659, 0.2, "sine", 0.1), 150);
    setTimeout(() => playTone(784, 0.2, "sine", 0.1), 300);
    setTimeout(() => playTone(1047, 0.4, "triangle", 0.12), 450);
  }, [playTone]);

  return { playSuccess, playError, playStart, playTransition, playBravo };
}
```

**Step 2: Verify build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/hooks/use-sound-effects.ts
git commit -m "feat: add useSoundEffects hook with Web Audio API synthesis"
```

---

### Task 2: Cosmic Celebration Particles

**Files:**
- Create: `src/app/components/cosmic-celebration.tsx`
- Modify: `src/app/globals.css` (add keyframes)

**Step 1: Add CSS keyframes to globals.css**

Append to `src/app/globals.css` after the existing animation classes:

```css
/* Cosmic celebration particles */
@keyframes particle-burst {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
}

@keyframes shooting-star {
  0% { transform: translate(0, 0) rotate(var(--angle)); opacity: 1; width: 4px; }
  100% { transform: translate(var(--tx), var(--ty)) rotate(var(--angle)); opacity: 0; width: 40px; }
}

.animate-particle { animation: particle-burst var(--duration, 1s) ease-out var(--delay, 0s) forwards; }
.animate-shooting-star { animation: shooting-star var(--duration, 0.8s) ease-out var(--delay, 0s) forwards; }
```

**Step 2: Create the component**

```tsx
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
```

**Step 3: Verify build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/components/cosmic-celebration.tsx src/app/globals.css
git commit -m "feat: add CosmicCelebration particle component"
```

---

### Task 3: Rocket Transition Animation

**Files:**
- Create: `src/app/components/rocket-transition.tsx`
- Modify: `src/app/globals.css` (add keyframes)

**Step 1: Add CSS keyframes to globals.css**

Append:

```css
/* Rocket transitions */
@keyframes rocket-launch {
  0% { transform: translateY(100px) scale(0.8); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
}

@keyframes rocket-flyby {
  0% { transform: translateX(-100px) translateY(20px) rotate(-10deg); opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateX(calc(100vw + 100px)) translateY(-30px) rotate(-10deg); opacity: 0; }
}

@keyframes flame-flicker {
  0%, 100% { transform: scaleY(1) scaleX(1); }
  50% { transform: scaleY(1.3) scaleX(0.8); }
}

.animate-rocket-launch { animation: rocket-launch 1.2s ease-in forwards; }
.animate-rocket-flyby { animation: rocket-flyby 0.8s ease-in-out forwards; }
.animate-flame { animation: flame-flicker 0.15s ease-in-out infinite; }
```

**Step 2: Create the component**

```tsx
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
    const duration = variant === "launch" ? 1200 : 800;
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
```

**Step 3: Verify build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/components/rocket-transition.tsx src/app/globals.css
git commit -m "feat: add RocketTransition animation component"
```

---

### Task 4: Reactive Astronaut Mascot

**Files:**
- Create: `src/app/components/astronaut-mascot.tsx`

**Step 1: Create the mascot component**

The mascot modifies the existing Astronaut SVG based on mood. Each mood changes eyes, mouth, arms, and adds decorative elements.

```tsx
"use client";

export type MascotMood = "thinking" | "happy" | "cheering" | "sad";

interface Props {
  mood: MascotMood;
  className?: string;
}

export function AstronautMascot({ mood, className = "" }: Props) {
  return (
    <div
      className={`transition-all duration-500 ${
        mood === "thinking"
          ? "animate-float"
          : mood === "sad"
          ? "animate-shake"
          : mood === "cheering"
          ? "animate-bounce-in"
          : ""
      } ${className}`}
    >
      <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Helmet */}
        <circle cx="100" cy="75" r="45" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="3" />
        <circle cx="100" cy="75" r="38" fill="#1A2744" />
        {/* Visor reflection */}
        <ellipse cx="88" cy="68" rx="12" ry="8" fill="rgba(0,212,255,0.3)" transform="rotate(-15 88 68)" />
        {/* Visor fog for sad mood */}
        {mood === "sad" && (
          <ellipse cx="100" cy="85" rx="30" ry="10" fill="rgba(139,158,199,0.2)" />
        )}

        {/* Eyes - change per mood */}
        {mood === "happy" || mood === "cheering" ? (
          <>
            {/* Happy squint eyes */}
            <path d="M 87 70 Q 92 66 97 70" stroke="#FFD700" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 103 70 Q 108 66 113 70" stroke="#FFD700" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : mood === "sad" ? (
          <>
            {/* Sad droopy eyes */}
            <circle cx="92" cy="72" r="3" fill="#8B9EC7" />
            <circle cx="108" cy="72" r="3" fill="#8B9EC7" />
          </>
        ) : (
          <>
            {/* Thinking: normal + one raised */}
            <circle cx="92" cy="72" r="3" fill="#FFD700" />
            <circle cx="108" cy="70" r="3" fill="#FFD700" />
          </>
        )}

        {/* Mouth - change per mood */}
        {mood === "happy" || mood === "cheering" ? (
          <path d="M 90 82 Q 100 92 110 82" stroke="#FFD700" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : mood === "sad" ? (
          <path d="M 93 86 Q 100 80 107 86" stroke="#8B9EC7" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : (
          <circle cx="102" cy="84" r="2" fill="#FFD700" />
        )}

        {/* Body */}
        <rect x="75" y="115" width="50" height="45" rx="12" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
        {/* Chest panel */}
        <rect x="88" y="122" width="24" height="14" rx="3" fill="#1A2744" />
        <circle cx="96" cy="129" r="2" fill={mood === "sad" ? "#FF5A5A" : "#22D17B"} />
        <circle cx="104" cy="129" r="2" fill={mood === "cheering" ? "#22D17B" : "#FF5A5A"} />

        {/* Arms - change per mood */}
        {mood === "cheering" ? (
          <>
            {/* Arms raised */}
            <rect x="55" y="95" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" transform="rotate(-45 66 101)" />
            <rect x="123" y="95" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" transform="rotate(45 134 101)" />
            <circle cx="46" cy="100" r="7" fill="#FFD700" />
            <circle cx="154" cy="100" r="7" fill="#FFD700" />
          </>
        ) : mood === "thinking" ? (
          <>
            {/* One arm on helmet, one normal */}
            <rect x="55" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
            <circle cx="52" cy="126" r="7" fill="#FFD700" />
            {/* Right arm up to helmet */}
            <rect x="125" y="98" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" transform="rotate(-60 136 104)" />
            <circle cx="120" cy="82" r="7" fill="#FFD700" />
          </>
        ) : mood === "happy" ? (
          <>
            {/* Thumb up on right */}
            <rect x="55" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
            <circle cx="52" cy="126" r="7" fill="#FFD700" />
            <rect x="123" y="110" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" transform="rotate(-20 134 116)" />
            <circle cx="148" cy="108" r="7" fill="#FFD700" />
            {/* Thumb */}
            <line x1="148" y1="108" x2="152" y2="98" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Normal arms */}
            <rect x="55" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
            <rect x="123" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
            <circle cx="52" cy="126" r="7" fill="#FFD700" />
            <circle cx="148" cy="126" r="7" fill="#FFD700" />
          </>
        )}

        {/* Legs */}
        <rect x="80" y="155" width="15" height="25" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
        <rect x="105" y="155" width="15" height="25" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
        {/* Boots */}
        <rect x="76" y="175" width="22" height="10" rx="5" fill="#FF8C42" />
        <rect x="102" y="175" width="22" height="10" rx="5" fill="#FF8C42" />
        {/* Antenna */}
        <line x1="100" y1="30" x2="100" y2="15" stroke="#8B9EC7" strokeWidth="2" />
        <circle cx="100" cy="12" r="4" fill={mood === "cheering" || mood === "happy" ? "#FFD700" : "#8B9EC7"} />
        {/* Backpack */}
        <rect x="68" y="118" width="10" height="30" rx="4" fill="#8B9EC7" />

        {/* Decorative elements per mood */}
        {mood === "thinking" && (
          <>
            <text x="140" y="60" fontSize="16" fill="#FFD700" opacity="0.8">?</text>
            <text x="155" y="48" fontSize="12" fill="#00D4FF" opacity="0.6">?</text>
          </>
        )}
        {(mood === "happy" || mood === "cheering") && (
          <>
            <text x="40" y="55" fontSize="14" fill="#FFD700">&#9733;</text>
            <text x="150" y="50" fontSize="10" fill="#00D4FF">&#9733;</text>
            <text x="55" y="100" fontSize="8" fill="#FFD700">&#9733;</text>
          </>
        )}
        {mood === "cheering" && (
          <>
            <text x="35" y="85" fontSize="12" fill="#FF8C42">&#9733;</text>
            <text x="160" y="75" fontSize="11" fill="#22D17B">&#9733;</text>
            <text x="30" y="65" fontSize="9" fill="#E8EDF5">&#9733;</text>
          </>
        )}
      </svg>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/components/astronaut-mascot.tsx
git commit -m "feat: add AstronautMascot with 4 reactive moods"
```

---

### Task 5: Add CSS keyframes for countdown and hologram glow

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add new keyframes and utility classes**

Append to `src/app/globals.css`:

```css
/* Countdown animation */
@keyframes countdown-pop {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}

/* Hologram glow for numbers */
@keyframes hologram-glow {
  0%, 100% { text-shadow: 0 0 10px rgba(0,212,255,0.5), 0 0 20px rgba(0,212,255,0.2); }
  50% { text-shadow: 0 0 20px rgba(0,212,255,0.8), 0 0 40px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.1); }
}

/* Number scale-in */
@keyframes number-scale-in {
  0% { transform: scale(0.7); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* Phase fade-in */
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-countdown-pop { animation: countdown-pop 0.8s ease-out forwards; }
.animate-hologram { animation: hologram-glow 2s ease-in-out infinite; }
.animate-number-in { animation: number-scale-in 0.3s ease-out; }
.animate-fade-in { animation: fade-in 0.3s ease-out; }
```

**Step 2: Verify build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add countdown, hologram, number-scale-in, fade-in animations"
```

---

### Task 6: Integrate everything into Counting Game

**Files:**
- Modify: `src/app/components/counting/game.tsx`

**Step 1: Integrate all new components**

The Counting game needs:
- `useSoundEffects()` — play sounds on game events
- `<CosmicCelebration>` — trigger on result reveal
- `<RocketTransition>` — trigger on game start
- `<AstronautMascot>` — show during result screen
- Countdown 3-2-1 replacing "Prêt..."
- Hologram glow on numbers
- `animate-number-in` on each new number
- `animate-fade-in` on phase transitions
- Rocket icon on "Nouvelle partie" button

**Key changes to `game.tsx`:**

1. Import new components at the top:
```tsx
import { useSoundEffects } from "@/app/hooks/use-sound-effects";
import { CosmicCelebration } from "@/app/components/cosmic-celebration";
import { RocketTransition } from "@/app/components/rocket-transition";
import { AstronautMascot } from "@/app/components/astronaut-mascot";
import { Rocket } from "@/app/components/icons/rocket";
```

2. Add hook and state:
```tsx
const sfx = useSoundEffects();
const [celebrationTrigger, setCelebrationTrigger] = useState(0);
const [rocketTrigger, setRocketTrigger] = useState(0);
const [countdown, setCountdown] = useState<number | null>(null);
```

3. Replace "Prêt..." with 3-2-1 countdown:
   - When `tick === -1`, show countdown 3 → 2 → 1 with `animate-countdown-pop`
   - Each number shows for ~800ms, then fades
   - Play `sfx.playStart()` at countdown start

4. On game start (`onPlay` callback), trigger `setRocketTrigger(t => t + 1)` and `sfx.playStart()`

5. On number display (`tick > -1 && tick <= terms.length - 1`), add `animate-number-in` and `animate-hologram` classes

6. On result reveal (`tick === terms.length + 1`):
   - Trigger `setCelebrationTrigger(t => t + 1)`
   - Play `sfx.playBravo()`
   - Show `<AstronautMascot mood="cheering" />` next to result

7. Add Rocket icon to "Nouvelle partie" buttons

8. Wrap phase sections in `<div className="animate-fade-in">`

9. Add `<CosmicCelebration>` and `<RocketTransition>` overlays inside the game container

**Step 2: Verify build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Test in browser**

Run: `PORT=3001 npx next dev --turbopack`
Navigate to `http://localhost:3001/counting`
Verify:
- 3-2-1 countdown with pop animation on game start
- Rocket launch animation on game start
- Start sound plays
- Numbers have hologram glow and scale-in
- Result screen shows particles, astronaut cheering, bravo sound
- Nouvelle partie button has rocket icon

**Step 4: Commit**

```bash
git add src/app/components/counting/game.tsx
git commit -m "feat(counting): integrate cosmic celebrations, sounds, mascot, and visual polish"
```

---

### Task 7: Integrate everything into Cards/Abacus Game

**Files:**
- Modify: `src/app/components/cards/game.tsx`

**Step 1: Integrate all new components**

The Cards game needs all the same components plus mood-specific mascot states:

1. Import new components (same as counting game)

2. Add hook and state:
```tsx
const sfx = useSoundEffects();
const [celebrationTrigger, setCelebrationTrigger] = useState(0);
const [rocketTrigger, setRocketTrigger] = useState(0);
const [rocketVariant, setRocketVariant] = useState<"launch" | "flyby">("launch");
const [countdown, setCountdown] = useState<number | null>(null);
```

3. Replace "Prêt..." phase with 3-2-1 countdown (same as counting)

4. Phase-specific integrations:
   - `ready` → countdown 3-2-1 + `sfx.playStart()` + rocket launch
   - `flashing` → no changes (abacus display stays clean)
   - `answering` → show `<AstronautMascot mood="thinking" />` in bottom-right
   - On wrong answer: `sfx.playError()` + shake + mascot mood → `sad`
   - `success` → `sfx.playSuccess()` + `<CosmicCelebration variant="success" />` + mascot `happy`
   - Between rounds (in `handleNext`): trigger rocket flyby `setRocketVariant("flyby")` + `sfx.playTransition()`
   - `complete` → `sfx.playBravo()` + `<CosmicCelebration variant="bravo" />` + rocket launch + mascot `cheering`

5. Add `<AstronautMascot>` positioned `absolute bottom-3 right-3` with `w-20 h-20`

6. Add `<CosmicCelebration>` and `<RocketTransition>` overlays

7. Wrap phase sections in `<div className="animate-fade-in">`

8. Add Rocket icon to buttons

**Step 2: Verify build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Test in browser**

Run: `PORT=3001 npx next dev --turbopack`
Navigate to `http://localhost:3001/cards`
Verify:
- 3-2-1 countdown on start with rocket launch
- Mascot shows "thinking" during answer phase
- Wrong answer: shake + sad mascot + error sound
- Correct answer: success particles + happy mascot + success sound
- Between rounds: rocket flyby + transition sound
- Final bravo: intense particles + cheering mascot + bravo sound + rocket launch
- All buttons have rocket icons

**Step 4: Commit**

```bash
git add src/app/components/cards/game.tsx
git commit -m "feat(cards): integrate cosmic celebrations, sounds, mascot, and visual polish"
```

---

### Task 8: Final build verification

**Step 1: Full build check**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -10`
Expected: Build succeeds with no errors

**Step 2: Visual test both games in browser**

Play through both games completely to verify all animations, sounds, and transitions work together without conflicts.

**Step 3: Commit any final fixes if needed**
