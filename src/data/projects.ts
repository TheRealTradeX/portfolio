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
      "A futures evaluation firm run entirely on software I built: checkout, live trading dashboards, risk rules, payouts, and the admin back office. Launched May 2026 and operated in production with real customers and real money.",
    problem:
      "Prop firms normally run on vendor portals, spreadsheets, and support tickets. Every manual hop between those systems is a place where money and trust leak.",
    outcome:
      "Launched May 4, 2026 and ran the firm's live operations: real purchases, evaluations on live market data, and real payouts.",
    status: "Private production system",
    timeline: "Dec 2025 – Jul 2026 · launched May 4, 2026",
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
      "The collections job ran on spreadsheets and memory, so I replaced both. Messy CSV imports become prioritized queues, payment plans, and settlement forecasts. Built inside the workflow it serves and used every working day.",
    problem:
      "Follow-up priority lived in someone's head, payments were logged by hand, and month boundaries meant copy-pasting totals between spreadsheets.",
    outcome:
      "In daily production use since January 2026, running real accounts, payment plans, and settlement tracking.",
    status: "Production",
    timeline: "Dec 2025 – present",
    role: "Sole builder (self-initiated, alongside the collections work itself)",
    stack: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    highlights: [
      "Hand-written CSV parser with fuzzy header mapping: 29 real-world spreadsheet header aliases",
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
    eyebrow: "Marketing site",
    summary:
      "The public face of Velocity Funds: a scroll-driven launch site that is also real infrastructure, with lead capture wired into the platform CRM and consent-gated analytics. Live, and you can click it.",
    problem:
      "A prop firm sells trust, so the marketing site had to feel like the product while doing real jobs: capture leads, respect consent, and stay fast.",
    outcome:
      "Live at velocityfunds.io with an enforcing CSP, consent-gated pixels, and a product demo cut from 76 MB to 4 MB.",
    status: "Live",
    timeline: "Mar 2026 – Jul 2026",
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
