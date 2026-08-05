import type { ExperienceEntry } from "@/types/content";

/**
 * Sourced from Jefrey_Peralta_Resume.pdf (official) and verified repository
 * history. Formal business titles are preserved in `formalTitle`; the
 * engineering-facing framing is in `title`. `brief` drives the condensed
 * homepage timeline; `points` drive the /resume route.
 */
export const experience: ExperienceEntry[] = [
  {
    company: "Velocity Funds / Velocity Co.",
    title: "Founding Product Engineer",
    formalTitle: "Founder & CEO",
    period: "2025 – Present",
    location: "New Jersey (remote)",
    brief:
      "Founded Velocity Funds and built the platform it runs on: payments, trading dashboards, payouts, and the admin back office.",
    summary:
      "Designed, built, and operated a futures trading evaluation platform: the customer product, the internal admin system, and the infrastructure underneath it, as its only engineer.",
    points: [
      "Designed and shipped the trader platform: onboarding, evaluation dashboards, real-time account tracking, analytics, and AI-assisted performance features.",
      "Built the financial infrastructure: checkout and payment webhooks with idempotency handling, entitlements, payout eligibility, and reconciliation against provider records.",
      "Own the production database, PostgreSQL on Supabase with row-level security, timestamped migrations, and realtime publications, through a real launch and its post-launch incidents.",
      "Run the supporting systems: transactional and campaign email, an internal CRM view over platform data, a Discord operations bot, and the public marketing site.",
    ],
  },
  {
    company: "Advanced Recovery Group",
    title: "Account Manager · builder of ResolveOS",
    period: "2024 – Present",
    brief:
      "Work collections accounts by day and built ResolveOS, the workspace the job now runs on.",
    summary:
      "Manage commercial finance accounts, settlements, payment reconciliation, and legal coordination, and independently built ResolveOS, an internal workspace that replaced the spreadsheet workflow the job actually ran on.",
    points: [
      "Translated a live collections workflow (account cadence, settlement stages, payment plans) into working software while doing the work it supported.",
      "Built CSV-first onboarding tolerant of messy real spreadsheets: fuzzy header mapping, deduplication keys, and multi-format date normalization.",
      "Encoded the operational rules directly: age-based follow-up prioritization, at-risk flagging, and month-end payment archival.",
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
      "Owned the Salesforce CRM and the acquisition pipeline it supported.",
    summary:
      "Designed, developed, and administered the company's Salesforce CRM while owning the acquisition pipeline.",
    points: [
      "Built workflow automations, dashboards, reporting systems, and lead management processes.",
      "Supported company growth from approximately $50K to $500K in monthly recurring revenue through scalable CRM and operational systems.",
      "Partnered directly with leadership to translate business requirements into software solutions.",
    ],
  },
];
