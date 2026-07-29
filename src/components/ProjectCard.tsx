import Link from "next/link";
import type { Project } from "@/types/content";

const STATUS_DOT: Record<string, string> = {
  Live: "bg-success",
  Production: "bg-success",
  "Private production system": "bg-success",
  "Internal tool": "bg-accent-bright",
  "Active development": "bg-accent-bright",
  "Archived case study": "bg-ink-muted",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="tile glass rv flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono-technical text-[10.5px] tracking-[0.16em] text-accent-bright uppercase">
          {project.eyebrow}
        </p>
        <p className="flex shrink-0 items-center gap-2 font-mono-technical text-[10.5px] tracking-wide text-ink-secondary">
          <span
            aria-hidden="true"
            className={`inline-block size-1.5 rounded-full ${STATUS_DOT[project.status] ?? "bg-ink-muted"}`}
          />
          {project.status}
        </p>
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
        <Link
          href={`/work/${project.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {project.name}
        </Link>
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-secondary">
        {project.summary}
      </p>

      <ul className="mt-5 space-y-2 border-t border-edge pt-5">
        {project.highlights.slice(0, 3).map((h) => (
          <li
            key={h}
            className="flex gap-2.5 text-[13px] leading-snug text-ink-secondary"
          >
            <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-edge bg-white/[0.02] px-2.5 py-1 font-mono-technical text-[10.5px] text-ink-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="relative z-10 mt-5 flex items-center gap-4 border-t border-edge pt-4 font-mono-technical text-[12px]">
        <span className="text-accent-bright">Case study →</span>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-ink-muted transition-colors hover:text-ink"
          >
            Live site ↗
          </a>
        )}
      </p>
    </article>
  );
}
