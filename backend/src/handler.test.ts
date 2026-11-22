import assert from 'node:assert/strict';
import test from 'node:test';

import { handler } from './handler.ts';

test('T-3 REQ-3: GET /health returns the Lambda proxy success contract', async () => {
  const response = await handler({
    httpMethod: 'GET',
    path: '/health',
  });

  assert.deepEqual(response, {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: '{"status":"ok"}',
  });
});
