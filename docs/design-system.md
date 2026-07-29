# Design System — jefreyperalta.dev

A personal system: high-end engineering product with financial-system DNA.
Not a crypto site, not a sales funnel, not terminal cosplay.

## Color

Defined as CSS custom properties in `src/app/globals.css`, mapped into
Tailwind v4 via `@theme inline`.

| Token | Value | Use |
|---|---|---|
| `--background` | `#07090d` | Page background (near-black graphite) |
| `--surface` | `#0c1017` | Card fills |
| `--surface-raised` | `#111722` | Dialogs, raised panels |
| `--text` | `#f5f7fb` | Primary text (cold off-white) |
| `--text-secondary` | `#a5afbd` | Body copy |
| `--muted` | `#79859a` | Labels, metadata (AA on background) |
| `--accent` | `#5875ff` | Cobalt — interactive, brand |
| `--accent-bright` | `#89a6ff` | Hover, focus rings, packet motion |
| `--accent-soft` | `#bdd0ff` | Subtle emphasis text |
| `--success` | `#53dfa5` | Status only (live/production dots) — never decorative |
| `--border` | `rgba(255,255,255,.09)` | Default hairlines |

One accent system (cobalt). The old prototype's brass was dropped: cobalt
reads engineering-first; brass read trading-funnel.

## Typography

Self-hosted via `next/font` (zero external requests):

- **Display — Bricolage Grotesque** (400/600/800): headlines only. The one
  idea kept from the old prototype.
- **Body — Inter** (400/500/600): everything readable.
- **Mono — JetBrains Mono** (400/500): metadata, eyebrows, evidence, kbd.
  Deliberately rationed — labels and technical facts only, never body copy.

Scale: hero `clamp(2.9rem → 6rem)`, h2 `clamp(1.75rem → 2.9rem)`,
body 16px/1.65. Uppercase is restricted to mono eyebrow labels.

## Surfaces

`.glass`: 3.5% white fill, 1px hairline border, specular top edge
(gradient highlight line), deep soft shadow. Used sparingly — featured
cards, fact sheets, nav. Backdrop blur omitted except the palette overlay
(perf).

## Motion principles

1. Motion communicates system behavior (packets on architecture edges),
   position (scroll reveals), or feedback (hover lift) — never spectacle.
2. Everything degrades: reveals are visible without JS (`html.no-js`),
   packets are pure CSS `offset-path` and freeze under
   `prefers-reduced-motion`, no scroll hijacking, no intro sequence.
3. Durations 200–700ms, one easing family `cubic-bezier(.2,.8,.3,1)`.

## Signature visual

`ArchitectureField` — a living architecture graph of the *real* Velocity
system (web, worker, realtime, Postgres, Redis, payments, email, market
data). Server-rendered SVG; packet motion is CSS-only. It replaces the old
prototype's fake ticker tape and random price line: same financial-system
energy, but every node is a system that actually exists.

## Voice

Direct, ambitious, technically grounded. Evidence over adjectives — every
number on the site was measured, and the copy says so. Banned: "passionate",
"seamless", "cutting-edge", "results-driven", skill bars, fake percentages.
