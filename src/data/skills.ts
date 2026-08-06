import type { ResumeSkillGroup } from "@/types/content";

/**
 * Skill groups for the HTML resume route (/resume). Mirrors the
 * official PDF's categories, corrected and extended: every technology
 * is backed by repository evidence (docs/portfolio-evidence.md) or
 * confirmed daily workflow. The homepage presents capabilities
 * (src/data/capabilities.ts) instead of a technology directory.
 */
export const resumeSkills: ResumeSkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "PostgreSQL", "Supabase", "Redis", "BullMQ", "REST APIs & webhooks"],
  },
  {
    label: "Infrastructure",
    items: ["Vercel", "Railway", "Docker", "Git & GitHub"],
  },
  {
    label: "FinTech",
    items: [
      "Authorize.Net",
      "payment processing",
      "subscription billing",
      "payment webhooks",
      "reconciliation",
    ],
  },
  {
    label: "AI-assisted engineering",
    items: [
      "Prompt engineering",
      "Context engineering",
      "Claude Code",
      "Agentic development workflows",
      "Human-in-the-loop review",
      "Automated verification",
    ],
  },
  {
    label: "Business systems",
    items: ["Salesforce", "CRM architecture", "workflow automation"],
  },
];
