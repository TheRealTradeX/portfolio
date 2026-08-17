import type { Project, SystemShipped } from "@/types/content";

/**
 * Every claim here is verified against repository evidence.
 * See docs/portfolio-evidence.md for the claim-by-claim ledger.
 */
export const projects: Project[] = [
  {
    slug: "velocity",
    name: "Velocity Platform",
    eyebrow: "Production deployment · Financial operations",
    summary:
      "A futures evaluation firm run entirely on software I built: checkout, live trading dashboards, risk rules, payouts, and the admin back office. Launched May 2026 and operated in production with real customers and real money.",
    problem:
      "Running the evaluation business required checkout, trader accounts, market data, risk enforcement, payments, payouts, and internal operations to work as one system.",
    outcome:
      "One production platform handled the customer and operational lifecycle from signup through trading and payout review.",
    status: "Operated in production, May to July 2026",
    timeline: "Dec 2025 – Jul 2026 · launched May 4, 2026",
    role: "Founder, system architect, and sole engineer",
    visuals: [
      {
        src: "/work/velocity/command-center.webp",
        alt: "Velocity admin Command Center showing revenue, trader accounts, pending payouts, risk flags, platform health, and daily operating priorities, populated with synthetic data",
        width: 1600,
        height: 775,
        caption: "The admin Command Center, one operating view of the whole business. Synthetic data.",
      },
    ],
    visualAreas: [
      "Trader experience",
      "Payments and payouts",
      "Risk and account lifecycle",
      "Admin operations",
    ],
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
    },
    featured: true,
  },
  {
    slug: "resolveos",
    name: "ResolveOS",
    eyebrow: "Embedded deployment · Commercial collections",
    summary:
      "I performed the collections workflow myself, then built the software that replaced its spreadsheets and memory. Messy CSV imports become prioritized queues, payment plans, and settlement forecasts. Deployed into the workflow it serves and used every working day.",
    problem:
      "Collections work depended on spreadsheets, memory, unwritten follow-up rules, and manual payment tracking.",
    outcome:
      "ResolveOS turned that workflow into a daily operating system for priorities, settlements, payment schedules, forecasting, and reconciliation.",
    status: "Used daily in a live collections workflow",
    timeline: "Dec 2025 – present",
    role: "Embedded engineer, operator, and primary user",
    visuals: [
      {
        src: "/work/resolveos/opportunity-pipeline.webp",
        alt: "ResolveOS opportunity pipeline organizing settlement candidates by stage with amounts, funders, confidence weights, and next actions, populated with synthetic data",
        width: 1600,
        height: 792,
        caption: "The settlement pipeline: offers tracked by stage before they become payment plans. Synthetic data.",
      },
    ],
    visualAreas: [
      "Account prioritization",
      "Settlement pipeline",
      "Payment schedules",
      "Reconciliation",
    ],
    stack: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    highlights: [
      "Hand-written CSV parser with fuzzy header mapping: 28 real-world spreadsheet header aliases",
      "Import deduplication via composite keys; append and replace modes",
      "Age-based follow-up prioritization ladder (P0–P3) encoding real cadence rules",
      "Month-end payment archival with denormalized history snapshots",
    ],
    source: {
      kind: "private",
      note: "Private: a personal production tool in daily use, not a commercial product. All screenshots and examples on this site use synthetic data.",
    },
    featured: true,
  },
  {
    slug: "velocityfunds-site",
    name: "velocityfunds.io",
    eyebrow: "Supporting work · Marketing and acquisition",
    summary:
      "The public face of Velocity Funds: a scroll-driven launch site that is also real infrastructure, with lead capture wired into the platform CRM and consent-gated analytics. Live, and you can click it.",
    problem:
      "The company needed a launch experience that could explain the product, capture leads, and connect acquisition activity to the operating platform.",
    outcome:
      "A responsive public product experience with CRM-connected lead capture and consent-aware analytics.",
    status: "Live public website",
    timeline: "Mar 2026 – Jul 2026",
    role: "Product design and full-stack implementation",
    visuals: [
      {
        src: "/work/velocityfunds-site/homepage-overview.webp",
        alt: "velocityfunds.io homepage hero with the launch headline, evaluation call to action, and the first-party cookie consent prompt",
        width: 1600,
        height: 1000,
        caption: "The live homepage hero, consent prompt included by design.",
      },
    ],
    visualAreas: [
      "Product storytelling",
      "Lead capture",
      "CRM integration",
      "Consent-aware analytics",
    ],
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
    featured: false,
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
      "Qualification rules for qualifying days, caps, cooldowns, and floors, computed as pure, unit-tested decision functions, with cent-precision amounts frozen at creation so history can never be silently rewritten.",
    project: "Velocity Platform",
    stack: ["TypeScript", "Supabase"],
  },
  {
    name: "Background job & queue layer",
    description:
      "A dedicated worker service on Redis-backed queues for jobs that must not run inside a request: email sends, data rollups, scheduled work.",
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
      "VI Pulse, Sentinel, and Debrief: performance scoring, configurable risk rules, and post-session analysis over real account data, with 13 versioned prompt files, a model router, per-user usage caps, and SSE streaming.",
    project: "Velocity Platform",
    stack: ["OpenAI API", "TypeScript", "SSE"],
  },
  {
    name: "Discord operations bot",
    description:
      "Community ops automation running the Discord gateway and a FastAPI webhook receiver on one asyncio event loop: engagement telemetry, scheduled weekly reports, ticketing, role gates.",
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
