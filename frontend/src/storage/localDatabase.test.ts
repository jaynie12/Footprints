import assert from 'node:assert/strict';
import test from 'node:test';

import { initializeLocalDatabase } from './localDatabase.ts';

test('T-5 REQ-5: initializeLocalDatabase succeeds only after opening a local SQLite database', async () => {
  await assert.doesNotReject(initializeLocalDatabase());
});
