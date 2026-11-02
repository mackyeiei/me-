// Prints gzipped sizes and fails the build if the app shell exceeds 300 KB gzipped.
// "Shell" = all JS/CSS/HTML except content chunks (guide, knots) and the map engine.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const BUDGET = 300 * 1024;
const EXCLUDE = /^(guide|knots|map|maplibre|pmtiles)[-.]/;
const dist = 'dist';

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

let shell = 0;
let content = 0;
const rows = [];
for (const file of walk(dist)) {
  if (!/\.(js|css|html|webmanifest)$/.test(file)) continue;
  const gz = gzipSync(readFileSync(file)).length;
  const name = file.slice(dist.length + 1);
  const isContent = EXCLUDE.test(name.split('/').pop());
  if (isContent) content += gz;
  else shell += gz;
  rows.push([name, gz, isContent]);
}
rows.sort((a, b) => b[1] - a[1]);
for (const [n, gz, c] of rows) console.log(`${(gz / 1024).toFixed(1).padStart(8)} KB  ${c ? '(content) ' : ''}${n}`);
console.log(`\nApp shell: ${(shell / 1024).toFixed(1)} KB gzipped (budget 300 KB). Content/map: ${(content / 1024).toFixed(1)} KB.`);
if (shell > BUDGET) {
  console.error('App shell is over budget!');
  process.exit(1);
}
