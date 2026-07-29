import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SkipLink } from "@/components/SkipLink";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import {
  CaseStudyShell,
  CaseStudyHeader,
  CS,
  EvidenceNote,
} from "@/components/case-study";
import { getProject } from "@/data/projects";

export const metadata: Metadata = {
  title: "velocityfunds.io — Case Study",
  description:
    "Engineering case study: the live cinematic marketing site for Velocity Funds — GSAP scroll choreography, consent-gated analytics, a server-side lead API into the platform CRM, and shipped performance work.",
  alternates: { canonical: "/work/velocityfunds-site" },
};

const project = getProject("velocityfunds-site")!;

export default function VelocitySiteCaseStudy() {
  return (
    <>
      <SkipLink />
      <SiteNav />
      <CommandPalette />
      <RevealObserver />
      <CaseStudyShell>
        <CaseStudyHeader
          eyebrow="Case study · Live"
          title="velocityfunds.io"
          summary="The public face of the Velocity platform: a scroll-driven cinematic launch site that is also real infrastructure — lead capture into the platform CRM, a consent framework, and a content pipeline. This one you can click."
          facts={[
            { label: "Status", value: project.status },
            { label: "Timeline", value: project.timeline },
            { label: "Role", value: project.role },
            { label: "Scale", value: "85 files · ~10,800 LOC · 60 commits, all mine" },
            { label: "Stack", value: project.stack.join(" · ") },
            {
              label: "Live",
              value: (
                <a
                  className="underline underline-offset-4 hover:text-accent-bright"
                  href="https://www.velocityfunds.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.velocityfunds.io ↗
                </a>
              ),
            },
          ]}
        />

        <CS id="brief" title="The brief I gave myself">
          <p>
            A prop firm sells trust. The marketing site had to feel like the
            product — precise, fast, a little cinematic — while doing real
            jobs: capture leads into the platform CRM, respect consent before
            firing a single pixel, and hold up under Lighthouse. It replaced
            an earlier hand-written static HTML site (11 pages, ~6,000 lines)
            that I&apos;d outgrown.
          </p>
        </CS>

        <CS id="built" title="What's in it">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>A five-act scroll narrative</strong> — the homepage is
              structured as acts (hero, shift, reveal, advantage, CTA)
              choreographed with GSAP ScrollTrigger, with a three.js
              background loaded lazily and only on capable clients
              (SSR-disabled dynamic import).
            </li>
            <li>
              <strong>A real lead API</strong> — a 267-line server route
              validates, rate-limits, and forwards leads to the platform
              CRM over a service-token-authenticated internal endpoint. The
              receiving side lives in the platform monorepo; this is a
              genuine cross-service integration, not a form-to-nowhere.
            </li>
            <li>
              <strong>Consent before tracking</strong> — a first-party
              cookie-preferences framework gates Meta, Google, and X pixels;
              nothing fires until the visitor opts in, and a
              double-PageView bug got its own fix commit.
            </li>
            <li>
              <strong>Content as data</strong> — pricing (646 lines of typed
              data), FAQ with client-side search and highlighting, rules,
              and a promo system whose featured offer is sourced live from
              the platform.
            </li>
            <li>
              <strong>Hand-written security headers</strong> — the live
              response carries an enforcing CSP, HSTS, and a
              permissions-policy, verifiable with{" "}
              <code className="font-mono-technical text-[13px]">curl</code>.
            </li>
          </ul>
        </CS>

        <CS id="perf" title="Performance work that shipped">
          <p>
            The commit log is the receipt: the product-demo video went from
            76&nbsp;MB to 4&nbsp;MB and lazy-loads; Trustpilot and other
            third-party scripts are deferred; a background-void effect was
            reworked specifically to kill scroll jank on mobile; pixels
            stopped double-firing. The animation stack is deliberate — one
            motion library (GSAP), Lenis for scroll smoothing, and three.js
            fenced off behind lazy loading rather than sprinkled everywhere.
          </p>
        </CS>

        <CS id="notes" title="A different discipline">
          <p>
            The marketing site exercises a different set of muscles than the
            platform — motion design, art direction, and performance
            budgets — while sharing the same engineering values: typed
            content, a documented architecture, and disciplined commits.
          </p>
        </CS>

        <EvidenceNote>
          <p>
            The source repository is private; the shipped site is publicly
            accessible at velocityfunds.io.
          </p>
        </EvidenceNote>
      </CaseStudyShell>
      <SiteFooter />
    </>
  );
}
