# Design : Améliorations UX et Code

**Date** : 2026-02-15
**Public cible** : Enfants < 10 ans
**Appareils** : Tablette + Desktop
**Langue** : Configurable (FR/DE/EN)
**Approche** : Progressive (bugs → refactoring → UX → gamification)

---

## Section 1 : Corrections de bugs et fondations

### Navigation mobile
- Ajouter état `isOpen` au menu hamburger dans `layout.tsx`
- Animation slide-down pour afficher/masquer le menu
- Fermer le menu au clic sur un lien

### Validation des entrées
- Cards game : valider que l'input est un nombre positif
- Config : borner les valeurs (difficulté 1-23, intervalle > 100ms)

### Langue configurable
- Sélecteur de langue (FR/DE/EN) dans la navbar
- Stocker la préférence en `localStorage`
- Utiliser cette langue pour la synthèse vocale

### Console error fix
- Remplacer `console.log("Abacus error...")` par `console.error`

---

## Section 2 : Refactoring du code

### Composant Config partagé
- Fusionner `counting/config.tsx` et `cards/config.tsx` en `components/shared-config.tsx`
- Props typées pour les options spécifiques à chaque jeu

### Types TypeScript propres
- Interfaces : `FlashCountingItem`, `CardItem`, `GameState`, `ConfigState`
- Remplacer tous les `any` par des types concrets
- Remplacer `Function` par des signatures de callback typées
- Remplacer `var` par `const/let` dans `abacus.tsx`

### Constantes extraites
- Dimensions canvas, timings, couleurs dans `constants.ts`

### Nettoyage
- Supprimer les SVG inutilisés dans `public/`
- Supprimer ou compléter la page `/columns`

---

## Section 3 : UX adaptée aux enfants

### Page d'accueil
- Cartes de jeu plus grandes avec icônes colorées
- Fond de couleur vive (pas gris)
- Texte plus gros pour les jeunes lecteurs

### Interface de jeu
- Boutons plus grands (touch-friendly, min 48px)
- Couleurs vives et contrastées
- Feedback visuel : animation "Bravo!" avec étoiles/confettis CSS
- Message d'erreur doux ("Essaie encore !" au lieu de "Wrong answer")
- Textes en français par défaut

### Responsive tablette
- Layout adaptatif : config en haut, jeu en dessous sur petit écran
- Touch targets suffisamment grands

### Accessibilité de base
- Labels ARIA sur boutons et inputs
- Focus visible sur éléments interactifs
