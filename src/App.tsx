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

  // Scroll to top when entering a project page.
  useEffect(() => {
    if (project) window.scrollTo(0, 0);
  }, [project?.slug]);

  // Keying the wrapper on the route remounts it on every navigation, which
  // restarts the `route-view` fade + rise animation.
  const routeKey = project ? `project:${project.slug}` : "home";

  return (
    <div className="min-h-full bg-paper text-ink">
      <Nav />
      <div key={routeKey} className="route-view">
        {project ? <ProjectDetail project={project} /> : <Home />}
      </div>
      <Footer />
    </div>
  );
}
