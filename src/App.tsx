import { useEffect } from "react";
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

function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Services />
      <Workflow />
      <Realisations />
      <About />
      <Contact />
    </main>
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
      <Nav />
      <div key={routeKey} className="route-view">
        {project ? (
          <ProjectDetail project={project} />
        ) : isLegal ? (
          <Legal />
        ) : (
          <Home />
        )}
      </div>
      <Footer />
    </div>
  );
}
