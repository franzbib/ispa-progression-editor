import { ProgressionDoc } from "@/lib/types/progression";

export const sampleProgressionDoc: ProgressionDoc = {
  schemaVersion: "1.0",
  metadata: {
    exportedAt: "2026-04-13T00:00:00.000Z",
    appVersion: "0.1.0",
    source:
      "base pedagogique pre-A1 a B1-B2, exports A2-B1 et B1-B2 fournis, synthese A2/B1 vers emploi"
  },
  programs: [
    {
      id: "program-a0-a1",
      label: "A0-A1",
      notes:
        "Progression pedagogique de type pre-A1 -> A1. Base editable, non exhaustive, pour une entree en FLE.",
      sequence: [
        {
          id: "theme-a0a1-saluer-se-presenter",
          themeLabel: "Saluer et se présenter",
          grammarPoints: [
            {
              id: "grammar-a0a1-saluer-pronoms-sujets",
              label: "Les pronoms sujets"
            },
            {
              id: "grammar-a0a1-saluer-etre-present",
              label: "Le verbe être au présent"
            },
            {
              id: "grammar-a0a1-saluer-avoir-present",
              label: "Le verbe avoir au présent"
            },
            {
              id: "grammar-a0a1-saluer-phrase-declarative",
              label: "La phrase déclarative simple"
            },
            {
              id: "grammar-a0a1-saluer-nationalites",
              label: "Les adjectifs de nationalité et l'accord simple"
            }
          ]
        },
        {
          id: "theme-a0a1-identifier",
          themeLabel: "Identifier des personnes et des objets",
          grammarPoints: [
            {
              id: "grammar-a0a1-identifier-c-est",
              label: "C'est / ce sont"
            },
            {
              id: "grammar-a0a1-identifier-il-y-a",
              label: "Il y a"
            },
            {
              id: "grammar-a0a1-identifier-articles-definis",
              label: "Les articles définis"
            },
            {
              id: "grammar-a0a1-identifier-articles-indefinis",
              label: "Les articles indéfinis"
            },
            {
              id: "grammar-a0a1-identifier-genre-nombre",
              label: "Le genre et le nombre des noms"
            },
            {
              id: "grammar-a0a1-identifier-accord-adjectif",
              label: "L'accord de l'adjectif qualificatif simple"
            }
          ]
        },
        {
          id: "theme-a0a1-questions-simples",
          themeLabel: "Poser des questions simples",
          grammarPoints: [
            {
              id: "grammar-a0a1-questions-intonation",
              label: "L'interrogation par intonation"
            },
            {
              id: "grammar-a0a1-questions-est-ce-que",
              label: "Est-ce que"
            },
            {
              id: "grammar-a0a1-questions-mots-interrogatifs",
              label: "Qui, qu'est-ce que, où, comment"
            },
            {
              id: "grammar-a0a1-questions-oui-non-si",
              label: "La réponse oui, non, si"
            },
            {
              id: "grammar-a0a1-questions-negation",
              label: "La négation ne... pas"
            }
          ]
        },
        {
          id: "theme-a0a1-temps-quotidien",
          themeLabel: "Parler du temps quotidien",
          grammarPoints: [
            {
              id: "grammar-a0a1-temps-jours-dates-heures",
              label: "Les jours, mois, dates et heures"
            },
            {
              id: "grammar-a0a1-temps-prepositions",
              label: "Les prépositions de temps les plus fréquentes"
            },
            {
              id: "grammar-a0a1-temps-verbes-er",
              label: "Le présent des verbes réguliers en -er"
            },
            {
              id: "grammar-a0a1-temps-aller",
              label: "Aller au présent"
            },
            {
              id: "grammar-a0a1-temps-venir",
              label: "Venir au présent"
            }
          ]
        },
        {
          id: "theme-a0a1-routine",
          themeLabel: "Décrire sa routine",
          grammarPoints: [
            {
              id: "grammar-a0a1-routine-pronominaux",
              label: "Les verbes pronominaux usuels"
            },
            {
              id: "grammar-a0a1-routine-frequence",
              label: "Les adverbes de fréquence"
            },
            {
              id: "grammar-a0a1-routine-connecteurs",
              label: "Les connecteurs très simples: et, puis, après"
            },
            {
              id: "grammar-a0a1-routine-faire",
              label: "Faire au présent"
            },
            {
              id: "grammar-a0a1-routine-prendre",
              label: "Prendre au présent"
            }
          ]
        },
        {
          id: "theme-a0a1-se-reperer",
          themeLabel: "Se repérer et se déplacer",
          grammarPoints: [
            {
              id: "grammar-a0a1-reperer-prepositions-lieu",
              label: "Les prépositions de lieu de base"
            },
            {
              id: "grammar-a0a1-reperer-presentatifs",
              label: "Il y a, voici, voilà"
            },
            {
              id: "grammar-a0a1-reperer-imperatif",
              label: "L'impératif des verbes fréquents"
            },
            {
              id: "grammar-a0a1-reperer-aller-prepositions",
              label: "Aller + à, au, en, aux"
            },
            {
              id: "grammar-a0a1-reperer-chemin",
              label: "Les structures pour demander un chemin"
            }
          ]
        },
        {
          id: "theme-a0a1-acheter-demander",
          themeLabel: "Acheter et demander quelque chose",
          grammarPoints: [
            {
              id: "grammar-a0a1-acheter-je-voudrais",
              label: "Je voudrais"
            },
            {
              id: "grammar-a0a1-acheter-quantites-simples",
              label: "Les quantités simples"
            },
            {
              id: "grammar-a0a1-acheter-combien-de",
              label: "Combien de"
            },
            {
              id: "grammar-a0a1-acheter-partitifs",
              label: "Les articles partitifs les plus courants"
            },
            {
              id: "grammar-a0a1-acheter-pouvoir-vouloir",
              label: "Pouvoir et vouloir au présent"
            }
          ]
        }
      ]
    },
    {
      id: "program-a1-a2",
      label: "A1-A2",
      notes:
        "Progression de consolidation A1 vers A2, centree sur les usages courants et les premiers recits.",
      sequence: [
        {
          id: "theme-a1a2-habitudes-environnement",
          themeLabel: "Parler de ses habitudes et de son environnement",
          grammarPoints: [
            {
              id: "grammar-a1a2-habitudes-present",
              label: "Révision et extension du présent"
            },
            {
              id: "grammar-a1a2-habitudes-pronominaux",
              label: "Les verbes pronominaux au présent"
            },
            {
              id: "grammar-a1a2-habitudes-frequence",
              label: "Les adverbes de fréquence"
            },
            {
              id: "grammar-a1a2-habitudes-depuis",
              label: "Depuis + durée"
            },
            {
              id: "grammar-a1a2-habitudes-modalite",
              label: "Il faut, on peut, on doit"
            }
          ]
        },
        {
          id: "theme-a1a2-logement-ville",
          themeLabel: "Décrire un logement, un lieu, une ville",
          grammarPoints: [
            {
              id: "grammar-a1a2-logement-lieu",
              label: "Les prépositions et locutions de lieu"
            },
            {
              id: "grammar-a1a2-logement-c-est-il-est",
              label: "L'opposition c'est / il est"
            },
            {
              id: "grammar-a1a2-logement-adjectifs-place",
              label: "Les adjectifs qualificatifs et leur place"
            },
            {
              id: "grammar-a1a2-logement-presentatifs",
              label: "Les présentatifs"
            },
            {
              id: "grammar-a1a2-logement-comparatifs",
              label: "Les comparatifs simples"
            }
          ]
        },
        {
          id: "theme-a1a2-courses-manger",
          themeLabel: "Faire des courses, manger, commander",
          grammarPoints: [
            {
              id: "grammar-a1a2-courses-partitifs",
              label: "Les articles partitifs"
            },
            {
              id: "grammar-a1a2-courses-quantites",
              label: "Les quantités précises et approximatives"
            },
            {
              id: "grammar-a1a2-courses-imperatif",
              label: "L'impératif"
            },
            {
              id: "grammar-a1a2-courses-pronoms-cod",
              label: "Les pronoms COD simples"
            },
            {
              id: "grammar-a1a2-courses-modalite",
              label: "Il faut, devoir, pouvoir en situation concrète"
            }
          ]
        },
        {
          id: "theme-a1a2-actions-passees",
          themeLabel: "Raconter des actions passées",
          grammarPoints: [
            {
              id: "grammar-a1a2-passe-compose-avoir",
              label: "Le passé composé avec avoir"
            },
            {
              id: "grammar-a1a2-passe-compose-etre",
              label: "Le passé composé avec être"
            },
            {
              id: "grammar-a1a2-passe-participes",
              label: "Les participes passés fréquents"
            },
            {
              id: "grammar-a1a2-passe-marqueurs",
              label: "Les marqueurs temporels du passé"
            },
            {
              id: "grammar-a1a2-passe-present-pc",
              label: "L'opposition présent / passé composé dans des emplois simples"
            }
          ]
        },
        {
          id: "theme-a1a2-projets-intentions",
          themeLabel: "Parler de projets et d'intentions",
          grammarPoints: [
            {
              id: "grammar-a1a2-projets-futur-proche",
              label: "Le futur proche"
            },
            {
              id: "grammar-a1a2-projets-vouloir-pouvoir-devoir",
              label: "Vouloir, pouvoir, devoir"
            },
            {
              id: "grammar-a1a2-projets-pour-infinitif",
              label: "Pour + infinitif"
            },
            {
              id: "grammar-a1a2-projets-cause",
              label: "Parce que / car"
            },
            {
              id: "grammar-a1a2-projets-quand",
              label: "Quand + présent pour parler d'un futur proche simple"
            }
          ]
        },
        {
          id: "theme-a1a2-comparer-choisir",
          themeLabel: "Comparer, choisir, justifier",
          grammarPoints: [
            {
              id: "grammar-a1a2-comparer-comparatif",
              label: "Le comparatif de supériorité, d'infériorité et d'égalité"
            },
            {
              id: "grammar-a1a2-comparer-superlatif",
              label: "Le superlatif simple"
            },
            {
              id: "grammar-a1a2-comparer-meilleur-mieux",
              label: "Meilleur / mieux"
            },
            {
              id: "grammar-a1a2-comparer-plus-moins-aussi",
              label: "Plus, moins, aussi"
            },
            {
              id: "grammar-a1a2-comparer-preference",
              label: "Les structures pour exprimer une préférence"
            }
          ]
        },
        {
          id: "theme-a1a2-aide-probleme",
          themeLabel: "Demander de l'aide, expliquer un problème",
          grammarPoints: [
            {
              id: "grammar-a1a2-aide-pronoms-coi",
              label: "Les pronoms COI les plus fréquents"
            },
            {
              id: "grammar-a1a2-aide-il-faut",
              label: "Il faut / il ne faut pas"
            },
            {
              id: "grammar-a1a2-aide-on-peut",
              label: "On peut / on ne peut pas"
            },
            {
              id: "grammar-a1a2-aide-cause",
              label: "L'expression de la cause simple"
            },
            {
              id: "grammar-a1a2-aide-politesse",
              label: "Les formulations polies de demande"
            }
          ]
        }
      ]
    },
    {
      id: "program-a2-b1",
      label: "A2-B1",
      notes:
        "Séquence initiale dérivée de l'export Modules A2-B1. Les dates calendaires ne sont pas conservées.",
      sequence: [
        {
          id: "theme-a2b1-se-presenter",
          themeLabel: "Se présenter",
          notes:
            "Échanges, salutations, présentation administrative et personnelle; vocabulaire de la politesse.",
          grammarPoints: [
            {
              id: "grammar-a2b1-se-presenter-futur-simple",
              label: "Le futur simple pour exprimer des projets d'avenir"
            },
            {
              id: "grammar-a2b1-se-presenter-futur-proche-present",
              label: "Futur simple, futur proche ou présent selon l'éloignement du futur"
            }
          ]
        },
        {
          id: "theme-a2b1-gastronomie",
          themeLabel: "La gastronomie",
          notes:
            "Organisation des repas, spécialités culinaires, guides gastronomiques et grands chefs français.",
          grammarPoints: [
            {
              id: "grammar-a2b1-gastronomie-participe-etre",
              label: "Accord du participe passé avec le sujet avec l'auxiliaire être"
            },
            {
              id: "grammar-a2b1-gastronomie-participe-avoir",
              label: "Accord du participe passé avec le COD avec l'auxiliaire avoir"
            },
            {
              id: "grammar-a2b1-gastronomie-plus-que-parfait",
              label: "Le plus-que-parfait dans le récit"
            },
            {
              id: "grammar-a2b1-gastronomie-concordance",
              label: "Première approche de la concordance des temps"
            }
          ]
        },
        {
          id: "theme-a2b1-cinema",
          themeLabel: "Le cinéma",
          notes: "Genres cinématographiques et vocabulaire du cinéma.",
          grammarPoints: [
            {
              id: "grammar-a2b1-cinema-adverbes-ment",
              label: "Les adverbes de manière en -ment"
            },
            {
              id: "grammar-a2b1-cinema-comparatif",
              label: "Comparatifs des verbes et de l'adverbe"
            },
            {
              id: "grammar-a2b1-cinema-superlatif",
              label: "Superlatif de l'adjectif et de l'adverbe"
            }
          ]
        },
        {
          id: "theme-a2b1-etudes",
          themeLabel: "Les études",
          notes:
            "Organisation de la scolarité française, laïcité, calendrier scolaire et études supérieures.",
          grammarPoints: [
            {
              id: "grammar-a2b1-etudes-articulateurs-logiques",
              label: "Les articulateurs logiques"
            }
          ]
        },
        {
          id: "theme-a2b1-mode",
          themeLabel: "La mode",
          notes:
            "Luxe à la française, grandes marques, couturiers et vocabulaire de la mode.",
          grammarPoints: [
            {
              id: "grammar-a2b1-mode-impersonnelles",
              label: "Les tournures impersonnelles simples"
            },
            {
              id: "grammar-a2b1-mode-double-negation",
              label: "La double négation: ni... ni..."
            },
            {
              id: "grammar-a2b1-mode-restriction",
              label: "La restriction: ne... que"
            },
            {
              id: "grammar-a2b1-mode-imperatif",
              label: "L'impératif pour le conseil et l'ordre"
            },
            {
              id: "grammar-a2b1-mode-gerondif",
              label: "Le gérondif: manière, condition, simultanéité"
            }
          ]
        },
        {
          id: "theme-a2b1-musique",
          themeLabel: "La musique",
          notes: "Chanson française, styles musicaux et patrimoine culturel.",
          grammarPoints: [
            {
              id: "grammar-a2b1-musique-localisation-spatiale",
              label: "Localisation spatiale: prépositions et adverbes de lieu"
            },
            {
              id: "grammar-a2b1-musique-localisation-temporelle",
              label: "Localisation temporelle: durée, moment, passé et futur"
            },
            {
              id: "grammar-a2b1-musique-articulateurs-chronologiques",
              label: "Articulateurs chronologiques du discours"
            }
          ]
        },
        {
          id: "theme-a2b1-calendrier",
          themeLabel: "Le calendrier français",
          notes: "Fêtes religieuses et civiles, jours fériés et rythmes de l'année.",
          grammarPoints: [
            {
              id: "grammar-a2b1-calendrier-conditionnel-passe",
              label: "Le conditionnel passé: regret et reproche"
            },
            {
              id: "grammar-a2b1-calendrier-conditionnel-present",
              label: "Le conditionnel présent: souhait, désir, hypothèse"
            }
          ]
        },
        {
          id: "theme-a2b1-sante",
          themeLabel: "La santé",
          notes:
            "Recherche scientifique, médecine libérale et hospitalière, couverture maladie.",
          grammarPoints: [
            {
              id: "grammar-a2b1-sante-hypothese-certaine",
              label: "Hypothèse certaine: si + présent/passé composé, futur ou impératif"
            },
            {
              id: "grammar-a2b1-sante-hypothese-incertaine",
              label: "Hypothèse incertaine: si + imparfait, conditionnel présent ou passé"
            },
            {
              id: "grammar-a2b1-sante-hypothese-non-realisee",
              label: "Hypothèse non réalisée: si + plus-que-parfait, conditionnel passé"
            }
          ]
        },
        {
          id: "theme-a2b1-famille",
          themeLabel: "La famille française",
          notes:
            "Arbre généalogique, fêtes familiales, types d'union et politique nataliste.",
          grammarPoints: [
            {
              id: "grammar-a2b1-famille-articles",
              label: "Articles définis, indéfinis et partitifs"
            },
            {
              id: "grammar-a2b1-famille-possessifs",
              label: "Adjectifs et pronoms possessifs"
            },
            {
              id: "grammar-a2b1-famille-adjectifs",
              label: "Adjectifs qualificatifs"
            }
          ]
        },
        {
          id: "theme-a2b1-ville",
          themeLabel: "La ville",
          notes:
            "Lieux emblématiques, architecture, vie en ville et littérature d'aventure.",
          grammarPoints: [
            {
              id: "grammar-a2b1-ville-ou",
              label: "Où adverbe de lieu et où pronom relatif"
            },
            {
              id: "grammar-a2b1-ville-adverbes",
              label: "Adverbes de qualité, quantité et intensité"
            },
            {
              id: "grammar-a2b1-ville-adjectifs-adverbes",
              label: "Adjectifs utilisés comme adverbes"
            }
          ]
        },
        {
          id: "theme-a2b1-travail",
          themeLabel: "Le travail",
          notes:
            "Monde professionnel, contrats, congés, SMIC, France Travail et syndicats.",
          grammarPoints: [
            {
              id: "grammar-a2b1-travail-passe",
              label: "Révision des temps du passé pour parler d'expériences professionnelles"
            },
            {
              id: "grammar-a2b1-travail-futur",
              label: "Révision du futur simple et du futur proche"
            },
            {
              id: "grammar-a2b1-travail-connecteurs",
              label: "Articulateurs logiques simples: cause, conséquence, but"
            }
          ]
        }
      ]
    },
    {
      id: "program-a2-emploi",
      label: "A2 vers l'emploi",
      notes:
        "Progression A2 orientee insertion professionnelle, etablie depuis la synthese A2/B1 vers l'emploi fournie.",
      sequence: [
        {
          id: "theme-a2emploi-se-presenter",
          themeLabel: "Se presenter dans un contexte professionnel",
          notes:
            "Echanges, salutations, presentation administrative et personnelle, premiers projets.",
          grammarPoints: [
            { id: "grammar-a2emploi-se-presenter-futur-simple", label: "Le futur simple" },
            { id: "grammar-a2emploi-se-presenter-futur-proche", label: "Le futur proche" },
            {
              id: "grammar-a2emploi-se-presenter-present-futur",
              label: "Present, futur proche ou futur simple pour exprimer l'avenir"
            }
          ]
        },
        {
          id: "theme-a2emploi-gastronomie-savoir-vivre",
          themeLabel: "Savoir-vivre et restauration",
          notes:
            "Repas, specialites, regles de savoir-vivre et situations de restauration.",
          grammarPoints: [
            {
              id: "grammar-a2emploi-gastronomie-participe-etre",
              label: "Accord du participe passe avec etre"
            },
            {
              id: "grammar-a2emploi-gastronomie-participe-avoir",
              label: "Accord du participe passe avec avoir"
            },
            { id: "grammar-a2emploi-gastronomie-plus-que-parfait", label: "Le plus-que-parfait" },
            {
              id: "grammar-a2emploi-gastronomie-concordance",
              label: "Premiere approche de la concordance des temps"
            }
          ]
        },
        {
          id: "theme-a2emploi-culture-cinema",
          themeLabel: "Culture et cinema",
          notes: "Genres cinematographiques, avis simples et comparaison.",
          grammarPoints: [
            {
              id: "grammar-a2emploi-cinema-adverbes-ment",
              label: "Les adverbes de maniere en -ment"
            },
            {
              id: "grammar-a2emploi-cinema-comparatifs",
              label: "Le comparatif du verbe et de l'adverbe"
            },
            {
              id: "grammar-a2emploi-cinema-superlatif",
              label: "Le superlatif de l'adjectif et de l'adverbe"
            }
          ]
        },
        {
          id: "theme-a2emploi-etudes-formation",
          themeLabel: "Etudes et formation",
          notes:
            "Scolarite, formations, calendrier, universites et grandes ecoles.",
          grammarPoints: [
            {
              id: "grammar-a2emploi-etudes-articulateurs",
              label: "Les articulateurs logiques simples"
            },
            {
              id: "grammar-a2emploi-etudes-cause-consequence",
              label: "Cause, consequence et but"
            }
          ]
        },
        {
          id: "theme-a2emploi-mode-presentation",
          themeLabel: "Mode, image et presentation",
          notes:
            "Luxe, marques, apparence professionnelle et conseils de presentation.",
          grammarPoints: [
            {
              id: "grammar-a2emploi-mode-impersonnelles",
              label: "Les tournures impersonnelles simples"
            },
            {
              id: "grammar-a2emploi-mode-double-negation",
              label: "La double negation: ni... ni..."
            },
            {
              id: "grammar-a2emploi-mode-sans-infinitif",
              label: "La negation avec sans + infinitif"
            },
            { id: "grammar-a2emploi-mode-restriction", label: "La restriction ne... que" },
            { id: "grammar-a2emploi-mode-imperatif", label: "L'imperatif" },
            { id: "grammar-a2emploi-mode-gerondif", label: "Le gerondif" }
          ]
        },
        {
          id: "theme-a2emploi-temps-chronologie",
          themeLabel: "Temps, calendrier et chronologie",
          notes:
            "Reperes de temps, calendrier francais, fetes et organisation chronologique.",
          grammarPoints: [
            {
              id: "grammar-a2emploi-chronologie-localisation-temporelle",
              label: "Localisation temporelle: pendant, depuis, dans, il y a"
            },
            {
              id: "grammar-a2emploi-chronologie-articulateurs",
              label: "Les articulateurs chronologiques du discours"
            },
            {
              id: "grammar-a2emploi-calendrier-conditionnel-present",
              label: "Le conditionnel present: souhait, desir, hypothese"
            },
            {
              id: "grammar-a2emploi-calendrier-conditionnel-passe",
              label: "Le conditionnel passe: regret et reproche"
            }
          ]
        },
        {
          id: "theme-a2emploi-sante-travail",
          themeLabel: "Sante et travail",
          notes:
            "Sante, medecine, couverture maladie et situations de prevention.",
          grammarPoints: [
            {
              id: "grammar-a2emploi-sante-hypothese-certaine",
              label: "Hypothese certaine: si + present, futur ou imperatif"
            },
            {
              id: "grammar-a2emploi-sante-hypothese-incertaine",
              label: "Hypothese incertaine: si + imparfait, conditionnel"
            },
            {
              id: "grammar-a2emploi-sante-hypothese-non-realisee",
              label: "Hypothese non realisee: si + plus-que-parfait, conditionnel passe"
            }
          ]
        },
        {
          id: "theme-a2emploi-famille-vie-personnelle",
          themeLabel: "Famille et vie personnelle",
          notes:
            "Famille, traditions, situation personnelle et presentation de son parcours.",
          grammarPoints: [
            {
              id: "grammar-a2emploi-famille-articles",
              label: "Articles definis, indefinis et partitifs"
            },
            {
              id: "grammar-a2emploi-famille-possessifs",
              label: "Adjectifs et pronoms possessifs"
            },
            { id: "grammar-a2emploi-famille-adjectifs", label: "Les adjectifs qualificatifs" }
          ]
        },
        {
          id: "theme-a2emploi-monde-professionnel",
          themeLabel: "Monde professionnel",
          notes:
            "Entreprises, contrats, fonction publique, conges, SMIC, France Travail et syndicats.",
          grammarPoints: [
            {
              id: "grammar-a2emploi-travail-temps-passe",
              label: "Revision des temps du passe pour parler d'experiences professionnelles"
            },
            {
              id: "grammar-a2emploi-travail-futur",
              label: "Revision du futur simple et du futur proche pour exprimer des projets"
            },
            {
              id: "grammar-a2emploi-travail-connecteurs",
              label: "Articulateurs logiques simples: cause, consequence, but"
            }
          ]
        },
        {
          id: "theme-a2emploi-ville-mobilite",
          themeLabel: "Ville, mobilite et reperage",
          notes:
            "Lieux, ville et campagne, architecture, mobilite et reperage spatial.",
          grammarPoints: [
            {
              id: "grammar-a2emploi-ville-ou",
              label: "Ou adverbe de lieu et ou pronom relatif"
            },
            {
              id: "grammar-a2emploi-ville-adverbes-intensite",
              label: "Adverbes de qualite, quantite et intensite"
            },
            {
              id: "grammar-a2emploi-ville-adjectifs-adverbes",
              label: "Adjectifs employes comme adverbes"
            }
          ]
        },
        {
          id: "theme-a2emploi-peinture-expression",
          themeLabel: "Arts, description et expression",
          notes:
            "Genres picturaux, atelier du peintre, description et expression d'un avis.",
          grammarPoints: [
            {
              id: "grammar-a2emploi-peinture-subjonctif-possibilite",
              label: "Le subjonctif pour la possibilite et l'obligation"
            },
            {
              id: "grammar-a2emploi-peinture-pour-que",
              label: "Pour que + subjonctif"
            },
            {
              id: "grammar-a2emploi-peinture-verbes-opinion",
              label: "Verbes d'opinion, d'ordre et de sentiment + subjonctif"
            }
          ]
        },
        {
          id: "theme-a2emploi-medias-information",
          themeLabel: "Medias et information",
          notes: "Presse, television, radio, magazines et information professionnelle.",
          grammarPoints: [
            {
              id: "grammar-a2emploi-medias-discours-rapporte-present",
              label: "Le discours rapporte au present"
            },
            {
              id: "grammar-a2emploi-medias-discours-rapporte-passe",
              label: "Le discours rapporte au passe"
            },
            { id: "grammar-a2emploi-medias-voix-passive", label: "La voix passive" }
          ]
        }
      ]
    },
    {
      id: "program-b1-emploi",
      label: "B1 vers l'emploi",
      notes:
        "Progression B1 orientee emploi, construite depuis la synthese des modules professionnalisants fournie.",
      sequence: [
        {
          id: "theme-b1emploi-parcours-experiences",
          themeLabel: "Parcours et experiences professionnelles",
          notes:
            "Raconter des evenements passes, decrire des experiences et structurer son parcours.",
          grammarPoints: [
            {
              id: "grammar-b1emploi-parcours-pc-imparfait",
              label: "Passe compose et imparfait: valeurs narratives"
            },
            {
              id: "grammar-b1emploi-parcours-marqueurs-temporels",
              label: "Marqueurs temporels: avant, apres, pendant, depuis, jusqu'a"
            },
            {
              id: "grammar-b1emploi-parcours-ordre-logique",
              label: "Ordre logique du discours: d'abord, ensuite, enfin"
            }
          ]
        },
        {
          id: "theme-b1emploi-projet-objectifs",
          themeLabel: "Projet professionnel et objectifs",
          notes:
            "Expliquer un projet, justifier une orientation et se projeter dans l'avenir.",
          grammarPoints: [
            { id: "grammar-b1emploi-projet-futur", label: "Futur proche et futur simple" },
            {
              id: "grammar-b1emploi-projet-but",
              label: "Expression du but: pour, afin de"
            },
            {
              id: "grammar-b1emploi-projet-cause-consequence",
              label: "Connecteurs de cause et de consequence"
            },
            { id: "grammar-b1emploi-projet-subjonctif", label: "Le subjonctif present" }
          ]
        },
        {
          id: "theme-b1emploi-communication-travail",
          themeLabel: "Communication au travail",
          notes:
            "Comprendre des echanges courants, interagir et adapter son discours.",
          grammarPoints: [
            { id: "grammar-b1emploi-communication-imperatif", label: "L'imperatif" },
            {
              id: "grammar-b1emploi-communication-politesse",
              label: "Formes de politesse et d'attenuation"
            },
            {
              id: "grammar-b1emploi-communication-pronoms-cod-coi",
              label: "Revision des pronoms COD et COI"
            },
            { id: "grammar-b1emploi-communication-subjonctif", label: "Le subjonctif present" }
          ]
        },
        {
          id: "theme-b1emploi-equipe-relations",
          themeLabel: "Relations professionnelles et travail en equipe",
          notes:
            "Exprimer son opinion, participer a un echange collectif et comparer.",
          grammarPoints: [
            {
              id: "grammar-b1emploi-equipe-opinion",
              label: "Expression de l'opinion: je pense que, a mon avis"
            },
            { id: "grammar-b1emploi-equipe-comparatif", label: "Comparatif et superlatif" },
            {
              id: "grammar-b1emploi-equipe-opposition",
              label: "Connecteurs d'opposition"
            }
          ]
        },
        {
          id: "theme-b1emploi-ecrits-professionnels",
          themeLabel: "Ecrits professionnels",
          notes:
            "Rediger des messages simples et coherents en adaptant le registre.",
          grammarPoints: [
            {
              id: "grammar-b1emploi-ecrits-phrase-complexe",
              label: "Structure de la phrase complexe simple"
            },
            {
              id: "grammar-b1emploi-ecrits-connecteurs",
              label: "Connecteurs logiques d'organisation"
            },
            {
              id: "grammar-b1emploi-ecrits-temps-verbaux",
              label: "Revision des temps verbaux"
            }
          ]
        },
        {
          id: "theme-b1emploi-droits-cadre",
          themeLabel: "Droits et cadre du travail",
          notes:
            "Comprendre des documents professionnels, identifier droits et obligations.",
          grammarPoints: [
            {
              id: "grammar-b1emploi-droits-obligation-interdiction",
              label: "Obligation et interdiction"
            },
            {
              id: "grammar-b1emploi-droits-relatifs-simples",
              label: "Pronoms relatifs simples: qui, que, ou"
            },
            {
              id: "grammar-b1emploi-droits-justification",
              label: "Justification: parce que, puisque"
            }
          ]
        },
        {
          id: "theme-b1emploi-imprevus",
          themeLabel: "Gerer les imprevus au travail",
          notes:
            "Decrire un probleme, expliquer une situation et proposer une solution.",
          grammarPoints: [
            {
              id: "grammar-b1emploi-imprevus-conditionnel-suggestion",
              label: "Conditionnel de suggestion"
            },
            {
              id: "grammar-b1emploi-imprevus-cause-consequence",
              label: "Expression de la cause et de la consequence"
            },
            { id: "grammar-b1emploi-imprevus-reformulation", label: "La reformulation" }
          ]
        },
        {
          id: "theme-b1emploi-qualites-posture",
          themeLabel: "Qualites professionnelles et posture",
          notes:
            "Decrire ses competences, valoriser son profil et comprendre les attentes.",
          grammarPoints: [
            { id: "grammar-b1emploi-qualites-adjectifs", label: "Les adjectifs qualificatifs" },
            {
              id: "grammar-b1emploi-qualites-capacite",
              label: "Expression de la capacite: savoir, pouvoir"
            },
            { id: "grammar-b1emploi-qualites-comparaison", label: "La comparaison" }
          ]
        },
        {
          id: "theme-b1emploi-entretien",
          themeLabel: "Entretien d'embauche",
          notes:
            "Comprendre des questions, repondre de maniere structuree et argumenter.",
          grammarPoints: [
            {
              id: "grammar-b1emploi-entretien-passe-futur",
              label: "Revision des temps du passe et du futur"
            },
            {
              id: "grammar-b1emploi-entretien-opinion-justification",
              label: "Expression de l'opinion et de la justification"
            },
            { id: "grammar-b1emploi-entretien-connecteurs", label: "Connecteurs logiques" }
          ]
        },
        {
          id: "theme-b1emploi-argumenter-convaincre",
          themeLabel: "Argumenter et convaincre",
          notes:
            "Exprimer, justifier, comparer des solutions et defendre un point de vue.",
          grammarPoints: [
            { id: "grammar-b1emploi-argumenter-opinion", label: "Expression de l'opinion" },
            { id: "grammar-b1emploi-argumenter-conditionnel", label: "Le conditionnel" },
            {
              id: "grammar-b1emploi-argumenter-connecteurs-avances",
              label: "Connecteurs logiques avances"
            }
          ]
        },
        {
          id: "theme-b1emploi-autonomie",
          themeLabel: "Autonomie au travail",
          notes:
            "Comprendre des discours plus longs, reformuler et gagner en autonomie.",
          grammarPoints: [
            { id: "grammar-b1emploi-autonomie-reformulation", label: "La reformulation" },
            {
              id: "grammar-b1emploi-autonomie-discours-indirect",
              label: "Le discours indirect simple"
            },
            { id: "grammar-b1emploi-autonomie-revision-b1", label: "Revision globale B1" }
          ]
        },
        {
          id: "theme-b1emploi-certification-bilan",
          themeLabel: "Certification, bilan et insertion",
          notes:
            "Consolider les acquis, preparer une certification et faire le bilan du parcours.",
          grammarPoints: [
            {
              id: "grammar-b1emploi-certification-revision",
              label: "Revision globale des structures B1"
            },
            {
              id: "grammar-b1emploi-certification-coherence",
              label: "Coherence et structuration du discours"
            },
            { id: "grammar-b1emploi-certification-synthese", label: "La synthese" }
          ]
        }
      ]
    },
    {
      id: "program-b1-b2",
      label: "B1-B2",
      notes:
        "Séquence initiale dérivée de l'export Modules B1-B2. Les entrées incomplètes sont conservées comme thèmes éditables.",
      sequence: [
        {
          id: "theme-b1b2-loisirs",
          themeLabel: "Les loisirs",
          notes: "Loisirs en France, sport, vacances, jeux, culture et détente.",
          grammarPoints: [
            { id: "grammar-b1b2-loisirs-pronoms-possessifs", label: "Pronoms possessifs" },
            { id: "grammar-b1b2-loisirs-pronoms-demonstratifs", label: "Pronoms démonstratifs" },
            { id: "grammar-b1b2-loisirs-determinants", label: "Déterminants définis, indéfinis et partitifs" }
          ]
        },
        {
          id: "theme-b1b2-logement",
          themeLabel: "Le logement",
          notes:
            "Types de logement, habitats connectés, location, petites annonces et garantie Visale.",
          grammarPoints: [
            { id: "grammar-b1b2-logement-interrogation", label: "Interrogation directe et indirecte" },
            { id: "grammar-b1b2-logement-relatifs-simples", label: "Pronoms relatifs simples" },
            { id: "grammar-b1b2-logement-relatifs-composes", label: "Pronoms relatifs composés" }
          ]
        },
        {
          id: "theme-b1b2-litterature",
          themeLabel: "La littérature",
          notes:
            "Genres, publication, auteurs, prix littéraires et accès à la culture littéraire.",
          grammarPoints: [
            { id: "grammar-b1b2-litterature-discours-indirect", label: "Discours indirect au présent" },
            { id: "grammar-b1b2-litterature-mise-relief", label: "Mise en relief" },
            { id: "grammar-b1b2-litterature-chronologie", label: "Articulateurs chronologiques du discours" }
          ]
        },
        {
          id: "theme-b1b2-etudes-superieures",
          themeLabel: "Les études supérieures",
          notes:
            "Formations, vie étudiante, CROUS, bourses, ERASMUS et rencontres universitaires.",
          grammarPoints: [
            { id: "grammar-b1b2-etudes-temps-simples", label: "Révision des temps simples et du passé composé" },
            { id: "grammar-b1b2-etudes-futur", label: "Futur proche et futur simple" }
          ]
        },
        {
          id: "theme-b1b2-candidature",
          themeLabel: "Réussir sa candidature",
          notes: "CV, lettre de motivation, entretien d'embauche et communication professionnelle.",
          grammarPoints: [
            { id: "grammar-b1b2-candidature-logiques", label: "Articulations logiques simples" },
            { id: "grammar-b1b2-candidature-accord", label: "Accord du participe passé avec être et avoir" }
          ]
        },
        {
          id: "theme-b1b2-cinema",
          themeLabel: "Le cinéma",
          notes: "Cinéma français, festivals, bandes annonces et droits humains.",
          grammarPoints: [
            { id: "grammar-b1b2-cinema-comparatif-superlatif", label: "Comparatif et superlatif des adjectifs et adverbes" },
            { id: "grammar-b1b2-cinema-point-vue", label: "Donner son point de vue" },
            { id: "grammar-b1b2-cinema-pronoms-toniques", label: "Pronoms toniques" }
          ]
        },
        {
          id: "theme-b1b2-medias",
          themeLabel: "Les médias",
          notes: "Radio, télévision, presse écrite, presse en ligne, réseaux sociaux et fake news.",
          grammarPoints: [
            { id: "grammar-b1b2-medias-articles-contractes", label: "Articles contractés" },
            { id: "grammar-b1b2-medias-point-vue", label: "Défendre un point de vue" },
            { id: "grammar-b1b2-medias-nominalisation", label: "La nominalisation" }
          ]
        },
        {
          id: "theme-b1b2-sante",
          themeLabel: "Santé",
          notes: "Sécurité sociale, complémentaire santé, symptômes, médicaments et établissements.",
          grammarPoints: [
            { id: "grammar-b1b2-sante-conditionnel-present", label: "Conditionnel présent" },
            { id: "grammar-b1b2-sante-priere", label: "Conditionnel ou impératif pour la prière" },
            { id: "grammar-b1b2-sante-conseil", label: "Conseil avec conditionnel et il faut que + subjonctif" }
          ]
        },
        {
          id: "theme-b1b2-histoire",
          themeLabel: "Les grands repères historiques",
          notes: "Histoire de France, Révolution, Républiques, Front populaire et présidents.",
          grammarPoints: [
            { id: "grammar-b1b2-histoire-nombres", label: "Chiffres, nombres, chiffres romains et dates" },
            { id: "grammar-b1b2-histoire-temps-passe", label: "Révision passé composé et imparfait" },
            { id: "grammar-b1b2-histoire-plus-que-parfait", label: "Plus-que-parfait" },
            { id: "grammar-b1b2-histoire-passe-simple", label: "Passé simple en réception" }
          ]
        },
        {
          id: "theme-b1b2-economie",
          themeLabel: "Commerce et économie",
          notes: "Consommation, commerce en ligne, système économique, INSEE et inégalités.",
          grammarPoints: [
            { id: "grammar-b1b2-economie-negation", label: "Négation et restriction" },
            { id: "grammar-b1b2-economie-impersonnelles", label: "Tournures impersonnelles simples" }
          ]
        },
        {
          id: "theme-b1b2-politique",
          themeLabel: "Le système politique",
          notes: "Institutions, pouvoir exécutif, législatif et judiciaire, vote et suffrage.",
          grammarPoints: [
            { id: "grammar-b1b2-politique-passif", label: "La voix passive" },
            { id: "grammar-b1b2-politique-plus-que-parfait", label: "Plus-que-parfait et concordance des temps" }
          ]
        },
        {
          id: "theme-b1b2-ecologie",
          themeLabel: "L'écologie",
          notes: "Dangers, solutions, protection, énergie et énergie nucléaire.",
          grammarPoints: [
            { id: "grammar-b1b2-ecologie-hypothese-certaine", label: "Hypothèse certaine: si + présent, futur" },
            { id: "grammar-b1b2-ecologie-hypothese-incertaine", label: "Hypothèse incertaine: si + imparfait, conditionnel" }
          ]
        },
        {
          id: "theme-b1b2-gastronomie",
          themeLabel: "La gastronomie",
          notes: "Repas, restaurant, spécialités régionales, vin, fromage et bonnes manières.",
          grammarPoints: [
            { id: "grammar-b1b2-gastronomie-y-en", label: "Pronoms compléments y et en" },
            { id: "grammar-b1b2-gastronomie-relatifs-composes", label: "Pronoms relatifs composés" },
            { id: "grammar-b1b2-gastronomie-verbes-preposition", label: "Verbes accompagnés de préposition" },
            { id: "grammar-b1b2-gastronomie-modalite", label: "Modalité: falloir, devoir, pouvoir + infinitif" }
          ]
        },
        {
          id: "theme-b1b2-transports",
          themeLabel: "Les transports propres",
          notes: "Mobilité durable, politiques publiques, avantages et limites des transports.",
          grammarPoints: [
            { id: "grammar-b1b2-transports-cause", label: "Expression de la cause et de ses nuances" }
          ]
        },
        {
          id: "theme-b1b2-medecines",
          themeLabel: "Les médecines alternatives",
          notes: "Médecines douces, symptômes, avis et expériences personnelles.",
          grammarPoints: [
            { id: "grammar-b1b2-medecines-subjonctif", label: "Subjonctif pour une action antérieure" },
            { id: "grammar-b1b2-medecines-impersonnelles", label: "Formes impersonnelles" }
          ]
        },
        {
          id: "theme-b1b2-republique",
          themeLabel: "Liberté, égalité, fraternité",
          notes: "Valeurs républicaines, citoyenneté, laïcité et lutte contre les discriminations.",
          grammarPoints: [
            { id: "grammar-b1b2-republique-revision", label: "Révision et remédiation des points déjà abordés" }
          ]
        },
        {
          id: "theme-b1b2-parite",
          themeLabel: "La parité",
          notes: "Évolution de la parité et figures importantes.",
          grammarPoints: [
            { id: "grammar-b1b2-parite-gerondif", label: "Gérondif et participe présent" },
            { id: "grammar-b1b2-parite-suppression-sujet", label: "Suppression du sujet grammatical dans certaines expressions" }
          ]
        },
        {
          id: "theme-b1b2-associative",
          themeLabel: "La vie associative",
          notes: "Associations françaises, internationales et locales; bénévolat et missions.",
          grammarPoints: [
            { id: "grammar-b1b2-associative-conditionnel", label: "Conditionnel présent et passé" },
            { id: "grammar-b1b2-associative-cause-consequence-but", label: "Cause, conséquence et but" }
          ]
        },
        {
          id: "theme-b1b2-tourisme",
          themeLabel: "Le tourisme",
          notes: "Tourisme en France, vacances des Français, Hauts-de-France et tourisme durable.",
          grammarPoints: [
            {
              id: "grammar-b1b2-tourisme-revision",
              label: "Révision à préciser",
              notes:
                "Le rattachement grammatical de l'export source était ambigu; à valider par l'équipe."
            }
          ]
        },
        {
          id: "theme-b1b2-numerique",
          themeLabel: "Le monde numérique",
          notes: "Internet, piratage, métiers du numérique, dangers des écrans et réseaux sociaux.",
          grammarPoints: [
            { id: "grammar-b1b2-numerique-devoir", label: "Devoir + infinitif" },
            { id: "grammar-b1b2-numerique-pouvoir", label: "Pouvoir + infinitif" }
          ]
        },
        {
          id: "theme-b1b2-sport",
          themeLabel: "Sport",
          notes: "Sports pratiqués en France, sports collectifs et individuels, Jeux olympiques.",
          grammarPoints: [
            { id: "grammar-b1b2-sport-hypothese-certaine", label: "Hypothèse certaine: si + présent, futur ou impératif" },
            { id: "grammar-b1b2-sport-hypothese-incertaine", label: "Hypothèse incertaine: si + imparfait, conditionnel" },
            { id: "grammar-b1b2-sport-regret", label: "Hypothèse non réalisée: regret" }
          ]
        },
        {
          id: "theme-b1b2-art",
          themeLabel: "Analyse d'une œuvre d'art",
          notes: "Décrire, interpréter et argumenter autour d'une œuvre.",
          grammarPoints: [
            { id: "grammar-b1b2-art-comparaison", label: "Comparaison: supériorité, infériorité, égalité et progression" },
            { id: "grammar-b1b2-art-prepositions-lieu", label: "Prépositions de lieu et de situation" }
          ]
        },
        {
          id: "theme-b1b2-meteo",
          themeLabel: "Météo et phénomènes naturels",
          notes: "Météo, printemps, prévisions, souhaits et préférences.",
          grammarPoints: [
            { id: "grammar-b1b2-meteo-condition", label: "Condition et hypothèse avec si, conjonctions, prépositions et gérondif" }
          ]
        },
        {
          id: "theme-b1b2-monde-professionnel",
          themeLabel: "Le monde professionnel",
          notes: "Entreprise, catégories socioprofessionnelles, retraites, salaires et portfolio.",
          grammarPoints: [
            { id: "grammar-b1b2-pro-futur-simple", label: "Futur simple et expressions de temps" },
            { id: "grammar-b1b2-pro-futur-proche", label: "Futur proche" },
            { id: "grammar-b1b2-pro-conditionnel", label: "Conditionnel présent" }
          ]
        }
      ]
    }
  ]
};

export const sourceImportNotes = [
  "A0-A1 est traite comme une progression pedagogique pre-A1 -> A1, coherente avec le cadrage CECRL.",
  "A1-A2 fournit une base editable de consolidation avant les progressions issues des exports.",
  "Les exports fournis ont ete interpretes comme listes ordonnees de themes, non comme calendrier.",
  "A2 vers l'emploi et B1 vers l'emploi sont derives de la synthese transmise, comme bases professionnalisantes editables.",
  "Les lignes de jalons calendaires ne sont pas injectees comme themes pedagogiques.",
  "Les objectifs grammaticaux ambigus restent editables et sont signales dans les notes du point concerne."
];
