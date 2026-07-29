# jefreyperalta.dev

Engineering portfolio for **Jefrey Peralta** — full-stack product engineer.
Built with Next.js App Router, strict TypeScript, and Tailwind CSS v4. Fully
static, zero runtime dependencies beyond React/Next, self-hosted fonts, no
third-party requests.

## Commands

```bash
npm run dev        # local development
npm run build      # production build (all routes prerender statically)
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run test       # vitest — content/data integrity tests
```

## Where content lives

All copy, links, and claims are data — components never hardcode them:

| File | Contents |
|---|---|
| `src/data/site.ts` | Name, role, email, external links, canonical URL |
| `src/data/projects.ts` | Featured projects + "Systems shipped" modules |
| `src/data/experience.ts` | Experience entries (drives homepage + `/resume`) |
| `src/data/skills.ts` | Toolkit categories, each tool tied to the project that used it |
| `src/data/architecture.ts` | Nodes/edges for the animated system diagram |
| `src/data/navigation.ts` | Nav + footer links |

To update a case study, edit its page in `src/app/work/<slug>/page.tsx`.

**Rule of the repo:** every factual claim must trace to
[`docs/portfolio-evidence.md`](docs/portfolio-evidence.md). If you add a
claim, add its evidence row first. `npm run test` enforces some of this
(no placeholder links, no banned tech claims, no skill percentages).

## Docs

- [`docs/portfolio-evidence.md`](docs/portfolio-evidence.md) — claim-by-claim evidence ledger
- [`docs/design-system.md`](docs/design-system.md) — tokens, type, motion principles
- [`docs/implementation-report.md`](docs/implementation-report.md) — what was audited, built, and deliberately withheld

## Deploying

Any Next.js host works (Vercel is zero-config). Set:

- `NEXT_PUBLIC_SITE_URL` — production URL (used for canonical/OG/sitemap)
- `NEXT_PUBLIC_COMMIT_SHA` — optional; shows the short hash in the footer
  (on Vercel, map it from `VERCEL_GIT_COMMIT_SHA`)

The old single-file prototype is archived at `_legacy/index-v1-prototype.html`.
