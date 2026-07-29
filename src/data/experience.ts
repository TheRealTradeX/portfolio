import type { ExperienceEntry } from "@/types/content";

/**
 * Sourced from Jefrey_Peralta_Resume_v4_Draft.docx and verified repository
 * history. Formal business titles are preserved in `formalTitle`; the
 * engineering-facing framing is in `title`.
 */
export const experience: ExperienceEntry[] = [
  {
    company: "Velocity Funds / Velocity Labs",
    title: "Founding Product Engineer",
    formalTitle: "Founder & CEO",
    period: "2025 — Present",
    location: "New Jersey (remote)",
    summary:
      "Built and operate an end-to-end futures trading evaluation platform — the customer product, the internal admin system, and the infrastructure underneath it. Sole engineer across 900+ commits.",
    points: [
      "Designed and shipped the trader platform: onboarding, evaluation dashboards, real-time account tracking, analytics, and AI-assisted performance features.",
      "Built the financial infrastructure: checkout and payment webhooks with idempotency handling, entitlements, payout eligibility, and reconciliation against provider records.",
      "Own the production database — PostgreSQL on Supabase with row-level security, timestamped migrations, and realtime publications — through a real launch and its post-launch incidents.",
      "Run the supporting systems: transactional and campaign email, an internal CRM view over platform data, a Discord operations bot, and the public marketing site.",
    ],
  },
  {
    company: "Advanced Recovery Group",
    title: "Collections Operations — builder of ResolveOS",
    period: "2025 — 2026",
    summary:
      "Worked inside a debt-collections operation and independently built ResolveOS, an internal workspace that replaced the spreadsheet workflow the job actually ran on. The software was self-initiated, not an assigned engineering role.",
    points: [
      "Translated a live collections workflow — account cadence, settlement stages, payment plans — into working software while doing the work it supported.",
      "Built CSV-first onboarding tolerant of messy real spreadsheets: fuzzy header mapping, deduplication keys, and multi-format date normalization.",
      "Encoded the operational rules directly: age-based follow-up prioritization, at-risk flagging, and month-end payment archival.",
    ],
  },
  {
    company: "Nova Resolutions Group / Utopian Estate",
    title: "Founder · Technical Systems Architect",
    period: "Prior experience",
    summary:
      "Founded and ran service businesses where the operational tooling was the differentiator — CRM systems, automations, and reporting built to run sales and operations.",
    points: [
      "Designed CRM systems and operational workflows supporting sales and business operations.",
      "Built automations, reporting dashboards, and process improvements that reduced manual work and improved visibility.",
    ],
  },
  {
    company: "Leverage Companies",
    title: "CRM Systems Engineer",
    period: "2019 — 2021",
    location: "Newark, NJ",
    summary:
      "Owned the Salesforce-based acquisition pipeline for a real-estate investment firm.",
    points: [
      "Configured and extended Salesforce CRM with automations, reporting, and operational tooling.",
      "Built executive dashboards across CRM and Google Suite for transparent pipeline KPIs.",
    ],
  },
];
