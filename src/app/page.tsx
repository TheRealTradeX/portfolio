import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SkipLink } from "@/components/SkipLink";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ProjectCard } from "@/components/ProjectCard";
import { TilePointerEffect } from "@/components/TilePointer";
import { ArchitectureField } from "@/components/ArchitectureField";
import { CopyEmailButton } from "@/components/CopyEmail";
import { velocityNodes, velocityEdges } from "@/data/architecture";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { capabilities } from "@/data/capabilities";
import { siteConfig } from "@/data/site";

const credibility = [
  "Production fintech platform: built, launched, operated solo",
  "Software deployed inside a live operation, used daily",
  "Applied AI shipped: prompts, routing, streaming, usage caps",
  "Owned from discovery through deployment, not tickets",
];

/**
 * The forward-deployed operating model. Stages, not tickets: the unit
 * of work is an outcome in a real operating environment.
 */
const deployStages = [
  {
    title: "Discover",
    detail:
      "Understand users, workflows, constraints, the technical environment, and the business outcome that matters.",
  },
  {
    title: "Scope",
    detail:
      "Reduce ambiguous problems into concrete requirements and measurable success criteria.",
  },
  {
    title: "Architect",
    detail:
      "Design the data model, APIs, integrations, AI layer, infrastructure, security, and rollout.",
  },
  {
    title: "Build",
    detail:
      "Implement across frontend, backend, data, integrations, infrastructure, and AI.",
  },
  {
    title: "Deploy",
    detail:
      "Integrate into the real operating environment, observe usage, handle failures, iterate.",
  },
  {
    title: "Measure & generalize",
    detail:
      "Evaluate adoption and impact; turn what worked into reusable components and systems.",
  },
];

/**
 * Verified applied-AI work only (docs/portfolio-evidence.md). Framed as
 * models operating inside production systems, never as demos.
 */
const appliedAI = [
  {
    name: "Trader analytics in production",
    detail:
      "VI Pulse, Sentinel, and Debrief: performance scoring, configurable risk rules, and post-session analysis over real account data in the Velocity platform.",
    evidence: "OpenAI API · 13 versioned prompts · model router · SSE streaming",
  },
  {
    name: "Operating AI like infrastructure",
    detail:
      "The unglamorous parts that make AI features shippable: prompt versioning, model routing, per-user usage caps, streaming delivery, and behavioral telemetry feeding operator worklists.",
    evidence: "usage controls · retention signals · rate limiting",
  },
  {
    name: "AI-assisted engineering discipline",
    detail:
      "Agentic coding inside a constrained workflow: repository context, scoped task plans, line-by-line diff review, and verification in the running application.",
    evidence: "Claude Code · context engineering · human-in-the-loop review",
  },
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
      "Forward deployed engineering",
      "Applied AI engineering",
      "Full-stack web development",
      "Financial technology",
      "Payments infrastructure",
      "Business process automation",
      "LLM product integration",
      "PostgreSQL",
      "TypeScript",
      "React",
      "Next.js",
      "Salesforce",
    ],
  };
}

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const supporting = projects.filter((p) => !p.featured);

  return (
    <>
      <SkipLink />
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

          <p className="mt-8 font-mono-technical text-[12px] tracking-[0.16em] text-ink-secondary uppercase">
            Jefrey Peralta · {siteConfig.role}
          </p>

          <h1 className="mt-4 max-w-[26ch] font-display text-[clamp(2.35rem,6.8vw,4.6rem)] leading-[1.03] font-bold tracking-[-0.035em] text-balance">
            I turn operational problems into production software and AI
            systems.
          </h1>

          <p className="mt-7 max-w-[58ch] text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-ink-secondary">
            From discovery and architecture through deployment and iteration.
            I spent years operating businesses that ran on spreadsheets,
            CRMs, and duct tape, so I build{" "}
            <em className="font-medium text-ink not-italic">
              inside the operation, not next to it
            </em>
            : payment infrastructure, internal tools, AI systems, shipped to
            production and debugged there too.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/#work"
              className="rounded-full bg-accent px-6 py-3.5 font-mono-technical text-[12.5px] font-medium text-white transition-colors hover:bg-accent-bright hover:text-background"
            >
              View deployments ↓
            </Link>
            <a
              href={siteConfig.links.resume}
              className="glass rounded-full px-6 py-3.5 font-mono-technical text-[12.5px] text-ink transition-all hover:-translate-y-0.5 hover:border-edge-strong"
            >
              Resume
            </a>
          </div>
        </header>

        {/* ── Credibility strip ── */}
        <section aria-label="Shipped scope" className="wrap">
          <div className="rv grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4">
            {credibility.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-surface px-6 py-5">
                <span
                  aria-hidden="true"
                  className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent-bright"
                />
                <p className="text-[14px] leading-snug font-medium text-ink">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Selected work ── */}
        <section id="work" className="wrap py-[clamp(56px,9vh,104px)]">
          <p className="eyebrow rv">Deployments</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.75rem,4.4vw,2.9rem)] leading-tight font-semibold tracking-tight">
            Systems built inside the operations they run.
          </h2>
          <p className="rv mt-5 max-w-[62ch] text-[15px] leading-relaxed text-ink-secondary">
            Not client work delivered over the wall: operations I was part
            of, translated into software, deployed, and operated in
            production.
          </p>
          <div className="mt-12 space-y-[clamp(64px,10vh,112px)]">
            {featured.map((project, i) => (
              <ProjectShowcase
                key={project.slug}
                project={project}
                reversed={i % 2 === 1}
              />
            ))}
          </div>

          {supporting.length > 0 && (
            <div className="mt-[clamp(64px,10vh,112px)]">
              <p className="eyebrow rv">Additional engineering work</p>
              <p className="rv mt-4 max-w-[62ch] text-[14px] leading-relaxed text-ink-secondary">
                Supporting builds that show breadth: performance,
                integrations, security, analytics, and frontend craft.
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {supporting.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── How I deploy ── */}
        <section id="deploy" className="wrap pb-[clamp(56px,9vh,104px)]">
          <p className="eyebrow rv">Operating model</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold tracking-tight">
            How I deploy.
          </h2>
          <p className="rv mt-5 max-w-[62ch] text-[15px] leading-relaxed text-ink-secondary">
            The unit of work I own is an outcome in a live operating
            environment, not a ticket. Every system in this portfolio went
            through the same loop.
          </p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
            {deployStages.map((stage, i) => (
              <li
                key={stage.title}
                className="rv border-l border-edge pl-4 lg:border-l-0 lg:border-t lg:pt-4 lg:pl-0"
              >
                <p className="font-mono-technical text-[10.5px] text-accent-bright">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug font-medium text-ink">
                  {stage.title}
                </p>
                <p className="mt-1 text-[11.5px] leading-snug text-ink-muted">
                  {stage.detail}
                </p>
              </li>
            ))}
          </ol>
          <p className="rv mt-10 max-w-[56ch] border-l-2 border-accent pl-5 text-[15px] leading-relaxed font-medium text-ink">
            Discovery taught me what to build, deployment taught me what
            breaks, and operating it taught me what matters. I own that
            whole loop.
          </p>
        </section>

        {/* ── Applied AI ── */}
        <section id="applied-ai" className="wrap pb-[clamp(56px,9vh,104px)]">
          <p className="eyebrow rv">Applied AI</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold tracking-tight">
            Applied AI, not AI demos.
          </h2>
          <p className="rv mt-5 max-w-[62ch] text-[15px] leading-relaxed text-ink-secondary">
            My interest is models working inside real operational systems,
            where reliability, permissions, data quality, cost, latency, and
            user experience decide whether the feature survives contact with
            production.
          </p>
          <div className="mt-10 grid gap-x-12 gap-y-9 lg:grid-cols-3">
            {appliedAI.map((item) => (
              <div key={item.name} className="rv">
                <h3 className="font-display text-[1.02rem] font-semibold tracking-tight">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-secondary">
                  {item.detail}
                </p>
                <p className="mt-2 font-mono-technical text-[10.5px] text-ink-muted">
                  {item.evidence}
                </p>
              </div>
            ))}
          </div>
          <p className="rv mt-10 max-w-[62ch] text-[13.5px] leading-relaxed text-ink-muted">
            Building toward next: evaluation harnesses, retrieval over
            operational data, and agent workflows deployed into business
            operations. This section grows as that work ships, not before.
          </p>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="wrap pb-[clamp(56px,9vh,104px)]">
          <p className="eyebrow rv">Experience</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold tracking-tight">
            Operator first. Engineer because of it.
          </h2>
          <p className="rv mt-5 max-w-[62ch] text-[15px] leading-relaxed text-ink-secondary">
            The through-line: operator, to systems builder, to product
            engineer, to forward deployed and applied AI engineering. Every
            role involved translating a live business workflow into software.
          </p>
          <ol className="mt-10">
            {experience.map((entry) => (
              <li
                key={entry.company}
                className="rv grid gap-2 border-t border-edge py-6 first:border-t-0 first:pt-4 md:grid-cols-[200px_1fr] md:gap-8"
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
                  <h3 className="font-display text-[1.05rem] font-semibold tracking-tight">
                    {entry.company}
                  </h3>
                  <p className="mt-0.5 text-[13px] font-medium text-accent-soft">
                    {entry.title}
                  </p>
                  <p className="mt-2 max-w-[68ch] text-[14px] leading-relaxed text-ink-secondary">
                    {entry.brief}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="rv grid gap-2 border-t border-edge py-6 md:grid-cols-[200px_1fr] md:gap-8">
            <p className="font-mono-technical text-[11.5px] tracking-wide text-ink-muted">
              Education
            </p>
            <div className="space-y-1.5 text-[14px] leading-relaxed text-ink-secondary">
              <p>
                <span className="font-medium text-ink">
                  Western Governors University
                </span>
                : B.S. and M.S. Computer Science pathway, enrolled, beginning
                September 2026. Formal CS foundations layered on top of
                production engineering experience, not instead of it.
              </p>
              <p>
                <span className="font-medium text-ink">Berkeley College</span>:
                B.B.A. · Salesforce Certified Administrator
              </p>
            </div>
          </div>
        </section>

        {/* ── Capabilities ── */}
        <section id="capabilities" className="wrap pb-[clamp(56px,9vh,104px)]">
          <p className="eyebrow rv">Capabilities</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold tracking-tight">
            What I can own, end to end.
          </h2>
          <div className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div key={capability.title} className="rv">
                <h3 className="font-display text-[1.02rem] font-semibold tracking-tight">
                  {capability.title}
                </h3>
                <p className="mt-1.5 max-w-[52ch] text-[13.5px] leading-relaxed text-ink-secondary">
                  {capability.description}
                </p>
                <p className="mt-2 font-mono-technical text-[10.5px] text-ink-muted">
                  {capability.tools.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="wrap pb-4">
          <div className="rv glass rounded-2xl px-[clamp(20px,4vw,40px)] py-[clamp(44px,7vw,70px)] text-center">
            <h2 className="font-display text-[clamp(1.75rem,4.4vw,2.9rem)] font-semibold tracking-tight text-balance">
              Need an engineer who deploys into the problem?
            </h2>
            <p className="mx-auto mt-4 max-w-[58ch] text-ink-secondary">
              I&apos;m targeting forward deployed, applied AI, solutions, and
              customer engineering roles, and product engineering roles with
              customer-facing technical ownership: work where the engineer
              sits with the operation, architects the system, ships it, and
              owns the outcome. Strong adjacent software engineering roles
              are welcome too.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-full bg-accent px-6 py-3.5 font-mono-technical text-[12.5px] font-medium text-white transition-colors hover:bg-accent-bright hover:text-background"
              >
                Start a conversation
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
              <a
                href={siteConfig.links.resume}
                className="glass rounded-full px-6 py-3.5 font-mono-technical text-[12.5px] text-ink transition-all hover:-translate-y-0.5 hover:border-edge-strong"
              >
                Resume
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
