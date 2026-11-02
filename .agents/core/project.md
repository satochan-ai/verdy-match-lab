# Verdy Match Lab

## Purpose and scope

Verdy Match Lab is an unofficial beta fan web app for following Tokyo Verdy matches through match viewing and tactical perspectives. It covers TOP TEAM, BELEZA, and U-21. It must not imply affiliation with Tokyo Verdy, J.League, WE League, or a competition organizer. Preserve the existing unofficial-site wording in `components/ui/Footer.tsx` and `app/layout.tsx` when those files are in scope.

Separate confirmed records from editorial material. Do not invent official comments, player or manager statements, club announcements, or unverified match facts.

## Category boundaries

- **TOP TEAM** is the full match experience: PRE, LIVE, HALF_TIME, POST, tactical content, lineups, and archive.
- **BELEZA** is a separate, lighter match experience with fixtures, records, season history, and category-specific PRE/POST content. Do not force the TOP TEAM match type or DB structure onto it.
- **U-21** is a separate experience centered on records and fixtures. It does not adopt the TOP TEAM three plans or tactical analysis. Predicted formation options are allowed per match only (currently `u21ShimizuPredictedFormationOptions`), must be labeled as predictions, and must stay separate from actual lineups.

Similarity in UI does not make data models interchangeable. Confirm all three categories before changing a shared component.

## Product boundaries

Do not implement ahead a feature or data set that was decided not to be implemented yet.

The current app is an MVP/beta. External AI APIs are not part of its required architecture. Do not introduce broad redesigns, database migrations, new dependencies, category unification, or new external integrations without an explicit request.

## Home and visual identity

`app/page.tsx` represents the whole Verdy family, not only TOP TEAM. Do not remove or change the role of the Hero, NEXT MATCH, or category cards, or swap their link targets, without a request.

Use the Verdy greens (`verdy-green`, `deep-green`, `pioneer-gold`) as the identity anchor while putting readability, hierarchy, and match information first. Do not add color, gradients, or cards only as decoration, and do not perform a full redesign without an explicit request.

## Documents

Read the other files in this directory that apply to the task. This directory is the project-specification source of truth; tool adapters are only entry points.

For a task transfer or resumed session, read `handoff.md` and any applicable record in `.agents/handoff/` after the Common Core Handoff Contract. Handoff records are snapshots of session state, not project facts or authorization.
