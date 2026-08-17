/**
 * Central site configuration. Every external link, contact detail, and
 * metadata string lives here — never hardcode these in components.
 *
 * NEXT_PUBLIC_SITE_URL may override the URL at deploy time (e.g. on
 * Vercel); the fallback is the canonical production deployment.
 *
 * Positioning note: "Forward Deployed / Applied AI Engineer" is the
 * career specialization this portfolio is built around. It is never
 * presented as a past formal job title; past titles remain accurate in
 * src/data/experience.ts.
 */
export const siteConfig = {
  name: "Jefrey Peralta",
  role: "Forward Deployed / Applied AI Engineer",
  tagline: "Production Software · AI Systems · Business Operations",
  description:
    "Forward deployed / applied AI engineer who turns complex operational problems into production software and AI systems, from discovery and architecture through deployment and iteration.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jefrey-peralta.vercel.app",
  location: "New Jersey, USA",
  availability: "Open to forward deployed and applied AI roles",
  email: "peraltajefrey@gmail.com",
  links: {
    github: "https://github.com/TheRealTradeX",
    linkedin: "https://www.linkedin.com/in/jefrey-peralta-203719139/",
    resume: "/resume.pdf",
  },
} as const;

export type SiteConfig = typeof siteConfig;
