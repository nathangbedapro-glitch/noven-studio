# Audit technique — Noven Studio

Auditeur : Claude (Opus 5) · Date : 2 septembre 2026
Périmètre : accessibilité WCAG 2.1 AA, lisibilité typographique, conformité FR/RGPD, métadonnées.

**Révision 3** — correction en 7 lots, `pnpm build` confirmé exit 0 après chacun,
puis vérification runtime finale (axe-core + Playwright sur les 7 routes).

## État global

| Statut | Nombre | Détail |
|---|---|---|
| ✅ Corrigé | 28 | dont 3 régressions détectées sur la preview (#30, #31, #32) |
| ⚠️ Constat erroné | 1 | #19 — l'interlignage n'a jamais été à 1,2 |
| ⏸ En attente | 3 | #1 SIRET, #25 og:image, #26 poids des images |
| **Total** | **32** | |

### Mesures avant / après

| Indicateur | Avant | Après |
|---|---|---|
| Paires texte/fond en échec AA (`contrast.ps1`, 40 paires) | **17** | **0** |
| Violations axe-core WCAG A/AA (7 routes) | **61** | **0** |
| Bordures porteuses de sens sous 3:1 | 2 | **0** |
| Anneau de focus terracotta conforme | 11/24 | **24/24** |
| Cibles tactiles sous 44×44 | 12 | **0** |
| Domaines tiers contactés au chargement | 1 (Google) | **0** |
| `<main>` présent | 1 route / 7 | **7 / 7** |
| Titres distincts par vue | 1 pour 7 | **7 / 7** |
| Warnings console | 0 | 0 |
| Débordement au zoom 200 % | 0 | 0 |

---

## 1. Constats corrigés

### Légal

| # | Constat | Correction | Fichier |
|---|---|---|---|
| 2 | ✅ Droit de rétractation absent | Clause ajoutée, formulée en exclusion explicite (art. L221-3 C. conso.) avec le cas de l'assimilation au consommateur et le sort des prestations déjà exécutées | `Legal.tsx:189` |
| 3 | ✅ Indemnité de recouvrement de 40 € absente | Ajoutée à la clause Paiement, à la suite des pénalités de retard, avec la possibilité d'indemnisation complémentaire sur justificatifs (art. L441-10 C. com.) | `Legal.tsx:179` |

### Contraste

Tous corrigés par **trois décisions de tokens**, propagées à l'ensemble du site.

| # | Constat | Avant | Après | Fichier |
|---|---|---|---|---|
| 5 | ✅ Texte sur bouton | 3,25:1 | **4,75:1** | `index.css:10` |
| 6 | ✅ CTA de navigation | 3,25:1 | **4,75:1** | idem |
| 7 | ✅ Terracotta en texte (6 emplacements) | 3,25:1 | **4,75:1** | idem |
| 8 | ✅ `--muted` sur `--beige-deep` | 4,07:1 | **4,87:1** | `index.css:15` |
| 9 | ✅ `--muted` sur `--beige` | 4,33:1 | **5,18:1** | idem |
| 10 | ✅ `--muted/80` | 3,18:1 | **5,54:1** (alpha supprimée) | `Services.tsx:87` |
| 28 | ✅ `#888` codé en dur, hors tokens | 3,39:1 à 9px | **5,54:1 à 11px** (token `--muted`) | `Logo.tsx:10` |

Valeurs retenues : `--terracotta` `#c4785a` → **`#a85b3d`**, `--terracotta-hover`
`#b26a4e` → **`#964d31`** (5,91:1), `--muted` `#6b7280` → **`#5f6672`**.

> **Note sur `#A85B3D`.** La valeur que tu proposais donne 4,75:1 sur `--paper`
> mais seulement 4,45:1 sur `--beige` et 4,18:1 sur `--beige-deep`. Vérification
> faite, le terracotta ne sert de **texte de taille normale que sur `--paper`** :
> sur beige il n'apparaît qu'à 40px et 56px, où le seuil est de 3:1, et sur
> beige-deep il ne sert jamais de texte. La valeur convient donc à tous les
> usages réels. Un usage futur de terracotta en petit texte sur beige demanderait
> `#A25638` ou plus sombre.

### Accessibilité

| # | Constat | Correction | Fichier |
|---|---|---|---|
| 11 | ✅ Aucun lien d'évitement | Skip-link visible au focus. **Le focus est déplacé par script, pas par ancre** : un `href="#contenu"` aurait modifié le hash, que le routeur interprète — on aurait quitté la page projet pour l'accueil. Vérifié : après Entrée, `hash` inchangé | `App.tsx:71` |
| 12 | ✅ `<main>` absent hors accueil | `<main id="contenu" tabIndex={-1}>` déplacé dans le wrapper de route ; `Home` rend un fragment. Vérifié : `main=1` sur les 7 routes | `App.tsx:96` |
| 13 | ✅ Sections sans titre dans les pages projet | `Eyebrow` reçoit une prop `as` ; « Le défi », « La solution », « L'impact » sont désormais des `<h2>`. Vérifié : `h2=4` sur chaque page projet | `Eyebrow.tsx`, `ProjectDetail.tsx:62,72,95` |
| 17 | ✅ Cibles tactiles sous 44×44 | Burger 40→**44×44**, icônes LinkedIn/Email 18→**44×44**, liens de nav, de footer, de contact et logo portés à `min-h-11`. Vérifié : **0 cible sous 44×44** sur 24 éléments focusables | `Nav.tsx`, `Footer.tsx`, `About.tsx`, `Contact.tsx`, `Logo.tsx` |
| 29 | ✅ Anneau de focus incohérent | Utilitaires `focus-visible:outline-*` retirés de `Button`, la règle globale s'applique partout. Vérifié : **24/24 en terracotta 2px offset 2px** | `Button.tsx:22` |
| — | ✅ Échap ne fermait pas le menu mobile | Handler `keydown` ajouté ; le focus revient au bouton. Vérifié : `aria-expanded` passe à `false` | `Nav.tsx:22` |

### RGPD

| # | Constat | Correction | Fichier |
|---|---|---|---|
| 15 | ✅ Google Fonts en CDN | Les deux familles sont auto-hébergées : 18 fichiers `.woff2` (latin + latin-ext, 586 Ko) dans `public/fonts/`, `@font-face` locaux, import CDN supprimé. **Vérifié au runtime : aucun domaine tiers contacté** sur les 7 routes | `index.css:1`, `public/fonts/` |
| 16 | ✅ Politique inexacte | Réécrite pour décrire l'état réel : polices locales, aucun tiers ne reçoit l'IP au chargement. Deux clauses ajoutées — **transfert hors UE** (Vercel Inc., clauses contractuelles types) et **prise de rendez-vous** (Cal.com est un lien sortant, aucune donnée transmise avant clic, responsable de traitement distinct) | `Legal.tsx:263` |

### Métadonnées

| # | Constat | Correction | Fichier |
|---|---|---|---|
| 4 | ✅ `noindex` + `robots.txt` bloquant | `"index": true`. Vérifié : plus de `<meta name="robots">` dans `dist/index.html`, plus de `dist/robots.txt` | `site.json:6` |
| 14 | ✅ `<title>` figé sur les 7 vues | `useEffect` écrivant `document.title` et la meta description par route. Vérifié au runtime, 7 titres distincts | `App.tsx:47` |

### Typographie

| # | Constat | Correction | Fichier |
|---|---|---|---|
| 18 | ✅ Corps sous 16px | Corps porté à **16px**, plancher à **14px** (11/12/13px relevés). 26 occurrences en 16px, 15 en 14px | tous les composants |
| 19 | ⚠️ **Constat erroné, corrigé** — l'interlignage n'était pas de 1,2 : le preflight de Tailwind v4 pose déjà `line-height: 1.5` sur `html`, ma règle sur `body` était redondante. Portée désormais limitée à `p, li` dans `@layer base`, par cohérence d'intention plutôt que par nécessité | `index.css:215` |
| 20 | ✅ Lignes trop courtes | `46ch`→`62ch`, `42ch`→`60ch`, `30rem`→`36rem` | `About.tsx`, `Realisations.tsx`, `Hero.tsx` |
| 21 | ✅ Page légale ≈ 95–100 caractères | `max-w-[760px]` → **`620px`** | `Legal.tsx:80` |
| 22 | ✅ Cormorant italique 15px en `--muted` | Passe à 16px, et le `--muted` corrigé donne 5,18:1. Reste dormant (les 5 projets ont une image) | `MediaFrame.tsx:55` |
| 23 | ✅ Paragraphes italiques longs | Conteneur du manifeste élargi à `860px` pour réduire le nombre de lignes | `Manifesto.tsx:9` |

### Finitions

| # | Constat | Correction | Fichier |
|---|---|---|---|
| 24 | ✅ Bordures porteuses de sens sous 3:1 | Bordure pointillée de la carte d'invitation et bordure accent passées en terracotta plein : **2,37 → 4,75:1** et **2,69 → 4,45:1**. Les hairlines purement décoratives (1,25:1 / 1,17:1) sont laissées en l'état, 1.4.11 ne s'y appliquant pas | `Realisations.tsx:66`, `MediaFrame.tsx:27` |
| 27 | ✅ Auto-pollution du CSS par les `.md` | `@source not '../**/*.md'` ajouté. Vérifié : la règle `.ease-[cubic-bezier(...)]` a disparu du bundle, la vraie subsiste. **Couvre aussi `src/imports/pasted_text/`**, qui polluait de la même façon | `index.css:8` |

---


### Régression détectée sur la preview, corrigée

| # | Constat | Correction | Fichier |
|---|---|---|---|
| 30 | ✅ Soulignement des liens décroché du texte (nav, footer, « Envoyer un email ») | `.link-underline::after` était ancré en `bottom: -2px`, soit au bas de la boîte. Le `min-h-11` posé au lot 5 pour la cible tactile a porté cette boîte à 44px : le trait se retrouvait **23px sous le texte**. Ancré désormais au texte — `top: 50%; margin-top: calc(0.5em + 2px)` — donc indépendant de la hauteur de cible | `index.css:267` |
| 31 | ✅ Texte de nav 10,5px au-dessus du centre du bouton Contact | **La cause n'était pas le `line-height`** mais ma propre règle `.link-underline { display: inline-block }`, non layerée : elle écrasait l'utilitaire `inline-flex` sur les liens portant `min-h-11`, neutralisant `items-center`. Le texte restait donc collé en haut d'une boîte de 44px. Règle déplacée dans `@layer components`, où les utilitaires gardent la main. Vérifié : écart **0,0px** | `index.css:263` |
| 32 | ✅ « — STUDIO — » débordant à droite sous « Noven » | Le passage de 9 à 11px au lot 3 a élargi le sous-titre de 73 à 90px, interlettrage compris puisqu'il est exprimé en `em`. Les deux lignes étant calées à gauche dans un conteneur dimensionné par la plus large, le sous-titre débordait. Centrage explicite par `items-center`, plus une marge droite négative de `0.28em` qui retire l'interlettrage fantôme suivant le dernier glyphe. Vérifié : décentrage optique **~0,1px** | `Logo.tsx:5` |

> **L'hypothèse initiale visait le `line-height: 1.5`.** L'isolement des deux
> variables l'a écartée : retirer le `line-height` laissait l'écart à 24px,
> retirer le `min-h-11` le ramenait à 3px. La cause était la cible tactile, pas
> l'interlignage. L'alignement vertical de la nav, lui, n'a jamais été rompu :
> les centres du lien et du bouton Contact coïncident dans les quatre variantes
> testées. C'est le trait décroché qui donnait cette impression.

## 2. Constats en attente

| # | Constat | Raison | Reste à faire |
|---|---|---|---|
| 1 | ⏸ SIRET en placeholder | Immatriculation en cours | Remplacer `[SIRET — immatriculation en cours]` dès obtention. **Seul constat encore hors LCEN** |
| 25 | ⏸ `og:image` sur le domaine Vercel | Attente du branchement de novenstudio.fr | Mettre à jour les deux URL absolues d'`index.html`, puis valider au debugger Facebook |
| 26 | ⏸ 13,58 Mo d'images | Nécessite une conversion hors code source | WebP/AVIF, redimensionnement, `loading="lazy"`. `carrefour-visual.png` (4,17 Mo) en tête |

---

## 3. Écarts assumés, à arbitrer

Trois points où je me suis écarté de la consigne, ou n'ai pu l'atteindre entièrement.

**Le sous-titre du logo reste à 11px**, contre un plancher fixé à 14px. À 14px
avec sa graisse et son interlettrage de 0,28em, « — STUDIO — » deviendrait plus
large que le mot « Noven » à 28px et casserait le verrouillage du logotype. WCAG
exclut par ailleurs les logotypes de ses exigences de contraste. Son problème
réel — le `#888` hors tokens à 3,39:1 — est corrigé : il est passé de 9 à 11px et
utilise `--muted`, soit 5,54:1.

**Le paragraphe du manifeste tient en 4 lignes, pas 2–3.** Le texte fait 171
caractères ; à 24–32px en Cormorant, descendre à 3 lignes demanderait un
conteneur d'environ 1100px, largeur excessive pour une serif. J'ai élargi à
860px, ce qui retire une ligne. Atteindre strictement 2–3 lignes suppose de
raccourcir la copie — décision de contenu, hors de ce périmètre.

**L'anneau de focus s'installe en transition**, il n'apparaît pas instantanément
en terracotta. `transition-colors` et `transition-all` incluent `outline-color`
dans leur liste de propriétés. Mesuré immédiatement après tabulation, l'anneau
affiche encore la couleur de départ ; après stabilisation, il est terracotta sur
les 24 éléments. C'est le comportement attendu d'une transition, et
`prefers-reduced-motion` la neutralise. **À noter : ma première mesure, prise sans
délai, m'avait fait conclure à tort à un défaut persistant.**

---

## 4. Reste non vérifié

| Point | Protocole |
|---|---|
| Lecteur d'écran | Parcours NVDA/VoiceOver, notamment les `<h2>` ajoutés dans les pages projet et la navigation par landmarks |
| Rendu visuel des changements typographiques | Le passage de 11/12/13px à 14px et du corps à 16px modifie l'aspect de **tout** le site, surtout les surtitres `Eyebrow`. À valider à l'œil |
| Rendu des nouvelles couleurs | Le terracotta assombri change l'identité visuelle. À valider |
| Appareil mobile physique | Les 44×44 sont mesurés en émulation |
| Aperçu Open Graph | Après branchement du domaine (#25) |

---

## 5. Méthode

- Contraste : `scratchpad/contrast.ps1` — 40 paires, compositing alpha, formule
  WCAG. Substitut de `/tmp/contrast.js`, Node ayant été absent lors de la rév. 1.
- Build : `pnpm build` après **chacun** des 7 lots, exit 0 à chaque fois.
- Runtime : axe-core + Playwright sur les 7 routes, installés en devDependencies
  **temporaires puis désinstallés**. `package.json` et `pnpm-lock.yaml` sont
  identiques à `HEAD`.
- Les valeurs d'axe et celles de `contrast.ps1` coïncident, validant croisément
  les deux méthodes.

Deux erreurs de mesure ont été commises et corrigées en cours de route : l'anneau
de focus mesuré pendant sa transition (§3), et à la rév. 1 une conformité conclue
depuis la règle CSS sans vérifier son rendu. Lire une règle ne prouve pas qu'elle
s'applique ; la mesurer trop tôt ne prouve pas qu'elle échoue.
