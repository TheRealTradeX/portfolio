"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/data/site";

type CommandGroup = "Pages" | "Case studies" | "Links" | "Actions";

type Command = {
  id: string;
  label: string;
  group: CommandGroup;
  keywords: string;
  external?: boolean;
  run: () => void;
};

const GROUP_ORDER: CommandGroup[] = ["Pages", "Case studies", "Links", "Actions"];

const OPEN_EVENT = "jp:open-palette";
const STATE_EVENT = "jp:palette-state";

/** Dispatch from any visible trigger (e.g. the nav button). */
export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

/**
 * Nav trigger for the site menu. Reads "Menu" on small screens and the
 * platform shortcut on larger ones; tracks the palette's open state for
 * aria-expanded via a window event.
 */
const noopSubscribe = () => () => {};

export function CommandPaletteTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => /mac|iphone|ipad/i.test(navigator.platform),
    () => false,
  );

  useEffect(() => {
    function onState(e: Event) {
      setOpen((e as CustomEvent).detail?.open === true);
    }
    window.addEventListener(STATE_EVENT, onState);
    return () => window.removeEventListener(STATE_EVENT, onState);
  }, []);

  return (
    <button
      type="button"
      className={className}
      onClick={() => openCommandPalette()}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls="site-menu"
      aria-label="Menu"
    >
      <span className="sm:hidden">Menu</span>
      <span className="hidden sm:inline" aria-hidden="true">
        {isMac ? "⌘K" : "Ctrl K"}
      </span>
    </button>
  );
}

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  return (
    el.isContentEditable ||
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.tagName === "SELECT"
  );
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState("");

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    previousFocus.current?.focus();
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      {
        id: "home",
        label: "Home",
        group: "Pages",
        keywords: "home start top hero",
        run: () => router.push("/"),
      },
      {
        id: "selected-work",
        label: "Selected work",
        group: "Pages",
        keywords: "selected work projects products showcase",
        run: () => router.push("/#work"),
      },
      {
        id: "work-index",
        label: "Work",
        group: "Pages",
        keywords: "work index all case studies",
        run: () => router.push("/work"),
      },
      {
        id: "about",
        label: "About",
        group: "Pages",
        keywords: "about background story",
        run: () => router.push("/about"),
      },
      {
        id: "resume",
        label: "Resume",
        group: "Pages",
        keywords: "resume cv download pdf",
        run: () => router.push("/resume"),
      },
      {
        id: "contact",
        label: "Contact",
        group: "Pages",
        keywords: "contact email hire reach",
        run: () => router.push("/#contact"),
      },
      {
        id: "velocity",
        label: "Velocity Platform",
        group: "Case studies",
        keywords: "velocity trading platform fintech case study",
        run: () => router.push("/work/velocity"),
      },
      {
        id: "resolveos",
        label: "ResolveOS",
        group: "Case studies",
        keywords: "resolveos collections operations case study",
        run: () => router.push("/work/resolveos"),
      },
      {
        id: "velocityfunds-site",
        label: "velocityfunds.io",
        group: "Case studies",
        keywords: "velocityfunds marketing site launch case study",
        run: () => router.push("/work/velocityfunds-site"),
      },
      {
        id: "github",
        label: "GitHub",
        group: "Links",
        external: true,
        keywords: "github code repositories source",
        run: () => window.open(siteConfig.links.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        group: "Links",
        external: true,
        keywords: "linkedin profile connect",
        run: () => window.open(siteConfig.links.linkedin, "_blank", "noopener"),
      },
      {
        id: "email",
        label: "Copy email address",
        group: "Actions",
        keywords: "email contact copy mail",
        run: () => {
          navigator.clipboard
            .writeText(siteConfig.email)
            .then(() => setAnnouncement("Email copied to clipboard"))
            .catch(() => {
              window.location.href = `mailto:${siteConfig.email}`;
            });
        },
      },
    ],
    [router],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) || c.keywords.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const grouped = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        group,
        items: filtered.filter((c) => c.group === group),
      })).filter((g) => g.items.length > 0),
    [filtered],
  );

  // Global keyboard handling: ⌘K / Ctrl+K toggle only.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        if (isTypingTarget(e.target) && !open) return;
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            previousFocus.current = document.activeElement as HTMLElement;
          }
          return !prev;
        });
      }
    }

    function onOpenEvent() {
      previousFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_EVENT, onOpenEvent);
    };
  }, [open]);

  // Broadcast open state for trigger aria-expanded.
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(STATE_EVENT, { detail: { open } }),
    );
  }, [open]);

  // Lock background scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Focus trap + Escape while open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
          'input, button, [tabindex]:not([tabindex="-1"])',
        );
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) {
    return (
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    );
  }

  const activeIndex = Math.min(active, filtered.length - 1);

  function runCommand(cmd: Command) {
    close();
    cmd.run();
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[12vh]"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={close}
      />
      <div
        ref={dialogRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="glass relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface-raised/95"
      >
        <div className="flex items-center border-b border-edge">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter" && filtered[activeIndex]) {
                e.preventDefault();
                runCommand(filtered[activeIndex]);
              }
            }}
            placeholder="Search pages and actions…"
            aria-label="Search pages and actions"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-listbox"
            aria-activedescendant={
              filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined
            }
            className="min-w-0 flex-1 bg-transparent px-5 py-4 font-mono-technical text-sm text-ink outline-none placeholder:text-ink-muted"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="mr-3 rounded-md border border-edge px-2.5 py-1.5 font-mono-technical text-[11px] text-ink-muted transition-colors hover:border-edge-strong hover:text-ink"
          >
            ✕
          </button>
        </div>
        <ul
          id="palette-listbox"
          role="listbox"
          aria-label="Pages and actions"
          className="max-h-[min(60vh,420px)] overflow-y-auto p-2"
        >
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-ink-muted">
              No matches
            </li>
          )}
          {grouped.map(({ group, items }) => (
            <li key={group} role="presentation">
              <p
                aria-hidden="true"
                className="px-4 pt-3 pb-1.5 font-mono-technical text-[10px] tracking-[0.16em] text-ink-muted uppercase"
              >
                {group}
              </p>
              <ul role="presentation">
                {items.map((cmd) => {
                  const flatIndex = filtered.indexOf(cmd);
                  return (
                    <li key={cmd.id} role="presentation">
                      <button
                        type="button"
                        id={`cmd-${cmd.id}`}
                        role="option"
                        aria-selected={flatIndex === activeIndex}
                        onClick={() => runCommand(cmd)}
                        onMouseEnter={() => setActive(flatIndex)}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                          flatIndex === activeIndex
                            ? "bg-accent/15 text-ink"
                            : "text-ink-secondary hover:bg-white/5"
                        }`}
                      >
                        <span>
                          {cmd.label}
                          {cmd.external && (
                            <span aria-hidden="true"> ↗</span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
        <p className="border-t border-edge px-5 py-2.5 font-mono-technical text-[10.5px] tracking-wide text-ink-muted">
          ↑↓ navigate · ↵ select · esc close
        </p>
      </div>
    </div>
  );
}
