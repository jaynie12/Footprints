---
name: approval-summary
description: Use when finishing a requirements or design document that a human must approve. Provides the fixed, dated, one-minute summary format placed at the top of the document, and the approval mechanism.
---
# Approval summary

The human reads this at a gate and decides in about a minute. It must be fast to read, honest about uncertainty, and the same shape every time.

## Format
Place under `## Summary for approval` at the top of the document.

```
**Stage:** Requirements | Design      **Ticket:** <ID>      **Date:** <YYYY-MM-DD>      **Revision:** <n>

**What:** <2 to 3 sentences. What will exist when this is done.>
**Why:** <1 sentence. The user or business reason.>
**Key decisions:** <up to 5 bullets. What you chose, in plain language.>
**Assumptions to confirm:** <A-n list, or "none">
**Open questions (blocking):** <Q-n list, or "none">
**Out of scope:** <1 to 3 bullets>
**Risks:** <1 to 3 bullets, or "none identified">
**Size:** <for Design: number of D-items and files touched. For Requirements: number of REQs, how many UI.>

**To approve:** set `Status:` at the top of this file to `APPROVED — <your name>, <date>`.
**To change:** reply with what to change; I will revise and bump the revision.
```

## Rules
- Maximum about 15 lines. If it is longer, the document is doing too much or the summary is not a summary.
- Plain language. No unexplained IDs in prose; refer to `REQ-2` only alongside what it means.
- Surface everything the human might regret not seeing: new assumptions, anything touching data or security, anything that changes existing behaviour.
- Never claim approval. Never set `Status: APPROVED`. That is the human's action and the only thing that releases the next stage.
- Revisions: rewrite the summary for the new revision and update the date. Mention in one line what changed since the last revision.
