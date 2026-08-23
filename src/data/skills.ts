import type { ResumeSkillGroup } from "@/types/content";

/**
 * Skill groups for the HTML resume route (/resume), organized around
 * forward-deployed / applied-AI capabilities rather than a flat
 * technology directory. Every technology is backed by repository
 * evidence (docs/portfolio-evidence.md) or confirmed daily workflow:
 * Python and FastAPI via VELOBOT, Cloudflare via the D1 waitlist API
 * and the live site, market data via the protobuf-over-WSS consumer.
 * The homepage presents capabilities (src/data/capabilities.ts).
 */
export const resumeSkills: ResumeSkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    label: "Application engineering",
    items: ["React", "Next.js", "Node.js", "FastAPI", "Tailwind CSS"],
  },
  {
    label: "Data & distributed systems",
    items: [
      "PostgreSQL",
      "Supabase",
      "Redis",
      "BullMQ queues",
      "webhooks",
      "realtime data pipelines",
    ],
  },
  {
    label: "Applied AI",
    items: [
      "OpenAI APIs",
      "LLM product integration",
      "versioned prompt management",
      "model routing",
      "SSE streaming",
      "usage controls",
      "AI-assisted engineering (OpenAI Codex, Claude Code, context engineering, human-in-the-loop review)",
    ],
  },
  {
    label: "Infrastructure",
    items: ["Vercel", "Railway", "Docker", "Cloudflare", "Sentry", "Git & GitHub"],
  },
  {
    label: "Business systems & integrations",
    items: [
      "Salesforce",
      "CRM architecture",
      "workflow automation",
      "Authorize.Net payments",
      "subscription billing",
      "reconciliation",
      "transactional email",
      "market data feeds",
    ],
  },
];
