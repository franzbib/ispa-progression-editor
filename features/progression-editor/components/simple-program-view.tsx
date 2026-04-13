"use client";

import { Program } from "@/lib/types/progression";

interface SimpleProgramViewProps {
  program: Program;
  onBack?: () => void;
  onPrint?: () => void;
}

export function SimpleProgramView({ program, onBack, onPrint }: SimpleProgramViewProps) {
  return (
    <main className="min-h-screen bg-white text-[#202020]">
      <div className="mx-auto max-w-4xl px-6 py-6 print:max-w-none print:px-0 print:py-0">
        <div className="mb-8 flex items-center justify-between gap-3 border-b border-[#dddddd] pb-4 print:hidden">
          <button className="btn-secondary" type="button" onClick={onBack}>
            Retour à l'éditeur
          </button>
          <button className="btn-primary" type="button" onClick={onPrint}>
            Imprimer / PDF
          </button>
        </div>

        <article className="simple-print-sheet">
          <header className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#555555]">
              Progression FLE / F.O.U.
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-[#111111] print:text-3xl">
              {program.label}
            </h1>
            {program.notes ? (
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[#555555]">{program.notes}</p>
            ) : null}
          </header>

          {program.sequence.length === 0 ? (
            <p className="text-sm text-[#555555]">Aucun thème dans ce programme.</p>
          ) : (
            <ol className="space-y-8">
              {program.sequence.map((theme, themeIndex) => (
                <li
                  key={theme.id}
                  className="break-inside-avoid border-t border-[#d7d7d7] pt-5"
                >
                  <h2 className="flex gap-3 text-xl font-semibold leading-7 text-[#111111] print:text-lg">
                    <span className="min-w-8 text-right tabular-nums text-[#555555]">
                      {themeIndex + 1}.
                    </span>
                    <span>{theme.themeLabel}</span>
                  </h2>

                  {theme.notes ? (
                    <p className="ml-11 mt-2 text-sm leading-6 text-[#666666]">{theme.notes}</p>
                  ) : null}

                  {theme.grammarPoints.length === 0 ? (
                    <p className="ml-11 mt-3 text-sm text-[#666666]">
                      Aucun point de grammaire rattaché.
                    </p>
                  ) : (
                    <ol className="ml-11 mt-3 space-y-2">
                      {theme.grammarPoints.map((point, grammarIndex) => (
                        <li
                          key={point.id}
                          className="grid grid-cols-[2rem_1fr] gap-2 text-[15px] leading-6 text-[#222222]"
                        >
                          <span className="text-right tabular-nums text-[#666666]">
                            {themeIndex + 1}.{grammarIndex + 1}
                          </span>
                          <span>
                            {point.label}
                            {point.notes ? (
                              <span className="block text-sm leading-6 text-[#666666]">
                                {point.notes}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          )}
        </article>
      </div>
    </main>
  );
}
