import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SkipLink } from "@/components/SkipLink";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import { TilePointerEffect } from "@/components/TilePointer";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies: the Velocity financial operations platform, the ResolveOS collections workspace, and the live velocityfunds.io marketing site.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work · Jefrey Peralta",
    description:
      "Case studies: the Velocity financial operations platform, the ResolveOS collections workspace, and the live velocityfunds.io marketing site.",
    url: "/work",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jefrey Peralta · Full-Stack Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
    title: "Work · Jefrey Peralta",
    description:
      "Case studies: the Velocity financial operations platform, the ResolveOS collections workspace, and the live velocityfunds.io marketing site.",
  },
};

export default function WorkPage() {
  return (
    <>
      <SkipLink />
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
          The problem, the architecture, what failed, and what shipped.
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
