# DESIGN.md: naufalkateni.com

## Brief

- **Subject:** Muhammad Naufal Kateni, fullstack developer who leans backend (Node.js, Express,
  NestJS, TypeScript, PostgreSQL, Redis, Docker). Author of `orm2erd`, an npm CLI that turns ORM
  models into ERDs.
- **Audience:** recruiters and engineering leads hiring backend or fullstack developers.
- **Job:** get hired. Show real projects fast, prove backend and data-modelling depth, make contact
  one click away.
- **Assets:** portrait (`public/img`), 11 projects from his own API
  (`portfolio-api` → `/api/repo`) with Cloudinary thumbnails, repo READMEs on GitHub.
- **Constraints:** keep the stack (React 19 + Vite, JS, no router library, no Next). Data keeps
  coming from the API.

## Concepts

| | Idea | Anchor | Signature | O/F/Fe/P |
|---|---|---|---|---|
| **A. Material** | The portfolio is drawn as an entity-relationship diagram: the developer is an entity, projects are rows, and stacks join to projects with crow's-foot lines | he wrote `orm2erd` (models → ERD) and does database design | a live join diagram built from the API rows; picking a stack lights every relation | 4 / 5 / 4 / 2 |
| B. Process | The page shows its own data lineage: dashboard → API → this page, every row stamped with where it came from | `portfolio-dashboard` and `portfolio-api` feed this exact site | a request trace in the loader that resolves into the page | 3 / 4 / 4 / 2 |
| C. Formal | Everything is the result set of one SQL query | backend dev | rows insert as you scroll | 2 / 3 / 5 / 4 |

Pick **A**: the most specific anchor, and it generates layout (entities, tables, a join), motion
(rows insert, lines draw), type (schema notation in mono) and copy (keys, rows, relations).
Stolen from B for the loader (the real request to his API, with the real latency) and the footer
colophon (where the rows come from). The 404 is a foreign key that references no row.

## Concept card

```
Idea:        Naufal's work drawn as the schema he'd design: a developer entity, project rows, stacks joined by crow's-foot lines.
Metaphor:    an ERD / database schema (entities, keys, cardinality, join tables)
Signature:   the join diagram: stacks ↔ projects wired from live API data; pick one side and its relations light up while data dashes run along them
Emotion:     precise, calm, engineered; "this person models things properly"
Motion verb: insert like a row: things slide in from a clipped line, lines draw from one key to another
Screenshot:  the join diagram with "NestJS" selected, three relations lit in green, the result line reading "3 rows"
```

Dial: ENERGY 3 / RHYTHM 3 / MOTION 3

- ENERGY 3: a poster hero with the name at mega size, an award-site portfolio, not a quiet résumé.
- RHYTHM 3: every section has its own composition (poster, table, diagram, asymmetric pair, finale).
- MOTION 3: loader, SQL curtain transitions, split-text reveals, parallax, and the idle data flow.

## Art direction

**Palette** (light is the default, the dark theme stays because the owner already had a toggle):

| Role | Light | Dark | Source |
|---|---|---|---|
| ground | `#E7E9E6` | `#101311` | drafting paper; the grey of his portrait backdrop |
| ink | `#111412` | `#E4E8E3` | pen |
| muted | `#525955` | `#9BA49E` | secondary text, AA on ground |
| line | ink at 16% | ink at 18% | entity borders, rules |
| accent | `#0E6E46` | `#62C793` | relation green, carried over from his previous site; used only for keys, relations and selection |
| curtain | ink | ink | |

The concept demands lines (it's a diagram), so hairlines are on purpose, not broadsheet chrome.
Green on near-black is an AI tell: it stays because it's his existing identity, and only in the
dark theme, at a softened value.

**Type:** Archivo variable (width 62–125, weight 100–900) does everything: display at width 112–125,
weight 800, tracking −0.045em; text at width 100, weight 400. Martian Mono 400 is used only for
schema notation (column types, PK/FK, cardinality, the query result), never for generic labels.
Exception, kept by the owner because it looks better: the small key labels of key/value lists
(contact channels, skill groups), the © line and "next record" stay in mono.

**Grid:** 12 columns, gutter = outer margin. Hang lines: col 1, col 5, col 9.
Section rhythm: hero full viewport → index tight → diagram airy → about normal → footer full.

**Shape:** radius 0 everywhere (entity boxes are drawn with 1px rules).

**Motion language:** `expo.out` for entrances (1.0–1.2 s), `expo.inOut` for the curtain (0.8 s), `power3.out` for hovers (0.35 s).
Rows enter by sliding out of a clipped line; lines draw left to right; hover fills flood from the
left like a selected row.

**Treatments per role:**
- nav: underline draws (a relation line)
- primary CTA (Email me, CV): fill floods from the left, label inverts, arrow travels
- project rows: selection fill floods from the left, title indents, preview follows the pointer (inline thumbnail on touch)
- diagram nodes: their relations light up
- utility links: color + underline

**Idle:** data dashes run slowly along the relation lines (hero 1──< line and the join diagram),
on the GSAP ticker, paused off screen, still under reduced motion.

## Composition

```
HERO (poster)
[Naufal Kateni]                          Work  Schema  About  Contact   [CV] [◐]
MUHAMMAD
NAUFAL                                        ┌ developer ─────────────┐
KATENI                                        │ PK handle   naufalk25   │
statement (col 1–6)                           │ role / stack / since    │
                                              └───────────┬────────────┘
11 rows from portfolio-api, 312 ms                         │ builds 1──<

WORK (index list = the project table)
project ············································ 11 rows
name            | description                     | stack           | year
orm2erd         | Generate ERD diagrams ...       | TypeScript, ... | 2026
...

SCHEMA (signature, full width)
project }o──o{ stack
[stacks col 1–3]   ~~~~ svg relations col 4–8 ~~~~   [projects col 9–12]
result: SELECT ... → 3 rows

ABOUT (asymmetric pair)
[portrait col 1–5]        bio statement col 6–12 + "works with" table

FOOTER (finale)
EMAIL ME (mega)
channel | handle rows ...                colophon (where the rows come from)
```

Case page (`/work/<slug>`): breadcrumb `project / slug` → title fitted to width → description →
record table (created, stack, homepage, repository, license) → screenshot in a frame → notes
(from the repo README, facts only) → "shares a stack with" → next record.

404: `ERROR: foreign key violation`, `Key (path)=(/x) is not present in table "page"`, way back.

## Genericness test

- "Dark terminal dev portfolio" was the generic landing spot. Changed it to a light drafting-paper
  ground, and mono only for notation.
- "Skills as icon cards" (the old site) is what a generic model would do. Changed it to a join diagram whose lines are real data.
- The typing-effect hero is gone. The hero is an entity with real attributes.

## Decisions

- No WebGL: the concept is lines and type; SVG + DOM is cheaper and sharper.
- Prerendered at build (Vite SSR + `scripts/prerender.mjs`) so every route ships real HTML, its own
  title, description and canonical. Project data is snapshotted at build (`src/data/repos.json`)
  and refreshed live from the API on load.
- A project added in the dashboard after the last build has no prerendered page. The host serves
  `404.html` (the app shell), which renders the project as soon as the live API answers. Rebuild to
  give it a real page.

## Idle decision

The home page moves at rest (data dashes on the hero relation and the join diagram). Case pages
and the 404 stay still at rest on purpose: they are records to read, and their hovers (rows,
links, next record) carry the motion.
- Phones (< 768 px) skip the loader. On a throttled phone the script lands after ~2.5 s, so a loader
  would outlast its 2.6 s budget. The hero still prints the live API timing.
