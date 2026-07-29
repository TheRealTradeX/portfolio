import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import { TilePointerEffect } from "@/components/TilePointer";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies: the Velocity trading platform, ResolveOS collections workspace, and the live velocityfunds.io marketing site.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed top-2 left-2 z-100 rounded-md bg-accent px-4 py-2 text-sm text-white"
      >
        Skip to content
      </a>
      <SiteNav />
      <CommandPalette />
      <RevealObserver />
      <TilePointerEffect />
      <main id="main" className="wrap py-20">
        <p className="eyebrow rv">Work</p>
        <h1 className="rv mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Case studies
        </h1>
        <p className="rv mt-4 max-w-[54ch] text-ink-secondary">
          Each one documents the problem, what I owned, the architecture,
          what failed, and what shipped — with every claim traced to
          repository evidence.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
