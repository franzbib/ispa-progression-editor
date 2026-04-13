import type { ReactNode } from "react";
import { ImportReport } from "@/lib/types/progression";

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-md border border-[#d9ddd2] bg-[#fbfcf8] p-4 shadow-panel print:hidden">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#2c6b57]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function StatusPill({
  label,
  tone = "default"
}: {
  label: string;
  tone?: "default" | "warm" | "calm";
}) {
  const classes =
    tone === "warm"
      ? "border-[#d9a26a] bg-[#fff4e8] text-[#774b20]"
      : tone === "calm"
        ? "border-[#8bc3a7] bg-[#e8f6ee] text-[#20553f]"
        : "border-[#d9ddd2] bg-white text-[#596257]";

  return <span className={`rounded-md border px-3 py-1 ${classes}`}>{label}</span>;
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-dashed border-[#cbd3c4] bg-white p-8 text-center text-sm text-[#697267]">
      {message}
    </div>
  );
}

export function ImportReportBox({ report }: { report: ImportReport }) {
  return (
    <div className="mt-4 rounded-md border border-[#d9ddd2] bg-white p-3 text-xs">
      <h3 className="font-semibold text-[#20231f]">{report.title}</h3>
      {report.issues.length === 0 ? (
        <p className="mt-2 text-[#697267]">Aucune alerte.</p>
      ) : (
        <ul className="mt-2 space-y-1 text-[#596257]">
          {report.issues.map((issue, index) => (
            <li key={`${issue.level}-${index}`}>
              <strong>{issue.level}</strong> · {issue.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export type NoticeTone = "success" | "error" | "info";

export function noticeClass(tone: NoticeTone): string {
  if (tone === "success") {
    return "border-[#8bc3a7] bg-[#e8f6ee] text-[#20553f]";
  }

  if (tone === "info") {
    return "border-[#98b8c7] bg-[#eef8fb] text-[#2d596a]";
  }

  return "border-[#d98d8d] bg-[#fff0f0] text-[#7b2f2f]";
}
