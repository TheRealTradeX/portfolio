import { siteConfig } from "@/data/site";

const buildDate = new Date().toISOString().slice(0, 10);
const commit = process.env.NEXT_PUBLIC_COMMIT_SHA?.slice(0, 7);

export function SiteFooter() {
  return (
    <footer className="wrap mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-edge py-10 font-mono-technical text-[11.5px] tracking-wide text-ink-muted">
      <span>© {buildDate.slice(0, 4)} Jefrey Peralta</span>
      <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent-bright"
        >
          GitHub ↗
        </a>
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent-bright"
        >
          LinkedIn ↗
        </a>
        <span aria-label="Build information">
          built {buildDate}
          {commit ? ` · ${commit}` : ""}
        </span>
      </span>
    </footer>
  );
}
