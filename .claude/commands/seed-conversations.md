---
description: Creer des conversations de test sur un environnement via MCP Chrome (automatisation navigateur)
allowed-tools: mcp__Claude_in_Chrome__tabs_context_mcp, mcp__Claude_in_Chrome__tabs_create_mcp, mcp__Claude_in_Chrome__navigate, mcp__Claude_in_Chrome__computer, mcp__Claude_in_Chrome__find, mcp__Claude_in_Chrome__read_page, mcp__Claude_in_Chrome__form_input, mcp__Claude_in_Chrome__javascript_tool, mcp__Claude_in_Chrome__get_page_text, TodoWrite
---

# Seed Conversations via MCP Chrome

Automatise la creation de conversations de test en pilotant le navigateur Chrome via MCP.

## Arguments

Format : `$ARGUMENTS` = `[url] [email] [password] [nb_conversations_par_org] [organization_slug]`

Exemples :

- `/seed-conversations http://localhost:3020/ damien.vitrac@theta.fr Password1! 10`
- `/seed-conversations https://app.sandbox.ttfactory.tech damien.vitrac@theta.fr Password1! 10`
- `/seed-conversations https://app.sandbox.ttfactory.tech damien.vitrac@theta.fr Password1! 10 leclerc` (cible uniquement l'org "leclerc")
- `/seed-conversations` (utilise les defauts)

**Defauts** :

- url : `https://app.sandbox.ttfactory.tech`
- email : demander a l'utilisateur
- password : demander a l'utilisateur
- nb_conversations_par_org : `10`
- organization_slug : `null` (toutes les organisations)

Parse les arguments depuis `$ARGUMENTS` (separes par des espaces). Si des arguments manquent, utiliser les defauts ou demander a l'utilisateur.

## Prompts a utiliser

Utilise ces prompts de facon variee (un different par conversation). Boucle si le nombre de conversations depasse la liste :

1. "Bonjour, quels sont vos produits disponibles actuellement ?"
2. "Je cherche des informations sur vos tarifs, pouvez-vous m'aider ?"
3. "Quels services proposez-vous pour les professionnels ?"
4. "J'ai une question concernant ma commande recente"
5. "Pouvez-vous me recommander un produit adapte a mes besoins ?"
6. "Comment fonctionne votre programme de fidelite ?"
7. "Je souhaite obtenir un devis pour un projet"
8. "Quelles sont vos horaires d'ouverture et modalites de contact ?"
9. "Y a-t-il des promotions en cours sur vos produits ?"
10. "Je rencontre un probleme technique, pouvez-vous m'assister ?"
11. "Quelles sont les options de livraison disponibles ?"
12. "Pouvez-vous m'expliquer votre politique de retour ?"
13. "Je cherche un cadeau pour un anniversaire, des suggestions ?"
14. "Quels sont les delais de traitement pour une commande standard ?"
15. "Avez-vous des offres speciales pour les entreprises ?"
16. "Comment puis-je suivre l'avancement de ma demande ?"
17. "Je souhaite comparer plusieurs de vos produits"
18. "Pouvez-vous me donner plus de details sur ce service ?"
19. "Quelle est la difference entre vos formules Basic et Premium ?"
20. "J'aimerais planifier un rendez-vous avec un conseiller"

## Procedure d'automatisation

### Phase 1 : Setup et connexion

1. Appeler `tabs_context_mcp` avec `createIfEmpty: true` pour obtenir les tabs disponibles
2. Utiliser le premier tab disponible (ou en creer un) comme **tab principal**
3. Naviguer vers l'URL cible
4. Attendre 3 secondes le chargement
5. Prendre un screenshot pour verifier l'etat :
   - **Si page de login visible** : remplir email et password, soumettre, attendre 3s
   - **Si dashboard visible** : continuer
6. Confirmer la connexion avec un screenshot

### Phase 2 : Decouverte des organisations

1. Sur le tab principal, cliquer sur le **selecteur d'organisation** dans la sidebar (en haut a gauche, sous le logo, montre le nom de l'org actuelle et le role)
2. Attendre 1s que le dropdown s'ouvre
3. Prendre un screenshot et **lister toutes les organisations** visibles (ignorer "Administration")
4. Fermer le menu (Escape)
5. Stocker la liste des organisations avec leur nom exact
6. **Si `organization_slug` est fourni** :
   - Chercher l'organisation dont le nom contient le slug (case-insensitive)
   - **Si match trouve** : ne garder que cette organisation et afficher "Organisation ciblee : [nom]"
   - **Si aucun match** : afficher une erreur "Aucune organisation ne correspond a '[slug]'. Organisations disponibles : [liste]" et **arreter**
7. **Si pas de slug** : afficher "X organisations trouvees : [liste]" (comportement actuel)

### Phase 3 : Creation des conversations (par organisation)

Pour **chaque organisation** :

#### 3a. Switcher d'organisation

1. Cliquer sur le selecteur d'organisation
2. Cliquer sur le nom de l'organisation cible
3. Attendre 3s le chargement du dashboard
4. Naviguer vers la page Chat (cliquer "Chat" dans la sidebar gauche)
5. Attendre 2s

#### 3b. Identifier l'agent disponible

1. Prendre un screenshot de la page Chat
2. Si un bouton "Nouvelle conversation" est visible ET des agents sont listes : noter le nom de l'agent
3. **Si aucun agent disponible** : afficher un warning et passer a l'organisation suivante

#### 3c. Creer les conversations par batch de 5

Repeter jusqu'a atteindre le nombre de conversations voulu :

**Etape 1 - Preparer les tabs**

- Creer 4 tabs supplementaires avec `tabs_create_mcp` (total = 5 avec le tab principal)
- Naviguer les 5 tabs vers la page Chat de l'organisation : `{url}/manager/chat`
- Attendre 3s que toutes les pages chargent

**Etape 2 - Lancer les conversations en parallele sur chaque tab**
Pour chaque tab du batch :

1. Cliquer sur "+ Nouvelle conversation"
2. Attendre 1s
3. Cliquer sur le **premier agent disponible** dans la liste "Agents disponibles"
4. Attendre 2s que la conversation se charge (le first message de l'agent apparait)
5. Cliquer sur le champ de saisie "Tapez votre message..."
6. Taper le prompt (prendre le prochain dans la liste des prompts)
7. Appuyer sur Entree pour envoyer
8. Attendre 15 secondes pour la reponse IA (ou l'erreur)

**IMPORTANT** : Traiter chaque tab **sequentiellement** dans un batch (on ne peut pas interagir avec plusieurs tabs en meme temps via MCP). Mais les 5 conversations seront creees rapidement l'une apres l'autre.

**Etape 3 - Verification**

- Prendre un screenshot du dernier tab pour verifier qu'une reponse (ou erreur) est apparue
- Logger : "Organisation [nom] : batch X/Y termine (conversations X-Y creees)"

**Etape 4 - Nettoyage entre batches**

- Pour le batch suivant : reutiliser les memes tabs en naviguant a nouveau vers `/manager/chat`
- Quand tous les batches sont finis pour cette org : fermer les 4 tabs supplementaires

#### 3d. Rapport d'organisation

Afficher : "Organisation [nom] : [N] conversations creees (dont [X] avec reponse, [Y] avec erreur)"

### Phase 4 : Rapport final

Afficher un tableau recapitulatif :

```
Organisation          | Conversations | Reussies | Erreurs
--------------------- | ------------- | -------- | -------
Leclerc               | 10            | 8        | 2
TechCorp France       | 10            | 10       | 0
...
--------------------- | ------------- | -------- | -------
TOTAL                 | 60            | 55       | 5
```

## Gestion des erreurs

- **Page ne charge pas** : attendre 5s supplementaires, reprendre un screenshot. Si toujours bloque, skip cette conversation.
- **Erreur du chat** ("Une erreur interne est survenue...") : la conversation est quand meme creee. Compter comme "erreur" mais continuer.
- **Pas d'agent disponible** : skip l'organisation, loguer un warning.
- **Session expiree** (redirect vers login) : se reconnecter avec les memes credentials et reprendre.
- **Timeout reponse IA** (>20s) : considerer comme "erreur", passer a la conversation suivante.

## Notes techniques

- Utiliser `computer` action `screenshot` pour verifier l'etat visuel avant chaque action importante
- Utiliser `computer` action `wait` entre les actions pour laisser le temps au JS de reagir
- Le selecteur d'org est un dropdown accessible en cliquant sur la zone en haut a gauche de la sidebar (sous le logo "Tai")
- Le bouton "Nouvelle conversation" est un bouton vert en haut de la liste des conversations
- Les agents disponibles sont affiches comme des cartes cliquables dans la zone principale quand aucune conversation n'est selectionnee
- Le champ de message est en bas de la zone de chat avec le placeholder "Tapez votre message..."
- Envoyer un message : appuyer sur Entree (pas besoin de cliquer le bouton envoyer)
