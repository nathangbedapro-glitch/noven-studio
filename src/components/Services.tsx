import { useState } from "react";
import Button from "./Button";
import Eyebrow from "./Eyebrow";
import QuoteModal, { BROUILLON_VIDE } from "./QuoteModal";
import { useReveal } from "../hooks/useReveal";

const packFeatures = [
  "Design sur-mesure (5 à 7 pages)",
  "Site responsive desktop et mobile",
  "Formulaire de contact fonctionnel",
  "Newsletter connectée",
  "Statistiques Google Analytics",
  "Conformité RGPD",
  "Repo GitHub et Vercel au nom du client",
  "Passation à la livraison",
];

export default function Services() {
  const ref = useReveal<HTMLDivElement>();
  const [devisOuvert, setDevisOuvert] = useState(false);
  // Le brouillon vit ici pour survivre à la fermeture de la modale.
  const [brouillon, setBrouillon] = useState(BROUILLON_VIDE);

  return (
    <>
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div ref={ref} className="reveal mx-auto max-w-[1200px]">
        <Eyebrow>L'offre</Eyebrow>
        <h2 className="mt-5 max-w-[16ch] font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.01em]">
          Ce que je livre
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Card 1 — main offer */}
          <article className="flex flex-col rounded-[3px] border border-hairline bg-beige p-8 md:p-11">
            <h3 className="font-serif text-[2rem] font-medium leading-none">
              Pack Refonte
            </h3>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-[2.5rem] font-medium leading-none text-terracotta">
                1&nbsp;600&nbsp;€
              </span>
              <span className="text-[14px] text-muted">
                TTC — livraison en 14 jours
              </span>
            </div>

            <ul className="mt-9 space-y-3.5">
              {packFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[16px] leading-snug">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-2">
              {/*
                Safari macOS ne donne pas le focus à un <button> au clic
                souris : sans ce focus explicite, la modale mémoriserait
                <body> comme déclencheur et lui rendrait le focus à la
                fermeture, au lieu de le rendre à ce bouton.
              */}
              <Button
                onClick={(e) => {
                  e.currentTarget.focus();
                  setDevisOuvert(true);
                }}
              >
                Demander un devis
              </Button>
            </div>
          </article>

          {/* Card 2 — options */}
          <article className="flex flex-col rounded-[3px] border border-hairline p-8 md:p-11">
            <h3 className="font-serif text-[2rem] font-medium leading-none text-ink/90">
              Options
            </h3>

            <div className="mt-9 space-y-8">
              <div className="border-t border-hairline pt-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-[16px] font-semibold">SEO Complet</h4>
                  <span className="font-serif text-[1.4rem] text-terracotta">
                    +500&nbsp;€
                  </span>
                </div>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">
                  Recherche mots-clés, Schema.org, 3 articles SEO rédigés.
                </p>
              </div>

              <div className="border-t border-hairline pt-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-[16px] font-semibold">
                    Maintenance mensuelle
                  </h4>
                  <span className="font-serif text-[1.4rem] text-terracotta">
                    120&nbsp;€<span className="text-[16px]">/mois</span>
                  </span>
                </div>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">
                  Modifications, support 48h, 1 section par trimestre.
                </p>
                <p className="mt-2 text-[14px] italic text-muted">
                  Contrat séparé, souscription optionnelle.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      </section>

      <QuoteModal
        open={devisOuvert}
        onClose={() => setDevisOuvert(false)}
        brouillon={brouillon}
        onChange={setBrouillon}
        onEnvoye={() => setBrouillon(BROUILLON_VIDE)}
      />
    </>
  );
}
