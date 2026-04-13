# Éditeur de progressions FLE / F.O.U.

Application Next.js pour éditer des progressions pedagogiques structurees par:

```text
Programme -> sequence ordonnee de themes -> points de grammaire ordonnes
```

Les themes peuvent etre reordonnes sans perdre leurs points de grammaire. Les points peuvent etre reordonnes dans un theme ou deplaces vers un autre theme.

## Fonctionnalites

- Programmes A0-A1, A1-A2, A2-B1 et B1-B2 initialises par defaut.
- A0-A1 est traite comme une progression pedagogique pre-A1 -> A1.
- Drag-and-drop avec dnd-kit.
- Boutons monter / descendre et select de deplacement comme fallback clavier.
- Ajout, suppression, renommage et notes.
- IDs stables independants des labels.
- Recherche, compteurs, banque de points de grammaire.
- Import JSON canonique v1, migration legacy et import assiste depuis liste.
- Export JSON, CSV, Markdown et impression navigateur.
- Vue simple imprimable par programme, sans controles d'edition.
- Sauvegarde automatique locale avec `localStorage`.
- Undo / redo sur 20 etats.

## Installation

```bash
npm install
npm run dev
```

Ouvrir ensuite `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run type-check
npm run test
npm run build
```

## Test manuel rapide

1. Ouvrir A0-A1, A1-A2, A2-B1 ou B1-B2.
2. Deplacer un theme par glisser-deposer ou avec Monter / Descendre.
3. Verifier que ses points de grammaire restent dans la carte.
4. Deplacer un point vers un autre theme avec le select "Vers...".
5. Cliquer sur `Vue simple` dans la colonne de gauche et verifier la version imprimable.
6. Exporter en JSON puis reimporter le fichier.
7. Exporter en CSV et l'ouvrir dans un tableur.

## Deploiement Vercel

Le projet ne demande aucune variable d'environnement.

1. Importer le repo dans Vercel.
2. Garder les commandes par defaut:
   - Install: `npm install`
   - Build: `npm run build`
   - Output: gere par Next.js
3. Deployer.

L'application est compatible avec un deploiement hybride simple; la v1 n'utilise pas de backend.

## Documentation

- `docs/architecture.md`
- `docs/data-model.md`
- `docs/import-export.md`
- `AGENTS.md`
