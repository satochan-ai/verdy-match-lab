<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Purpose and Unofficial Positioning

This repository is an unofficial fan project for enjoying Tokyo Verdy matches through tactical and viewing perspectives. It covers TOP TEAM, U-21, and BELEZA match information, predictions, live context, and analysis. Keep the distinction between official facts and independent editorial views explicit.

Do not imply affiliation with Tokyo Verdy Co., Ltd., J.League, WE League, or competition organizers. Do not generate fictional official comments, manager statements, player statements, or club announcements. Preserve the “unofficial fan site” wording in `components/ui/Footer.tsx` and `app/layout.tsx`.

## Source of Truth and Data Architecture

Data ownership differs by category:

- TOP TEAM details use `lib/data/matches.ts` and Neon PostgreSQL when `DATABASE_URL` is configured, with the existing `lib/mock/matches.ts` fallback when it is not configured or returns no rows.
- TOP TEAM schedule currently uses `lib/mock/schedule.ts`; do not assume it is database-backed.
- U-21 uses `lib/mock/u21.ts` and BELEZA uses `lib/mock/beleza.ts`; neither should be treated as having the TOP TEAM database structure.
- Shared domain types are in `types/domain.ts`; database mapping is in `lib/data/mappers.ts`.

“mock” filenames do not prove that every value is fictional. Check code comments, sources, and context before publishing or changing match data. Do not treat seed data or placeholders as verified facts.

## TOP TEAM / U-21 / BELEZA Boundaries

Do not apply one category’s data model, schedule, analysis depth, lineup representation, or match history to another category merely because the UI looks similar. Shared component changes require checking all three categories. Category-specific components and data should remain separate unless a genuine shared requirement is established.

## Match Data and Official Sources

When changing a match, check the relevant match ID, teams, opponent, date, kickoff, venue, competition, fixture metadata, status, score, route, schedule visibility, archive visibility, and rendered PRE/LIVE/HALF_TIME/POST state.

Use club, league, or competition official sources for factual records where available. Do not guess unconfirmed dates, opponents, venues, scores, player information, statistics, or source links. Do not hard-code current match results or temporary match IDs in this file.

## PRE / LIVE / HALF_TIME / POST Semantics

Preserve the existing `scheduled`, `live`, `half_time`, and `finished` status model and the logic in `lib/match/status.ts` and `lib/match/display.ts`.

Keep PRE_MATCH predictions, LIVE context, HALF_TIME analysis, and POST_MATCH results semantically separate. Do not show a final result, official statistics, or confirmed post-match conclusion before the match is finished.

## Predicted vs Official Lineups

`predictedLineups` and `actualLineups` are separate concepts. Never present predicted starters, formations, shirt numbers, positions, or availability as official information. Update official lineups only from confirmed sources, and do not overwrite or delete predictions when adding actual lineups.

## Official Records and Editorial Analysis

Treat `officialRecord`, `goals`, `cards`, `substitutions`, `matchStats`, `actualLineups`, and confirmed results as factual records. Treat predictions, tactical analysis, the three plans, and post-match interpretation as editorial content. Do not mix AI-generated or independent analysis into official-record fields.

## Database and Environment Safety

`DATABASE_URL` is server-only. Never expose it through a `NEXT_PUBLIC_` variable, browser code, client bundles, logs, or this file. Preserve the `isDbConfigured()` guard and the existing DB/mock fallback unless an explicit architecture change is requested.

External AI APIs are not part of the current required architecture. Do not add them or new dependencies merely to make the analysis appear more authoritative.

## Photo, Logo, and Copyright Safety

Do not add web-sourced player photos, official logos, club crests, press images, or third-party match photos without explicit confirmation of source, rights, and publication permission. Do not modify, replace, or delete existing `public/images/` assets without instruction. Treat `Pictures/` as user-owned untracked local material and do not delete, move, clean, or stage it without explicit instruction.

Do not independently infer ownership of user-provided or user-shot images. Preserve approved masking and do not restore hidden names, faces, or confidential information.

## Visual Identity and Responsive UX

The design should use Verdy-associated green as an identity anchor while keeping match information, tactical content, readability, and hierarchy primary. Do not turn the site into a decorative color exercise.

UI changes require considering desktop and mobile navigation, match cards, lineups, formations, schedules, tables, images, Hero content, and sidebars. Do not declare a visual change complete from desktop review alone.

## SEO and Metadata

When changing routes or metadata, check title, description, team and match metadata, canonical, sitemap, robots, and OGP together. Do not use SEO as a reason to imply official affiliation or promote an unconfirmed prediction as fact. Do not hard-code temporary match data, production URLs, or project identifiers here.

## `.claude/launch.json` and Local Assets

`.claude/launch.json` is a tracked local launch configuration and currently has a pre-existing uncommitted change. Do not edit, restore, reset, stash, clean, stage, or commit it unless explicitly requested.

`Pictures/` is currently untracked local material. Do not edit, delete, move, rename, clean, stage, or commit it unless explicitly requested. These protections apply even when the goal is to make the working tree clean.

## Validation and Verification

Choose checks according to the change:

- match data: verify source, opponent, date, venue, competition, status, result, route, schedule, and archive visibility
- lineup: verify predicted versus actual status and confirmed player, number, position, and formation data
- shared components: inspect TOP TEAM, U-21, and BELEZA
- UI: review desktop and mobile layouts
- image: verify source, copyright, permission, and preservation of masking
- metadata: verify unofficial positioning and SEO semantics
- code changes: run `npm run lint` and `npm run build` as appropriate
- any diff: run `git diff --check`

Do not report tests, responsive review, source checks, or link checks that were not actually performed.

## Completion Checks

For work in this repository, report the relevant impact on unofficial positioning, official-fact versus prediction/analysis separation, category boundaries, DB/mock sources, lineup semantics, match status, image rights, `.claude/launch.json`, `Pictures/`, mobile behavior, and deployment. Do not deploy or change external settings unless explicitly requested.
