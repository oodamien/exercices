# Cosmic Rewards UX/UI Enhancement

## Context

StarCalc is an educational math game for children aged 7-12 with a Deep Space theme. The kids love the space/cosmonaut universe. This design enhances the UX/UI across all fronts: feedback & rewards, theme interactivity, game page polish, and sound effects.

Sessions remain independent (no persistent progression).

## 1. Cosmic Celebration Particles

**Component:** `<CosmicCelebration variant="success" | "bravo" />`

**Trigger:**
- `success`: each correct answer — burst of 8-12 golden stars expanding from center + 2-3 diagonal shooting stars
- `bravo`: final completion screen — ~20 stars + shooting star rain + pulsing glow on text

**Implementation:**
- CSS-only animations using absolutely positioned `<span>` elements
- Randomized via CSS custom properties (`--angle`, `--delay`, `--distance`)
- Auto-cleanup after 2s (elements fade out)
- No canvas — CSS animations are more performant on mobile

## 2. Rocket Transition Animation

**Component:** `<RocketTransition variant="launch" | "flyby" />`

**Trigger:**
- `launch`: game start — rocket appears at bottom, lifts off upward with flame trail, exits screen (~1.2s)
- `flyby`: between rounds — rocket crosses horizontally left-to-right with slight curve (~0.8s)

**Implementation:**
- Reuses existing `<Rocket />` SVG component, scaled up
- Trail: 3-4 circles fading behind the rocket (orange/gold gradient)
- Pure CSS `@keyframes`: `translateY` + `scale` + `opacity` for launch, `translateX` for flyby
- `position: absolute` overlay, does NOT block gameplay (decorative only)

## 3. Reactive Astronaut Mascot

**Component:** `<AstronautMascot mood="thinking" | "happy" | "cheering" | "sad" />`

**Position:** bottom-right of game area, ~80px, subtle presence

**Moods:**
- `thinking`: gentle float (existing animation), hand on helmet, "?" particles — during answer phase
- `happy`: wider smile, thumb up, small stars around — correct answer
- `cheering`: arms raised, jumping animation, stars + confetti — final bravo screen
- `sad`: gentle shake (existing animation), visor fog effect — wrong answer

**Implementation:**
- Modified SVG paths per mood (eyes, mouth, arms) + conditional decorative elements
- Smooth transitions between moods via `opacity` + `transform`
- Based on existing `<Astronaut />` SVG

## 4. Cosmic Sound Effects

**Hook:** `useSoundEffects()` exposing `playSuccess()`, `playError()`, `playStart()`, `playTransition()`, `playBravo()`

**Sounds (Web Audio API, no audio files):**
- `success`: ascending 2-note chord (C-E, ~0.3s) — joyful ding
- `error`: short low buzz (~0.2s) — informative, not punitive
- `start`: ascending swoosh (~0.5s) — liftoff feel
- `transition`: light whoosh (~0.3s) — rocket passing
- `bravo`: 4-note ascending victory melody (~0.8s) + final chord

**Properties:**
- Moderate volume, child-appropriate
- Zero latency (synthesized, no file loading)
- Spatial/8-bit feel matching the theme

## 5. Game Page Visual Polish

### Both Games
- **"Ready" phase**: replace plain text with 3-2-1 countdown (numbers scale up and fade out)
- **Phase transitions**: fade-in/out (opacity 0-1, 300ms) instead of instant appearance
- **"New Game" button**: add Rocket icon + glow animation on hover

### Counting Game
- **Number display**: pulsing hologram glow effect, scale-in animation on each new number
- **Result screen**: mascot `cheering` + cosmic particles + `bravo` sound

### Cards/Abacus Game
- **Answer phase**: mascot `thinking` visible
- **Wrong answer**: shake animation + mascot `sad`
- **Success phase**: cosmic particles + mascot `happy` + `success` sound
- **Bravo phase**: intense particles + rocket launch + mascot `cheering` + `bravo` sound

## New Files

- `src/app/components/cosmic-celebration.tsx` — particle celebration overlay
- `src/app/components/rocket-transition.tsx` — rocket animation overlay
- `src/app/components/astronaut-mascot.tsx` — reactive mascot (4 moods)
- `src/app/hooks/use-sound-effects.ts` — Web Audio API sound synthesis hook

## Modified Files

- `src/app/globals.css` — new keyframes for particles, rocket, countdown, hologram glow
- `src/app/components/counting/game.tsx` — integrate mascot, celebrations, sounds, countdown, transitions
- `src/app/components/cards/game.tsx` — integrate mascot, celebrations, sounds, countdown, rocket, transitions
- `src/app/i18n/translations.ts` (or equivalent) — countdown text if needed
