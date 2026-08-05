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
  title: "ResolveOS · Internal operations case study",
  description:
    "How I turned a spreadsheet and memory-driven collections workflow into a daily operating system for priorities, settlements, payment schedules, forecasting, and reconciliation.",
  alternates: { canonical: "/work/resolveos" },
};

const dailyLoop = [
  "Import or refresh exports",
  "Normalize accounts and schedules",
  "Compute priority",
  "Work follow-ups and settlements",
  "Log actions and payments",
  "Reconcile expected against actual",
];

const dataFlow = [
  { step: "CRM and spreadsheet exports", detail: "source data, inconsistent columns and formats" },
  { step: "Import normalization", detail: "parser plus header aliasing; the only place raw data exists" },
  { step: "Application data model", detail: "normalized accounts, plans, and opportunities in Postgres" },
  { step: "Priority and forecasting logic", detail: "follow-up cadence, SLA states, weighted settlement forecasts" },
  { step: "Operational views", detail: "dashboard, accounts, opportunity pipeline, payments" },
  { step: "Payment logging and month-end close", detail: "actuals recorded, prior months archived into history" },
];

const ladder = [
  { bucket: "P0", age: "0 to 14 days", cadence: "touch every day" },
  { bucket: "P1", age: "15 to 60 days", cadence: "touch every 3 days" },
  { bucket: "P2", age: "61 to 179 days", cadence: "touch every 3 days" },
  { bucket: "P3", age: "180+ days", cadence: "touch every 3 days" },
];

function DailyLoopDiagram() {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2.5 p-5 sm:p-6">
      {dailyLoop.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-lg border border-edge bg-white/[0.02] px-3 py-1.5 text-[12.5px] leading-snug text-ink-secondary">
            {step}
          </span>
          {i < dailyLoop.length - 1 && (
            <span aria-hidden="true" className="text-[12px] text-ink-muted">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function PriorityLadderDiagram() {
  return (
    <ul className="space-y-2 p-5 sm:p-6">
      {ladder.map((row) => (
        <li
          key={row.bucket}
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
        >
          <span className="w-8 shrink-0 font-mono-technical text-[13px] text-accent-bright">
            {row.bucket}
          </span>
          <span className="w-28 shrink-0 text-[13px] text-ink">{row.age}</span>
          <span className="text-[13px] text-ink-secondary">{row.cadence}</span>
        </li>
      ))}
    </ul>
  );
}

function DataFlowDiagram() {
  return (
    <ol className="space-y-0 p-5 sm:p-6">
      {dataFlow.map((item, i) => (
        <li key={item.step} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="font-mono-technical text-[11px] text-accent-bright">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < dataFlow.length - 1 && (
              <span aria-hidden="true" className="my-1 w-px flex-1 bg-edge" />
            )}
          </div>
          <div className={i < dataFlow.length - 1 ? "pb-4" : undefined}>
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

export default function ResolveOSCaseStudy() {
  return (
    <>
      <SkipLink />
      <SiteNav />
      <CommandPalette />
      <RevealObserver />
      <CaseStudyShell>
        <CaseStudyHeader
          eyebrow="Case study · Internal operations software"
          title="ResolveOS"
          summary="A collections workspace that turns fragmented spreadsheets, payment records, follow-up notes, and settlement opportunities into one prioritized daily operating system."
        />

        <CaseStudyAtAGlance
          facts={[
            { label: "Product type", value: "Internal collections operating system" },
            { label: "Status", value: "Used daily in a live collections workflow" },
            { label: "Role", value: "Product engineer, operator, and primary user" },
            {
              label: "Operating context",
              value: "Account management and commercial collections",
            },
            { label: "Primary user", value: "One active operator" },
            {
              label: "Core workflows",
              value:
                "Prioritization, follow-ups, settlements, payments, forecasting, and reconciliation",
            },
            {
              label: "Data sources",
              value: "CRM and spreadsheet exports normalized into one workspace",
            },
          ]}
        />

        <CS id="before" title="The workflow before ResolveOS">
          <p>
            The job ran on exports. Account data arrived as spreadsheets with
            column names that changed depending on which system produced
            them. Follow-up priority lived in memory, payment dates were
            tracked by hand, recurring plans were expanded on paper or not at
            all, and month-end meant copy-pasting totals between files and
            re-checking them. Settlement opportunities were hard to compare
            because nothing sat side by side.
          </p>
          <p>
            The workflow depended on the operator remembering what software
            should have remembered. I was doing this work, not observing it,
            and I got tired of being the database.
          </p>
        </CS>

        <CS id="product" title="The product">
          <p>
            ResolveOS answers the operator&apos;s actual daily questions.{" "}
            <strong>The dashboard</strong> shows portfolio health and expected
            cash for the month. <strong>The accounts view</strong> is a
            prioritized working queue rather than a flat list: who gets worked
            today, who is at risk, who has gone quiet.{" "}
            <strong>The opportunity pipeline</strong> holds settlements in
            stages so offers can be compared and forecast with confidence
            weights. <strong>The payments view</strong> tracks plans and
            expected receipts, so a missed payment is visible the day it
            happens instead of at month-end.
          </p>
          <p>
            Each view exists to make a decision: what to work next, what to
            offer, what to chase, and what actually cleared.
          </p>
          <CaseStudyFigure
            kind="image"
            image={{
              src: "/work/resolveos/dashboard-overview.webp",
              alt: "ResolveOS dashboard with expected cash-in, at-risk value, pipeline forecast, collected total, monthly goal, revenue drivers, workload and risk counts, stage totals, and projection versus collected, populated with synthetic data",
              width: 1600,
              height: 798,
            }}
            label="Dashboard overview"
            caption="Portfolio health and expected cash for the month, answered before the first call."
            dataDisclosure="Synthetic data"
          />
          <CaseStudyFigure
            kind="image"
            image={{
              src: "/work/resolveos/accounts-overview.webp",
              alt: "ResolveOS accounts list with merchants, funders, collection day, start date, amount, frequency, age, priority bucket, last-worked and follow-up status, and next payment dates, populated with synthetic data",
              width: 1600,
              height: 770,
            }}
            label="Accounts overview"
            caption="The working queue: every account with its priority, cadence state, and next payment."
            dataDisclosure="Synthetic data"
          />
          <CaseStudyFigureRow>
            <CaseStudyFigure
              kind="image"
              image={{
                src: "/work/resolveos/opportunity-pipeline.webp",
                alt: "ResolveOS opportunity pipeline board with settlement opportunities in stages from lead through payment plan made, each with amounts, funders, and confidence weights, populated with synthetic data",
                width: 1600,
                height: 792,
              }}
              label="Opportunity pipeline"
              caption="Settlements tracked by stage, with weighted forecasting."
              dataDisclosure="Synthetic data"
            />
            <CaseStudyFigure
              kind="image"
              image={{
                src: "/work/resolveos/payments-overview.webp",
                alt: "ResolveOS payments board organizing accounts by collection day and status with amounts, frequencies, follow-up dates, next payments, and month totals, populated with synthetic data",
                width: 1600,
                height: 792,
              }}
              label="Payments overview"
              caption="Payment plans by collection day, so a missed payment is visible immediately."
              dataDisclosure="Synthetic data"
            />
          </CaseStudyFigureRow>
          <CaseStudyFigure
            kind="custom"
            accessibleLabel="Daily operating loop: import exports, normalize, compute priority, work follow-ups and settlements, log actions and payments, reconcile"
            label="Daily operating loop"
            caption="The loop ResolveOS runs every working day. A workflow view, not an interface."
          >
            <DailyLoopDiagram />
          </CaseStudyFigure>
        </CS>

        <CS id="owned" title="What I owned">
          <p>
            Product definition from doing the work, interface and workflow
            design, import normalization, the data model, priority logic,
            payment scheduling, settlement forecasting, reconciliation,
            deployment, and maintenance. Because I am also the primary user,
            weak assumptions show up immediately in the next working day.
          </p>
        </CS>

        <CS id="decisions" title="Engineering decisions that mattered">
          <CaseStudyDecisionList>
            <CaseStudyDecision
              number={1}
              title="Normalize messy exports at the boundary"
              summary="Every import is translated into one internal representation before the application sees it."
              result="The rest of the application works against clean data it can trust."
            >
              <p>
                Exports arrive with drifting column names, so a fuzzy header
                mapper collapses 28 real-world aliases into 12 canonical
                fields, over a hand-written parser that survives quoted
                fields and embedded newlines. Import complexity stays at the
                boundary.
              </p>
            </CaseStudyDecision>
            <CaseStudyDecision
              number={2}
              title="Prioritize work instead of displaying records"
              summary="A flat account list tells you nothing about what to do next."
              result="The queue answers the daily question directly: who gets worked today."
            >
              <p>
                Every account carries a derived priority and an SLA state
                computed from age and last touch, recomputed live. Fresh
                accounts decay fastest, so they get the tightest cadence.
              </p>
              <CaseStudyFigure
                kind="custom"
                accessibleLabel="Priority ladder: P0 accounts aged 0 to 14 days touched daily; P1, P2, and P3 accounts touched every three days"
                caption="The follow-up ladder encodes how collections actually work: fresh accounts are the most winnable."
              >
                <PriorityLadderDiagram />
              </CaseStudyFigure>
            </CaseStudyDecision>
            <CaseStudyDecision
              number={3}
              title="Expand recurring schedules into explicit obligations"
              summary="A payment plan is not a rule; it is a list of dated expectations."
              result="Forecasting, missed-payment detection, and reconciliation all read the same explicit records."
            >
              <p>
                Recurring agreements expand into dated expected-payment
                records, with hand-written rules per frequency: bi-weekly
                anchored to the start weekday, semi-monthly clamped to day
                28, monthly clamped to short months.
              </p>
            </CaseStudyDecision>
            <CaseStudyDecision
              number={4}
              title="Treat timezones as business logic"
              summary="Spreadsheet dates shifted by a day depending on who was looking."
              result="Scheduling stopped drifting, and the principle carried into later products."
            >
              <p>
                Imported dates crossed midnight during UTC conversion. The
                fix: store local-midday timestamps and do all day math on
                date keys, never on ISO strings.
              </p>
            </CaseStudyDecision>
            <CaseStudyDecision
              number={5}
              title="Separate expected cash from actual receipts"
              summary="Forecasts are estimates; receipts are facts. The workspace keeps them distinct."
              result="Month-end became checking differences, not rebuilding totals."
            >
              <p>
                Weighted forecasts come from pipeline stages, expected
                payments come from schedules, and actual payments are logged
                against accounts, with prior months archived into
                denormalized history that survives account deletion.
              </p>
            </CaseStudyDecision>
          </CaseStudyDecisionList>
        </CS>

        <CS id="architecture" title="Architecture and data flow">
          <p>
            The shape is simple on purpose: a Next.js application on
            Supabase, with the complexity concentrated at the import
            boundary.
          </p>
          <CaseStudyFigure
            kind="custom"
            accessibleLabel="Data flow from CRM and spreadsheet exports through import normalization into the data model, priority and forecasting logic, operational views, and payment reconciliation"
            caption="From messy source exports to normalized operating state. Raw data exists only at the boundary."
          >
            <DataFlowDiagram />
          </CaseStudyFigure>
        </CS>

        <CS id="wrong" title="What went wrong">
          <p>
            The first import pipeline trusted the exports too much, and real
            files broke it: duplicate rows inside one file, re-imports
            creating copies, amounts arriving as text. Deduplication now runs
            on a composite key against both existing accounts and rows within
            the same file, and replace-mode teardown happens in dependency
            order with error short-circuits.
          </p>
          <p>
            Other corrections came from daily use: renames like Touched to
            Worked and Status to Collection Day taught the software the
            operator&apos;s language, and a fix to preserve manually set
            worked dates came from the field, not a spec.
          </p>
          <p>
            None of this was a dramatic outage. It was daily-use feedback
            finding weak assumptions fast, which is exactly what an internal
            tool with its builder as primary user is good at.
          </p>
        </CS>

        <CS id="outcome" title="Outcome">
          <p>
            ResolveOS replaced the spreadsheet and memory workflow it was
            built inside. It is the primary user&apos;s daily workspace: one
            view of accounts, opportunities, schedules, and expected
            payments, with month-end reconciliation reduced to checking
            differences instead of rebuilding totals.
          </p>
        </CS>

        <CS id="improve" title="What I would improve next">
          <p>
            Part of this rebuild is already underway: a 2026 refactor split
            the original oversized page into extracted views, hooks, and
            contexts, and scaffolded an organization model (creditors,
            debtors, cases) with schema-as-code migrations, the groundwork
            for use beyond one operator. Still on the list: automated tests,
            money in integer cents instead of parsed text, deduplication
            enforced by database constraints rather than client-side checks,
            and import validation with real error reporting plus a synthetic
            dataset for safe testing. ResolveOS is where those lessons were
            learned first; the Velocity platform is where they were applied,
            down to its schema-first migrations and integer-cent money.
          </p>
        </CS>

        <CS id="detail" title="Supporting technical detail">
          <CaseStudyExpandable
            title="Import normalization rules"
            summary="How messy spreadsheets become clean records"
          >
            <p>
              A hand-written RFC-4180-style parser handles quoted fields,
              escaped quotes, and embedded newlines. Fuzzy header mapping
              collapses 28 observed header aliases into 12 canonical fields.
              Dates parse from multiple formats with round-trip validation;
              money values are normalized from text. Imports run in append
              mode, which dedupes on a composite key of merchant, client,
              start date, and normalized amount, or replace mode, which
              tears down in dependency order and short-circuits on error.
            </p>
          </CaseStudyExpandable>
          <CaseStudyExpandable
            title="Data model and stack"
            summary="What it runs on"
          >
            <p>
              Next.js and React on a compact seven-table Supabase Postgres
              model, with per-user scoping applied on queries and real
              authentication. For scale context only: the original build was
              roughly 5,600 lines over 31 days, small on purpose for a
              single-operator tool, and a 2026 refactor has since
              restructured it into extracted views, hooks, and contexts with
              schema-as-code migrations.
            </p>
          </CaseStudyExpandable>
          <CaseStudyExpandable
            title="Current limitations"
            summary="Known gaps, stated plainly"
          >
            <p>
              No automated tests, amounts persisted as text rather than
              integer cents, and deduplication enforced client-side rather
              than by a database constraint. One active operator by design;
              the in-progress organization model is the path to multi-user
              use, with permissions and audit history designed in rather
              than added on.
            </p>
          </CaseStudyExpandable>
        </CS>

        <EvidenceNote>
          <p>
            ResolveOS is a private internal product because it operates on
            confidential account and payment information. Nothing from real
            accounts appears in this portfolio; any interface shown uses
            synthetic data.
          </p>
        </EvidenceNote>
      </CaseStudyShell>
      <SiteFooter />
    </>
  );
}
