# CLAUDE.md

Context for any Claude session working in this folder. Read this before changing anything.
The design rationale (concept, palette, type, layout plans) lives in `DESIGN.md`.

## What this is

An award-style redesign of Muhammad Naufal Kateni's portfolio, built with the `/awwwards` skill.
It's a clone of `../portfolio` (GitHub: `NaufalK25/portfolio`), kept separate so the original
stays untouched. All work sits **uncommitted** on branch `redesign/schema`, based on `35da1d7`.

**Never commit or push unless the user explicitly asks.**

## Concept (short)

The portfolio is drawn as an entity-relationship diagram, because he is a backend and DB-design
developer and the author of `orm2erd`:

- The hero is a `developer` entity with a 1:N relation line down into the projects.
- Projects are the rows of a `project` table, read live from his own API (`portfolio-api`).
- The signature piece is a join diagram, stacks ↔ projects, with crow's-foot lines built from the API data. Pick a node to light up its relations.
- Page transitions print the SQL query for the next page.
- The loader shows the real `GET /api/repo` request.
- The 404 page is a foreign-key violation.

Mono type (Martian Mono) is only for schema notation, never generic labels. The owner keeps a few
small labels in mono on purpose (see `DESIGN.md`, Type); don't flag those.

## Stack and constraints

- React 19 + Vite, **plain JS (no TS), no Next, no React Router.** The user asked to keep this stack.
- `gsap` (ScrollTrigger, SplitText) and `lenis` for motion and smooth scrolling. No WebGL.
- Plain CSS with design tokens. Tailwind, daisyUI, react-typed, react-feather and simple-icons were removed.
- Fonts are self-hosted in `public/fonts`: Archivo variable (width 62–125, weight 100–900) and Martian Mono 400. They have metric-matched fallbacks in `tokens.css` (no layout shift).

## Commands

```bash
npm run dev     # use port 5173: the API's CORS list only allows http://localhost:5173 for localhost
npm run build   # snapshot API → vite build → SSR build → prerender every route
npm run lint
```

`npm run build` steps:

1. `scripts/snapshot.mjs` saves `/api/repo` into `src/data/repos.json`. If the API fails, it keeps the old file. Commit `repos.json`.
2. `vite build` builds the client.
3. `vite build --ssr src/entry-server.jsx` builds the server render.
4. `scripts/prerender.mjs` writes `dist/index.html`, `dist/work/<slug>/index.html`, `dist/404.html`, `sitemap.xml` and `robots.txt`, each with its own title, meta, canonical, OG and JSON-LD.

Builds need network access or an existing snapshot. To build against the reachable API:

```bash
VITE_BASE_URL=https://naufalk25-portfolio-api.vercel.app/api npm run build
```

`.env.production` points at `https://portfolio-api.naufalkateni.com/api`, which did not resolve
during development. Don't edit the user's `.env*` files; mention it instead.

## Architecture

Look in the folders below for specifics; this is the map, not an inventory.

- **Shell** (`index.html`): an inline head script sets the root classes (`js`, `motion`, `dark`,
  `no-loader`) before first paint. The loader, the transition curtain and `#root` live here.
- **Entries** (`src/main.jsx`, `src/entry-server.jsx`): the client hydrates the prerendered HTML in
  production and renders fresh in dev. The server entry is used only by the prerender.
- **App and routing** (`src/App.jsx`, `src/router.js`): a small `pushState` router. `App` holds the
  project data and picks the page and its meta from the path. Routes are `/`, `/work/<slug>`
  (slug = repo name) and the 404 for everything else.
- **Data** (`src/data/`): `site.js` holds all non-project copy. `projects.js` turns API repos into
  project objects and holds the helpers derived from them. `repos.json` is the build snapshot.
  The UI renders the snapshot first, then swaps in live rows when the API answers. If the request
  fails or returns no rows, the snapshot stays.
- **Motion** (`src/engine/`, `src/motion/`): the engine is generic (scroll, reveals, loader, page
  transitions, page lifecycle). `motion/` holds this site's choreography on top of it.
- **UI** (`src/pages/`, `src/sections/`, `src/components/`): one page per route, the blocks of the
  home page, and shared chrome such as the header and footer.
- **Styles** (`src/styles/`): tokens, engine styles, site styles. Plain CSS.
- **Build and deploy** (`scripts/`, `nginx.conf`, `Dockerfile`): snapshot, prerender, and serving
  the prerendered routes with a real 404.

A project added after the last build has no prerendered page: it lands on `404.html`, which renders
the project once the live API answers.

## Rules that keep it working (learned the hard way)

- **`data-split` only on text React never re-renders.** SplitText rewrites the DOM. Split headings sit in memo or static components.
- **One clock:** everything runs on `gsap.ticker`. No `addEventListener('scroll')` and no custom `requestAnimationFrame` loops; use `onScroll` from the engine.
- **Never set a CSS `transform` on an element GSAP animates.** Use the individual `translate`, `rotate` and `scale` properties in CSS.
- Page-level effects go in `usePage(fn)`, so they are reverted on navigation. Return a cleanup for listeners.
- Lists that refresh from the live API must not use `data-reveal`: new rows would stay hidden. Animate them in `usePage` instead (see WorkIndex).
- Prerendered HTML must match the first client render, so don't touch `window`/`localStorage` during render. The theme is set by the head script and read in an effect.
- Reduced motion: no Lenis, no reveals, everything visible. Check it after any motion change.
- The loader runs once per session, only on `/` and wider than 767 px, capped at 2.6 s from navigation start. A CSS fallback hides it if JS is late.
- Visible copy: no em or en dashes, sentence case, and no banned filler words (see the `/awwwards` content rules).
- Code style: modern JS (`const`/`let`, arrows, optional catch binding, template literals, `===`). No `var`, including in the inline head script.

## QA (how it was verified)

The skill's scripts live in `~/.claude/plugins/cache/juliobsz/awwwards/<hash>/scripts`. Run them
from a folder that has `playwright` and `axe-core` installed. Install them in a scratch dir, not
in this project: Chromium is cached under `~/.cache/ms-playwright`.

```bash
node $SKILL/scripts/serve.mjs dist --port 5173        # must be 5173 (CORS)
node $SKILL/scripts/shoot.mjs http://localhost:5173/ --crawl --nav
node $SKILL/scripts/audit.mjs http://localhost:5173/ > .shots/audit.txt
```

Last state:

- 0 audit FAILs or WARNs across 12 pages, 0 console errors, 0 axe violations, no overflow, no small targets.
- Throttled mobile LCP about 1.0 s, CLS ≤ 0.009, 60 fps.
- `mobile.loaderMs` reports DOMContentLoaded, because phones don't show a loader.
- Two blind critic subagents scored it 7.2, then **7.55** (target is 8).

Gotchas:

- On WSL (`/mnt/d`), the Vite dev server can miss file changes. Restart it, or use `--force`, if edits don't show.
- The Shoot tool's desktop FPS reading on home was occasionally 0 or 1. Manual rAF measurement showed a steady 60 fps, so treat it as flaky.

## Open items

**Settled by the owner (don't raise again):**

- Project thumbnails (Swagger screenshots for the API projects) and the short descriptions stay as they are.
- Redis, MongoDB and Docker in the hero and bio are from his professional work; the schema only shows public repos, so 0 rows is expected.
- simple-video-meet and news-portal have no notes on purpose.

**Design items the critics flagged:**

- Mobile About has a gap above the photo (not re-checked).

**Deploy:**

- Canonical, OG and sitemap use `https://muhammad-naufal-kateni.netlify.app` (`site.url` in `src/data/site.js`).
- The API's CORS list excludes `www.` and Netlify previews.
- Deploying publishes the site: confirm with the user first.

## User preferences

- Don't commit or push unless asked. Don't touch `../portfolio` (the original).
- Run shell commands through `rtk` (see the user's global CLAUDE.md).
- Prefers modern JS and minimal, non-over-engineered code.
