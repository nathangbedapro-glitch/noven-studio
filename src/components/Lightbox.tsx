import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { useDialog } from "../hooks/useDialog";
import type { GalleryImage } from "../data/projects";

/** Cible tactile de 44×44 px, fond opaque : lisible quelle que soit l'image dessous. */
const commande =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors";

function Chevron({ vers }: { vers: "gauche" | "droite" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={vers === "gauche" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

/**
 * Visionneuse plein écran. `index` à null = fermée : l'état vit chez le parent
 * pour que la miniature déclenchante reste identifiable au retour du focus.
 */
export default function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: GalleryImage[];
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;
  const panelRef = useDialog<HTMLDivElement>(open, onClose);
  const compteurId = useId();

  // Flèches du clavier, en boucle. Le hook occupe déjà la phase de capture
  // pour Échap et Tab ; celui-ci écoute au bouillonnement.
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const pas = e.key === "ArrowLeft" ? -1 : 1;
      onIndexChange((index + pas + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, images.length, onIndexChange]);

  if (index === null) return null;

  const image = images[index];
  const plusieurs = images.length > 1;
  const aller = (pas: number) =>
    onIndexChange((index + pas + images.length) % images.length);

  // Ferme sur le fond uniquement : un clic sur l'image ou une commande ne
  // remonte pas jusqu'ici.
  const fermerSiFond = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    // Fond opaque, pas translucide : à 95 % la nav transparaissait derrière,
    // et le contraste du compteur dépendait de la page rendue dessous.
    <div
      className="lightbox-overlay fixed inset-0 z-[100] bg-ink p-4 sm:p-6"
      onClick={fermerSiFond}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={compteurId}
        className="mx-auto flex h-full w-full max-w-[1100px] flex-col gap-4"
        onClick={fermerSiFond}
      >
        <div className="flex shrink-0 items-center justify-between gap-4">
          {/*
            Ce compteur sert deux fois : nom accessible du dialogue, donc annoncé
            à l'ouverture, et région live, donc réannoncé à chaque changement
            d'image. Une seule source, pas de texte dupliqué pour l'oreille.
          */}
          <p
            id={compteurId}
            aria-live="polite"
            aria-atomic="true"
            className="text-[14px] font-medium uppercase tracking-[0.14em] text-paper"
          >
            Image {index + 1} sur {images.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la visionneuse"
            className={`${commande} -mr-2 bg-paper text-ink hover:bg-terracotta hover:text-paper`}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div
          className="relative flex min-h-0 flex-1 items-center justify-center"
          onClick={fermerSiFond}
        >
          {/* La `key` relance l'animation d'apparition à chaque changement. */}
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className="lightbox-media max-h-full max-w-full rounded-[3px] object-contain"
          />

          {plusieurs && (
            <>
              <button
                type="button"
                onClick={() => aller(-1)}
                aria-label="Image précédente"
                className={`${commande} absolute left-0 top-1/2 -translate-y-1/2 bg-paper text-ink hover:bg-terracotta hover:text-paper`}
              >
                <Chevron vers="gauche" />
              </button>
              <button
                type="button"
                onClick={() => aller(1)}
                aria-label="Image suivante"
                className={`${commande} absolute right-0 top-1/2 -translate-y-1/2 bg-paper text-ink hover:bg-terracotta hover:text-paper`}
              >
                <Chevron vers="droite" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
