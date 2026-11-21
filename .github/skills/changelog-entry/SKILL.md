---
name: changelog-entry
description: Use when a change has passed review and needs a CHANGELOG.md entry. Provides the dated entry format, rules for exactness, and where to insert it.
---
# Changelog entry

Written by the **Reviewer** when the verdict is PASS. It records what was actually merged, derived from the real diff, not from the plan.

## Where
`CHANGELOG.md` at the repo root. Insert the new entry **directly below** the line `<!-- entries below, newest first -->`. Never rewrite or reorder earlier entries.

## Format
```
## <YYYY-MM-DD>: <TICKET-ID> <short title>
- **Requirements:** REQ-1, REQ-2, REQ-3
- **Added:** <what is new, one bullet per item>
- **Changed:** <existing behaviour that is different now>
- **Fixed:** <bugs fixed>
- **Removed:** <anything deleted>
- **Files:** `backend/app/x.py` (new), `frontend/src/Y.tsx` (modified), ...
- **Tests:** `tests/test_x.py` (n tests)
- **Notes:** <deviations from design, follow-ups, migrations, config or env changes>
```

## Rules
1. **Exact, not aspirational.** Derive every line from `git diff`. If the design said it and the diff does not show it, it does not go in.
2. **Omit empty sections.** Only include Added/Changed/Fixed/Removed lines that apply.
3. **Behaviour, not implementation.** "Users can reset their password by email" beats "added function reset_password". Include the file list for the implementation detail.
4. **Always list REQ ids** so the entry traces back to the requirements.
5. **Call out** anything someone must do on deploy or pull: migrations, new env vars, new dependencies, breaking changes (mark **BREAKING**).
6. **One entry per ticket per PASS.** If a later review pass (after tester bugs) changes the code, add a new entry titled `<TICKET-ID> (amendment)` with only what changed.
7. Date is the date of the PASS, `YYYY-MM-DD`.
