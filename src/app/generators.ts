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
