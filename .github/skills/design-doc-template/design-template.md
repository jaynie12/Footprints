# DESIGN: <TICKET-ID>, <title>

Status: DRAFT
Revision: 1
Updated: <YYYY-MM-DD>
Based on: 01-requirements.md (Revision <n>, approved <YYYY-MM-DD>)

## Summary for approval
<Use the approval-summary format. Keep to about 15 lines.>

## Approach
<One short paragraph: how this fits the existing code and which patterns it reuses.>

## Change list

### D-1: <title>  (covers REQ-1, REQ-2)
- **Type:** new function | new class | modify | new endpoint | new component | config | migration | ...
- **Location:** `path/to/file.py`
- **Signature / shape:** `...`
- **Behaviour:** ...
- **Errors and edge cases:** ...
- **Reuses:** `path/to/existing/pattern`

### D-2: <title>  (covers REQ-3)
...

## Data shapes
<Request/response bodies, models, TypeScript types, DB columns.>

## Test plan
| ID | Covers | Level | Test-first | Inputs → expected result |
|---|---|---|---|---|
| T-1 | REQ-1 | unit | yes | `validate_email("a@b.co")` → returns `"a@b.co"` |
| T-2 | REQ-1 | unit | yes | `validate_email("nope")` → raises `ValueError` |
| T-3 | REQ-2 (UI) | e2e | no (Tester, Playwright) | |

## Traceability
| REQ | D-items | T-items |
|---|---|---|
| REQ-1 | D-1 | T-1 |

## Files touched
- `path` (new | modified)

## Risks and alternatives considered
- <risk, mitigation. Alternative and why not.>

## Architecture impact
none | YES: <describe, and use STUCK format for the decision>

## Out of scope observations
- <...>

## Change history
| Rev | Date | Change |
|---|---|---|
| 1 | <YYYY-MM-DD> | Initial draft |
