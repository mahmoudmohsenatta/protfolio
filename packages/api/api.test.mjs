import assert from 'node:assert/strict';
import test from 'node:test';

import apiPkg from './index.js';

const { createDataClient } = apiPkg;

test('createDataClient falls back cleanly to mock rows when env vars are missing', async () => {
  const client = createDataClient({ supabaseUrl: '', supabaseKey: '' });
  assert.equal(client.isLiveSupabase, false);
  const sample = [{ id: 'a1', title: 'HIIT Burn' }];
  const res = await client.selectTable('activities', sample);
  assert.equal(res.source, 'mock');
  assert.deepEqual(res.data, sample);
});

