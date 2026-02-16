# Algorithmic Game Value Generation

**Date:** 2026-02-16
**Status:** Approved

## Problem

`Data.ts` contains ~7800 lines of hardcoded game data. Values are filtered by level and randomly selected. This is wasteful — the patterns are simple enough to generate algorithmically from the config parameters.

## Solution

Replace `Data.ts` with a `generators.ts` module that produces random terms based on the user's config. Replace the "Level" dropdown with a difficulty slider (1-10) that controls value ranges.

## Changes

### Types (`types.ts`)

- `CountingConfigState.difficulty`: `string` → `number` (1-10)
- `CardsConfigState.difficulty`: `string` → `number` (1-10)
- Remove: `FlashCountingCategory`, `FlashCountingItem`, `CardCategory`, `CardItem`
- Remove `categories` from config component props

### New: `generators.ts`

**`generateCountingTerms(config: CountingConfigState): number[]`**
- `maxPositive = round(5 + (difficulty - 1) * 94/9)` → 5 to 99
- `maxNegative = round(3 + (difficulty - 1) * 77/9)` → 3 to 80
- Term count from `config.terms` (2-8)
- Operation from `config.operation` (+, -, +-)
- Constraint: running total never goes below 0

**`generateCardsTerms(config: CardsConfigState): number[]`**
- `maxValue = round(4 + (difficulty - 1) * 5/9)` → 4 to 9
- Always 10 terms
- Each term = random integer in [0, maxValue]

### Config components

- Replace difficulty dropdown with Stepper (1-10) in both `counting-config.tsx` and `cards-config.tsx`
- Remove `categories` prop

### Pages

- `counting/page.tsx`: use `generateCountingTerms()`, remove Data import
- `cards/page.tsx`: use `generateCardsTerms()`, remove Data import

### Deleted

- `src/app/Data.ts` (7800 lines)

### Unchanged

- `components/counting/game.tsx` — receives `terms: number[]`, no change
- `components/cards/game.tsx` — same
- `components/cards/abacus.tsx` — same
