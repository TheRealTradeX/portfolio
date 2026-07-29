import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import {
  CaseStudyShell,
  CaseStudyHeader,
  CS,
  EvidenceNote,
} from "@/components/case-study";
import { ArchitectureField } from "@/components/ArchitectureField";
import { velocityNodes, velocityEdges } from "@/data/architecture";
import { getProject } from "@/data/projects";

export const metadata: Metadata = {
  title: "Velocity Platform — Case Study",
  description:
    "Engineering case study: an end-to-end futures trading evaluation platform — 237 API routes, 83-table Postgres schema, payments, payouts, realtime market data, and an admin command center, built and operated by a sole engineer.",
  alternates: { canonical: "/work/velocity" },
};

const project = getProject("velocity")!;

export default function VelocityCaseStudy() {
  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed top-2 left-2 z-100 rounded-md bg-accent px-4 py-2 text-sm text-white"
      >
        Skip to content
      </a>
      <SiteNav />
      <CommandPalette />
      <RevealObserver />
      <CaseStudyShell>
        <CaseStudyHeader
          eyebrow="Case study · Flagship"
          title="Velocity Platform"
          summary="An end-to-end futures trading evaluation platform — the trader product, the financial infrastructure, and the admin command center — designed, built, launched, and operated by one engineer."
          facts={[
            { label: "Status", value: project.status },
            { label: "Timeline", value: project.timeline },
            { label: "Role", value: project.role },
            { label: "Scale", value: "237 API routes · 83 tables · ~190k LOC TS" },
            { label: "Team", value: "Solo — 878 commits, zero co-authors" },
            {
              label: "Source",
              value: (
                <a
                  className="underline underline-offset-4 hover:text-accent-bright"
                  href="https://github.com/TheRealTradeX/velocity-funds-platform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Public architecture overview ↗
                </a>
              ),
            },
          ]}
        />

        <div className="glass mt-10 rounded-2xl p-5 sm:p-8">
          <ArchitectureField
            nodes={velocityNodes}
            edges={velocityEdges}
            title="Velocity platform system topology"
            className="w-full"
          />
          <p className="mt-3 text-center font-mono-technical text-[10.5px] text-ink-muted">
            System topology — every node is a deployed service or integration.
            Animated packets are illustrative, not live data.
          </p>
        </div>

        <CS id="problem" title="The problem">
          <p>
            A futures prop firm sells evaluations: traders pay to prove they
            can trade within risk rules, and funded traders earn payouts. Off
            the shelf, that business runs on a duct-taped stack of a payment
            processor, a trading platform vendor portal, spreadsheets, and
            support tickets. Every state transition — purchase, provisioning,
            breach, pass, payout — crosses a system boundary by hand, and
            every manual hop is a place where money and trust leak.
          </p>
          <p>
            I founded Velocity Funds and made a bet: the firm would be
            software. One platform owning the trader&apos;s entire lifecycle,
            from checkout to payout, with the operational back office built in
            rather than bolted on.
          </p>
        </CS>

        <CS id="owned" title="What I owned">
          <p>
            Everything technical. Product architecture, the data model, every
            integration, the frontend, deployment, and production operations —
            878 commits with no other authors. Concretely, the platform is a
            four-workspace Turborepo monorepo:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Web app</strong> — Next.js App Router: 21 trader pages,
              39 admin pages, 237 API route handlers, 300+ components.
            </li>
            <li>
              <strong>Worker service</strong> — a BullMQ job processor on
              Railway for everything that must not run inside a request:
              webhook processing, notifications, certificate generation,
              account syncs, resumable email campaign sends.
            </li>
            <li>
              <strong>Realtime service</strong> — a protobuf-over-WebSocket
              consumer of the trading vendor&apos;s feed, projecting balances,
              trades, and positions into Postgres and driving risk monitoring.
            </li>
            <li>
              <strong>Shared package</strong> — typed queue contracts (eight
              Zod payload schemas), the vendor API client, lifecycle state
              logic, and time/session math shared by all three services.
            </li>
          </ul>
        </CS>

        <CS id="architecture" title="Architecture decisions that mattered">
          <p>
            <strong>Webhooks are a ledger, not an event.</strong> Payment and
            trading-platform webhooks land in an events table keyed by a
            content hash of the raw body — a unique index makes redelivery a
            no-op. Processing is enqueued to BullMQ and acknowledged
            immediately; if Redis is unreachable, an inline fallback processes
            the event in-request and marks it so. Replay and health crons
            sweep for anything missed. Idempotency shows up 281 times across
            40 files because it is the design language of the platform, not a
            patch.
          </p>
          <p>
            <strong>Pure decision kernels.</strong> Payout eligibility, AI
            access entitlements, affiliate attribution, and lifecycle state
            are pure functions over explicit inputs, separated from the
            routes that gather data. That single choice is why the platform
            has 74 targeted test files without a test framework — plain{" "}
            <code className="font-mono-technical text-[13px]">
              node:assert
            </code>{" "}
            scripts against functions with no side effects.
          </p>
          <p>
            <strong>Money is frozen at write time.</strong> Payouts store
            gross, net, split, and retained amounts in integer cents at
            creation. Changing a config later can never rewrite history.
            Affiliate commission rates are likewise snapshotted onto each
            referral row at conversion.
          </p>
          <p>
            <strong>One lifecycle, one definition.</strong> Account state
            (active, provisioning, passed-pending-review, breached, archived,
            paid out…) was originally computed inline at five render sites,
            which diverged. It became a nine-variant discriminated union in
            the shared package with one derivation function — and a
            documented rule about which upstream fields are allowed to be
            inputs.
          </p>
          <p>
            <strong>Postgres as the spine.</strong> 83 tables under 69 active
            timestamped migrations, with row-level security on every
            user-facing table (120 policies) and a three-role model enforced
            twice: at the edge (middleware) and at every admin API route.
          </p>
        </CS>

        <CS id="failed" title="What failed, and what it changed">
          <p>
            <strong>Launch day broke realtime.</strong> On 2026-05-04 the
            schema baseline cutover dropped the logical-replication
            publication membership that live dashboards depended on. It was
            restored the same day via migration, and the incident is written
            up in the repo&apos;s architecture doc. The durable change:
            schema-drift logging and a launch checklist runbook.
          </p>
          <p>
            <strong>A race in promo codes.</strong> Read-then-write on a
            usage counter double-redeemed under concurrency. It was replaced
            with atomic reserve/commit/release SQL functions. A similar
            compare-and-set lease now guards recurring-billing retries.
          </p>
          <p>
            <strong>Production forensics became a practice.</strong> The
            repo carries 47 read-only diagnostic scripts written to answer
            real production questions — P&amp;L semantics spot-checks, symbol
            coverage, survivor counts — because debugging a financial system
            by clicking around is how mistakes get made.
          </p>
        </CS>

        <CS id="security" title="Security & reliability">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Card data never touches the server — checkout uses
              Authorize.Net client-side tokenization; the backend sees
              payment nonces only.
            </li>
            <li>
              Tax IDs are encrypted at rest with AES-256-GCM under versioned
              keys, in a separate table, with the reveal path rate-limited.
            </li>
            <li>
              Internal service-to-service calls verify an HMAC service token
              with constant-time comparison.
            </li>
            <li>
              21 distinct rate limiters cover checkout, auth, AI, webhooks,
              and public endpoints.
            </li>
            <li>
              Strict security headers with a CSP that is report-only in dev
              and enforced in production; Sentry across all three services
              with request-correlation IDs.
            </li>
            <li>
              An append-only admin audit log records privileged actions.
            </li>
          </ul>
        </CS>

        <CS id="quality" title="Testing, deployment, and honest gaps">
          <p>
            74 test files target the pure decision functions — payout
            eligibility, queue payload schemas, trade-row building, webhook
            signature verification. Deployment is Vercel (web) and Railway
            (worker, realtime — multi-stage Docker images, non-root), with
            staging and production branches, 10 Vercel cron jobs, and
            worker-scheduled internal crons gated by an endpoint allowlist.
          </p>
          <p>
            The honest gaps: there is no CI pipeline — tests run locally, and
            deploys are push-to-branch. There is no test framework or
            coverage measurement, and heavy UI surfaces are largely untested.
            Those are the first things I would fix with a second engineer on
            the team, and I say so because a portfolio that hides its gaps
            isn&apos;t one you should trust.
          </p>
        </CS>

        <CS id="outcome" title="Outcome">
          <p>
            The platform launched publicly on 2026-05-04 at
            app.velocityfunds.io and ran the firm&apos;s operations: real
            purchases, real evaluations on live market data, real payouts,
            real support — with one engineer operating it. In July 2026 I made
            a deliberate business decision to wind down new evaluation sales
            and pivot the product toward an AI-native trader operating
            system (&quot;Chapter Two&quot;); the final feature shipped was
            the transition itself.
          </p>
          <p>
            What I&apos;d improve next: CI with the existing test suite as a
            merge gate, Zod validation on the receiving side of internal
            service calls (a gap the architecture doc flags itself), and
            decomposing the largest admin views.
          </p>
        </CS>

        <EvidenceNote>
          <p>
            The production source is private because it contains proprietary
            business logic, financial integrations, and customer
            infrastructure. This case study documents the architecture,
            decisions, and systems I personally owned.
          </p>
          <p>
            Every number here was measured from the repository — route and
            table counts by file inspection, authorship by{" "}
            <code className="font-mono-technical text-[12.5px]">git log</code>
            , the launch record from the platform&apos;s 1,576-line
            architecture document and its launch-day migration. A public
            architecture overview is available on GitHub, and I&apos;m happy
            to walk through any subsystem in depth in an interview.
          </p>
        </EvidenceNote>
      </CaseStudyShell>
      <SiteFooter />
    </>
  );
}
