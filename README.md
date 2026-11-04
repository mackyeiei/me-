# Offline Survival (PWA)

Offline-first survival kit that installs from the browser on iPhone and Android. After the first load it works fully offline (airplane mode). Built for low battery use: true-black theme, red night mode, no animations, no background work.

**Tabs:** Map · Compass · Guide · Knots · Plan · Tools

Build status by phase:

| Phase | What | Status |
|---|---|---|
| 1 | PWA shell, offline install, tabs, Plan page, 3 sample guide pages | ✅ done |
| 5 | Knots: 15 knots, step-by-step SVG drawings | ✅ done (pulled forward) |
| + | Redesign, illustrated go-bag gear guide (THB prices), 7 life-hack pages | ✅ done |
| 2 | Compass + GPS + pins | next |
| 3 | Offline map download (Thailand PMTiles) | |
| 4 | Full guide content + search (MiniSearch) | |
| 6 | Tools + polish | |

Knot drawings are data, not images: see `src/knots/types.ts`. Open `#/knots/_sheet` to see every frame of every knot on one page while editing.

## Stack

- Vite + TypeScript + Preact (the shell is about 24 KB gzipped; the budget is 300 KB and `npm run build` fails if it goes over)
- `vite-plugin-pwa` (Workbox `generateSW`) precaches the shell and all content chunks
- Guide content: Markdown in `content/<locale>/*.md`, compiled to JSON at build time by `plugins/guide-content.ts`
- User data: IndexedDB (`src/lib/db.ts`), with `navigator.storage.persist()` requested at startup
- Phase 3 adds MapLibre GL JS + PMTiles, loaded only when the Map tab opens

## Develop

```bash
npm install
npm run dev        # http://localhost:5173 (the service worker is off in dev)
npm run build      # type-check + build + size report
npm run preview    # serve dist/ with the service worker, to test offline
```

## Deploy to Cloudflare Pages

You need HTTPS for the service worker, GPS and compass. Cloudflare Pages gives you HTTPS for free.

### Option A: connect the GitHub repo (recommended)

1. Go to Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick this repo.
3. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
4. Set the **production branch** (e.g. `main`). Other branches get preview URLs.
5. Click Deploy. Every push redeploys.

### Option B: deploy from your computer

```bash
npx wrangler login
npm run deploy     # builds, then: wrangler pages deploy dist --project-name offline-survival
```

`public/_headers` stops the CDN from caching `sw.js`, `index.html` and the manifest, so updates reach phones. Hashed assets are cached forever.

## Install on a phone

Open the site **once while online** and wait until the "Ready to work offline" banner appears. Then install it:

### iPhone (Safari)

1. Open the URL in **Safari**. On iOS 16.4+ Chrome/Edge also work, but Safari is the safest choice.
2. Tap **Share** (square with arrow) → **Add to Home Screen** → **Add**.
3. Open the app **from the home screen icon**. On iOS, the home-screen app has separate storage from Safari, so set up your Plan *inside the installed app*.

### Samsung / Android

- **Chrome:** menu ⋮ → **Install app** (or **Add to Home screen**) → Install.
- **Samsung Internet:** menu ☰ → **Add page to** → **Home screen**, or tap the install icon in the address bar.

### Check it works offline

Open **Tools → Offline status**. You should see "Offline app installed: Yes". Then turn on airplane mode, close the app fully, and reopen it.

## Backups

Go to **Plan → Backup & restore** → **Export backup**. You get one JSON file with your plan and map pins.
- iPhone: the share sheet opens. Pick **Save to Files**.
- Android: the file goes to Downloads.

Keep one copy off the phone (cloud drive, a USB stick, a family member's phone).

## Known iOS PWA limits

- **Storage can be evicted.** Safari may delete website data that has not been used for a while (the 7-day rule applies to sites in the browser). Home-screen apps are mostly exempt, and we call `navigator.storage.persist()`, but iOS still does not guarantee it. **Export backups.**
- **Separate storage:** the home-screen app and Safari do not share data.
- **No background anything:** there is no background GPS, no background sync, and no periodic updates. That suits this app, since it never runs in the background anyway.
- **Compass needs a tap:** iOS asks for motion permission (`DeviceOrientationEvent.requestPermission()`) and only allows the request after a button tap. If you deny it, you may need to delete and re-add the app to be asked again.
- **GPS permission** is asked per app. If it gets stuck, go to Settings → Privacy → Location Services → Safari Websites.
- **Storage quota:** iOS gives roughly up to ~60% of free disk to an origin, but large downloads (the phase 3 map) can still fail if the phone is nearly full.
- **Screen stays on:** the Wake Lock API needs iOS 16.4+. On older versions the screen light and SOS flasher will let the screen sleep.
- **Updates:** iOS checks for a new version when you launch the app while online. Fully close the app and reopen it to pick up an update.
- **Phone links** (`tel:`) work. SMS/share depend on the iOS version.

## Adding Thai later

- UI strings: copy `src/i18n/en.ts` to `th.ts` (same keys) and register it in `src/i18n/index.ts`.
- Guide: add `content/th/*.md` with the same `id`s, then import `virtual:guide/th` in `src/tabs/guide.tsx` by locale.
- The CSS font stack already includes Noto Sans Thai.

## Guide content format

```markdown
---
id: water-boiling
title: Boil water to make it safe
section: water          # priorities|water|food|fire|shelter|firstaid|navigation|signaling|urban|repairs|hygiene|bugout
order: 2
sources:
  - US CDC, "Making Water Safe in an Emergency" (public domain)
---
Short numbered steps. Use "> **Warning:** ..." for red warning boxes.
```

The build fails if a page has no `sources`.

## Disclaimer

Reference only. It is not a substitute for training or medical care. In Thailand: **1669** ambulance, **191** police, **199** fire.
