// Renders the app icon SVG to PNGs with the pre-installed Playwright Chromium.
// Run: npm run icons  (outputs are committed, so this is only needed if the icon changes)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // pre-installed globally
import { mkdirSync } from 'node:fs';

const icon = (pad) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#000"/>
  <g transform="translate(256 256) scale(${1 - pad}) translate(-256 -256)">
    <circle cx="256" cy="256" r="190" fill="none" stroke="#fff" stroke-width="36"/>
    <path d="M256 92 318 256H194z" fill="#ff3b30"/>
    <path d="M256 420 194 256h124z" fill="#fff"/>
  </g>
</svg>`;

const out = [
  ['public/icons/icon-192.png', 192, 0.08],
  ['public/icons/icon-512.png', 512, 0.08],
  ['public/icons/maskable-512.png', 512, 0.3], // keep inside the maskable safe zone
  ['public/icons/apple-touch-icon.png', 180, 0.12]
];

mkdirSync('public/icons', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
for (const [file, size, pad] of out) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<html><body style="margin:0;background:#000">${icon(pad).replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`
  );
  await page.screenshot({ path: file, omitBackground: false });
  console.log('wrote', file);
}
await browser.close();
