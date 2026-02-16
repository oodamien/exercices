# Abakus Game Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the Abakus flash-cards game: proper 9-level system, multi-digit numbers, fine-grained timer, per-number answer validation, and updated color schemes.

**Architecture:** Targeted refactoring of 6 existing files. No new files created. The generator produces numbers based on level ranges. The game flow changes from "answer sum" to "answer each number individually" when impulses > 1. Abacus canvas adapts column count to level.

**Tech Stack:** Next.js 16 / React 19 / TypeScript / Tailwind CSS 4 / Canvas API

---

### Task 1: Update types

**Files:**
- Modify: `src/app/types.ts:5,21-27`

**Step 1: Update BeadColorScheme type**

Change line 5 from:
```typescript
export type BeadColorScheme = "default" | "black" | "white";
```
to:
```typescript
export type BeadColorScheme = "default" | "standard";
```

**Step 2: Update CardsConfigState interface**

Change lines 21-27 from:
```typescript
export interface CardsConfigState {
  difficulty: number;       // 1-10 slider
  interval: number;
  impulses: number;
  rotation: number;
  colorScheme: BeadColorScheme;
}
```
to:
```typescript
export interface CardsConfigState {
  level: number;            // 1-9
  interval: number;         // milliseconds (100-15000, step 250)
  impulses: number;         // 1-6
  rotation: number;
  colorScheme: BeadColorScheme;
}
```

**Step 3: Verify TypeScript compiles**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx tsc --noEmit 2>&1 | head -30`
Expected: Type errors in files that still reference `difficulty` — this is expected and will be fixed in subsequent tasks.

**Step 4: Commit**

```bash
git add src/app/types.ts
git commit -m "refactor(types): update CardsConfigState with level 1-9 and standard color scheme"
```

---

### Task 2: Update number generator

**Files:**
- Modify: `src/app/generators.ts:50-64`

**Step 1: Replace generateCardsTerms function**

Replace the entire `generateCardsTerms` function (lines 50-64) with:

```typescript
/**
 * Level definitions for Cards/Abacus game.
 * Each level specifies how to generate a random number.
 */
const CARDS_LEVELS: Record<number, { generate: () => number }> = {
  1: { generate: () => Math.floor(Math.random() * 10) },                    // 0-9
  2: { generate: () => 10 + Math.floor(Math.random() * 10) },               // 10-19
  3: { generate: () => Math.floor(Math.random() * 20) },                    // 0-19
  4: { generate: () => (Math.floor(Math.random() * 9) + 1) * 10 },         // 10,20..90
  5: { generate: () => Math.floor(Math.random() * 100) },                   // 0-99
  6: { generate: () => Math.floor(Math.random() * 1000) },                  // 0-999
  7: { generate: () => Math.floor(Math.random() * 10000) },                 // 0-9999
  8: { generate: () => Math.floor(Math.random() * 100000) },                // 0-99999
  9: { generate: () => Math.floor(Math.random() * 1000000) },               // 0-999999
};

/**
 * Generate random terms for Cards/Abacus based on config.
 * Level 1-9 controls the number range.
 * Always generates 10 terms.
 */
export function generateCardsTerms(config: CardsConfigState): number[] {
  const levelDef = CARDS_LEVELS[config.level] ?? CARDS_LEVELS[1];
  const terms: number[] = [];

  for (let i = 0; i < 10; i++) {
    terms.push(levelDef.generate());
  }

  return terms;
}
```

**Step 2: Verify TypeScript compiles**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx tsc --noEmit 2>&1 | head -30`
Expected: Still type errors from other files referencing `difficulty`, but `generators.ts` itself should be clean.

**Step 3: Commit**

```bash
git add src/app/generators.ts
git commit -m "feat(generator): implement 9-level number generation for Abakus"
```

---

### Task 3: Update translations

**Files:**
- Modify: `src/app/components/language-context.tsx`

**Step 1: Add new translation keys and remove obsolete ones**

In each of the 3 translation blocks (FR, DE, EN), make these changes:

**French (fr-FR):**
- Remove: `"cards.config.color.black"`, `"cards.config.color.white"`
- Add: `"cards.config.color.standard": "Standard"`
- Change: `"cards.config.difficulty": "Niveau"` stays the same
- Add: `"cards.config.level.1": "Level 1: 0-9"`
- Add: `"cards.config.level.2": "Level 2: 10-19"`
- Add: `"cards.config.level.3": "Level 3: 0-19"`
- Add: `"cards.config.level.4": "Level 4: dizaines"`
- Add: `"cards.config.level.5": "Level 5: 0-99"`
- Add: `"cards.config.level.6": "Level 6: 0-999"`
- Add: `"cards.config.level.7": "Level 7: 0-9999"`
- Add: `"cards.config.level.8": "Level 8: 0-99999"`
- Add: `"cards.config.level.9": "Level 9: 0-999999"`
- Add: `"cards.answerProgress": "Nombre {current}/{total}"`

**German (de-DE):**
- Remove: `"cards.config.color.black"`, `"cards.config.color.white"`
- Add: `"cards.config.color.standard": "Standard"`
- Change: `"cards.config.difficulty"` to `"Stufe"`
- Add: `"cards.config.level.1": "Level 1: 0-9"`
- Add: `"cards.config.level.2": "Level 2: 10-19"`
- Add: `"cards.config.level.3": "Level 3: 0-19"`
- Add: `"cards.config.level.4": "Level 4: Zehner"`
- Add: `"cards.config.level.5": "Level 5: 0-99"`
- Add: `"cards.config.level.6": "Level 6: 0-999"`
- Add: `"cards.config.level.7": "Level 7: 0-9999"`
- Add: `"cards.config.level.8": "Level 8: 0-99999"`
- Add: `"cards.config.level.9": "Level 9: 0-999999"`
- Add: `"cards.answerProgress": "Zahl {current}/{total}"`

**English (en-US):**
- Remove: `"cards.config.color.black"`, `"cards.config.color.white"`
- Add: `"cards.config.color.standard": "Standard"`
- Change: `"cards.config.difficulty"` to `"Level"`
- Add: `"cards.config.level.1": "Level 1: 0-9"`
- Add: `"cards.config.level.2": "Level 2: 10-19"`
- Add: `"cards.config.level.3": "Level 3: 0-19"`
- Add: `"cards.config.level.4": "Level 4: tens"`
- Add: `"cards.config.level.5": "Level 5: 0-99"`
- Add: `"cards.config.level.6": "Level 6: 0-999"`
- Add: `"cards.config.level.7": "Level 7: 0-9999"`
- Add: `"cards.config.level.8": "Level 8: 0-99999"`
- Add: `"cards.config.level.9": "Level 9: 0-999999"`
- Add: `"cards.answerProgress": "Number {current}/{total}"`

**Step 2: Commit**

```bash
git add src/app/components/language-context.tsx
git commit -m "feat(i18n): add level labels and answer progress translations for Abakus"
```

---

### Task 4: Update cards config UI

**Files:**
- Modify: `src/app/components/cards/cards-config.tsx`

**Step 1: Update color options array and labels**

Replace line 51:
```typescript
const COLOR_OPTIONS: BeadColorScheme[] = ["default", "black", "white"];
```
with:
```typescript
const COLOR_OPTIONS: BeadColorScheme[] = ["default", "standard"];
```

Replace colorLabelKey (lines 56-60):
```typescript
  const colorLabelKey: Record<BeadColorScheme, string> = {
    default: "cards.config.color.default",
    standard: "cards.config.color.standard",
  };
```

**Step 2: Update difficulty stepper to level stepper**

Replace the difficulty stepper block (lines 70-86) with:
```tsx
          {/* Level stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">
              {t("cards.config.difficulty")}
            </label>
            <div className="mt-2">
              <Stepper
                value={config.level}
                min={1}
                max={9}
                step={1}
                format={(v) => t(`cards.config.level.${v}`)}
                onChange={(level) => onChange({ ...config, level })}
                ariaLabel={t("cards.config.difficulty")}
              />
            </div>
          </div>
```

**Step 3: Update impulses stepper max**

Change impulses stepper (line 92) max from 10 to 6:
```tsx
              <Stepper value={config.impulses} min={1} max={6} step={1} format={(v) => String(v)} onChange={(impulses) => onChange({ ...config, impulses })} ariaLabel={t("cards.config.impulses")} />
```

**Step 4: Update interval stepper**

Change interval stepper (line 100) from `min={1000} max={5000} step={1000}` to `min={100} max={15000} step={250}`:
```tsx
              <Stepper value={config.interval} min={100} max={15000} step={250} format={(v) => t("cards.config.intervalSec").replace("{val}", (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1))} onChange={(interval) => onChange({ ...config, interval })} ariaLabel={t("cards.config.interval")} />
```

Note: The format function uses `.toFixed()` to show "2 sec" for whole seconds and "2.5 sec" for fractional.

**Step 5: Update Stepper min-width for level labels**

The level labels (e.g., "Level 9: 0-999999") are wider than 70px. Change the `min-w-[70px]` in the Stepper component (line 36) to `min-w-[160px]`:
```tsx
        <span className="min-w-[160px] text-center font-mono text-sm text-sc-text">
```

**Step 6: Verify it renders**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx tsc --noEmit 2>&1 | head -30`
Expected: Fewer type errors now (page.tsx and game.tsx still reference `difficulty`).

**Step 7: Commit**

```bash
git add src/app/components/cards/cards-config.tsx
git commit -m "feat(config): update cards config with level selector, fine timer, and standard colors"
```

---

### Task 5: Update abacus canvas colors and column sizing

**Files:**
- Modify: `src/app/components/cards/abacus.tsx:10-23`

**Step 1: Replace color definitions**

Replace the `BEAD_COLORS` object (lines 10-23) with:
```typescript
const BEAD_COLORS: Record<BeadColorScheme, { inactive: string; active: string }> = {
  default: {
    inactive: "oklch(88.2% 0.059 254.128)",
    active: "oklch(70.7% 0.165 254.624)",
  },
  standard: {
    inactive: "oklch(78% 0.08 230)",
    active: "oklch(82% 0.16 90)",
  },
};
```

The "standard" scheme uses light blue (inactive) and yellow (active), similar to the abakus-center.eu site. These oklch values approximate:
- inactive: a muted light blue
- active: a warm yellow

**Step 2: Verify TypeScript compiles**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx tsc --noEmit 2>&1 | head -30`

**Step 3: Commit**

```bash
git add src/app/components/cards/abacus.tsx
git commit -m "feat(abacus): replace black/white with standard (blue/yellow) color scheme"
```

---

### Task 6: Update game flow for multi-answer validation

**Files:**
- Modify: `src/app/components/cards/game.tsx`

This is the most complex change. The game must now ask for each number individually when impulses > 1.

**Step 1: Add answerIndex state**

After line 29 (`const [firstAttempt, setFirstAttempt] = useState(true);`), add:
```typescript
  const [answerIndex, setAnswerIndex] = useState(0);
```

**Step 2: Update the reset effect**

In the reset effect (lines 78-93), add `setAnswerIndex(0)` after `setFirstAttempt(true)` (line 86):
```typescript
      setAnswerIndex(0);
```

**Step 3: Rewrite handleSubmit for per-number validation**

Replace the entire `handleSubmit` function (lines 152-187) with:
```typescript
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
```

**Step 4: Add answer progress indicator in ANSWERING phase UI**

In the answering phase JSX (around line 265), add a progress indicator before the form. Replace the answering phase block with:
```tsx
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
```

**Step 5: Reset answerIndex in handleAnew and handleReplay**

In `handleAnew` (line 190), add `setAnswerIndex(0)`:
```typescript
  function handleAnew() {
    setAnswerIndex(0);
    setFlashIndex(0);
    setShowAbacus(true);
    setPhase("flashing");
    setError(false);
    setVal("");
  }
```

In `handleReplay` (line 199), add `setAnswerIndex(0)`:
```typescript
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
```

**Step 6: Update auto-focus to trigger on answerIndex changes too**

Change the auto-focus effect dependency (lines 141-149) to include `answerIndex`:
```typescript
  useEffect(() => {
    if (phase === "answering") {
      const id = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(id);
    }
  }, [phase, answerIndex]);
```

**Step 7: Commit**

```bash
git add src/app/components/cards/game.tsx
git commit -m "feat(game): implement per-number answer validation for multi-impulse rounds"
```

---

### Task 7: Update page.tsx default config

**Files:**
- Modify: `src/app/cards/page.tsx:15-21`

**Step 1: Update default config state**

Replace lines 15-21:
```typescript
  const [config, setConfig] = useState<CardsConfigState>({
    difficulty: 1,
    interval: 2000,
    impulses: 1,
    rotation: 0,
    colorScheme: "default",
  });
```
with:
```typescript
  const [config, setConfig] = useState<CardsConfigState>({
    level: 1,
    interval: 2000,
    impulses: 1,
    rotation: 0,
    colorScheme: "default",
  });
```

**Step 2: Verify full build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx tsc --noEmit`
Expected: No errors.

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -20`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/cards/page.tsx
git commit -m "feat(cards): update default config to use level instead of difficulty"
```

---

### Task 8: Manual browser testing and color tuning

**Step 1: Start dev server**

Run: `PORT=3001 npx next dev --turbopack`
Navigate to `http://localhost:3001/cards`

**Step 2: Test checklist**

- [ ] Level 1: numbers 0-9 appear, single column abacus
- [ ] Level 2: numbers 10-19 appear, 2-column abacus
- [ ] Level 4: only multiples of 10 (10-90), 2-column abacus
- [ ] Level 9: numbers 0-999999, 6-column abacus
- [ ] Timer: can set 0.1s, 0.25s, 2.5s, 15s — all work correctly
- [ ] Impulses=1: single number, single answer per round
- [ ] Impulses=3: 3 numbers shown, then 3 answers required (with "Nombre X/3" indicator)
- [ ] Correct answer advances to next number in sequence
- [ ] Wrong answer shows error, allows retry
- [ ] "Revoir" button replays the current round flashes
- [ ] Color toggle: "default" shows blue/purple, "standard" shows blue/yellow
- [ ] Rotation still works at 90°, 180°
- [ ] Score counts correctly (per individual number)
- [ ] Complete phase shows all terms and correct score

**Step 3: Tune "standard" color scheme if needed**

Adjust the oklch values in `abacus.tsx` to better match the abakus-center.eu style (light blue inactive beads, yellow active beads). Compare visually with the screenshots provided.

**Step 4: Final commit if colors tuned**

```bash
git add src/app/components/cards/abacus.tsx
git commit -m "style(abacus): tune standard color scheme to match reference"
```
