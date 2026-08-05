import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SkipLink } from "@/components/SkipLink";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import {
  CaseStudyShell,
  CaseStudyHeader,
  CaseStudyAtAGlance,
  CaseStudyFigure,
  CaseStudyDecision,
  CaseStudyDecisionList,
  CaseStudyExpandable,
  CS,
  EvidenceNote,
} from "@/components/case-study";
import { getProject } from "@/data/projects";

export const metadata: Metadata = {
  title: "velocityfunds.io · Product and acquisition case study",
  description:
    "How I designed and built a responsive public product experience with CRM-connected lead capture, consent-aware analytics, and a clear acquisition journey.",
  alternates: { canonical: "/work/velocityfunds-site" },
};

const project = getProject("velocityfunds-site")!;

const acquisitionFlow = [
  "Visitor",
  "Consent choice",
  "Product story and pricing",
  "Lead capture",
  "CRM record in the platform",
];

function AcquisitionFlowDiagram() {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2.5 p-5 sm:p-6">
      {acquisitionFlow.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-lg border border-edge bg-white/[0.02] px-3 py-1.5 text-[12.5px] leading-snug text-ink-secondary">
            {step}
          </span>
          {i < acquisitionFlow.length - 1 && (
            <span aria-hidden="true" className="text-[12px] text-ink-muted">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function VelocitySiteCaseStudy() {
  return (
    <>
      <SkipLink />
      <SiteNav />
      <CommandPalette />
      <RevealObserver />
      <CaseStudyShell>
        <CaseStudyHeader
          eyebrow="Case study · Marketing and acquisition experience"
          title="velocityfunds.io"
          summary="A responsive public product experience designed to explain the offer, guide prospects through the launch story, capture leads, and connect acquisition activity to the operating platform."
        />

        <CaseStudyAtAGlance
          facts={[
            { label: "Product type", value: "Public product and acquisition website" },
            { label: "Status", value: "Live public website" },
            { label: "Role", value: "Product design and full-stack implementation" },
            { label: "Audience", value: "Prospective traders and affiliates" },
            {
              label: "Primary goals",
              value: "Product storytelling, trust, lead capture, and conversion",
            },
            {
              label: "Connected systems",
              value: "CRM lead capture and consent-aware analytics",
            },
          ]}
        />

        <CS id="problem" title="The communication problem">
          <p>
            A funded-trader evaluation is a complicated financial product:
            rules, tiers, payouts, and risk parameters that can bury a
            visitor in detail. The site had to make the offer understandable
            in one pass, earn enough trust for a financial commitment, keep
            the dense material available without leading with it, and feed
            acquisition activity into the platform the business ran on. All
            of it with analytics held behind consent.
          </p>
        </CS>

        <CS id="experience" title="The product experience">
          <p>
            The homepage is a five-act scroll narrative (hero, shift, reveal,
            advantage, call to action) choreographed to unfold at reading
            pace on any screen. Pricing and evaluation pathways were typed
            content, rules and FAQ were searchable rather than buried, and
            policy pages carried the trust load. Every path converged on two
            actions: start an evaluation or leave contact details.
          </p>
          <p>
            Motion supports pacing rather than decoration: transitions carry
            the reader between acts, and heavy visuals load lazily, only on
            clients that can afford them.
          </p>
        </CS>

        <CS id="decisions" title="Design and engineering decisions">
          <CaseStudyDecisionList>
            <CaseStudyDecision
              number={1}
              title="Story before specification"
              summary="Visitors meet the product before the rulebook."
              result="A complicated offer reads simply without hiding its terms."
            >
              <p>
                The narrative explains what the offer is and why it matters
                before pricing tables and rule detail appear. The dense
                material stays one click away, as typed pricing data and a
                searchable FAQ, instead of leading the page.
              </p>
            </CaseStudyDecision>
            <CaseStudyDecision
              number={2}
              title="Motion tied to comprehension"
              summary="One motion system paces the story instead of decorating it."
              result="Cinematic on desktop, fast and calm on mobile."
            >
              <p>
                GSAP ScrollTrigger drives the act transitions through a
                shared section-pinning component, with Lenis smoothing the
                scroll. The three.js background loads lazily with SSR
                disabled, third-party scripts are deferred, a
                background effect was reworked specifically to kill mobile
                scroll jank, and the product demo video was cut from 76 MB
                to 4 MB.
              </p>
            </CaseStudyDecision>
            <CaseStudyDecision
              number={3}
              title="Acquisition connected to operations"
              summary="The lead form is real infrastructure, not a mailbox."
              result="Marketing activity landed as operational records the business could act on."
            >
              <p>
                A server-side route validates and rate-limits submissions,
                then forwards them to the platform CRM over a
                token-authenticated internal integration. The receiving side
                lives in the platform itself, so a lead on the marketing
                site becomes a record an operator can work.
              </p>
            </CaseStudyDecision>
          </CaseStudyDecisionList>
        </CS>

        <CS id="integration" title="Acquisition and system integration">
          <p>
            Nothing tracks until the visitor decides: a first-party consent
            framework gates the Meta, Google, and X pixels, and a
            double-firing bug got its own fix. Real-user performance data
            comes from Vercel Analytics and Speed Insights.
          </p>
          <CaseStudyFigure
            kind="custom"
            accessibleLabel="Acquisition path: visitor, consent choice, product story and pricing, lead capture, CRM record in the platform"
            label="The acquisition path"
            caption="Analytics fire only after opt-in; leads land as records in the operating platform."
          >
            <AcquisitionFlowDiagram />
          </CaseStudyFigure>
        </CS>

        <CS id="outcome" title="Outcome">
          <p>
            The site shipped, carried the product&apos;s public launch, and
            remains live at velocityfunds.io. Leads flowed directly into the
            operating platform, and the marketing surface held the same
            design language as the application, so the brand read as one
            system from first visit to funded account.
          </p>
          <p>
            One honest caveat: the evaluation operation the site marketed
            was wound down in July 2026, and the live site still presents
            the launch-era offer. Updating the public story to match the
            company&apos;s pivot is on the list below.
          </p>
        </CS>

        <CS id="improve" title="What I would improve next">
          <p>
            Transition messaging first: the public story should track the
            operating reality after the pivot. Then sharper conversion event
            definitions, so consented analytics answer questions instead of
            collecting motion, a formal accessibility pass over the animated
            acts, and structured content experiments on the story itself.
          </p>
        </CS>

        <CS id="detail" title="Supporting technical detail">
          <CaseStudyExpandable
            title="Frontend architecture and motion"
            summary="How the scroll narrative is built"
          >
            <p>
              Next.js App Router with Tailwind CSS v4 design tokens. The
              five acts are discrete components choreographed by GSAP
              ScrollTrigger through a shared section-pinning wrapper, with
              Lenis for scroll smoothing. Three.js scenes load through
              SSR-disabled dynamic imports on capable clients only. Content
              is typed data: pricing tables, rules, and a searchable FAQ. It
              replaced an earlier hand-written static HTML site the brand
              had outgrown.
            </p>
          </CaseStudyExpandable>
          <CaseStudyExpandable
            title="Lead capture and CRM integration"
            summary="The server-side path from form to platform"
          >
            <p>
              A dedicated server route validates payloads, applies rate
              limiting, and forwards accepted leads to the operating
              platform&apos;s CRM through a token-authenticated internal
              integration, with explicit failure responses when the upstream
              is unavailable. No third-party form vendor sits in the path.
            </p>
          </CaseStudyExpandable>
          <CaseStudyExpandable
            title="Analytics, consent, and security"
            summary="Tracking that waits for permission"
          >
            <p>
              A first-party cookie-preferences framework gates Meta, Google,
              and X pixels behind explicit opt-in. The live responses carry
              hand-written security headers, including an enforcing
              Content-Security-Policy. Vercel Analytics and Speed Insights
              provide aggregate, real-user performance visibility.
            </p>
          </CaseStudyExpandable>
        </CS>

        <EvidenceNote>
          <p>
            The website is publicly accessible at{" "}
            <a
              className="underline underline-offset-4 hover:text-accent-bright"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              velocityfunds.io
            </a>
            . The source repository and the connected platform systems remain
            private.
          </p>
        </EvidenceNote>
      </CaseStudyShell>
      <SiteFooter />
    </>
  );
}
