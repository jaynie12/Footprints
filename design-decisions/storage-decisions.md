# AWS storage decisions

## Decision:
- Dyanmo DB for the user data/memories meta
- S3 for storing the media 

## DyanmoDB justification:
- I know my access patterns up front as there isn't deep querying or analysis going to be done for this appliation. The workload does not need to get data from mulitple entity. 
- In this use case I am just grabbing all the pins and information related to a user to display their pins. This lends itself to primary key lookup at a high throughput as I would need to load all the pins/memories every time a user opens the application
-  I don't need to worry about ad-hoc filers, multi-row transactions

## S3 justification
- Cost effective object store for media files

## Synching pattering between S3 and Dynamo
NEED TO HAVE A SET KEY FORMAT TO ASSOCIATE AN DYNAMODB RECORD WITH AN S3 OBJECT STORE -  this will be pinid-date

Inspiration: https://aws.plainenglish.io/track-your-s3-uploads-like-a-pro-with-lambda-and-dynamodb-4efc002bc7bc


## Cost justifications:
- Dynamo DBs 25GB of free storage is separate from my $200 of free credit which means I can save the credits for another service

## Trade Off:
- Lack of familiarity with no-sql databases (chance to learn something new)
- Flexibility of queries 


## Scaling considerations
- In the future if I require options such as sharing a footprint app or creating  a group map, then I will explore the use of Aurora DB


Summary

- This was an interesting decision to make because 