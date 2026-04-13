import { createId } from "@/lib/id";
import { ProgressionDoc, ImportReport } from "@/lib/types/progression";
import { validateProgressionDoc } from "@/lib/validators/progression";

export interface MigrationResult {
  success: boolean;
  doc?: ProgressionDoc;
  report: ImportReport;
}

export function migrateLegacyToV1(input: unknown): MigrationResult {
  const canonical = validateProgressionDoc(input);

  if (canonical.success) {
    return {
      success: true,
      doc: canonical.data,
      report: {
        title: "Import JSON canonique",
        issues: [{ level: "info", message: "Document ProgressionDoc v1 valide." }]
      }
    };
  }

  if (!isRecord(input)) {
    return failedMigration("Le fichier importe n'est pas un objet JSON exploitable.");
  }

  if (typeof input.schemaVersion === "string" && input.schemaVersion !== "1.0") {
    return failedMigration(
      `Version de schema non prise en charge: ${input.schemaVersion}. Une migration explicite est necessaire.`
    );
  }

  const themes = readLegacyThemes(input);
  const cells = isRecord(input.cells) ? input.cells : undefined;
  const customLabels = isRecord(input.custom) ? input.custom : {};

  if (themes.length === 0) {
    return failedMigration(
      "Format legacy non reconnu: impossible de trouver une liste de themes ou de lignes."
    );
  }

  const issues: ImportReport["issues"] = [
    {
      level: "warning",
      message:
        "Format legacy converti depuis une logique de grille. Verifiez les rattachements ambigus avant usage."
    }
  ];

  const sequence = themes.map((themeLabel, index) => ({
    id: createId("theme"),
    themeLabel,
    grammarPoints: readGrammarPointsForLegacyRow(cells, customLabels, index).map((label) => ({
      id: createId("grammar"),
      label
    }))
  }));

  const doc: ProgressionDoc = {
    schemaVersion: "1.0",
    metadata: {
      exportedAt: new Date().toISOString(),
      appVersion: "0.1.0",
      source: "legacy-grid"
    },
    programs: [
      {
        id: createId("program"),
        label: readLegacyProgramLabel(input),
        sequence
      }
    ]
  };

  const validation = validateProgressionDoc(doc);

  if (!validation.success) {
    return {
      success: false,
      report: {
        title: "Migration legacy echouee",
        issues: validation.errors.map((message) => ({ level: "error", message }))
      }
    };
  }

  if (!cells) {
    issues.push({
      level: "info",
      message:
        "Aucune cellule legacy n'a ete detectee; seuls les themes ont ete migres."
    });
  }

  return {
    success: true,
    doc: validation.data,
    report: {
      title: "Migration legacy vers ProgressionDoc v1",
      issues
    }
  };
}

function failedMigration(message: string): MigrationResult {
  return {
    success: false,
    report: {
      title: "Migration legacy echouee",
      issues: [{ level: "error", message }]
    }
  };
}

function readLegacyProgramLabel(input: Record<string, unknown>): string {
  const candidates = [input.title, input.label, input.programLabel, input.progressionLabel];
  const value = candidates.find((candidate) => typeof candidate === "string" && candidate.trim());
  return typeof value === "string" ? value.trim() : "Programme importe";
}

function readLegacyThemes(input: Record<string, unknown>): string[] {
  const source = Array.isArray(input.rows)
    ? input.rows
    : Array.isArray(input.themes)
      ? input.themes
      : [];

  return source
    .map((entry) => readLegacyLabel(entry))
    .filter((label): label is string => Boolean(label));
}

function readGrammarPointsForLegacyRow(
  cells: Record<string, unknown> | undefined,
  customLabels: Record<string, unknown>,
  rowIndex: number
): string[] {
  if (!cells) {
    return [];
  }

  const rowNumber = rowIndex + 1;

  return Object.entries(cells)
    .filter(([key]) => key.startsWith(`r${rowNumber}c`) || key.startsWith(`${rowNumber}:`))
    .sort(([left], [right]) => left.localeCompare(right, "fr", { numeric: true }))
    .map(([, value]) => readLegacyLabel(value, customLabels))
    .filter((label): label is string => Boolean(label));
}

function readLegacyLabel(
  entry: unknown,
  customLabels: Record<string, unknown> = {}
): string | undefined {
  if (typeof entry === "string") {
    return resolveCustomLabel(entry, customLabels);
  }

  if (!isRecord(entry)) {
    return undefined;
  }

  const candidates = [entry.label, entry.name, entry.title, entry.text, entry.value];
  const value = candidates.find((candidate) => typeof candidate === "string" && candidate.trim());

  return typeof value === "string" ? resolveCustomLabel(value, customLabels) : undefined;
}

function resolveCustomLabel(value: string, customLabels: Record<string, unknown>): string {
  const trimmed = value.trim();
  const custom = customLabels[trimmed];

  if (typeof custom === "string" && custom.trim()) {
    return custom.trim();
  }

  return trimmed;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
