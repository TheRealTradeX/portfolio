import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SkipLink } from "@/components/SkipLink";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Jefrey Peralta came into software engineering through operating businesses — payments, trading operations, collections, and CRM systems.",
  alternates: { canonical: "/about" },
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
            I came into software from the operating side. Before I wrote
            production code, I ran businesses — real estate, collections,
            trading — and every one of them ran on tooling that was manual,
            fragmented, or priced like an enterprise contract. At first I
            configured my way around it: Salesforce pipelines, CRM automations,
            reporting dashboards. Eventually configuring wasn&apos;t enough, so
            I started building the systems myself.
          </p>
          <p>
            That path means I write code with the domain already loaded. I know
            what a payment webhook has to survive because I&apos;ve watched
            revenue depend on one. I know why a collections account needs an
            age-based follow-up cadence because I&apos;ve worked the accounts. I
            know what a trader actually looks at on a dashboard because I built
            a platform where they told me, daily, when I got it wrong.
          </p>
          <p>
            The result is the work on this site: a production trading
            evaluation platform I built and operate as the sole engineer, an
            internal collections workspace that replaced the spreadsheets a
            real operation ran on, and the infrastructure around them —
            payments, payouts, email, background automation, and the
            marketing site that feeds the funnel.
          </p>
          <p>
            I use modern AI development tools as force multipliers, and
            I&apos;m not shy about it — but I own the product decisions, the
            architecture, the integrations, the debugging, and the production
            outcomes. The commit history, the incident write-ups, and the
            systems still running are mine.
          </p>
          <p>
            I&apos;m formalizing the foundations too: I&apos;m enrolled at
            Western Governors University for a B.S. in Computer Science on the
            accelerated B.S./M.S. pathway, starting September 2026, after
            completing the App Brewery full-stack bootcamp.
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
