import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

test('a different hostname cannot access the admin API', async () => {
  const res=await worker.fetch(new Request('https://feed.example.com/api/admin/bmc/data'),{ ADMIN_HOST:'admin.example.com' });
  assert.equal(res.status,404);
});
test('admin API fails closed without Cloudflare Access configuration', async () => {
  const res=await worker.fetch(new Request('https://admin.example.com/api/admin/bmc/data'),{ ADMIN_HOST:'admin.example.com' });
  assert.equal(res.status,503);
});
test('a public feed without bindings does not leak data', async () => {
  const res=await worker.fetch(new Request('https://feed.example.com/api/public/bmc/shows'),{ ADMIN_HOST:'admin.example.com' });
  assert.equal(res.status,503);
});
test('separate site IDs and invalid sites do not resolve', async () => {
  for (const site of ['wrong','bmc%2Fsierra','unknown']) {
    const res=await worker.fetch(new Request('https://feed.example.com/api/public/'+site+'/shows'),{});
    assert.equal(res.status,404);
  }
});
test('public route is read-only even with storage bindings', async () => {
  const res=await worker.fetch(new Request('https://feed.example.com/api/public/bmc/shows',{method:'POST'}),{
    DB:{}, PHOTOS:{}
  });
  assert.equal(res.status,405);
});
