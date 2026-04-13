import { GrammarPoint, Program, Theme } from "@/lib/types/progression";

export class ProgressionOperationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProgressionOperationError";
  }
}

export function reorderThemes(program: Program, fromIndex: number, toIndex: number): Program {
  return {
    ...program,
    sequence: arrayMoveStrict(program.sequence, fromIndex, toIndex, "theme")
  };
}

export function reorderGrammarPoint(
  theme: Theme,
  fromIndex: number,
  toIndex: number
): Theme {
  return {
    ...theme,
    grammarPoints: arrayMoveStrict(theme.grammarPoints, fromIndex, toIndex, "point de grammaire")
  };
}

export function moveGrammarPointBetweenThemes(
  program: Program,
  sourceThemeId: string,
  targetThemeId: string,
  sourceIndex: number,
  targetIndex: number
): Program {
  const sourceTheme = findTheme(program, sourceThemeId);
  const targetTheme = findTheme(program, targetThemeId);

  assertIndex(sourceTheme.grammarPoints, sourceIndex, "point de grammaire source");

  if (sourceThemeId === targetThemeId) {
    return {
      ...program,
      sequence: program.sequence.map((theme) =>
        theme.id === sourceThemeId
          ? reorderGrammarPoint(theme, sourceIndex, clampInsertIndex(theme.grammarPoints, targetIndex))
          : theme
      )
    };
  }

  const point = sourceTheme.grammarPoints[sourceIndex];
  const insertionIndex = clampInsertIndex(targetTheme.grammarPoints, targetIndex);

  return {
    ...program,
    sequence: program.sequence.map((theme) => {
      if (theme.id === sourceThemeId) {
        return {
          ...theme,
          grammarPoints: removeAt(theme.grammarPoints, sourceIndex)
        };
      }

      if (theme.id === targetThemeId) {
        return {
          ...theme,
          grammarPoints: insertAt(theme.grammarPoints, insertionIndex, point)
        };
      }

      return theme;
    })
  };
}

export function renameTheme(program: Program, themeId: string, newLabel: string): Program {
  const label = normalizeEditableLabel(newLabel, "Le theme ne peut pas etre vide.");
  assertThemeExists(program, themeId);

  return {
    ...program,
    sequence: program.sequence.map((theme) =>
      theme.id === themeId ? { ...theme, themeLabel: label } : theme
    )
  };
}

export function renameGrammarPoint(
  program: Program,
  themeId: string,
  grammarPointId: string,
  newLabel: string
): Program {
  const label = normalizeEditableLabel(newLabel, "Le point de grammaire ne peut pas etre vide.");
  const theme = findTheme(program, themeId);

  if (!theme.grammarPoints.some((point) => point.id === grammarPointId)) {
    throw new ProgressionOperationError("Point de grammaire introuvable dans ce theme.");
  }

  return {
    ...program,
    sequence: program.sequence.map((candidate) =>
      candidate.id === themeId
        ? {
            ...candidate,
            grammarPoints: candidate.grammarPoints.map((point) =>
              point.id === grammarPointId ? { ...point, label } : point
            )
          }
        : candidate
    )
  };
}

export function updateThemeNotes(program: Program, themeId: string, notes: string): Program {
  assertThemeExists(program, themeId);

  return {
    ...program,
    sequence: program.sequence.map((theme) =>
      theme.id === themeId ? { ...theme, notes } : theme
    )
  };
}

export function addTheme(program: Program, theme: Theme): Program {
  return {
    ...program,
    sequence: [...program.sequence, theme]
  };
}

export function removeTheme(program: Program, themeId: string): Program {
  assertThemeExists(program, themeId);

  return {
    ...program,
    sequence: program.sequence.filter((theme) => theme.id !== themeId)
  };
}

export function addGrammarPoint(program: Program, themeId: string, point: GrammarPoint): Program {
  assertThemeExists(program, themeId);

  return {
    ...program,
    sequence: program.sequence.map((theme) =>
      theme.id === themeId
        ? {
            ...theme,
            grammarPoints: [...theme.grammarPoints, point]
          }
        : theme
    )
  };
}

export function removeGrammarPoint(
  program: Program,
  themeId: string,
  grammarPointId: string
): Program {
  const theme = findTheme(program, themeId);

  if (!theme.grammarPoints.some((point) => point.id === grammarPointId)) {
    throw new ProgressionOperationError("Point de grammaire introuvable dans ce theme.");
  }

  return {
    ...program,
    sequence: program.sequence.map((candidate) =>
      candidate.id === themeId
        ? {
            ...candidate,
            grammarPoints: candidate.grammarPoints.filter((point) => point.id !== grammarPointId)
          }
        : candidate
    )
  };
}

export function updateProgram(programs: Program[], programId: string, nextProgram: Program): Program[] {
  if (!programs.some((program) => program.id === programId)) {
    throw new ProgressionOperationError("Programme introuvable.");
  }

  return programs.map((program) => (program.id === programId ? nextProgram : program));
}

function arrayMoveStrict<T>(items: T[], fromIndex: number, toIndex: number, label: string): T[] {
  assertIndex(items, fromIndex, `${label} source`);
  assertIndex(items, toIndex, `${label} cible`);

  if (fromIndex === toIndex) {
    return [...items];
  }

  const copy = [...items];
  const [moved] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, moved);
  return copy;
}

function removeAt<T>(items: T[], index: number): T[] {
  return items.filter((_, candidateIndex) => candidateIndex !== index);
}

function insertAt<T>(items: T[], index: number, item: T): T[] {
  const copy = [...items];
  copy.splice(index, 0, item);
  return copy;
}

function assertThemeExists(program: Program, themeId: string): void {
  findTheme(program, themeId);
}

function findTheme(program: Program, themeId: string): Theme {
  const theme = program.sequence.find((candidate) => candidate.id === themeId);

  if (!theme) {
    throw new ProgressionOperationError("Theme introuvable.");
  }

  return theme;
}

function assertIndex<T>(items: T[], index: number, label: string): void {
  if (!Number.isInteger(index) || index < 0 || index >= items.length) {
    throw new ProgressionOperationError(`Index de ${label} invalide.`);
  }
}

function clampInsertIndex<T>(items: T[], index: number): number {
  if (!Number.isInteger(index)) {
    throw new ProgressionOperationError("Index cible invalide.");
  }

  return Math.max(0, Math.min(index, items.length));
}

function normalizeEditableLabel(label: string, message: string): string {
  const nextLabel = label.trim();

  if (!nextLabel) {
    throw new ProgressionOperationError(message);
  }

  return nextLabel;
}
