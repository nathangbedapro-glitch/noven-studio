import { useState } from "react";
import Eyebrow from "./Eyebrow";
import Contact from "./Contact";
import Lightbox from "./Lightbox";
import MediaFrame from "./MediaFrame";
import { useReveal } from "../hooks/useReveal";
import type { GalleryImage, Project } from "../data/projects";

function MetaRow({ p }: { p: Project }) {
  const items = [p.year, p.role, p.industry];
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] font-medium uppercase tracking-[0.14em] text-muted">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-4">
          {i > 0 && <span className="h-3 w-px bg-hairline" aria-hidden="true" />}
          {item}
        </span>
      ))}
    </div>
  );
}

/**
 * Grille de visuels complémentaires. Le nombre de colonnes suit le nombre
 * d'images pour ne jamais laisser de trou en fin de ligne : 3 colonnes quand le
 * total est un multiple de 3, 2 colonnes sinon — et dans ce dernier cas, une
 * image orpheline en fin de grille prend toute la largeur.
 */
function Gallery({ images }: { images: GalleryImage[] }) {
  const colonnes =
    images.length % 3 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  const orpheline = images.length % 3 !== 0 && images.length % 2 === 1;
  // L'index vit ici : la visionneuse peut ainsi rendre le focus à la miniature
  // exacte qui l'a ouverte, et non au corps du document.
  const [agrandie, setAgrandie] = useState<number | null>(null);

  return (
    <section className="px-6 pb-24 md:px-10 md:pb-32">
      <div className="mx-auto max-w-[1000px]">
        <Eyebrow as="h2">Galerie</Eyebrow>
        {/* Le reset Tailwind retire la sémantique de liste dans Safari : role la rétablit. */}
        <ul role="list" className={`mt-8 grid grid-cols-1 gap-6 ${colonnes}`}>
          {images.map((img, i) => (
            <li
              key={img.src}
              className={
                orpheline && i === images.length - 1 ? "sm:col-span-2" : ""
              }
            >
              {/*
                Un vrai <button> plutôt qu'une image cliquable : Entrée et
                Espace fonctionnent sans code, et le rôle est annoncé.
              */}
              <button
                type="button"
                onClick={() => setAgrandie(i)}
                aria-label={`Agrandir l'image ${i + 1} sur ${images.length}`}
                className="group block w-full cursor-pointer overflow-hidden rounded-[3px]"
              >
                {/* Toujours sous la ligne de flottaison au chargement de la page. */}
                <MediaFrame
                  src={img.src}
                  alt={img.alt}
                  ratio="4/3"
                  loading="lazy"
                  mediaClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        images={images}
        index={agrandie}
        onIndexChange={setAgrandie}
        onClose={() => setAgrandie(null)}
      />
    </section>
  );
}

export default function ProjectDetail({ project: p }: { project: Project }) {
  const ref = useReveal<HTMLDivElement>();
  // Un tableau vide compte comme absent : pas de section sans contenu.
  const galerie = p.gallery?.length ? p.gallery : null;

  return (
    <article>
      <div ref={ref} className="reveal">
        {/* Section A — Header */}
        <header className="px-6 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-[820px]">
            <a
              href="#realisations"
              className="link-underline text-[14px] font-medium text-terracotta"
            >
              ← Retour aux réalisations
            </a>
            <div className="mt-10">
              <Eyebrow>{p.type}</Eyebrow>
              <h1 className="mt-5 font-serif text-[clamp(3rem,7vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.01em]">
                {p.name}
              </h1>
              <MetaRow p={p} />
            </div>
          </div>
        </header>

        {/* Section B — Visual */}
        <div className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1000px]">
            <MediaFrame
              src={p.image}
              alt={p.imageAlt ?? `Aperçu du site ${p.name}`}
              label={p.visual}
              ratio="16/9"
              labelClassName="text-[1.125rem]"
            />
          </div>
        </div>

        {/* Section C — Le défi */}
        <section className="px-6 pb-16 md:px-10 md:pb-24">
          <div className="mx-auto max-w-[720px]">
            <Eyebrow as="h2">Le défi</Eyebrow>
            <p className="mt-6 font-serif text-[clamp(1.375rem,3vw,1.5rem)] font-normal italic leading-[1.4] text-ink">
              {p.challenge}
            </p>
          </div>
        </section>

        {/* Section D — La solution */}
        <section className="px-6 pb-16 md:px-10 md:pb-24">
          <div className="mx-auto max-w-[720px]">
            <Eyebrow as="h2">La solution</Eyebrow>
            <p className="mt-6 text-[16px] leading-relaxed text-ink/85">
              {p.solution}
            </p>
            {p.solutionBullets && (
              <ul className="mt-7 space-y-3.5">
                {p.solutionBullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[16px] leading-snug text-ink/85"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Section E — L'impact */}
        <section
          className={`px-6 md:px-10 ${
            galerie ? "pb-16 md:pb-24" : "pb-24 md:pb-32"
          }`}
        >
          <div className="mx-auto max-w-[720px]">
            <Eyebrow as="h2">L'impact</Eyebrow>
            {p.impactStats ? (
              <>
                <div className="mt-8 flex flex-wrap gap-x-16 gap-y-8">
                  {p.impactStats.map((s) => (
                    <div key={s.label}>
                      <span className="block font-serif text-[3rem] font-medium leading-none text-terracotta">
                        {s.value}
                      </span>
                      <span className="mt-3 block max-w-[16ch] text-[14px] leading-snug text-muted">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-10 text-[16px] leading-relaxed text-ink/85">
                  {p.impact}
                </p>
              </>
            ) : (
              <p className="mt-6 text-[16px] leading-relaxed text-ink/85">
                {p.impact}
              </p>
            )}
          </div>
        </section>

        {/* Section F — Galerie (absente quand le projet n'a pas de visuels) */}
        {galerie && <Gallery images={galerie} />}
      </div>

      {/* Section G — CTA (reused Contact) */}
      <Contact />
    </article>
  );
}
