---
schema_version: 1
recorded_at: "<ISO-8601 timestamp or unknown>"
source_tool: "<Claude Code | Codex | other | unknown>"
source_session: "<session ID or unknown>"

project:
  path: "C:\\Users\\satoc\\work\\verdy-match-lab"
repo: "<repository identity or unknown>"
worktree: "<absolute path of the worktree in use>"

git:
  branch: unknown
  head: unknown
  status_source: unknown # git_command | raw_git_files | prior_handoff | unknown
  staged: unknown
  unstaged: unknown
  untracked: unknown
  preexisting_user_changes: unknown

work_mode: "<active Work Mode>"
goal: "<specific requested outcome>"
constraints: []
completed_work: []

modified_files: []
# Each item: { path, purpose, ownership: current_task | preexisting_user_change | generated | unknown }

validation: []
# Each item: { kind, method, command, cwd, target, status, evidence, recorded_at }

unresolved_issues: []

approvals: []
# Each item: { action, scope, source, recorded_at, status }

prohibited_operations: []

next_action: "<first concrete resume operation>"
next_action_prerequisites: []

verdy_context:
  category: "<TOP TEAM | BELEZA | U-21 | none | unknown>"
  routes: []
  preview:
    url: unknown
    viewports: []
    console: unknown
    interaction: unknown
    visual: unknown
    recorded_at: unknown
  protected_assets: []
  data_sources_touched: []
---

# Summary

State the task outcome and current stopping point briefly.

# Decisions

Record only decisions needed to resume safely; link to the applicable Project Specification when useful.

# Unknowns

List material facts that could not be confirmed. Do not replace an unknown with a guess.

# Resume Notes

Call out dependencies or cautions that are not already expressed by the frontmatter. Before resuming, confirm: project path, branch, HEAD, working tree, modified files, validation freshness, approval scope, prohibited operations, and `next_action` prerequisites. If any check cannot be made, retain `unknown` and do not treat the handoff as authorization.

## Contract reminders

The Common Core Handoff Contract defines approvals and the receiver's start procedure. In addition:

- `git_command`, `raw_git_files`, `prior_handoff`, and `unknown` are distinct evidence levels. A value from `raw_git_files` is not Git-command verification.
- Do not record browser storage or full environment dumps. Record only a coarse authentication state when needed.
