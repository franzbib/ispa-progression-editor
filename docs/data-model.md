# Modele de donnees

## ProgressionDoc v1

Le format canonique est versionne et hierarchique:

```json
{
  "schemaVersion": "1.0",
  "metadata": {
    "exportedAt": "2026-04-13T00:00:00.000Z",
    "appVersion": "0.1.0",
    "source": "base pedagogique pre-A1 a B1-B2"
  },
  "programs": [
    {
      "id": "program-a0-a1",
      "label": "A0-A1",
      "notes": "Notes optionnelles",
      "sequence": [
        {
          "id": "theme-a0a1-saluer-se-presenter",
          "themeLabel": "Saluer et se présenter",
          "notes": "Notes optionnelles",
          "grammarPoints": [
            {
              "id": "grammar-a0a1-saluer-pronoms-sujets",
              "label": "Les pronoms sujets",
              "notes": "Notes optionnelles",
              "tags": ["temps"]
            }
          ]
        }
      ]
    }
  ]
}
```

## Invariants

- `schemaVersion` vaut `"1.0"` pour cette version.
- Tous les `id` sont uniques dans le document.
- Les IDs ne dependent pas des labels.
- Renommer un theme ou un point ne change pas son ID.
- Deux themes ou deux points peuvent avoir le meme label.
- L'ordre est celui des tableaux `programs`, `sequence` et `grammarPoints`.
- Les points de grammaire sont contenus dans leur theme; deplacer le theme conserve donc l'association.

## Validation

La validation runtime est dans `lib/validators/progression.ts` avec Zod. Elle verifie la structure, les champs obligatoires et les doublons d'IDs. Une version inconnue doit etre migree explicitement avant application.

## Donnees d'exemple

`data/sample-progressions.ts` initialise A0-A1, A1-A2, A2-B1 et B1-B2. Le label produit A0-A1 est conserve dans l'interface, mais documente comme progression pedagogique pre-A1 -> A1 pour rester coherent avec le cadrage CECRL. Les documents calendaires A2-B1 et B1-B2 sont interpretes comme ordre relatif; les dates exactes ne sont pas encodees.
