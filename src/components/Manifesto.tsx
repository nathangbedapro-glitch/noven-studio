import Eyebrow from "./Eyebrow";
import { useReveal } from "../hooks/useReveal";

export default function Manifesto() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="approche" className="px-6 py-28 md:px-10 md:py-40">
      <div ref={ref} className="reveal mx-auto max-w-[720px]">
        <Eyebrow>Notre approche</Eyebrow>
        <p className="mt-8 font-serif text-[clamp(1.5rem,3.2vw,2rem)] font-normal italic leading-[1.35] text-ink">
          Un site internet devrait refléter la qualité de votre pratique. Pas
          être un site parmi d'autres. Chaque projet Noven Studio est conçu sur
          mesure, en 14 jours, avec l'exigence d'un travail d'artisan.
        </p>
        <p className="mt-10 text-right text-[14px] text-muted">
          Nathan GBEDA, fondateur
        </p>
      </div>
    </section>
  );
}
