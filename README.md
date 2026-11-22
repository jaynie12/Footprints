# Footprints
 Visual, personal archive that transforms a map into a wholesome memory vault for a user's entire lifetime; combining travel, local everyday moments, concerts, and dining into a single emotional canvas

## Project setup

Phase 1 includes an Android React Native CLI app and a TypeScript Node.js backend.

Install dependencies from the repository root:

```powershell
npm install --prefix frontend
npm install --prefix backend
```

Set up the Android development environment by following the React Native
[Android environment guide](https://reactnative.dev/docs/set-up-your-environment).
Then start Metro in one terminal and build/run the Android app in another:

```powershell
npm run start
npm run android
```

Run the project checks from the repository root:

```powershell
npm run lint
npm run typecheck
npm test
npm run health
```

The backend health route is `GET /health` and returns `{"status":"ok"}`. To
prepare the phase-one Lambda ZIP for console upload, run
`npm --prefix backend run package:lambda`; see [backend/README.md](./backend/README.md).

# Design Decisions (In depth)
Please see the **design-decisions** directory for detailed information on the following

- AWS storage justifications
- Agentic workflow decisions
- Data models
- Tech stack justifications
- Wireframes



# Database strategy

Phase 1 for MVP:
- PostgresSQL with JSONB data with the potential of using AWS S3 for storing my media files. 
- Trading off scalability for having a working product because the querying for user authentication and media management will all be in the same place 

Phase 2 for scaling:
- Hybrid data architecture:
1. Relational database will be used to store User accounts, Friendships/Relationships, Authentication
2.  No-SQL database for the pins/media meta data
3.  Object store for the actual videos themselves

Trade off: Extra costs for managing multiple databases and extra operational overhead. But the priority here will be reduced latency, easier scaling and caching.



# Data model  




# Systems Diagram


# Agent Strategy for Agentic Software lifeycle
I am choosing not to have an architecture agent as I would like to design this myself. 
There will be handoff settings between each agent to maintain context but human in the loop between each

- See the agents folder for the actual agents
- See the agentic-workflow files in the design-decisions folder for the rationale


