# Portfolio Evidence Ledger

Every meaningful claim published on the portfolio, traced to its source.
Audited 2026-07-28 against local clones in `~/dev/` and the GitHub account
`TheRealTradeX` (authenticated `gh` CLI). Counts were measured directly with
`find`, `grep`, and `git log` — not taken from README claims.

**Confidence scale:** High = measured directly from files/history · Medium =
stated in Jefrey's own docs and consistent with code · Low = unverifiable.

## Published claims

| Claim | Project | Evidence | Repository / File | Confidence | Publicly safe | Final wording |
|---|---|---|---|---|---|---|
| Sole engineer, 878 commits over ~7 months | Velocity Platform | `git log` authorship: 878 commits, 2 email identities, one person, zero third-party authors | VF-Client-Dashboard | High | Yes | "881 commits, sole engineer" (881 = local count incl. merge refs; 878 per author tally — site uses 878+) |
| Launched to production 2026-05-04 | Velocity Platform | `ARCHITECTURE.md:8` "Launched: 2026-05-04"; launch-day migration `20260504000003_enable_v3_realtime_publications.sql`; May commit spike (273) | VF-Client-Dashboard | High | Yes | "launched 2026-05-04" |
| 237 API route handlers | Velocity Platform | `find apps/web/app/api -name route.ts \| wc -l` = 237 | VF-Client-Dashboard | High | Yes | "237 API route handlers" |
| 83 PostgreSQL tables | Velocity Platform | Unique `CREATE TABLE` names across 69 active migrations = 83 | VF-Client-Dashboard `supabase/migrations/` | High | Yes | "an 83-table schema" |
| 69 active migrations (+97 archived) | Velocity Platform | File count in `supabase/migrations/` and `_archived/` | VF-Client-Dashboard | High | Yes | "69 active migrations" |
| 120 RLS policies, 82 RLS-enabled tables | Velocity Platform | `grep -c 'CREATE POLICY'` / `ENABLE ROW LEVEL SECURITY` across active migrations | VF-Client-Dashboard | High | Yes | "120 row-level-security policies" |
| ~199k lines TypeScript (~189k hand-written) | Velocity Platform | `wc -l` across workspaces; 10.7k of realtime is generated protobuf typings | VF-Client-Dashboard | High | Yes | "roughly 190,000 hand-written lines of TypeScript" |
| 4-workspace Turborepo monorepo | Velocity Platform | `pnpm-workspace.yaml`: apps/web, services/worker, services/realtime, packages/shared | VF-Client-Dashboard | High | Yes | as stated |
| 65 pages (21 trader + 39 admin) | Velocity Platform | `find apps/web/app -name page.tsx` | VF-Client-Dashboard | High | Yes | "65 pages" |
| 309 React components | Velocity Platform | `find apps/web/components -name '*.tsx'` | VF-Client-Dashboard | High | Yes | "300+ components" |
| Payments: Authorize.Net, Accept.js tokenization, ARB recurring billing | Velocity Platform | `lib/authorizenet/client.ts` (772 LOC), `api/checkout/charge/route.ts` (1,853 LOC), 74 files | VF-Client-Dashboard | High | Yes | "Authorize.Net checkout with client-side tokenization — card data never touches the server" |
| Webhook idempotency ledger | Velocity Platform | `api/volumetrica/webhook/route.ts`: content-hash event ID → unique-index ledger insert → BullMQ enqueue → inline fallback; 281 `idempot*` occurrences in 40 files | VF-Client-Dashboard | High | Yes | as described in case study |
| 8 typed BullMQ queues with Zod payload schemas | Velocity Platform | `packages/shared/src/queue/names.ts` | VF-Client-Dashboard | High | Yes | as stated |
| Two Redis instances (queue + rate limiting) | Velocity Platform | `REDIS_URL` (Railway/BullMQ) + Upstash REST envs; 21 distinct rate limiters in `lib/rate-limit.ts` | VF-Client-Dashboard | High | Yes | "21 distinct rate limiters" |
| Protobuf-over-WSS realtime market-data consumer | Velocity Platform | `services/realtime`: `.proto` sources, generated bindings, connection/dispatch/handlers | VF-Client-Dashboard | High | Yes | as stated |
| dxFeed market data via platform vendor | Velocity Platform | `packages/shared/src/lib/volumetrica/config.ts:22`; also stated in Jefrey's own public README | VF-Client-Dashboard + velocity-funds-platform README | High | Yes (vendor already public in Jefrey's README) | "dxFeed market data through the platform vendor" |
| Provisioning state machine (6 steps) | Velocity Platform | `lib/provisioning/`: orchestrator, state-machine, 6 step files | VF-Client-Dashboard | High | Yes | as stated |
| 9-variant account lifecycle state union | Velocity Platform | `packages/shared/src/lib/accounts/lifecycle-state.ts` | VF-Client-Dashboard | High | Yes | as stated |
| VI suite: Pulse, Sentinel, Debrief; OpenAI; 13 versioned prompts; model router; SSE streaming | Velocity Platform | `lib/ai/` provider/prompts/model-router; `api/ai/chat/stream/route.ts` | VF-Client-Dashboard | High | Yes | as stated (OpenAI, not "AI" generically) |
| Fraud/abuse detection layer | Velocity Platform | `lib/risk/detectors/` — 8 detectors + orchestrator | VF-Client-Dashboard | High | Categories yes, heuristics no | "a fraud and abuse detection layer" (heuristics deliberately not described) |
| Payout eligibility engine, cent-precision frozen amounts | Velocity Platform | `lib/payouts/` (13 files); `amounts.ts` freezes `*_cents` + `reward_split_bps` at creation | VF-Client-Dashboard | High | Yes (thresholds withheld) | as stated without business numbers |
| Email: Resend, 29 React Email templates, outbox/suppressions, signature-verified webhook | Velocity Platform | `emails/` templates; email tables in migrations; `api/webhooks/resend/route.ts` + test | VF-Client-Dashboard | High | Yes | as stated |
| KYC tax-ID encryption AES-256-GCM with versioned keys | Velocity Platform | `lib/kyc/tax-id-crypto.ts` | VF-Client-Dashboard | High | Yes (pattern only) | as stated |
| 10 Vercel cron jobs + worker-scheduled crons with allowlist | Velocity Platform | `apps/web/vercel.json`; `services/worker/src/scheduled.ts`; `CRON_ENDPOINT_ALLOWLIST` z.enum | VF-Client-Dashboard | High | Yes | as stated |
| 74 test files, pure decision-function focus, no framework | Velocity Platform | count of `tests/` + colocated `.test.ts`; `node:assert/strict` via tsx | VF-Client-Dashboard | High | Yes | stated honestly incl. "no test framework, no CI" |
| Sentry across 3 services with correlation IDs | Velocity Platform | `@sentry/nextjs` + `@sentry/node`; AsyncLocalStorage correlation tagger | VF-Client-Dashboard | High | Yes | as stated |
| 1,576-line architecture doc, 13 runbooks, 47 forensics scripts | Velocity Platform | `ARCHITECTURE.md`, `Docs/Runbooks/`, `scripts/forensics/` | VF-Client-Dashboard | High | Yes | as stated |
| Launch-day realtime incident + fix | Velocity Platform | `ARCHITECTURE.md:477` + migration `20260504000003` | VF-Client-Dashboard | High | Yes | described in case study "What failed" |
| Chapter Two transition (prop-firm wind-down → trader OS direction) | Velocity Platform | `lib/transition/chapter-two.ts`; final commits disable new purchases | VF-Client-Dashboard | High | Yes | "the evaluation business was deliberately wound down in July 2026 as the product pivots" |
| app.velocityfunds.io production deployment | Velocity Platform | 64 URL references in code; ARCHITECTURE.md launch record | VF-Client-Dashboard | High | Yes | as stated |
| ResolveOS replaced a spreadsheet workflow | ResolveOS | README; 29 real-world CSV header aliases incl. `"increase date or fixed until paid"`; terminology-rename commits | ARG-Collectors-Hub | High | Yes | as stated |
| Hand-written CSV parser (RFC-4180-style) | ResolveOS | `src/lib/arg-crm.js:99-141` state machine: quoted fields, escaped quotes, embedded newlines | ARG-Collectors-Hub | High | Yes | as stated |
| Fuzzy header mapping — 29 aliases → 12 canonical keys | ResolveOS | `arg-crm.js:26-55` | ARG-Collectors-Hub | High | Yes | as stated |
| Import dedup via composite keys, append/replace modes | ResolveOS | `page.js:1423-1429`, `:1549-1559` | ARG-Collectors-Hub | High | Yes | noted honestly as client-side (no DB unique constraint) |
| Age-based follow-up prioritization P0–P3 | ResolveOS | `arg-crm.js:244-292` | ARG-Collectors-Hub | High | Yes | as stated |
| Month-end payment archival with denormalized snapshots | ResolveOS | `page.js:776-831` `maybeResetMonthlyPayments` | ARG-Collectors-Hub | High | Yes | as stated |
| Timezone-safe date handling (local-midday storage) | ResolveOS | `page.js:54-66`, final commit `96df026` | ARG-Collectors-Hub | High | Yes | as stated |
| 7-stage settlement pipeline w/ weighted forecasting | ResolveOS | `arg-crm.js:4-22`, `:674-679` | ARG-Collectors-Hub | High | Yes | as stated |
| 7-table Supabase data model, per-user scoping | ResolveOS | 53 `supabase.from()` sites; `.eq("user_id", …)` on ~40 | ARG-Collectors-Hub | High | Yes | as stated |
| ~5,600 LOC over 33 commits in 31 days, sole author | ResolveOS | `git log`; `wc -l` | ARG-Collectors-Hub | High | Yes | as stated |
| No committed secrets or PII | ResolveOS | full-history regex sweep (agent audit) | ARG-Collectors-Hub | High | Yes | supports "synthetic data only" statement |
| www.velocityfunds.io is live | velocityfunds.io site | `curl` 2026-07-29: HTTP 200, title "Velocity Funds \| Accelerate Your Edge", Vercel + Cloudflare | live check | High | Yes | live link on card |
| Marketing site: 60 commits, 100% Jefrey, 10,797 LOC, 85 files | velocityfunds.io site | `git log`, `wc -l` | velocityfunds.io-V2 | High | Yes | as stated |
| GSAP + ScrollTrigger + lazy three.js five-act homepage | velocityfunds.io site | package.json; Act components; `ssr:false` dynamic imports | velocityfunds.io-V2 | High | Yes | as stated |
| Server-side lead API → platform CRM with service token | velocityfunds.io site | `src/app/api/lead/route.ts` (267 LOC) → `/api/marketing/lead`; receiving end verified in VF-Client-Dashboard | both repos | High | Yes | as stated |
| Consent-gated pixel framework | velocityfunds.io site | `src/lib/pixels/` + CookiePreferences/CookieToast | velocityfunds.io-V2 | High | Yes | as stated |
| Perf: demo video 76 MB → 4 MB, deferred third-party scripts | velocityfunds.io site | commit `perf: shrink VIL demo 76MB->4MB, lazy-load video, defer Trustpilot` | velocityfunds.io-V2 | High | Yes | as stated |
| Hand-written CSP on live site | velocityfunds.io site | live response headers match `next.config.ts` | velocityfunds.io-V2 | High | Yes | as stated |
| VELOBOT: Discord gateway + FastAPI webhook receiver on one asyncio loop | VELOBOT | `ARCHITECTURE.md` + `web/server.py`, `bot.py`; 2,547 LOC, 21 commits, 100% Jefrey; Railway config | VELOBOT | High | Yes | as stated, framed as community ops automation |
| Waitlist edge API: Turnstile, IP-hash rate limiting, dedupe, UTM attribution | Velocity waitlist | `functions/api/waitlist.js` (239 LOC), `d1/waitlist.sql` (16-col schema) | waitlist_velocityfunds | High | Yes | as stated |
| Experience & education entries | — | `Jefrey_Peralta_Resume_v4_Draft.docx` (~/Downloads) + repo evidence | resume draft | Medium-High | Yes | WGU B.S. CS begins September 2026 — stated as enrolled/starting, never as in progress or completed |
| Salesforce CRM work at Leverage Companies | Experience | resume v4 + older html-resume | resume | Medium | Yes | qualitative only |
| Contact: email, LinkedIn, location | — | user account email; html-resume Contact page; resume draft | html-resume `public/Contact me.html` | High | Yes (phone deliberately omitted) | as stated |

## Claims deliberately withheld

| Candidate claim | Reason withheld |
|---|---|
| "$50K → $500K MRR growth" (Leverage-era CRM outcome) | Not found in any repository, document, or the current resume draft. Unsourced → omitted entirely. |
| Stripe integration | Dead code/legacy tables only; no dependency. Never claim. |
| Rise / payout-provider integration | No integration in code — payouts are a manual disbursement workflow with ops batch exports. Described as such. |
| NMI / PaymentCloud | PaymentCloud is a merchant-account relationship (commercially sensitive); processing code is Authorize.Net. Only Authorize.Net claimed. |
| CI / GitHub Actions on the platform | No `.github/` directory exists in VF-Client-Dashboard. Listed as an honest gap instead. |
| Anthropic/Claude API usage in the platform | Zero usage in code; AI provider is OpenAI. |
| MetaTrader / DXtrade / TradeLocker / Rithmic integrations | None exist (Rithmic docs folder ≠ integration). Single vendor: Volumetrica. |
| Affiliate commission percentages, payout thresholds/caps, drawdown thresholds, fraud-detection heuristics | Real but commercially sensitive / adversarially useful. Patterns described, numbers withheld. |
| Customer names, account IDs, vendor contract terms | PII / confidential. Never published; flagged files noted below. |
| Velocity-CRM as a built system | 195/205 commits belong to the public `arhamkhnz/next-shadcn-admin-dashboard` template author; Jefrey's layer is a 3-day UI prototype on top. Excluded. |
| worldmonitor | Pure fork, 0 commits by Jefrey. Excluded. |
| moment.ai | Spec + empty scaffold (44 LOC of TS). Excluded. |
| html-portfolio / html-resume as projects | App Brewery bootcamp coursework (contains instructor solution files). Excluded from portfolio; kept on GitHub as learning history. |
| "Velocity Labs" naming | Appears in the resume draft but zero occurrences in any codebase. Site uses "Velocity Funds". |
| Trader counts / revenue / user metrics | No verifiable source. Omitted. |
| ARG formal employment title/dates | Not in resume draft; entry framed around the verified tool build (Dec 2025 – Jan 2026 repo activity) without asserting a formal title. |

## Known sensitive files (never quote/screenshot)

- `VF-Client-Dashboard/scripts/forensics/inspect-gabriel-platform.mjs` — real customer name + email in header comment
- `VF-Client-Dashboard/scripts/forensics/pnl-discrepancy-VF-STR-50K-44740880.mjs` — real production account ID in filename
- `VF-Client-Dashboard/Docs/` — vendor contact email, raw UUIDs, gitignored vendor contract references
- `VF-Client-Dashboard/lib/affiliates/tiers.ts`, `lib/payouts/{caps,floor,cooldown}.ts`, `lib/revenue/fees.ts` — commercial terms
- `VF-Client-Dashboard/lib/risk/detectors/*` — abuse-detection heuristics
