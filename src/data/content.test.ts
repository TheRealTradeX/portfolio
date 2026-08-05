import { describe, expect, it } from "vitest";
import { projects, systemsShipped, getProject } from "./projects";
import { experience } from "./experience";
import { skills } from "./skills";
import { capabilities } from "./capabilities";
import { siteConfig } from "./site";
import { navLinks } from "./navigation";

describe("site config", () => {
  it("has a real email and valid external links", () => {
    expect(siteConfig.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(siteConfig.links.github).toMatch(/^https:\/\/github\.com\//);
    expect(siteConfig.links.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
    expect(siteConfig.url).toMatch(/^https:\/\//);
  });

  it("resume link points at the official PDF", () => {
    expect(siteConfig.links.resume).toBe("/resume.pdf");
  });

  it("the resume PDF asset actually exists", async () => {
    const { existsSync } = await import("node:fs");
    const { join } = await import("node:path");
    expect(existsSync(join(process.cwd(), "public", "resume.pdf"))).toBe(true);
  });

  it("contains no placeholder values", () => {
    const json = JSON.stringify(siteConfig);
    expect(json).not.toMatch(/YOUR-USERNAME|example\.com|placeholder/i);
  });
});

describe("copy hygiene", () => {
  it("published copy contains no em dashes", () => {
    const json = JSON.stringify({
      siteConfig,
      projects,
      systemsShipped,
      experience,
      skills,
      capabilities,
    });
    expect(json).not.toMatch(/—/);
  });

  it("project summaries stay card-sized and problem/outcome are stated", () => {
    for (const p of projects) {
      expect(p.summary.length).toBeLessThan(360);
      expect(p.problem.length).toBeGreaterThan(40);
      expect(p.outcome.length).toBeGreaterThan(40);
    }
  });
});

describe("projects", () => {
  it("has exactly three featured projects", () => {
    expect(projects.filter((p) => p.featured)).toHaveLength(3);
  });

  it("every project has required fields and a unique slug", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    expect(slugs.size).toBe(projects.length);
    for (const p of projects) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.summary.length).toBeGreaterThan(40);
      expect(p.highlights.length).toBeGreaterThanOrEqual(3);
      expect(p.stack.length).toBeGreaterThan(0);
    }
  });

  it("private-source projects carry a disclosure note", () => {
    for (const p of projects) {
      if (p.source.kind === "private") {
        expect(p.source.note.length).toBeGreaterThan(20);
      }
    }
  });

  it("live URLs are https and never fake statuses", () => {
    for (const p of projects) {
      if (p.liveUrl) expect(p.liveUrl).toMatch(/^https:\/\//);
      expect(p.status).not.toMatch(/[+▲]\s*\d/);
    }
  });

  it("never claims technologies ruled out by the audit", () => {
    const banned = /stripe|anthropic|metatrader|dxtrade|tradelocker|\brise\b/i;
    const json = JSON.stringify({
      projects,
      systemsShipped,
      skills,
      capabilities,
      experience,
    });
    expect(json).not.toMatch(banned);
  });

  it("visuals, when set, exist under public/ with real alt text", async () => {
    const { existsSync } = await import("node:fs");
    const { join } = await import("node:path");
    for (const p of projects) {
      for (const visual of p.visuals ?? []) {
        expect(visual.src.startsWith("/work/")).toBe(true);
        expect(
          existsSync(join(process.cwd(), "public", visual.src)),
          `missing asset: ${visual.src}`,
        ).toBe(true);
        expect(visual.alt.length).toBeGreaterThan(10);
        expect(visual.width).toBeGreaterThan(0);
        expect(visual.height).toBeGreaterThan(0);
      }
    }
  });

  it("getProject resolves every case-study route", () => {
    for (const slug of ["velocity", "resolveos", "velocityfunds-site"]) {
      expect(getProject(slug)).toBeDefined();
    }
  });
});

describe("experience & skills", () => {
  it("experience entries are complete", () => {
    expect(experience.length).toBeGreaterThanOrEqual(3);
    for (const entry of experience) {
      expect(entry.points.length).toBeGreaterThan(0);
      expect(entry.summary.length).toBeGreaterThan(20);
      expect(entry.brief.length).toBeGreaterThan(20);
      expect(entry.brief.length).toBeLessThan(160);
    }
  });

  it("skills contain no proficiency percentages", () => {
    expect(JSON.stringify(skills)).not.toMatch(/\d+\s*%/);
  });
});

describe("capabilities", () => {
  it("each capability is a short statement with supporting tools", () => {
    expect(capabilities.length).toBeGreaterThanOrEqual(6);
    for (const c of capabilities) {
      expect(c.title.length).toBeGreaterThan(0);
      expect(c.description.length).toBeGreaterThan(20);
      expect(c.description.length).toBeLessThan(160);
      expect(c.tools.length).toBeGreaterThan(0);
    }
  });
});

describe("navigation", () => {
  it("links are internal anchors or routes", () => {
    for (const link of navLinks) {
      expect(link.href).toMatch(/^\//);
    }
  });
});
