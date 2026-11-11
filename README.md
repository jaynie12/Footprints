# Footprints
 visual, personal archive that transforms a map into a wholesome memory vault for a user's entire lifetime; combining travel, local everyday moments, concerts, and dining into a single emotional canvas


 
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

<img width="100" height="300" alt="image" src="https://github.com/user-attachments/assets/54e08976-6a83-44c6-9365-940d91a3ceff" />


# Data model


# Systems Diagram


# Agent Strategy for Agentic Software lifeycle

