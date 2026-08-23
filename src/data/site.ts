/**
 * Central site configuration. Every external link, contact detail, and
 * metadata string lives here — never hardcode these in components.
 *
 * NEXT_PUBLIC_SITE_URL may override the URL at deploy time (e.g. on
 * Vercel); the fallback is the canonical production deployment.
 *
 * Positioning note: the site leads with the broad software-engineering role
 * Jefrey is applying for now while preserving full-stack systems and applied
 * AI as differentiators. Past titles remain accurate in src/data/experience.ts.
 */
export const siteConfig = {
  name: "Jefrey Peralta",
  role: "Software Engineer · Full-Stack Systems · Applied AI",
  tagline: "Production Software · Full-Stack Systems · Applied AI",
  description:
    "Software engineer who turns complex operational problems into production full-stack software and applied AI systems, from architecture through deployment and iteration.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jefrey-peralta.vercel.app",
  location: "New Jersey, USA",
  availability: "Open to software, product, and applied AI engineering roles",
  email: "peraltajefrey@gmail.com",
  links: {
    github: "https://github.com/TheRealTradeX",
    linkedin: "https://www.linkedin.com/in/jefrey-peralta-203719139/",
    resume: "/resume.pdf",
  },
} as const;

export type SiteConfig = typeof siteConfig;
