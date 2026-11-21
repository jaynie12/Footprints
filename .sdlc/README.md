# Running a ticket (manual handoffs)

Copy `.sdlc/_template/` to `.sdlc/<TICKET-ID>/` and paste the ticket into `00-ticket.md`.
For each step: **pick the agent in the Agent dropdown, open a new chat, send the prompt.**

| # | Agent | Prompt | You |
|---|---|---|---|
| 0 | Learner | `Bootstrap the project` (once), then `Impact scan for <T>` | Confirm decisions |
| 1 | Requirements | `Analyse <T>` | Answer questions. Review. **Set `Status: APPROVED — <name>, <date>`** in `01-requirements.md` |
| 2 | Design | `Design <T>` | Review. **Set `Status: APPROVED …`** in `02-design.md` |
| 3 | Developer | `Implement <T>` | Watch for STUCK |
| 4 | Reviewer (**new chat**) | `Review <T>` | |
| 3↔4 | Developer / Reviewer | `Address review round <n> for <T>` / `Review <T>` | Max 3 rounds, then decide |
| 5 | Tester | `Test <T>` | |
| 3↔4↔5 | | `Fix bugs in .sdlc/<T>/05-test-report.md` | If tester found bugs |
| 6 | Docs | `Document <T>` | |
| 0 | Learner | `Refresh after <T>` | Optional but keeps the map true |

Every agent ends its reply with the next step and the prompt to send.

Artifacts per ticket: `00-ticket.md` · `00-context.md` · `01-requirements.md` · `02-design.md` · `03-dev-notes.md` · `04-review.md` · `05-test-report.md` · `06-summary.md` · `screenshots/`

Project-level: `.sdlc/architecture.md` · `.sdlc/decisions.md` (created by the Learner)

## Handoff buttons
Each agent has `handoffs` in its frontmatter (`send: false`). When a reply finishes, a button appears that switches agent and pre-fills the next prompt. Review it, then press send. If buttons don't appear, check the Session Target: the docs say handoffs are supported in the Local harness.

## Test-first
The Developer calls the hidden `test-author` subagent for failing tests (it never sees the implementation), then writes the simplest passing code and refactors. It must not edit those tests. The Reviewer checks the red run in `03-dev-notes.md`.
