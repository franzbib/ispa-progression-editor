import { z } from "zod";

export const GrammarPointSchema = z
  .object({
    id: z.string().min(1, "Chaque point de grammaire doit avoir un identifiant."),
    label: z.string().min(1, "Le libelle du point de grammaire est obligatoire."),
    notes: z.string().optional(),
    tags: z.array(z.string().min(1)).optional()
  })
  .strict();

export const ThemeSchema = z
  .object({
    id: z.string().min(1, "Chaque theme doit avoir un identifiant."),
    themeLabel: z.string().min(1, "Le libelle du theme est obligatoire."),
    notes: z.string().optional(),
    grammarPoints: z.array(GrammarPointSchema)
  })
  .strict();

export const ProgramSchema = z
  .object({
    id: z.string().min(1, "Chaque programme doit avoir un identifiant."),
    label: z.string().min(1, "Le libelle du programme est obligatoire."),
    notes: z.string().optional(),
    sequence: z.array(ThemeSchema)
  })
  .strict();

export const ProgressionMetadataSchema = z
  .object({
    exportedAt: z.string().min(1, "La date d'export est obligatoire."),
    appVersion: z.string().optional(),
    source: z.string().optional()
  })
  .strict();

export const ProgressionDocSchema = z
  .object({
    schemaVersion: z.literal("1.0"),
    metadata: ProgressionMetadataSchema,
    programs: z.array(ProgramSchema).min(1, "Le document doit contenir au moins un programme.")
  })
  .strict()
  .superRefine((doc, ctx) => {
    const seen = new Set<string>();

    for (const [programIndex, program] of doc.programs.entries()) {
      reportDuplicateId(program.id, `programs.${programIndex}.id`, seen, ctx);

      for (const [themeIndex, theme] of program.sequence.entries()) {
        reportDuplicateId(
          theme.id,
          `programs.${programIndex}.sequence.${themeIndex}.id`,
          seen,
          ctx
        );

        for (const [grammarIndex, point] of theme.grammarPoints.entries()) {
          reportDuplicateId(
            point.id,
            `programs.${programIndex}.sequence.${themeIndex}.grammarPoints.${grammarIndex}.id`,
            seen,
            ctx
          );
        }
      }
    }
  });

function reportDuplicateId(
  id: string,
  path: string,
  seen: Set<string>,
  ctx: z.RefinementCtx
) {
  if (seen.has(id)) {
    ctx.addIssue({
      code: "custom",
      message: `Identifiant duplique: ${id}`,
      path: path.split(".")
    });
    return;
  }

  seen.add(id);
}

export type GrammarPoint = z.infer<typeof GrammarPointSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type Program = z.infer<typeof ProgramSchema>;
export type ProgressionMetadata = z.infer<typeof ProgressionMetadataSchema>;
export type ProgressionDoc = z.infer<typeof ProgressionDocSchema>;

export type ImportIssueLevel = "info" | "warning" | "error";

export interface ImportIssue {
  level: ImportIssueLevel;
  message: string;
}

export interface ImportReport {
  title: string;
  issues: ImportIssue[];
}

export interface ValidationSuccess {
  success: true;
  data: ProgressionDoc;
}

export interface ValidationFailure {
  success: false;
  errors: string[];
}

export type ValidationResult = ValidationSuccess | ValidationFailure;
