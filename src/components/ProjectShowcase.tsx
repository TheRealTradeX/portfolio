import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/content";
import { STATUS_DOT } from "@/components/ProjectCard";

/**
 * Large homepage project moment: visual artifact on one side, scannable
 * copy on the other. Until sanitized screenshots land (Phase 9), the
 * visual slot renders a project-specific summary of verified system
 * areas — a labeled visual summary, never a fabricated interface. A
 * real `visuals[0]` entry replaces the fallback without any layout
 * restructuring.
 */
export function ProjectShowcase({
  project,
  reversed = false,
}: {
  project: Project;
  reversed?: boolean;
}) {
  const visual = project.visuals?.[0];

  return (
    <article
      aria-labelledby={`showcase-${project.slug}`}
      className="rv grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14"
    >
      <div className={reversed ? "lg:order-2" : undefined}>
        {visual ? (
          <figure>
            <Image
              src={visual.src}
              alt={visual.alt}
              width={visual.width}
              height={visual.height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full rounded-2xl border border-edge"
            />
            {visual.caption && (
              <figcaption className="mt-2.5 font-mono-technical text-[10.5px] leading-relaxed text-ink-muted">
                {visual.caption}
              </figcaption>
            )}
          </figure>
        ) : (
          <div className="showcase-visual flex overflow-hidden rounded-2xl border border-edge sm:aspect-[16/10]">
            <div className="m-auto w-full p-6 sm:p-8">
              <p className="font-display text-lg font-semibold tracking-tight text-ink">
                {project.name}
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {(project.visualAreas ?? []).map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-2.5 rounded-lg border border-edge/60 bg-white/[0.02] px-3.5 py-2.5 text-[12.5px] leading-snug text-ink-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1 shrink-0 rounded-full bg-accent-bright"
                    />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className={reversed ? "lg:order-1" : undefined}>
        <p className="font-mono-technical text-[10.5px] tracking-[0.16em] text-accent-bright uppercase">
          {project.eyebrow}
        </p>
        <h3
          id={`showcase-${project.slug}`}
          className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-tight"
        >
          {project.name}
        </h3>
        <p className="mt-2.5 flex items-center gap-2 font-mono-technical text-[11px] tracking-wide text-ink-muted">
          <span
            aria-hidden="true"
            className={`size-1.5 shrink-0 rounded-full ${STATUS_DOT[project.status] ?? "bg-ink-muted"}`}
          />
          {project.status}
        </p>

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="font-mono-technical text-[10px] tracking-[0.16em] text-ink-muted uppercase">
              The problem
            </dt>
            <dd className="mt-1.5 text-[14.5px] leading-relaxed text-ink-secondary">
              {project.problem}
            </dd>
          </div>
          <div>
            <dt className="font-mono-technical text-[10px] tracking-[0.16em] text-ink-muted uppercase">
              The outcome
            </dt>
            <dd className="mt-1.5 text-[14.5px] leading-relaxed text-ink-secondary">
              {project.outcome}
            </dd>
          </div>
        </dl>

        <p className="mt-5 text-[13px] leading-relaxed text-ink-secondary">
          <span className="mr-2 font-mono-technical text-[10px] tracking-[0.16em] text-ink-muted uppercase">
            Role
          </span>
          {project.role}
        </p>

        <p className="mt-3 font-mono-technical text-[11px] text-ink-muted">
          {project.stack.slice(0, 4).join(" · ")}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={`/work/${project.slug}`}
            className="rounded-full bg-accent px-5 py-3 font-mono-technical text-[12px] font-medium text-white transition-colors hover:bg-accent-bright hover:text-background"
          >
            Read the case study
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-technical text-[12px] text-ink-secondary transition-colors hover:text-ink"
            >
              Visit live site ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
