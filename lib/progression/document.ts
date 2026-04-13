import { ProgressionDoc } from "@/lib/types/progression";

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
