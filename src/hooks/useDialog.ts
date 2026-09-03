import { useEffect, useRef } from "react";

/**
 * Comportement commun à toute fenêtre modale : focus placé dedans à
 * l'ouverture, piège clavier tant qu'elle est ouverte, Échap pour fermer,
 * défilement de la page bloqué derrière, et focus rendu au déclencheur à la
 * fermeture. Le balisage (role, aria-modal, portail) reste à l'appelant.
 *
 * La modale de devis, sur sa propre branche, porte encore cette logique en
 * interne : elle pourra adopter ce hook tel quel une fois les deux fusionnées.
 */
export function useDialog<T extends HTMLElement = HTMLDivElement>(
  open: boolean,
  onClose: () => void,
) {
  const panelRef = useRef<T>(null);
  const declencheurRef = useRef<Element | null>(null);

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

  return panelRef;
}
