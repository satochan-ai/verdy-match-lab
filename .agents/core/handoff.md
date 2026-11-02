# Verdy handoff use

`.agents/handoff/` stores current-session handoff records; it is not a project-specification source of truth. Create a record from `../handoff/HANDOFF_TEMPLATE.md` when pausing or transferring work between Claude Code, Codex, or a new session of the same tool.

Keep only Verdy-specific context that helps resume safely: category (TOP TEAM, BELEZA, or U-21), affected routes, local preview URL and viewport when relevant, protected assets, and the data source touched. Do not add those fields when they do not apply. Never record secrets, browser storage, environment dumps, or personal data.

The receiver must apply the Common Core freshness and approval contracts before resuming. Reconfirm the current project and Git state rather than treating a record as proof of the current state. Do not use a handoff to expand the active Work Mode or authorization.

For UI or preview work, hand off the validation plan and each completed, not-run, or failed result with its target and timestamp. Include the actual preview URL, affected route, viewport, console result, interaction result, visual result, and unresolved QA only when relevant. Those results are stale if HEAD, the relevant diff, or modified files change.
