# Plan — Landing page Noven Studio

## Context
The brief asks for a single-page, scroll-based landing page for **Noven Studio**, a French
freelance web design studio (founder Nathan GBEDA). Tone: editorial, human, premium, restrained
— sitting between designcoffee.fr (warm/editorial) and bertone.agency (cinematic/restrained).
All copy is in French. The project is a fresh Vite + React 19 + Tailwind v4 scaffold; `src/App.tsx`
is empty, so this is a greenfield build with no existing UI to preserve.

## Aesthetic direction
Before writing code, invoke the `aesthetic-stance` skill and call `create_make_theme` (full-page
brief). Commit to an **editorial / warm-minimal** stance: generous whitespace, large serif
display type, terracotta as the single accent, no startup clichés (no gradient blobs, no stat
blocks, no fake social proof, no stock photos, minimal icons).

## Design tokens (from brief → `src/index.css` `@theme`)
- Ink `#1A1A1A`, off-white bg `#FAFAF8`, terracotta `#C4785A` / hover `#B26A4E`,
  beige card `#F5F2EE`, darker beige `#F0EBE0`, border `#E8E0D5`, muted text `#6B7280`.
- Fonts via Google Fonts CSS2 `@import` (first line of `index.css`):
  Cormorant Garamond (400/500/600) for editorial/display + brand; DM Sans (400/500/600) for
  body/UI. Set `--font-serif` / `--font-sans` theme tokens.

## Structure
Build in `src/App.tsx`, extracting section components into `src/components/` (one file per
section for clarity). Sections, per brief:
1. `Nav` — sticky, transparent→blur-on-scroll, logo left, 3 links right, Contact as small
   terracotta button; hamburger on mobile (4 items).
2. `Hero` — 100vh, 55/45 two-column; eyebrow, massive serif title with italic "profession",
   paragraph, two CTAs. Right column: decorative giant serif "N" in terracotta (editorial, no stock).
3. `Manifesto` — calm, centered max-w-720, italic Cormorant paragraph + signature.
4. `Services` — two cards: Pack Refonte (1 600 €, bullets w/ terracotta dots, CTA) + Options
   (SEO / Maintenance sub-blocks, softer treatment).
5. `Workflow` — 5-step timeline, huge terracotta serif numbers.
6. `Realisations` — 2-col grid, 5 project cards (terracotta-tinted "mockup" placeholder blocks,
   16:10) + 1 dashed empty invitation card. Hover: subtle scale + terracotta overlay + "Voir le projet".
7. `About` — 40/60, terracotta-bordered "Photo" placeholder block + bio, LinkedIn/email icons.
8. `Contact` — darker beige bg, centered, 48px serif title, two options + email.
9. `Footer` — 3 columns (logo+tagline / links / email+copyright).

Shared: a `Logo` component ("Noven" with terracotta "o" + "— STUDIO —" microtype). Reusable
button styles (primary filled / secondary bordered) as small components or utility classes.

## Interaction
- Scroll-triggered fade-in on section entry via a small `IntersectionObserver` hook
  (`src/hooks/useReveal.ts`), 300–500ms ease. Respect `prefers-reduced-motion`.
- Terracotta left→right underline animation on links (200ms) via CSS.
- Button micro-interaction: 200ms scale-down + color shift on hover.
- No parallax/video/particles/custom cursor.

## Responsive
Mobile-first: title stays 60–72px, columns collapse to single, cards stack, full-width CTAs,
body min 16px, hamburger nav.

## Files
- `src/index.css` — font `@import`, `@theme` tokens, link-underline + reveal CSS.
- `src/App.tsx` — page composition (section order, bg).
- `src/components/*.tsx` — sections + `Logo`, buttons.
- `src/hooks/useReveal.ts` — reveal-on-scroll.
- Icons: install `lucide-react` for the two footer/about social icons only.

## Verification
Vite dev server is already running; confirm the page renders with no console errors and check
the layout at 1440px and 375px in the preview. No tests exist in this scaffold.
