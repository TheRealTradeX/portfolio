# Visual Asset Plan (approved 2026-08-04)

Product-owner-approved selections and sanitization rules for the
screenshot assets used across the homepage and case studies. This plan
governs the visual-assets implementation phase. Raw captures live
outside the repository and are **never** copied or committed here; only
sanitized, optimized exports enter `public/`.

## Destinations and filenames

Sanitized WebP exports (AVIF optional alongside) go to:

- `public/work/velocity/`
  - `velocity-command-center.webp`
  - `velocity-trader-dashboard.webp`
  - `velocity-account-detail.webp`
  - `velocity-retention-intelligence.webp`
  - `velocity-email-hub.webp`
  - `velocity-trading-rules.webp`
  - `velocity-intelligence.webp` (optional, AI section)
  - `velocity-pulse.webp` (optional, AI section)
- `public/work/resolveos/`
  - `resolveos-dashboard.webp`
  - `resolveos-accounts.webp`
  - `resolveos-opportunity-pipeline.webp`
  - `resolveos-payments.webp`

## Approved usage

### Homepage

- Velocity Platform: primary `velocity-command-center`, secondary
  `velocity-trader-dashboard`.
- ResolveOS: primary `resolveos-opportunity-pipeline`, secondary
  `resolveos-payments`.
- velocityfunds.io: capture from the live public site (no sanitization
  concerns beyond cropping).

### Velocity case study (approximate sequence)

1. Admin Command Center
2. Trader Dashboard
3. Trader Account Detail and Trading Objectives
4. Retention Intelligence
5. Email Hub
6. Trading Rules

Optional, inside the AI section only: Velocity Intelligence, VI Pulse.
The AI screens support the case study; the operational and financial
platform remains the lead story.

### ResolveOS case study

All four assets, together showing: portfolio health and expected cash
flow, account prioritization, settlement opportunity tracking, payment
scheduling, follow-up management, and the replacement of spreadsheet
and memory-based workflows.

1. Dashboard Overview
2. Accounts Overview
3. Opportunity Pipeline
4. Payments Overview

## Exclusions and constraints

- **DeepChart / embedded trading interface:** not used prominently.
  It may appear only when explaining platform integration, and must be
  labeled as an integrated third-party trading interface, not software
  designed entirely by Jefrey.
- **Users screen:** excluded. The 86-user count at capture time is not
  a verified outcome metric and does not support the retired "120+
  users" claim. Never publish it as a metric.
- **Analytics screen:** deprioritized (mostly empty reporting period).
  Prefer the Command Center to communicate operating scope.

## Sanitization checklist (per screenshot, before anything is committed)

The raw captures contain names, email addresses, merchant and debtor
names, client and funder names, user and account identifiers, balances
and trading results, payment schedules, settlement values, internal
promo codes, and internal operating metrics. None of that may ship.

1. Replace sensitive values with realistic synthetic data. Prefer
   replacement over blur; preserve the authentic layout, hierarchy,
   and functionality.
2. Use fictional entities: Northstar Logistics LLC, Harbor Home
   Services, Summit Medical Group, Meridian Construction Co., Atlas
   Funding Partners, Horizon Capital Solutions.
3. Use reserved example email domains only: alex@example.com,
   trader@example.com, operations@example.com. No real-looking
   personal addresses.
4. Replace UUIDs and account IDs with shortened synthetic identifiers.
5. Replace financial values only where needed for privacy; keep the
   numbers internally coherent within each screen.
6. Crop browser and desktop chrome; keep the application navigation
   when it helps establish product scope.
7. Use consistent aspect ratios across a page's set.
8. Export optimized WebP (AVIF optional) with explicit dimensions.
9. Write accurate alt text and a one-line caption explaining what the
   interface enables.
10. Label synthetic or anonymized data where appropriate.

Do not fabricate any interface, feature, or workflow that is not
visible in the supplied screenshots or supported by the repository.

## Wiring

Homepage visuals are wired through the `visuals` field on entries in
`src/data/projects.ts` (`ProjectVisual`: src, alt, width, height,
caption). `src/data/content.test.ts` enforces that every referenced
asset exists under `public/`, starts with `/work/`, and carries real
alt text and dimensions. Case-study figures are placed directly in
their pages with the case-study figure component.
