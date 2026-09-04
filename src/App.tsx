import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Services from "./components/Services";
import Workflow from "./components/Workflow";
import Realisations from "./components/Realisations";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetail from "./components/ProjectDetail";
import Legal from "./components/Legal";
import { useHashRoute } from "./hooks/useHashRoute";
import { getProject } from "./data/projects";

/** Doit rester aligné sur `description` de .figma/make/site.json. */
const SITE_DESCRIPTION =
  "Studio de web design freelance spécialisé dans la refonte de sites pour professions libérales — avocats, kinés, coachs.";

/** Domaine canonique. Le sous-domaine Vercel n'y répond plus qu'en 308. */
const ORIGINE = "https://novenstudio.fr";

/**
 * Écrit une balise meta, en la créant si le shell ne la porte pas. Les
 * propriétés Open Graph s'identifient par `property`, les autres par `name`.
 */
function definirMeta(cle: string, valeur: string) {
  const attribut = cle.startsWith("og:") ? "property" : "name";
  let balise = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribut}="${cle}"]`,
  );
  if (!balise) {
    balise = document.createElement("meta");
    balise.setAttribute(attribut, cle);
    document.head.appendChild(balise);
  }
  balise.setAttribute("content", valeur);
}

function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      <Workflow />
      <Realisations />
      <About />
      <Contact />
    </>
  );
}

export default function App() {
  const hash = useHashRoute();
  const match = hash.match(/^#\/projects\/([\w-]+)$/);
  const project = match ? getProject(match[1]) : undefined;

  // The legal page answers to `#legal` and to each of its section anchors
  // (`#legal-01` … `#legal-05`), so the footer can deep-link straight to a
  // section without a second routing mechanism.
  const legalMatch = hash.match(/^#legal(?:-(\d{2}))?$/);
  const legalSection = legalMatch?.[1];
  const isLegal = legalMatch !== null;

  // Scroll to top when entering a project page, or to the requested section
  // when entering the legal page — the anchor target only exists once the
  // page has rendered, so the browser's own anchor jump can't find it.
  useEffect(() => {
    if (project) {
      window.scrollTo(0, 0);
      return;
    }
    if (!isLegal) return;
    const target = legalSection
      ? document.getElementById(`legal-${legalSection}`)
      : null;
    if (target) target.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  }, [project?.slug, isLegal, legalSection]);

  // Le shell HTML ne porte qu'un seul titre, figé au build depuis site.json.
  // Le routing par hash ne rechargeant pas la page, chaque vue doit écrire le
  // sien — sans quoi les 7 vues partagent titre et description.
  useEffect(() => {
    const meta = project
      ? {
          title: `${project.name} — Réalisation Noven Studio`,
          description: project.description,
          url: `${ORIGINE}/#/projects/${project.slug}`,
        }
      : isLegal
        ? {
            title: "Mentions légales et conditions — Noven Studio",
            description:
              "Mentions légales, conditions générales de vente et d'utilisation, politique de confidentialité et cookies de Noven Studio.",
            // Forme canonique : les ancres de section (#legal-04) désignent la
            // même page et ne doivent pas produire une URL de partage distincte.
            url: `${ORIGINE}/#legal`,
          }
        : {
            title: "Noven Studio — Web design pour professions libérales",
            description: SITE_DESCRIPTION,
            url: `${ORIGINE}/`,
          };

    document.title = meta.title;
    definirMeta("description", meta.description);
    definirMeta("og:title", meta.title);
    definirMeta("og:description", meta.description);
    definirMeta("og:url", meta.url);
    definirMeta("twitter:title", meta.title);
    definirMeta("twitter:description", meta.description);
  }, [project?.slug, isLegal]);

  // Keying the wrapper on the route remounts it on every navigation, which
  // restarts the `route-view` fade + rise animation. Every legal anchor maps
  // to the same key, so jumping between sections scrolls without replaying it.
  const routeKey = project
    ? `project:${project.slug}`
    : isLegal
      ? "legal"
      : "home";

  return (
    <div className="min-h-full bg-paper text-ink">
      {/*
        Lien d'évitement (WCAG 2.4.1). Le focus est déplacé à la main plutôt que
        par une ancre : un href="#contenu" modifierait le hash, que le routeur
        interprète — on quitterait la page projet pour l'accueil.
      */}
      <a
        href="#contenu"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("contenu");
          el?.focus();
          el?.scrollIntoView();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-[15px] focus:font-medium focus:text-paper"
      >
        Aller au contenu principal
      </a>
      <Nav />
      <main id="contenu" tabIndex={-1} key={routeKey} className="route-view">
        {project ? (
          <ProjectDetail project={project} />
        ) : isLegal ? (
          <Legal />
        ) : (
          <Home />
        )}
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
