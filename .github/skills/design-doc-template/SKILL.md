---
name: design-doc-template
description: Use when writing or reviewing a low-level implementation design for approved requirements. Provides the 02-design.md structure that maps each REQ to D-items (files, classes, functions, data shapes), a test plan, risks, and an architecture impact check.
---
# Design doc template

A design here is **low level**: it says exactly what to create or change in this codebase. The architecture is already decided; do not redesign it.

Copy [design-template.md](./design-template.md) to `.sdlc/<TICKET>/02-design.md` and fill it in. Write the top summary using the **approval-summary** skill.

## Rules
1. **Every REQ maps to at least one D-item, and every D-item cites at least one REQ.** Check both directions before you finish.
2. **Be concrete.** A D-item names a path, a signature or shape, behaviour, and error cases. "Add validation" is not a D-item. "`validate_email(value: str) -> str` in `backend/app/validators.py`, raises `ValueError` on invalid format (REQ-2)" is.
3. **Reuse before inventing.** For each new thing, point at the closest existing pattern (file path). If none exists, say so; that is worth the human noticing.
4. **Types are first-class.** Give request and response bodies, Pydantic or dataclass models, and TypeScript interfaces. This is where backend and frontend drift apart.
5. **Test plan covers every REQ and is specific enough to write tests from before any code exists.** Each `T-n` names its level (unit, integration, e2e), the REQ(s) it covers, **concrete inputs and the exact expected output or state**, and `Test-first: yes/no`. Several cases per behaviour, including edge and error cases, so a hardcoded answer cannot pass. A separate agent writes these tests without seeing the implementation, so anything vague here becomes a guess.
6. **No code bodies.** Signatures, shapes and short pseudocode only. The Developer writes the code.
7. **Architecture impact check.** New service, datastore, dependency, or a change to an existing pattern means `Architecture impact: YES`. Present options with the STUCK format and wait. Do not decide alone.
8. **Unknowns are questions, not guesses.**

## Item types
`new function` · `new class` · `modify function/class` · `new endpoint` · `new model/schema` · `new component` · `new hook` · `new route` · `config` · `migration` · `test utility`

## Self-check before submitting
- [ ] Requirements doc was `APPROVED` when I started
- [ ] REQ ⇄ D coverage is complete both ways
- [ ] Every T-n maps to a REQ, and every REQ has a T-n
- [ ] Paths follow the layout in `architecture.md`
- [ ] Architecture impact is stated honestly
- [ ] Summary can be read in about a minute
