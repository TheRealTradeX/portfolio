import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import { TilePointerEffect } from "@/components/TilePointer";
import { ProjectCard } from "@/components/ProjectCard";
import { ArchitectureField } from "@/components/ArchitectureField";
import { CopyEmailButton } from "@/components/CopyEmail";
import { velocityNodes, velocityEdges } from "@/data/architecture";
import { projects, systemsShipped } from "@/data/projects";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { siteConfig } from "@/data/site";

const proofPoints = [
  { value: "237", label: "API route handlers in production" },
  { value: "83", label: "Postgres tables · 120 RLS policies" },
  { value: "878", label: "commits · sole engineer" },
  { value: "2026-05-04", label: "production launch date" },
];

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    email: `mailto:${siteConfig.email}`,
    url: siteConfig.url,
    address: { "@type": "PostalAddress", addressRegion: "NJ", addressCountry: "US" },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout: [
      "Full-stack web development",
      "Financial technology",
      "Payments infrastructure",
      "Trading operations software",
      "PostgreSQL",
      "TypeScript",
      "React",
      "Next.js",
    ],
  };
}

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed top-2 left-2 z-100 rounded-md bg-accent px-4 py-2 text-sm text-white"
      >
        Skip to content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <SiteNav />
      <CommandPalette />
      <RevealObserver />
      <TilePointerEffect />

      <main id="main">
        {/* ── Hero ── */}
        <header className="wrap relative pt-[clamp(64px,12vh,128px)] pb-[clamp(48px,8vh,80px)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden"
          >
            <ArchitectureField
              nodes={velocityNodes}
              edges={velocityEdges}
              title="Live architecture of the Velocity platform"
              className="mx-auto w-full max-w-5xl opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
          </div>

          <p className="inline-flex items-center gap-2.5 rounded-full border border-edge bg-white/[0.025] px-4 py-2 font-mono-technical text-[11px] tracking-[0.14em] text-ink-secondary uppercase">
            <span
              aria-hidden="true"
              className="size-1.5 animate-pulse rounded-full bg-success"
            />
            {siteConfig.availability} · {siteConfig.location}
          </p>

          <h1 className="mt-8 font-display text-[clamp(2.9rem,8.5vw,6rem)] leading-[0.95] font-bold tracking-[-0.04em] text-balance">
            Jefrey Peralta
            <span className="block font-normal tracking-[-0.03em] text-ink-secondary">
              Full-stack product engineer.
            </span>
          </h1>

          <p className="mt-7 max-w-[56ch] text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-ink-secondary">
            I build the systems businesses actually run on —{" "}
            <em className="font-medium text-ink not-italic">
              payments, trading operations, internal CRMs, automation, and
              AI-assisted analytics.
            </em>{" "}
            Technical founder turned engineer, with production systems to show
            for it.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/#work"
              className="rounded-full bg-accent px-6 py-3.5 font-mono-technical text-[12.5px] font-medium text-white transition-colors hover:bg-accent-bright hover:text-background"
            >
              View the work ↓
            </Link>
            <a
              href={siteConfig.links.resume}
              className="glass rounded-full px-6 py-3.5 font-mono-technical text-[12.5px] text-ink transition-all hover:-translate-y-0.5 hover:border-edge-strong"
            >
              Resume
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full px-6 py-3.5 font-mono-technical text-[12.5px] text-ink transition-all hover:-translate-y-0.5 hover:border-edge-strong"
            >
              GitHub ↗
            </a>
          </div>
        </header>

        {/* ── Proof strip ── */}
        <section aria-label="Production evidence" className="wrap">
          <div className="rv grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-edge bg-edge lg:grid-cols-4">
            {proofPoints.map((point) => (
              <div key={point.label} className="bg-surface px-6 py-5">
                <p className="font-display text-[clamp(1.45rem,6vw,1.875rem)] font-semibold tracking-tight whitespace-nowrap text-ink">
                  {point.value}
                </p>
                <p className="mt-1 font-mono-technical text-[11px] leading-snug tracking-wide text-ink-muted">
                  {point.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured work ── */}
        <section id="work" className="wrap py-[clamp(56px,9vh,104px)]">
          <p className="eyebrow rv">Featured work</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.75rem,4.4vw,2.9rem)] leading-tight font-semibold tracking-tight">
            Systems I&apos;ve built and operated.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* ── Systems shipped ── */}
        <section id="systems" className="wrap pb-[clamp(56px,9vh,104px)]">
          <p className="eyebrow rv">Systems shipped</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold tracking-tight">
            The modules underneath the products.
          </h2>
          <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2">
            {systemsShipped.map((system) => (
              <div key={system.name} className="rv bg-surface p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[1.05rem] font-semibold tracking-tight">
                    {system.name}
                  </h3>
                  <span className="shrink-0 font-mono-technical text-[10px] tracking-wide text-ink-muted">
                    {system.project}
                  </span>
                </div>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-secondary">
                  {system.description}
                </p>
                <p className="mt-3.5 font-mono-technical text-[10.5px] text-accent-soft/70">
                  {system.stack.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="wrap pb-[clamp(56px,9vh,104px)]">
          <p className="eyebrow rv">Experience</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold tracking-tight">
            Operator first. Engineer because of it.
          </h2>
          <div className="mt-10 space-y-0">
            {experience.map((entry, i) => (
              <article
                key={entry.company}
                className={`rv grid gap-4 py-8 md:grid-cols-[220px_1fr] md:gap-10 ${
                  i > 0 ? "border-t border-edge" : ""
                }`}
              >
                <div>
                  <p className="font-mono-technical text-[11.5px] tracking-wide text-ink-muted">
                    {entry.period}
                  </p>
                  {entry.location && (
                    <p className="mt-1 font-mono-technical text-[11px] text-ink-muted/70">
                      {entry.location}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {entry.company}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent-soft">
                    {entry.title}
                    {entry.formalTitle && (
                      <span className="ml-2 font-mono-technical text-[10.5px] font-normal text-ink-muted">
                        (formal title: {entry.formalTitle})
                      </span>
                    )}
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-secondary">
                    {entry.summary}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {entry.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-secondary"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Toolkit ── */}
        <section id="toolkit" className="wrap pb-[clamp(56px,9vh,104px)]">
          <p className="eyebrow rv">Technical toolkit</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold tracking-tight">
            Tools, tied to the systems that used them.
          </h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((category) => (
              <div key={category.label} className="rv glass rounded-2xl p-6">
                <h3 className="font-mono-technical text-[10.5px] tracking-[0.18em] text-ink-muted uppercase">
                  {category.label}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {category.items.map((item) => (
                    <li key={item.name} className="text-[13.5px] leading-snug">
                      <span className="text-ink">{item.name}</span>
                      {item.usedIn && (
                        <span className="block font-mono-technical text-[10px] text-ink-muted">
                          {item.usedIn.join(" · ")}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── How I work ── */}
        <section className="wrap pb-[clamp(56px,9vh,104px)]">
          <div className="rv glass grid gap-0 overflow-hidden rounded-2xl md:grid-cols-2">
            <div className="p-[clamp(24px,3.6vw,40px)]">
              <h2 className="font-mono-technical text-[10.5px] tracking-[0.18em] text-ink-muted uppercase">
                How I work
              </h2>
              <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-ink-secondary">
                <p>
                  I build software where mistakes are expensive. That shapes
                  everything: idempotent webhooks, cent-precision money math
                  frozen at write time, pure decision functions that can be
                  unit-tested without mocking the world, and migrations that
                  are written down — not clicked together.
                </p>
                <p>
                  I use modern AI development tools as force multipliers, but
                  I own the product decisions, architecture, integrations,
                  debugging, testing, and production outcomes.
                </p>
              </div>
            </div>
            <div className="border-t border-edge p-[clamp(24px,3.6vw,40px)] md:border-t-0 md:border-l">
              <h2 className="font-mono-technical text-[10.5px] tracking-[0.18em] text-ink-muted uppercase">
                Education & continued development
              </h2>
              <ul className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-ink-secondary">
                <li>
                  <span className="font-medium text-ink">
                    Western Governors University
                  </span>
                  <br />
                  B.S. Computer Science, accelerated B.S./M.S. pathway —
                  enrolled, begins September 2026.
                </li>
                <li>
                  <span className="font-medium text-ink">
                    App Brewery Full-Stack Web Development Bootcamp
                  </span>
                </li>
                <li>
                  <span className="font-medium text-ink">
                    Production, daily
                  </span>
                  <br />
                  The fastest teacher has been operating live systems — launch
                  days, incident write-ups, and the runbooks that came out of
                  them.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="wrap pb-4">
          <div className="rv glass rounded-2xl px-[clamp(20px,4vw,40px)] py-[clamp(44px,7vw,70px)] text-center">
            <h2 className="font-display text-[clamp(1.75rem,4.4vw,2.9rem)] font-semibold tracking-tight">
              Hiring for product engineering?
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-ink-secondary">
              I&apos;m looking for product engineer, full-stack, or frontend
              roles where owning outcomes matters. The fastest way to evaluate
              me is the work above — the second fastest is a conversation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-full bg-accent px-6 py-3.5 font-mono-technical text-[12.5px] font-medium text-white transition-colors hover:bg-accent-bright hover:text-background"
              >
                {siteConfig.email}
              </a>
              <CopyEmailButton className="glass cursor-pointer rounded-full px-6 py-3.5 font-mono-technical text-[12.5px] text-ink transition-all hover:-translate-y-0.5 hover:border-edge-strong" />
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full px-6 py-3.5 font-mono-technical text-[12.5px] text-ink transition-all hover:-translate-y-0.5 hover:border-edge-strong"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
