# Algorithmic Game Value Generation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace 7800 lines of hardcoded game data with algorithmic generation driven by a difficulty slider (1-10).

**Architecture:** Create `src/app/generators.ts` with two pure functions that produce random terms from config parameters. Replace dropdown selectors with steppers. Delete `Data.ts` and all related types.

**Tech Stack:** TypeScript, React 19, Next.js 16

---

### Task 1: Update types

**Files:**
- Modify: `src/app/types.ts`

**Step 1: Update types**

Remove these interfaces (no longer needed):
- `FlashCountingCategory`
- `FlashCountingItem`
- `CardCategory`
- `CardItem`
- `ConfigState`
- `GameProps`
- `ConfigProps`

Update `CountingConfigState.difficulty` from `string` to `number`.
Update `CardsConfigState.difficulty` from `string` to `number`.

Final `src/app/types.ts`:

```typescript
// src/app/types.ts

export type SupportedLanguage = "fr-FR" | "de-DE" | "en-US";

export type BeadColorScheme = "default" | "black" | "white";

export type CountingOperation = "+" | "-" | "+-";

export interface CountingConfigState {
  difficulty: number;       // 1-10 slider
  interval: number;
  operation: CountingOperation;
  terms: number;
  pauseTime: number;
  fontSize: number;
  lineHeight: number;
  showSeparator: boolean;
  showSymbols: boolean;
}

export interface CardsConfigState {
  difficulty: number;       // 1-10 slider
  interval: number;
  impulses: number;
  rotation: number;
  colorScheme: BeadColorScheme;
}

export interface ScoreState {
  correct: number;
  total: number;
}
```

**Step 2: Build to verify no compile errors yet (expect errors — Data.ts references will break)**

Run: `npx next build 2>&1 | head -30`
Expected: Compile errors in page files referencing deleted types — this is expected and will be fixed in subsequent tasks.

**Step 3: Commit**

```bash
git add src/app/types.ts
git commit -m "refactor: simplify types, remove Data-related interfaces, difficulty string→number"
```

---

### Task 2: Create generators module

**Files:**
- Create: `src/app/generators.ts`

**Step 1: Create generators.ts**

```typescript
import { CountingConfigState, CardsConfigState } from "./types";

/**
 * Generate random terms for Flash Counting based on config.
 * Difficulty 1-10 controls value ranges.
 * Running total never goes below 0.
 */
export function generateCountingTerms(config: CountingConfigState): number[] {
  const { difficulty, terms: termCount, operation } = config;

  // Scale ranges with difficulty (1→small, 10→large)
  const maxPositive = Math.round(5 + (difficulty - 1) * (94 / 9));
  const maxNegative = Math.round(3 + (difficulty - 1) * (77 / 9));

  const terms: number[] = [];
  let runningTotal = 0;
  const maxAttempts = 100;

  for (let i = 0; i < termCount; i++) {
    let value: number;
    let attempts = 0;

    do {
      const isNegative =
        operation === "-" ||
        (operation === "+-" && Math.random() < 0.4 && i > 0);

      if (isNegative && runningTotal > 0) {
        const cap = Math.min(maxNegative, runningTotal);
        value = -(Math.floor(Math.random() * cap) + 1);
      } else {
        value = Math.floor(Math.random() * maxPositive) + 1;
      }

      attempts++;
    } while (runningTotal + value < 0 && attempts < maxAttempts);

    // Safety: if we can't find a valid negative, use positive
    if (runningTotal + value < 0) {
      value = Math.floor(Math.random() * maxPositive) + 1;
    }

    terms.push(value);
    runningTotal += value;
  }

  return terms;
}

/**
 * Generate random terms for Cards/Abacus based on config.
 * Difficulty 1-10 controls max bead value (4-9).
 * Always generates 10 terms.
 */
export function generateCardsTerms(config: CardsConfigState): number[] {
  const maxValue = Math.round(4 + (config.difficulty - 1) * (5 / 9));
  const terms: number[] = [];

  for (let i = 0; i < 10; i++) {
    terms.push(Math.floor(Math.random() * (maxValue + 1)));
  }

  return terms;
}
```

**Step 2: Commit**

```bash
git add src/app/generators.ts
git commit -m "feat: add algorithmic term generators for counting and cards games"
```

---

### Task 3: Update counting config component

**Files:**
- Modify: `src/app/components/counting/counting-config.tsx`

**Step 1: Remove categories prop, replace dropdown with Stepper**

Changes:
- Remove `categories` from `CountingConfigProps` interface
- Remove the `<select>` difficulty dropdown block (lines 66-87)
- Add a Stepper for difficulty (1-10) in its place
- Update the `CountingConfig` function signature to remove `categories`

Updated interface:
```typescript
interface CountingConfigProps {
  config: CountingConfigState;
  onChange: (state: CountingConfigState) => void;
}
```

Replace the difficulty dropdown section with:
```tsx
{/* Difficulty stepper */}
<div>
  <label className="block text-sm font-medium text-sc-text-dim">
    {t("counting.config.difficulty")}
  </label>
  <div className="mt-2">
    <Stepper
      value={config.difficulty}
      min={1}
      max={10}
      step={1}
      format={(v) => String(v)}
      onChange={(difficulty) => onChange({ ...config, difficulty })}
      ariaLabel={t("counting.config.difficulty")}
    />
  </div>
</div>
```

Update function signature:
```typescript
export function CountingConfig({ config, onChange }: CountingConfigProps) {
```

**Step 2: Commit**

```bash
git add src/app/components/counting/counting-config.tsx
git commit -m "refactor: replace difficulty dropdown with stepper in counting config"
```

---

### Task 4: Update cards config component

**Files:**
- Modify: `src/app/components/cards/cards-config.tsx`

**Step 1: Remove categories prop, replace dropdown with Stepper**

Same pattern as Task 3:
- Remove `categories` from `CardsConfigProps`
- Remove the `<select>` difficulty dropdown block (lines 72-93)
- Add Stepper for difficulty (1-10)

Updated interface:
```typescript
interface CardsConfigProps {
  config: CardsConfigState;
  onChange: (state: CardsConfigState) => void;
}
```

Replace difficulty dropdown with:
```tsx
{/* Difficulty stepper */}
<div>
  <label className="block text-sm font-medium text-sc-text-dim">
    {t("cards.config.difficulty")}
  </label>
  <div className="mt-2">
    <Stepper
      value={config.difficulty}
      min={1}
      max={10}
      step={1}
      format={(v) => String(v)}
      onChange={(difficulty) => onChange({ ...config, difficulty })}
      ariaLabel={t("cards.config.difficulty")}
    />
  </div>
</div>
```

Update function signature:
```typescript
export function CardsConfig({ config, onChange }: CardsConfigProps) {
```

**Step 2: Commit**

```bash
git add src/app/components/cards/cards-config.tsx
git commit -m "refactor: replace difficulty dropdown with stepper in cards config"
```

---

### Task 5: Update counting page

**Files:**
- Modify: `src/app/counting/page.tsx`

**Step 1: Replace generateGame and remove Data imports**

- Remove: `import { FLASH_COUNTING, FLASH_COUNTING_CATS } from "../Data";`
- Remove: `import { CountingConfigState, FlashCountingItem } from "@/app/types";`
- Add: `import { CountingConfigState } from "@/app/types";`
- Add: `import { generateCountingTerms } from "@/app/generators";`
- Remove the `generateGame` function entirely
- Update initial config state: `difficulty: 1` (number instead of `"1"` string)
- Remove `categories={FLASH_COUNTING_CATS}` from `<CountingConfig>`
- Replace `generateGame(config)` call with `generateCountingTerms(config)`

Updated page:
```tsx
"use client";

import { useState } from "react";
import { CountingConfigState } from "@/app/types";
import { Game } from "@/app/components/counting/game";
import { CountingConfig } from "@/app/components/counting/counting-config";
import { generateCountingTerms } from "@/app/generators";
import { useTranslation } from "@/app/components/language-context";

export default function Counting() {
  const t = useTranslation();
  const [play, setPlay] = useState<boolean>(false);
  const [terms, setTerms] = useState<Array<number>>([]);
  const [config, setConfig] = useState<CountingConfigState>({
    difficulty: 1,
    interval: 2000,
    operation: "+",
    terms: 4,
    pauseTime: 500,
    fontSize: 120,
    lineHeight: 200,
    showSeparator: false,
    showSymbols: false,
  });

  return (
    <>
      <header className="border-b border-sc-cyan/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-fredoka)] text-3xl font-bold text-sc-cyan text-glow-cyan">
            ⚡ {t("page.counting.title")}
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <CountingConfig
              config={config}
              onChange={(state: CountingConfigState) => {
                setConfig(state);
              }}
            />
          </div>
          <div className="w-full md:w-3/4 min-h-[400px] nebula-bg rounded-2xl">
            <Game
              play={play}
              terms={terms}
              onPlay={() => {
                setTerms(generateCountingTerms(config));
                setPlay(true);
              }}
              config={config}
            />
          </div>
        </div>
      </div>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/counting/page.tsx
git commit -m "refactor: use algorithmic generation in counting page, remove Data dependency"
```

---

### Task 6: Update cards page

**Files:**
- Modify: `src/app/cards/page.tsx`

**Step 1: Replace generateGame and remove Data imports**

Same pattern as Task 5:
- Remove: `import { CARDS, CARDS_CATS } from "../Data";`
- Remove: `import { CardsConfigState, ScoreState, CardItem } from "@/app/types";`
- Add: `import { CardsConfigState, ScoreState } from "@/app/types";`
- Add: `import { generateCardsTerms } from "@/app/generators";`
- Remove the `generateGame` function
- Update initial config: `difficulty: 1` (number)
- Remove `categories={CARDS_CATS}` from `<CardsConfig>`
- Replace `generateGame(config)` with `generateCardsTerms(config)`

Updated page:
```tsx
"use client";

import { useState } from "react";
import { CardsConfigState, ScoreState } from "@/app/types";
import { Game } from "@/app/components/cards/game";
import { CardsConfig } from "@/app/components/cards/cards-config";
import { generateCardsTerms } from "@/app/generators";
import { useTranslation } from "@/app/components/language-context";

export default function Cards() {
  const t = useTranslation();
  const [play, setPlay] = useState<boolean>(false);
  const [terms, setTerms] = useState<Array<number>>([]);
  const [score, setScore] = useState<ScoreState>({ correct: 0, total: 0 });
  const [config, setConfig] = useState<CardsConfigState>({
    difficulty: 1,
    interval: 2000,
    impulses: 1,
    rotation: 0,
    colorScheme: "default",
  });

  return (
    <>
      <header className="border-b border-sc-orange/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-fredoka)] text-3xl font-bold text-sc-orange text-glow-gold">
            🪐 {t("page.cards.title")}
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <CardsConfig
              config={config}
              onChange={(state: CardsConfigState) => {
                setConfig(state);
              }}
            />
          </div>
          <div className="w-full md:w-3/4 min-h-[400px] nebula-bg rounded-2xl">
            <Game
              play={play}
              terms={terms}
              onPlay={() => {
                setTerms(generateCardsTerms(config));
                setScore({ correct: 0, total: 0 });
                setPlay(true);
              }}
              config={config}
              score={score}
              onScoreUpdate={setScore}
            />
          </div>
        </div>
      </div>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/cards/page.tsx
git commit -m "refactor: use algorithmic generation in cards page, remove Data dependency"
```

---

### Task 7: Delete dead code

**Files:**
- Delete: `src/app/Data.ts`
- Delete: `src/app/components/shared-config.tsx`

**Step 1: Delete files**

```bash
rm src/app/Data.ts src/app/components/shared-config.tsx
```

**Step 2: Build to verify everything compiles**

Run: `npx next build`
Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add -u
git commit -m "chore: delete Data.ts (7800 lines) and unused shared-config.tsx"
```

---

### Task 8: Manual verification in browser

**Step 1: Start dev server**

```bash
PORT=3001 npx next dev --turbopack
```

**Step 2: Test in browser**

Open http://localhost:3001 and verify:
- **Counting page**: difficulty stepper 1-10 works, game generates terms, values scale with difficulty, operations (+/-/+-) work correctly, running total never negative
- **Cards page**: difficulty stepper 1-10 works, game generates 10 terms, values scale with difficulty (low=small, high=large), abacus renders correctly
- Both games: all other config controls (interval, pause, font size, impulses, rotation, color) still work

**Step 3: Final commit if any fixes needed**
