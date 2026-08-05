export type ProjectStatus =
  | "Operated in production, May to July 2026"
  | "Used daily in a live collections workflow"
  | "Live public website";

export type SourceAvailability =
  | { kind: "public"; url: string }
  | { kind: "private"; note: string; overviewUrl?: string };

/**
 * A product visual (screenshot or diagram) stored under /public.
 * Explicit dimensions are required so rendering never causes layout
 * shift. Screenshots must be sanitized exports only — see
 * docs/visual-assets-plan.md. Raw captures never enter the repository.
 */
export type ProjectVisual = {
  /** Public path, e.g. "/work/velocity/velocity-command-center.webp" */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** One line explaining what the interface enables. */
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  /** The operational problem the product exists to solve. One or two sentences. */
  problem: string;
  /** What shipped and what changed, stated without volume metrics. */
  outcome: string;
  status: ProjectStatus;
  timeline: string;
  role: string;
  stack: string[];
  highlights: string[];
  source: SourceAvailability;
  liveUrl?: string;
  featured: boolean;
  /** Ordered visuals; the first is the primary homepage artifact. */
  visuals?: ProjectVisual[];
  /**
   * Verified system areas shown by the showcase fallback visual until
   * sanitized screenshots land. Visual summaries, never fabricated UI.
   */
  visualAreas?: string[];
};

export type SystemShipped = {
  name: string;
  description: string;
  project: string;
  stack: string[];
};

export type ExperienceEntry = {
  company: string;
  title: string;
  formalTitle?: string;
  period: string;
  location?: string;
  /** One-line version for the condensed homepage timeline. */
  brief: string;
  summary: string;
  points: string[];
};

export type SkillCategory = {
  label: string;
  items: { name: string; usedIn?: string[] }[];
};

/**
 * A capability statement: what I can build, with technologies as
 * supporting evidence rather than the content itself.
 */
export type Capability = {
  title: string;
  description: string;
  tools: string[];
};
