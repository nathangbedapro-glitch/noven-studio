import Eyebrow from "./Eyebrow";
import { useReveal } from "../hooks/useReveal";

const steps = [
  {
    n: "01",
    title: "Découverte",
    text: "Nous échangeons 30 minutes sur votre pratique et vos besoins.",
  },
  {
    n: "02",
    title: "Devis",
    text: "Vous recevez un devis détaillé et un rétroplanning sur 14 jours.",
  },
  {
    n: "03",
    title: "Design",
    text: "Je conçois vos maquettes sur mesure.",
  },
  {
    n: "04",
    title: "Développement",
    text: "Je code et déploie votre site.",
  },
  {
    n: "05",
    title: "Livraison",
    text: "Vous récupérez votre site, votre repo et vos accès.",
  },
];

export default function Workflow() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="bg-beige px-6 py-24 md:px-10 md:py-32">
      <div ref={ref} className="reveal mx-auto max-w-[1200px]">
        <Eyebrow>La méthode</Eyebrow>
        <h2 className="mt-5 font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.01em]">
          Comment ça se passe
        </h2>

        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-hairline pt-5">
              <span className="block font-serif text-[3.5rem] font-medium leading-none text-terracotta">
                {s.n}
              </span>
              <h3 className="mt-5 text-[16px] font-semibold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
