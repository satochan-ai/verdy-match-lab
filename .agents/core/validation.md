# Validation contract

Choose validation from the changed surface. Mark every planned check `REQUIRED`, `CONDITIONAL`, or `NOT_APPLICABLE`, with a reason. Record what actually ran; do not claim that all checks passed when a baseline, environment, permission, or unrelated failure remains.

## Current executable checks

| Check | Current command | Use |
| --- | --- | --- |
| Lint | `npm run lint` | Code, data, or UI changes when applicable |
| Tests | `npm run test` | Relevant logic/data regression coverage |
| Build/type check | `npm run build` | Code, data, route, or UI changes when applicable |
| Development preview | `npm run dev` | Preview-required UI or route work |
| Diff whitespace | `git diff --check` | When Git can safely read the repository |
| Type check | `npx next typegen` then `npx tsc --noEmit --incremental false` | Type-risk changes; always run by Linux QA |
| Worker build | `npm run cf:build` | Runtime or build-config changes; always run by Linux QA |

There is no `typecheck` npm script. Do not add one; use the commands above. Test files exist under `lib/`, `components/`, and `features/`; select relevant tests rather than treating a blanket test run as the only valid evidence.

Priority: run relevant local checks first, then treat the PR `qa` check (`.github/workflows/linux-qa.yml`) as the final gate before merge. A local pass does not replace `qa`. `qa` runs on PRs to `master` and on `master` pushes.

## Validation matrix

| Change kind | Required | Conditional | Not applicable by default |
| --- | --- | --- | --- |
| Documentation / instructions / handoff | Markdown structure, path/reference check, duplicate/conflict check, relevant implementation-fact check | `git diff --check` when Git works | lint, test, build, preview |
| Logic or data | Relevant test, lint/static check, build, source-of-truth check, boundary/fallback check, affected downstream route | Preview, console, visual QA when rendered output can change | Unrelated category routes |
| UI | Lint, build, relevant test, preview, affected desktop/mobile views, interaction, console, visual inspection | Shared-category route review | Unrelated data-source checks |
| Asset / image | Protected-asset/source preservation, rendering, aspect/size, affected desktop/mobile view | Lint/build/preview when the changed integration requires them | Unrelated interaction tests |
| Deployment-related | Define revision, environment, deployed URL, health, major route, console, visual confirmation for a future authorized deployment | — | Deployment execution without the approval in `workflow.md` |
| Route or metadata | Title, description, team and match metadata, canonical, sitemap, robots, OGP, and unofficial positioning | Preview | Unrelated category routes |

For data work, verify ID, category, route, status, date, kickoff, score, lineup, link target, archive/schedule visibility, and the applicable source of truth. TOP TEAM detail DB/mock behavior and TOP TEAM schedule are separate: schedule and NEXT 5 are sourced from `lib/mock/schedule.ts` through `lib/data/top-fixtures.ts`. Check BELEZA or U-21 only when their data, route, or shared presentation is affected.

## Baseline and failure contract

Before or while validating, determine whether a failure was present before the current change, is new, is related to the current change, and needs action. Classify each failure as `NEW_FAILURE`, `PREEXISTING_FAILURE`, `ENVIRONMENT_FAILURE`, `PERMISSION_FAILURE`, or `UNKNOWN`. Do not fix unrelated existing failures without a request. A Git ownership error is `PERMISSION_FAILURE`, not evidence that the project change failed.

## Evidence and freshness

For every completed, skipped, or failed check record: `kind`, `method`, `command` (or `none`), `cwd`, `target`, `status`, `evidence`, and `recorded_at`. A validation result becomes stale when its HEAD, diff, or relevant modified files change. In a handoff, identify planned, completed, not-run, and failed checks separately.

## Project report items

In addition to the Common Core Reporting Contract, report the relevant impact on unofficial positioning, official versus editorial separation, category boundaries, DB/mock source, lineup meaning, match status, image rights, protected files, mobile behavior, and production.

UI acceptance criteria and preview procedure are defined in `preview.md`.