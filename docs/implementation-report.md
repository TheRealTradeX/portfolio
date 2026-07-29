# Implementation Report — Portfolio Rebuild

Date: 2026-07-28/29. Full rebuild of the portfolio from a single-file HTML
prototype into a production Next.js site, preceded by a forensic audit of
every repository owned by `TheRealTradeX`.

## What was audited

- All 16 GitHub repositories (11 private, 5 public) via authenticated `gh`
  CLI and local clones in `~/dev/`, including full `git log` authorship
  analysis, provenance checks against upstream templates/forks, dependency
  and integration inventories, and secret/PII sweeps across full history.
- The live deployment of www.velocityfunds.io (headers, title, CSP verified
  with `curl`).
- Resume artifacts: `~/Downloads/Jefrey_Peralta_Resume_v4_Draft.docx`
  (current) and the 2025 `html-resume` repo (contact details).
- The prior portfolio prototype (`_legacy/index-v1-prototype.html`).

## Repositories inspected and verdicts

| Repo | Verdict |
|---|---|
| VF-Client-Dashboard | **Flagship.** 878 commits, 100% Jefrey, launched 2026-05-04. Case study. |
| ARG-Collectors-Hub (ResolveOS) | **Featured.** 33 commits, 100% Jefrey, real internal tool. Case study. |
| velocityfunds.io-V2 | **Featured.** 60 commits, 100% Jefrey, live in production. Case study. |
| VELOBOT | Systems-shipped entry (community ops automation, honest framing). |
| waitlist_velocityfunds | Systems-shipped entry (edge API). |
| Velocity-CRM | **Excluded** — 195/205 commits belong to a public template author. |
| worldmonitor | **Excluded** — pure fork, zero commits by Jefrey. |
| moment.ai | **Excluded** — spec + empty scaffold (44 LOC TS). |
| html-portfolio / html-resume | **Excluded** — bootcamp coursework incl. instructor solution files. |
| velocityfunds.io (v1), Velocity-Funds-Alpha1 | Lineage only, mentioned inside the site case study. |
| velocity-funds-platform, TheRealTradeX | README-only; used as the public architecture overview link. |
| dotfiles, Dash-Board-Template- | Excluded (trivial / fork). |

## Claims published vs withheld

Published claims and their sources are in `docs/portfolio-evidence.md`
(50+ rows, all measured directly). Highlights: 237 API route handlers and
83 Postgres tables were **independently confirmed by file counts** (the
platform's own ARCHITECTURE.md undercounts at ~45 — the filesystem wins).

Deliberately withheld: the "$50K→$500K MRR" figure (unsourced anywhere),
Stripe/Rise/NMI/Anthropic/MetaTrader claims (contradicted by code), CI
claims (no CI exists — stated as a gap instead), affiliate/payout business
numbers and fraud-detection heuristics (commercially sensitive), all
customer PII, trader counts and revenue (unverifiable).

## Design direction

Cobalt-on-graphite system ("high-end engineering product with
financial-system DNA") — documented in `docs/design-system.md`. Kept from
the old prototype: Bricolage Grotesque display type, glass surfaces with
specular edges, restrained mono metadata, pointer-tracked card refraction,
scroll reveals. Removed: fake ticker tape, fake stock percentages, all four
fictional projects, placeholder links/email, brass palette, "still early in
the craft" self-deprecation, founder-first hero.

Signature visual: `ArchitectureField` — a server-rendered SVG graph of the
real Velocity topology with pure-CSS packet motion (no JS, frozen under
reduced motion, labeled as illustrative).

## Architecture

Next.js 16 App Router + TypeScript strict + Tailwind v4. All routes
statically prerendered. Content is typed data under `src/data/` with a
vitest suite guarding integrity (placeholder links, banned tech claims,
missing disclosures, skill percentages). Client JS is limited to five small
islands: reveal observer, command palette + shortcuts, copy-email, pointer
refraction, and nothing else. Fonts self-hosted via `next/font`; OG image
generated at build; security headers + CSP in `next.config.ts`; sitemap,
robots, JSON-LD Person schema.

## Accessibility

Skip link, semantic landmarks, one h1 per page, visible focus states,
fully keyboard-operable command palette (combobox/listbox semantics, focus
trap, focus restore, Escape), aria-live announcements for copy-email,
decorative visuals `aria-hidden`, reduced-motion: reveals and packets fully
disabled, single-key shortcuts suppressed while typing. Lighthouse
accessibility: **100**.

## Performance

Fully static HTML, no third-party requests, three font families subset and
self-hosted, `display: optional` on the body font to avoid LCP re-paint,
content visible at first paint (reveal effect arms only after JS mounts).
Measured with Lighthouse against the production build:

- Desktop: **100 / 100 / 100 / 100**
- Mobile (simulated 4G throttle): **91 / 100 / 100 / 100** — remaining gap
  is simulated-network font/CSS fetch on first visit (LCP 3.2s throttled,
  0.7s desktop; CLS 0 on both).

## Tests performed

- `npm run lint`, `npm run typecheck`, `npm run test` (12 vitest
  data-integrity tests), `npm run build` — all clean.
- Playwright QA (production build): all 12 routes return 200; 404 works;
  zero horizontal overflow at 320/375/768/1440; skip link appears on first
  Tab; ⌘K opens the palette, typing filters, Escape closes and restores
  focus; `W` shortcut navigates; reduced-motion leaves all content visible;
  no console errors on any audited page.
- Live-site verification of external links (velocityfunds.io returns 200).

## Commands executed (key ones)

Audit: `gh repo list`, `gh api`, `git log --format`/`--author`, `find`,
`grep`, `wc -l`, `curl -sI https://www.velocityfunds.io`. Build/QA: the
npm scripts above, `npx lighthouse` (mobile + desktop presets), Playwright
scripts for screenshots/keyboard/overflow checks.

## Remaining missing assets / follow-ups for Jefrey

1. **Resume PDF** — no PDF exists; the site ships a printable `/resume`
   route built from verified data (print → save as PDF). Drop a
   `resume.pdf` into `public/` and repoint `siteConfig.links.resume` if a
   designed PDF is preferred.
2. **Domain** — `NEXT_PUBLIC_SITE_URL` currently falls back to
   `https://jefreyperalta.dev` (placeholder; not registered/verified).
   Set the real domain at deploy time.
3. **Screenshots** — case studies deliberately use an architecture
   diagram instead of product screenshots. Adding redacted/synthetic-data
   screenshots of the Velocity Command Center and ResolveOS would
   strengthen both case studies.
4. **Public GitHub hygiene** (outside this repo's scope, high impact):
   the live GitHub Pages sites `therealtradex.github.io/html-portfolio`
   (contains the typo "Entreprenuer" and instructor solution files) and
   `html-resume` are the only public clickable artifacts on the account —
   consider unpublishing or making them private. The profile README says
   both "all live" and "building to launch" — pick one. Profile `blog`
   field is empty.
5. **GitHub profile bio** references only founder identity; consider
   aligning with the portfolio positioning.

## Known limitations

- No e2e suite committed (Playwright was used as a QA harness; kept as a
  devDependency, scripts not committed — add `tests/e2e` if desired).
- Mobile Lighthouse performance is 91, not 95+ (font-fetch bound under
  simulated throttle; all other categories 100/100/100).
- The command palette is custom (no cmdk dependency) — extend
  `src/components/CommandPalette.tsx` to add commands.
