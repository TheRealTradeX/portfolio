import Link from "next/link";
import type { ReactNode } from "react";

export function CaseStudyShell({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="wrap max-w-3xl pt-16 pb-24">
      <p className="mb-10">
        <Link
          href="/#work"
          className="font-mono-technical text-xs tracking-widest text-ink-muted uppercase transition-colors hover:text-ink"
        >
          ← All work
        </Link>
      </p>
      {children}
    </main>
  );
}

export function CaseStudyHeader({
  eyebrow,
  title,
  summary,
  facts,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  facts: { label: string; value: ReactNode }[];
}) {
  return (
    <header>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-ink-secondary">
        {summary}
      </p>
      <dl className="glass mt-10 grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl p-6 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="font-mono-technical text-[10.5px] tracking-[0.16em] text-ink-muted uppercase">
              {fact.label}
            </dt>
            <dd className="mt-1.5 text-sm leading-snug text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

export function CS({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mt-16">
      <h2
        id={`${id}-h`}
        className="font-display text-2xl font-semibold tracking-tight"
      >
        {title}
      </h2>
      <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-ink-secondary [&_strong]:font-medium [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

export function EvidenceNote({ children }: { children: ReactNode }) {
  return (
    <aside className="glass mt-16 rounded-2xl border-l-2 border-l-accent p-6">
      <p className="font-mono-technical text-[10.5px] tracking-[0.16em] text-ink-muted uppercase">
        Source access
      </p>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-ink-secondary">
        {children}
      </div>
    </aside>
  );
}
