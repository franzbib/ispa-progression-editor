import { ProgressionDoc } from "@/lib/types/progression";

export const sampleProgressionDoc: ProgressionDoc = {
  schemaVersion: "1.0",
  metadata: {
    exportedAt: "2026-04-13T00:00:00.000Z",
    appVersion: "0.1.0",
    source: "exports A2-B1 et B1-B2 fournis, dates ignorees"
  },
  programs: [
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
  "Les exports fournis ont ete interpretes comme listes ordonnees de themes, non comme calendrier.",
  "Les lignes de jalons calendaires ne sont pas injectees comme themes pedagogiques.",
  "Les objectifs grammaticaux ambigus restent editables et sont signales dans les notes du point concerne."
];
