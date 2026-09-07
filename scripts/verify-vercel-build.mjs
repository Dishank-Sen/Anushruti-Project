import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve('dist/vercel');
const html = await readFile(resolve(output, 'index.html'), 'utf8');
assert.match(
  html,
  /id="root"/,
  'Static entry must include the React mount point',
);
const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)].map(
  (match) => match[1],
);
assert.ok(
  assets.some((asset) => asset.endsWith('.js')),
  'Missing browser JavaScript',
);
assert.ok(
  assets.some((asset) => asset.endsWith('.css')),
  'Missing stylesheet',
);
for (const asset of assets) await access(resolve(output, '.' + asset));
await access(resolve(output, 'favicon.svg'));
console.log(
  `Verified static entry, favicon, and ${assets.length} referenced assets.`,
);
