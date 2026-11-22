# TICKET: TICKET-0005, Set up S3 media storage

Source: pasted manually
Pasted: 2026-11-22

## Description
Create the S3 bucket and upload/download policies for user photos and videos. Define object key conventions linking media to pins and memories.

## Acceptance criteria (from the ticket, if any)
- Create separate or environment-specific buckets.
- Block public access by default.
- Define the approved media object key format.
- Configure least-privilege upload and read access.
- Document lifecycle and retention behavior.

## Links / attachments / notes
- design-decisions/storage-decisions.md
