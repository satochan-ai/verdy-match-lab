# Preview contract

Preview tools may differ between Claude Code and Codex; acceptance criteria do not. Start from the root of the current worktree with `npm run dev`. `.claude/launch.json` is Claude-specific and requests port `3000`; the main checkout may also hold a local `autoPort: true` change. It is not a fixed-port guarantee and must not be edited for preview work.

## Start and record

After startup, confirm the actual listening URL and port from the server output or browser connection. Record the actual URL, target route, viewports, console result, interaction result, visual result, and timestamp in the handoff when work transfers. The agent that starts a preview owns stopping it when it is no longer needed, unless that responsibility is explicitly handed off.

## Common acceptance criteria

Use desktop `1440 × 900` and mobile `390 × 844` as layout-break reference viewports; they are review baselines, not device emulation requirements. Review only affected routes plus routes sharing changed UI/data behavior.

For each required UI review, verify:

- on both viewports, the affected navigation, match cards, lineups, formations, schedules, tables, images, Hero content, and sidebars;
- no overflow, clipping, overlap, unreadable text, unexpected empty state, image distortion, mobile break, or major layout regression;
- relevant navigation, click, filter, tab, modal, responsive-menu, or detail-transition behavior works;
- console errors, warnings, hydration issues, uncaught exceptions, and failed resources are assessed against the baseline, separating new issues from existing ones.

Do not require a zero-warning console universally. Do not execute unrelated interactions or inspect all category routes when the changed surface does not affect them.

## Route selection

- TOP TEAM detail, schedule, or DB/mock work requires affected TOP routes. Review BELEZA and U-21 only when shared components, navigation, or common fixture/display logic changes.
- BELEZA work requires affected `/beleza` or `/beleza/matches/[id]` routes. TOP TEAM and U-21 are conditional on shared impact.
- U-21 follows the same rule for `/u21` and `/u21/matches/[id]`.

## Tool mapping

| Acceptance | Claude Code | Codex |
| --- | --- | --- |
| Start preview | Claude launch or terminal | terminal command or available preview/browser surface |
| Confirm URL | launch/server output or browser | server output or browser connection |
| Desktop/mobile review | browser resize or preview viewport | browser/preview viewport |
| Console review | browser developer tools | browser console surface |
| Visual evidence | screenshot or visual preview | screenshot or visual preview |

The criterion is the rendered result, not a particular browser or screenshot mechanism. Do not start a preview for documentation-only work unless it resolves a relevant uncertainty.