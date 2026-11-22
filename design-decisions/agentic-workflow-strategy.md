# Agentic Workflow Strategy

## Overview

Footprints uses a staged, human-governed agentic software lifecycle. Agents have narrow responsibilities and pass work through versioned files in `.sdlc/<TICKET-ID>/` rather than relying on chat context alone. The workflow keeps architecture decisions with the project owner while using agents for learning, requirements, implementation, review, testing, and documentation.

The repository does not use an architecture agent. The project owner remains responsible for architecture and major technical decisions.

## Core principles

- **Human approval gates:** Requirements and design are DRAFT artifacts until the human explicitly changes their status to `APPROVED`.
- **Artifact-based handoffs:** Each stage reads earlier files and writes only its assigned output.
- **Fresh-context review:** Implementation and review use separate agent conversations to reduce confirmation bias.
- **Bidirectional traceability:** `REQ-n` requirements map to `D-n` design items, implementation, and `T-n` tests.
- **Evidence over claims:** Agent results must include real commands, failures, test runs, diffs, and screenshots where applicable.
- **No guessing:** Missing behavior, APIs, config keys, libraries, or business rules stop the workflow through the `STUCK` protocol.
- **Scope control:** Agents implement or document only the approved ticket and report out-of-scope observations rather than fixing them.
- **No secrets:** Credentials, tokens, and personal data remain outside code, tests, logs, and artifacts.

## Workflow stages

### 0. Learner / project context

The Learner creates and maintains:

- `.sdlc/architecture.md`
- `.sdlc/decisions.md`
- `.sdlc/<TICKET-ID>/00-context.md`

It maps the repository, captures confirmed conventions and commands, identifies the areas a ticket may touch, and refreshes project knowledge after merges. It never changes source code.

### 1. Requirements

The Requirements agent converts `00-ticket.md` and project context into numbered, observable acceptance criteria (`REQ-n`). Every criterion is tagged `UI: yes` or `UI: no`.

It uses the requirements gap checklist to classify gaps as:

- **BLOCKING:** cannot proceed correctly without an answer
- **ASSUMPTION:** a cheap-to-change default that requires explicit approval
- **NICE-TO-KNOW:** useful context that does not block implementation

Output: `.sdlc/<TICKET-ID>/01-requirements.md`

This stage ends in an approval gate. The human reviews the one-minute approval summary and sets the artifact to `APPROVED`.

### 2. Design

The Design agent reads only the approved requirements and existing project patterns. It creates concrete low-level design items (`D-n`) covering files, signatures, data shapes, behavior, errors, and reuse.

It also writes a test plan (`T-n`) that covers every requirement. If the work changes architecture, introduces a service or datastore, adds a dependency, or alters an existing pattern, it stops and presents options instead of deciding alone.

Output: `.sdlc/<TICKET-ID>/02-design.md`

This stage also ends in a human approval gate.

### 3. Test-first implementation

The Developer starts only after both requirements and design are `APPROVED`.

The implementation cycle is:

1. **RED:** Test Author creates failing tests from the approved design and minimal stubs.
2. **GREEN:** Developer implements the simplest code that makes the tests pass.
3. **REFACTOR:** Developer cleans up and reruns tests.

The Test Author cannot see or reuse the implementation and must prove that failures are behavioral rather than import, fixture, syntax, or setup failures.

Developer outputs include source and tests named by the design, plus `.sdlc/<TICKET-ID>/03-dev-notes.md` with red/green evidence, implementation notes, deviations, and open questions.

Styling, glue, and explicitly marked configuration work may be exempt from strict test-first behavior.

### 4. Independent review

The Reviewer works in a fresh conversation and independently inspects the real diff, requirements, design, developer notes, lint/type-check/test output, and traceability.

Severity levels are:

- **Blocker:** requirement failure, data loss, security issue, broken build, or unapproved scope
- **Major:** likely bug, missing required handling or coverage, unjustified design deviation
- **Minor:** style or maintainability issue that does not block correctness

The verdict is `PASS`, `CHANGES REQUIRED`, or `ESCALATE`. PASS requires zero blockers and zero majors. On round three, unresolved blockers or disagreements escalate to the human. No more than three review rounds are specified for a ticket.

On PASS, the Reviewer adds an exact, dated entry to `CHANGELOG.md` based on the actual diff.

### 5. Functional testing

The Tester verifies the acceptance criteria as a user and QA engineer, not the implementation itself. API/function requirements are exercised directly; UI requirements are exercised in the browser and should include screenshots per requirement.

Output: `.sdlc/<TICKET-ID>/05-test-report.md`, screenshots, and e2e or functional tests. Any failure returns to the Developer, followed by re-review and retest.

### 6. Documentation

The Docs agent summarizes only the completed, tested behavior. It writes:

- Technical documentation under `docs/`
- Relevant feature sections in `README.md`
- `.sdlc/<TICKET-ID>/06-summary.md`

The summary includes technical notes, traceability from requirements through tests, limitations, follow-ups, and a Jira-ready update. The Learner then refreshes the project map after the merge.

## Agent roles

| Agent | Responsibility | Primary outputs |
|---|---|---|
| Learner | Builds and refreshes repository context | Architecture, decisions, ticket context |
| Requirements | Finds gaps and writes acceptance criteria | `01-requirements.md` |
| Design | Produces low-level implementation and test plans | `02-design.md` |
| Test Author | Writes the red tests and minimal stubs | Tests and stubs |
| Developer | Implements, refactors, and records evidence | Source, tests, `03-dev-notes.md` |
| Reviewer | Independently reviews and gates merge readiness | `04-review.md`, changelog on PASS |
| Tester | Performs criterion-based functional/E2E verification | `05-test-report.md`, screenshots |
| Docs | Documents what was actually delivered | Technical docs, `06-summary.md` |

No architecture agent is configured because the owner deliberately wants direct control over architectural decisions.

## Traceability model

Every ticket should maintain this chain:

`REQ-n -> D-n -> source/test files -> T-n -> test result`

A missing link is a defect. The requirements, design, developer notes, reviewer report, tester report, docs summary, and changelog should all use the relevant IDs. The Reviewer rejects unapproved code that cannot be traced back to a requirement or design item.

## Approval and handoff rules

- Agents create `DRAFT` artifacts and never grant approval themselves.
- Only the human sets `APPROVED`.
- Requirements approval releases Design.
- Design approval releases the Developer.
- PASS in independent review releases functional testing.
- A documented PASS or explicitly deferred human decision releases documentation.
- Revisions update the same artifact, increment its revision, update the date, and record change history.
- Work continues through fresh handoffs rather than carrying hidden assumptions across chat sessions.

## Definition of done

A ticket is complete when it has:

- Approved requirements and design
- A traceable requirement-to-design-to-code-to-test chain
- Red and green test evidence
- Passing lint, type-check, and relevant test commands
- A Reviewer PASS
- A functional test report with every requirement passed or explicitly deferred
- A changelog entry
- Technical documentation and a ticket summary

## Repository conventions and stack

The `.github` instructions establish Python under `backend/` and React/TypeScript under `frontend/`, with strict typing, test behavior through existing frameworks, and standard lint/type/test commands. The README and design decisions currently describe React Native and Node.js as the product stack, so the repository should reconcile these two descriptions before implementation work is based on them.

Until reconciled, architecture-affecting stack decisions follow the human's approved architectural direction rather than an agent inferring a replacement.