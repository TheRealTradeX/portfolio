import type { Project, SystemShipped } from "@/types/content";

/**
 * Every claim here is verified against repository evidence.
 * See docs/portfolio-evidence.md for the claim-by-claim ledger.
 */
export const projects: Project[] = [
  {
    slug: "velocity",
    name: "Velocity Platform",
    eyebrow: "Flagship",
    summary:
      "An end-to-end futures trading evaluation platform: trader dashboards, payments, payouts, risk rules, an internal admin command center, and the infrastructure underneath. 878 commits, sole engineer, launched to production May 2026.",
    status: "Private production system",
    timeline: "Dec 2025 — Jul 2026 · launched 2026-05-04",
    role: "Founding Product Engineer (sole engineer)",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Redis",
      "BullMQ",
      "Vercel",
      "Railway",
    ],
    highlights: [
      "237 API route handlers across a 4-workspace monorepo: web app, background worker, realtime service, shared library",
      "83-table PostgreSQL schema, 69 active migrations, 120 row-level-security policies",
      "Payment webhooks with an idempotency ledger, entitlements, payout eligibility rules, reconciliation crons",
      "Protobuf-over-WSS market-data consumer feeding realtime dashboards and risk monitoring",
    ],
    source: {
      kind: "private",
      note: "The production source is private because it contains proprietary business logic, financial integrations, and customer infrastructure. This case study documents the architecture, decisions, and systems I personally owned.",
      overviewUrl: "https://github.com/TheRealTradeX/velocity-funds-platform",
    },
    featured: true,
  },
  {
    slug: "resolveos",
    name: "ResolveOS",
    eyebrow: "Collections ops",
    summary:
      "An internal workspace that replaced the spreadsheet workflow a real collections operation ran on — CSV-first imports, an age-based follow-up engine, a drag-and-drop status board, and a settlement pipeline with weighted forecasting.",
    status: "Internal tool",
    timeline: "Dec 2025 — Jan 2026",
    role: "Sole builder (self-initiated, alongside the collections work itself)",
    stack: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    highlights: [
      "Hand-written CSV parser with fuzzy header mapping — 29 real-world spreadsheet header aliases",
      "Import deduplication via composite keys; append and replace modes",
      "Age-based follow-up prioritization ladder (P0–P3) encoding real cadence rules",
      "Month-end payment archival with denormalized history snapshots",
    ],
    source: {
      kind: "private",
      note: "Private — built around a real collections operation's workflow. All screenshots and examples on this site use synthetic data.",
    },
    featured: true,
  },
  {
    slug: "velocityfunds-site",
    name: "velocityfunds.io",
    eyebrow: "Marketing site",
    summary:
      "The public face of Velocity Funds: a scroll-driven cinematic launch site with a consent-gated analytics framework, a server-side lead API integrated with the platform CRM, and real shipped performance work.",
    status: "Live",
    timeline: "Mar 2026 — Jul 2026",
    role: "Sole engineer & designer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "three.js", "Vercel"],
    highlights: [
      "Five-act scroll-cinematic homepage with GSAP ScrollTrigger and lazy-loaded three.js",
      "Server-side lead capture proxying into the platform CRM with a service token",
      "First-party consent framework gating Meta/Google/X pixels",
      "Shipped perf work: demo video 76 MB → 4 MB, deferred third-party scripts, custom CSP",
    ],
    source: {
      kind: "private",
      note: "Source private; the shipped result is publicly inspectable at velocityfunds.io.",
    },
    liveUrl: "https://www.velocityfunds.io",
    featured: true,
  },
];

export const systemsShipped: SystemShipped[] = [
  {
    name: "Payment & webhook infrastructure",
    description:
      "Authorize.Net checkout with client-side tokenization (card data never touches the server), recurring billing, and webhook receivers backed by a content-hash idempotency ledger with queue processing and an inline fallback when Redis is unreachable.",
    project: "Velocity Platform",
    stack: ["Authorize.Net", "BullMQ", "PostgreSQL"],
  },
  {
    name: "Payout eligibility engine",
    description:
      "Qualification rules — qualifying days, caps, cooldowns, floors — computed as pure, unit-tested decision functions, with cent-precision amounts frozen at creation so history can never be silently rewritten.",
    project: "Velocity Platform",
    stack: ["TypeScript", "Supabase"],
  },
  {
    name: "Background job & queue layer",
    description:
      "A dedicated worker service on Redis-backed queues for jobs that must not run inside a request — email sends, data rollups, scheduled work.",
    project: "Velocity Platform",
    stack: ["BullMQ", "Redis", "Railway"],
  },
  {
    name: "Email infrastructure",
    description:
      "Transactional and campaign email on Resend: 29 React Email templates, outbox and suppression tables, automation enrollments, a signature-verified event webhook, and resumable campaign sends.",
    project: "Velocity Platform",
    stack: ["Resend", "React Email", "PostgreSQL"],
  },
  {
    name: "AI trader analytics (VI suite)",
    description:
      "VI Pulse, Sentinel, and Debrief: performance scoring, configurable risk rules, and post-session analysis over real account data — 13 versioned prompt files, a model router, per-user usage caps, and SSE streaming.",
    project: "Velocity Platform",
    stack: ["OpenAI API", "TypeScript", "SSE"],
  },
  {
    name: "Discord operations bot",
    description:
      "Community ops automation running the Discord gateway and a FastAPI webhook receiver on one asyncio event loop — engagement telemetry, scheduled weekly reports, ticketing, role gates.",
    project: "VELOBOT",
    stack: ["Python", "discord.py", "FastAPI", "Railway"],
  },
  {
    name: "Edge waitlist API",
    description:
      "Cloudflare Pages Functions on D1: Turnstile verification, IP-hash rate limiting, email dedupe, and full UTM attribution capture.",
    project: "Velocity waitlist",
    stack: ["Cloudflare D1", "Turnstile", "SQL"],
  },
  {
    name: "CSV import & normalization pipeline",
    description:
      "RFC-4180-style parser, fuzzy header aliasing, multi-format date parsing with round-trip validation, and money normalization for messy operational spreadsheets.",
    project: "ResolveOS",
    stack: ["JavaScript", "Supabase"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
