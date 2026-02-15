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
    "home.title": "Mes Jeux de Calcul",
    "home.subtitle": "Choisis un jeu pour commencer !",
    "home.counting.title": "Flash Counting",
    "home.counting.description": "Compte les nombres le plus vite possible !",
    "home.cards.title": "Boulier",
    "home.cards.description": "Lis les nombres sur le boulier !",
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
    // Games common
    "game.newGame": "Nouvelle partie !",
    "game.newGameShort": "Nouvelle partie",
    "game.replay": "Rejouer 🔄",
    "game.ready": "Prêt...",
    "game.readyVoice": "Prêt",
    // Counting game
    "counting.pause": "Pause ⏸",
    "counting.resume": "Reprendre ▶",
    // Cards game
    "cards.placeholder": "Ta réponse",
    "cards.tryAgain": "Essaie encore !",
    "cards.bravo": "Bravo ! ⭐",
  },
  "de-DE": {
    // Home page
    "home.title": "Meine Rechenspiele",
    "home.subtitle": "Wähle ein Spiel aus!",
    "home.counting.title": "Flash Counting",
    "home.counting.description": "Zähle die Zahlen so schnell wie möglich!",
    "home.cards.title": "Abakus",
    "home.cards.description": "Lies die Zahlen auf dem Abakus!",
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
    // Games common
    "game.newGame": "Neues Spiel!",
    "game.newGameShort": "Neues Spiel",
    "game.replay": "Nochmal 🔄",
    "game.ready": "Bereit...",
    "game.readyVoice": "Bereit",
    // Counting game
    "counting.pause": "Pause ⏸",
    "counting.resume": "Weiter ▶",
    // Cards game
    "cards.placeholder": "Deine Antwort",
    "cards.tryAgain": "Versuch es nochmal!",
    "cards.bravo": "Bravo! ⭐",
  },
  "en-US": {
    // Home page
    "home.title": "My Math Games",
    "home.subtitle": "Pick a game to start!",
    "home.counting.title": "Flash Counting",
    "home.counting.description": "Count the numbers as fast as you can!",
    "home.cards.title": "Abacus",
    "home.cards.description": "Read the numbers on the abacus!",
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
    // Games common
    "game.newGame": "New Game!",
    "game.newGameShort": "New Game",
    "game.replay": "Replay 🔄",
    "game.ready": "Ready...",
    "game.readyVoice": "Ready",
    // Counting game
    "counting.pause": "Pause ⏸",
    "counting.resume": "Resume ▶",
    // Cards game
    "cards.placeholder": "Your answer",
    "cards.tryAgain": "Try again!",
    "cards.bravo": "Bravo! ⭐",
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
      className="rounded-md bg-gray-700 text-white px-2 py-1 text-sm border-none focus:ring-2 focus:ring-white"
    >
      {LANGUAGE_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
