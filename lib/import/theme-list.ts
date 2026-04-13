import { createId } from "@/lib/id";
import { ImportReport, Theme } from "@/lib/types/progression";

const MILESTONE_PATTERNS = [
  /vacances/i,
  /exam/i,
  /examen/i,
  /immersion/i,
  /orientation/i,
  /rattrapage/i,
  /ferie/i,
  /férié/i
];

export function importThemesFromPlainText(input: string): {
  themes: Theme[];
  report: ImportReport;
} {
  const issues: ImportReport["issues"] = [];
  const themes: Theme[] = [];

  const lines = input
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*0-9.\s]+/, "").trim())
    .filter(Boolean);

  for (const line of lines) {
    if (MILESTONE_PATTERNS.some((pattern) => pattern.test(line))) {
      issues.push({
        level: "info",
        message: `Jalon ignore: "${line}". Il n'est pas traite comme un theme pedagogique.`
      });
      continue;
    }

    themes.push({
      id: createId("theme"),
      themeLabel: line,
      grammarPoints: []
    });
  }

  if (themes.length === 0) {
    issues.push({
      level: "warning",
      message: "Aucun theme exploitable n'a ete trouve dans la liste collee."
    });
  }

  return {
    themes,
    report: {
      title: "Import assiste depuis liste de themes",
      issues
    }
  };
}
