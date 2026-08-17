import type { Capability } from "@/types/content";

/**
 * Capability-first replacement for the technology directory, ordered as
 * the forward-deployed arc: discover, architect, build, integrate,
 * deploy. Each statement is backed by shipped work recorded in
 * docs/portfolio-evidence.md or by confirmed daily workflow; tools are
 * supporting evidence, not the content. Rendered by the homepage
 * capabilities section.
 */
export const capabilities: Capability[] = [
  {
    title: "Operational discovery and scoping",
    description:
      "I have personally run the workflows I build for. Ambiguous operations become concrete requirements and measurable outcomes.",
    tools: ["collections ops", "trading ops", "CRM ops"],
  },
  {
    title: "System architecture and integration boundaries",
    description:
      "Data models, service boundaries, queues, webhooks, and third-party integrations designed as one topology.",
    tools: ["PostgreSQL", "BullMQ", "webhooks"],
  },
  {
    title: "Full-stack application engineering",
    description:
      "Dashboards, admin surfaces, and typed APIs that people work in all day.",
    tools: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    title: "Payments and financial workflows",
    description:
      "Checkout, webhooks, entitlements, payouts, and reconciliation built to survive retries.",
    tools: ["Authorize.Net", "PostgreSQL", "Redis"],
  },
  {
    title: "Data modeling and PostgreSQL systems",
    description:
      "Schemas written as migrations, row-level security, money in integer cents.",
    tools: ["PostgreSQL", "Supabase", "SQL"],
  },
  {
    title: "Applied AI systems",
    description:
      "LLM features shipped inside real products: versioned prompts, model routing, usage caps, and streaming.",
    tools: ["OpenAI API", "SSE streaming", "versioned prompts", "model routing"],
  },
  {
    title: "Business systems and integrations",
    description:
      "Salesforce and CRM architecture, email infrastructure, market data, and the automation between them.",
    tools: ["Salesforce", "Resend", "protobuf over WSS"],
  },
  {
    title: "Deployment, operations, and reliability",
    description:
      "Deploys, monitoring, incident response, and the runbooks that follow.",
    tools: ["Vercel", "Railway", "Docker", "Sentry"],
  },
];
