import Button from "./Button";
import Eyebrow from "./Eyebrow";
import { useReveal } from "../hooks/useReveal";

export default function Hero() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-6 pt-28 pb-16 md:px-10 md:pt-32"
    >
      <div
        ref={ref}
        className="reveal mx-auto grid w-full max-w-[1200px] items-center gap-12 md:grid-cols-[55fr_45fr] md:gap-16"
      >
        {/* Left column */}
        <div>
          <Eyebrow>Noven Studio — Paris</Eyebrow>
          <h1 className="mt-6 font-serif text-[clamp(3.75rem,9vw,6rem)] font-medium leading-[0.98] tracking-[-0.01em] text-ink">
            Le web design pensé pour votre{" "}
            <em className="font-normal italic text-terracotta">profession.</em>
          </h1>
          <p className="mt-8 max-w-[36rem] text-[17px] leading-relaxed text-muted">
            Studio indépendant spécialisé dans la refonte de sites pour avocats,
            kinés, coachs et professionnels indépendants. Livraison en 14 jours.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href="#realisations">Voir mes réalisations</Button>
            <Button
              href="https://cal.com/noven-studio-dbsqdi/rdv"
              variant="secondary"
              external
            >
              Prendre rendez-vous
            </Button>
          </div>
        </div>

        {/* Right column — editorial decorative "N" */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative flex aspect-[4/5] w-full max-w-[380px] items-center justify-center overflow-hidden rounded-[2px] border border-hairline bg-beige">
            <span
              className="select-none font-serif font-medium text-terracotta"
              style={{ fontSize: "clamp(16rem, 34vw, 26rem)", lineHeight: 1 }}
              aria-hidden="true"
            >
              N
            </span>
            <span className="absolute bottom-6 left-6 text-[14px] font-medium uppercase tracking-[0.24em] text-muted">
              Studio de design — Est. 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
