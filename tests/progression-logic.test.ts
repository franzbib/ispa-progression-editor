import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sampleProgressionDoc } from "@/data/sample-progressions";
import { SimpleProgramView } from "@/features/progression-editor/components/simple-program-view";
import { exportToCsv } from "@/lib/export/csv";
import { exportToMarkdown } from "@/lib/export/markdown";
import { migrateLegacyToV1 } from "@/lib/import/legacy";
import { mergeMissingDefaultPrograms } from "@/lib/progression/document";
import {
  moveGrammarPointBetweenThemes,
  renameGrammarPoint,
  renameTheme,
  reorderGrammarPoint,
  reorderThemes
} from "@/lib/progression/operations";
import { Program, ProgressionDoc, Theme } from "@/lib/types/progression";
import { validateProgressionDoc } from "@/lib/validators/progression";

describe("progression business operations", () => {
  it("reorders themes without losing their grammar associations", () => {
    const program = makeProgram();
    const original = clone(program);

    const result = reorderThemes(program, 0, 2);

    expect(result.sequence.map((theme) => theme.id)).toEqual(["theme-2", "theme-3", "theme-1"]);
    expect(result.sequence[2].grammarPoints.map((point) => point.id)).toEqual(["grammar-1", "grammar-2"]);
    expect(program).toEqual(original);
  });

  it("reorders grammar points inside one theme while preserving IDs", () => {
    const theme = makeProgram().sequence[0];
    const original = clone(theme);

    const result = reorderGrammarPoint(theme, 0, 1);

    expect(result.grammarPoints.map((point) => point.id)).toEqual(["grammar-2", "grammar-1"]);
    expect(result.grammarPoints.map((point) => point.label)).toEqual(["Passé composé", "Présent"]);
    expect(theme).toEqual(original);
  });

  it("moves grammar points between themes and supports duplicate labels", () => {
    const program = makeProgram();

    const result = moveGrammarPointBetweenThemes(program, "theme-1", "theme-2", 0, 1);

    expect(result.sequence[0].grammarPoints.map((point) => point.id)).toEqual(["grammar-2"]);
    expect(result.sequence[1].grammarPoints.map((point) => point.id)).toEqual([
      "grammar-3",
      "grammar-1"
    ]);
    expect(result.sequence[1].grammarPoints[1].label).toBe("Présent");
    expect(program.sequence[0].grammarPoints.map((point) => point.id)).toEqual([
      "grammar-1",
      "grammar-2"
    ]);
  });

  it("renames a theme without changing its ID", () => {
    const program = makeProgram();

    const result = renameTheme(program, "theme-1", "Se présenter autrement");

    expect(result.sequence[0].id).toBe("theme-1");
    expect(result.sequence[0].themeLabel).toBe("Se présenter autrement");
  });

  it("renames a grammar point without changing its ID", () => {
    const program = makeProgram();

    const result = renameGrammarPoint(program, "theme-1", "grammar-1", "Présent actualisé");

    expect(result.sequence[0].grammarPoints[0].id).toBe("grammar-1");
    expect(result.sequence[0].grammarPoints[0].label).toBe("Présent actualisé");
  });
});

describe("validation and migration", () => {
  it("validates a canonical ProgressionDoc v1", () => {
    const result = validateProgressionDoc(makeDoc());

    expect(result.success).toBe(true);
  });

  it("fails explicitly on invalid schema and duplicate IDs", () => {
    const doc = makeDoc();
    doc.programs[0].sequence[1].id = "theme-1";

    const result = validateProgressionDoc(doc);

    expect(result.success).toBe(false);
    expect(result.success ? [] : result.errors.join(" ")).toContain("Identifiant duplique");
  });

  it("migrates a legacy grid-like export to v1", () => {
    const legacy = {
      title: "A2-B1 legacy",
      rows: [{ label: "Thème A" }, { label: "Thème B" }],
      cells: {
        r1c1: "custom-grammar",
        r2c1: { label: "Conditionnel" }
      },
      custom: {
        "custom-grammar": "Subjonctif"
      }
    };

    const result = migrateLegacyToV1(legacy);

    expect(result.success).toBe(true);
    expect(result.doc?.programs[0].label).toBe("A2-B1 legacy");
    expect(result.doc?.programs[0].sequence[0].grammarPoints[0].label).toBe("Subjonctif");
    expect(result.report.issues.some((issue) => issue.level === "warning")).toBe(true);
  });
});

describe("sample progression data", () => {
  it("contains the four default programs in the expected order", () => {
    expect(sampleProgressionDoc.programs.map((program) => program.id)).toEqual([
      "program-a0-a1",
      "program-a1-a2",
      "program-a2-b1",
      "program-b1-b2"
    ]);
  });

  it("is a valid canonical document with unique IDs", () => {
    const result = validateProgressionDoc(sampleProgressionDoc);
    const ids = collectIds(sampleProgressionDoc);

    expect(result.success).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("adds missing default programs to an older saved document without replacing existing programs", () => {
    const olderDoc: ProgressionDoc = {
      ...sampleProgressionDoc,
      programs: sampleProgressionDoc.programs
        .filter((program) => program.id === "program-a2-b1" || program.id === "program-b1-b2")
        .map((program) =>
          program.id === "program-a2-b1"
            ? { ...program, label: "A2-B1 modifié localement" }
            : program
        )
    };

    const merged = mergeMissingDefaultPrograms(olderDoc, sampleProgressionDoc);

    expect(merged.programs.map((program) => program.id)).toEqual([
      "program-a0-a1",
      "program-a1-a2",
      "program-a2-b1",
      "program-b1-b2"
    ]);
    expect(merged.programs[2].label).toBe("A2-B1 modifié localement");
  });
});

describe("simple printable view", () => {
  it("renders a readable program outline without editing controls", () => {
    const program = sampleProgressionDoc.programs[0];
    const html = renderToStaticMarkup(
      createElement(SimpleProgramView, {
        program,
        onBack: () => undefined,
        onPrint: () => undefined
      })
    );

    expect(html).toContain("A0-A1");
    expect(html).toContain("Saluer et se présenter");
    expect(html).toContain("Les pronoms sujets");
    expect(html).toContain("break-inside-avoid");
    expect(html.indexOf("Saluer et se présenter")).toBeLessThan(
      html.indexOf("Identifier des personnes et des objets")
    );
    expect(html).not.toContain("Ajouter");
    expect(html).not.toContain("Supprimer");
    expect(html).not.toContain("Banque de grammaire");
    expect(html).not.toContain("::");
  });
});

describe("exports", () => {
  it("exports CSV with expected headers and escaped cells", () => {
    const doc = makeDoc();
    doc.programs[0].sequence[0].themeLabel = 'Thème, "démo"';

    const csv = exportToCsv(doc);

    expect(csv.split("\n")[0]).toBe(
      "program_label,theme_index,theme_label,grammar_index,grammar_label,theme_notes,grammar_notes"
    );
    expect(csv).toContain('"Thème, ""démo"""');
  });

  it("exports readable Markdown", () => {
    const markdown = exportToMarkdown(makeDoc());

    expect(markdown).toContain("# Progressions FLE / F.O.U.");
    expect(markdown).toContain("## Programme test");
    expect(markdown).toContain("### 1. Se présenter");
    expect(markdown).toContain("- Présent");
  });
});

function makeDoc(): ProgressionDoc {
  return {
    schemaVersion: "1.0",
    metadata: {
      exportedAt: "2026-04-13T00:00:00.000Z",
      appVersion: "test"
    },
    programs: [makeProgram()]
  };
}

function makeProgram(): Program {
  return {
    id: "program-1",
    label: "Programme test",
    sequence: [
      makeTheme("theme-1", "Se présenter", [
        { id: "grammar-1", label: "Présent" },
        { id: "grammar-2", label: "Passé composé" }
      ]),
      makeTheme("theme-2", "Se présenter", [{ id: "grammar-3", label: "Présent" }]),
      makeTheme("theme-3", "La ville", [])
    ]
  };
}

function makeTheme(id: string, themeLabel: string, grammarPoints: Theme["grammarPoints"]): Theme {
  return {
    id,
    themeLabel,
    grammarPoints
  };
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function collectIds(doc: ProgressionDoc): string[] {
  return doc.programs.flatMap((program) => [
    program.id,
    ...program.sequence.flatMap((theme) => [
      theme.id,
      ...theme.grammarPoints.map((point) => point.id)
    ])
  ]);
}
