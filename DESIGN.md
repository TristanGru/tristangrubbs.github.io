# Design System — tristangrubbs.com

## Product Context

- **What this is:** Personal portfolio for Tristan Grubbs — UVA CS (May 2026), government tech background (NIWC), targeting MBA (MBB consulting) and AI/digital strategy
- **Who it's for:** MBA adcoms, alumni networks, anyone evaluating the arc UVA CS → Government tech → MBA → AI/Digital Strategy
- **Project type:** Personal portfolio / marketing site
- **Aesthetic positioning:** Literary-technical mind with a point of view — not a resume, not a blog

## Aesthetic Direction

- **Direction:** Literary-Technical Editorial
- **Decoration level:** Intentional — grain texture overlay, ambient amber radial gradient, no decorative blobs
- **Mood:** A literary-technical person with a point of view. The site should feel like it was made by someone who reads and builds, not someone who generated it.
- **Primary mode:** Light (warm cream, not clinical white)
- **Secondary mode:** Dark (existing system preserved, accessible via toggle)

## Typography

**The rule:** Fraunces = WHO Tristan is (intellectual claims, thesis statements). Space Grotesk = WHAT he did (navigation, body, data, UI). JetBrains Mono = metadata, tags, dates.

| Role | Font | Weight | Style | Notes |
|------|------|--------|-------|-------|
| Hero name | Fraunces | 400 | Normal | Display size, `-0.02em` tracking |
| Thesis / voice | Fraunces | 300 | **Italic** | Amber color — max 2 uses per page |
| Section h2 | Fraunces | 300 | Normal | `-0.01em` tracking |
| Body / prose | Space Grotesk | 400 | Normal | `1.75` line-height, muted color |
| Nav / labels / buttons | Space Grotesk | 600 | Normal | Uppercase, `0.04–0.06em` tracking |
| Kicker / tags / dates | JetBrains Mono | 400 | Normal | Uppercase, `0.08–0.1em` tracking |
| Code | JetBrains Mono | 400 | Normal | — |

**Type scale:**
```
--fs-display:  clamp(3rem, 5.5vw, 5.2rem)
--fs-h2:       clamp(1.5rem, 2.4vw, 2.2rem)
--fs-h3:       1.1rem
--fs-body:     1rem
--fs-label:    0.78rem
--fs-small:    0.82rem
```

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Color

### Light Mode (primary)

```css
--bg:             #faf8f5;   /* warm paper — NOT pure white */
--bg-2:           #f2ede7;   /* warm card surface */
--panel:          rgba(0, 0, 0, 0.08);   /* bumped from 0.04 — 2026-03-31 contrast pass */
--panel-2:        rgba(0, 0, 0, 0.09);   /* bumped from 0.07 */

--text:           #1c1917;   /* warm near-black */
--muted:          #6b6560;   /* warm medium gray */
--subtle:         #a89f98;   /* warm light gray */

--border:         rgba(0, 0, 0, 0.13);   /* bumped from 0.08 — 2026-03-31 contrast pass */
--border-mid:     rgba(0, 0, 0, 0.22);   /* bumped from 0.14 */
--border-strong:  rgba(0, 0, 0, 0.32);   /* bumped from 0.22 */

--accent:         #b5783a;   /* amber — restrained fire */
--accent-bright:  #c8924a;   /* amber hover / highlight */
--accent-dim:     rgba(181, 120, 58, 0.10);
--accent-border:  rgba(181, 120, 58, 0.28);
```

### Dark Mode (secondary — existing system)

```css
--bg:             #06070a;
--bg-2:           #0d0f14;
--panel:          rgba(255, 255, 255, 0.04);
--panel-2:        rgba(255, 255, 255, 0.07);

--text:           #f4f6fa;
--muted:          #9aa3b0;
--subtle:         #555f6e;

--border:         rgba(255, 255, 255, 0.10);
--border-mid:     rgba(255, 255, 255, 0.18);
--border-strong:  rgba(255, 255, 255, 0.24);

--accent:         #c8924a;
--accent-bright:  #e8a862;
--accent-dim:     rgba(200, 146, 74, 0.10);
--accent-border:  rgba(200, 146, 74, 0.28);
```

### Amber usage rule

Amber appears in **1–2 moments per page section**, never as a background fill or decorative element:
- Fraunces italic thesis line (hero)
- Work org / company names
- Card eyebrow text
- Section leads (Fraunces italic) — sparingly

### Ambient effects

```css
/* Light mode — subtle amber warmth top-left */
radial-gradient(800px 500px at 10% 5%, rgba(181,120,58,0.04), transparent 70%)

/* Dark mode — existing amber warmth */
radial-gradient(700px 440px at 10% 4%, rgba(200,146,74,0.045), transparent 72%)

/* Grain texture (both modes) */
/* SVG fractalNoise, opacity: 0.022, 200×200px tile */
```

## Spacing

Base unit: **8px**

```css
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
--space-4: 16px;  --space-5: 24px;  --space-6: 32px;
--space-7: 48px;  --space-8: 64px;  --space-9: 96px;
```

Density: comfortable. Hero: `space-9` top padding. Sections: `space-8`.

## Layout

- **Approach:** Minimal-editorial hybrid
- **Max content width:** `1200px`
- **Gutter:** `28px`
- **Hero grid:** `1fr 340px` (copy column + facts panel)
- **Border radius:** `--radius-sm: 6px` (buttons, tags) / `--radius: 10px` (cards) / `--radius-lg: 20px` (large panels)

## Motion

- **Approach:** Intentional — only transitions that aid comprehension
- **Easing:** `cubic-bezier(0.2, 0.72, 0.16, 1)` — custom, keep
- **Reduced-motion:** canvas and reveal animations both check `prefers-reduced-motion`

## Typography Voice Rules

1. Any claim about WHO Tristan is → Fraunces, often italic
2. Any list of WHAT he did → Space Grotesk
3. Amber Fraunces italic: hero thesis line + Now section lead only — **max 2 per page**
4. Section `<h2>` → Fraunces 300 non-italic, dark color
5. Kicker / dates / metadata → JetBrains Mono uppercase tracked
6. All nav, labels, buttons → Space Grotesk 500–600

## Canvas (Kinetic Grid Portal)

All canvas colors are set via `ctx.fillStyle` / `ctx.strokeStyle` in `script.js`. They must change with theme — CSS tokens have no effect on the canvas.

| # | Element | Dark mode | Light mode | Notes |
|---|---------|-----------|------------|-------|
| 1 | Background fill | `#0f1319` | `#faf8f5` | Matches site cream exactly |
| 2 | Stars fill | `rgba(234, 242, 255, a)` | `rgba(181, 120, 58, a × 0.5)` | Dark: stars in space. Light: amber dust — ties canvas to accent system |
| 3 | Edges stroke | `rgba(236, 244, 255, 0.08 + e×0.33)` | `rgba(28, 25, 23, 0.06 + e×0.22)` | Same alpha curve, inverted, pulled back |
| 4 | Node halo fill | `rgba(236, 244, 255, 0.04 + e×0.13 + h×0.08)` | `rgba(28, 25, 23, 0.03 + e×0.08 + h×0.04)` | Same logic, halved — cream needs less halo |
| 5 | Node core fill | `rgba(244, 248, 255, 0.42 + e×0.45)` | `rgba(28, 25, 23, 0.28 + e×0.48)` | Warm near-black dot |
| 6 | Pill background | `rgba(12, 16, 24, 0.58 + e×0.22)` | `rgba(28, 25, 23, 0.68 + e×0.20)` | Stays dark in light mode — ink stamp on paper |
| 7 | Pill border stroke | `rgba(236, 244, 255, 0.12 + e×0.28)` | `rgba(181, 120, 58, 0.18 + e×0.42)` | Amber border intensifies with focus — only accent touch in canvas |
| 8 | Pill text fill | `rgba(236, 244, 255, 0.66 + e×0.28)` | `rgba(250, 248, 245, 0.85 + e×0.12)` | Cream text on dark pill |
| 9 | Tooltip background | `rgba(12, 16, 24, 0.86)` | `rgba(28, 25, 23, 0.88)` | Stays dark — tooltips are always dark for contrast |
| 10 | Tooltip border stroke | `rgba(236, 244, 255, 0.28)` | `rgba(250, 248, 245, 0.14)` | Faint cream edge on dark tooltip |
| 11 | Tooltip text fill | `rgba(244, 248, 255, 0.95)` | unchanged | Light text on dark tooltip stays correct |

`e` = emphasis (0–1), `a` = star opacity (0–1), `h` = hover boolean (0 or 1)

**Key decisions:**
- Pill labels stay dark in light mode ("ink stamp on paper" — cream pills on cream canvas have no presence)
- Amber used only twice: star particles + pill borders. Coherent with site's 1–2 amber moments rule
- Tooltips always stay dark regardless of theme (universal contrast pattern)

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-30 | Light mode as primary | MBA/consulting audience convention; dark mode preserved as secondary |
| 2026-03-30 | Keep Fraunces + Space Grotesk pairing | Already differentiated; coherent with literary-technical identity |
| 2026-03-30 | Replace Consolas with JetBrains Mono | Better screen rendering, open source, designed for reading |
| 2026-03-30 | Amber restricted to 1–2 moments | More restrained than existing; avoids over-decoration |
| 2026-03-30 | Fraunces italic for thesis claims | Typographic signal: intellectual voice vs. CV record |
| 2026-03-30 | Warm cream `#faf8f5` not pure white | Maintains warmth from existing dark system; avoids clinical corporate read |
| 2026-03-31 | Border/panel contrast bump | Friend feedback: light mode lacked tonal definition. --border 0.08→0.13, --border-mid 0.14→0.22, --border-strong 0.22→0.32, --panel 0.04→0.08, --panel-2 0.07→0.09 |
| 2026-03-31 | button-primary uses CSS vars | Switch from hardcoded rgba(200,146,74,...) to var(--accent-dim)/var(--accent-border)/var(--accent) so light/dark modes respond correctly |
| 2026-03-31 | section-alt pattern | #writing-featured + #work both get --bg-2; 1px border-bottom on #writing-featured divides the zone |
