"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SupportedLanguage } from "@/app/types";

const LanguageContext = createContext<{
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}>({
  language: "fr-FR",
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>("fr-FR");

  useEffect(() => {
    const saved = localStorage.getItem("language") as SupportedLanguage | null;
    if (saved) setLanguage(saved);
  }, []);

  const handleSetLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

const translations: Record<SupportedLanguage, Record<string, string>> = {
  "fr-FR": {
    // Home page
    "home.title": "StarCalc",
    "home.subtitle": "Explore les maths dans l'espace !",
    "home.counting.title": "Flash Counting",
    "home.counting.description": "Compte les nombres le plus vite possible !",
    "home.cards.title": "Boulier",
    "home.cards.description": "Lis les nombres sur le boulier !",
    "home.counting.cta": "Décoller",
    "home.cards.cta": "Décoller",
    // Nav
    "nav.home": "Accueil",
    "nav.counting": "Flash Counting",
    "nav.cards": "Boulier",
    // Config
    "config.title": "Configuration",
    "config.difficulty": "Niveau",
    "config.interval": "Intervalle (ms)",
    "config.difficultyAria": "Sélectionner le niveau de difficulté",
    "config.intervalAria": "Intervalle en millisecondes",
    // Page titles
    "page.counting.title": "Flash Counting",
    "page.cards.title": "Boulier",
    // Games common
    "game.newGame": "Nouvelle partie !",
    "game.newGameShort": "Nouvelle partie",
    "game.replay": "Rejouer 🔄",
    "game.ready": "Prêt...",
    "game.readyVoice": "Prêt",
    // Counting game
    "counting.pause": "Pause ⏸",
    "counting.resume": "Reprendre ▶",
    "counting.config.terms": "Termes",
    "counting.config.operation": "Opérations",
    "counting.config.pauseTime": "Temps de pause",
    "counting.config.fontSize": "Taille police",
    "counting.config.lineHeight": "Hauteur ligne",
    "counting.config.separator": "Séparateur |",
    "counting.config.symbols": "Symboles #&",
    "counting.config.opPlus": "+",
    "counting.config.opMinus": "−",
    "counting.config.opMixed": "+/−",
    "counting.config.interval": "Intervalle",
    "counting.config.intervalSec": "{val} sec",
    "counting.config.pauseTimeSec": "{val} sec",
    "counting.config.fontSizePx": "{val} px",
    "counting.config.lineHeightPx": "{val} px",
    "counting.config.difficulty": "Niveau",
    "counting.score": "Score",
    "counting.submit": "Valider ✓",
    "counting.anew": "Revoir 👁",
    "counting.tryAgain": "Essaie encore !",
    "counting.placeholder": "Ta réponse",
    "counting.bravo": "Bravo ! ⭐",
    // Cards game
    "cards.placeholder": "Ta réponse",
    "cards.tryAgain": "Essaie encore !",
    "cards.bravo": "Bravo ! ⭐",
    "cards.config.impulses": "Impulsions",
    "cards.config.rotation": "Rotation",
    "cards.config.color": "Couleur",
    "cards.config.color.default": "Défaut",
    "cards.config.color.black": "Noir",
    "cards.config.color.white": "Blanc",
    "cards.config.interval": "Intervalle",
    "cards.config.intervalSec": "{val} sec",
    "cards.config.difficulty": "Niveau",
    "cards.score": "Score",
    "cards.anew": "Revoir 👁",
    "cards.submit": "Valider ✓",
  },
  "de-DE": {
    // Home page
    "home.title": "StarCalc",
    "home.subtitle": "Erkunde Mathe im Weltraum!",
    "home.counting.title": "Flash Counting",
    "home.counting.description": "Zähle die Zahlen so schnell wie möglich!",
    "home.cards.title": "Abakus",
    "home.cards.description": "Lies die Zahlen auf dem Abakus!",
    "home.counting.cta": "Abheben",
    "home.cards.cta": "Abheben",
    // Nav
    "nav.home": "Startseite",
    "nav.counting": "Flash Counting",
    "nav.cards": "Abakus",
    // Config
    "config.title": "Einstellungen",
    "config.difficulty": "Schwierigkeit",
    "config.interval": "Intervall (ms)",
    "config.difficultyAria": "Schwierigkeitsgrad wählen",
    "config.intervalAria": "Intervall in Millisekunden",
    // Page titles
    "page.counting.title": "Flash Counting",
    "page.cards.title": "Abakus",
    // Games common
    "game.newGame": "Neues Spiel!",
    "game.newGameShort": "Neues Spiel",
    "game.replay": "Nochmal 🔄",
    "game.ready": "Bereit...",
    "game.readyVoice": "Bereit",
    // Counting game
    "counting.pause": "Pause ⏸",
    "counting.resume": "Weiter ▶",
    "counting.config.terms": "Terme",
    "counting.config.operation": "Operationen",
    "counting.config.pauseTime": "Pausezeit",
    "counting.config.fontSize": "Schriftgröße",
    "counting.config.lineHeight": "Zeilenhöhe",
    "counting.config.separator": "Trennlinie |",
    "counting.config.symbols": "Symbole #&",
    "counting.config.opPlus": "+",
    "counting.config.opMinus": "−",
    "counting.config.opMixed": "+/−",
    "counting.config.interval": "Intervall",
    "counting.config.intervalSec": "{val} Sek",
    "counting.config.pauseTimeSec": "{val} Sek",
    "counting.config.fontSizePx": "{val} px",
    "counting.config.lineHeightPx": "{val} px",
    "counting.config.difficulty": "Schwierigkeit",
    "counting.score": "Punkte",
    "counting.submit": "Bestätigen ✓",
    "counting.anew": "Nochmal 👁",
    "counting.tryAgain": "Versuch es nochmal!",
    "counting.placeholder": "Deine Antwort",
    "counting.bravo": "Bravo! ⭐",
    // Cards game
    "cards.placeholder": "Deine Antwort",
    "cards.tryAgain": "Versuch es nochmal!",
    "cards.bravo": "Bravo! ⭐",
    "cards.config.impulses": "Impulse",
    "cards.config.rotation": "Drehung",
    "cards.config.color": "Farbe",
    "cards.config.color.default": "Standard",
    "cards.config.color.black": "Schwarz",
    "cards.config.color.white": "Weiß",
    "cards.config.interval": "Intervall",
    "cards.config.intervalSec": "{val} Sek",
    "cards.config.difficulty": "Schwierigkeit",
    "cards.score": "Punkte",
    "cards.anew": "Nochmal 👁",
    "cards.submit": "Bestätigen ✓",
  },
  "en-US": {
    // Home page
    "home.title": "StarCalc",
    "home.subtitle": "Explore math in space!",
    "home.counting.title": "Flash Counting",
    "home.counting.description": "Count the numbers as fast as you can!",
    "home.cards.title": "Abacus",
    "home.cards.description": "Read the numbers on the abacus!",
    "home.counting.cta": "Launch",
    "home.cards.cta": "Launch",
    // Nav
    "nav.home": "Home",
    "nav.counting": "Flash Counting",
    "nav.cards": "Abacus",
    // Config
    "config.title": "Settings",
    "config.difficulty": "Difficulty",
    "config.interval": "Interval (ms)",
    "config.difficultyAria": "Select difficulty level",
    "config.intervalAria": "Interval in milliseconds",
    // Page titles
    "page.counting.title": "Flash Counting",
    "page.cards.title": "Abacus",
    // Games common
    "game.newGame": "New Game!",
    "game.newGameShort": "New Game",
    "game.replay": "Replay 🔄",
    "game.ready": "Ready...",
    "game.readyVoice": "Ready",
    // Counting game
    "counting.pause": "Pause ⏸",
    "counting.resume": "Resume ▶",
    "counting.config.terms": "Terms",
    "counting.config.operation": "Operations",
    "counting.config.pauseTime": "Pause time",
    "counting.config.fontSize": "Font size",
    "counting.config.lineHeight": "Line height",
    "counting.config.separator": "Separator |",
    "counting.config.symbols": "Symbols #&",
    "counting.config.opPlus": "+",
    "counting.config.opMinus": "−",
    "counting.config.opMixed": "+/−",
    "counting.config.interval": "Interval",
    "counting.config.intervalSec": "{val} sec",
    "counting.config.pauseTimeSec": "{val} sec",
    "counting.config.fontSizePx": "{val} px",
    "counting.config.lineHeightPx": "{val} px",
    "counting.config.difficulty": "Difficulty",
    "counting.score": "Score",
    "counting.submit": "Submit ✓",
    "counting.anew": "Replay 👁",
    "counting.tryAgain": "Try again!",
    "counting.placeholder": "Your answer",
    "counting.bravo": "Bravo! ⭐",
    // Cards game
    "cards.placeholder": "Your answer",
    "cards.tryAgain": "Try again!",
    "cards.bravo": "Bravo! ⭐",
    "cards.config.impulses": "Impulses",
    "cards.config.rotation": "Rotation",
    "cards.config.color": "Color",
    "cards.config.color.default": "Default",
    "cards.config.color.black": "Black",
    "cards.config.color.white": "White",
    "cards.config.interval": "Interval",
    "cards.config.intervalSec": "{val} sec",
    "cards.config.difficulty": "Difficulty",
    "cards.score": "Score",
    "cards.anew": "Replay 👁",
    "cards.submit": "Submit ✓",
  },
};

export function useTranslation() {
  const { language } = useLanguage();
  return (key: string): string => {
    return translations[language]?.[key] ?? key;
  };
}

const LANGUAGE_OPTIONS: { value: SupportedLanguage; label: string }[] = [
  { value: "fr-FR", label: "FR" },
  { value: "de-DE", label: "DE" },
  { value: "en-US", label: "EN" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
      aria-label="Choisir la langue"
      className="rounded-lg bg-sc-bg-tertiary text-sc-text px-3 py-1.5 text-sm border border-sc-cyan/20 focus:ring-2 focus:ring-sc-cyan/50 focus:outline-none cursor-pointer"
    >
      {LANGUAGE_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
