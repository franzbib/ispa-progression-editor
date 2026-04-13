# Architecture

## Etat de depart

Le dossier local etait vide et n'etait pas un depot Git initialise. Le repo d'inspiration `franzbib/IspaProgrammation` a ete consulte comme reference d'idees: multi-progressions, persistance, import/export et logique editoriale. Son modele principal est une grille `rows/cells/bank`, utile pour une progression hebdomadaire, mais moins robuste pour l'invariant demande ici: un theme doit emporter sa liste de grammaire quand il est deplace.

## Cible

L'application est une app Next.js avec App Router, React, TypeScript, Tailwind CSS, dnd-kit et Zod. Elle est entierement front-end pour la v1 et compatible avec un deploiement Vercel simple.

## Organisation

- `app/` contient la page principale et les styles globaux.
- `features/progression-editor/components/` contient l'interface client.
- `features/progression-editor/hooks/` gere la persistance locale et l'historique undo/redo.
- `features/progression-editor/lib/` regroupe les IDs DnD et helpers proches de l'UI.
- `lib/progression/` regroupe les operations pures sur le modele.
- `lib/import/`, `lib/export/`, `lib/validators/` isolent les entrees/sorties.
- `data/sample-progressions.ts` fournit les programmes A0-A1, A1-A2, A2-B1 et B1-B2. A0-A1 est une base pre-A1 -> A1 editable.
- `tests/` verrouille les invariants metier.

## Flux d'etat

L'etat metier est un `ProgressionDoc`. L'UI garde seulement des etats d'affichage: programme actif, theme actif, recherche, texte d'import et notices. Les mutations passent par les fonctions pures, puis sont sauvegardees dans l'historique local.

La persistance est faite dans `localStorage` avec restauration validee par Zod. Si la sauvegarde locale est invalide, elle est ignoree et un message visible est affiche. Lorsqu'une ancienne sauvegarde valide ne contient pas tous les programmes par defaut, les programmes manquants sont ajoutes sans remplacer les programmes deja modifies localement.

## Vue simple

`SimpleProgramView` affiche un seul programme depuis le `ProgressionDoc` courant: titre, themes ordonnes et points de grammaire ordonnes. Elle n'a pas de controles d'edition et utilise des styles sobres avec `break-inside: avoid` pour l'impression navigateur/PDF.

## Drag-and-drop

dnd-kit gere deux familles d'elements:

- `theme:<id>` pour reordonner les themes.
- `grammar:<id>` et `grammar-list:<themeId>` pour reordonner ou deplacer les points de grammaire.

Les boutons monter/descendre et le select "Vers..." fournissent une alternative clavier minimale.

## Decisions

- Pas de backend en v1: les exports/imports navigateur et `localStorage` suffisent.
- Pas de champ `order`: l'ordre du tableau est la source de verite.
- Les doublons de labels sont autorises; les operations utilisent uniquement les IDs.
- Le format legacy est migre de facon prudente avec rapport, sans chercher a reconstruire des donnees ambiguës.
