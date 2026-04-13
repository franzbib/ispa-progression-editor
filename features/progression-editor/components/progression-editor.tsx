"use client";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { FormEvent, useMemo, useState } from "react";
import { CefrGrammarRecommendation } from "@/data/cefr-grammar-bank";
import { sampleProgressionDoc } from "@/data/sample-progressions";
import { downloadTextFile } from "@/lib/browser/download";
import { exportToCsv } from "@/lib/export/csv";
import { exportToMarkdown } from "@/lib/export/markdown";
import { migrateLegacyToV1 } from "@/lib/import/legacy";
import { importThemesFromPlainText } from "@/lib/import/theme-list";
import { createId } from "@/lib/id";
import { withExportMetadata } from "@/lib/progression/document";
import { themeContainsGrammarLabel } from "@/lib/progression/grammar-bank";
import {
  addGrammarPoint,
  addTheme,
  moveGrammarPointBetweenThemes,
  ProgressionOperationError,
  removeGrammarPoint,
  removeTheme,
  renameGrammarPoint,
  renameTheme,
  reorderThemes,
  updateProgram,
  updateThemeNotes
} from "@/lib/progression/operations";
import { GrammarPoint, ImportReport, Program, Theme } from "@/lib/types/progression";
import { useProgressionDocument } from "../hooks/use-progression-document";
import { findGrammarLocation, parseDragId, themeDragId } from "../lib/drag-ids";
import { CefrGrammarBank } from "./cefr-grammar-bank";
import { SimpleProgramView } from "./simple-program-view";
import { ThemeCard } from "./theme-card";
import { EmptyState, ImportReportBox, NoticeTone, Panel, StatusPill, noticeClass } from "./ui-parts";

type Notice = { tone: NoticeTone; message: string };

export function ProgressionEditor() {
  const {
    doc,
    commit,
    replace,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
    isDirty,
    markExported,
    storageError
  } = useProgressionDocument();

  const [activeProgramId, setActiveProgramId] = useState(doc.programs[0]?.id ?? "");
  const [activeThemeId, setActiveThemeId] = useState("");
  const [search, setSearch] = useState("");
  const [newThemeLabel, setNewThemeLabel] = useState("");
  const [assistText, setAssistText] = useState("");
  const [notice, setNotice] = useState<Notice | null>(null);
  const [importReport, setImportReport] = useState<ImportReport | null>(null);
  const [simpleProgramId, setSimpleProgramId] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const currentProgram = useMemo(() => {
    return doc.programs.find((program) => program.id === activeProgramId) ?? doc.programs[0];
  }, [activeProgramId, doc.programs]);

  const visibleThemes = useMemo(() => {
    if (!currentProgram) {
      return [];
    }

    const normalizedSearch = search.trim().toLocaleLowerCase("fr");
    if (!normalizedSearch) {
      return currentProgram.sequence;
    }

    return currentProgram.sequence.filter((theme) => {
      const themeMatch = theme.themeLabel.toLocaleLowerCase("fr").includes(normalizedSearch);
      const grammarMatch = theme.grammarPoints.some((point) =>
        point.label.toLocaleLowerCase("fr").includes(normalizedSearch)
      );
      return themeMatch || grammarMatch;
    });
  }, [currentProgram, search]);

  const selectedThemeForBank =
    currentProgram?.sequence.find((theme) => theme.id === activeThemeId) ??
    currentProgram?.sequence[0];
  const simpleProgram = simpleProgramId
    ? doc.programs.find((program) => program.id === simpleProgramId)
    : null;

  function commitCurrentProgram(nextProgram: Program) {
    if (!currentProgram) {
      return;
    }

    commit({
      ...doc,
      programs: updateProgram(doc.programs, currentProgram.id, nextProgram)
    });
  }

  function runProgramMutation(action: (program: Program) => Program) {
    if (!currentProgram) {
      return;
    }

    try {
      commitCurrentProgram(action(currentProgram));
      setNotice(null);
    } catch (error) {
      setNotice({
        tone: "error",
        message:
          error instanceof ProgressionOperationError
            ? error.message
            : "L'action n'a pas pu être appliquée."
      });
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const active = parseDragId(event.active.id);
    const over = event.over ? parseDragId(event.over.id) : null;

    if (!active || !over || !currentProgram) {
      return;
    }

    if (active.kind === "theme" && over.kind === "theme") {
      const fromIndex = currentProgram.sequence.findIndex((theme) => theme.id === active.id);
      const toIndex = currentProgram.sequence.findIndex((theme) => theme.id === over.id);
      runProgramMutation((program) => reorderThemes(program, fromIndex, toIndex));
      return;
    }

    if (active.kind === "grammar") {
      const source = findGrammarLocation(currentProgram, active.id);
      const target =
        over.kind === "grammar"
          ? findGrammarLocation(currentProgram, over.id)
          : over.kind === "grammar-list"
            ? {
                themeId: over.themeId,
                index:
                  currentProgram.sequence.find((theme) => theme.id === over.themeId)?.grammarPoints
                    .length ?? 0
              }
            : null;

      if (!source || !target) {
        return;
      }

      runProgramMutation((program) =>
        moveGrammarPointBetweenThemes(
          program,
          source.themeId,
          target.themeId,
          source.index,
          target.index
        )
      );
    }
  }

  function addThemeFromForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const label = newThemeLabel.trim();

    if (!label) {
      setNotice({ tone: "error", message: "Saisis un nom de thème avant d'ajouter." });
      return;
    }

    const theme: Theme = {
      id: createId("theme"),
      themeLabel: label,
      grammarPoints: []
    };

    runProgramMutation((program) => addTheme(program, theme));
    setActiveThemeId(theme.id);
    setNewThemeLabel("");
  }

  function addGrammar(themeId: string, label: string) {
    const trimmed = label.trim();

    if (!trimmed) {
      setNotice({ tone: "error", message: "Le point de grammaire ne peut pas être vide." });
      return;
    }

    runProgramMutation((program) =>
      addGrammarPoint(program, themeId, {
        id: createId("grammar"),
        label: trimmed
      })
    );
  }

  function addRecommendedGrammar(
    recommendation: CefrGrammarRecommendation,
    targetThemeId: string
  ) {
    if (!currentProgram) {
      return;
    }

    const targetTheme = currentProgram.sequence.find((theme) => theme.id === targetThemeId);

    if (!targetTheme) {
      setNotice({ tone: "error", message: "Aucun thème cible disponible." });
      return;
    }

    if (themeContainsGrammarLabel(targetTheme, recommendation.label)) {
      setNotice({
        tone: "info",
        message: "Ce point est déjà présent dans le thème cible."
      });
      return;
    }

    runProgramMutation((program) =>
      addGrammarPoint(program, targetTheme.id, {
        id: createId("grammar"),
        label: recommendation.label,
        notes: recommendation.notes,
        tags: recommendation.tags
      })
    );
    setActiveThemeId(targetTheme.id);
    setNotice({
      tone: "success",
      message: `Point ajouté au thème "${targetTheme.themeLabel}".`
    });
  }

  function moveThemeByButton(themeId: string, direction: -1 | 1) {
    if (!currentProgram) {
      return;
    }

    const fromIndex = currentProgram.sequence.findIndex((theme) => theme.id === themeId);
    const toIndex = fromIndex + direction;

    if (toIndex < 0 || toIndex >= currentProgram.sequence.length) {
      return;
    }

    runProgramMutation((program) => reorderThemes(program, fromIndex, toIndex));
  }

  function moveGrammarByButton(themeId: string, pointId: string, direction: -1 | 1) {
    if (!currentProgram) {
      return;
    }

    const source = findGrammarLocation(currentProgram, pointId);
    const theme = currentProgram.sequence.find((candidate) => candidate.id === themeId);
    const toIndex = source ? source.index + direction : -1;

    if (!source || !theme || toIndex < 0 || toIndex >= theme.grammarPoints.length) {
      return;
    }

    runProgramMutation((program) =>
      moveGrammarPointBetweenThemes(program, themeId, themeId, source.index, toIndex)
    );
  }

  function moveGrammarToTheme(point: GrammarPoint, sourceThemeId: string, targetThemeId: string) {
    if (!currentProgram || sourceThemeId === targetThemeId) {
      return;
    }

    const source = findGrammarLocation(currentProgram, point.id);
    const target = currentProgram.sequence.find((theme) => theme.id === targetThemeId);

    if (!source || !target) {
      return;
    }

    runProgramMutation((program) =>
      moveGrammarPointBetweenThemes(
        program,
        sourceThemeId,
        targetThemeId,
        source.index,
        target.grammarPoints.length
      )
    );
  }

  async function importJsonFile(file: File) {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;
      const migration = migrateLegacyToV1(parsed);
      setImportReport(migration.report);

      if (!migration.success || !migration.doc) {
        setNotice({ tone: "error", message: "Import refusé: le fichier n'est pas valide." });
        return;
      }

      replace(migration.doc);
      setActiveProgramId(migration.doc.programs[0]?.id ?? "");
      setActiveThemeId(migration.doc.programs[0]?.sequence[0]?.id ?? "");
      setNotice({ tone: "success", message: "Import appliqué après validation." });
    } catch (error) {
      setNotice({
        tone: "error",
        message:
          error instanceof Error
            ? `Import impossible: ${error.message}`
            : "Import impossible: fichier illisible."
      });
    }
  }

  function applyPlainTextImport(mode: "append" | "replace") {
    if (!currentProgram) {
      return;
    }

    const imported = importThemesFromPlainText(assistText);
    setImportReport(imported.report);

    if (imported.themes.length === 0) {
      setNotice({ tone: "error", message: "Aucun thème n'a été ajouté." });
      return;
    }

    runProgramMutation((program) => ({
      ...program,
      sequence:
        mode === "append" ? [...program.sequence, ...imported.themes] : imported.themes
    }));
    setActiveThemeId(imported.themes[0].id);
    setAssistText("");
    setNotice({
      tone: "success",
      message:
        mode === "append"
          ? "Thèmes ajoutés au programme actif."
          : "Séquence du programme actif remplacée."
    });
  }

  function exportDocument(format: "json" | "csv" | "md") {
    const exported = withExportMetadata(doc);
    commit(exported);
    markExported(exported);

    if (format === "json") {
      downloadTextFile(
        "progressions-fle-v1.json",
        `${JSON.stringify(exported, null, 2)}\n`,
        "application/json;charset=utf-8"
      );
      return;
    }

    if (format === "csv") {
      downloadTextFile("progressions-fle.csv", exportToCsv(exported), "text/csv;charset=utf-8");
      return;
    }

    downloadTextFile(
      "progressions-fle.md",
      exportToMarkdown(exported),
      "text/markdown;charset=utf-8"
    );
  }

  if (!currentProgram) {
    return <p>Aucun programme disponible.</p>;
  }

  if (simpleProgram) {
    return (
      <SimpleProgramView
        program={simpleProgram}
        onBack={() => setSimpleProgramId(null)}
        onPrint={() => window.print()}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#eef9f4] text-[#20231f]">
      <section className="border-b border-[#b9dccc] bg-[linear-gradient(135deg,#f8fff9_0%,#e9f8ff_42%,#fff1f4_72%,#fff8df_100%)]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-5 py-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-start">
            <img
              className="h-16 w-28 shrink-0 rounded-md border border-[#d8e7df] bg-white object-contain p-2 shadow-panel"
              src="/ispa-logo.jpg"
              alt="Logo ISPA Amiens"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#19715c]">
                Éditeur de progressions FLE / F.O.U.
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-[#20231f] md:text-4xl">
                Programmes, thèmes, grammaire
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#596257]">
                Les thèmes portent leurs points de grammaire. Quand un thème bouge,
                ses liens restent intacts; quand un point change de thème, son identifiant
                reste stable.
              </p>
            </div>
          </div>
          <div className="flex max-w-sm flex-wrap justify-start gap-2 text-sm lg:justify-end">
            <button
              className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#19715c] bg-white text-base font-bold text-[#19715c] shadow-sm transition hover:bg-[#e5f8f1]"
              type="button"
              aria-label="Ouvrir l'aide"
              onClick={() => setIsHelpOpen(true)}
            >
              ?
            </button>
            <StatusPill label={`${doc.programs.length} programmes`} />
            <StatusPill label={`${currentProgram.sequence.length} thèmes`} />
            <StatusPill
              label={`${currentProgram.sequence.reduce(
                (count, theme) => count + theme.grammarPoints.length,
                0
              )} points`}
            />
            <StatusPill
              label={isDirty ? "Modifications non exportées" : "Export à jour"}
              tone={isDirty ? "warm" : "calm"}
            />
          </div>
        </div>
        <ProgramBand
          programs={doc.programs}
          currentProgram={currentProgram}
          onSelect={(program) => {
            setActiveProgramId(program.id);
            setActiveThemeId(program.sequence[0]?.id ?? "");
          }}
          onOpenSimple={(program) => setSimpleProgramId(program.id)}
        />
      </section>

      <div className="mx-auto grid max-w-[1500px] gap-5 px-5 py-5 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_340px]">
        <aside className="space-y-4 lg:sticky lg:top-5 lg:self-start">
          <ActionPanel
            canUndo={canUndo}
            canRedo={canRedo}
            onUndo={undo}
            onRedo={redo}
            onExport={exportDocument}
            onReset={() => {
              if (window.confirm("Réinitialiser avec les données d'exemple ?")) {
                reset();
                setActiveProgramId(sampleProgressionDoc.programs[0]?.id ?? "");
                setActiveThemeId(sampleProgressionDoc.programs[0]?.sequence[0]?.id ?? "");
                setNotice({ tone: "info", message: "Données d'exemple restaurées." });
              }
            }}
          />
          <ImportPanel
            assistText={assistText}
            importReport={importReport}
            onAssistTextChange={setAssistText}
            onFileImport={importJsonFile}
            onApplyPlainTextImport={applyPlainTextImport}
          />
        </aside>

        <section className="space-y-4">
          {(notice || storageError) && (
            <div
              className={`rounded-md border px-4 py-3 text-sm ${noticeClass(
                notice?.tone ?? "error"
              )}`}
            >
              {storageError ? <p>{storageError}</p> : null}
              {notice ? <p>{notice.message}</p> : null}
            </div>
          )}

          <EditorToolbar
            search={search}
            newThemeLabel={newThemeLabel}
            onSearchChange={setSearch}
            onNewThemeLabelChange={setNewThemeLabel}
            onAddTheme={addThemeFromForm}
          />

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={visibleThemes.map((theme) => themeDragId(theme.id))}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3 print:space-y-4">
                {visibleThemes.length === 0 ? (
                  <EmptyState message="Aucun thème ne correspond à cette recherche." />
                ) : (
                  visibleThemes.map((theme, index) => (
                    <ThemeCard
                      key={theme.id}
                      theme={theme}
                      program={currentProgram}
                      index={currentProgram.sequence.findIndex((candidate) => candidate.id === theme.id)}
                      visibleIndex={index}
                      dndDisabled={Boolean(search.trim())}
                      isSelected={selectedThemeForBank?.id === theme.id}
                      onSelect={() => setActiveThemeId(theme.id)}
                      onRename={(label) =>
                        runProgramMutation((program) => renameTheme(program, theme.id, label))
                      }
                      onNotesChange={(notes) =>
                        runProgramMutation((program) => updateThemeNotes(program, theme.id, notes))
                      }
                      onDelete={() => {
                        if (window.confirm(`Supprimer le thème "${theme.themeLabel}" ?`)) {
                          runProgramMutation((program) => removeTheme(program, theme.id));
                        }
                      }}
                      onMoveTheme={(direction) => moveThemeByButton(theme.id, direction)}
                      onAddGrammar={(label) => addGrammar(theme.id, label)}
                      onRenameGrammar={(pointId, label) =>
                        runProgramMutation((program) =>
                          renameGrammarPoint(program, theme.id, pointId, label)
                        )
                      }
                      onDeleteGrammar={(pointId) =>
                        runProgramMutation((program) => removeGrammarPoint(program, theme.id, pointId))
                      }
                      onMoveGrammar={(pointId, direction) =>
                        moveGrammarByButton(theme.id, pointId, direction)
                      }
                      onMoveGrammarToTheme={(point, targetThemeId) =>
                        moveGrammarToTheme(point, theme.id, targetThemeId)
                      }
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </section>

        <aside className="space-y-4 lg:col-start-2 xl:col-start-auto xl:sticky xl:top-5 xl:self-start">
          <CefrGrammarBank
            program={currentProgram}
            selectedTheme={selectedThemeForBank}
            onAddRecommendation={addRecommendedGrammar}
          />
        </aside>
      </div>
      <footer className="mx-auto max-w-[1500px] px-5 pb-6 text-center text-xs text-[#697267]">
        Page conçue par François Carbonnier.
      </footer>
      {isHelpOpen ? <HelpDialog onClose={() => setIsHelpOpen(false)} /> : null}
    </main>
  );
}

function ProgramBand({
  programs,
  currentProgram,
  onSelect,
  onOpenSimple
}: {
  programs: Program[];
  currentProgram: Program;
  onSelect: (program: Program) => void;
  onOpenSimple: (program: Program) => void;
}) {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-5">
      <div className="overflow-x-auto rounded-lg border border-[#b9dccc] bg-white/90 p-2 shadow-panel">
        <div className="flex min-w-max gap-2">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`flex w-56 shrink-0 items-center justify-between gap-3 rounded-lg border p-3 transition ${
                program.id === currentProgram.id
                  ? "border-[#19715c] bg-[#e5f8f1] text-[#193c31] shadow-sm"
                  : "border-[#d9e8df] bg-[#fbfffd] hover:border-[#d84f6a] hover:bg-[#fff7f9]"
              }`}
            >
              <button
                className="min-w-0 flex-1 rounded-md text-left text-sm"
                type="button"
                onClick={() => onSelect(program)}
              >
                <span className="block truncate text-base font-semibold">{program.label}</span>
                <span className="text-xs text-[#697267]">{program.sequence.length} thèmes</span>
              </button>
              <button
                className="shrink-0 rounded-md border border-[#f0b4c0] bg-white px-2 py-1 text-xs font-semibold text-[#9a2f47] hover:border-[#d84f6a] hover:bg-[#fff1f4]"
                type="button"
                onClick={() => onOpenSimple(program)}
              >
                Imprimer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionPanel({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onExport,
  onReset
}: {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onExport: (format: "json" | "csv" | "md") => void;
  onReset: () => void;
}) {
  return (
    <Panel title="Actions">
      <div className="grid gap-2">
        <button className="btn-primary" type="button" onClick={() => onExport("json")}>
          Export JSON v1
        </button>
        <button className="btn-secondary" type="button" onClick={() => onExport("csv")}>
          Export CSV
        </button>
        <button className="btn-secondary" type="button" onClick={() => onExport("md")}>
          Export Markdown
        </button>
        <button className="btn-secondary" type="button" onClick={() => window.print()}>
          Vue imprimable / PDF
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn-quiet" type="button" onClick={onUndo} disabled={!canUndo}>
            Annuler
          </button>
          <button className="btn-quiet" type="button" onClick={onRedo} disabled={!canRedo}>
            Rétablir
          </button>
        </div>
        <button className="btn-danger" type="button" onClick={onReset}>
          Réinitialiser
        </button>
      </div>
    </Panel>
  );
}

function EditorToolbar({
  search,
  newThemeLabel,
  onSearchChange,
  onNewThemeLabelChange,
  onAddTheme
}: {
  search: string;
  newThemeLabel: string;
  onSearchChange: (value: string) => void;
  onNewThemeLabelChange: (value: string) => void;
  onAddTheme: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="rounded-lg border border-[#b9dccc] bg-white p-4 shadow-panel">
      <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
        <label className="block text-sm font-medium">
          Recherche
          <input
            className="mt-1 w-full rounded-md border border-[#cbd3c4] bg-[#fbfffd] px-3 py-2 text-sm outline-none focus:border-[#19715c]"
            placeholder="Filtrer par thème ou grammaire"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>
        <form onSubmit={onAddTheme} className="block text-sm font-medium">
          Ajouter un thème
          <div className="mt-1 flex gap-2">
            <input
              className="min-w-0 flex-1 rounded-md border border-[#cbd3c4] bg-[#fbfffd] px-3 py-2 text-sm outline-none focus:border-[#19715c]"
              value={newThemeLabel}
              onChange={(event) => onNewThemeLabelChange(event.target.value)}
              placeholder="Nouveau thème"
            />
            <button className="btn-primary shrink-0" type="submit">
              Ajouter
            </button>
          </div>
        </form>
      </div>
      {search.trim() ? (
        <p className="mt-3 text-xs text-[#697267]">
          Le glisser-déposer est suspendu pendant la recherche pour éviter les
          réordonnancements partiels.
        </p>
      ) : null}
    </div>
  );
}

function ImportPanel({
  assistText,
  importReport,
  onAssistTextChange,
  onFileImport,
  onApplyPlainTextImport
}: {
  assistText: string;
  importReport: ImportReport | null;
  onAssistTextChange: (value: string) => void;
  onFileImport: (file: File) => Promise<void>;
  onApplyPlainTextImport: (mode: "append" | "replace") => void;
}) {
  return (
    <Panel title="Import">
      <label className="block text-sm font-medium">
        JSON canonique ou legacy
        <input
          className="mt-2 block w-full text-sm"
          type="file"
          accept="application/json,.json"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              void onFileImport(file);
            }
            event.currentTarget.value = "";
          }}
        />
      </label>
      <div className="mt-4">
        <label className="block text-sm font-medium">
          Liste de thèmes
          <textarea
            className="mt-2 min-h-32 w-full rounded-md border border-[#cbd3c4] bg-[#fbfffd] px-3 py-2 text-sm outline-none focus:border-[#19715c]"
            value={assistText}
            onChange={(event) => onAssistTextChange(event.target.value)}
            placeholder={"Un thème par ligne\nVacances sera ignoré comme jalon"}
          />
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            className="btn-secondary"
            type="button"
            onClick={() => onApplyPlainTextImport("append")}
          >
            Ajouter
          </button>
          <button
            className="btn-secondary"
            type="button"
            onClick={() => onApplyPlainTextImport("replace")}
          >
            Remplacer
          </button>
        </div>
      </div>
      {importReport ? <ImportReportBox report={importReport} /> : null}
    </Panel>
  );
}

function HelpDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#1c2b25]/35 px-4 py-6 backdrop-blur-sm print:hidden">
      <section
        className="max-h-[calc(100vh-3rem)] w-full max-w-3xl overflow-y-auto rounded-lg border border-[#b9dccc] bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-dialog-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#d9e8df] bg-[linear-gradient(135deg,#e5f8f1,#eef9ff_55%,#fff1f4)] px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#19715c]">
              Aide rapide
            </p>
            <h2 id="help-dialog-title" className="mt-1 text-2xl font-semibold text-[#20231f]">
              Utiliser l’éditeur de progressions
            </h2>
          </div>
          <button
            className="rounded-md border border-[#cbd3c4] bg-white px-3 py-1 text-sm font-semibold text-[#26352d] hover:border-[#d84f6a] hover:bg-[#fff7f9]"
            type="button"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>

        <div className="grid gap-5 px-5 py-5 text-sm leading-6 text-[#3c463d] md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-[#19715c]">1. Construire une progression</h3>
            <p className="mt-2">
              Choisissez un programme dans le bandeau du haut. Les cartes centrales sont les
              thèmes, dans leur ordre pédagogique. Chaque thème conserve ses points de
              grammaire quand il est déplacé.
            </p>
            <p className="mt-2">
              Vous pouvez renommer, ajouter ou supprimer un thème sans changer son identifiant
              interne. Les boutons monter et descendre restent disponibles si le glisser-déposer
              n’est pas pratique.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#d84f6a]">2. Gérer les points de grammaire</h3>
            <p className="mt-2">
              Dans chaque thème, les points peuvent être réordonnés ou envoyés vers un autre
              thème. La banque CECRL à droite propose des points recommandés pour le programme
              actif et indique ceux qui sont déjà intégrés.
            </p>
            <p className="mt-2">
              Sélectionnez un thème, puis utilisez le bouton + de la banque pour ajouter un
              point au thème cible. Un doublon exact dans le même thème est bloqué.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#2f7e9a]">3. Importer</h3>
            <p className="mt-2">
              Le panneau Import accepte un JSON canonique exporté par l’application, un ancien
              format compatible quand il est reconnu, ou une simple liste de thèmes collée dans
              la zone de texte.
            </p>
            <p className="mt-2">
              Les imports sont validés avant application. Les problèmes sont affichés dans un
              rapport au lieu d’être masqués.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#9a6a00]">4. Exporter et imprimer</h3>
            <p className="mt-2">
              Exportez en JSON v1 pour réimporter sans perte, en CSV pour tableur, ou en
              Markdown pour une lecture humaine. Le bouton imprimable lance l’impression
              navigateur ou l’enregistrement PDF.
            </p>
            <p className="mt-2">
              Les changements sont sauvegardés localement dans le navigateur. Undo et redo
              conservent les derniers états de travail.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
