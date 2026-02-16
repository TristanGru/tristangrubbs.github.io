# Changes

## What I changed
- Refactored `index.html` into a recruiter-first, single-page structure with this order:
  1. Hero (asymmetric layout with left copy and right Kinetic Grid Portal)
  2. Proof strip
  3. Featured Projects
  4. Explore module (Projects / Writing / Games tabs)
  5. Work / Experience
  6. About / Now
  7. Contact
- Added a cohesive top navigation with anchors: `Work`, `Projects`, `Explore`, `About`, `Contact`.
- Added clear CTAs in nav and hero (`Resume`, `Contact`, `View Projects`).
- Implemented unified Explore cards with tab switching and a right-side details drawer.
- Preserved key existing content and links (resume, writing/blog pages, games page, PDFs, LinkedIn, email).
- Added a subtle Kinetic Grid Portal canvas in the hero with:
  - localized mouse interaction
  - zone highlight from nav links and Explore tabs
  - subtle scroll drift
  - reduced-motion fallback
- Reworked `styles.css` into a tokenized monochrome design system with organized sections for:
  - tokens
  - base
  - layout
  - components
  - sections
  - drawer/modal
  - responsive + reduced motion
- Removed colorful gradient style direction and emoji-like icon usage from the homepage.
- Kept compatibility styling for existing `writing.html`, `blog.html`, and `games.html` class patterns.
- Updated `script.js` to support new homepage interactions while keeping shared behavior for:
  - mobile nav
  - reveal animations
  - resume modal
  - quote loading
  - blog expand/collapse
  - games code playground

## Dependencies added
- None.
- Implementation stays in plain HTML/CSS/JS.

## How to run locally
1. Open the repo folder.
2. Start a static server (example):
   - `python -m http.server 8000`
3. Visit `http://localhost:8000`.

## Where to edit content
- Homepage section copy and structure: `index.html`
- Explore module cards/data: `script.js` (`exploreData` object)
- Visual system/tokens/layout/components: `styles.css`
- Writing page content: `writing.html`
- Blog entries: `blog.html`
- Games page entries and playground section: `games.html`
