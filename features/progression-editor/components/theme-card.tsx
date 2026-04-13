"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";
import { FormEvent, useEffect, useState } from "react";
import { GrammarPoint, Program, Theme } from "@/lib/types/progression";
import { grammarDragId, grammarListDragId, themeDragId } from "../lib/drag-ids";
import { EditableText } from "./editable-text";

interface ThemeCardProps {
  theme: Theme;
  program: Program;
  index: number;
  visibleIndex: number;
  dndDisabled: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onRename: (label: string) => void;
  onNotesChange: (notes: string) => void;
  onDelete: () => void;
  onMoveTheme: (direction: -1 | 1) => void;
  onAddGrammar: (label: string) => void;
  onRenameGrammar: (pointId: string, label: string) => void;
  onDeleteGrammar: (pointId: string) => void;
  onMoveGrammar: (pointId: string, direction: -1 | 1) => void;
  onMoveGrammarToTheme: (point: GrammarPoint, targetThemeId: string) => void;
}

export function ThemeCard({
  theme,
  program,
  index,
  visibleIndex,
  dndDisabled,
  isSelected,
  onSelect,
  onRename,
  onNotesChange,
  onDelete,
  onMoveTheme,
  onAddGrammar,
  onRenameGrammar,
  onDeleteGrammar,
  onMoveGrammar,
  onMoveGrammarToTheme
}: ThemeCardProps) {
  const [newGrammarLabel, setNewGrammarLabel] = useState("");
  const [notesDraft, setNotesDraft] = useState(theme.notes ?? "");
  const sortable = useSortable({
    id: themeDragId(theme.id),
    disabled: dndDisabled
  });
  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition
  };

  function submitGrammar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAddGrammar(newGrammarLabel);
    setNewGrammarLabel("");
  }

  useEffect(() => {
    setNotesDraft(theme.notes ?? "");
  }, [theme.notes]);

  return (
    <article
      ref={sortable.setNodeRef}
      style={style}
      className={`overflow-hidden rounded-lg border bg-white p-4 shadow-panel print:break-inside-avoid ${
        isSelected ? "border-[#19715c] bg-[#fbfffd] ring-2 ring-[#b9dccc]" : "border-[#d5e4db]"
      } ${sortable.isDragging ? "opacity-70" : ""}`}
      onClick={onSelect}
    >
      <div className="-mx-4 -mt-4 mb-4 h-1.5 bg-gradient-to-r from-[#19715c] via-[#2fa4bf] to-[#d84f6a]" />
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 flex-1 gap-3">
          <button
            className="mt-1 h-8 w-8 shrink-0 rounded-md border border-[#b9dccc] bg-[#e8f7f2] text-sm font-semibold text-[#19715c] print:hidden"
            type="button"
            aria-label={`Déplacer le thème ${theme.themeLabel}`}
            {...sortable.attributes}
            {...sortable.listeners}
            disabled={dndDisabled}
          >
            ::
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9a2f47]">
              Thème {index + 1}
              {visibleIndex !== index ? ` · résultat ${visibleIndex + 1}` : ""}
            </p>
            <EditableText
              ariaLabel={`Renommer le thème ${theme.themeLabel}`}
              className="mt-1 w-full rounded-md border border-transparent bg-transparent px-1 py-1 text-xl font-semibold text-[#173c31] outline-none hover:border-[#d9ddd2] focus:border-[#19715c]"
              value={theme.themeLabel}
              onCommit={onRename}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <button className="btn-quiet" type="button" onClick={() => onMoveTheme(-1)}>
            Monter
          </button>
          <button className="btn-quiet" type="button" onClick={() => onMoveTheme(1)}>
            Descendre
          </button>
          <button className="btn-danger" type="button" onClick={onDelete}>
            Supprimer
          </button>
        </div>
      </div>

      <label className="mt-3 block text-sm font-medium text-[#596257]">
        Notes du thème
        <textarea
          className="mt-1 min-h-16 w-full rounded-md border border-[#d5e4db] bg-[#f8fcfa] px-3 py-2 text-sm outline-none focus:border-[#19715c]"
          value={notesDraft}
          onBlur={(event) => onNotesChange(event.currentTarget.value)}
          onChange={(event) => setNotesDraft(event.target.value)}
          placeholder="Objectifs, contexte, ressources..."
        />
      </label>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-[#20231f]">
            Points de grammaire ({theme.grammarPoints.length})
          </h3>
        </div>
        <GrammarListDropZone themeId={theme.id}>
          <SortableContext
            items={theme.grammarPoints.map((point) => grammarDragId(point.id))}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {theme.grammarPoints.length === 0 ? (
                <div className="rounded-md border border-dashed border-[#b9dccc] bg-[#f8fcfa] px-3 py-5 text-sm text-[#697267]">
                  Aucun point rattaché. Dépose un point ici ou ajoute-le ci-dessous.
                </div>
              ) : (
                theme.grammarPoints.map((point, pointIndex) => (
                  <GrammarRow
                    key={point.id}
                    point={point}
                    pointIndex={pointIndex}
                    theme={theme}
                    program={program}
                    dndDisabled={dndDisabled}
                    onRename={(label) => onRenameGrammar(point.id, label)}
                    onDelete={() => onDeleteGrammar(point.id)}
                    onMove={(direction) => onMoveGrammar(point.id, direction)}
                    onMoveToTheme={(targetThemeId) => onMoveGrammarToTheme(point, targetThemeId)}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </GrammarListDropZone>

        <form className="mt-3 flex gap-2 print:hidden" onSubmit={submitGrammar}>
          <input
            className="min-w-0 flex-1 rounded-md border border-[#cbd3c4] px-3 py-2 text-sm outline-none focus:border-[#19715c]"
            value={newGrammarLabel}
            onChange={(event) => setNewGrammarLabel(event.target.value)}
            placeholder="Nouveau point de grammaire"
          />
          <button className="btn-primary shrink-0" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </article>
  );
}

interface GrammarRowProps {
  point: GrammarPoint;
  pointIndex: number;
  theme: Theme;
  program: Program;
  dndDisabled: boolean;
  onRename: (label: string) => void;
  onDelete: () => void;
  onMove: (direction: -1 | 1) => void;
  onMoveToTheme: (targetThemeId: string) => void;
}

function GrammarRow({
  point,
  pointIndex,
  theme,
  program,
  dndDisabled,
  onRename,
  onDelete,
  onMove,
  onMoveToTheme
}: GrammarRowProps) {
  const sortable = useSortable({
    id: grammarDragId(point.id),
    disabled: dndDisabled
  });
  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition
  };

  return (
    <div
      ref={sortable.setNodeRef}
      style={style}
      className={`grid gap-2 rounded-md border border-[#d5e4db] bg-[#fbfffd] px-3 py-2 md:grid-cols-[auto_1fr_auto] md:items-center ${
        sortable.isDragging ? "opacity-70" : ""
      }`}
    >
      <button
        className="h-7 w-7 rounded-md border border-[#c3e0ee] bg-[#eef9ff] text-xs font-semibold text-[#1e6275] print:hidden"
        type="button"
        aria-label={`Déplacer le point ${point.label}`}
        {...sortable.attributes}
        {...sortable.listeners}
        disabled={dndDisabled}
      >
        ::
      </button>
      <div className="min-w-0">
        <span className="text-xs font-semibold text-[#d84f6a]">{pointIndex + 1}.</span>
        <EditableText
          ariaLabel={`Renommer le point ${point.label}`}
          className="ml-1 w-[calc(100%-2rem)] rounded-md border border-transparent bg-transparent px-1 py-1 text-sm outline-none hover:border-[#d9ddd2] focus:border-[#19715c]"
          value={point.label}
          onCommit={onRename}
        />
      </div>
      <div className="flex flex-wrap gap-2 print:hidden">
        <button className="btn-quiet" type="button" onClick={() => onMove(-1)}>
          ↑
        </button>
        <button className="btn-quiet" type="button" onClick={() => onMove(1)}>
          ↓
        </button>
        <select
          className="rounded-md border border-[#cbd3c4] bg-white px-2 py-1 text-xs focus:border-[#19715c] focus:outline-none"
          aria-label={`Déplacer ${point.label} vers un autre thème`}
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) {
              onMoveToTheme(event.target.value);
              event.currentTarget.value = "";
            }
          }}
        >
          <option value="">Vers...</option>
          {program.sequence
            .filter((candidate) => candidate.id !== theme.id)
            .map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.themeLabel}
              </option>
            ))}
        </select>
        <button className="btn-danger" type="button" onClick={onDelete}>
          Supprimer
        </button>
      </div>
    </div>
  );
}

function GrammarListDropZone({
  themeId,
  children
}: {
  themeId: string;
  children: ReactNode;
}) {
  const droppable = useDroppable({
    id: grammarListDragId(themeId)
  });

  return (
    <div ref={droppable.setNodeRef} className="min-h-12">
      {children}
    </div>
  );
}
