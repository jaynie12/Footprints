---
name: requirements-gap-checklist
description: Use when analysing a ticket or feature request for missing information, writing clarifying questions, or turning a request into numbered, testable acceptance criteria (REQ-1, REQ-2) tagged UI yes or no. Provides the gap checklist and the 01-requirements.md template.
---
# Requirements gap checklist

Use this to review a ticket before anything is designed. The goal is to surface what is missing, not to fill it in with guesses.

## 1. Gap prompts
Go through each. Note only what applies to this ticket.

- **Who and why:** who is the user or caller? What problem does this solve? How will we know it worked?
- **Happy path:** the exact steps and expected outcome.
- **Inputs:** types, formats, required vs optional, limits (length, size, range), defaults, validation rules.
- **Outputs:** shape, format, ordering, pagination, empty results.
- **Errors and edge cases:** invalid input, not found, duplicates, partial failure, timeouts, concurrency, retries.
- **Permissions and auth:** who may do this? What happens when they may not?
- **Data:** what is stored, changed, deleted? Migration or backfill? Retention? Personal data?
- **UI (if any):** states (loading, empty, error, success), responsive behaviour, accessibility, copy and wording, validation feedback.
- **Non-functional:** performance targets, security, logging, observability, compatibility.
- **Integrations and dependencies:** other services, existing features that could be affected, new libraries.
- **Scope edges:** what is explicitly not included? Is there a follow-up ticket?
- **Contradictions:** does anything in the ticket conflict with itself, with the architecture, or with existing behaviour?
- **Terms:** any ambiguous or undefined words ("fast", "recent", "admin")?

## 2. Classify each gap

| Class | Meaning | Action |
|---|---|---|
| **BLOCKING** | Cannot write a correct criterion without the answer | Ask. Mark dependent criteria `PENDING`. Stop and wait. |
| **ASSUMPTION** | Reasonable default exists, wrong guess is cheap to fix | State it as `A-n` with "if wrong" impact. Human approves with the requirements. |
| **NICE-TO-KNOW** | Would improve the result but does not change what is built | List briefly. Do not block. |

## 3. Writing questions
- Specific and answerable in one line. Offer options where you can: "Should duplicates be (a) rejected with 409, (b) merged, or (c) allowed?"
- One question per gap. Number them (`Q-1`...). Say why it matters.
- Check the ticket, context file and code first. Do not ask what they already answer.

## 4. Writing acceptance criteria
- One observable behaviour per `REQ-n`. If you wrote "and", consider splitting.
- Testable by someone who has not read the code. Prefer the form: **Given** a state, **when** an action, **then** an observable result.
- Include the error and edge cases the ticket implies, each as its own criterion.
- Avoid solution words (class names, libraries). That is design.
- Tag every criterion `UI: yes` or `UI: no`. `UI: yes` means a person would verify it in a browser and the Tester should capture a screenshot.

## 5. Template
Copy [requirements-template.md](./requirements-template.md) to `.sdlc/<TICKET>/01-requirements.md` and fill it in. Write the top summary using the **approval-summary** skill.
