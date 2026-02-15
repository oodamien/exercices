# StarCalc — Deep Space Design

## Overview

Redesign complet de l'app "Jeux Éducatifs" → **StarCalc**, avec un thème spatial immersif pour enfants <10 ans. Accès libre aux jeux (pas de progression/niveaux), focus sur l'expérience visuelle.

## Décisions

| Choix | Valeur |
|-------|--------|
| Thème | Espace / Planètes |
| Approche | "Deep Space" — fond sombre étoilé, néons, planètes colorées |
| Progression | Accès libre (pas de verrous) |
| Iconographie | Illustrations PNG/SVG détaillées |
| Logo | Astronaute mascotte + texte "StarCalc" |
| Nom | **StarCalc** |

## Palette de couleurs

| Rôle | Couleur | Hex |
|------|---------|-----|
| Fond principal | Bleu nuit profond | `#0B1026` |
| Fond secondaire | Bleu marine | `#1A2744` |
| Fond tertiaire | Bleu acier | `#243B63` |
| Accent primaire | Or / Doré | `#FFD700` |
| Accent cyan | Cyan néon | `#00D4FF` |
| Accent orange | Orange chaud | `#FF8C42` |
| Accent vert | Vert émeraude | `#22D17B` |
| Accent rouge | Rouge doux | `#FF5A5A` |
| Texte principal | Blanc cassé | `#E8EDF5` |
| Texte secondaire | Gris bleuté | `#8B9EC7` |

Étoiles animées en arrière-plan (CSS `@keyframes twinkle`).

## Typographie

| Rôle | Police | Poids | Source |
|------|--------|-------|--------|
| Titres / Logo | Fredoka One | 400-700 | Google Fonts |
| Nombres / Chiffres | Chakra Petch | 300-400 | Déjà dans le projet |
| Corps / UI | Nunito | 400-700 | Google Fonts |

## Layout global

### Navbar
- Fond transparent/semi-transparent sur ciel étoilé
- Logo : illustration astronaute miniature + "StarCalc" en Fredoka One doré
- Liens : texte blanc, hover = glow cyan, active = underline dorée
- Sélecteur langue : icône globe/planète
- Mobile : menu slide-in depuis la gauche, fond bleu nuit

### Page d'accueil
- Astronaute mascotte flottant avec animation
- Titre "StarCalc" en grand, doré, Fredoka One
- Sous-titre : "Explore les maths dans l'espace !"
- 2 cartes de jeux = 2 planètes :
  - Flash Counting → planète cyan/bleue avec éclairs
  - Abacus → planète orange avec anneaux (Saturne)
- Hover : planète pulse + élévation
- Bouton "Décoller →" en doré avec icône fusée

### Pages de jeux
- **Config panel** ("Panneau de contrôle") :
  - Fond `#1A2744` avec bordure subtile cyan
  - Titre avec icône satellite
  - Steppers = boutons circulaires avec glow
  - Toggles = boutons capsule lumineux, actif = glow doré
- **Game area** :
  - Fond avec nébuleuse subtile (gradient radial)
  - Nombres en Chakra Petch avec glow néon
  - Succès : étoiles qui explosent + texte vert
  - Erreur : shake + texte rouge doux
  - Score : étoiles dorées remplies/vides

## Illustrations et assets

| Asset | Type | Description |
|-------|------|-------------|
| Astronaute mascotte | SVG/PNG | Personnage en combinaison spatiale, cartoon |
| Planète Flash Counting | SVG/PNG | Planète bleue/cyan avec éclairs/chiffres |
| Planète Abacus | SVG/PNG | Planète orange avec anneaux (Saturne) |
| Fusée | SVG | Bouton "Décoller", animations de transition |
| Étoiles (feedback) | SVG | Étoile dorée remplie + vide pour le score |
| Fond étoilé | CSS | Généré en CSS pur (radial-gradient + points animés) |
| Nébuleuse | CSS | Gradient radial violet/bleu pour zones de jeu |

Sources d'illustrations : SVG open-source (undraw.co, openpeeps) ou SVG inline custom.

## Animations

| Animation | Déclencheur | Description |
|-----------|-------------|-------------|
| Twinkle stars | Permanent | Étoiles scintillent (opacity cycle) |
| Float | Permanent | Astronaute flotte (translateY ±10px) |
| Planet pulse | Hover cartes | Planète pulse et grossit |
| Glow | Focus/Active | Halo lumineux éléments interactifs |
| Bounce-in | Apparition | Existant, à garder pour feedbacks |
| Star burst | Bonne réponse | Étoiles explosent depuis le centre |
| Shake | Mauvaise réponse | Secousse horizontale rapide |
| Rocket launch | Navigation jeu | Fusée qui décolle (transition) |

## Composants à modifier

1. **globals.css** — Nouvelles variables couleurs, fonts, animations (twinkle, float, glow, shake)
2. **layout.tsx** — Importer Fredoka One + Nunito, mettre à jour metadata "StarCalc"
3. **app-shell.tsx** — Nouveau fond étoilé, conteneur global
4. **nav.tsx** — Refonte complète : logo astronaute, liens lumineux, sélecteur langue planète
5. **page.tsx** (home) — Nouvelle home avec astronaute, planètes, cartes de jeux
6. **counting/page.tsx** — Refonte layout config + game avec thème spatial
7. **cards/page.tsx** — Idem
8. **counting-config.tsx** — Steppers lumineux, panels "vaisseau"
9. **cards-config.tsx** — Idem
10. **counting/game.tsx** — Feedback spatial (étoiles, glow)
11. **cards/game.tsx** — Idem
12. **Nouveaux assets** — Illustrations astronaute, planètes, fusée, étoiles
