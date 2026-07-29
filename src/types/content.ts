export type ProjectStatus =
  | "Production"
  | "Private production system"
  | "Live"
  | "Internal tool"
  | "Active development"
  | "Archived case study";

export type SourceAvailability =
  | { kind: "public"; url: string }
  | { kind: "private"; note: string; overviewUrl?: string };

export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  status: ProjectStatus;
  timeline: string;
  role: string;
  stack: string[];
  highlights: string[];
  source: SourceAvailability;
  liveUrl?: string;
  featured: boolean;
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
  summary: string;
  points: string[];
};

export type SkillCategory = {
  label: string;
  items: { name: string; usedIn?: string[] }[];
};
