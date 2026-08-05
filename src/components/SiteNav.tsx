import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { CommandPaletteTrigger } from "@/components/CommandPalette";

export function SiteNav() {
  return (
    <nav className="sticky top-4 z-60 px-(--gutter)" aria-label="Primary">
      <div className="nav-glass mx-auto flex max-w-(--maxw) items-center justify-between gap-4 py-2.5 pr-3 pl-5">
        <Link
          href="/"
          className="font-mono-technical text-[12.5px] tracking-[0.14em] text-ink"
        >
          JEFREY<b className="font-medium text-accent-bright">.</b>PERALTA
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden rounded-full px-3 py-2 font-mono-technical text-[11.5px] tracking-[0.1em] text-ink-muted uppercase transition-colors hover:bg-white/5 hover:text-ink sm:inline-block"
            >
              {link.label}
            </Link>
          ))}
          <CommandPaletteTrigger className="rounded-full border border-edge px-3.5 py-2 font-mono-technical text-[11.5px] tracking-[0.08em] text-ink-muted uppercase transition-colors hover:border-edge-strong hover:text-ink" />
          <Link
            href="/#contact"
            className="hidden rounded-full bg-accent px-4 py-2 font-mono-technical text-[11.5px] font-medium tracking-[0.08em] text-white uppercase transition-colors hover:bg-accent-bright hover:text-background min-[380px]:inline-block"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
