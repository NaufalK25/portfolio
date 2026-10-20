// Snapshot /repo from portfolio-api into src/data/repos.json before each build, so prerendered
// HTML and the first client render match. If the API is down, the last snapshot is kept.
import fs from 'node:fs';
import { loadEnv } from 'vite';

const out = new URL('../src/data/repos.json', import.meta.url);
const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env };
const base = env.VITE_BASE_URL;
const keep = ['name', 'description', 'stacks', 'created_at', 'homepage', 'htmlUrl', 'licenseName', 'licenseUrl', 'thumbnail'];

try {
  const res = await fetch(`${base}/repo`, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { data } = await res.json();
  if (!data?.length) throw new Error('no rows');
  const rows = data.map(r => Object.fromEntries(keep.map(k => [k, r[k] ?? null])));
  fs.writeFileSync(out, `${JSON.stringify(rows, null, 2)}\n`);
  console.log(`snapshot: ${rows.length} repos from ${base}`);
} catch (err) {
  if (!fs.existsSync(out)) throw new Error(`snapshot: ${base} failed (${err.message}) and no previous snapshot exists`);
  console.warn(`snapshot: ${base} failed (${err.message}), keeping the previous snapshot`);
}
