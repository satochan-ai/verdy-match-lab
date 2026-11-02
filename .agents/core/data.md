# Data and factual-record rules

## Sources of truth

| Area | Current source | Fallback / boundary |
| --- | --- | --- |
| TOP TEAM match detail, next match, archive | `lib/data/matches.ts`; Neon PostgreSQL when `DATABASE_URL` is configured | Without `DATABASE_URL`, detail/next/archive use `lib/mock/matches.ts`. A DB lookup with no next match returns `null`; an empty recent-finished query falls back to the mock recent match. |
| TOP TEAM schedule and NEXT 5 | `lib/mock/schedule.ts` via `lib/data/top-fixtures.ts` | This schedule is separate from the TOP detail DB layer. Do not describe it as database-backed. |
| BELEZA | `lib/mock/beleza.ts`, adapted by `lib/data/beleza-fixtures.ts` | No BELEZA DB layer was confirmed. Current fixtures and history are derived from category-specific data. |
| U-21 | `lib/mock/u21.ts`, adapted by `lib/data/u21-fixtures.ts` | No U-21 DB layer was confirmed. The per-match predicted formation options in `lib/mock/u21.ts` are editorial. |

`DATABASE_URL` is server-only. Keep the `isDbConfigured()` guard in `lib/db/server.ts`; do not expose the variable in a `NEXT_PUBLIC_` variable, client code, or logs.

## Meaning and preservation

Use existing unique IDs and routes. Preserve archival PRE and POST data when a match changes state. `scheduled`, `live`, `half_time`, and `finished` have distinct display and content meaning. Do not show a final result, official statistic, or confirmed post-match conclusion before the match is finished.

Keep predicted lineups separate from actual lineups. Official records include scores, goals, cards, substitutions, statistics, actual lineups, and official-record fields; predictions, tactical analysis, and the three plans are editorial. Confirm date, kickoff, venue, competition, round, home/away, score, and source URL before changing a factual record. Keep unknown values unknown (for example `TBD`) rather than guessing. Use club, league, and competition sources for factual records when available. Do not treat seed data or placeholders as verified facts, and do not hard-code current results or temporary match IDs in instruction files.

## State requirements (TOP TEAM)

Updating one state must not overwrite or delete another state's information.

| State | Content |
| --- | --- |
| `scheduled` (PRE) | Focus points, key players, pending three plans, `predictedLineups`, availability, previous-match summary |
| `scheduled` with `actualLineups` | Show the official lineup and keep `predictedLineups` alongside it |
| `live` | Score situation, time-based viewing guide, official lineup |
| `half_time` | First-half score, three plans at half time, first-half review, second-half adjustments |
| `finished` (POST) | Final score, official record, three-plans review (`hit` / `partial` / `miss`), match review; PRE information stays archived |

## Field classification

- Official: `actualLineups`, `homeScore`, `awayScore`, `goals`, `cards`, `substitutions`, `matchStats`, `officialRecord` (kickoff, attendance, weather, temperature, humidity, record URL), competition, round, venue, and scheduled kickoff. Record an assist only when the official record states it.
- Editorial: `predictedLineups`, `verdyProfile`, `opponentProfile`, `focusPoints`, `strategies`, and the `features/ai-guide/` output.

Do not place generated or editorial content in official fields, and do not rewrite official records for presentation. Do not present a predicted starter, formation, shirt number, position, or availability as official.

## Player and fixture accuracy

- Do not correct name spelling, change shirt numbers or formations, or add or remove `captain` by guesswork. Do not confuse players with similar names.
- When updating an official lineup, confirm the mapping between the official source and existing data.
- The official lineup types (`ActualLineup`, `U21OfficialLineup`) hold `starters` and `bench`. Treat both as confirmed only when an official announcement shows them, and do not fill in unconfirmed players or shirt numbers.
- `PredictedLineup` has no bench field. Keep any predicted bench out of the official `bench` data, and do not delete pre-match predictions after the official lineup is announced.
- Treat `fixtureMeta.competition`, `fixtureMeta.roundLabel`, stage, opponent, home/away, venue, score, result, and scorers as factual data.
- When existing data conflicts, do not choose one side and replace it wholesale. Report the conflict with its sources.
- Match IDs (for example `match-8`, `beleza-match-1`, `u21-match-1`) are public URLs. Use a new unique ID for a new match and do not break links to past matches.
- Do not add a new mock file by guesswork. Follow the existing category structure.

## Data-quality checks

For match-data changes, check the ID, category, route, status, fixture metadata, schedule and archive visibility, and source comments or an appropriate official source. Do not copy players, histories, schedules, data, or model assumptions across TOP TEAM, BELEZA, and U-21.
