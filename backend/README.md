# Footprints backend

The TypeScript health handler runs on AWS Lambda behind a REST API Gateway. Configure the AWS resources in the AWS Console.

## Local checks

From the repository root:

```powershell
npm --prefix backend run lint
npm --prefix backend run typecheck
npm --prefix backend test
npm --prefix backend run health
```

The health route is `GET /health`; it returns HTTP 200 with `{"status":"ok"}`.

## Phase 1 Lambda package

Build and create the upload archive:

```powershell
npm --prefix backend run package:lambda
```

Upload `backend/lambda.zip` in the Lambda Console and set the handler to `handler.handler`. Configure the REST API Gateway `GET /health` resource with Lambda proxy integration to invoke this function. This project does not create AWS resources or include credentials.
