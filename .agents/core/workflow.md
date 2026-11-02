# Project workflow

This file defines this project's delivery procedure under the Common Core Work Modes. A more restrictive request (for example read-only, stop at a diff, or no PR) always takes precedence.

## Default end point

For a normal development request, the default end point is the Common Core `PR` Mode: investigate, implement, test, commit, push, open a PR to `master`, and confirm the `qa` result. Then stop and report. Do not merge without the approval described below.

## Standard flow

Before starting, run `git fetch origin`, then check the current branch, `git status`, open PRs, and whether another session is working on the same files.

1. Create a new work branch from the latest `origin/master`. Do not reuse a merged or closed branch. An open PR on the same topic may continue on its own branch.
2. Develop in a dedicated worktree.
3. Confirm the relevant tests, lint, and build according to `validation.md`.
4. Stage task files by explicit path. Never use `git add .`, `git add -A`, or `git add --all`. Review `git diff --cached --name-only` before every commit.
5. Commit and push the work branch. Never push directly to `master`.
6. Open or update one PR with base `master`. Check base, head, changed files, commit count, and unintended files.
7. Confirm that the required `qa` check from Linux QA succeeds. If it fails, fix or report the failure; do not bypass it.
8. Report the PR URL, `qa` result, validation, and production impact, then stop.

## Merge and production

`master` is protected by the `protect-master` Ruleset: PR required, `qa` required, merge commit only, no force push, no deletion, no bypass. Merging to `master` triggers an automatic Vercel Production deployment, so merge approval is also the production-release decision.

- Merge only after the user explicitly approves that PR in the current conversation. Memory, a handoff, or an earlier approval does not carry over. If the PR head changes after approval, ask again.
- That approval covers the merge of that PR and the automatic deployment it triggers, and nothing else.
- Use `gh pr merge <number> --merge`. Do not use squash, rebase, `--admin`, or `--delete-branch`. Do not use `--auto` unless the user asks for it.
- After the merge, run `git fetch origin` and confirm the merge commit on `origin/master`, the `master` push `qa` run, the Production deployment for that SHA, and the major routes and console at `https://verdy-match-lab.vercel.app/`.
- Use `origin/master` as the baseline. Do not depend on checking out or syncing a local `master` branch.

## Individual approval

Each of these requires its own explicit request, even after a merge approval:

- manual deployment or promotion (`vercel deploy`, `vercel --prod`) and rollback;
- deleting a branch, tag, worktree, or file outside the task scope, and `git worktree prune`;
- changing the Ruleset, repository settings, Vercel settings, DNS, or environment variables;
- database migration or production data changes;
- reset, destructive rebase, force push, amend, or running or enabling the Cloudflare production workflow.

## Worktrees and parallel sessions

The main checkout `C:\Users\satoc\work\verdy-match-lab` may hold long-lived WIP. Do not switch branches, stash, restore, or clean there.

- Create task worktrees with `git worktree add -b <branch> <path> origin/master`, using a path such as `C:\Users\satoc\work\verdy-match-lab-<topic>`. Do not use a Temp directory. When the tool provides a managed worktree, use that instead.
- A new worktree has no local WIP, `node_modules`, or `.env*` files. Do not copy them unless the task needs them.
- Keep one writer per branch and per file set. Before editing, check open PRs and other active sessions for the same files, and reconcile before continuing.
- Before any approved removal, confirm the worktree's uncommitted changes, unpushed commits, and PR state.
