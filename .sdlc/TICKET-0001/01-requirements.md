Status: APPROVED — Jaynie, 2026-11-22

## Summary for approval
**Stage:** Requirements **Ticket:** TICKET-0001 **Date:** 2026-11-22 **Revision:** 3

**What:** Define a scaffold for an Android-first React Native CLI app and TypeScript Node.js server in separate frontend and backend directories, with Lambda/API Gateway hosting and phone-local SQLite.
**Why:** The project needs a verified starting point before feature development begins.
**Key decisions:** React Native CLI for Android; separate frontend/backend directories; TypeScript; AWS Lambda with API Gateway; `react-native-sqlite-storage`; lint, type-check, unit tests, and health check.
**Assumptions to confirm:** none
**Open questions (blocking):** none
**Out of scope:** Feature implementation, authentication, sign-up, permissions walkthrough, the interactive globe, and pin creation
**Risks:** AWS resources must be configured manually in the AWS Console before backend deployment.
**Size:** 7 requirements, 1 UI requirement

**To approve:** set `Status:` at the top of this file to `APPROVED - <your name>, <date>`.
**To change:** reply with what to change; I will revise and bump the revision.

## Restated ask
Ticket TICKET-0001 asks for the initial project scaffold for the Footprints application. The intended foundation is a React Native TypeScript mobile app, a Node.js TypeScript backend, AWS-hosted deployment assets, and a local SQL database for each user's phone to support offline storage.

The repository currently contains design decisions and documentation but no application source scaffold. The project must be left in a runnable starting state, not with only documentation or partial packages.

## Scope
- **In scope:** A monorepo with separate frontend and backend directories; an Android React Native CLI app shell; a TypeScript Node.js server shell; AWS Lambda/API Gateway deployment foundation for resources configured manually in the AWS Console; phone-local SQLite using `react-native-sqlite-storage`; setup instructions; lint, type-check, unit-test, and health-check commands.
- **Out of scope:** Authentication, account sign-up/login, device-permission onboarding, pin creation, map or globe behavior, search, media upload, user synchronization, and complete AWS production infrastructure.

## Acceptance criteria
- **REQ-1** (UI: no) Given the scaffold repository is checked out, when a developer inspects its application directories, then the React Native frontend and Node.js backend are in separate `frontend` and `backend` directories within the same repository.
- **REQ-2** (UI: yes) Given the repository has been set up using the documented commands, when a developer starts the React Native CLI app on an Android device or emulator, then it launches to a visible Footprints scaffold screen without a runtime crash.
- **REQ-3** (UI: no) Given the scaffold dependencies are installed, when a developer starts the TypeScript Node.js server using the documented command, then the server starts successfully and its application-health check reports success.
- **REQ-4** (UI: no) Given AWS Lambda and API Gateway resources have been configured manually in the AWS Console, when a developer follows the documented backend deployment process, then the TypeScript application server can be deployed to Lambda and exposed through API Gateway without the scaffold provisioning AWS resources.
- **REQ-5** (UI: no) Given the mobile app is launched on an Android device or emulator, when local database initialization runs, then an SQLite database using `react-native-sqlite-storage` is available for offline use without a remote service.
- **REQ-6** (UI: no) Given the scaffold is set up, when a developer runs the documented lint, type-check, unit-test, and health-check commands, then each command completes successfully.
- **REQ-7** (UI: no) Given the scaffold is checked in, when its configuration and setup instructions are inspected, then no credentials or tokens are committed and any required secrets are supplied outside source control.

## Non-functional requirements
- The React Native app must use strict TypeScript.
- The Node.js application server must use TypeScript.
- The repository must contain setup instructions sufficient for a developer to install dependencies and start the Android app and backend.
- The project must provide lint, type-check, unit-test, and health-check commands.
- No secrets may be committed to source control.
- The offline SQLite database must remain phone-local and must not depend on AWS to initialize.
- AWS hosting must use Lambda and API Gateway.

## Assumptions (need your approval)
| ID | Assumption | Why | If wrong |
|---|---|---|---|
| none | No default has been invented for the unresolved blocking questions. | The answers materially change the selected tools and repository structure. | Requirements will be revised after human decisions. |

## Open questions
| ID | Question | Why it matters | Blocking? | Answer |
|---|---|---|---|---|
| Q-1 | Should the React Native app use Expo or React Native CLI? | This determines the project generator, native configuration, supported targets, and setup commands. | no | React Native CLI; phase 1 supports Android users only. |
| Q-2 | What repository layout should the React Native app and Node.js server use: separate top-level projects or one TypeScript monorepo? | It determines the project structure and the documented setup and verification commands. | no | Monorepo with separate frontend and backend directories. |
| Q-3 | Should the backend use Node.js and TypeScript as stated in the ticket, or should the repository conventions change to Python? | It determines the server runtime and language. | no | TypeScript; no Python. |
| Q-4 | Which AWS hosting/deployment approach should the scaffold include: for example AWS App Runner, ECS/Fargate, Lambda/API Gateway, or EC2? | It determines required infrastructure files, AWS services, deployment commands, and likely costs. | no | AWS Lambda with API Gateway. |
| Q-5 | Is this ticket expected to provision AWS resources, or only include deployable configuration and instructions? | It determines whether implementation creates live AWS resources or only supplies deployable scaffold assets. | no | No. The user will set up AWS resources in the AWS Console. |
| Q-6 | Which phone-local SQL database technology should be used: SQLite directly, expo-sqlite, or another React Native SQLite package? | It determines dependencies and native setup for the selected React Native CLI project. | no | SQLite using `react-native-sqlite-storage`. |
| Q-7 | Which minimum verification should the scaffold include: lint, type-check, unit test, and health check; or a smaller initial smoke check? | This defines the initial quality gates. | no | Lint, type-check, unit test, and health check. |

## Out of scope observations
- The design decisions for DynamoDB and S3 describe future application data storage; this ticket has not requested those application features or a data migration.
- The design decisions mention DynamoDB and S3; this ticket's confirmed hosting scope is Lambda and API Gateway, and provisioning other AWS services is not specified.
- The current repository has no learner architecture or ticket context artifacts.

## Change history
| Rev | Date | Change |
|---|---|---|
| 1 | 2026-11-22 | Initial requirements draft |
| 2 | 2026-11-22 | Incorporated answers for Q-1 through Q-4 and Q-6 through Q-7; left AWS resource provisioning scope in Q-5 unresolved. |
| 3 | 2026-11-22 | Recorded that AWS resources will be configured manually in the AWS Console; resolved Q-5 and updated REQ-4. |
