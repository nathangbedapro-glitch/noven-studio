import Eyebrow from "./Eyebrow";
import Contact from "./Contact";
import MediaFrame from "./MediaFrame";
import { useReveal } from "../hooks/useReveal";
import type { Project } from "../data/projects";

function MetaRow({ p }: { p: Project }) {
  const items = [p.year, p.role, p.industry];
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-4">
          {i > 0 && <span className="h-3 w-px bg-hairline" aria-hidden="true" />}
          {item}
        </span>
      ))}
    </div>
  );
}

export default function ProjectDetail({ project: p }: { project: Project }) {
  const ref = useReveal<HTMLDivElement>();

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
            <Eyebrow>Le défi</Eyebrow>
            <p className="mt-6 font-serif text-[clamp(1.375rem,3vw,1.5rem)] font-normal italic leading-[1.4] text-ink">
              {p.challenge}
            </p>
          </div>
        </section>

        {/* Section D — La solution */}
        <section className="px-6 pb-16 md:px-10 md:pb-24">
          <div className="mx-auto max-w-[720px]">
            <Eyebrow>La solution</Eyebrow>
            <p className="mt-6 text-[16px] leading-relaxed text-ink/85">
              {p.solution}
            </p>
            {p.solutionBullets && (
              <ul className="mt-7 space-y-3.5">
                {p.solutionBullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[15px] leading-snug text-ink/85"
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
        <section className="px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-[720px]">
            <Eyebrow>L'impact</Eyebrow>
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
      </div>

      {/* Section F — CTA (reused Contact) */}
      <Contact />
    </article>
  );
}
