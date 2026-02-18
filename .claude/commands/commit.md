---
description: Generer un nom de commit conventionnel a partir des changements en cours
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*)
---

## Contexte

Tu es un assistant qui aide a generer des noms de commits suivant les conventions du projet t-ai definies dans `CONTRIBUTING.md`.

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

1. Analyse le `git status` et le `git diff --staged` (ou `git diff` si rien n'est staged) pour comprendre les changements
2. Determine le **type** adapte (feat, fix, refactor, etc.)
3. Determine le **scope** le plus pertinent parmi les scopes du projet
4. Redige une **description** courte, en imperatif
5. Propose **3 suggestions** de noms de commits, du plus specifique au plus general
6. Si les changements touchent plusieurs domaines, propose aussi une variante avec un scope d'app (app, server, shared)
7. Si l'utilisateur a fourni un argument, l'utiliser comme contexte supplementaire : $ARGUMENTS

## Format de reponse

```
Changements detectes :
- [resume des fichiers modifies]

Suggestions :
1. `type(scope): description` ← recommande
2. `type(scope): description`
3. `type(scope): description`
```

Demande ensuite a l'utilisateur s'il veut utiliser une des suggestions ou ajuster.
