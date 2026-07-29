import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Jefrey Peralta — full-stack product engineer and technical founder.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main className="wrap max-w-3xl py-16">
      <div className="no-print mb-10 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono-technical text-xs tracking-widest text-ink-muted uppercase hover:text-ink"
        >
          ← Back to site
        </Link>
        <p className="font-mono-technical text-xs text-ink-muted">
          Use your browser&apos;s print dialog to save as PDF
        </p>
      </div>

      <header className="border-b border-edge pb-8">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-lg text-ink-secondary">{siteConfig.role}</p>
        <p className="mt-3 font-mono-technical text-[13px] text-ink-muted">
          React · Next.js · TypeScript · Node.js · PostgreSQL · AI · FinTech
        </p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-secondary">
          <span>{siteConfig.location}</span>
          <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          <a
            className="underline underline-offset-4"
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="underline underline-offset-4"
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </header>

      <section className="border-b border-edge py-8">
        <h2 className="font-mono-technical text-xs tracking-[0.2em] text-ink-muted uppercase">
          Profile
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">
          Product-focused software engineer and technical founder who has built
          and operated production software from concept to launch — frontend,
          backend, databases, authentication, payments, AI integrations, and
          operational tooling. Seeking product engineer, full-stack engineer,
          or frontend engineer roles where shipping high-quality software and
          owning customer outcomes matter.
        </p>
      </section>

      <section className="border-b border-edge py-8">
        <h2 className="font-mono-technical text-xs tracking-[0.2em] text-ink-muted uppercase">
          Experience
        </h2>
        <div className="mt-6 space-y-8">
          {experience.map((entry) => (
            <article key={entry.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold">
                  {entry.company}
                </h3>
                <span className="font-mono-technical text-xs text-ink-muted">
                  {entry.period}
                </span>
              </div>
              <p className="mt-0.5 text-sm font-medium text-accent-soft">
                {entry.title}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-secondary">
                {entry.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h2 className="font-mono-technical text-xs tracking-[0.2em] text-ink-muted uppercase">
          Education
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-ink-secondary">
          <li>
            <span className="font-medium text-ink">
              Western Governors University
            </span>{" "}
            — B.S. Computer Science, accelerated B.S./M.S. pathway. Enrolled;
            program begins September 2026.
          </li>
          <li>
            <span className="font-medium text-ink">
              App Brewery Full-Stack Web Development Bootcamp
            </span>
          </li>
        </ul>
      </section>
    </main>
  );
}
