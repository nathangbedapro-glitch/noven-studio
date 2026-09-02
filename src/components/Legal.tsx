import type { ReactNode } from "react";
import Button from "./Button";
import Eyebrow from "./Eyebrow";
import SectionHeading from "./SectionHeading";
import { useReveal } from "../hooks/useReveal";

/**
 * Single source for the section list: the table of contents and the section
 * headings below are both built from it, so anchors and titles can't drift.
 * Ids match the `#legal-NN` route anchors resolved in App.
 */
const sections = [
  { id: "legal-01", number: "01", title: "Mentions légales" },
  { id: "legal-02", number: "02", title: "Conditions générales de vente" },
  { id: "legal-03", number: "03", title: "Conditions générales d'utilisation" },
  { id: "legal-04", number: "04", title: "Confidentialité (RGPD)" },
  { id: "legal-05", number: "05", title: "Cookies" },
  { id: "legal-06", number: "06", title: "Contact" },
] as const;

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-hairline pt-14">
      <SectionHeading eyebrow={number} title={title} />
      <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-muted">
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

function Ext({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="link-underline text-ink"
    >
      {children}
    </a>
  );
}

function Mail() {
  return (
    <a
      href="mailto:novenstudio.design@gmail.com"
      className="link-underline text-ink"
    >
      novenstudio.design@gmail.com
    </a>
  );
}

export default function Legal() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <article className="px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-[620px]">
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
              Mentions légales et conditions
            </h1>
          </div>

          <nav aria-label="Sommaire" className="mt-14 border-t border-hairline pt-8">
            <Eyebrow>Sommaire</Eyebrow>
            <ol className="mt-5 space-y-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="link-underline text-[16px] text-ink/80 transition-colors hover:text-ink"
                  >
                    <span className="text-terracotta">{s.number}</span> —{" "}
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="mt-16 space-y-16">
          <Section {...sections[0]}>
            <Row label="Éditeur du site">
              Noven Studio — Nathan GBEDA (Entrepreneur Individuel)
            </Row>
            <Row label="Adresse">88 Rue Edouard Vaillant, 93700 Drancy</Row>
            <Row label="SIRET">[SIRET — immatriculation en cours]</Row>
            <Row label="N° TVA intracommunautaire">
              TVA non applicable, article 293 B du CGI (franchise en base)
            </Row>
            <Row label="Directeur de la publication">
              Nathan GBEDA, fondateur
            </Row>
            <Row label="Email">
              <Mail />
            </Row>
            <Row label="Téléphone">
              <a href="tel:+33635105871" className="link-underline text-ink">
                +33 6 35 10 58 71
              </a>
            </Row>
            <Row label="Hébergeur">
              Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              (<Ext href="https://vercel.com/help">vercel.com/help</Ext>)
            </Row>
            <Row label="Propriété intellectuelle">
              L'ensemble du contenu de ce site (textes, visuels, code source,
              charte graphique) est la propriété exclusive de Noven Studio, sauf
              mention contraire. Toute reproduction ou représentation, totale ou
              partielle, est interdite sans autorisation écrite préalable. Les
              livrables réalisés dans le cadre d'une prestation font l'objet
              d'une cession de droits encadrée à la section{" "}
              <a href="#legal-02" className="link-underline text-ink">
                Conditions générales de vente
              </a>
              .
            </Row>
          </Section>

          <Section {...sections[1]}>
            <Row label="Objet">
              Les présentes CGV régissent la relation entre Noven Studio
              («&nbsp;le Prestataire&nbsp;») et tout client («&nbsp;le
              Client&nbsp;») souscrivant à une prestation de refonte ou création
              de site web.
            </Row>
            <Row label="Description de la prestation">
              Pack Refonte / Création : design sur-mesure (5 à 7 pages), site
              responsive, formulaire de contact fonctionnel, newsletter
              connectée, statistiques Google Analytics, conformité RGPD, repo
              GitHub et Vercel au nom du client, passation à la livraison —
              1&nbsp;600&nbsp;€ HT. Option SEO Complet (recherche mots-clés,
              Schema.org, 3 articles rédigés) : 500&nbsp;€ HT, sur souscription
              séparée. Maintenance mensuelle (modifications, support 48h, 1
              section par trimestre) : 120&nbsp;€/mois, contrat séparé et
              optionnel, jamais incluse dans le total de la prestation initiale.
            </Row>
            <Row label="Délai de livraison">
              14 jours calendaires à compter de la réception de l'acompte ET des
              éléments fournis par le client. Tout retard dans la transmission
              des éléments entraîne un report du délai.
            </Row>
            <Row label="Révisions">
              1 round de révisions est inclus. Toute demande supplémentaire fait
              l'objet d'un devis complémentaire au tarif de 80&nbsp;€/heure.
            </Row>
            <Row label="Paiement">
              Acompte de 50&nbsp;% à la signature. Solde de 50&nbsp;% à la
              livraison, payable sous 7 jours. Pénalités de retard : 3 fois le
              taux d'intérêt légal en vigueur, applicables dès le premier jour de
              retard. À ces pénalités s'ajoute, de plein droit, une indemnité
              forfaitaire pour frais de recouvrement de 40&nbsp;€ par facture
              impayée (art. L441-10 du Code de commerce). Lorsque les frais de
              recouvrement exposés sont supérieurs à ce montant forfaitaire, une
              indemnisation complémentaire peut être demandée sur justificatifs.
            </Row>
            <Row label="Droit de rétractation">
              Les prestations de Noven Studio s'adressent à des professionnels
              agissant dans le cadre de leur activité. Conformément à l'article
              L221-3 du Code de la consommation, le droit de rétractation ne
              s'applique pas aux contrats conclus entre professionnels dès lors
              que l'objet du contrat entre dans le champ de l'activité principale
              du Client et que celui-ci emploie au moins cinq salariés. En dehors
              de ce cas, le Client professionnel assimilé à un consommateur
              dispose d'un délai de quatorze jours à compter de la conclusion du
              contrat pour se rétracter, par courrier ou par email aux
              coordonnées de la section Contact. Le Client qui demande
              expressément l'exécution de la prestation avant l'expiration de ce
              délai reste redevable du montant correspondant au travail déjà
              accompli.
            </Row>
            <Row label="Propriété intellectuelle et cession">
              À compter du règlement intégral, le Client devient propriétaire des
              éléments livrés. Noven Studio conserve le droit de présenter le
              projet réalisé dans son portfolio, sauf opposition écrite du Client
              dans les 30 jours suivant la livraison.
            </Row>
            <Row label="Obligations du Client">
              Fournir les éléments nécessaires (textes, visuels, informations)
              dans un délai raisonnable ; les délais de livraison sont suspendus
              dans l'attente d'un retour. Le Client garantit détenir les droits
              sur les éléments transmis.
            </Row>
            <Row label="Résiliation">
              En cas d'annulation par le Client après signature, l'acompte versé
              reste acquis à Noven Studio à titre d'indemnité forfaitaire.
            </Row>
            <Row label="Droit applicable">
              Droit français. En cas de litige, les parties recherchent une
              solution amiable avant tout recours judiciaire. Plateforme
              européenne de règlement en ligne :{" "}
              <Ext href="https://ec.europa.eu/consumers/odr">
                ec.europa.eu/consumers/odr
              </Ext>
            </Row>
          </Section>

          <Section {...sections[2]}>
            <Row label="Acceptation">
              L'accès au site implique l'acceptation sans réserve des présentes
              CGU.
            </Row>
            <Row label="Accès au service">
              Le site est accessible 24h/24, sauf interruption pour maintenance
              ou cas de force majeure.
            </Row>
            <Row label="Comportements interdits">
              L'utilisateur s'engage à ne pas utiliser le site à des fins
              illicites, à ne pas porter atteinte à son intégrité technique, ni à
              reproduire son contenu sans autorisation.
            </Row>
            <Row label="Liens externes">
              Noven Studio n'exerce aucun contrôle sur les sites tiers
              éventuellement liés et décline toute responsabilité quant à leur
              contenu.
            </Row>
            <Row label="Modification">
              Les présentes CGU peuvent être modifiées à tout moment. La version
              applicable est celle en ligne au jour de la consultation.
            </Row>
          </Section>

          <Section {...sections[3]}>
            <Row label="Responsable du traitement">
              Nathan GBEDA — Noven Studio, coordonnées en section{" "}
              <a href="#legal-01" className="link-underline text-ink">
                Mentions légales
              </a>
              .
            </Row>
            <Row label="Données collectées">
              À ce jour, ce site ne comporte aucun formulaire de collecte de
              données ni outil de mesure d'audience. Les polices de caractères
              sont hébergées sur nos propres serveurs : aucune requête vers un
              service tiers n'est émise lors du chargement des pages, et aucun
              tiers ne reçoit donc votre adresse IP à cette occasion. Si vous
              nous contactez par email, les informations transmises (nom, email,
              message) sont utilisées uniquement pour répondre à votre demande et
              ne sont ni conservées au-delà du traitement de l'échange, ni cédées
              à des tiers.
            </Row>
            <Row label="Hébergement et transfert hors UE">
              Le site est hébergé par Vercel Inc., société établie aux
              États-Unis. À ce titre, les journaux techniques du serveur (adresse
              IP, horodatage, page demandée), conservés à des fins de sécurité et
              de fonctionnement, font l'objet d'un transfert hors de l'Union
              européenne, encadré par les clauses contractuelles types de la
              Commission européenne.
            </Row>
            <Row label="Prise de rendez-vous">
              Le bouton de prise de rendez-vous est un lien sortant vers Cal.com,
              qui n'est ni intégré ni chargé dans nos pages : aucune donnée ne
              lui est transmise tant que vous ne cliquez pas. Une fois sur son
              site, les données que vous y saisissez relèvent de la politique de
              confidentialité de Cal.com, responsable de traitement distinct.
            </Row>
            <Row label="Vos droits">
              Conformément au RGPD, vous disposez d'un droit d'accès, de
              rectification, d'effacement, de limitation et d'opposition sur vos
              données. Pour l'exercer, contactez <Mail />. Vous pouvez également
              saisir la CNIL (<Ext href="https://www.cnil.fr">cnil.fr</Ext>).
            </Row>
            <Row label="Évolution">
              Cette politique sera mise à jour si le site intègre à l'avenir un
              formulaire, une newsletter ou un outil de mesure d'audience.
            </Row>
          </Section>

          <Section {...sections[4]}>
            <p>
              Ce site n'utilise actuellement aucun cookie non essentiel (pas de
              mesure d'audience, pas de cookie publicitaire ou tiers). Seuls des
              cookies strictement techniques, indispensables au bon
              fonctionnement du site, peuvent être déposés — sans consentement
              requis pour ceux-ci.
            </p>
            <p>
              Si un outil de mesure d'audience ou de suivi est ajouté
              ultérieurement, un bandeau de consentement conforme sera mis en
              place avant toute collecte, et cette page sera mise à jour en
              conséquence.
            </p>
          </Section>

          <Section {...sections[5]}>
            <p>
              Pour toute question relative aux présentes mentions, ou pour
              exercer vos droits :
            </p>
            <Row label="Par email">
              <Mail />
            </Row>
            <Row label="Par courrier">
              88 Rue Edouard Vaillant, 93700 Drancy
            </Row>
            <Row label="Médiation">
              En cas de litige non résolu à l'amiable, un client consommateur
              peut saisir gratuitement un médiateur de la consommation.
            </Row>
            <div className="pt-4">
              <Button href="mailto:novenstudio.design@gmail.com">
                Nous écrire
              </Button>
            </div>
          </Section>
        </div>
      </div>
    </article>
  );
}
