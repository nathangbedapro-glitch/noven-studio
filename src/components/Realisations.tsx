import Button from "./Button";
import Eyebrow from "./Eyebrow";
import MediaFrame from "./MediaFrame";
import { useReveal } from "../hooks/useReveal";
import { projects, type Project } from "../data/projects";

function ProjectCard({ p }: { p: Project }) {
  return (
    <a href={`#/projects/${p.slug}`} className="group block cursor-pointer">
      <div className="relative overflow-hidden rounded-[3px]">
        <MediaFrame
          src={p.image}
          alt={`Aperçu du site ${p.name}`}
          label={p.visual}
          ratio="16/10"
          mediaClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {/* Terracotta overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-terracotta/0 opacity-0 transition-all duration-300 group-hover:bg-terracotta/60 group-hover:opacity-100">
          {/*
            Le voile à 60 % laisse passer l'image, ce qui fait tomber le
            contraste du libellé à ~1,9:1 sur un visuel clair. L'ombre portée
            lui redonne un bord sombre sans assombrir le voile.
          */}
          <span className="text-[15px] font-medium tracking-wide text-paper [text-shadow:0_1px_3px_rgba(26,26,26,0.6)]">
            Voir le projet →
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[1.5rem] font-medium leading-tight">
          {p.name}
        </h3>
        <span className="shrink-0 text-[13px] text-muted">{p.year}</span>
      </div>
      <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.1em] text-terracotta">
        {p.type}
      </p>
      <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-muted">
        {p.description}
      </p>
    </a>
  );
}

export default function Realisations() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="realisations" className="px-6 py-24 md:px-10 md:py-32">
      <div ref={ref} className="reveal mx-auto max-w-[1200px]">
        <Eyebrow>Portfolio</Eyebrow>
        <h2 className="mt-5 font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.01em]">
          Réalisations récentes
        </h2>

        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}

          {/* Empty invitation card */}
          <article className="flex flex-col">
            <div className="flex aspect-[16/10] flex-col items-center justify-center rounded-[3px] border border-dashed border-terracotta/60 px-6 text-center">
              <p className="font-serif text-[1.75rem] font-medium text-ink">
                Votre projet ici
              </p>
              <p className="mt-2 text-[14px] text-muted">
                Discutons de votre site en 30 minutes
              </p>
              <div className="mt-6">
                <Button href="#contact">Prendre rendez-vous</Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
