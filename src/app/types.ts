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
