import type { Capability } from "@/types/content";

/**
 * Capability-first replacement for the technology directory. Each
 * statement is backed by shipped work recorded in
 * docs/portfolio-evidence.md or by confirmed daily workflow; tools are
 * supporting evidence, not the content. Rendered by the homepage
 * capabilities section.
 */
export const capabilities: Capability[] = [
  {
    title: "Product interfaces and design systems",
    description:
      "Dashboards, admin surfaces, and design systems that people work in all day.",
    tools: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend services and APIs",
    description:
      "Typed APIs, service contracts, and the background workers behind them.",
    tools: ["Node.js", "TypeScript", "Zod"],
  },
  {
    title: "Payments and financial workflows",
    description:
      "Checkout, webhooks, entitlements, payouts, and reconciliation built to survive retries.",
    tools: ["Authorize.Net", "PostgreSQL", "Redis"],
  },
  {
    title: "Internal tools and operational automation",
    description:
      "Operations software shaped by doing the work it supports.",
    tools: ["Salesforce", "Supabase", "BullMQ"],
  },
  {
    title: "Data modeling and PostgreSQL systems",
    description:
      "Schemas written as migrations, row-level security, money in integer cents.",
    tools: ["PostgreSQL", "Supabase", "SQL"],
  },
  {
    title: "AI-native product engineering",
    description:
      "AI features and agent workflows shipped in real products, with architecture, data flow, and security owned.",
    tools: ["OpenAI API", "SSE streaming", "versioned prompts", "model routing"],
  },
  {
    title: "Prompt and context engineering",
    description:
      "Ambiguous requirements turned into structured context, constraints, acceptance criteria, and verification loops.",
    tools: ["Claude Code", "repository context", "structured prompting", "diff review"],
  },
  {
    title: "Production delivery and reliability",
    description:
      "Deploys, monitoring, incident response, and the runbooks that follow.",
    tools: ["Vercel", "Railway", "Docker", "Sentry"],
  },
];
