import { cefrGrammarBankByProgram, CefrGrammarRecommendation } from "@/data/cefr-grammar-bank";
import { Program, Theme } from "@/lib/types/progression";

export type GrammarRecommendationStatus = "in-selected-theme" | "in-program" | "absent";

export function getRecommendationsForProgram(programId: string): CefrGrammarRecommendation[] {
  return cefrGrammarBankByProgram[programId] ?? [];
}

export function normalizeGrammarLabel(label: string): string {
  return label
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\u00a0/g, " ")
    .replace(/\s*…\s*/g, "...")
    .replace(/\s*\.{3}\s*/g, "...")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("fr");
}

export function getRecommendationStatus(
  program: Program,
  label: string,
  selectedThemeId?: string
): GrammarRecommendationStatus {
  const normalizedLabel = normalizeGrammarLabel(label);
  const selectedTheme = selectedThemeId
    ? program.sequence.find((theme) => theme.id === selectedThemeId)
    : undefined;

  if (selectedTheme && themeContainsGrammarLabel(selectedTheme, normalizedLabel)) {
    return "in-selected-theme";
  }

  if (program.sequence.some((theme) => themeContainsGrammarLabel(theme, normalizedLabel))) {
    return "in-program";
  }

  return "absent";
}

export function themeContainsGrammarLabel(theme: Theme, labelOrNormalizedLabel: string): boolean {
  const normalizedLabel = normalizeGrammarLabel(labelOrNormalizedLabel);
  return theme.grammarPoints.some(
    (point) => normalizeGrammarLabel(point.label) === normalizedLabel
  );
}

export function filterRecommendations(
  recommendations: CefrGrammarRecommendation[],
  query: string
): CefrGrammarRecommendation[] {
  const normalizedQuery = normalizeGrammarLabel(query);

  if (!normalizedQuery) {
    return recommendations;
  }

  return recommendations.filter((recommendation) => {
    const haystack = [
      recommendation.label,
      recommendation.category,
      recommendation.notes ?? "",
      ...(recommendation.tags ?? [])
    ]
      .map(normalizeGrammarLabel)
      .join(" ");

    return haystack.includes(normalizedQuery);
  });
}
