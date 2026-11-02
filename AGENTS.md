<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Verdy Match Lab: agent entry point

Read the applicable Common Core instructions in `~/.agents/common/` first. The project-specific source of truth is `.agents/core/`: read `project.md` and every task-relevant document before changing this repository. In particular, consult `data.md` for match or fixture work, `protected-files.md` before touching assets/WIP, `validation.md` before verification, and `preview.md` for UI review. For a resumed or transferred task, also read `handoff.md` and the relevant `.agents/handoff/` record.

This file is the entry point for Codex and is also imported by `CLAUDE.md`. Do not duplicate or override project facts here. The Common Core Work Modes and `.agents/core/workflow.md` determine whether commit, push, PR, merge, deploy, or production inspection is allowed.
