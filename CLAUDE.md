## Project Overview

Personal portfolio and content site for Tristan Grubbs — deployed via GitHub Pages, showcasing projects, writing, blog posts, and games.

## Tech Stack

- Plain HTML / CSS / JavaScript (no framework, no build step)
- GitHub Pages (hosting)
- Google Fonts (Space Grotesk)

## Commands

- `python -m http.server 8000` — start local dev server, visit localhost:8000
- No build step. Edit files and refresh.

## Architecture

- `index.html` — single-page portfolio (hero, projects, explore, work, contact)
- `styles.css` — tokenized monochrome design system (tokens → base → layout → components → sections → responsive)
- `script.js` — all interactions: mobile nav, reveal animations, Kinetic Grid Portal canvas, explore tabs/drawer, quote loading, resume modal
- `blog/index.html` — blog listing page
- `writing/index.html` — writing listing page
- `games/index.html` — games listing page
- `games/the-ashen-road/index.html` — standalone game page
- `github-pages-cloudflare-guide/` — standalone guide page
- `quotes.json` — quote data loaded by script.js
- Explore module card data lives in `script.js` under the `exploreData` object

## Coding Rules

- No frameworks, no npm, no build tools — keep it zero-dependency
- All CSS changes go in `styles.css`, never inline styles in HTML
- New sections follow the existing token system (CSS custom properties) — no hardcoded colors or spacing
- New pages must be a folder with an `index.html` (e.g. `games/new-game/index.html`), not a flat `.html` file at root
- Deleted top-level `.html` files have been replaced by folder-based routes — do not re-add flat HTML files at root

## Known Gotchas

- The Kinetic Grid Portal canvas in the hero is interaction-zone-aware — nav links and Explore tabs trigger highlight zones via `data-zone` attributes. Adding new nav links requires adding a matching zone.
- `exploreData` in `script.js` drives all Explore tab cards AND the details drawer — content changes go there, not in the HTML
- Reduced-motion: the canvas and reveal animations both check `prefers-reduced-motion` — test with that enabled when touching animations
- CNAME file is required for custom domain on GitHub Pages — do not delete it
- `_direct/` and `access-9f3c7d-prd.html` appear to be access/redirect artifacts — do not modify without knowing what they do
- Work grid uses `.work-grid .card` override — it intentionally strips all card panel styling. Do not add `.card` defaults back to work items.
- Project cards use `data-index` attribute for faded Fraunces pseudo-element numerals — new project cards need `data-index="04"` etc.
- Canvas `#portalCanvas` has `background: transparent` in CSS but renders its own `#0f1319` fill via JS — CSS background change has no effect

## Context Management

When compacting, always preserve:
- The current task and its exact status (done / in progress / blocked)
- All files created or modified this session with their paths
- Every decision made and the reason behind it
- What is broken, what is next, and any open questions
- Any new rules that should be added to this CLAUDE.md

## Session Log

**2026-03-26** — Created CLAUDE.md. Project is a static personal portfolio on GitHub Pages. Folder-based routing adopted (blog/, writing/, games/, etc.). No build tooling.
**2026-03-27** — Design system overhaul. Removed AI signatures: pills→square tags (4px+monospace), button glass removed, primary button flattened, canvas freed from panel box. Work section: 3-col cards→1-col editorial list (160px|1fr grid). Project cards: faded Fraunces index numerals via data-index. Contact h2: Fraunces 300. Hero: bigger name, editorial tight/loose spacing rhythm. Explore cards: equal height via stretch. Radius tightened (14→10, 8→6). Section numerals (01/02/03) added then removed per user preference.

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
