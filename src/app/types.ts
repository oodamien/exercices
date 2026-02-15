// src/app/types.ts

export interface FlashCountingCategory {
  level: number;
  name: string;
}

export interface FlashCountingItem {
  level: number;
  a: number | string;
  b: number | string;
  c: number | string;
  d: number | string;
  e: number | string;
  f: number | string;
  g: number | string;
  h: number | string;
}

export interface CardCategory {
  level: number;
  name: string;
}

export interface CardItem {
  level: number;
  [key: string]: number | string;
}

export interface ConfigState {
  difficulty: string;
  interval: number;
}

export type SupportedLanguage = "fr-FR" | "de-DE" | "en-US";

export interface GameProps {
  play: boolean;
  terms: number[];
  onPlay: () => void;
  config: ConfigState;
}

export interface ConfigProps {
  config: ConfigState;
  categories: { level: number; name: string }[];
  onChange: (state: ConfigState) => void;
}

export type BeadColorScheme = "default" | "black" | "white";

export interface CardsConfigState {
  difficulty: string;           // "1"-"9" (existing levels)
  interval: number;             // ms (1000-5000, step 1000)
  impulses: number;             // 1-10 (flashes per round)
  rotation: number;             // 0-330 (degrees, step 30)
  colorScheme: BeadColorScheme; // bead color theme
}

export interface ScoreState {
  correct: number;
  total: number;
}

export type CountingOperation = "+" | "-" | "+-";

export interface CountingConfigState {
  difficulty: string;
  interval: number;
  operation: CountingOperation;
  terms: number;
  pauseTime: number;
  fontSize: number;
  lineHeight: number;
  showSeparator: boolean;
  showSymbols: boolean;
}
