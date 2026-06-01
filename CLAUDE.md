<!-- AI-NATIVE-BACKLOG:START -->
## AI-Native Project Backlog

This project has an active memory workspace. Read it at the start of every session and write to it throughout.

**Before starting work:**
1. Read `.project-memory/tasks/next-task.md` — the specific next task
2. Read `.project-memory/recommendations/current.md` — the recommendation and why
3. Read `.project-memory/tasks/coding-agent-brief.md` — operating mode, thesis, constraints
4. Skim `.project-memory/workspace/` — context and open items from past sessions

**During the session, actively write to `.project-memory/workspace/`:**
- Bugs found → append to `workspace/bugs.md` with a date stamp and what you found
- Ideas that come up → append to `workspace/ideas.md`
- Decisions made, things tried, what worked → append to `workspace/session-notes.md`
- Completed tasks → append to `workspace/progress.md`

Keep entries atomic and specific. Use markdown bullets. Date-stamp each entry.

**Only write to `.portfolio-brain/signals/pending/` for portfolio-level events:**
- A deploy blocker you cannot resolve yourself
- Evidence the project thesis is wrong or the audience has shifted
- A critical bug that changes the project's direction

Signal format for `.portfolio-brain/signals/pending/<name>.jsonl`:
```
{"type": "note", "source": "claude-code", "summary": "...", "details": "..."}
```
Write to `<name>.tmp` first, then rename to `<name>.jsonl` (atomic write rule).

**Do not widen scope** beyond the current recommendation unless fresh evidence justifies it.
<!-- AI-NATIVE-BACKLOG:END -->

---

## Project Overview

Personal portfolio and content site for Tristan Grubbs — deployed via GitHub Pages, showcasing projects, writing, blog posts, and games.

## Tech Stack

- Plain HTML / CSS / JavaScript (no framework, no build step)
- GitHub Pages (hosting)
- Google Fonts (Space Grotesk + Fraunces + JetBrains Mono)

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
- Reduced-motion: the canvas and reveal animations both check `prefers-reduced-motion` — test with that enabled when touching animations. **Critical: `prefersReducedMotion` is read ONCE at page load (script.js:1). On theme toggle, canvas repaints must re-check the media query — do not rely on the cached value.**
- CNAME file is required for custom domain on GitHub Pages — do not delete it
- `_direct/` and `access-9f3c7d-prd.html` appear to be access/redirect artifacts — do not modify without knowing what they do
- Work grid uses `.work-grid .card` override — it intentionally strips all card panel styling. Do not add `.card` defaults back to work items.
- Project cards use `data-index` attribute for faded Fraunces pseudo-element numerals — new project cards need `data-index="04"` etc.
- Canvas `#portalCanvas` renders its own fill via JS — CSS background change has no effect. Theme switching must happen inside the `draw()` function by reading `document.documentElement.dataset.theme`. The theme is set on `<html>` (documentElement), NOT on `document.body` — inline script, toggle handler, and draw() all use documentElement consistently.
- Canvas has 11 color values (stars, edges, nodes, pill labels, tooltips) — all now branch on `isLight` inside `draw()`. DESIGN.md `## Canvas` section has the full spec. Phase 2 COMPLETE.
- Canvas theme flicker: if localStorage theme is applied after first canvas frame, there will be a 1-frame dark flash. Fix: add inline `<script>` in `<head>` that reads localStorage and sets `document.body.dataset.theme` synchronously before first paint.
- `/blog/` and `/writing/` are two distinct sections: blog = short thoughts (linked in header CTA), writing = academic/AI ethics essays. Writing is approved for MBA audience — add to nav.
- ScamShield PM role is NOT in the exploreData description — it only describes the technical build. Leadership signal must be added explicitly.
- `.hero-facts` panel (in index.html ~line 70) has Focus / Toolbelt / Location entries — a "Led" entry can be added here for leadership signal without touching project cards
- `styles.css` has several hardcoded dark values outside the token system that will break in light mode: `body::before` gradient (#0a0d12, #06070a), grain texture dots (#fff), `.small-link:hover` text-decoration-color (rgba(255,255,255,...)), `.site-header` background (rgba(6,7,10,...)), `.nav-link:hover` background (rgba(255,255,255,...)). All must be moved to `[data-theme="dark"]` or updated in `:root`.
- `@import` for Fraunces in `styles.css:4` is render-blocking — move to consolidated `<link>` in `index.html` alongside Space Grotesk and JetBrains Mono. DESIGN.md has the exact `<link>` tag to use.

## Context Management

When compacting, always preserve:
- The current task and its exact status (done / in progress / blocked)
- All files created or modified this session with their paths
- Every decision made and the reason behind it
- What is broken, what is next, and any open questions
- Any new rules that should be added to this CLAUDE.md

## Session Log

**2026-03-31** — Ran /plan-eng-review. Plan CLEARED. 6 workstreams locked. Two values upgraded from outside voice: `--panel` bumped to `0.08` (was 0.055 in design doc — delta too subtle), canvas edge multiplier capped at `0.20` (was 0.30 — max alpha would've been 0.46 on cream, too heavy). **Final implementation plan:** (WS1a) Token contrast in `:root {}`: `--border` 0.08→0.13, `--border-mid` 0.14→0.22, `--border-strong` 0.22→0.32, `--panel` 0.04→**0.08**, `--panel-2` 0.07→0.09; (WS1b) Shadow override in `:root {}`: `--shadow-1: 0 2px 8px rgba(0,0,0,0.10)`, `--shadow-2: 0 8px 24px rgba(0,0,0,0.16)` — current shadows tuned for dark mode (0.40 opacity), will be heavy on cream; (WS2) `.section-alt { background: var(--bg-2) }` + apply to `#writing-featured`, `#work`, `#contact`; (WS3) UPDATE `.button-ghost` border-color→`var(--border-mid)`, ADD `.button-ghost:hover`, UPDATE `.button-primary` in-place (NOT add new rule — one already exists at styles.css:466); (WS4) Canvas: `"0.06 + emphasis * 0.22"` → `"0.16 + emphasis * 0.20"` (max 0.36), `"0.03 + emphasis * 0.08"` → `"0.07 + emphasis * 0.12"`; (WS5) "Writing" → "Essays" label on Explore tab — `data-tab="writing"` unchanged. `TODOS.md` created (Option 5B deferred). **Next: run /plan-design-review.**
**2026-03-31** — Ran /plan-design-review. Plan upgraded to 5/10 → 9/10. **6 design decisions added:** (D1) WS2: add `border-bottom: 1px solid var(--border)` to `.section-alt#writing-featured` — writing+work are adjacent bg-2 sections and need a divider or they merge visually; (D2) WS3: `.button-ghost:hover { background: var(--panel); border-color: var(--border-mid); }` — exact values now specified; (D3) WS3+WS5: `.button-primary` must switch to CSS vars `var(--accent-dim)/var(--accent-border)/var(--accent)` instead of hardcoded dark-mode rgba values — DESIGN.md updated; (D4) WS1b EXPANDED: add `--shadow-3: 0 20px 48px rgba(0,0,0,0.20)`, `--shadow-soft: 0 20px 48px rgba(0,0,0,0.18)`, `--shadow-surface: 0 8px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(0,0,0,0.04)` to `:root {}` — 3 extra shadow tokens were dark-mode-tuned; (D5) WS3 EXPANDED: add `.button:focus-visible, .btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }` — keyboard focus ring missing; (D6) WS4 EXPANDED: star opacity floor — change `Math.random() * 0.28 + 0.06` to `Math.random() * 0.28 + 0.12` so minimum light-mode star opacity goes from 0.03 to 0.06 effective. DESIGN.md decisions log updated with all token changes. **Ready to implement.**
**2026-03-31** — Fixed `#now` section whitespace issue. `.now-block` was `max-width: 72ch` left-aligned inside a full-width container, leaving dead air on the right. Decision: two-column grid layout — `10rem` kicker column + `1fr` body column — chosen over (A) removing the section entirely or (B) a pull-quote treatment. User may still pivot to removing the section. `styles.css` only change: `.now-block` grid + removed `margin-top` from `.now-body`.

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

## Design System

Always read `DESIGN.md` before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.
