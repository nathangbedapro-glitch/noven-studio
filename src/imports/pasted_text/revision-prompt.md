═══════════════════════════════════════════════
REVISION PROMPT — NOVEN STUDIO: REAL PORTFOLIO DATA 
+ CLICKABLE PROJECT DETAIL PAGES
═══════════════════════════════════════════════

CONTEXT: This is a revision of the existing Noven Studio landing page 
(already built). Keep all existing sections, design tokens (colors, 
Cormorant Garamond / DM Sans typography, spacing), and components 
exactly as they are. Do NOT redesign the homepage. This prompt covers 
two changes only: (1) correcting the Réalisations section data, and 
(2) making each project card open a dedicated project detail page.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHANGE 1 — RÉALISATIONS SECTION DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace the current 5 projects with these 5 EXACT entries (real data, 
do not invent or embellish). Keep the same card layout, hover state, 
and the "Votre projet ici" 6th card exactly as they are.

1. Cabinet Mahbouli
   - Type: Cabinet d'avocats parisien
   - Year: 2026
   - Description: "Refonte complète : 9 domaines d'expertise, 
     calculateurs juridiques, architecture technique moderne."

2. Alvo
   - Type: Marketplace B2B — Cession d'entreprises
   - Year: 2024–2025
   - Description: "Refonte des fiches annonces et de la recherche. 
     +18 % d'interactions post-lancement."

3. Michel Ferrand
   - Type: Marque de luxe (via Glucoz)
   - Year: 2023
   - Description: "Conception d'interfaces pour une marque établie du 
     secteur du luxe, en collaboration avec l'agence."

4. Carrefour
   - Type: Grande distribution — Partenaire JO Paris 2024
   - Year: 2023
   - Description: "'Le Grand Tournoi' : plateforme mobile-first pour 
     fédérer 100 000 collaborateurs autour des Jeux Olympiques."

5. PetCare Connect
   - Type: Plateforme française de pet sitting
   - Year: 2025
   - Description: "Concept complet : dashboard pro pour sitters, 
     messagerie organisée, transparence tarifaire."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHANGE 2 — CLICKABLE PROJECT CARDS → DETAIL PAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Each of the 5 real project cards (not the "Votre projet ici" card) 
must become a working link that opens a dedicated project detail 
view/page, in the SAME editorial art direction as the rest of the 
site (Cormorant Garamond for titles/quotes, DM Sans for body, 
terracotta #C4785A accents, warm off-white #FAFAF8 background, 
generous whitespace, restraint — no dashboards, no icon clutter).

ROUTING: Use simple client-side routing based on the URL hash 
(e.g. #/projects/mahbouli, #/projects/alvo) rather than adding a 
routing library — this keeps the existing single-page setup intact. 
The homepage stays the default view; clicking a project card updates 
the view without a full page reload. Support browser back button.

PROJECT DETAIL PAGE STRUCTURE (reusable template, populated per 
project with the content below):

SECTION A — Header
- Small link at top: "← Retour aux réalisations" (terracotta, 
  underline-on-hover, links back to homepage #realisations)
- Eyebrow: project type (e.g. "Cabinet d'avocats parisien")
- Title in Cormorant Garamond (large, 56-72px): project name
- Meta row below title, DM Sans small uppercase, muted gray, 
  separated by thin vertical dividers: "Année — Rôle — Industrie"

SECTION B — Visual
- One large placeholder block (16:9 or 4:3), beige background, 
  terracotta-tinted, with a short italic serif label describing 
  the mockup (same style as the homepage project cards). 
  NO stock photography, NO fake screenshots.

SECTION C — Le défi
- Small eyebrow "LE DÉFI"
- One editorial paragraph (Cormorant italic, 20-24px, like the 
  homepage manifesto section)

SECTION D — La solution
- Small eyebrow "LA SOLUTION"
- Body paragraph (DM Sans, 16px) + optional 2-4 bullet highlights 
  with terracotta dot markers (same bullet style as the Pack Refonte 
  card)

SECTION E — L'impact
- Small eyebrow "L'IMPACT"
- Body paragraph or 2-3 short stat callouts (large Cormorant number 
  in terracotta + small DM Sans label underneath, same visual 
  language as the "01 02 03" workflow numbers)

SECTION F — CTA
- Reuse the exact same Contact section component as the homepage 
  (title "Parlons de votre projet.", same two buttons), so every 
  project page ends with a conversion point

CONTENT PER PROJECT (use exactly, do not paraphrase or invent 
additional claims):

── Cabinet Mahbouli ──
Année: 2026 · Rôle: Conception & développement (Noven Studio) · 
Industrie: Cabinet d'avocats
Défi: "Un site vieillissant — dernier article de blog datant de 
2023 — qui ne reflétait plus la qualité de leur pratique ni leur 
réputation."
Solution: "Refonte complète : page d'accueil, 9 pages d'expertise 
détaillées, 3 calculateurs juridiques interactifs, architecture 
technique moderne et conforme RGPD."
Impact: "Un site en ligne, conforme RGPD, prêt pour le référencement 
local — repositionnant le cabinet à la hauteur de sa réputation."

── Alvo ──
Année: 2024–2025 · Rôle: Product Designer · Industrie: Marketplace 
B2B, transmission d'entreprise
Défi: "Une interface de gestion de contacts complexe et peu lisible, 
freinant le quotidien des équipes internes et des repreneurs."
Solution: "Refonte complète du parcours à partir d'un user flow 
détaillé : filtres dynamiques, distinction claire entre personnes 
morales et physiques, overlays contextuels pour éviter les ruptures 
de parcours."
Impact: "+18 % d'interactions sur les annonces en 3 mois. Adoption 
du design system par l'équipe dès le premier sprint."

── Michel Ferrand ──
Année: 2023 (via l'agence Glucoz) · Rôle: UX/UI Designer · 
Industrie: Luxe & ameublement
Défi: "Moderniser l'image d'un fabricant de mobilier haut de gamme 
sans dénaturer son héritage artisanal — avec le défi propre à la 
vente de mobilier en ligne : produits volumineux, paniers élevés, 
confiance à recréer."
Solution: "Création d'un univers digital immersif et mobile-first 
(plus de 50 % des visites), avec des visuels d'intégration pensés 
pour favoriser la projection des visiteurs."
Impact: "+60 % de visibilité organique, preuve de la pertinence des 
choix UX et structurels."

── Carrefour ──
Année: 2023 (avec l'agence Quarterback) · Rôle: UX/UI Designer · 
Industrie: Grande distribution, partenaire JO Paris 2024
Défi: "Fédérer 100 000 collaborateurs aux profils et à la maturité 
digitale très variés autour des valeurs du sport et du collectif."
Solution: "'Le Grand Tournoi' : une plateforme mobile-first pour 
s'inscrire, constituer ses équipes, suivre les résultats et 
l'actualité, avec des modules interactifs (quizz, encouragements, 
actualités)."
Impact: "Forte participation dès les premières semaines et un 
renforcement de la cohésion interne du groupe."

── PetCare Connect ──
Année: 2025 · Rôle: Product Designer (projet personnel) · 
Industrie: PetTech
Défi: "Le marché français du pet sitting est construit autour des 
propriétaires — les sitters professionnels, pourtant moteurs de 
l'offre, restent un public secondaire chez tous les acteurs 
existants."
Solution: "Un dashboard sitter professionnel, une messagerie 
organisée par personne (et non par réservation), une transparence 
tarifaire totale dès la page d'accueil."
Impact: "3 piliers de différenciation identifiés qu'aucun acteur du 
marché ne combine à ce jour."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Do not modify the Hero, Services (pricing), Workflow, or About 
  sections on the homepage.
- Do not add stock photography anywhere — keep the terracotta-tinted 
  placeholder block convention used on the homepage.
- Keep the same restraint principle: no icons beyond what already 
  exists, no motion beyond the existing reveal-on-scroll and hover 
  states.
- Ensure the project detail pages are fully responsive (they will be 
  viewed on mobile as often as desktop).
- Respect prefers-reduced-motion, as already implemented.