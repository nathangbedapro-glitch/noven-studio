import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDialog } from "../hooks/useDialog";
import type { GalleryImage } from "../data/projects";

/**
 * En dessous de ce ratio, contraindre l'image en hauteur la réduirait à une
 * largeur où son texte devient illisible. Elle passe alors en mode document :
 * pleine largeur, hauteur libre, conteneur défilant. Le seuil s'applique au
 * ratio réel lu à l'affichage, jamais à une liste de fichiers codée en dur.
 */
export const RATIO_DOCUMENT = 0.8;
export const estFormatDocument = (ratio: number) => ratio < RATIO_DOCUMENT;

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
  const docRef = useRef<HTMLDivElement>(null);

  // Ratio mesuré sur l'image affichée. `null` tant qu'on ne sait pas : on
  // reste alors en mode standard, qui est le cas des huit images sur neuf.
  const [ratio, setRatio] = useState<number | null>(null);
  const mesurer = (img: HTMLImageElement | null) => {
    if (!img) return;
    setRatio(img.naturalWidth ? img.naturalWidth / img.naturalHeight : null);
  };

  // Un changement d'image repart en haut du document, comme un nouveau PDF.
  useEffect(() => {
    docRef.current?.scrollTo({ top: 0 });
  }, [index]);

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
  const modeDocument = ratio !== null && estFormatDocument(ratio);
  const aller = (pas: number) =>
    onIndexChange((index + pas + images.length) % images.length);

  // Ferme sur le fond uniquement : un clic sur l'image ou une commande ne
  // remonte pas jusqu'ici.
  const fermerSiFond = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    // Fond volontairement pas tout à fait opaque : on devine la page derrière,
    // et le flou la réduit à une texture plutôt qu'à un contenu lisible qui
    // distrairait. Le compteur reste à 11,74:1 dessus, mesuré sur --paper, le
    // fond de page le plus clair du site donc le pire cas.
    <div
      className="lightbox-overlay fixed inset-0 z-[100] bg-ink/88 p-4 backdrop-blur-[8px] sm:p-6"
      onClick={fermerSiFond}
    >
      {/*
        Le panneau est la grille : le placement de chaque enfant vient de
        `grid-area`, ce qui laisse l'ordre du DOM — et donc la tabulation —
        identique dans les deux dispositions.
      */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={compteurId}
        className={`lightbox-grid mx-auto h-full w-full max-w-[1100px] ${
          plusieurs ? "" : "lightbox-grid--solo"
        }`}
        onClick={fermerSiFond}
      >
        {/*
          Ce compteur sert deux fois : nom accessible du dialogue, donc annoncé
          à l'ouverture, et région live, donc réannoncé à chaque changement
          d'image. Une seule source, pas de texte dupliqué pour l'oreille.
        */}
        <p
          id={compteurId}
          aria-live="polite"
          aria-atomic="true"
          className="lightbox-count text-[14px] font-medium uppercase tracking-[0.14em] text-paper"
        >
          Image {index + 1} sur {images.length}
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la visionneuse"
          className={`lightbox-close ${commande} bg-paper text-ink hover:bg-terracotta hover:text-paper`}
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

        {/*
          La `key` relance l'animation d'apparition à chaque changement.
          En mode document l'image n'est plus contrainte en hauteur : c'est le
          conteneur qui l'est, et qui défile. Il est focalisable pour que les
          flèches haut/bas le fassent défiler au clavier — sans quoi la zone
          serait inatteignable autrement qu'à la souris.
        */}
        {modeDocument ? (
          <div
            ref={docRef}
            tabIndex={0}
            role="region"
            aria-label="Image au format document, défilement vertical"
            className="lightbox-doc"
          >
            <img
              key={image.src}
              ref={mesurer}
              onLoad={(e) => mesurer(e.currentTarget)}
              src={image.src}
              alt={image.alt}
            />
          </div>
        ) : (
          <img
            key={image.src}
            ref={mesurer}
            onLoad={(e) => mesurer(e.currentTarget)}
            src={image.src}
            alt={image.alt}
            className="lightbox-media max-h-full max-w-full rounded-[3px] object-contain"
          />
        )}

        {plusieurs && (
          <>
            <button
              type="button"
              onClick={() => aller(-1)}
              aria-label="Image précédente"
              className={`lightbox-prev ${commande} bg-paper text-ink hover:bg-terracotta hover:text-paper`}
            >
              <Chevron vers="gauche" />
            </button>
            <button
              type="button"
              onClick={() => aller(1)}
              aria-label="Image suivante"
              className={`lightbox-next ${commande} bg-paper text-ink hover:bg-terracotta hover:text-paper`}
            >
              <Chevron vers="droite" />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
