import { siteConfig } from "@/data/site";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="wrap mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-edge py-10 font-mono-technical text-[11.5px] tracking-wide text-ink-muted">
      <span>© {year} Jefrey Peralta</span>
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
      </span>
    </footer>
  );
}
