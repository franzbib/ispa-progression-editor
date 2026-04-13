import { Program, ProgressionDoc } from "@/lib/types/progression";

export function withExportMetadata(doc: ProgressionDoc): ProgressionDoc {
  return {
    ...doc,
    metadata: {
      ...doc.metadata,
      exportedAt: new Date().toISOString(),
      appVersion: doc.metadata.appVersion ?? "0.1.0"
    }
  };
}

export function replaceProgramInDoc(doc: ProgressionDoc, programId: string, programUpdater: (programIndex: number) => ProgressionDoc["programs"][number]): ProgressionDoc {
  return {
    ...doc,
    programs: doc.programs.map((program, index) =>
      program.id === programId ? programUpdater(index) : program
    )
  };
}

export function hashProgressionDoc(doc: ProgressionDoc): string {
  return JSON.stringify(doc);
}

export function mergeMissingDefaultPrograms(
  doc: ProgressionDoc,
  defaults: ProgressionDoc
): ProgressionDoc {
  const existingById = new Map(doc.programs.map((program) => [program.id, program]));
  const defaultIds = new Set(defaults.programs.map((program) => program.id));
  const programs: Program[] = [
    ...defaults.programs.map((program) => existingById.get(program.id) ?? program),
    ...doc.programs.filter((program) => !defaultIds.has(program.id))
  ];

  return {
    ...doc,
    programs
  };
}
