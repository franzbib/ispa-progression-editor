import { ProgressionDoc } from "@/lib/types/progression";

export function exportToCsv(doc: ProgressionDoc): string {
  const header = [
    "program_label",
    "theme_index",
    "theme_label",
    "grammar_index",
    "grammar_label",
    "theme_notes",
    "grammar_notes"
  ];

  const rows = doc.programs.flatMap((program) =>
    program.sequence.flatMap((theme, themeIndex) => {
      if (theme.grammarPoints.length === 0) {
        return [
          [
            program.label,
            String(themeIndex + 1),
            theme.themeLabel,
            "",
            "",
            theme.notes ?? "",
            ""
          ]
        ];
      }

      return theme.grammarPoints.map((point, grammarIndex) => [
        program.label,
        String(themeIndex + 1),
        theme.themeLabel,
        String(grammarIndex + 1),
        point.label,
        theme.notes ?? "",
        point.notes ?? ""
      ]);
    })
  );

  return [header, ...rows].map((row) => row.map(escapeCsvCell).join(",")).join("\n");
}

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}
