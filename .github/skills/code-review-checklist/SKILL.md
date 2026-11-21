---
name: code-review-checklist
description: Use when reviewing a code change against approved requirements and design. Provides severity levels, the review checklist (correctness, design adherence, scope, tests, security, Python and React specifics), the 04-review.md round format, and the developer-reviewer loop exit rules.
---
# Code review checklist

## Severity

| Level | Meaning | Blocks PASS? |
|---|---|---|
| **Blocker** | Wrong behaviour, a requirement not met, data loss, security hole, broken build or tests, scope the human did not approve | Yes |
| **Major** | Likely bug, missing error handling or tests for a requirement, design deviation without a good reason, serious maintainability problem | Yes |
| **Minor** | Naming, style, small clarity or consistency issues, optional improvements | No |

## Exit rules
- **PASS:** zero blockers and zero majors.
- **CHANGES REQUIRED:** at least one blocker or major, and fewer than 3 rounds done.
- **ESCALATE:** round 3 still has blockers or majors, or a disagreement with the Developer is unresolved. Write a summary for the human: the disagreement, each side's evidence, your recommendation.

## Checks

### 1. Traceability
- Every REQ has a D-item, code that implements it, and a test.
- No code, endpoint, dependency or file exists that no D-item asked for (scope creep).
- Deviations in `03-dev-notes.md` are justified. Unlogged deviations are at least major.

### 2. Correctness
- Does the code do what each acceptance criterion says, including error and edge cases?
- Off-by-one, null/undefined, empty collections, time zones, encoding, concurrency, idempotency.

### 3. Tests
- Each test checks one behaviour and fails for the right reason. No tests that assert nothing or only mock calls.
- Edge and error cases from the test plan exist. Names reference REQ and T ids.
- You ran them and they pass. Do not trust reported results.

### 3b. Test-first evidence
- `03-dev-notes.md` has a red run (tests failing for the right reason, not import or syntax errors) and a green run.
- Tests written in the RED phase were not edited, weakened or deleted afterwards. Check with `git log` / `git diff` on those files. Changes to them without a logged reason are a blocker.
- Tests are not asserting hardcoded values that a lazy implementation could satisfy. Several cases per behaviour exist.
- Items marked `Test-first: no` in the design are genuinely styling, glue or config.

### 4. Design adherence and fit
- Matches the approved signatures, locations and data shapes.
- Follows existing patterns in the repo. No parallel implementation of something that already exists.

### 5. Security and safety
- Input validated at the boundary. No injection (SQL, shell, template), no unsafe deserialisation.
- Authentication and authorisation enforced where the requirements say.
- No secrets, tokens or personal data in code, logs, tests or fixtures.
- New dependencies are necessary, maintained, and approved in the design.

### 6. Maintainability
- Readable, small functions, clear names, no dead code or leftover debugging, no commented-out blocks.
- Errors are handled deliberately, not swallowed. Logging is useful and not noisy.

### 7. Stack specifics
- **Python:** type hints on public functions, no bare `except`, no mutable default args, no blocking calls in async code, resources closed, `ruff` and `mypy` clean.
- **TypeScript/React:** no `any`, effects have correct dependencies and cleanup, no state derived incorrectly, keys on lists, accessible labels and roles, loading/empty/error states present, `eslint` and `tsc` clean.

## Review file format (`.sdlc/<TICKET>/04-review.md`)
Append a new section each round. Never overwrite earlier rounds.

```
# REVIEW: <TICKET-ID>
## Round <n>, <YYYY-MM-DD>
**Verdict:** PASS | CHANGES REQUIRED | ESCALATE
**Commands run:** <command: result>
**Traceability:** <REQ → D → test coverage, gaps listed>

### Findings
**F-1 [Blocker]** `path/file.py:42`
Problem: ...
Impact: ...
Suggested fix: ...

### Minor / nits
- ...

### Follow-up from earlier rounds
- F-1: resolved | still open | disputed (<reason>)

### Summary
<3 to 5 lines: what is good, what must change.>
```

## Reviewer conduct
- Be specific: file, line, why it matters, what to do. No vague "clean this up".
- Praise is optional; accuracy is not. Do not invent problems to look thorough. If the code is good, PASS.
- Review the code as it is, not the Developer's explanation of it.
