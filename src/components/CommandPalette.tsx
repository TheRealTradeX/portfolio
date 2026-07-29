"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/data/site";

type Command = {
  id: string;
  label: string;
  hint?: string;
  keywords: string;
  run: () => void;
};

const OPEN_EVENT = "jp:open-palette";

/** Dispatch from any visible trigger (e.g. the nav button on mobile). */
export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function CommandPaletteTrigger({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => openCommandPalette()}
      aria-haspopup="dialog"
    >
      <span aria-hidden="true">⌘K</span>
      <span className="sr-only">Open command menu</span>
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
        id: "work",
        label: "Go to featured work",
        hint: "W",
        keywords: "work projects featured case studies",
        run: () => router.push("/#work"),
      },
      {
        id: "velocity",
        label: "Read the Velocity case study",
        keywords: "velocity prop firm trading platform case study",
        run: () => router.push("/work/velocity"),
      },
      {
        id: "resolveos",
        label: "Read the ResolveOS case study",
        keywords: "resolveos collections crm case study",
        run: () => router.push("/work/resolveos"),
      },
      {
        id: "about",
        label: "Go to about",
        hint: "A",
        keywords: "about background story",
        run: () => router.push("/about"),
      },
      {
        id: "experience",
        label: "Jump to experience",
        keywords: "experience history jobs roles",
        run: () => router.push("/#experience"),
      },
      {
        id: "resume",
        label: "Open resume",
        hint: "R",
        keywords: "resume cv download pdf",
        run: () => window.open(siteConfig.links.resume, "_blank"),
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "G",
        keywords: "github code repositories source",
        run: () => window.open(siteConfig.links.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        keywords: "linkedin profile connect",
        run: () => window.open(siteConfig.links.linkedin, "_blank", "noopener"),
      },
      {
        id: "email",
        label: "Copy email address",
        hint: "C",
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

  // Global keyboard handling: ⌘K / Ctrl+K, single-key shortcuts, Escape.
  useEffect(() => {
    const shortcuts: Record<string, () => void> = {
      w: () => router.push("/#work"),
      a: () => router.push("/about"),
      r: () => window.open(siteConfig.links.resume, "_blank"),
      g: () => window.open(siteConfig.links.github, "_blank", "noopener"),
      c: () => router.push("/#contact"),
    };

    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            previousFocus.current = document.activeElement as HTMLElement;
          }
          return !prev;
        });
        return;
      }
      if (open) return;
      if (isTypingTarget(e.target)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const fn = shortcuts[e.key.toLowerCase()];
      if (fn) {
        e.preventDefault();
        fn();
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
  }, [open, router]);

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
      className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[14vh]"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={close}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
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
            placeholder="Type a command or search…"
            aria-label="Search commands"
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
          aria-label="Commands"
          className="max-h-80 overflow-y-auto p-2"
        >
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-ink-muted">
              No matching commands
            </li>
          )}
          {filtered.map((cmd, i) => (
            <li key={cmd.id} role="presentation">
              <button
                type="button"
                id={`cmd-${cmd.id}`}
                role="option"
                aria-selected={i === activeIndex}
                onClick={() => runCommand(cmd)}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                  i === activeIndex
                    ? "bg-accent/15 text-ink"
                    : "text-ink-secondary hover:bg-white/5"
                }`}
              >
                <span>{cmd.label}</span>
                {cmd.hint && (
                  <kbd className="rounded border border-edge px-1.5 py-0.5 font-mono-technical text-[10px] text-ink-muted">
                    {cmd.hint}
                  </kbd>
                )}
              </button>
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
