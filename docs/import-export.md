# Import / export

## Imports

### JSON canonique v1

Un fichier `ProgressionDoc` est parse, valide avec Zod, puis applique seulement si la validation reussit. Les erreurs sont affichees a l'utilisateur.

### Legacy

`migrateLegacyToV1` reconnait les exports de type grille avec `rows`, `cells`, `bank` ou `custom`. La migration cree un programme unique avec une sequence de themes. Les cellules rattachees a une ligne deviennent des points de grammaire du theme correspondant.

Limites volontaires:

- Si le legacy ne contient que des themes, seuls les themes sont migres.
- Les versions de schema inconnues sont refusees.
- Les rattachements reconstruits depuis une grille produisent un avertissement.

### Liste de themes

L'import assiste accepte une ligne par theme. Les lignes contenant vacances, examens, immersion ou orientation sont ignorees comme jalons. L'utilisateur peut ajouter les themes au programme actif ou remplacer sa sequence.

## Exports

### JSON

Le JSON est le seul format canonique reimportable sans perte. Il inclut `schemaVersion`, `metadata` et tous les programmes.

### CSV

Le CSV est destine au tableur et contient:

```text
program_label,theme_index,theme_label,grammar_index,grammar_label,theme_notes,grammar_notes
```

Un theme sans point de grammaire produit une ligne avec les colonnes grammaire vides.

### Markdown

Le Markdown est destine a la lecture humaine, a l'archivage et aux revues pedagogiques. Il est derive du JSON et ne sert pas de source de reimport.

### Impression / PDF

Le bouton "Vue imprimable / PDF" appelle l'impression navigateur depuis l'editeur complet. La colonne de gauche propose aussi une "Vue simple" par programme: elle part de l'etat courant restaure depuis `localStorage` et n'affiche que le programme, ses themes et ses points de grammaire. Sur Vercel comme en local, l'utilisateur peut choisir "Enregistrer en PDF".
