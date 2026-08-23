import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SkipLink } from "@/components/SkipLink";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import { siteConfig } from "@/data/site";

const aboutDescription =
  "How Jefrey Peralta went from operating businesses to building the production full-stack software and applied AI systems they run on.";

export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Jefrey Peralta",
    description: aboutDescription,
    url: "/about",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `Jefrey Peralta · ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
    title: "About · Jefrey Peralta",
    description: aboutDescription,
  },
};

export default function AboutPage() {
  return (
    <>
      <SkipLink />
      <SiteNav />
      <CommandPalette />
      <RevealObserver />
      <main id="main" className="wrap max-w-3xl py-20">
        <p className="eyebrow rv">About</p>
        <h1 className="rv mt-6 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          I didn&apos;t start with tutorials. I started with problems.
        </h1>

        <div className="rv mt-10 space-y-6 text-[16.5px] leading-relaxed text-ink-secondary">
          <p>
            I came to engineering by operating businesses and repeatedly
            hitting the same problem: critical workflows held together by
            spreadsheets, disconnected tools, and people remembering what had
            to happen next. Real estate, collections, trading. Eventually I
            stopped waiting for better software and started building it.
          </p>
          <p>
            The path ran through systems work first: Salesforce pipelines, CRM
            automations, reporting dashboards. When configuring stopped being
            enough, I built ResolveOS, the workspace my collections job runs
            on every working day, and then the Velocity platform: payments,
            payouts, live market data, and the admin operation behind a real
            fintech launch.
          </p>
          <p>
            That operating background means I write code with the domain
            already loaded. I know what a payment webhook has to survive
            because I&apos;ve watched revenue depend on one, and I know which
            numbers an operator actually reads on a dashboard because I was
            the operator.
          </p>
          <p>
            Today I practice AI-assisted software development with the same
            discipline I apply to everything else in engineering. I structure
            the repository context, define constraints and acceptance criteria
            before implementation, review every diff, and verify the result in
            the running application. Coding agents make me faster; the
            architecture, judgment, and responsibility for production stay
            mine.
          </p>
          <p>
            The direction from here is deliberate. My titles have been
            founder, account manager, CRM systems developer, and product
            engineer, but the job underneath them barely changed: find the
            real problem, turn the workflow into requirements, design the
            system, build it, deploy it, and improve it against what production
            teaches. I&apos;m now bringing that ownership into a software
            engineering team, with full-stack systems and applied AI as my
            strongest areas of focus.
          </p>
          <p>
            I&apos;m also formalizing the foundations at Western Governors
            University, where I&apos;ve been enrolled in the B.S. and M.S.
            Computer Science pathway since January 2026.
          </p>
        </div>

        <div className="rv mt-12 flex flex-wrap gap-3">
          <Link
            href="/#work"
            className="rounded-full bg-accent px-6 py-3 font-mono-technical text-[12.5px] font-medium text-white transition-colors hover:bg-accent-bright hover:text-background"
          >
            See the work
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="glass rounded-full px-6 py-3 font-mono-technical text-[12.5px] text-ink transition-colors hover:border-edge-strong"
          >
            {siteConfig.email}
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
