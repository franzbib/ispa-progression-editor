import {
  ProgressionDoc,
  ProgressionDocSchema,
  ValidationResult
} from "@/lib/types/progression";

export function validateProgressionDoc(input: unknown): ValidationResult {
  const parsed = ProgressionDocSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((issue) => {
        const path = issue.path.length > 0 ? `${issue.path.join(".")} : ` : "";
        return `${path}${issue.message}`;
      })
    };
  }

  return {
    success: true,
    data: parsed.data satisfies ProgressionDoc
  };
}
