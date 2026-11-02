# Architecture

## Current stack and layers

The application is a Next.js 16 App Router project using TypeScript, React, and Tailwind CSS. `app/` owns routes and page composition, `components/` owns reusable UI and match presentation, `lib/` owns domain/data access and display logic, `types/` owns shared domain types, `features/ai-guide/` contains the current editorial guide feature, and `db/` holds database material.

Vercel Production deploys from `master`. Linux QA also runs `npm run cf:build` through OpenNext (`wrangler.jsonc`, `open-next.config.ts`); the Cloudflare production workflow exists but its deploy job is disabled.

`types/domain.ts` defines shared match concepts. TOP TEAM status behavior is implemented by `lib/match/status.ts` and `lib/match/display.ts`; preserve `scheduled`, `live`, `half_time`, and `finished` semantics.

## Data relationships

- `lib/data/matches.ts` is the TOP TEAM detail/archive access layer. It uses Neon only when `DATABASE_URL` is set and otherwise uses `lib/mock/matches.ts`.
- `lib/data/mappers.ts` maps database rows to the domain types.
- `lib/mock/schedule.ts` is the source of truth for the TOP TEAM schedule. `lib/data/top-fixtures.ts` converts it into the shared fixture shape used by TOP pages.
- `lib/mock/beleza.ts` and `lib/mock/u21.ts` hold category-specific records and fixture snapshots. `lib/data/beleza-fixtures.ts` and `lib/data/u21-fixtures.ts` adapt them to common fixture/history views.

The `mock` file name does not establish that every value is fictional. Check the source comments and supporting context before treating a value as confirmed.

## Current versus legacy

The active routes include `/`, `/top`, `/top/analysis/jofuku-soma-transition`, `/matches/[id]`, `/archive`, `/beleza`, `/beleza/matches/[id]`, `/u21`, and `/u21/matches/[id]`. Existing match IDs and routes are public archive links; do not reuse or change them without a reason and migration plan. No separate legacy data source was confirmed during this specification pass; classify any unreferenced material as Unknown until its runtime use is verified.
