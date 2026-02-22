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
    "home.cards.title": "Boulier",
    "home.cards.description": "Lis les nombres sur le boulier !",
    "home.cards.cta": "Décoller",
    // Nav
    "nav.home": "Accueil",
    "nav.cards": "Boulier",
    // Config
    "config.title": "Configuration",
    "config.difficulty": "Niveau",
    "config.interval": "Intervalle (ms)",
    "config.difficultyAria": "Sélectionner le niveau de difficulté",
    "config.intervalAria": "Intervalle en millisecondes",
    // Page titles
    "page.cards.title": "Boulier",
    // Games common
    "game.newGame": "Nouvelle partie !",
    "game.newGameShort": "Nouvelle partie",
    "game.replay": "Rejouer 🔄",
    "game.ready": "Prêt...",
    "game.readyVoice": "Prêt",
    // Cards game
    "cards.placeholder": "Ta réponse",
    "cards.tryAgain": "Essaie encore !",
    "cards.bravo": "Bravo ! ⭐",
    "cards.config.impulses": "Impulsions",
    "cards.config.rotation": "Rotation",
    "cards.config.color": "Couleur",
    "cards.config.color.default": "Défaut",
    "cards.config.color.standard": "Standard",
    "cards.config.interval": "Intervalle",
    "cards.config.intervalSec": "{val} sec",
    "cards.config.difficulty": "Niveau",
    "cards.config.level.1": "Level 1: 0-9",
    "cards.config.level.2": "Level 2: 10-19",
    "cards.config.level.3": "Level 3: 0-19",
    "cards.config.level.4": "Level 4: dizaines",
    "cards.config.level.5": "Level 5: 0-99",
    "cards.config.level.6": "Level 6: 0-999",
    "cards.config.level.7": "Level 7: 0-9999",
    "cards.config.level.8": "Level 8: 0-99999",
    "cards.config.level.9": "Level 9: 0-999999",
    "cards.answerProgress": "Nombre {current}/{total}",
    "cards.score": "Score",
    "cards.anew": "Revoir 👁",
    "cards.submit": "Valider ✓",
    "cards.success": "Bravo !",
    "cards.next": "Suivant ▶",
  },
  "de-DE": {
    // Home page
    "home.title": "StarCalc",
    "home.subtitle": "Erkunde Mathe im Weltraum!",
    "home.cards.title": "Abakus",
    "home.cards.description": "Lies die Zahlen auf dem Abakus!",
    "home.cards.cta": "Abheben",
    // Nav
    "nav.home": "Startseite",
    "nav.cards": "Abakus",
    // Config
    "config.title": "Einstellungen",
    "config.difficulty": "Schwierigkeit",
    "config.interval": "Intervall (ms)",
    "config.difficultyAria": "Schwierigkeitsgrad wählen",
    "config.intervalAria": "Intervall in Millisekunden",
    // Page titles
    "page.cards.title": "Abakus",
    // Games common
    "game.newGame": "Neues Spiel!",
    "game.newGameShort": "Neues Spiel",
    "game.replay": "Nochmal 🔄",
    "game.ready": "Bereit...",
    "game.readyVoice": "Bereit",
    // Cards game
    "cards.placeholder": "Deine Antwort",
    "cards.tryAgain": "Versuch es nochmal!",
    "cards.bravo": "Bravo! ⭐",
    "cards.config.impulses": "Impulse",
    "cards.config.rotation": "Drehung",
    "cards.config.color": "Farbe",
    "cards.config.color.default": "Standard",
    "cards.config.color.standard": "Standard",
    "cards.config.interval": "Intervall",
    "cards.config.intervalSec": "{val} Sek",
    "cards.config.difficulty": "Stufe",
    "cards.config.level.1": "Level 1: 0-9",
    "cards.config.level.2": "Level 2: 10-19",
    "cards.config.level.3": "Level 3: 0-19",
    "cards.config.level.4": "Level 4: Zehner",
    "cards.config.level.5": "Level 5: 0-99",
    "cards.config.level.6": "Level 6: 0-999",
    "cards.config.level.7": "Level 7: 0-9999",
    "cards.config.level.8": "Level 8: 0-99999",
    "cards.config.level.9": "Level 9: 0-999999",
    "cards.answerProgress": "Zahl {current}/{total}",
    "cards.score": "Punkte",
    "cards.anew": "Nochmal 👁",
    "cards.submit": "Bestätigen ✓",
    "cards.success": "Bravo!",
    "cards.next": "Weiter ▶",
  },
  "en-US": {
    // Home page
    "home.title": "StarCalc",
    "home.subtitle": "Explore math in space!",
    "home.cards.title": "Abacus",
    "home.cards.description": "Read the numbers on the abacus!",
    "home.cards.cta": "Launch",
    // Nav
    "nav.home": "Home",
    "nav.cards": "Abacus",
    // Config
    "config.title": "Settings",
    "config.difficulty": "Difficulty",
    "config.interval": "Interval (ms)",
    "config.difficultyAria": "Select difficulty level",
    "config.intervalAria": "Interval in milliseconds",
    // Page titles
    "page.cards.title": "Abacus",
    // Games common
    "game.newGame": "New Game!",
    "game.newGameShort": "New Game",
    "game.replay": "Replay 🔄",
    "game.ready": "Ready...",
    "game.readyVoice": "Ready",
    // Cards game
    "cards.placeholder": "Your answer",
    "cards.tryAgain": "Try again!",
    "cards.bravo": "Bravo! ⭐",
    "cards.config.impulses": "Impulses",
    "cards.config.rotation": "Rotation",
    "cards.config.color": "Color",
    "cards.config.color.default": "Default",
    "cards.config.color.standard": "Standard",
    "cards.config.interval": "Interval",
    "cards.config.intervalSec": "{val} sec",
    "cards.config.difficulty": "Level",
    "cards.config.level.1": "Level 1: 0-9",
    "cards.config.level.2": "Level 2: 10-19",
    "cards.config.level.3": "Level 3: 0-19",
    "cards.config.level.4": "Level 4: tens",
    "cards.config.level.5": "Level 5: 0-99",
    "cards.config.level.6": "Level 6: 0-999",
    "cards.config.level.7": "Level 7: 0-9999",
    "cards.config.level.8": "Level 8: 0-99999",
    "cards.config.level.9": "Level 9: 0-999999",
    "cards.answerProgress": "Number {current}/{total}",
    "cards.score": "Score",
    "cards.anew": "Replay 👁",
    "cards.submit": "Submit ✓",
    "cards.success": "Well done!",
    "cards.next": "Next ▶",
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
