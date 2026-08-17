import type { ExperienceEntry } from "@/types/content";

/**
 * Sourced from Jefrey_Peralta_Resume.pdf (official) and verified repository
 * history. Formal business titles are preserved in `formalTitle`; the
 * engineering-facing framing is in `title`. `brief` drives the condensed
 * homepage timeline; `points` drive the /resume route.
 *
 * Positioning rule: no entry may claim "Forward Deployed Engineer" as a
 * past formal title. The forward-deployed framing lives in how the work
 * is described: embedded in operations, translating business workflows
 * into deployed software.
 */
export const experience: ExperienceEntry[] = [
  {
    company: "Velocity Funds / Velocity Co.",
    title: "Founding Product Engineer",
    formalTitle: "Founder & CEO",
    period: "2025 – Present",
    location: "New Jersey (remote)",
    brief:
      "Designed, built, launched, and operated the platform behind a futures evaluation business: payments, trading, risk controls, payouts, internal operations.",
    summary:
      "Designed, built, deployed, and operated a futures trading evaluation platform: the customer product, the internal admin system, and the infrastructure underneath it, as its only engineer.",
    points: [
      "Translated the business model itself into software requirements: evaluation rules, payout eligibility, risk enforcement, and the operational workflows behind them.",
      "Designed and shipped the trader platform: onboarding, evaluation dashboards, real-time account tracking, analytics, and AI-assisted performance features (OpenAI, versioned prompts, model routing, streaming).",
      "Built the financial infrastructure: checkout and payment webhooks with idempotency handling, entitlements, payout eligibility, and reconciliation against provider records.",
      "Owned the production database, PostgreSQL on Supabase with row-level security, timestamped migrations, and realtime publications, through a real launch and its post-launch incidents.",
      "Ran the supporting systems: transactional and campaign email, an internal CRM view over platform data, a Discord operations bot, and the public marketing site.",
    ],
  },
  {
    company: "Advanced Recovery Group",
    title: "Account Manager",
    period: "2024 – Present",
    brief:
      "Embedded in a live collections operation: I perform the workflow, and built ResolveOS to replace the spreadsheets and memory it ran on.",
    summary:
      "Manage commercial finance accounts, settlements, payment reconciliation, and legal coordination, and independently built ResolveOS, an internal workspace deployed into the workflow the job actually runs on.",
    points: [
      "Translated a live collections workflow's unwritten rules (account cadence, settlement stages, payment plans) into working software while performing the work it supports.",
      "Built CSV-first onboarding tolerant of messy real spreadsheets: fuzzy header mapping, deduplication keys, and multi-format date normalization.",
      "Encoded the operational rules directly: age-based follow-up prioritization, at-risk flagging, and month-end payment archival.",
      "Refined the software's terminology and behavior from daily use inside the operation.",
    ],
  },
  {
    company: "Utopian Estate / Nova Resolutions Group",
    title: "Founder & Managing Partner",
    period: "2021 – 2024",
    brief:
      "Ran service businesses on CRM systems and automations I designed and built.",
    summary:
      "Founded and ran service businesses where the operational tooling was the differentiator: CRM systems, automations, and reporting built to run sales and operations.",
    points: [
      "Built CRM-driven business systems supporting acquisitions, reporting, finance, and operations.",
      "Designed scalable operational workflows and internal business tooling.",
    ],
  },
  {
    company: "Leverage Companies (Private Equity)",
    title: "Lead Acquisition Manager & CRM Systems Developer",
    period: "2019 – 2021",
    location: "Newark, NJ",
    brief:
      "Designed Salesforce architecture and workflow automation, translating leadership's business requirements into CRM systems that scaled operations.",
    summary:
      "Designed, developed, and administered the company's Salesforce CRM while owning the acquisition pipeline.",
    points: [
      "Partnered directly with leadership to translate business requirements into software solutions.",
      "Built workflow automations, dashboards, reporting systems, and lead management processes.",
      "Supported company growth from approximately $50K to $500K in monthly recurring revenue through scalable CRM and operational systems.",
    ],
  },
];
