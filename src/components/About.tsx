import Eyebrow from "./Eyebrow";
import MediaFrame from "./MediaFrame";
import { useReveal } from "../hooks/useReveal";
import nathanPortrait from "../assets/images/nathan-portrait.png";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.25 8.25h4.5V24H.25V8.25Zm7.5 0h4.31v2.15h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-6.98c0-1.66-.03-3.8-2.32-3.8-2.32 0-2.67 1.81-2.67 3.68V24h-4.5V8.25Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 6 9-6" />
    </svg>
  );
}

export default function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div
        ref={ref}
        className="reveal mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-[40fr_60fr] md:gap-16"
      >
        {/* Portrait */}
        <div className="mx-auto w-full max-w-[340px] md:mx-0">
          <MediaFrame
            src={nathanPortrait}
            alt="Portrait de Nathan GBEDA, fondateur de Noven Studio"
            ratio="4/5"
            border="accent"
          />
        </div>

        {/* Bio */}
        <div>
          <Eyebrow>Fondateur — Paris</Eyebrow>
          <h2 className="mt-5 font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.01em]">
            Nathan GBEDA
          </h2>
          <p className="mt-7 max-w-[46ch] text-[15px] leading-relaxed text-muted md:text-[16px]">
            Trois années à concevoir des produits digitaux pour des
            marketplaces, des SaaS et des marques établies (Orange, BoursoBank,
            Carrefour) m'ont appris qu'un bon design se voit rarement — il se
            ressent. J'apporte cette exigence aux professionnels indépendants
            avec Noven Studio.
          </p>

          <div className="mt-8 flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/nathangbeda/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-ink/70 transition-colors hover:text-terracotta"
            >
              <LinkedInIcon />
            </a>
            {/* Adresse personnelle de Nathan — volontairement différente de
                novenstudio.design@gmail.com utilisée partout ailleurs. */}
            <a
              href="mailto:nathangbedapro@gmail.com"
              aria-label="Email"
              className="text-ink/70 transition-colors hover:text-terracotta"
            >
              <MailIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
