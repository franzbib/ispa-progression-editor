import { ProgressionDoc } from "@/lib/types/progression";

export function exportToMarkdown(doc: ProgressionDoc): string {
  const lines = [
    "# Progressions FLE / F.O.U.",
    "",
    `Schema: ${doc.schemaVersion}`,
    `Export: ${doc.metadata.exportedAt}`,
    ""
  ];

  for (const program of doc.programs) {
    lines.push(`## ${program.label}`, "");

    if (program.notes) {
      lines.push(program.notes, "");
    }

    if (program.sequence.length === 0) {
      lines.push("_Aucun theme pour ce programme._", "");
      continue;
    }

    for (const [themeIndex, theme] of program.sequence.entries()) {
      lines.push(`### ${themeIndex + 1}. ${theme.themeLabel}`);

      if (theme.notes) {
        lines.push("", theme.notes);
      }

      if (theme.grammarPoints.length === 0) {
        lines.push("", "- Aucun point de grammaire rattache.");
      } else {
        lines.push("");
        for (const point of theme.grammarPoints) {
          const notes = point.notes ? ` - ${point.notes}` : "";
          lines.push(`- ${point.label}${notes}`);
        }
      }

      lines.push("");
    }
  }

  return lines.join("\n").trimEnd() + "\n";
}
