// src/app/types.ts

export type SupportedLanguage = "fr-FR" | "de-DE" | "en-US";

export type BeadColorScheme = "default" | "standard";

export interface CardsConfigState {
  level: number;            // 1-9
  interval: number;         // milliseconds (100-15000, step 250)
  impulses: number;         // 1-6
  rotation: number;
  colorScheme: BeadColorScheme;
}

export interface ScoreState {
  correct: number;
  total: number;
}
