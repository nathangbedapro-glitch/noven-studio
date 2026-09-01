import Button from "./Button";
import { useReveal } from "../hooks/useReveal";

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="bg-beige-deep px-6 py-28 md:px-10 md:py-40">
      <div ref={ref} className="reveal mx-auto max-w-[640px] text-center">
        <h2 className="font-serif text-[clamp(2.75rem,6vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.01em]">
          Parlons de votre projet.
        </h2>
        <p className="mx-auto mt-6 max-w-[34rem] text-[16px] leading-relaxed text-muted">
          Un premier échange de 30 minutes, sans engagement, pour comprendre
          votre pratique et voir si nous pouvons travailler ensemble.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* TODO: placeholder from the prototype — swap in the real Calendly
              booking link (or whichever scheduler is used) before going live. */}
          <Button href="https://calendly.com">Prendre rendez-vous</Button>
          <a
            href="mailto:novenstudio.design@gmail.com"
            className="link-underline text-[15px] font-medium text-ink"
          >
            Envoyer un email
          </a>
        </div>

        <p className="mt-10 text-[13px] text-muted">
          Ou directement&nbsp;: novenstudio.design@gmail.com
        </p>
      </div>
    </section>
  );
}
