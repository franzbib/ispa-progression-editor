# AGENTS.md

## Structure du repo

- `app/` : App Router Next.js, layout global, page d'entree.
- `features/progression-editor/` : UI React de l'editeur, composants, hook d'historique et DnD.
- `lib/types/` : schema canonique et types TypeScript.
- `lib/progression/` : logique metier pure et immuable.
- `lib/import/` : import canonique, legacy et liste de themes.
- `lib/export/` : exports CSV et Markdown.
- `lib/validators/` : validation runtime Zod.
- `data/` : donnees d'exemple A2-B1 et B1-B2.
- `docs/` : documentation d'architecture, modele et import/export.
- `tests/` : tests unitaires Vitest sur la logique critique.

## Conventions de code

- Garder le modele canonique hierarchique: programme -> themes -> points de grammaire.
- Les IDs sont stables et independants des labels; ne jamais les regenerer lors d'un renommage.
- L'ordre est porte par les tableaux. Ne pas ajouter de champ `order` redondant.
- Les fonctions metier doivent rester pures, immuables et testees.
- Valider tout import avant application dans l'etat de l'application.
- Eviter `as any`, les try/catch silencieux et les effets de bord disperses.
- Les libelles pedagogiques peuvent contenir des doublons; le code doit raisonner par ID.

## Commandes

- `npm install` : installer les dependances.
- `npm run dev` : lancer le serveur local Next.js.
- `npm run lint` : lint ESLint.
- `npm run type-check` : verification TypeScript.
- `npm run test` : tests unitaires Vitest.
- `npm run build` : build Next.js compatible Vercel.

## Definition du done

- L'application demarre et affiche au moins A2-B1 et B1-B2.
- Les themes et points de grammaire se reordonnent sans perdre les associations.
- Un point peut passer d'un theme a un autre sans changer d'ID.
- Le JSON exporte se reimporte sans perte.
- Le CSV contient les colonnes attendues pour tableur.
- Les tests metier passent.
- La documentation explique le modele, l'import/export et le deploiement.

## Prudence import et migrations

- Ne pas confondre calendrier brut et verite metier: la source durable est la hierarchie pedagogique.
- Les lignes de type vacances, examens, immersion ou orientation sont des jalons, pas des themes standards.
- Toute migration legacy doit produire un rapport visible si les rattachements sont partiels ou ambigus.
- Une version de schema inconnue ne doit jamais etre appliquee silencieusement.
