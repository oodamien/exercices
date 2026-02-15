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
