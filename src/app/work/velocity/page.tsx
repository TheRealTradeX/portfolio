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
  CaseStudyFigureRow,
  CaseStudyDecision,
  CaseStudyDecisionList,
  CaseStudyExpandable,
  CS,
  EvidenceNote,
} from "@/components/case-study";

export const metadata: Metadata = {
  title: "Velocity Platform · Financial operations case study",
  description:
    "How I designed, built, launched, and operated a production platform connecting payments, trader accounts, realtime market data, risk controls, payouts, and internal operations.",
  alternates: { canonical: "/work/velocity" },
};

const productFlow = [
  "Signup",
  "Checkout",
  "Provisioning",
  "Live trading",
  "Rule evaluation",
  "Payout review",
];

const architectureZones = [
  {
    name: "Experiences",
    items: ["Trader dashboard", "Admin console"],
  },
  {
    name: "Application",
    items: ["Next.js web application", "API route handlers"],
  },
  {
    name: "Async processing",
    items: [
      "Worker service (BullMQ jobs)",
      "Realtime market-data consumer",
      "Scheduled jobs",
    ],
  },
  {
    name: "Data & state",
    items: ["PostgreSQL with row-level security (Supabase)", "Redis (queues, rate limits)"],
  },
  {
    name: "External services",
    items: [
      "Authorize.Net (payments)",
      "Trading data vendor (protobuf over WSS)",
      "Resend (email)",
      "OpenAI (VI suite)",
      "Sentry (monitoring)",
    ],
  },
];

const eventFlow = [
  {
    step: "Provider event arrives",
    detail: "payment or platform webhook, raw payload",
  },
  {
    step: "Durable receipt",
    detail: "keyed by content hash; redelivery is a no-op",
  },
  {
    step: "Queued processing",
    detail: "off the request path; inline fallback if the queue is down",
  },
  {
    step: "State transition",
    detail: "account, subscription, and entitlement updates in a transaction",
  },
  {
    step: "Audit and reconciliation",
    detail: "replay and health sweeps catch anything missed",
  },
];

function ProductFlowDiagram() {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2.5 p-5 sm:p-6">
      {productFlow.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-lg border border-edge bg-white/[0.02] px-3 py-1.5 text-[12.5px] leading-snug text-ink-secondary">
            {step}
          </span>
          {i < productFlow.length - 1 && (
            <span aria-hidden="true" className="text-[12px] text-ink-muted">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="space-y-0 p-5 sm:p-6">
      <p className="pb-4 font-mono-technical text-[11px] tracking-[0.14em] text-ink uppercase">
        Velocity platform architecture
      </p>
      {architectureZones.map((zone, i) => (
        <div key={zone.name}>
          {i > 0 && (
            <p
              aria-hidden="true"
              className="py-1.5 pl-28 font-mono-technical text-[11px] text-ink-muted"
            >
              ↓
            </p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
            <p className="w-28 shrink-0 font-mono-technical text-[10px] tracking-[0.14em] text-ink-muted uppercase">
              {zone.name}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {zone.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-edge bg-white/[0.02] px-2.5 py-1.5 text-[12px] leading-snug text-ink-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function EventFlowDiagram() {
  return (
    <ol className="space-y-0 p-5 sm:p-6">
      {eventFlow.map((item, i) => (
        <li key={item.step} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="font-mono-technical text-[11px] text-accent-bright">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < eventFlow.length - 1 && (
              <span
                aria-hidden="true"
                className="my-1 w-px flex-1 bg-edge"
              />
            )}
          </div>
          <div className={i < eventFlow.length - 1 ? "pb-4" : undefined}>
            <p className="text-[13.5px] leading-snug font-medium text-ink">
              {item.step}
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-muted">
              {item.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function VelocityCaseStudy() {
  return (
    <>
      <SkipLink />
      <SiteNav />
      <CommandPalette />
      <RevealObserver />
      <CaseStudyShell>
        <CaseStudyHeader
          eyebrow="Case study · Financial operations platform"
          title="Velocity Platform"
          summary="A production platform that connected customer signup, checkout, trader accounts, realtime market data, risk enforcement, payouts, and the internal back office required to operate a futures evaluation business."
        />

        <CaseStudyAtAGlance
          facts={[
            { label: "Product type", value: "Financial operations platform" },
            { label: "Status", value: "Operated in production, May to July 2026" },
            { label: "Role", value: "Full-stack product engineer and founder" },
            { label: "Timeline", value: "Designed, launched, and operated during 2026" },
            {
              label: "Operating context",
              value: "Customer-facing product and internal operating system",
            },
            {
              label: "Users",
              value: "Traders, administrators, affiliates, and internal operators",
            },
            {
              label: "Major systems",
              value:
                "Payments, trading data, risk, payouts, lifecycle automation, CRM, and communications",
            },
          ]}
        />

        <CS id="problem" title="The operating problem">
          <p>
            A futures evaluation business sells a simple promise: pay for an
            evaluation, trade within the rules on live market data, get paid
            if you succeed. Operating that promise is not simple. Checkout,
            provisioning, live trading, risk enforcement, payouts, affiliate
            tracking, communications, and internal administration all have to
            agree about what is true at any moment.
          </p>
          <p>
            Run that on disconnected vendor portals and spreadsheets, and
            every gap becomes operational risk: a paid customer without an
            account, a breached account still trading, a payout reviewed
            against stale numbers. The hard part was not any single screen.
            It was keeping one reliable operational state across money,
            accounts, and live decisions.
          </p>
        </CS>

        <CS id="product" title="The product">
          <CaseStudyFigure
            kind="custom"
            accessibleLabel="Product workflow: signup, checkout, provisioning, live trading, rule evaluation, payout review"
            label="Product workflow"
            caption="The lifecycle one platform kept consistent. A workflow view, not an interface."
          >
            <ProductFlowDiagram />
          </CaseStudyFigure>
          <h3 className="pt-2 font-display text-lg font-semibold tracking-tight text-ink">
            For traders
          </h3>
          <p>
            A dashboard built around the evaluation: live balance and
            performance, the objectives governing the account, progress
            toward qualification, and clear signals when a rule was at risk,
            with purchases and email in the same place.
          </p>
          <h3 className="pt-2 font-display text-lg font-semibold tracking-tight text-ink">
            For operators
          </h3>
          <p>
            An internal console over the same data: account operations,
            payment status, lifecycle controls, payout review, risk and rule
            administration, email and retention workflows, affiliate
            management, and the audit trail behind privileged actions.
          </p>
          <CaseStudyFigure
            kind="image"
            image={{
              src: "/work/velocity/command-center.webp",
              alt: "Velocity admin Command Center showing revenue, trader accounts, pending review and payouts, risk flags, platform health, revenue trend, account outcomes, a daily operations brief, and recent accounts, populated with synthetic data",
              width: 1600,
              height: 775,
            }}
            label="Admin command center"
            caption="One operating view for revenue, accounts, risk, payouts, and the day's priorities."
            dataDisclosure="Synthetic data"
          />
          <CaseStudyFigureRow>
            <CaseStudyFigure
              kind="image"
              image={{
                src: "/work/velocity/trader-dashboard.webp",
                alt: "Velocity trader dashboard with total balance, net profit and loss, portfolio performance chart, active account summary, live trades, and recent risk activity",
                width: 1600,
                height: 797,
              }}
              label="Trader dashboard"
              caption="The trader's daily view: balance, performance, live trades, and rule activity."
              dataDisclosure="Anonymized data"
            />
            <CaseStudyFigure
              kind="image"
              image={{
                src: "/work/velocity/account-detail.webp",
                alt: "Velocity trader account detail showing net profit and loss, trading objectives with drawdown and profit target progress, account balance with floor tracking, performance score, and a monthly performance calendar",
                width: 1600,
                height: 795,
              }}
              label="Account detail and objectives"
              caption="Objectives, drawdown floors, and qualification progress on one screen."
              dataDisclosure="Anonymized data"
            />
          </CaseStudyFigureRow>
        </CS>

        <CS id="owned" title="What I owned">
          <p>
            I designed, built, deployed, and operated the platform supporting
            the business: product definition, interface design, application
            architecture, the data model, backend services, the payment and
            trading-data integrations, risk and lifecycle logic, internal
            tooling, deployment, and incident response. It was not handed off
            after launch; I was responsible for how it behaved when
            customers, money, and live decisions moved through it.
          </p>
          <p className="text-[13.5px] text-ink-muted">
            AI coding agents accelerated implementation inside a constrained
            workflow: repository context (CLAUDE.md, an extensive
            architecture reference), scoped task plans, diff review, targeted
            tests, and production verification. The decisions and the
            accountability stayed human.
          </p>
        </CS>

        <CS id="systems" title="The systems inside the platform">
          <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            <div>
              <p className="font-medium text-ink">Payments and billing</p>
              <p className="mt-1 text-[13.5px] leading-relaxed">
                Tokenized checkout, recurring billing, entitlements, and
                webhooks backed by a durable event ledger.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">
                Provisioning and lifecycle
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed">
                A six-step provisioning state machine and one shared
                definition of account state, purchase through archive.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Trading data and risk</p>
              <p className="mt-1 text-[13.5px] leading-relaxed">
                A dedicated service projected the vendor&apos;s live stream
                into Postgres and drove rule monitoring.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Payout operations</p>
              <p className="mt-1 text-[13.5px] leading-relaxed">
                Qualification rules as pure functions, amounts frozen at
                creation, and an operator review workflow.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">
                Communications, retention, and CRM
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed">
                Transactional and campaign email, automations, and a CRM view
                over platform data. Velocity Intelligence (VI Pulse,
                Sentinel, Debrief) added AI-assisted trader analysis; VELOBOT
                automated community operations.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">
                Admin controls and auditability
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed">
                Role gates enforced at the edge and per route, an append-only
                audit log, and read-only forensics scripts.
              </p>
            </div>
          </div>
          <CaseStudyFigureRow>
            <CaseStudyFigure
              kind="image"
              image={{
                src: "/work/velocity/retention-intelligence.webp",
                alt: "Velocity Retention Intelligence screen with trader health scores, behavioral signals, at-risk rankings, and a signal breakdown, populated with synthetic data",
                width: 1600,
                height: 790,
              }}
              label="Retention intelligence"
              caption="Behavioral telemetry turned into a ranked retention worklist for operators."
              dataDisclosure="Synthetic data"
            />
            <CaseStudyFigure
              kind="image"
              image={{
                src: "/work/velocity/email-hub.webp",
                alt: "Velocity Email Hub dashboard with totals for sent, failed, transactional, and campaign email, delivery rate, and a recent activity feed of campaign and automated sends",
                width: 1600,
                height: 801,
              }}
              label="Email hub"
              caption="Transactional and campaign email with delivery health and per-message history."
              dataDisclosure="Synthetic data"
            />
          </CaseStudyFigureRow>
          <CaseStudyFigure
            kind="image"
            image={{
              src: "/work/velocity/trading-rules.webp",
              alt: "Velocity trading rules administration screen showing a funded-account rule with drawdown mode, trading hours, user risk management settings, and the raw rule configuration",
              width: 1600,
              height: 787,
            }}
            label="Trading rules administration"
            caption="Risk parameters and trading controls managed as first-class configuration."
            dataDisclosure="Anonymized data"
          />
        </CS>

        <CS id="decisions" title="Engineering decisions that mattered">
          <CaseStudyDecisionList>
            <CaseStudyDecision
              number={1}
              title="Webhooks as an idempotent ledger"
              summary="Payment events are durable state transitions, not disposable callbacks."
              result="Redelivery, retries, and outages could not corrupt payment state."
            >
              <p>
                Every webhook lands in an events table keyed by a content
                hash of the raw body, so duplicate deliveries become no-ops
                instead of double-charges. Processing runs off the request
                path, with an inline fallback and replay sweeps.
              </p>
            </CaseStudyDecision>
            <CaseStudyDecision
              number={2}
              title="Pure decision kernels"
              summary="Eligibility and rule logic lives in pure functions, separated from the routes that gather data."
              result="The most consequential logic is the most tested and the easiest to reason about."
            >
              <p>
                Payout eligibility, entitlements, affiliate attribution, and
                lifecycle state are deterministic functions: readable,
                reusable, testable without mocking infrastructure.
              </p>
            </CaseStudyDecision>
            <CaseStudyDecision
              number={3}
              title="Money frozen at write time"
              summary="Monetary facts are captured at the moment of decision, never recalculated from changing state."
              result="Financial history stayed stable, auditable, and defensible."
            >
              <p>
                Payouts store amounts in integer cents at creation, and
                affiliate commission rates are snapshotted at conversion.
                Changing a configuration later cannot rewrite what was
                decided.
              </p>
            </CaseStudyDecision>
            <CaseStudyDecision
              number={4}
              title="One lifecycle definition"
              summary="Account state has exactly one derivation, shared by every surface."
              result="Dashboards, jobs, and operator screens stopped disagreeing about what an account was."
            >
              <p>
                State was originally computed inline at five render sites,
                and they drifted. It became a nine-variant discriminated
                union with a single derivation function and a documented rule
                about allowed inputs.
              </p>
            </CaseStudyDecision>
            <CaseStudyDecision
              number={5}
              title="PostgreSQL as the system spine"
              summary="Critical state, constraints, security, and financial records live in one relational database."
              result="One shared source of operational truth."
            >
              <p>
                Schema as timestamped migrations, row-level security on
                user-facing tables, transactions around state transitions,
                realtime publications for live dashboards. Services stay
                stateless; Postgres holds the truth.
              </p>
            </CaseStudyDecision>
          </CaseStudyDecisionList>
        </CS>

        <CS id="architecture" title="Architecture">
          <p>
            One web application served both experiences; everything slow,
            streaming, or scheduled ran outside the request path.
          </p>
          <CaseStudyFigure
            kind="custom"
            accessibleLabel="Velocity platform architecture in five zones: experiences, application, asynchronous processing, data and state, external services"
            caption="Responsibility zones. Requests flow from experiences through the application into data; async services and external providers connect through queues, streams, and webhooks."
          >
            <ArchitectureDiagram />
          </CaseStudyFigure>
          <CaseStudyFigure
            kind="custom"
            accessibleLabel="Payment webhook path: provider event, durable receipt by content hash, queued processing with inline fallback, transactional state update, audit and reconciliation sweeps"
            label="The payment event path"
            caption="How a payment event becomes durable state. Duplicate deliveries die at step two."
          >
            <EventFlowDiagram />
          </CaseStudyFigure>
        </CS>

        <CS id="failed" title="What failed in production">
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
            Launch day broke realtime
          </h3>
          <p>
            The launch-day schema cutover dropped the logical-replication
            publication that live dashboards depended on: balances froze
            while money and trading kept moving. The exact production
            migration path had never been rehearsed against the launch
            baseline. Diagnosed from replication state, restored the same day
            by migration, written up. The durable change: schema-drift
            logging and a launch checklist runbook.
          </p>
          <h3 className="pt-2 font-display text-lg font-semibold tracking-tight text-ink">
            The promo-code race
          </h3>
          <p>
            A read-then-write usage counter let a promotion code be redeemed
            twice under concurrency. The fix: atomic reserve, commit, and
            release SQL functions, with the same compare-and-set pattern now
            guarding recurring-billing retries.
          </p>
          <p>
            The lasting habit from both: production questions get answered by
            read-only forensics scripts, not by clicking around a live
            financial system.
          </p>
        </CS>

        <CS id="outcome" title="Outcome">
          <p>
            Velocity launched publicly in May 2026 and ran the firm&apos;s
            operations through July: real purchases, evaluations on live
            market data, payout reviews, and support, all through one
            platform, with financial and account decisions leaving durable
            records.
          </p>
          <p>
            The evaluation business was wound down in July 2026 because of
            liquidity and operating constraints, and the company began
            pivoting toward software products. The software did what it was
            built to do through the whole operating period; the wind-down
            itself ran through the platform&apos;s own lifecycle machinery,
            with new purchases disabled cleanly.
          </p>
        </CS>

        <CS id="improve" title="What I would improve next">
          <p>
            CI with the existing test suite as a merge gate, instead of local
            runs and push-to-branch deploys. Coverage beyond the pure
            decision kernels, especially the heavy admin surfaces. A
            synthetic-data staging environment that rehearses exact
            production migrations, which is what the launch-day incident
            called for. Earlier separation of a few service boundaries that
            grew inside the web application. Each is scoped by having
            operated the system, not by hindsight alone.
          </p>
        </CS>

        <CS id="detail" title="Supporting technical detail">
          <CaseStudyExpandable
            title="Platform shape and scale"
            summary="Monorepo workspaces and the numbers behind this page"
          >
            <p>
              The platform is a four-workspace Turborepo monorepo: the
              Next.js web application (trader and admin surfaces plus the API
              layer), a worker service for queued jobs, a realtime service
              consuming the vendor&apos;s market-data stream, and a shared
              package holding typed queue contracts, the vendor API client,
              and lifecycle logic.
            </p>
            <p>
              For scale context only: the web application exposes 237 API
              route handlers, the schema spans 83 tables under 69 active
              migrations with 120 row-level-security policies, and the
              history is 878 commits on the main branch, merges included.
              The counts matter as a proxy for the surface area designed,
              built, and operated, not as an argument by volume.
            </p>
          </CaseStudyExpandable>
          <CaseStudyExpandable
            title="Security controls"
            summary="How money and identity data were protected"
          >
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Card data never touches the server: checkout uses client-side
                tokenization, and the backend sees payment nonces only.
              </li>
              <li>
                Tax IDs are encrypted at rest with AES-256-GCM under
                versioned keys, in a separate table, with a rate-limited
                reveal path.
              </li>
              <li>
                Internal service-to-service calls verify an HMAC service
                token with constant-time comparison.
              </li>
              <li>
                21 distinct rate limiters cover checkout, auth, AI, webhooks,
                and public endpoints.
              </li>
              <li>
                Strict security headers with an enforced CSP in production,
                and Sentry across all three services with request-correlation
                IDs.
              </li>
              <li>An append-only admin audit log records privileged actions.</li>
            </ul>
          </CaseStudyExpandable>
          <CaseStudyExpandable
            title="Background work and scheduled jobs"
            summary="What ran outside the request path"
          >
            <p>
              Eight typed BullMQ queues with Zod payload schemas carry
              webhook processing, notifications, certificate generation,
              account syncs, and resumable email campaign sends. Ten Vercel
              cron jobs plus worker-scheduled crons, gated by an endpoint
              allowlist, handle rollups, replay sweeps, and health checks.
            </p>
          </CaseStudyExpandable>
          <CaseStudyExpandable
            title="Testing, deployment, and known gaps"
            summary="What was solid and what was honestly missing"
          >
            <p>
              74 targeted test files exercise the pure decision functions
              (payout eligibility, queue payload schemas, webhook signature
              verification) as plain node scripts, without a test framework.
              Deployment is Vercel for the web application and Railway for
              the worker and realtime services (multi-stage Docker, non-root)
              with staging and production branches. The honest gaps: no CI
              pipeline, no coverage measurement, and largely untested heavy
              UI surfaces. Those would be the first fixes with a second
              engineer on the team.
            </p>
          </CaseStudyExpandable>
          <CaseStudyFigureRow>
            <CaseStudyFigure
              kind="image"
              image={{
                src: "/work/velocity/velocity-intelligence.webp",
                alt: "Velocity Intelligence analysis view with pattern analysis of the author's own trading, market outlook panels, and live insight cards",
                width: 1600,
                height: 792,
              }}
              label="Velocity Intelligence"
              caption="AI-assisted trade analysis over real account data, here reviewing my own trading."
            />
            <CaseStudyFigure
              kind="image"
              image={{
                src: "/work/velocity/vi-pulse.webp",
                alt: "VI Pulse performance scoring screen with a pulse score, psychology, plan adherence, risk management, execution, and consistency sub-scores, and AI commentary",
                width: 1600,
                height: 787,
              }}
              label="VI Pulse"
              caption="Versioned-prompt scoring across psychology, adherence, risk, and consistency."
            />
          </CaseStudyFigureRow>
        </CS>

        <EvidenceNote>
          <p>
            The production source is private because it contains proprietary
            business logic and sensitive operational integrations. Every
            claim on this page traces to the repository&apos;s evidence
            ledger; I am glad to walk through any subsystem in an interview.
          </p>
        </EvidenceNote>
      </CaseStudyShell>
      <SiteFooter />
    </>
  );
}
