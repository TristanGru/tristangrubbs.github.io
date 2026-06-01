# TODOS

## Writing IA — Option 5B: Remove #writing-featured from homepage

**What:** Remove the `#writing-featured` section from `index.html`.

**Why:** The homepage currently has two "writing" surfaces: a `#writing-featured` section (above the fold) and an "Essays" tab in the Explore module. Even after the 5A tab rename, the structural duplication remains. If users and reviewers keep noticing two writing zones, Option 5B resolves it completely.

**Pros:** Eliminates IA duplication entirely. Simplifies the homepage scroll. Reduces HTML and CSS surface area.

**Cons:** Loses above-the-fold writing signal for MBA/professional audience (the main reason it was added). Requires CSS cleanup for `.section-alt` on `#writing-featured`.

**Context:** Option 5A (rename Explore "Writing" tab to "Essays") shipped in the 2026-03-31 contrast/surface pass. That addresses label confusion but not structural duplication. Revisit after living with 5A for a week — if the two zones still feel redundant, do 5B.

**Depends on / blocked by:** 5A must ship first.

---

## A11y Debt — Card Border Contrast (WCAG 1.4.11)

**What:** Card borders at `rgba(0,0,0,0.13)` on `--bg-2` (#f2ede7) land at ~1.25:1 contrast — below WCAG 1.4.11's 3:1 threshold for UI component boundaries.

**Why:** If project cards or writing cards are ever made interactive (focusable, clickable as a unit), they'll need to meet 3:1. Currently they're decorative containers, so the threshold doesn't technically apply.

**Pros:** Full WCAG 2.1 AA compliance, future-proofed for interactive cards.

**Cons:** `--border-strong` (0.32) would be needed for card borders specifically — creates two different border values in the system.

**Context:** Identified during /plan-design-review on 2026-03-31 contrast pass. Low priority while cards are non-interactive. Revisit if cards gain click/focus behavior.

**Depends on / blocked by:** WS1a token contrast bump must ship first (currently cards use `--border` which will be 0.13 post-ship).

---

## QA-001 (High) — Theme not persisted on /writing and /blog

**What:** Add the inline theme-fix script to `writing/index.html` and `blog/index.html`.

**Why:** Both pages are missing the inline `<script>` in `<head>` that reads `localStorage` and applies `data-theme` before first paint. Only `index.html` has it. Users in dark mode see a flash/reset to light when navigating to these pages.

**Fix:** Copy the inline `<script>` block from the `<head>` of `index.html` into the `<head>` of both `writing/index.html` and `blog/index.html`.

**Severity:** High — affects all dark-mode users who click Writing or Blog nav.

---

## QA-002 (Medium) — No theme toggle on mobile

**What:** Add a theme toggle button to the mobile nav drawer.

**Why:** `.header-cta` (which contains the theme toggle) is `display: none` on mobile via `styles.css:1702`. The mobile nav drawer (`#mobileNav`) has no theme toggle. Mobile users cannot change the theme at all.

**Fix:** Add `<button class="button button-ghost theme-toggle" id="themeToggleMobile" type="button" aria-label="Toggle theme">☀</button>` (or similar) inside `.mobile-nav-inner` in `index.html`, and wire it to the same toggle handler in `script.js`.

**Severity:** Medium — mobile-only, but blocks a core feature for all phone users.
