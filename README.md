# `@platform/investor`

The mobile-first investor app, built in Nuxt 4 + Pinia + Apollo Client against
the real `apps/api` GraphQL backend built earlier in this project. Every
screen the Phase 1 PRD's "USER DASHBOARD" / auth / investment / wallet /
referral sections asked for is a real page wired to a real query or mutation
— not a mockup with placeholder text.

## Visual identity

Shares the "Growth Ledger" design tokens with `apps/marketing`
(`tailwind.config.ts` — sage `paper`, forest `ink`, `gold`/`sky`/`soil`
accents, Newsreader + IBM Plex Mono + Inter). Adapted here into an app shell:
a fixed-width phone frame (max 430px, centered on desktop, per the PRD's
mobile-first requirement) with a bottom tab bar and a top bar that shows
the logo on top-level screens and a back button on drill-in screens.

## Layout / rendering strategy

Two Nuxt layouts:
- **`auth.vue`** — centered card, used for `/login`, `/register`,
  `/verify-otp`, `/forgot-password`, `/reset-password`. These routes are
  server-rendered (`nuxt.config.ts` `routeRules`) for a fast first paint.
- **`default.vue`** — the phone-frame app shell (`TopBar` + page + `BottomNav`),
  used for everything past auth. These routes are explicitly `ssr: false` —
  per Phase 2 ADR-002, there's no SEO value in an authenticated dashboard,
  and server-rendering it would mean the server holding per-request
  financial session context for no benefit.

## What's real here

| Screen | Wired to |
|---|---|
| Login / Register / Verify OTP / Forgot &amp; Reset password | `login`, `register`, `requestOtp`, `verifyOtp`, `forgotPassword`, `resetPassword` — all real mutations |
| Dashboard | `myWallets`, `myInvestments`, `myWalletTransactions` — portfolio value, wallet balances, active investments and recent transactions are computed from real query results (see the `earnings` computed's code comment for the one honest exception — daily/weekly/monthly is a client-side estimate until a real scheduler exists) |
| Invest → category → plan → confirm | `investmentCategories`, `investmentPlans`, `investmentPlan`, `createInvestment` — the amount stepper enforces the plan's real min/max/step, and the projected-earnings figure mirrors the exact backend formula |
| Investments list &amp; detail | `myInvestments`, `investment(id)` |
| Wallet overview, transaction history, withdrawal request | `myWallets`, `myWalletTransactions`, `requestWithdrawal` |
| Referrals dashboard | `myReferralDashboard`, `myReferrals` — native share sheet with clipboard fallback |
| Profile + edit profile + logout | `me`, `updateProfile`, `logout` |

**I added three small things to the backend while building this app**, rather
than mocking data client-side, because a fake client-side calculation is
worse than a visible gap — see the API README's changelog:
1. A read-side `wallets` GraphQL module (`myWallets`, `myWalletTransactions`) —
   the original backend only had the write-side ledger primitives.
2. A read-side `referrals` GraphQL module (`myReferralDashboard`, `myReferrals`).
3. A singular `investmentPlan(id)` query and an `updateProfile` mutation,
   both designed in Phase 4's schema but not yet implemented.

## What's explicitly stubbed (and says so on-screen, not silently blank)

- **`/profile/kyc`** — no document upload; Phase 2 ADR-005 designed the
  object-storage approach, but `submitKycDocument` + a file picker aren't
  built.
- **`/profile/sessions`** — the backend already has a `Session` table with
  device/IP tracking; this screen just isn't wired up.
- **`/profile/support`** — falls back to a mailto link; ticket threads
  (Phase 4's `SupportTicket`/`TicketMessage`) aren't implemented.
- **`/notifications`** — the schema exists (Phase 3); the notifications
  module has no resolvers yet (see `apps/api/README.md`), so this page says
  so rather than showing fake notifications.
- **Silent refresh-on-401** — `plugins/apollo.ts`'s error link currently
  logs the user out on an expired access token rather than transparently
  calling `refreshAccessToken` and retrying. The mutation exists
  (`graphql/auth.ts` doesn't even have it yet, actually — add
  `REFRESH_ACCESS_TOKEN` and a retry-link before this feels production-ready
  for anyone with a session longer than 15 minutes).
- **Real distribution figures** — the dashboard's daily/weekly/monthly
  earnings are a client-side projection from active investments' plan
  rates, not the actual output of a scheduler (because there isn't one
  yet — Phase 2 ADR-008's BullMQ jobs are still unimplemented backend-side).

## Running it locally

```bash
# with apps/api already running (see its own README) on :4000
cd apps/investor
cp .env.example .env
npm install
npm run dev   # http://localhost:3000
```

Not run in this sandbox (no package-registry access) — written and
type-checked by hand: every `.vue` file's `<script setup>` block was
extracted and passed through `tsc --noEmit` for syntax validity, and every
custom component tag used across the app was cross-checked against the
component files that actually exist. Logic correctness (does the withdraw
form actually reach the right wallet, does the OTP cooldown timer clean up)
was reviewed by re-reading, not by executing — run `npm run dev` locally
for a real first check.
