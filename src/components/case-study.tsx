import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { VisualAsset } from "@/types/content";

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

/* ── At a glance ─────────────────────────────────────────────── */

export type CaseStudyFact = {
  label: string;
  value: ReactNode;
};

/**
 * Scannable definition-list panel for the top of a case study:
 * product type, status, role, timeline, operating context, major
 * systems, and at most one justified metric. Renders no more than
 * seven facts; keep values short and avoid implementation-volume
 * walls by authoring rule.
 */
export function CaseStudyAtAGlance({ facts }: { facts: CaseStudyFact[] }) {
  const shown = facts.slice(0, 7);
  return (
    <dl
      aria-label="At a glance"
      className="mt-10 grid grid-cols-1 gap-x-8 gap-y-5 rounded-2xl border border-edge bg-white/[0.02] p-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {shown.map((fact) => (
        <div key={fact.label}>
          <dt className="font-mono-technical text-[10.5px] tracking-[0.16em] text-ink-muted uppercase">
            {fact.label}
          </dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-ink">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Figures ─────────────────────────────────────────────────── */

type ImageFigureProps = {
  kind: "image";
  image: VisualAsset;
  /** Small mono eyebrow above the visual, e.g. "Admin command center". */
  label?: string;
  caption?: string;
  /** Provenance note rendered as a small chip, e.g. "Synthetic data". */
  dataDisclosure?: string;
  /** Set for above-the-fold figures so next/image preloads them. */
  priority?: boolean;
  /** next/image responsive sizes; defaults to reading-column width. */
  sizes?: string;
};

type CustomFigureProps = {
  kind: "custom";
  /**
   * Flattened accessible name for the rendered diagram. The visual is
   * exposed as role="img", so inner text nodes are not announced
   * individually; use `description` for detail worth reading.
   */
  accessibleLabel: string;
  children: ReactNode;
  label?: string;
  caption?: string;
  /** Visible one-or-two sentence explanation below the caption. */
  description?: string;
};

export type CaseStudyFigureProps = ImageFigureProps | CustomFigureProps;

/**
 * Evidence figure: a sanitized product screenshot (image mode) or a
 * React-rendered diagram (custom mode). The discriminated union keeps
 * the two modes mutually exclusive, and image mode requires the full
 * VisualAsset contract (src, alt, width, height) at the type level.
 * No outer margin: spacing comes from the surrounding section flow.
 */
export function CaseStudyFigure(props: CaseStudyFigureProps) {
  return (
    <figure>
      {props.label && (
        <p className="mb-2.5 font-mono-technical text-[10.5px] tracking-[0.16em] text-ink-muted uppercase">
          {props.label}
        </p>
      )}
      {props.kind === "image" ? (
        <Image
          src={props.image.src}
          alt={props.image.alt}
          width={props.image.width}
          height={props.image.height}
          priority={props.priority}
          sizes={props.sizes ?? "(min-width: 768px) 768px, 100vw"}
          className="h-auto w-full rounded-2xl border border-edge"
        />
      ) : (
        <div
          role="img"
          aria-label={props.accessibleLabel}
          className="overflow-hidden rounded-2xl border border-edge bg-surface"
        >
          {props.children}
        </div>
      )}
      {(props.caption ||
        (props.kind === "image" && props.dataDisclosure) ||
        (props.kind === "custom" && props.description)) && (
        <figcaption className="mt-3 text-[12.5px] leading-relaxed text-ink-muted">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {props.caption}
            {props.kind === "image" && props.dataDisclosure && (
              <span className="rounded-full border border-edge px-2 py-0.5 font-mono-technical text-[10px] tracking-wide whitespace-nowrap">
                {props.dataDisclosure}
              </span>
            )}
          </span>
          {props.kind === "custom" && props.description && (
            <span className="mt-1.5 block text-ink-secondary">
              {props.description}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/** Two-up figure layout; stacks on mobile. */
export function CaseStudyFigureRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 md:grid-cols-2">{children}</div>;
}

/* ── Engineering decisions ───────────────────────────────────── */

type DecisionHeadingLevel = "h3" | "h4";

/**
 * One important engineering decision: strong title, short summary,
 * optional supporting body and result line. Heading level is typed so
 * the document outline stays valid wherever the decision list sits.
 */
export function CaseStudyDecision({
  number,
  title,
  summary,
  children,
  result,
  headingLevel = "h3",
}: {
  number?: number;
  title: string;
  summary?: string;
  children?: ReactNode;
  result?: string;
  headingLevel?: DecisionHeadingLevel;
}) {
  const Heading = headingLevel;
  return (
    <article className="border-t border-edge pt-6 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-3">
        {number != null && (
          <span
            aria-hidden="true"
            className="font-mono-technical text-[11px] text-accent-bright"
          >
            {String(number).padStart(2, "0")}
          </span>
        )}
        <Heading className="font-display text-[1.1rem] leading-snug font-semibold tracking-tight">
          {title}
        </Heading>
      </div>
      {summary && (
        <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">
          {summary}
        </p>
      )}
      {children && (
        <div className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-ink-secondary">
          {children}
        </div>
      )}
      {result && (
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-secondary">
          <span className="mr-2 font-mono-technical text-[10px] tracking-[0.16em] text-accent-soft uppercase">
            Result
          </span>
          {result}
        </p>
      )}
    </article>
  );
}

/** Wrapper providing consistent rhythm between decisions. */
export function CaseStudyDecisionList({ children }: { children: ReactNode }) {
  return <div className="space-y-7">{children}</div>;
}

/* ── Expandable supporting detail ────────────────────────────── */

/**
 * Native-details disclosure for secondary technical depth (workspace
 * inventories, security controls, deployment notes). Never put the
 * only explanation of an essential fact inside one: closed disclosures
 * also do not render their content when printed.
 */
export function CaseStudyExpandable({
  title,
  summary,
  children,
  defaultOpen,
  id,
}: {
  title: string;
  summary?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
}) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className="cs-details rounded-xl border border-edge bg-white/[0.015]"
    >
      <summary className="flex cursor-pointer items-baseline justify-between gap-4 rounded-xl px-5 py-4">
        <span>
          <span className="text-[14.5px] font-medium text-ink">{title}</span>
          {summary && (
            <span className="mt-0.5 block text-[12.5px] leading-relaxed text-ink-muted">
              {summary}
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          className="cs-details-marker shrink-0 font-mono-technical text-[13px] text-ink-muted"
        />
      </summary>
      <div className="space-y-4 px-5 pb-5 text-[14.5px] leading-relaxed text-ink-secondary">
        {children}
      </div>
    </details>
  );
}
