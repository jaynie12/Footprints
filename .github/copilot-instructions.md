# Project instructions

Stack: Python (`backend/`) and React + TypeScript (`frontend/`). Greenfield, personal projects.
These rules apply to every task and every agent. Keep this file short; procedures live in skills, roles live in agents.

## Working agreements

1. **Ask, don't assume.** If a requirement, behaviour, name, number, library or API is not in the ticket, the approved requirements, the approved design or the code, stop and use the STUCK format below. Never invent endpoints, config keys, library functions, or business rules.
2. **Read before writing.** Check `.sdlc/architecture.md` and the code you are about to touch. Follow existing patterns instead of introducing new ones.
3. **Stay in scope.** Do only what your stage and the approved documents say. If you notice something else, list it under "Out of scope observations" in your artifact. Do not fix it.
4. **Be honest about verification.** Never say tests, lint or builds passed unless you ran them and saw the output. If you could not verify something, say so.
5. **No secrets** in code, tests, logs, docs or artifacts. Use environment variables and `.env.example`.
6. **Dates** are `YYYY-MM-DD`. Use today's date from your context. If you do not have it, ask. Never guess.

## Workflow

Each work item lives in `.sdlc/<TICKET-ID>/`. **Handoffs are files, not chat memory**: read the previous stage's file, write your own.

| Stage | Agent | Reads | Writes (only here) |
|---|---|---|---|
| 0 | Learner | repo | `.sdlc/architecture.md`, `.sdlc/decisions.md`, `<T>/00-context.md` |
| 1 | Requirements | `00-ticket.md`, `00-context.md` | `<T>/01-requirements.md` |
| gate | **Human approves** | | |
| 2 | Design | approved `01`, code | `<T>/02-design.md` |
| gate | **Human approves** | | |
| 3 | Developer (+ `test-author` subagent) | approved `01`, `02` | tests first, then source, `<T>/03-dev-notes.md` |
| 4 | Reviewer | diff, `01`, `02`, `03` | `<T>/04-review.md`, `CHANGELOG.md` (on PASS only) |
| 5 | Tester | `01`, running app | `<T>/05-test-report.md`, `<T>/screenshots/`, functional/e2e tests |
| 6 | Docs | everything | `docs/`, `<T>/06-summary.md` |

`<T>` = `.sdlc/<TICKET-ID>`. An agent must not write outside its row.

### Approval gates
- Every artifact starts with a status block:
  ```
  Status: DRAFT | APPROVED | SUPERSEDED
  Revision: <n>
  Updated: <YYYY-MM-DD>
  ```
- Agents only ever write `Status: DRAFT`. **Only the human sets `APPROVED`**, by editing the line to `Status: APPROVED — <name>, <date>`.
- Developer must refuse to start unless both `01-requirements.md` and `02-design.md` are `APPROVED`.
- If an approved document turns out to be wrong or incomplete, do not work around it. STUCK and ask for a revision.

### Traceability
`REQ-n` (requirement) → `D-n` (design item) → code → `T-n` (test). Reference these IDs in every artifact, test name or docstring, review finding, and changelog entry. If an ID has no match downstream, that is a defect.

## STUCK protocol

When blocked or uncertain, stop and reply in exactly this shape:

```
STUCK: <one-line summary>
Known:     what I have confirmed
Unknown:   what is blocking me
Options:   A / B (with trade-offs)
Recommend: which, and why
Need from you: the specific decision or answer
```

## Definition of done (per ticket)

- Every REQ has a D-item, code, and at least one passing test, written **before** the code (red, then green, then refactor).
- Lint, type-check and tests pass (commands below), with output seen.
- Reviewer verdict PASS (zero blockers, zero majors).
- `CHANGELOG.md` entry added. Tester report shows every REQ passed or explicitly deferred. Docs summary written.

## Commands

> Defaults. Confirm during Learner bootstrap, then replace with the real ones.

- Backend (`backend/`): `ruff check .` · `ruff format --check .` · `mypy .` · `pytest`
- Frontend (`frontend/`): `npm run lint` · `npx tsc --noEmit` · `npm test`

## Stack conventions

> Move these into `.github/instructions/*.instructions.md` with `applyTo` globs once you want path-specific rules.

- **Python:** type hints on all public functions, no bare `except`, no mutable default args, pytest with fixtures, small functions, docstrings on public API.
- **TypeScript/React:** `strict` mode, no `any` (use `unknown` and narrow), function components and hooks, test behaviour with React Testing Library and accessible queries, not implementation details.
- **Both:** tests live next to the pattern the repo already uses; one behaviour per test; test names say what and when.
