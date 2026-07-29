import type { SkillCategory } from "@/types/content";

/**
 * Every entry is backed by repository evidence — see docs/portfolio-evidence.md.
 * `usedIn` references project slugs/names where the tool appears in code.
 */
export const skills: SkillCategory[] = [
  {
    label: "Product Frontend",
    items: [
      { name: "React", usedIn: ["Velocity Platform", "ResolveOS", "velocityfunds.io"] },
      { name: "Next.js", usedIn: ["Velocity Platform", "ResolveOS", "velocityfunds.io"] },
      { name: "TypeScript", usedIn: ["Velocity Platform", "velocityfunds.io"] },
      { name: "Tailwind CSS", usedIn: ["Velocity Platform", "ResolveOS", "velocityfunds.io"] },
      { name: "GSAP", usedIn: ["velocityfunds.io"] },
    ],
  },
  {
    label: "Backend & Data",
    items: [
      { name: "Node.js", usedIn: ["Velocity Platform"] },
      { name: "PostgreSQL", usedIn: ["Velocity Platform", "ResolveOS"] },
      { name: "Supabase", usedIn: ["Velocity Platform", "ResolveOS"] },
      { name: "REST APIs & webhooks", usedIn: ["Velocity Platform", "VELOBOT"] },
      { name: "Redis & BullMQ", usedIn: ["Velocity Platform"] },
      { name: "Zod", usedIn: ["Velocity Platform"] },
      { name: "Python (asyncio)", usedIn: ["VELOBOT"] },
      { name: "SQL migrations & RLS", usedIn: ["Velocity Platform"] },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { name: "Vercel", usedIn: ["Velocity Platform", "velocityfunds.io"] },
      { name: "Railway", usedIn: ["Velocity Platform", "VELOBOT"] },
      { name: "Docker", usedIn: ["Velocity Platform"] },
      { name: "Cloudflare (Pages, D1, Turnstile)", usedIn: ["Velocity waitlist"] },
      { name: "Sentry", usedIn: ["Velocity Platform"] },
      { name: "Security headers & CSP", usedIn: ["Velocity Platform", "velocityfunds.io"] },
    ],
  },
  {
    label: "Product Integrations",
    items: [
      { name: "Payments (Authorize.Net)", usedIn: ["Velocity Platform"] },
      { name: "Email (Resend + React Email)", usedIn: ["Velocity Platform"] },
      { name: "Market data (dxFeed, protobuf/WSS)", usedIn: ["Velocity Platform"] },
      { name: "OpenAI API", usedIn: ["Velocity Platform"] },
      { name: "Discord API", usedIn: ["VELOBOT"] },
      { name: "Salesforce", usedIn: ["Leverage Companies"] },
    ],
  },
  {
    label: "Workflow",
    items: [
      { name: "Git & GitHub" },
      { name: "VS Code" },
      { name: "Claude Code" },
      { name: "Figma" },
    ],
  },
];
