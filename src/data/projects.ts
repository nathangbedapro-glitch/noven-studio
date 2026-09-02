import mahbouliVisual from "../assets/images/mahbouli-visual.png";
import alvoVisual from "../assets/images/alvo-visual.png";
import carrefourVisual from "../assets/images/carrefour-visual.png";
import michelFerrandVisual from "../assets/images/michel-ferrand-visual.png";
import petcareVisual from "../assets/images/petcare-visual.png";

export type Stat = { value: string; label: string };

export type Project = {
  slug: string;
  name: string;
  type: string;
  year: string;
  description: string; // homepage card
  visual: string; // placeholder mockup label, shown when `image` is absent
  image?: string; // real artwork; falls back to the `visual` label when absent
  imageAlt?: string; // overrides the generic alt when the project needs its own
  role: string;
  industry: string;
  challenge: string;
  solution: string;
  solutionBullets?: string[];
  impact: string;
  impactStats?: Stat[];
};

export const projects: Project[] = [
  {
    slug: "mahbouli",
    name: "Cabinet Mahbouli",
    type: "Cabinet d'avocats parisien",
    year: "2026",
    description:
      "Refonte complète : 9 domaines d'expertise, calculateurs juridiques, architecture technique moderne.",
    visual: "Site vitrine — navy & or",
    image: mahbouliVisual,
    imageAlt:
      "Aperçu du site Cabinet Mahbouli, refonte complète pour un cabinet d'avocats parisien",
    role: "Conception & développement (Noven Studio)",
    industry: "Cabinet d'avocats",
    challenge:
      "Un site vieillissant — dernier article de blog datant de 2023 — qui ne reflétait plus la qualité de leur pratique ni leur réputation.",
    solution:
      "Refonte complète : page d'accueil, 9 pages d'expertise détaillées, 3 calculateurs juridiques interactifs, architecture technique moderne et conforme RGPD.",
    solutionBullets: [
      "9 pages d'expertise détaillées",
      "3 calculateurs juridiques interactifs",
      "Architecture technique moderne et conforme RGPD",
    ],
    impact:
      "Un site en ligne, conforme RGPD, prêt pour le référencement local — repositionnant le cabinet à la hauteur de sa réputation.",
  },
  {
    slug: "alvo",
    name: "Alvo",
    type: "Marketplace B2B — Cession d'entreprises",
    year: "2024–2025",
    description:
      "Refonte des fiches annonces et de la recherche. +18 % d'interactions post-lancement.",
    visual: "Dashboard desktop",
    image: alvoVisual,
    role: "Product Designer",
    industry: "Marketplace B2B, transmission d'entreprise",
    challenge:
      "Une interface de gestion de contacts complexe et peu lisible, freinant le quotidien des équipes internes et des repreneurs.",
    solution:
      "Refonte complète du parcours à partir d'un user flow détaillé : filtres dynamiques, distinction claire entre personnes morales et physiques, overlays contextuels pour éviter les ruptures de parcours.",
    solutionBullets: [
      "Filtres dynamiques",
      "Distinction claire entre personnes morales et physiques",
      "Overlays contextuels pour éviter les ruptures de parcours",
    ],
    impact:
      "+18 % d'interactions sur les annonces en 3 mois. Adoption du design system par l'équipe dès le premier sprint.",
    impactStats: [
      { value: "+18 %", label: "d'interactions en 3 mois" },
      { value: "1ᵉʳ sprint", label: "adoption du design system" },
    ],
  },
  {
    slug: "michel-ferrand",
    name: "Michel Ferrand",
    type: "Marque de luxe (via Glucoz)",
    year: "2023",
    description:
      "Conception d'interfaces pour une marque établie du secteur du luxe, en collaboration avec l'agence.",
    visual: "Site éditorial",
    image: michelFerrandVisual,
    role: "UX/UI Designer",
    industry: "Luxe & ameublement",
    challenge:
      "Moderniser l'image d'un fabricant de mobilier haut de gamme sans dénaturer son héritage artisanal — avec le défi propre à la vente de mobilier en ligne : produits volumineux, paniers élevés, confiance à recréer.",
    solution:
      "Création d'un univers digital immersif et mobile-first (plus de 50 % des visites), avec des visuels d'intégration pensés pour favoriser la projection des visiteurs.",
    impact:
      "+60 % de visibilité organique, preuve de la pertinence des choix UX et structurels.",
    impactStats: [
      { value: "+60 %", label: "de visibilité organique" },
      { value: "50 %+", label: "des visites sur mobile" },
    ],
  },
  {
    slug: "carrefour",
    name: "Carrefour",
    type: "Grande distribution — Partenaire JO Paris 2024",
    year: "2023",
    description:
      "'Le Grand Tournoi' : plateforme mobile-first pour fédérer 100 000 collaborateurs autour des Jeux Olympiques.",
    visual: "Plateforme mobile-first",
    image: carrefourVisual,
    role: "UX/UI Designer",
    industry: "Grande distribution, partenaire JO Paris 2024",
    challenge:
      "Fédérer 100 000 collaborateurs aux profils et à la maturité digitale très variés autour des valeurs du sport et du collectif.",
    solution:
      "'Le Grand Tournoi' : une plateforme mobile-first pour s'inscrire, constituer ses équipes, suivre les résultats et l'actualité, avec des modules interactifs (quizz, encouragements, actualités).",
    solutionBullets: [
      "Inscription et constitution des équipes",
      "Suivi des résultats et de l'actualité",
      "Modules interactifs : quizz, encouragements, actualités",
    ],
    impact:
      "Forte participation dès les premières semaines et un renforcement de la cohésion interne du groupe.",
    impactStats: [
      { value: "100 000", label: "collaborateurs fédérés" },
    ],
  },
  {
    slug: "petcare-connect",
    name: "PetCare Connect",
    type: "Plateforme française de pet sitting",
    year: "2025",
    description:
      "Concept complet : dashboard pro pour sitters, messagerie organisée, transparence tarifaire.",
    visual: "App mobile + dashboard",
    image: petcareVisual,
    role: "Product Designer (projet personnel)",
    industry: "PetTech",
    challenge:
      "Le marché français du pet sitting est construit autour des propriétaires — les sitters professionnels, pourtant moteurs de l'offre, restent un public secondaire chez tous les acteurs existants.",
    solution:
      "Un dashboard sitter professionnel, une messagerie organisée par personne (et non par réservation), une transparence tarifaire totale dès la page d'accueil.",
    solutionBullets: [
      "Dashboard sitter professionnel",
      "Messagerie organisée par personne, non par réservation",
      "Transparence tarifaire totale dès la page d'accueil",
    ],
    impact:
      "3 piliers de différenciation identifiés qu'aucun acteur du marché ne combine à ce jour.",
    impactStats: [{ value: "3", label: "piliers de différenciation" }],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
