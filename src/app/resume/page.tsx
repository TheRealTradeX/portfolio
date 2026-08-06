import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { experience } from "@/data/experience";
import { resumeSkills } from "@/data/skills";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Jefrey Peralta, full-stack product engineer.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume · Jefrey Peralta",
    description: "Resume of Jefrey Peralta, full-stack product engineer.",
    url: "/resume",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jefrey Peralta · Full-Stack Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
    title: "Resume · Jefrey Peralta",
    description: "Resume of Jefrey Peralta, full-stack product engineer.",
  },
};

export default function ResumePage() {
  return (
    <main className="wrap max-w-3xl py-16">
      <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono-technical text-xs tracking-widest text-ink-muted uppercase hover:text-ink"
        >
          ← Back to site
        </Link>
        <a
          href={siteConfig.links.resume}
          download="Jefrey_Peralta_Resume.pdf"
          className="rounded-full bg-accent px-5 py-2.5 font-mono-technical text-[12px] font-medium text-white transition-colors hover:bg-accent-bright hover:text-background"
        >
          Download PDF ↓
        </a>
      </div>

      <header className="border-b border-edge pb-8">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-lg text-ink-secondary">{siteConfig.role}</p>
        <p className="mt-3 font-mono-technical text-[13px] text-ink-muted">
          React · Next.js · TypeScript · Node.js · PostgreSQL · FinTech ·
          AI-assisted engineering
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
          Full-stack product engineer who has taken production software from
          concept to launch and operated it live: frontend, backend services,
          PostgreSQL, payments, AI-assisted product features, and the internal
          tooling behind them. I practice disciplined AI-assisted software
          development, pairing engineering ownership with prompt and context
          engineering, human-in-the-loop review, and automated verification.
          Seeking product engineer, full-stack, or platform roles where owning
          customer outcomes matters.
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

      <section className="border-b border-edge py-8">
        <h2 className="font-mono-technical text-xs tracking-[0.2em] text-ink-muted uppercase">
          Technical Skills
        </h2>
        <dl className="mt-4 space-y-2.5">
          {resumeSkills.map((group) => (
            <div key={group.label} className="text-sm leading-relaxed">
              <dt className="inline font-medium text-ink">{group.label}: </dt>
              <dd className="inline text-ink-secondary">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-8">
        <h2 className="font-mono-technical text-xs tracking-[0.2em] text-ink-muted uppercase">
          Education & Certification
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-ink-secondary">
          <li>
            <span className="font-medium text-ink">
              Western Governors University
            </span>
            : B.S. and M.S. Computer Science pathway, enrolled, beginning
            September 2026.
          </li>
          <li>
            <span className="font-medium text-ink">Berkeley College</span>:
            Bachelor of Business Administration.
          </li>
          <li>
            <span className="font-medium text-ink">
              Salesforce Certified Administrator
            </span>
          </li>
          <li>
            <span className="font-medium text-ink">The App Brewery</span>:
            Complete Full-Stack Web Development Bootcamp
          </li>
        </ul>
      </section>
    </main>
  );
}
