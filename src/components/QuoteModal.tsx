import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

/** Formulaire « Noven Studio — Devis », distinct de celui du site Mahbouli. */
const WEB3FORMS_KEY = "53e2f4b0-c88b-4381-a17e-034ae1ca0e6b";
const BESOIN_MAX = 200;

type Status = "idle" | "sending" | "sent" | "error";

const champ =
  "w-full rounded-[3px] border border-hairline bg-paper px-4 py-3 text-[16px] text-ink placeholder:text-muted";
const label = "block text-[14px] font-medium text-ink";

export default function QuoteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titreId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const declencheurRef = useRef<Element | null>(null);

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [besoin, setBesoin] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [nomEnvoye, setNomEnvoye] = useState("");

  // Mémorise le déclencheur à l'ouverture pour lui rendre le focus à la
  // fermeture, et pose le focus dans la modale.
  useEffect(() => {
    if (!open) return;
    declencheurRef.current = document.activeElement;
    const premier = panelRef.current?.querySelector<HTMLElement>(
      "input, textarea, button",
    );
    premier?.focus();
    return () => {
      (declencheurRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  // Échap ferme, et Tab reste piégé dans la modale.
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
          subject: "Nouvelle demande de devis — Noven Studio",
          from_name: "Noven Studio",
          Nom: nom,
          Email: email,
          "Profession / secteur": profession,
          Besoin: besoin,
        }),
      });
      const data = await reponse.json();
      if (data.success) {
        setNomEnvoye(nom.trim());
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Rendu dans un portail : `position: fixed` est relatif au premier ancêtre
  // transformé, et la section porte `.reveal` (translateY) tandis que la route
  // porte `.route-view` (animation de transform). Sans portail, la modale se
  // retrouve positionnée dans le flux au lieu de couvrir l'écran.
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
          <h2
            id={titreId}
            className="font-serif text-[clamp(1.75rem,5vw,2.25rem)] font-medium leading-tight tracking-[-0.01em]"
          >
            Demander un devis
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
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
              Merci {nomEnvoye} — je reviens vers vous sous 24h avec votre devis
              personnalisé.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              Un email de confirmation n'est pas envoyé automatiquement : si vous
              ne recevez rien sous 24h, écrivez-nous directement à
              novenstudio.design@gmail.com.
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
                Nom
              </label>
              <input
                id="devis-nom"
                name="nom"
                type="text"
                required
                autoComplete="name"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
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
                value={besoin}
                onChange={(e) => setBesoin(e.target.value)}
                className={`mt-2 resize-none ${champ}`}
              />
              <p className="mt-1.5 text-right text-[14px] text-muted">
                {besoin.length}/{BESOIN_MAX}
              </p>
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
              <a href="#legal-04" onClick={onClose} className="link-underline text-ink">
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
