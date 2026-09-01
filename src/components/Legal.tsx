import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import SectionHeading from "./SectionHeading";
import { useReveal } from "../hooks/useReveal";

/*
 * TODO — contenu à valider avant mise en ligne.
 *
 * La structure des sections (legal-01 à legal-05) et le texte non factuel
 * ci-dessous sont un squelette : le contenu de la page légale du prototype
 * Claude Design n'a pas pu être lu (projet non autorisé pour cette session).
 * Chaque valeur juridiquement opposable — raison sociale, SIRET, adresse,
 * hébergeur, durées de conservation — est laissée en `<Todo>` visible plutôt
 * qu'inventée : une mention légale fausse engage la responsabilité de
 * l'éditeur. À faire relire par un professionnel avant publication.
 *
 * Le site est actuellement en `robots: { index: false }` (.figma/make/site.json),
 * donc cette page n'est pas indexable en l'état.
 */

/** Marqueur visible pour une valeur juridiquement opposable à fournir. */
function Todo({ children }: { children: string }) {
  return (
    <span className="rounded-[2px] bg-terracotta/10 px-1.5 py-0.5 text-[0.95em] text-terracotta">
      [à compléter — {children}]
    </span>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-hairline pt-14">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p>
      <span className="font-medium text-ink">{label} : </span>
      {children}
    </p>
  );
}

function SubHeading({ children }: { children: string }) {
  return <h3 className="text-[16px] font-semibold text-ink">{children}</h3>;
}

export default function Legal() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <article className="px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-[760px]">
        <div ref={ref} className="reveal">
          <a
            href="#top"
            className="link-underline text-[14px] font-medium text-terracotta"
          >
            ← Retour à l'accueil
          </a>
          <div className="mt-10">
            <Eyebrow>Informations légales</Eyebrow>
            <h1 className="mt-5 font-serif text-[clamp(3rem,7vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.01em]">
              Mentions légales et confidentialité
            </h1>
            <p className="mt-7 text-[15px] leading-relaxed text-muted">
              Dernière mise à jour : <Todo>date de publication</Todo>
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-16">
          <Section id="legal-01" eyebrow="01" title="Mentions légales">
            <Row label="Éditeur du site">
              Noven Studio, <Todo>forme juridique</Todo>, représenté par Nathan
              GBEDA.
            </Row>
            <Row label="Siège social">
              <Todo>adresse postale complète</Todo>
            </Row>
            <Row label="Immatriculation">
              SIRET <Todo>numéro SIRET</Todo> — RCS <Todo>ville et numéro</Todo>
            </Row>
            <Row label="Numéro de TVA intracommunautaire">
              <Todo>numéro de TVA, ou mention de franchise en base</Todo>
            </Row>
            <Row label="Directeur de la publication">Nathan GBEDA</Row>
            <Row label="Contact">
              <a
                href="mailto:novenstudio.design@gmail.com"
                className="link-underline text-ink"
              >
                novenstudio.design@gmail.com
              </a>
            </Row>
          </Section>

          <Section id="legal-02" eyebrow="02" title="Hébergement">
            <Row label="Hébergeur">
              <Todo>raison sociale de l'hébergeur</Todo>
            </Row>
            <Row label="Adresse">
              <Todo>adresse postale de l'hébergeur</Todo>
            </Row>
            <p>
              L'hébergeur assure le stockage et la mise à disposition du site.
              Il n'intervient pas sur le contenu éditorial, qui relève de la
              seule responsabilité de l'éditeur.
            </p>
          </Section>

          <Section
            id="legal-03"
            eyebrow="03"
            title="Propriété intellectuelle"
          >
            <p>
              L'ensemble des éléments composant ce site — structure, textes,
              identité visuelle, typographies, images et code source — est
              protégé par le droit de la propriété intellectuelle. Sauf mention
              contraire, ces éléments sont la propriété exclusive de Noven
              Studio.
            </p>
            <p>
              Toute reproduction, représentation, adaptation ou exploitation,
              totale ou partielle, sur quelque support que ce soit, est interdite
              sans autorisation écrite préalable.
            </p>
            <p>
              Les projets présentés dans la section Réalisations sont publiés
              avec l'accord des clients concernés. Les marques et logos qui y
              figurent restent la propriété de leurs titulaires respectifs.
            </p>
          </Section>

          <Section
            id="legal-04"
            eyebrow="04"
            title="Politique de confidentialité"
          >
            <p>
              Noven Studio traite les données personnelles collectées via ce
              site conformément au Règlement général sur la protection des
              données (RGPD) et à la loi Informatique et Libertés.
            </p>

            <SubHeading>Données collectées et finalités</SubHeading>
            <p>
              Les données transmises via le formulaire de contact ou par email —
              nom, adresse email et contenu du message — sont utilisées
              uniquement pour répondre à la demande et, le cas échéant, établir
              une proposition commerciale. La base légale de ce traitement est
              l'exécution de mesures précontractuelles prises à la demande de la
              personne concernée.
            </p>

            <SubHeading>Durée de conservation</SubHeading>
            <p>
              Les données de prospection sont conservées{" "}
              <Todo>durée de conservation retenue</Todo> à compter du dernier
              contact. Les données liées à une relation contractuelle sont
              conservées pour la durée légale applicable aux documents
              comptables.
            </p>

            <SubHeading>Destinataires et sous-traitants</SubHeading>
            <p>
              Les données ne sont ni vendues ni cédées à des tiers. Elles
              peuvent être traitées par les prestataires techniques nécessaires
              au fonctionnement du site :{" "}
              <Todo>liste des sous-traitants et pays d'hébergement</Todo>
            </p>

            <SubHeading>Vos droits</SubHeading>
            <p>
              Vous disposez d'un droit d'accès, de rectification, d'effacement,
              de limitation, d'opposition et de portabilité sur vos données. Ces
              droits s'exercent par email à{" "}
              <a
                href="mailto:novenstudio.design@gmail.com"
                className="link-underline text-ink"
              >
                novenstudio.design@gmail.com
              </a>
              . Une réponse vous sera apportée dans un délai d'un mois.
            </p>
            <p>
              En cas de désaccord persistant, vous pouvez introduire une
              réclamation auprès de la CNIL (3 place de Fontenoy, 75007 Paris —
              cnil.fr).
            </p>
          </Section>

          <Section id="legal-05" eyebrow="05" title="Cookies">
            <p>
              <Todo>
                à confirmer selon les outils réellement installés sur le site
              </Todo>
            </p>
            <p>
              En l'absence d'outil de mesure d'audience ou de traceur
              publicitaire, seuls des cookies strictement nécessaires au
              fonctionnement du site sont susceptibles d'être déposés. Ces
              cookies sont exemptés de consentement préalable.
            </p>
            <p>
              Si un outil de mesure d'audience venait à être ajouté, un bandeau
              de consentement conforme aux recommandations de la CNIL serait mis
              en place et cette section mise à jour en conséquence.
            </p>
          </Section>
        </div>
      </div>
    </article>
  );
}
