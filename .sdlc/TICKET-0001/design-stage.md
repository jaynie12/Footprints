  
Status: APPROVED — Jaynie, 2026-11-22

## Summary for approval
**Stage:** Design **Ticket:** TICKET-0001 **Date:** 2026-11-22 **Revision:** 3

**What:** Design a greenfield monorepo with an Android React Native TypeScript app, a TypeScript Lambda backend, and phone-local SQLite. The design covers setup, checks, a health endpoint, and deployment to AWS resources configured manually by the project owner.
**Why:** Provide a concrete, testable starting point for Footprints development.
**Key decisions:** Use API Gateway REST with `GET /health` returning HTTP 200 and `{"status":"ok"}` through Lambda proxy integration; build a Lambda ZIP for console upload during phase 1; use npm, ESLint, Jest for React Native, and Node's built-in test runner for the backend. The REST rationale is recorded in `design-decisions/system-design.md`.
**Assumptions to confirm:** None
**Open questions (blocking):** none
**Out of scope:** User features, remote databases, AWS resource provisioning, and production operations.
**Risks:** No existing source code or implementation patterns are available to reuse.
**Size:** 7 D-items and approximately 13 files touched; 1 UI requirement.

**To approve:** set `Status:` at the top of this file to `APPROVED — <your name>, <date>`.
**To change:** reply with what to change; I will revise and bump the revision.

## Approach
This is a new repository scaffold, so there are no existing source-code patterns to reuse. The approved requirements and project decisions establish React Native with TypeScript, Node.js with TypeScript, AWS Lambda/API Gateway, and phone-local SQLite. The owner selected REST API Gateway with Lambda proxy integration, console-managed ZIP deployment for phase 1, and the npm/ESLint/Jest/Node test-runner toolchain.

## Change list

### D-1: Create separate frontend and backend projects (covers REQ-1)
- **Type:** config
- **Location:** `frontend/`, `backend/`, and root `README.md`
- **Signature / shape:** Each application has its own `package.json` and TypeScript configuration; root documentation describes installing and running both.
- **Behaviour:** Keep the mobile app and server logic in separate directories in one repository. Use npm, with frontend and backend package manifests; root scripts may delegate checks to each directory.
- **Errors and edge cases:** Setup instructions must distinguish frontend and backend commands and must not imply that either package can be started before dependencies are installed.
- **Reuses:** No existing project structure or package configuration exists. The product-level stack is recorded in `design-decisions/tech-stack.md`.

### D-2: Add an Android React Native app shell (covers REQ-2)
- **Type:** new component
- **Location:** `frontend/App.tsx` and React Native CLI-generated Android project files under `frontend/android/`
- **Signature / shape:** `App(): React.JSX.Element`
- **Behaviour:** Render a visible scaffold screen containing the Footprints app name. Configure the React Native CLI project for TypeScript and Android phase 1 only.
- **Errors and edge cases:** The app must render without navigation, authentication, permissions, or backend availability. Android build/runtime failures must surface through the documented build or launch command.
- **Reuses:** No frontend components or native-project patterns exist. React Native/TypeScript are established by `design-decisions/tech-stack.md` and REQ-2.

### D-3: Initialize the phone-local SQLite database (covers REQ-5)
- **Type:** new function
- **Location:** `frontend/src/storage/localDatabase.ts`
- **Signature / shape:** `initializeLocalDatabase(): Promise<void>`
- **Behaviour:** Initialize/open a local database through the approved `react-native-sqlite-storage` package. Initialization must not call the backend or AWS. No application tables are required by this ticket.
- **Errors and edge cases:** Reject initialization failures so the app or test reports them; do not silently treat an unavailable database as success. Database filename and package-specific call details must be confirmed against the chosen package interface during implementation.
- **Reuses:** No local-storage code exists. The selected package and offline-only constraint are stated in REQ-5 and the ticket.

### D-4: Add the TypeScript Lambda health handler (covers REQ-3, REQ-4)
- **Type:** new endpoint
- **Location:** `backend/src/handler.ts`
- **Signature / shape:** A Lambda handler accepting the REST API Gateway event and returning `{ statusCode: number, headers: Record<string, string>, body: string }`.
- **Behaviour:** Map `GET /health` through Lambda proxy integration. Return status `200`, header `content-type: application/json`, and body `{"status":"ok"}` without connecting to a database or requiring secrets.
- **Errors and edge cases:** Do not return a success response if handler execution fails. Unsupported methods and paths are not configured by this health-only scaffold; API Gateway handles requests that do not match the configured route.
- **Reuses:** No backend route or handler patterns exist. The Lambda/API Gateway hosting direction is established by REQ-4 and `design-decisions/FootprintsArchDiagram.drawio.png`.

### D-5: Prepare backend deployment instructions and artifact (covers REQ-4)
- **Type:** config
- **Location:** `backend/package.json`, `backend/tsconfig.json`, and `backend/README.md`
- **Signature / shape:** A build command produces JavaScript packaged as a ZIP suitable for Lambda console upload during phase 1.
- **Behaviour:** Document how to build and connect the backend to Lambda/API Gateway resources configured manually in the AWS Console. The scaffold must not create AWS resources.
- **Errors and edge cases:** Document required runtime/configuration and report build or upload failures; never include credentials. Region, runtime version, and resource identifiers must be supplied by the owner, not committed.
- **Reuses:** No deployment scripts or backend build configuration exist. `design-decisions/system-design.md` notes the project owner's preference to manage AWS directly rather than use Amplify.

### D-6: Add project quality-check configuration (covers REQ-6)
- **Type:** config
- **Location:** root `package.json`, `frontend/package.json`, `backend/package.json`, and application TypeScript/lint/test configuration files
- **Signature / shape:** npm scripts for lint, type-check, and unit tests; ESLint for linting, Jest for React Native tests, and Node's built-in test runner for backend tests.
- **Behaviour:** Commands must run independently for the frontend and backend. Root scripts may delegate to both packages.
- **Errors and edge cases:** Each command must exit unsuccessfully on lint/type/test failures; the health check must fail if the handler response is not the approved success contract.
- **Reuses:** No scripts or tooling configuration exist. The required check categories are specified in REQ-6.

### D-7: Keep credentials out of source control (covers REQ-7)
- **Type:** config
- **Location:** `.gitignore`, `.env.example`, and `README.md`
- **Signature / shape:** Ignore local `.env` files; provide only non-secret variable names/placeholders in `.env.example`.
- **Behaviour:** Keep deployment credentials and account-specific values outside committed source; document how the developer supplies any required values.
- **Errors and edge cases:** Missing required values must be reported during setup/deployment rather than replaced with embedded defaults.
- **Reuses:** The existing `.gitignore` already excludes `.env`; extend it without removing existing ignore rules. `.github/copilot-instructions.md` requires environment variables and `.env.example` for secrets.

## Data shapes

Health response:

```json
{
  "statusCode": 200,
  "headers": {
    "content-type": "application/json"
  },
  "body": "{\"status\":\"ok\"}"
}
```

The local database has no schema in this ticket. Its required state is that initialization succeeds and a local SQLite database can be opened while the device is offline.

## Test plan
| ID | Covers | Level | Test-first | Inputs → expected result |
|---|---|---|---|---|
| T-1 | REQ-1 | unit | yes | Inspect repository structure → both `frontend/` and `backend/` exist as separate application directories in the same repository. |
| T-2 | REQ-2 (UI) | e2e | no (Tester, Android emulator/device) | Install and launch the app on Android → app opens without crash and visibly displays “Footprints”. |
| T-3 | REQ-3 | unit | yes | Invoke the Lambda handler for `GET /health` → returns `statusCode: 200`, `content-type: application/json`, and body `{"status":"ok"}`. |
| T-4 | REQ-4 | integration | no (Tester, manually configured AWS resources) | Build a ZIP and upload it using the AWS Console, then send `GET /health` to the configured REST API Gateway → Lambda responds with HTTP 200 and `{"status":"ok"}`; no scaffold step provisions AWS resources. |
| T-5 | REQ-5 | integration | yes | Initialize SQLite on Android with network unavailable → local database initialization succeeds and can be reopened without contacting a remote service. |
| T-6 | REQ-6 | unit | yes | Run each documented npm lint, type-check, Jest (frontend), Node test-runner (backend), and health-check command → each exits successfully on the clean scaffold; introduce a lint/type/test/health failure in isolation → the relevant command exits unsuccessfully. |
| T-7 | REQ-7 | unit | yes | Inspect committed config and ignore rules → no credential/token values are present, local `.env` is ignored, and `.env.example` contains placeholders only. |

## Traceability
| REQ | D-items | T-items |
|---|---|---|
| REQ-1 | D-1 | T-1 |
| REQ-2 | D-2 | T-2 |
| REQ-3 | D-4 | T-3 |
| REQ-4 | D-4, D-5 | T-4 |
| REQ-5 | D-3 | T-5 |
| REQ-6 | D-6 | T-6 |
| REQ-7 | D-7 | T-7 |

## Design questions and decisions
| ID | Question | Why it matters | Proposed option | Decision / rationale |
|---|---|---|---|---|
| Q-1 | Should API Gateway use an HTTP API or REST API? | The API type determines the Lambda event contract. | REST API | **Resolved:** REST. Rationale is in `design-decisions/system-design.md`: structured response management, edge-location caching, IAM resource policies, and support for external/cross-region use. |
| Q-2 | Should the backend be compiled to a ZIP and uploaded through the AWS Console, or should a CLI deployment tool upload code to the manually created resources? | TypeScript must be built into a Lambda-supported artifact; deployment instructions depend on the upload path. | Build ZIP and upload through the Console. | **Resolved:** Agreed for at least phase 1; AWS resource management remains console-based. |
| Q-3 | May the design use npm, ESLint, Jest for the React Native app, and Node's built-in test runner for the backend? | There is no existing package manager or test/lint tooling, and adding these tools affects dependencies and commands. | npm, ESLint, Jest (React Native), and Node's built-in test runner (backend). | **Resolved:** Approved. |
| Q-4 | Should the health check be `GET /health` returning HTTP 200 with `{"status":"ok"}` through a Lambda proxy integration? | The route, response, and integration mode are needed to define the handler contract and exact health tests. | Use the proposed route, response, and Lambda proxy integration. | **Resolved:** Approved as a good start. |

## Files touched
- `.sdlc/TICKET-0001/design-stage.md` (new)
- Root `package.json` and `.gitignore` (new/modified; root npm scripts delegate to the separate frontend/backend packages)
- `README.md` (modified)
- `frontend/` React Native CLI app, Android project, SQLite helper, and tooling config (new)
- `backend/` Lambda handler, TypeScript/build configuration, deployment instructions, and tooling config (new)
- `.env.example` (new)

## Risks and alternatives considered
- No source files or established test/tool patterns exist; all project scaffolding is new.
- A console-managed Lambda setup still needs a defined API Gateway event/response contract and a repeatable TypeScript build artifact.
- The architecture diagram includes AWS services beyond this ticket's approved Lambda/API Gateway scope. DynamoDB and S3 are not added by this scaffold; their project decisions are recorded in `design-decisions/storage-decisions.md`.
- The existing `README.md` also describes PostgreSQL as phase-one database strategy. This ticket's approved requirement is phone-local SQLite only; no remote database behavior is designed here.

## Architecture impact
YES: this introduces the React Native app, Node.js Lambda backend, REST API Gateway integration, and the approved `react-native-sqlite-storage` dependency in a repository with no existing application code. The owner confirmed the stack, health contract, phase-1 console ZIP deployment, and lint/test toolchain; no additional architecture decision remains open.

## Out of scope observations
- `design-decisions/storage-decisions.md` describes DynamoDB and S3 for future user data/media. Neither is required by this scaffold's approved requirements.
- The project README's PostgreSQL strategy conflicts with the ticket's local SQLite requirement if interpreted as the same datastore; no remote datastore is included in this design.

## Change history
| Rev | Date | Change |
|---|---|---|
| 1 | 2026-11-22 | Initial design draft based on approved requirements. |
| 2 | 2026-11-22 | Recorded REST API rationale, phase-1 console ZIP deployment, and approved tooling; added a separate health-contract question and decision/rationale column. |
| 3 | 2026-11-22 | Recorded approval of the REST health route, response, and Lambda proxy integration; resolved Q-4. |
