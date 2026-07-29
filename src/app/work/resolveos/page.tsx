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
import { getProject } from "@/data/projects";

export const metadata: Metadata = {
  title: "ResolveOS — Case Study",
  description:
    "Engineering case study: a collections operations workspace that replaced spreadsheet workflows — CSV import pipeline, age-based follow-up prioritization, settlement pipeline with weighted forecasting.",
  alternates: { canonical: "/work/resolveos" },
};

const project = getProject("resolveos")!;

const ladder = [
  { bucket: "P0", age: "0–14 days", cadence: "touch every 1 day" },
  { bucket: "P1", age: "15–60 days", cadence: "touch every 3 days" },
  { bucket: "P2", age: "61–179 days", cadence: "touch every 3 days" },
  { bucket: "P3", age: "180+ days", cadence: "touch every 3 days" },
];

export default function ResolveOSCaseStudy() {
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
          eyebrow="Case study · Internal tool"
          title="ResolveOS"
          summary="A collections operations workspace built from inside the job it serves — replacing a workflow spread across spreadsheets, manual payment tracking, and memory with a living command center."
          facts={[
            { label: "Status", value: project.status },
            { label: "Timeline", value: `${project.timeline} · 33 commits in 31 days` },
            { label: "Role", value: project.role },
            { label: "Scale", value: "~5,600 LOC · 7-table data model" },
            { label: "Stack", value: project.stack.join(" · ") },
            { label: "Source", value: "Private — synthetic data only on this page" },
          ]}
        />

        <CS id="problem" title="The problem">
          <p>
            A collections operation lives and dies by cadence: which accounts
            get worked today, which payment plans are current, which
            settlements are moving. In practice that state lived in
            spreadsheets — one per concern, none talking to each other, with
            follow-up priority carried in someone&apos;s head. Payments were
            logged by hand; month boundaries meant copy-pasting totals; a
            missed touch on a fresh account meant losing it while it was
            still winnable.
          </p>
          <p>
            I was doing this work, not observing it. ResolveOS exists because
            I got tired of being the database.
          </p>
        </CS>

        <CS id="built" title="What I built">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>CSV-first onboarding</strong> — imports arrive as messy
              exports, so I wrote an RFC-4180-style parser by hand (quoted
              fields, escaped quotes, embedded newlines) with fuzzy header
              mapping: 29 real-world header aliases collapse to 12 canonical
              fields, so &quot;Last Worked&quot;, &quot;Last Touched&quot;,
              and &quot;Last Contact&quot; all just work.
            </li>
            <li>
              <strong>Idempotent imports</strong> — append mode dedupes on a
              composite key (merchant, client, start date, normalized amount)
              against both existing accounts and rows within the same file;
              replace mode tears down in dependency order with error
              short-circuits.
            </li>
            <li>
              <strong>Follow-up engine</strong> — every account carries a
              derived priority and an SLA state (on track / due / at risk /
              no activity) computed from age and last-touch, recomputed live.
            </li>
            <li>
              <strong>Kanban + list workflows</strong> — drag-and-drop status
              boards over user-defined &quot;collection day&quot; columns,
              plus a 14-column sortable table with saved per-view filters.
            </li>
            <li>
              <strong>Settlement pipeline</strong> — a 7-stage opportunity
              board (lead → payment plan made) with per-stage confidence
              weights driving a forecast, and gated bidirectional conversion
              between opportunities and live accounts.
            </li>
            <li>
              <strong>Payment logging and month-end close</strong> — payments
              log against accounts and auto-stamp the worked date; on month
              rollover, prior-month payments archive into a denormalized
              history table (snapshotting names so history survives account
              deletion), keeping the working set hot and the history intact.
            </li>
          </ul>
        </CS>

        <CS id="domain" title="The domain logic is the point">
          <p>
            The prioritization ladder encodes how collections actually work —
            fresh accounts decay fastest, so they get the tightest cadence:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-left">
              <caption className="sr-only">
                Age-based follow-up prioritization ladder
              </caption>
              <thead>
                <tr className="border-b border-edge font-mono-technical text-[10.5px] tracking-[0.14em] text-ink-muted uppercase">
                  <th scope="col" className="py-2.5 pr-4 font-normal">Priority</th>
                  <th scope="col" className="py-2.5 pr-4 font-normal">Account age</th>
                  <th scope="col" className="py-2.5 font-normal">Cadence rule</th>
                </tr>
              </thead>
              <tbody>
                {ladder.map((row) => (
                  <tr key={row.bucket} className="border-b border-edge/50">
                    <td className="py-2.5 pr-4 font-mono-technical text-[13px] text-accent-bright">
                      {row.bucket}
                    </td>
                    <td className="py-2.5 pr-4 text-[14px]">{row.age}</td>
                    <td className="py-2.5 text-[14px] text-ink-secondary">
                      {row.cadence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The subtle bugs were domain bugs too. Dates imported from
            spreadsheets shifted by a day depending on the viewer&apos;s
            timezone — fixed by storing local-midday timestamps and doing all
            day math on date keys, never{" "}
            <code className="font-mono-technical text-[13px]">
              toISOString()
            </code>
            . Recurring payment schedules needed hand-written expansion per
            frequency: bi-weekly anchored to the start weekday, semi-monthly
            clamped to day 28, monthly clamped to short months.
          </p>
          <p>
            The commit history shows the tool being shaped by real use:
            renames like &quot;Touched&quot; → &quot;Worked&quot; and
            &quot;Status&quot; → &quot;Collection Day&quot; came from the
            people using it, and fixes like &quot;preserve manual last
            worked&quot; came from watching it in the field.
          </p>
        </CS>

        <CS id="gaps" title="Honest assessment">
          <p>
            ResolveOS is a working internal tool, not a product. It has real
            auth (Supabase, per-user data scoping on every query), a 7-table
            data model, and audit logging — and it also has the gaps of a
            31-day solo build: no tests, no CI, a single oversized component,
            amounts stored as strings, and dedup enforced client-side rather
            than by a database constraint. Rebuilding it today I would start
            with the schema as code, TypeScript, and money as integers —
            exactly the practices I later used on the Velocity platform,
            which this project predates by design maturity if not by date.
          </p>
        </CS>

        <EvidenceNote>
          <p>
            Private repository — it was built around a real collections
            operation&apos;s workflow. No debtor, merchant, or payment data
            has ever been committed to it (verified across full git
            history), and anything shown from this tool uses synthetic data.
            The feature list above maps one-to-one to code I can walk
            through.
          </p>
        </EvidenceNote>
      </CaseStudyShell>
      <SiteFooter />
    </>
  );
}
