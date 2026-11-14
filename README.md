# Footprints
 Visual, personal archive that transforms a map into a wholesome memory vault for a user's entire lifetime; combining travel, local everyday moments, concerts, and dining into a single emotional canvas

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

Agent 1: Requirement refinement (I will input the requirement, 
 -  Sub Agent a:  Research tech choices documentation
 -  Sub Agent b: Write a testing plan 
Agent 2: Developer and unit tester
Agent 3: Read only peer reviewer
Agent 4: QA tester to validate functionality and if needed take screenshots as evidence
Agent 5: Deployment of branch to github

Skills:
1. Code reviewer skill
2. How to QA test skill


