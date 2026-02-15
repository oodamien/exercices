# StarCalc Deep Space — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the entire "Jeux Éducatifs" app into "StarCalc" with a Deep Space theme — dark starry background, neon accents, astronaut mascot, planet-themed game cards, and space-themed UI components.

**Architecture:** Pure CSS/Tailwind redesign of existing components. No new pages or routing changes. Add Google Fonts (Fredoka, Nunito), SVG illustrations inline, CSS animations (twinkle, float, glow, shake), and retheme all Tailwind classes from the current gray/indigo/white scheme to the Deep Space palette. The i18n system gets updated translation keys for the new branding.

**Tech Stack:** Next.js 15.3, React 19, Tailwind CSS 4, Google Fonts (Fredoka, Nunito, Chakra Petch), inline SVG illustrations.

**Design doc:** `docs/plans/2026-02-15-starcalc-deep-space-design.md`

---

### Task 1: CSS Foundation — globals.css + Color Variables + Animations

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Rewrite globals.css with Deep Space theme**

Replace the entire `globals.css` with the Deep Space color scheme, new CSS custom properties, and all required animations:

```css
@import "tailwindcss";

:root {
  /* Deep Space palette */
  --sc-bg-primary: #0B1026;
  --sc-bg-secondary: #1A2744;
  --sc-bg-tertiary: #243B63;
  --sc-accent-gold: #FFD700;
  --sc-accent-cyan: #00D4FF;
  --sc-accent-orange: #FF8C42;
  --sc-accent-green: #22D17B;
  --sc-accent-red: #FF5A5A;
  --sc-text-primary: #E8EDF5;
  --sc-text-secondary: #8B9EC7;

  --background: var(--sc-bg-primary);
  --foreground: var(--sc-text-primary);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-nunito);
  --font-mono: var(--font-geist-mono);

  /* Custom colors for Tailwind */
  --color-sc-bg-primary: #0B1026;
  --color-sc-bg-secondary: #1A2744;
  --color-sc-bg-tertiary: #243B63;
  --color-sc-gold: #FFD700;
  --color-sc-cyan: #00D4FF;
  --color-sc-orange: #FF8C42;
  --color-sc-green: #22D17B;
  --color-sc-red: #FF5A5A;
  --color-sc-text: #E8EDF5;
  --color-sc-text-dim: #8B9EC7;
}

body {
  background: var(--sc-bg-primary);
  color: var(--sc-text-primary);
  font-family: var(--font-nunito), Arial, Helvetica, sans-serif;
}

/* Starfield background */
.starfield {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.starfield::before,
.starfield::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1.5px 1.5px at 50% 40%, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 70% 15%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1.5px 1.5px at 85% 60%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 60% 90%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1.5px 1.5px at 90% 35%, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 40% 50%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1px 1px at 5% 50%, rgba(255,255,255,0.7), transparent);
  background-size: 100% 100%;
  animation: twinkle 4s ease-in-out infinite alternate;
}

.starfield::after {
  background-image:
    radial-gradient(1px 1px at 25% 35%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1.5px 1.5px at 55% 25%, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 75% 80%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1px 1px at 45% 65%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1.5px 1.5px at 95% 10%, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 20% 55%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 65% 5%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1.5px 1.5px at 35% 95%, rgba(255,255,255,0.7), transparent);
  animation: twinkle 5s ease-in-out 1s infinite alternate;
}

/* Nebula background for game areas */
.nebula-bg {
  background:
    radial-gradient(ellipse at 30% 50%, rgba(26, 39, 68, 0.8) 0%, transparent 70%),
    radial-gradient(ellipse at 70% 30%, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(138, 43, 226, 0.05) 0%, transparent 50%),
    var(--sc-bg-secondary);
  border: 1px solid rgba(0, 212, 255, 0.15);
}

/* Media controls (keep existing) */
.media .toolbar { display: none; }
.media.paused .toolbar,
.media:hover .toolbar { display: block; }

.border-top-double { border: 4px double #888; }

/* ========== ANIMATIONS ========== */

@keyframes twinkle {
  0% { opacity: 0.4; }
  100% { opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.2); }
}

@keyframes planet-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

@keyframes star-burst {
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
}

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

@keyframes neon-text-glow {
  0%, 100% { text-shadow: 0 0 5px currentColor, 0 0 10px currentColor; }
  50% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor; }
}

.animate-float { animation: float 3s ease-in-out infinite; }
.animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
.animate-planet-pulse { animation: planet-pulse 2s ease-in-out infinite; }
.animate-shake { animation: shake 0.5s ease-in-out; }
.animate-star-burst { animation: star-burst 0.8s ease-out forwards; }
.animate-bounce-in { animation: bounce-in 0.6s ease-out; }
.animate-star { animation: float-star 1.5s ease-out forwards; }
.animate-neon-glow { animation: neon-text-glow 2s ease-in-out infinite; }

/* Glow effects */
.glow-cyan { box-shadow: 0 0 10px rgba(0, 212, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.1); }
.glow-gold { box-shadow: 0 0 10px rgba(255, 215, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.1); }
.glow-green { box-shadow: 0 0 10px rgba(34, 209, 123, 0.3), 0 0 20px rgba(34, 209, 123, 0.1); }
.glow-orange { box-shadow: 0 0 10px rgba(255, 140, 66, 0.3), 0 0 20px rgba(255, 140, 66, 0.1); }

.text-glow-cyan { text-shadow: 0 0 10px rgba(0, 212, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.2); }
.text-glow-gold { text-shadow: 0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.2); }
.text-glow-green { text-shadow: 0 0 10px rgba(34, 209, 123, 0.5), 0 0 20px rgba(34, 209, 123, 0.2); }
```

**Step 2: Verify build compiles**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds (CSS only change)

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add Deep Space theme CSS variables, animations, and starfield"
```

---

### Task 2: Fonts — layout.tsx + Metadata Update

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update layout.tsx**

Replace Geist Sans with Nunito, add Fredoka, keep Chakra Petch, update metadata:

```tsx
import type { Metadata } from "next";
import { Nunito, Chakra_Petch, Fredoka, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/app/components/app-shell";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const chakraPetch = Chakra_Petch({ variable: "--font-chakra-petch", weight: "300", style: "normal", subsets: ["latin"] });
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StarCalc",
  description: "Explore les maths dans l'espace !",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${nunito.variable} ${geistMono.variable} ${chakraPetch.variable} ${fredoka.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
```

**Step 2: Verify build compiles**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "style: add Fredoka + Nunito fonts, rename app to StarCalc"
```

---

### Task 3: SVG Illustrations — Astronaut, Planets, Rocket, Stars

**Files:**
- Create: `src/app/components/icons/astronaut.tsx`
- Create: `src/app/components/icons/planet-counting.tsx`
- Create: `src/app/components/icons/planet-abacus.tsx`
- Create: `src/app/components/icons/rocket.tsx`
- Create: `src/app/components/icons/star-icon.tsx`

**Step 1: Create astronaut mascot SVG component**

File `src/app/components/icons/astronaut.tsx`:

```tsx
export function Astronaut({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Helmet */}
      <circle cx="100" cy="75" r="45" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="3" />
      <circle cx="100" cy="75" r="38" fill="#1A2744" />
      {/* Visor reflection */}
      <ellipse cx="88" cy="68" rx="12" ry="8" fill="rgba(0,212,255,0.3)" transform="rotate(-15 88 68)" />
      {/* Face behind visor */}
      <circle cx="92" cy="72" r="3" fill="#FFD700" /> {/* Left eye */}
      <circle cx="108" cy="72" r="3" fill="#FFD700" /> {/* Right eye */}
      <path d="M 94 82 Q 100 88 106 82" stroke="#FFD700" strokeWidth="2" fill="none" strokeLinecap="round" /> {/* Smile */}
      {/* Body */}
      <rect x="75" y="115" width="50" height="45" rx="12" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
      {/* Chest panel */}
      <rect x="88" y="122" width="24" height="14" rx="3" fill="#1A2744" />
      <circle cx="96" cy="129" r="2" fill="#22D17B" />
      <circle cx="104" cy="129" r="2" fill="#FF5A5A" />
      {/* Arms */}
      <rect x="55" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
      <rect x="123" y="120" width="22" height="12" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
      {/* Gloves */}
      <circle cx="52" cy="126" r="7" fill="#FFD700" />
      <circle cx="148" cy="126" r="7" fill="#FFD700" />
      {/* Legs */}
      <rect x="80" y="155" width="15" height="25" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
      <rect x="105" y="155" width="15" height="25" rx="6" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="2" />
      {/* Boots */}
      <rect x="76" y="175" width="22" height="10" rx="5" fill="#FF8C42" />
      <rect x="102" y="175" width="22" height="10" rx="5" fill="#FF8C42" />
      {/* Antenna */}
      <line x1="100" y1="30" x2="100" y2="15" stroke="#8B9EC7" strokeWidth="2" />
      <circle cx="100" cy="12" r="4" fill="#FFD700" />
      {/* Backpack */}
      <rect x="68" y="118" width="10" height="30" rx="4" fill="#8B9EC7" />
    </svg>
  );
}
```

**Step 2: Create planet-counting SVG component (cyan planet with lightning)**

File `src/app/components/icons/planet-counting.tsx`:

```tsx
export function PlanetCounting({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Planet body */}
      <circle cx="80" cy="80" r="55" fill="url(#countingGrad)" />
      <defs>
        <radialGradient id="countingGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#0B1026" />
        </radialGradient>
      </defs>
      {/* Surface lines */}
      <ellipse cx="80" cy="65" rx="40" ry="4" fill="rgba(255,255,255,0.1)" />
      <ellipse cx="80" cy="90" rx="35" ry="3" fill="rgba(255,255,255,0.08)" />
      {/* Lightning bolt */}
      <polygon points="95,30 82,70 95,70 78,110 92,70 80,70" fill="#FFD700" opacity="0.9" />
      {/* Numbers orbiting */}
      <text x="130" y="50" fill="#00D4FF" fontSize="16" fontWeight="bold" opacity="0.7">7</text>
      <text x="25" y="110" fill="#FFD700" fontSize="14" fontWeight="bold" opacity="0.6">3</text>
      <text x="120" y="120" fill="#E8EDF5" fontSize="12" fontWeight="bold" opacity="0.5">+</text>
    </svg>
  );
}
```

**Step 3: Create planet-abacus SVG component (orange Saturn-like planet)**

File `src/app/components/icons/planet-abacus.tsx`:

```tsx
export function PlanetAbacus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="abacusGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#FF8C42" />
          <stop offset="100%" stopColor="#4A1A00" />
        </radialGradient>
      </defs>
      {/* Ring (behind) */}
      <ellipse cx="80" cy="80" rx="75" ry="18" fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.4" transform="rotate(-20 80 80)" />
      {/* Planet body */}
      <circle cx="80" cy="80" r="45" fill="url(#abacusGrad)" />
      {/* Surface bands */}
      <ellipse cx="80" cy="70" rx="38" ry="4" fill="rgba(255,255,255,0.1)" />
      <ellipse cx="80" cy="85" rx="35" ry="3" fill="rgba(255,255,255,0.08)" />
      {/* Ring (front) */}
      <path d="M 20 72 Q 80 100 140 72" fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.6" />
      {/* Beads on ring */}
      <circle cx="45" cy="82" r="5" fill="#FFD700" opacity="0.8" />
      <circle cx="65" cy="87" r="5" fill="#FF8C42" opacity="0.8" />
      <circle cx="95" cy="87" r="5" fill="#FFD700" opacity="0.8" />
      <circle cx="115" cy="82" r="5" fill="#FF8C42" opacity="0.8" />
    </svg>
  );
}
```

**Step 4: Create rocket SVG component**

File `src/app/components/icons/rocket.tsx`:

```tsx
export function Rocket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Flame */}
      <ellipse cx="16" cy="28" rx="4" ry="4" fill="#FF8C42" opacity="0.8" />
      <ellipse cx="16" cy="27" rx="2.5" ry="3" fill="#FFD700" />
      {/* Body */}
      <path d="M 12 24 L 12 12 Q 16 2 20 12 L 20 24 Z" fill="#E8EDF5" stroke="#8B9EC7" strokeWidth="1" />
      {/* Window */}
      <circle cx="16" cy="14" r="3" fill="#00D4FF" />
      <circle cx="15" cy="13" r="1" fill="rgba(255,255,255,0.5)" />
      {/* Fins */}
      <path d="M 12 22 L 7 26 L 12 24 Z" fill="#FF5A5A" />
      <path d="M 20 22 L 25 26 L 20 24 Z" fill="#FF5A5A" />
      {/* Nose */}
      <circle cx="16" cy="8" r="1.5" fill="#FFD700" />
    </svg>
  );
}
```

**Step 5: Create star icon SVG component**

File `src/app/components/icons/star-icon.tsx`:

```tsx
export function StarIcon({ filled = true, className = "" }: { filled?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={filled ? "#FFD700" : "none"}
        stroke="#FFD700"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

**Step 6: Verify build compiles**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 7: Commit**

```bash
git add src/app/components/icons/
git commit -m "feat: add SVG space illustrations (astronaut, planets, rocket, star)"
```

---

### Task 4: AppShell + Nav — Deep Space Theme

**Files:**
- Modify: `src/app/components/app-shell.tsx`
- Modify: `src/app/components/nav.tsx`
- Modify: `src/app/components/language-context.tsx` (LanguageSelector only + new i18n keys)

**Step 1: Rewrite app-shell.tsx with starfield and new nav**

```tsx
"use client";

import { useState } from "react";
import { Nav } from "@/app/components/nav";
import { LanguageProvider, LanguageSelector } from "@/app/components/language-context";
import { Rocket } from "@/app/components/icons/rocket";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen relative">
        {/* Starfield background */}
        <div className="starfield" />

        {/* Nav */}
        <nav className="relative z-10 border-b border-sc-cyan/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <a href="/" className="flex items-center gap-2 group">
                  <Rocket className="w-7 h-7 group-hover:animate-float" />
                  <span className="font-[family-name:var(--font-fredoka)] text-xl font-bold text-sc-gold text-glow-gold">
                    StarCalc
                  </span>
                </a>
                <div className="hidden md:block">
                  <Nav />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LanguageSelector />
                <div className="flex md:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="relative inline-flex items-center justify-center rounded-lg p-2 text-sc-text-dim hover:text-sc-cyan hover:bg-sc-bg-tertiary/50 transition-colors"
                    aria-controls="mobile-menu"
                    aria-expanded={mobileMenuOpen}
                    aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                  >
                    {!mobileMenuOpen ? (
                      <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    ) : (
                      <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-sc-cyan/10 bg-sc-bg-primary/95 backdrop-blur-sm" id="mobile-menu">
              <div className="space-y-1 px-4 pt-3 pb-4" onClick={() => setMobileMenuOpen(false)}>
                <Nav mobile />
              </div>
            </div>
          )}
        </nav>

        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </LanguageProvider>
  );
}
```

**Step 2: Rewrite nav.tsx with space theme**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/components/language-context";

interface Props {
  mobile?: boolean;
}

export function Nav({ mobile }: Props) {
  const pathname = usePathname();
  const t = useTranslation();

  const links = [
    { href: "/", label: t("nav.home"), icon: "🏠" },
    { href: "/counting", label: t("nav.counting"), icon: "⚡" },
    { href: "/cards", label: t("nav.cards"), icon: "🪐" },
  ];

  const baseClass = mobile
    ? "flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium transition-all"
    : "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all";

  const activeClass = "bg-sc-bg-tertiary text-sc-gold glow-gold";
  const inactiveClass = "text-sc-text-dim hover:text-sc-text hover:bg-sc-bg-tertiary/50";

  return (
    <div className={mobile ? "" : "ml-8 flex items-baseline space-x-2"}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${baseClass} ${pathname === link.href ? activeClass : inactiveClass}`}
          aria-current={pathname === link.href ? "page" : undefined}
        >
          <span className="text-base">{link.icon}</span>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
```

**Step 3: Update LanguageSelector in language-context.tsx**

Only change the `LanguageSelector` component styling and add new i18n keys. Replace the LanguageSelector function:

```tsx
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
```

Also update i18n keys (in the translations object) — add for all three languages:
- `"home.title"` → "StarCalc" (all langs)
- `"home.subtitle"` → FR: "Explore les maths dans l'espace !", DE: "Erkunde Mathe im Weltraum!", EN: "Explore math in space!"
- `"home.counting.cta"` → FR: "Décoller", DE: "Abheben", EN: "Launch"
- `"home.cards.cta"` → FR: "Décoller", DE: "Abheben", EN: "Launch"

**Step 4: Verify build compiles**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/app/components/app-shell.tsx src/app/components/nav.tsx src/app/components/language-context.tsx
git commit -m "style: retheme AppShell, Nav, LanguageSelector with Deep Space design"
```

---

### Task 5: Home Page — Astronaut, Planets, Space Cards

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Rewrite home page with space theme**

```tsx
"use client";

import Link from "next/link";
import { useTranslation } from "@/app/components/language-context";
import { Astronaut } from "@/app/components/icons/astronaut";
import { PlanetCounting } from "@/app/components/icons/planet-counting";
import { PlanetAbacus } from "@/app/components/icons/planet-abacus";
import { Rocket } from "@/app/components/icons/rocket";

export default function Home() {
  const t = useTranslation();

  const games = [
    {
      href: "/counting",
      title: t("home.counting.title"),
      description: t("home.counting.description"),
      cta: t("home.counting.cta"),
      Planet: PlanetCounting,
      glowClass: "glow-cyan",
      borderClass: "border-sc-cyan/20 hover:border-sc-cyan/40",
    },
    {
      href: "/cards",
      title: t("home.cards.title"),
      description: t("home.cards.description"),
      cta: t("home.cards.cta"),
      Planet: PlanetAbacus,
      glowClass: "glow-orange",
      borderClass: "border-sc-orange/20 hover:border-sc-orange/40",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="animate-float inline-block mb-6">
            <Astronaut className="w-32 h-32 mx-auto" />
          </div>
          <h1 className="font-[family-name:var(--font-fredoka)] text-5xl md:text-6xl font-bold text-sc-gold text-glow-gold mb-3">
            {t("home.title")}
          </h1>
          <p className="text-lg text-sc-text-dim font-[family-name:var(--font-nunito)]">
            {t("home.subtitle")}
          </p>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {games.map((game) => (
            <Link
              key={game.href}
              href={game.href}
              className={`group block rounded-2xl bg-sc-bg-secondary p-8 border ${game.borderClass} hover:scale-[1.03] transition-all duration-300 ${game.glowClass}`}
            >
              <div className="flex justify-center mb-6">
                <game.Planet className="w-28 h-28 group-hover:animate-planet-pulse" />
              </div>
              <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-bold text-sc-text text-center mb-2">
                {game.title}
              </h2>
              <p className="text-sc-text-dim text-center mb-6">
                {game.description}
              </p>
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 bg-sc-gold text-sc-bg-primary font-bold px-6 py-2.5 rounded-xl group-hover:animate-glow-pulse transition-all">
                  <Rocket className="w-5 h-5" />
                  {game.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
```

**Step 2: Verify build compiles**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "style: redesign home page with astronaut, planets, and space cards"
```

---

### Task 6: Counting Page + Config — Space Theme

**Files:**
- Modify: `src/app/counting/page.tsx`
- Modify: `src/app/components/counting/counting-config.tsx`

**Step 1: Retheme counting/page.tsx**

Replace the header and layout classes:

```tsx
// In counting/page.tsx, change the return JSX to:
return (
  <>
    <header className="border-b border-sc-cyan/10">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="font-[family-name:var(--font-fredoka)] text-3xl font-bold text-sc-cyan text-glow-cyan">
          ⚡ {t("page.counting.title")}
        </h1>
      </div>
    </header>
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <CountingConfig
            config={config}
            categories={FLASH_COUNTING_CATS}
            onChange={(state: CountingConfigState) => {
              setConfig(state);
            }}
          />
        </div>
        <div className="w-full md:w-3/4 min-h-[400px] nebula-bg rounded-2xl">
          <Game
            play={play}
            terms={terms}
            onPlay={() => {
              setTerms(generateGame(config));
              setScore({ correct: 0, total: 0 });
              setPlay(true);
            }}
            config={config}
            score={score}
            onScoreUpdate={setScore}
          />
        </div>
      </div>
    </div>
  </>
);
```

**Step 2: Retheme counting-config.tsx**

Retheme all classes in the component. Key changes:
- Config panel: `bg-sc-bg-secondary rounded-2xl p-5 border border-sc-cyan/10`
- Title: `text-lg font-[family-name:var(--font-fredoka)] text-sc-text`
- Labels: `text-sm font-medium text-sc-text-dim`
- Select: `bg-sc-bg-tertiary text-sc-text border-sc-cyan/20 focus:outline-sc-cyan`
- Stepper buttons: `rounded-full bg-sc-bg-tertiary text-sc-cyan hover:bg-sc-cyan/20 border border-sc-cyan/20` (replace `<` and `>` with `◀` and `▶`)
- Stepper value: `text-sc-text`
- Toggle active: `bg-sc-gold text-sc-bg-primary`
- Toggle inactive: `bg-sc-bg-tertiary text-sc-text-dim hover:bg-sc-bg-tertiary/80 border border-sc-cyan/10`

Full replacement of the `Stepper` component:

```tsx
function Stepper({
  value, min, max, step, format, onChange, ariaLabel,
}: {
  value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void; ariaLabel: string;
}) {
  const decrement = () => onChange(Math.max(min, +(value - step).toFixed(4)));
  const increment = () => onChange(Math.min(max, +(value + step).toFixed(4)));

  return (
    <div className="flex items-center gap-2" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        onClick={decrement}
        className="w-8 h-8 rounded-full bg-sc-bg-tertiary text-sc-cyan hover:bg-sc-cyan/20 border border-sc-cyan/20 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
        aria-label={`${ariaLabel} decrease`}
      >
        ◀
      </button>
      <span className="min-w-[70px] text-center font-mono text-sm text-sc-text">
        {format(value)}
      </span>
      <button
        type="button"
        onClick={increment}
        className="w-8 h-8 rounded-full bg-sc-bg-tertiary text-sc-cyan hover:bg-sc-cyan/20 border border-sc-cyan/20 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
        aria-label={`${ariaLabel} increase`}
      >
        ▶
      </button>
    </div>
  );
}
```

Config wrapper:

```tsx
<div className="bg-sc-bg-secondary rounded-2xl p-5 border border-sc-cyan/10">
  <form>
    <div className="space-y-4">
      <h2 className="text-lg font-[family-name:var(--font-fredoka)] text-sc-text flex items-center gap-2">
        📡 {t("config.title")}
      </h2>
      {/* ... same structure, rethemed labels and inputs ... */}
```

All labels become `text-sm font-medium text-sc-text-dim`. All toggle buttons:

```tsx
className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
  isActive
    ? "bg-sc-gold text-sc-bg-primary"
    : "bg-sc-bg-tertiary text-sc-text-dim hover:text-sc-text border border-sc-cyan/10"
}`}
```

Select dropdown:

```tsx
className="col-start-1 row-start-1 w-full appearance-none rounded-lg bg-sc-bg-tertiary py-2 pr-8 pl-3 text-base text-sc-text border border-sc-cyan/20 focus:outline-2 focus:outline-sc-cyan"
```

**Step 3: Verify build compiles**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/counting/page.tsx src/app/components/counting/counting-config.tsx
git commit -m "style: retheme Counting page and config with Deep Space design"
```

---

### Task 7: Cards Page + Config — Space Theme

**Files:**
- Modify: `src/app/cards/page.tsx`
- Modify: `src/app/components/cards/cards-config.tsx`

**Step 1: Retheme cards/page.tsx**

Same pattern as counting page but with orange accent:

```tsx
return (
  <>
    <header className="border-b border-sc-orange/10">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="font-[family-name:var(--font-fredoka)] text-3xl font-bold text-sc-orange text-glow-gold">
          🪐 {t("page.cards.title")}
        </h1>
      </div>
    </header>
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <CardsConfig
            config={config}
            categories={CARDS_CATS}
            onChange={(state: CardsConfigState) => {
              setConfig(state);
            }}
          />
        </div>
        <div className="w-full md:w-3/4 min-h-[400px] nebula-bg rounded-2xl">
          <Game ... />
        </div>
      </div>
    </div>
  </>
);
```

**Step 2: Retheme cards-config.tsx**

Same pattern as counting-config:
- Panel: `bg-sc-bg-secondary rounded-2xl p-5 border border-sc-orange/10`
- Title: `text-lg font-[family-name:var(--font-fredoka)] text-sc-text`
- Labels: `text-sm font-medium text-sc-text-dim`
- Steppers: same circular buttons with orange accent (`text-sc-orange`, `border-sc-orange/20`)
- Toggles active: `bg-sc-gold text-sc-bg-primary`
- Select: `bg-sc-bg-tertiary text-sc-text border-sc-orange/20`

The Stepper component is duplicated in cards-config (same code). Apply the same retheme:

```tsx
className="w-8 h-8 rounded-full bg-sc-bg-tertiary text-sc-orange hover:bg-sc-orange/20 border border-sc-orange/20 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
```

**Step 3: Verify build compiles**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/cards/page.tsx src/app/components/cards/cards-config.tsx
git commit -m "style: retheme Cards page and config with Deep Space design"
```

---

### Task 8: Game Components — Counting + Cards

**Files:**
- Modify: `src/app/components/counting/game.tsx`
- Modify: `src/app/components/cards/game.tsx`

**Step 1: Retheme counting/game.tsx**

Key class replacements:
- Game container: `bg-gray-100` → remove (it's inside `nebula-bg` parent)
- Score overlay: `bg-white/80 text-gray-700` → `bg-sc-bg-tertiary/80 text-sc-text border border-sc-cyan/20`
- "New Game" button: `bg-green-500 text-white` → `bg-sc-gold text-sc-bg-primary hover:animate-glow-pulse`
- Pause/Resume buttons: `bg-orange-500` → `bg-sc-bg-tertiary border border-sc-orange/20 text-sc-orange hover:bg-sc-orange/20`
- Ready text: add `text-sc-cyan text-glow-cyan`
- Flash number display: add `text-sc-text text-glow-cyan`
- Pause overlay: `text-gray-400` → `text-sc-text-dim`
- Input: `bg-white text-gray-900 outline-gray-300 focus:outline-indigo-600` → `bg-sc-bg-tertiary text-sc-text border border-sc-cyan/20 placeholder:text-sc-text-dim/50 focus:outline-sc-cyan focus:border-sc-cyan`
- Error text: `text-orange-500` → `text-sc-red animate-shake`
- Submit button: `bg-green-500` → `bg-sc-green text-white glow-green`
- Anew button: `bg-blue-500` → `bg-sc-cyan/20 text-sc-cyan border border-sc-cyan/20`
- Bravo text: keep bounce-in, add `text-sc-gold text-glow-gold`
- Score display in complete: `text-sc-text`
- Terms display: `text-gray-500` → `text-sc-text-dim`
- Replay button: `bg-orange-500` → `bg-sc-orange/20 text-sc-orange border border-sc-orange/20`

**Step 2: Retheme cards/game.tsx**

Same replacements as counting game. The container class changes:
- Game container: remove `bg-gray-100`
- Score overlay: same space theme
- All buttons: same space theme
- Input: same space theme
- Bravo: same space theme

**Step 3: Verify build compiles**

Run: `cd /Users/vitracdamien/Documents/GitHub/exercices && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 4: Visual test in browser**

Run: `PORT=3001 npx next dev --turbopack`
Check: Home page, both game pages, config panels, play through a game. Verify colors, fonts, animations, responsive layout.

**Step 5: Commit**

```bash
git add src/app/components/counting/game.tsx src/app/components/cards/game.tsx
git commit -m "style: retheme both game components with Deep Space design"
```

---

### Task 9: Final Polish — favicon, review, cleanup

**Files:**
- Possibly modify: `src/app/favicon.ico` or add `src/app/icon.svg`
- Review all files for any remaining gray/indigo/white references

**Step 1: Search for remaining old-theme class names**

Search for leftover old theme classes: `bg-gray`, `bg-white`, `text-gray`, `text-indigo`, `from-green`, `from-orange`, `bg-green`, `bg-blue`, `bg-orange` in all `.tsx` files under `src/app/`.

**Step 2: Fix any remaining old-theme references**

Replace any stragglers with the appropriate `sc-*` classes.

**Step 3: Add a simple SVG favicon**

Create `src/app/icon.svg` — a simple rocket or star shape with the gold/cyan colors. Next.js 15 auto-serves `icon.svg` as the favicon.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#0B1026"/>
  <polygon points="16,3 19.5,10.5 28,11.5 22,17 23.5,25.5 16,21.5 8.5,25.5 10,17 4,11.5 12.5,10.5" fill="#FFD700"/>
</svg>
```

**Step 4: Full visual test**

Run: `PORT=3001 npx next dev --turbopack`
Check all pages, mobile layout, animations.

**Step 5: Commit**

```bash
git add -A
git commit -m "style: final polish — favicon, cleanup remaining old theme classes"
```
