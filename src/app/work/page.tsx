import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { SkipLink } from "@/components/SkipLink";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { RevealObserver } from "@/components/Reveal";
import { TilePointerEffect } from "@/components/TilePointer";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const workDescription =
  "Deployment case studies: the Velocity financial operations platform, the embedded ResolveOS collections deployment, and the live velocityfunds.io acquisition site.";

export const metadata: Metadata = {
  title: "Work",
  description: workDescription,
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work · Jefrey Peralta",
    description: workDescription,
    url: "/work",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jefrey Peralta · Forward Deployed / Applied AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
    title: "Work · Jefrey Peralta",
    description: workDescription,
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
          Deployment stories: the operating problem, the architecture, what
          failed in production, and what shipped.
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
