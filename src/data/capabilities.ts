import type { Capability } from "@/types/content";

/**
 * Capability-first replacement for the technology directory. Each
 * statement is backed by shipped work recorded in
 * docs/portfolio-evidence.md; tools are supporting evidence, not the
 * content. Rendered by the homepage capabilities section (Phase 4).
 */
export const capabilities: Capability[] = [
  {
    title: "Product interfaces",
    description:
      "Dashboards, admin surfaces, and design systems that people work in all day.",
    tools: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "APIs and backend services",
    description:
      "Typed route handlers, service contracts, and the background workers behind them.",
    tools: ["Node.js", "TypeScript", "Zod"],
  },
  {
    title: "Payments and financial workflows",
    description:
      "Checkout, webhooks, entitlements, payouts, and reconciliation built to survive retries and redelivery.",
    tools: ["Authorize.Net", "PostgreSQL", "Redis"],
  },
  {
    title: "Data modeling",
    description:
      "Schemas written as migrations, secured with row-level security, with money stored in integer cents.",
    tools: ["PostgreSQL", "Supabase", "SQL"],
  },
  {
    title: "Background processing and automation",
    description:
      "Queues, scheduled jobs, and event-driven pipelines for work that must not run inside a request.",
    tools: ["BullMQ", "Redis", "Railway"],
  },
  {
    title: "AI-assisted product features",
    description:
      "LLM features with versioned prompts, model routing, usage caps, and streaming, shipped inside a real product.",
    tools: ["OpenAI API", "SSE"],
  },
  {
    title: "CRM and internal operations tooling",
    description:
      "Internal tools shaped by doing the work they support, from collections to trader operations.",
    tools: ["Salesforce", "Supabase", "Next.js"],
  },
  {
    title: "Production operations",
    description:
      "Deploys, monitoring, incident response, and the runbooks that come out of them.",
    tools: ["Vercel", "Railway", "Docker", "Sentry"],
  },
];
