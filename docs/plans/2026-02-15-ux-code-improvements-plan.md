# Améliorations UX & Code - Plan d'implémentation

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Améliorer l'UX pour enfants <10 ans et nettoyer le code TypeScript d'une app Next.js de jeux éducatifs (Flash Counting + Cards/Abacus).

**Architecture:** Approche progressive - corriger les bugs, refactorer le code, puis améliorer l'UX. Layout responsive (mobile-first pour tablette + desktop). Composants partagés pour réduire la duplication. Langue configurable via localStorage.

**Tech Stack:** Next.js 15.3, React 19, TypeScript 5, Tailwind CSS 4

---

### Task 1: Créer les types TypeScript partagés

**Files:**
- Create: `src/app/types.ts`

**Step 1: Créer le fichier de types**

```typescript
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
```

**Step 2: Vérifier que le build passe**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build`
Expected: Build réussi (les types ne sont pas encore utilisés)

**Step 3: Commit**

```bash
git add src/app/types.ts
git commit -m "feat: add shared TypeScript interfaces for games"
```

---

### Task 2: Créer le composant Config partagé

**Files:**
- Create: `src/app/components/shared-config.tsx`
- Modify: `src/app/counting/page.tsx`
- Modify: `src/app/cards/page.tsx`
- Delete: `src/app/components/counting/config.tsx`
- Delete: `src/app/components/cards/config.tsx`

**Step 1: Créer le composant Config partagé**

```tsx
// src/app/components/shared-config.tsx
import { ConfigProps } from "@/app/types";

export function Config({ config, categories, onChange }: ConfigProps) {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <form>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Configuration
            </h2>

            <div className="mt-4">
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-gray-900"
              >
                Niveau
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="difficulty"
                  name="difficulty"
                  defaultValue={config?.difficulty}
                  onChange={(e) => {
                    onChange({ ...config, difficulty: e.target.value });
                  }}
                  aria-label="Sélectionner le niveau de difficulté"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                  {categories.map((cat) => (
                    <option key={cat.level} value={cat.level}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="interval"
                className="block text-sm font-medium text-gray-900"
              >
                Intervalle (ms)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="interval"
                  id="interval"
                  min={100}
                  max={10000}
                  step={100}
                  onChange={(e) => {
                    const val = Math.max(100, +e.target.value);
                    onChange({ ...config, interval: val });
                  }}
                  defaultValue={config?.interval}
                  aria-label="Intervalle en millisecondes"
                  className="block w-28 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
```

**Step 2: Mettre à jour counting/page.tsx pour utiliser le Config partagé**

Remplacer l'import de Config par:
```tsx
import { Config } from "@/app/components/shared-config";
import { ConfigState } from "@/app/types";
import { FLASH_COUNTING, FLASH_COUNTING_CATS } from "../Data";
```

Et passer `categories={FLASH_COUNTING_CATS}` dans le JSX:
```tsx
<Config
  config={config}
  categories={FLASH_COUNTING_CATS}
  onChange={(state: ConfigState) => setConfig(state)}
/>
```

**Step 3: Mettre à jour cards/page.tsx de la même façon**

Remplacer l'import par:
```tsx
import { Config } from "@/app/components/shared-config";
import { ConfigState } from "@/app/types";
import { CARDS, CARDS_CATS } from "../Data";
```

Et passer `categories={CARDS_CATS}` dans le JSX:
```tsx
<Config
  config={config}
  categories={CARDS_CATS}
  onChange={(state: ConfigState) => setConfig(state)}
/>
```

**Step 4: Mettre à jour les imports dans les composants Game**

Dans `src/app/components/counting/game.tsx`, remplacer:
```tsx
import { ConfigState } from "./config";
```
par:
```tsx
import { ConfigState } from "@/app/types";
```

Dans `src/app/components/cards/game.tsx`, même changement.

**Step 5: Supprimer les anciens fichiers Config**

```bash
rm src/app/components/counting/config.tsx
rm src/app/components/cards/config.tsx
```

**Step 6: Vérifier le build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build`
Expected: Build réussi

**Step 7: Commit**

```bash
git add -A
git commit -m "refactor: unify Config component, add typed props"
```

---

### Task 3: Typer le composant Abacus et corriger les var/any

**Files:**
- Modify: `src/app/components/cards/abacus.tsx`

**Step 1: Remplacer tous les `any` et `var` dans abacus.tsx**

Changements clés:
- `UIElement`: tous les champs en `number` sauf `type` (reste `number`)
- `Bead`: `position: [number, number]`, `value: number`, `active: boolean`, `uniqueID: number`
- `AbacusCtrl`: tous les champs typés, `nodes: Bead[]`
- `Abacus`: `canvas: HTMLCanvasElement | null`, `divId: HTMLElement | null`, `uiElements: UIElement[]`
- Remplacer tous les `var` par `let` ou `const`
- `drawRoundRectFilled` et autres méthodes: `ctx: CanvasRenderingContext2D`
- `useState<any>(null)` → `useState<Abacus | null>(null)`
- Supprimer `/* eslint-disable */` en haut du fichier

**Step 2: Corriger `console.log` → `console.error`**

Ligne 236: `console.log("Abacus error...")` → `console.error("Abacus error...")`

**Step 3: Vérifier le build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build`
Expected: Build réussi

**Step 4: Commit**

```bash
git add src/app/components/cards/abacus.tsx
git commit -m "refactor: type abacus component, replace var with const/let"
```

---

### Task 4: Typer les composants Game (counting + cards)

**Files:**
- Modify: `src/app/components/counting/game.tsx`
- Modify: `src/app/components/cards/game.tsx`

**Step 1: Mettre à jour l'interface Props dans counting/game.tsx**

Remplacer `onPlay: Function` par `onPlay: () => void` dans les deux fichiers game.

**Step 2: Remplacer `props?.onPlay()` par `props.onPlay()` (les props ne sont pas optionnelles)**

**Step 3: Mettre à jour les types dans cards/game.tsx**

Même chose: `onPlay: Function` → `onPlay: () => void`

**Step 4: Ré-activer la règle ESLint `@typescript-eslint/no-explicit-any`**

Dans `eslint.config.mjs`, supprimer la ligne:
```javascript
"@typescript-eslint/no-explicit-any": "off",
```
Et supprimer l'ignore de `abacus.tsx`.

**Step 5: Vérifier le build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build`
Expected: Build réussi

**Step 6: Commit**

```bash
git add -A
git commit -m "refactor: type Game props, re-enable eslint any rule"
```

---

### Task 5: Rendre la navigation mobile fonctionnelle

**Files:**
- Modify: `src/app/layout.tsx` (convertir en client component avec state)
- Modify: `src/app/components/nav.tsx` (accepter callback onNavigate)

**Step 1: Extraire le contenu du layout dans un composant client**

Créer `src/app/components/app-shell.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Nav } from "@/app/components/nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0 text-2xl">🎮</div>
              <div className="hidden md:block">
                <Nav />
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                <span className="absolute -inset-0.5"></span>
                {!mobileMenuOpen ? (
                  <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                ) : (
                  <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3" onClick={() => setMobileMenuOpen(false)}>
              <Nav mobile />
            </div>
          </div>
        )}
      </nav>
      {children}
    </div>
  );
}
```

**Step 2: Mettre à jour Nav pour supporter le mode mobile**

```tsx
// src/app/components/nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  mobile?: boolean;
}

const links = [
  { href: "/", label: "Accueil" },
  { href: "/counting", label: "Flash Counting" },
  { href: "/cards", label: "Cards" },
];

export function Nav({ mobile }: Props) {
  const pathname = usePathname();

  const baseClass = mobile
    ? "block rounded-md px-3 py-2 text-base font-medium"
    : "rounded-md px-3 py-2 text-sm font-medium";

  const activeClass = mobile
    ? "bg-gray-900 text-white"
    : "bg-gray-900 text-white";

  const inactiveClass = mobile
    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
    : "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <div className={mobile ? "" : "ml-10 flex items-baseline space-x-4"}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${baseClass} ${pathname === link.href ? activeClass : inactiveClass}`}
          aria-current={pathname === link.href ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
```

**Step 3: Simplifier layout.tsx pour utiliser AppShell**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/app/components/app-shell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const chakraPetch = Chakra_Petch({ variable: "--font-chakra-petch", weight: "300", style: "normal", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeux Éducatifs",
  description: "Jeux de calcul avec boulier",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
```

**Step 4: Vérifier le build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build`
Expected: Build réussi

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add working mobile navigation with hamburger menu"
```

---

### Task 6: Ajouter la langue configurable

**Files:**
- Create: `src/app/components/language-context.tsx`
- Modify: `src/app/components/app-shell.tsx`
- Modify: `src/app/components/counting/game.tsx`
- Modify: `src/app/components/cards/game.tsx`

**Step 1: Créer le contexte de langue**

```tsx
// src/app/components/language-context.tsx
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
```

**Step 2: Intégrer le LanguageProvider dans AppShell et ajouter le sélecteur dans la navbar**

Wrapper `AppShell` avec `<LanguageProvider>` et ajouter `<LanguageSelector />` dans la navbar, à droite avant le bouton hamburger.

**Step 3: Remplacer le `de-DE` codé en dur dans les deux game.tsx**

```tsx
import { useLanguage } from "@/app/components/language-context";
// dans le composant:
const { language } = useLanguage();
// puis:
u.lang = language; // au lieu de "de-DE"
```

**Step 4: Vérifier le build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build`
Expected: Build réussi

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add configurable language selector (FR/DE/EN)"
```

---

### Task 7: Améliorer l'UX de la page d'accueil pour les enfants

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Step 1: Refaire la page d'accueil avec des cartes colorées et grandes**

```tsx
// src/app/page.tsx
"use client";

import Link from "next/link";

const games = [
  {
    href: "/counting",
    title: "Flash Counting",
    description: "Compte les nombres le plus vite possible !",
    emoji: "🔢",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    href: "/cards",
    title: "Boulier",
    description: "Lis les nombres sur le boulier !",
    emoji: "🧮",
    gradient: "from-orange-400 to-amber-500",
  },
];

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-center text-4xl md:text-5xl font-bold text-indigo-900 mb-2">
          Mes Jeux de Calcul
        </h1>
        <p className="text-center text-lg text-indigo-600 mb-12">
          Choisis un jeu pour commencer !
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {games.map((game) => (
            <Link
              key={game.href}
              href={game.href}
              className={`group block rounded-2xl bg-gradient-to-br ${game.gradient} p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              <div className="text-6xl mb-4">{game.emoji}</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {game.title}
              </h2>
              <p className="text-white/90 text-lg">{game.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
```

**Step 2: Vérifier le build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build`
Expected: Build réussi

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: redesign home page with colorful child-friendly cards"
```

---

### Task 8: Améliorer l'UX des jeux pour les enfants

**Files:**
- Modify: `src/app/components/counting/game.tsx`
- Modify: `src/app/components/cards/game.tsx`
- Modify: `src/app/counting/page.tsx`
- Modify: `src/app/cards/page.tsx`
- Modify: `src/app/globals.css`

**Step 1: Ajouter l'animation CSS Bravo/confettis dans globals.css**

```css
@keyframes bounce-in {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes float-star {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out;
}

.animate-star {
  animation: float-star 1.5s ease-out forwards;
}
```

**Step 2: Améliorer les boutons et feedback dans counting/game.tsx**

Changements clés:
- Bouton "Start a New Game" → "Nouvelle partie !" avec classe plus grande (`text-lg px-8 py-4 rounded-xl`)
- "Pause" / "Play" → icônes + texte plus gros
- "Ready..." → "Prêt..."
- "Replay" → "Rejouer"
- "New Game" → "Nouvelle partie"
- Couleurs plus vives: bg-indigo-600 → bg-green-500 pour le start, bg-orange-500 pour les actions

**Step 3: Améliorer cards/game.tsx**

Changements clés:
- "Wrong answer" → "Essaie encore !" avec couleur orange au lieu de rouge
- "Bravo!" → ajouter la classe `animate-bounce-in` et des étoiles decoratives
- Boutons plus grands
- Input avec placeholder "Ta réponse" au lieu de "Result"
- Textes en français

**Step 4: Rendre le layout des pages responsive (tablette)**

Dans `counting/page.tsx` et `cards/page.tsx`, remplacer:
```tsx
<div className="flex flex-row">
  <div className="basis-1/4 h-full pr-6">
```
par:
```tsx
<div className="flex flex-col md:flex-row gap-6">
  <div className="w-full md:w-1/4">
```

Et la zone de jeu:
```tsx
<div className="w-full md:w-3/4 min-h-[400px] bg-gray-100 rounded-xl">
```

**Step 5: Vérifier le build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build`
Expected: Build réussi

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: child-friendly UX with French labels, bigger buttons, animations"
```

---

### Task 9: Nettoyage final

**Files:**
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`
- Delete: `src/app/columns/page.tsx` (et le dossier `columns/`)
- Modify: `eslint.config.mjs`

**Step 1: Supprimer les fichiers inutilisés**

```bash
rm -f public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
rm -rf src/app/columns
```

**Step 2: Nettoyer la config ESLint**

Supprimer la ligne d'ignore de abacus.tsx et la désactivation de no-explicit-any (si pas déjà fait en Task 4).

**Step 3: Vérifier le build**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build`
Expected: Build réussi sans warnings

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused files, columns stub, clean eslint config"
```

---

### Task 10: Vérification finale et test navigateur

**Step 1: Build complet**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build`
Expected: Build réussi, 0 erreurs

**Step 2: Lancer le serveur dev et tester dans le navigateur**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npm run dev`

Vérifier via MCP localhost:3001:
- Page d'accueil : cartes colorées, responsive
- Navigation mobile : hamburger fonctionne
- Flash Counting : textes en français, boutons gros
- Cards : "Essaie encore !", animation Bravo
- Sélecteur de langue dans la navbar
- Layout responsive sur mobile/tablette
