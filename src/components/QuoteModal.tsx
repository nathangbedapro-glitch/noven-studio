import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

/** Formulaire « Noven Studio — Devis », distinct de celui du site Mahbouli. */
const WEB3FORMS_KEY = "53e2f4b0-c88b-4381-a17e-034ae1ca0e6b";
const BESOIN_MAX = 200;

/**
 * Le brouillon vit chez le parent : fermer la modale sans envoyer ne doit rien
 * effacer. Il n'est remis à zéro qu'après un envoi réussi.
 */
export type Brouillon = {
  nom: string;
  email: string;
  profession: string;
  besoin: string;
  seo: boolean;
  boutique: boolean;
  maintenance: boolean;
  siteActuel: string;
};

export const BROUILLON_VIDE: Brouillon = {
  nom: "",
  email: "",
  profession: "",
  besoin: "",
  seo: false,
  boutique: false,
  maintenance: false,
  siteActuel: "",
};

type Status = "idle" | "sending" | "sent" | "error";

const champ =
  "w-full rounded-[3px] border border-hairline bg-paper px-4 py-3 text-[16px] text-ink placeholder:text-muted";
const label = "block text-[14px] font-medium text-ink";

export default function QuoteModal({
  open,
  onClose,
  brouillon,
  onChange,
  onEnvoye,
}: {
  open: boolean;
  onClose: () => void;
  brouillon: Brouillon;
  onChange: (b: Brouillon) => void;
  onEnvoye: () => void;
}) {
  const titreId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const titreRef = useRef<HTMLHeadingElement>(null);
  const declencheurRef = useRef<Element | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [nomEnvoye, setNomEnvoye] = useState("");

  const maj = <K extends keyof Brouillon>(cle: K, valeur: Brouillon[K]) =>
    onChange({ ...brouillon, [cle]: valeur });

  // Focus dans la modale à l'ouverture ; à la fermeture, on rend le focus au
  // déclencheur et on repasse en `idle` — l'écran de confirmation ne doit pas
  // réapparaître à la réouverture.
  useEffect(() => {
    if (!open) return;
    declencheurRef.current = document.activeElement;
    const premier = panelRef.current?.querySelector<HTMLElement>(
      "input, textarea, button",
    );
    premier?.focus();
    return () => {
      (declencheurRef.current as HTMLElement | null)?.focus?.();
      setStatus("idle");
    };
  }, [open]);

  // Le dialogue est déjà ouvert quand le titre passe à la confirmation : sans
  // déplacer le focus, le lecteur d'écran ne réannoncerait rien. Le titre est
  // focusable (tabIndex -1) uniquement pour cela, il reste hors tabulation.
  useEffect(() => {
    if (status === "sent") titreRef.current?.focus();
  }, [status]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const cibles = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!cibles || cibles.length === 0) return;
      const premier = cibles[0];
      const dernier = cibles[cibles.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open, onClose]);

  // Empêche la page de défiler derrière la modale.
  useEffect(() => {
    if (!open) return;
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = avant;
    };
  }, [open]);

  if (!open) return null;

  const options = [
    brouillon.seo && "SEO Complet (+500 €)",
    brouillon.boutique && "Boutique en ligne (+700 €)",
    brouillon.maintenance && "Maintenance mensuelle (120 €/mois)",
  ].filter(Boolean);

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const reponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: options.length
            ? `Demande de devis — Pack + ${options.length} option(s)`
            : "Demande de devis — Pack seul",
          from_name: "Noven Studio",
          "Prénom et nom": brouillon.nom,
          Email: brouillon.email,
          "Profession / secteur": brouillon.profession,
          Besoin: brouillon.besoin,
          "Options souhaitées": options.length ? options.join(", ") : "Aucune",
          "Site actuel": brouillon.siteActuel.trim() || "Non communiqué",
        }),
      });
      const data = await reponse.json();
      if (data.success) {
        setNomEnvoye(brouillon.nom.trim());
        setStatus("sent");
        onEnvoye();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return createPortal(
    <div
      className="modal-overlay fixed inset-0 z-[100] flex items-end justify-center bg-ink/50 sm:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titreId}
        className="modal-panel max-h-[92vh] w-full overflow-y-auto rounded-t-[12px] bg-paper px-6 pb-8 pt-6 sm:max-w-[540px] sm:rounded-[3px] sm:px-10 sm:pb-10 sm:pt-8"
      >
        <div className="flex items-start justify-between gap-4">
          {/*
            Même id dans les deux états : `aria-labelledby` suit donc le titre
            courant sans rien à changer. La coche est décorative — le texte dit
            déjà le succès — donc masquée aux lecteurs d'écran pour que le nom
            accessible reste « Demande bien reçue ».
          */}
          <h2
            id={titreId}
            ref={titreRef}
            tabIndex={-1}
            className="font-serif text-[clamp(1.75rem,5vw,2.25rem)] font-medium leading-tight tracking-[-0.01em]"
          >
            {status === "sent" ? (
              <>
                Demande bien reçue <span aria-hidden="true">✅</span>
              </>
            ) : (
              "Demander un devis"
            )}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink/70 transition-colors hover:text-terracotta"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {status === "sent" ? (
          <div className="mt-8">
            <p className="font-serif text-[1.375rem] leading-snug text-ink">
              Merci {nomEnvoye} — je reviens vers vous sous{" "}
              <span className="text-terracotta">24h</span> avec votre devis
              personnalisé.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              Un email de confirmation n'est pas envoyé automatiquement : si vous
              ne recevez rien sous 24h, écrivez-nous directement à{" "}
              <span className="text-terracotta">novenstudio.design@gmail.com</span>
              .
            </p>
            <div className="mt-8">
              <Button onClick={onClose} fullWidth>
                Fermer
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={envoyer} className="mt-7 space-y-5">
            <div>
              <label htmlFor="devis-nom" className={label}>
                Prénom et nom
              </label>
              <input
                id="devis-nom"
                name="nom"
                type="text"
                required
                autoComplete="name"
                value={brouillon.nom}
                onChange={(e) => maj("nom", e.target.value)}
                className={`mt-2 ${champ}`}
              />
            </div>

            <div>
              <label htmlFor="devis-email" className={label}>
                Email
              </label>
              <input
                id="devis-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={brouillon.email}
                onChange={(e) => maj("email", e.target.value)}
                className={`mt-2 ${champ}`}
              />
            </div>

            <div>
              <label htmlFor="devis-profession" className={label}>
                Profession / secteur
              </label>
              <input
                id="devis-profession"
                name="profession"
                type="text"
                required
                value={brouillon.profession}
                onChange={(e) => maj("profession", e.target.value)}
                placeholder="Avocat, kiné, coach, nutritionniste…"
                className={`mt-2 ${champ}`}
              />
            </div>

            <div>
              <label htmlFor="devis-besoin" className={label}>
                Votre besoin en quelques mots
              </label>
              <textarea
                id="devis-besoin"
                name="besoin"
                required
                rows={4}
                maxLength={BESOIN_MAX}
                value={brouillon.besoin}
                onChange={(e) => maj("besoin", e.target.value)}
                className={`mt-2 resize-none ${champ}`}
              />
              <p className="mt-1.5 text-right text-[14px] text-muted">
                {brouillon.besoin.length}/{BESOIN_MAX}
              </p>
            </div>

            {/*
              Groupe de cases : le <fieldset> et sa <legend> donnent aux lecteurs
              d'écran le contexte commun aux trois options. La cible tactile est
              le <label> entier (min-h-11), pas la case de 20px.
            */}
            <fieldset className="border-0 p-0">
              <legend className={`${label} mb-1`}>
                Options souhaitées (facultatif)
              </legend>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[16px] text-ink">
                <input
                  type="checkbox"
                  name="seo"
                  checked={brouillon.seo}
                  onChange={(e) => maj("seo", e.target.checked)}
                  className="h-5 w-5 shrink-0 accent-terracotta"
                />
                SEO Complet (+500&nbsp;€)
              </label>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[16px] text-ink">
                <input
                  type="checkbox"
                  name="boutique"
                  checked={brouillon.boutique}
                  onChange={(e) => maj("boutique", e.target.checked)}
                  className="h-5 w-5 shrink-0 accent-terracotta"
                />
                Boutique en ligne (+700&nbsp;€)
              </label>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[16px] text-ink">
                <input
                  type="checkbox"
                  name="maintenance"
                  checked={brouillon.maintenance}
                  onChange={(e) => maj("maintenance", e.target.checked)}
                  className="h-5 w-5 shrink-0 accent-terracotta"
                />
                Maintenance mensuelle (120&nbsp;€/mois)
              </label>
            </fieldset>

            <div>
              <label htmlFor="devis-site" className={label}>
                Lien de votre site actuel (si vous en avez un)
              </label>
              <input
                id="devis-site"
                name="siteActuel"
                type="url"
                inputMode="url"
                value={brouillon.siteActuel}
                onChange={(e) => maj("siteActuel", e.target.value)}
                placeholder="https://…"
                className={`mt-2 ${champ}`}
              />
            </div>

            {status === "error" && (
              <p
                role="alert"
                className="rounded-[3px] border border-terracotta bg-terracotta/10 px-4 py-3 text-[16px] leading-relaxed text-ink"
              >
                L'envoi a échoué. Vérifiez votre connexion et réessayez — ou
                écrivez-nous directement à novenstudio.design@gmail.com.
              </p>
            )}

            <Button type="submit" fullWidth disabled={status === "sending"}>
              {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
            </Button>

            <p className="text-[14px] leading-relaxed text-muted">
              Vos données servent uniquement à répondre à cette demande et ne
              sont pas cédées à des tiers. Voir la{" "}
              <a
                href="#legal-04"
                onClick={onClose}
                className="link-underline text-ink"
              >
                politique de confidentialité
              </a>
              .
            </p>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
