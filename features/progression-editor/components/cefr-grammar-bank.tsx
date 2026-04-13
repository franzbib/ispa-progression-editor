"use client";

import { useEffect, useMemo, useState } from "react";
import { CefrGrammarRecommendation } from "@/data/cefr-grammar-bank";
import {
  filterRecommendations,
  getRecommendationStatus,
  getRecommendationsForProgram,
  GrammarRecommendationStatus,
  themeContainsGrammarLabel
} from "@/lib/progression/grammar-bank";
import { Program, Theme } from "@/lib/types/progression";
import { Panel } from "./ui-parts";

interface CefrGrammarBankProps {
  program: Program | undefined;
  selectedTheme: Theme | undefined;
  onAddRecommendation: (recommendation: CefrGrammarRecommendation, targetThemeId: string) => void;
}

export function CefrGrammarBank({
  program,
  selectedTheme,
  onAddRecommendation
}: CefrGrammarBankProps) {
  const [query, setQuery] = useState("");
  const [targetThemeId, setTargetThemeId] = useState(selectedTheme?.id ?? "");

  useEffect(() => {
    setTargetThemeId(selectedTheme?.id ?? program?.sequence[0]?.id ?? "");
  }, [program?.id, program?.sequence, selectedTheme?.id]);

  const recommendations = useMemo(
    () => (program ? getRecommendationsForProgram(program.id) : []),
    [program]
  );
  const filteredRecommendations = useMemo(
    () => filterRecommendations(recommendations, query),
    [query, recommendations]
  );
  const selectedThemeId = selectedTheme?.id;
  const integratedCount = useMemo(() => {
    if (!program) {
      return 0;
    }

    return recommendations.filter(
      (recommendation) =>
        getRecommendationStatus(program, recommendation.label, selectedThemeId) !== "absent"
    ).length;
  }, [program, recommendations, selectedThemeId]);
  const targetTheme = program?.sequence.find((theme) => theme.id === targetThemeId);

  if (!program) {
    return (
      <Panel title="Banque CECRL">
        <p className="text-sm text-[#697267]">Aucun programme actif.</p>
      </Panel>
    );
  }

  return (
    <Panel title="Banque CECRL">
      <div className="rounded-lg border border-[#b8ddd1] bg-gradient-to-br from-[#e8f7f2] via-[#eef9ff] to-[#fff1f4] px-3 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#19715c]">
          {program.label}
        </p>
        <p className="mt-1 text-xs leading-5 text-[#52635d]">
          Suggestions éditoriales, non normatives. Ajout dans le thème cible.
        </p>
      </div>

      <label className="mt-3 block text-sm font-medium">
        Rechercher
        <input
          className="mt-1 w-full rounded-md border border-[#cbd3c4] bg-[#fbfffd] px-3 py-2 text-sm outline-none focus:border-[#19715c]"
          placeholder="Point, catégorie, tag"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <label className="mt-3 block text-sm font-medium">
        Thème cible
        <select
          className="mt-1 w-full rounded-md border border-[#cbd3c4] bg-white px-3 py-2 text-sm outline-none focus:border-[#19715c]"
          value={targetThemeId}
          onChange={(event) => setTargetThemeId(event.target.value)}
        >
          {program.sequence.length === 0 ? <option value="">Aucun thème disponible</option> : null}
          {program.sequence.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.themeLabel}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-[#52635d]">
        <span>
          {filteredRecommendations.length} recommandation
          {filteredRecommendations.length > 1 ? "s" : ""} affichée
          {filteredRecommendations.length > 1 ? "s" : ""}
        </span>
        <span className="rounded-md bg-[#dff3fb] px-2 py-1 font-semibold text-[#1e6275]">
          {integratedCount} intégrée{integratedCount > 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-[#c8dfd5] bg-white">
        {filteredRecommendations.length === 0 ? (
          <p className="px-3 py-5 text-sm text-[#697267]">
            Aucun résultat dans la banque.
          </p>
        ) : (
          <div className="max-h-[34rem] divide-y divide-[#e4ece7] overflow-auto">
            {filteredRecommendations.map((recommendation) => {
              const status = getRecommendationStatus(
                program,
                recommendation.label,
                selectedTheme?.id
              );
              const isAlreadyInTarget = targetTheme
                ? themeContainsGrammarLabel(targetTheme, recommendation.label)
                : false;

              return (
                <GrammarBankItem
                  key={recommendation.id}
                  recommendation={recommendation}
                  status={status}
                  isAlreadyInTarget={isAlreadyInTarget}
                  canAdd={Boolean(targetTheme) && !isAlreadyInTarget}
                  onAdd={() => {
                    if (targetTheme) {
                      onAddRecommendation(recommendation, targetTheme.id);
                    }
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </Panel>
  );
}

function GrammarBankItem({
  recommendation,
  status,
  isAlreadyInTarget,
  canAdd,
  onAdd
}: {
  recommendation: CefrGrammarRecommendation;
  status: GrammarRecommendationStatus;
  isAlreadyInTarget: boolean;
  canAdd: boolean;
  onAdd: () => void;
}) {
  return (
    <article className="px-3 py-3 transition hover:bg-[#f2fbf8]">
      <div className="flex items-start gap-3">
        <StatusDot status={status} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold leading-5 text-[#20231f]">
              {recommendation.label}
            </h3>
            <span className="shrink-0 rounded-md bg-[#fff1f4] px-2 py-0.5 text-[11px] font-semibold text-[#9a2f47]">
              {recommendation.category}
            </span>
          </div>
          {recommendation.tags?.length ? (
            <p className="mt-1 text-xs text-[#697267]">{recommendation.tags.join(", ")}</p>
          ) : null}
          {recommendation.notes ? (
            <p className="mt-1 text-xs leading-5 text-[#697267]">{recommendation.notes}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 pl-8">
        <span className="text-[11px] font-medium text-[#697267]">{statusLabel(status)}</span>
        <button
          className={
            canAdd
              ? "rounded-md border border-[#19715c] bg-[#19715c] px-2 py-1 text-xs font-semibold text-white transition hover:bg-[#145c4a]"
              : "rounded-md border border-[#c8dfd5] bg-[#f2f7f5] px-2 py-1 text-xs font-semibold text-[#6b7772]"
          }
          type="button"
          disabled={!canAdd}
          onClick={onAdd}
          title={isAlreadyInTarget ? "Déjà présent dans le thème cible" : "Ajouter au thème cible"}
        >
          {isAlreadyInTarget ? "Déjà là" : "+ Ajouter"}
        </button>
      </div>
    </article>
  );
}

function StatusDot({ status }: { status: GrammarRecommendationStatus }) {
  const className =
    status === "in-selected-theme"
      ? "border-[#19715c] bg-[#19715c]"
      : status === "in-program"
        ? "border-[#2fa4bf] bg-[#2fa4bf]"
        : "border-[#d84f6a] bg-white";

  return (
    <span
      className={`mt-1 inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-full border ${className}`}
      aria-hidden="true"
    />
  );
}

function statusLabel(status: GrammarRecommendationStatus): string {
  if (status === "in-selected-theme") {
    return "Déjà dans le thème sélectionné";
  }

  if (status === "in-program") {
    return "Déjà ailleurs dans le programme";
  }

  return "Absent du programme";
}
