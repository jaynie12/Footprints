# Footprints
 visual, personal archive that transforms a map into a wholesome memory vault for a user's entire lifetime; combining travel, local everyday moments, concerts, and dining into a single emotional canvas

# Tech Stack
Flutter as I would like it to be an app
 
 # User Journey 
 
 <img width="1216" height="648" alt="image" src="https://github.com/user-attachments/assets/2a64c30d-ced2-4b47-ae6f-88580df79cc0" />

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

# Proposed Wireframes

NOTE: Real pins instead of the location stock image pins will be used (I just couldn't find a nice image of real pins so will need to generate one) 
Colour scheme: To be decided 

<img width="918" height="621" alt="image" src="https://github.com/user-attachments/assets/8e5d82a9-c889-41df-9010-2e806b8e9d92" />


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


