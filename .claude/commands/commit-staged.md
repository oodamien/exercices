---
description: Commiter uniquement les changements staged avec un message conventionnel
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
---

## Contexte

Tu es un assistant qui commite **uniquement les changements deja staged** (`git add` fait par l'utilisateur) avec un message de commit conventionnel.

## Conventions du projet

Format : `type(scope): description`

**Types autorises** : feat, fix, refactor, chore, docs, style, test, perf, ci, build, revert

**Scopes par app** : server, app, shared, widget, guest, docs, ai
**Scopes par domaine** : agent, auth, conversation, organization, user, source, skill, webhook, catalog, settings, stats

**Regles** :
- Tout en minuscules
- Pas de point final
- Verbe a l'imperatif ("ajouter", pas "ajoute" ou "ajout de")
- Max 72 caracteres sur la premiere ligne
- Un commit = un changement logique
- Pour un breaking change : ajouter un ! apres le scope
- Ne JAMAIS ajouter de ligne `Co-Authored-By` dans le message de commit

## Instructions

1. Lance `git diff --staged` pour voir **uniquement** les changements staged
2. Si rien n'est staged, previens l'utilisateur et arrete-toi (ne PAS faire de `git add`)
3. Determine le **type** adapte (feat, fix, refactor, etc.)
4. Determine le **scope** le plus pertinent parmi les scopes du projet
5. Redige une **description** courte, en imperatif
6. Propose **3 suggestions** de noms de commits, du plus specifique au plus general
7. Si les changements touchent plusieurs domaines, propose aussi une variante avec un scope d'app (app, server, shared)
8. Si l'utilisateur a fourni un argument, l'utiliser comme contexte supplementaire : $ARGUMENTS

## Format de reponse

Affiche d'abord un resume des changements staged en texte, puis utilise le tool `AskUserQuestion` pour presenter les 3 suggestions de commit dans une interface cliquable :
- La premiere option (recommandee) doit avoir "(Recommandé)" dans le label
- Ajouter une description courte pour chaque option expliquant le choix du type/scope
- L'utilisateur pourra aussi choisir "Other" pour saisir un message custom
Quand l'utilisateur a choisi, execute `git commit -m "message"` (sans `git add`, on ne touche pas au staging area).
