import { UniqueIdentifier } from "@dnd-kit/core";
import { Program } from "@/lib/types/progression";

const THEME_PREFIX = "theme:";
const GRAMMAR_PREFIX = "grammar:";
const GRAMMAR_LIST_PREFIX = "grammar-list:";

export type ParsedDragId =
  | { kind: "theme"; id: string }
  | { kind: "grammar"; id: string }
  | { kind: "grammar-list"; themeId: string };

export function themeDragId(themeId: string): string {
  return `${THEME_PREFIX}${themeId}`;
}

export function grammarDragId(grammarId: string): string {
  return `${GRAMMAR_PREFIX}${grammarId}`;
}

export function grammarListDragId(themeId: string): string {
  return `${GRAMMAR_LIST_PREFIX}${themeId}`;
}

export function parseDragId(id: UniqueIdentifier): ParsedDragId | null {
  const value = String(id);

  if (value.startsWith(THEME_PREFIX)) {
    return { kind: "theme", id: value.slice(THEME_PREFIX.length) };
  }

  if (value.startsWith(GRAMMAR_PREFIX)) {
    return { kind: "grammar", id: value.slice(GRAMMAR_PREFIX.length) };
  }

  if (value.startsWith(GRAMMAR_LIST_PREFIX)) {
    return { kind: "grammar-list", themeId: value.slice(GRAMMAR_LIST_PREFIX.length) };
  }

  return null;
}

export function findGrammarLocation(program: Program, grammarPointId: string) {
  for (const theme of program.sequence) {
    const index = theme.grammarPoints.findIndex((point) => point.id === grammarPointId);

    if (index >= 0) {
      return {
        themeId: theme.id,
        index
      };
    }
  }

  return null;
}
