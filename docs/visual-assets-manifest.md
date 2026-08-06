# Visual Assets Manifest

Every committed product visual, its provenance, and its sanitization
record. Raw captures live outside the repository and are never
committed; every image below was produced by a local-only processing
pipeline (headless-Chromium canvas: patch, crop, downscale to WebP)
and manually reviewed at full resolution before commit. See
docs/visual-assets-plan.md for the approved usage and sanitization
rules.

Disclosure labels: **Synthetic data** = visible values and identities
are fictional replacements. **Anonymized data** = a real capture with
identifying details masked or replaced. No label = a public marketing
capture or the author's own account data with nothing sensitive
visible.

## Velocity Platform (`public/work/velocity/`)

| File | Size | Dimensions | Source | Sanitization | Status | Used in |
|---|---|---|---|---|---|---|
| `command-center.webp` | 44 KB | 1600×775 | Admin capture | All KPIs, charts, ops brief, pulse values, and the accounts table replaced with a coherent fictional story; partial bottom row cropped | Synthetic data | Homepage showcase; Velocity case study (Product) |
| `trader-dashboard.webp` | 42 KB | 1600×797 | Author's own trader account | One account identifier replaced | Anonymized data | Velocity case study (Product) |
| `account-detail.webp` | 41 KB | 1600×795 | Author's own trader account | One account UUID fragment replaced | Anonymized data | Velocity case study (Product) |
| `retention-intelligence.webp` | 46 KB | 1600×790 | Admin capture | Eleven customer names and emails plus nine sidebar names replaced with fictional people (author's own rows retained) | Synthetic data | Velocity case study (Systems) |
| `email-hub.webp` | 53 KB | 1600×801 | Admin capture | Fifteen recipient addresses replaced with example.com addresses; two account IDs in subjects replaced | Synthetic data | Velocity case study (Systems) |
| `trading-rules.webp` | 41 KB | 1600×787 | Admin capture | Four rule IDs and three vendor group IDs replaced; drawdown amount replaced per the evidence ledger's withheld-numbers rule | Anonymized data | Velocity case study (Systems) |
| `velocity-intelligence.webp` | 75 KB | 1600×792 | Author's own account analysis | None required | None | Velocity case study (Supporting detail) |
| `vi-pulse.webp` | 42 KB | 1600×787 | Author's own account analysis | None required | None | Velocity case study (Supporting detail) |

## ResolveOS (`public/work/resolveos/`)

| File | Size | Dimensions | Source | Sanitization | Status | Used in |
|---|---|---|---|---|---|---|
| `dashboard-overview.webp` | 25 KB | 1600×798 | Operator capture | Book-level aggregates (expected cash-in, at-risk, projection rows) replaced with coherent fictional values | Synthetic data | ResolveOS case study (Product) |
| `accounts-overview.webp` | 75 KB | 1600×770 | Operator capture | Twenty-two merchant and funder names replaced with fictional entities; a case number replaced; partial bottom row cropped | Synthetic data | ResolveOS case study (Product) |
| `opportunity-pipeline.webp` | 33 KB | 1600×792 | Operator capture | Fifteen card merchant and funder names replaced with fictional entities (consistent with the accounts view) | Synthetic data | Homepage showcase; ResolveOS case study (Product) |
| `payments-overview.webp` | 75 KB | 1600×792 | Operator capture | Twenty-one card merchant and funder names, a case-number note, and a real payment-schedule note replaced | Synthetic data | ResolveOS case study (Product) |

## velocityfunds.io (`public/work/velocityfunds-site/`)

| File | Size | Dimensions | Source | Sanitization | Status | Used in |
|---|---|---|---|---|---|---|
| `homepage-overview.webp` | 76 KB | 1600×1000 | Live public site capture | Dated promo banner removed before capture; first-party consent prompt intentionally retained | None (public site) | Homepage showcase; velocityfunds.io case study |
| `product-story.webp` | 83 KB | 1600×1000 | Live public site capture, mid-scroll | Promo banner and consent dialog removed before capture | None (public site) | velocityfunds.io case study (Decisions) |
| `mobile-experience.webp` | 76 KB | 780×1650 | Live public site, iPhone-sized viewport | Scrolled past the promo banner; consent dialog removed; clipped top strip cropped | None (public site) | velocityfunds.io case study |

## Deliberately omitted captures

- **Users screen**: the visible total does not support any public
  outcome metric and user counts are withheld by the evidence ledger.
- **Analytics screen**: a mostly empty reporting period; the Command
  Center communicates operating scope better.
- **DeepChart screen**: shows an embedded third-party trading
  interface; excluded rather than risk implying it was designed here.
- **Affiliate detail and Promotions screens**: not in the approved
  usage map and dense with commercial codes.

Alt text and captions live at the point of use (`src/data/projects.ts`
and the case-study pages). `src/data/content.test.ts` enforces that
every referenced visual exists with dimensions and real alt text.
