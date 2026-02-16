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
