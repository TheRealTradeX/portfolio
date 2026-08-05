/**
 * Central site configuration. Every external link, contact detail, and
 * metadata string lives here — never hardcode these in components.
 *
 * NEXT_PUBLIC_SITE_URL should be set at deploy time (e.g. on Vercel).
 * The fallback is a placeholder until the production domain is chosen.
 */
export const siteConfig = {
  name: "Jefrey Peralta",
  role: "Full-Stack Product Engineer",
  description:
    "Full-stack product engineer who turns messy business operations into production software: payment infrastructure, internal tools, automation, and AI-assisted workflows.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jefrey-peralta.vercel.app",
  location: "New Jersey, USA",
  availability: "Open to software engineering opportunities",
  email: "peraltajefrey@gmail.com",
  links: {
    github: "https://github.com/TheRealTradeX",
    linkedin: "https://www.linkedin.com/in/jefrey-peralta-203719139/",
    resume: "/resume.pdf",
  },
} as const;

export type SiteConfig = typeof siteConfig;
