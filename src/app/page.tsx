import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SkipLink } from "@/components/SkipLink";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ArchitectureField } from "@/components/ArchitectureField";
import { CopyEmailButton } from "@/components/CopyEmail";
import { velocityNodes, velocityEdges } from "@/data/architecture";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { capabilities } from "@/data/capabilities";
import { siteConfig } from "@/data/site";

const credibility = [
  "Production fintech platform, launched and operated live",
  "Payments, payouts, and reconciliation shipped",
  "Internal operations software in daily use",
  "Product, architecture, and deployment owned",
];

const buildProcess = [
  { title: "Understand the operation", detail: "the business problem, firsthand" },
  { title: "Define the requirement", detail: "as concrete product behavior" },
  { title: "Map the system context", detail: "architecture, data flow, repo audit" },
  { title: "Engineer the prompt", detail: "constraints and acceptance criteria" },
  { title: "Review the diff", detail: "assumptions challenged, line by line" },
  { title: "Test and verify", detail: "automated checks, real-app behavior" },
  { title: "Observe and iterate", detail: "production feedback, next pass" },
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
      "AI-assisted software development",
      "Prompt engineering",
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
      <SkipLink />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <SiteNav />
      <CommandPalette />
      <RevealObserver />

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
            Jefrey Peralta · Full-Stack Product Engineer
          </p>

          <h1 className="mt-4 max-w-[24ch] font-display text-[clamp(2.35rem,6.8vw,4.6rem)] leading-[1.03] font-bold tracking-[-0.035em] text-balance">
            I turn messy business operations into production software.
          </h1>

          <p className="mt-7 max-w-[58ch] text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-ink-secondary">
            I spent years operating businesses that ran on spreadsheets, CRMs,
            and duct tape. Now I build the software those operations deserve:{" "}
            <em className="font-medium text-ink not-italic">
              payment infrastructure, internal tools, automation, and
              AI-assisted workflows
            </em>
            , shipped to production and debugged there too.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/#work"
              className="rounded-full bg-accent px-6 py-3.5 font-mono-technical text-[12.5px] font-medium text-white transition-colors hover:bg-accent-bright hover:text-background"
            >
              View selected work ↓
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
          <p className="eyebrow rv">Selected work</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.75rem,4.4vw,2.9rem)] leading-tight font-semibold tracking-tight">
            Three products built to run real operations.
          </h2>
          <div className="mt-12 space-y-[clamp(64px,10vh,112px)]">
            {projects.map((project, i) => (
              <ProjectShowcase
                key={project.slug}
                project={project}
                reversed={i % 2 === 1}
              />
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="wrap pb-[clamp(56px,9vh,104px)]">
          <p className="eyebrow rv">Experience</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold tracking-tight">
            Operator first. Engineer because of it.
          </h2>
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
                September 2026.
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
            What I can build and own.
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

        {/* ── How I build with AI ── */}
        <section id="process" className="wrap pb-[clamp(56px,9vh,104px)]">
          <p className="eyebrow rv">Process</p>
          <h2 className="rv mt-6 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight font-semibold tracking-tight">
            How I build with AI.
          </h2>
          <p className="rv mt-5 max-w-[62ch] text-[15px] leading-relaxed text-ink-secondary">
            I don&apos;t hand an AI agent a vague feature request and accept
            whatever it generates. I define the problem, provide the system
            context, constrain the implementation, inspect the code, and
            verify the result inside the real application.
          </p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-7 lg:gap-5">
            {buildProcess.map((step, i) => (
              <li
                key={step.title}
                className="rv border-l border-edge pl-4 lg:border-l-0 lg:border-t lg:pt-4 lg:pl-0"
              >
                <p className="font-mono-technical text-[10.5px] text-accent-bright">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug font-medium text-ink">
                  {step.title}
                </p>
                <p className="mt-1 text-[11.5px] leading-snug text-ink-muted">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
          <p className="rv mt-10 max-w-[56ch] border-l-2 border-accent pl-5 text-[15px] leading-relaxed font-medium text-ink">
            AI increases my speed. It does not replace my judgment, my
            technical ownership, or my responsibility for what ships to
            production.
          </p>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="wrap pb-4">
          <div className="rv glass rounded-2xl px-[clamp(20px,4vw,40px)] py-[clamp(44px,7vw,70px)] text-center">
            <h2 className="font-display text-[clamp(1.75rem,4.4vw,2.9rem)] font-semibold tracking-tight text-balance">
              Need an engineer who can own the messy parts?
            </h2>
            <p className="mx-auto mt-4 max-w-[54ch] text-ink-secondary">
              I&apos;m looking for product engineer, full-stack, platform, or
              business systems roles where the work touches money, operations,
              internal tools, or AI-assisted workflows. I bring the domain
              context, architect the system, direct the implementation, verify
              the result, and take responsibility for what ships.
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
