import Logo from "./Logo";

const legalLinks = [
  { label: "Mentions légales", href: "#" },
  { label: "Politique de confidentialité", href: "#" },
  // TODO: placeholder from the prototype — point this at the real Noven Studio
  // LinkedIn page before going live.
  { label: "LinkedIn", href: "https://www.linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline px-6 py-14 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-3 md:gap-8">
        <div>
          <Logo />
          <p className="mt-4 font-serif text-[1.25rem] italic text-ink/80">
            Design qui transforme.
          </p>
        </div>

        <nav className="flex flex-col gap-3 md:items-center md:justify-start">
          {legalLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="link-underline w-fit text-[15px] text-ink/75 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2 md:items-end md:text-right">
          <a
            href="mailto:nathan@novenstudio.fr"
            className="link-underline w-fit text-[15px] text-ink/75 hover:text-ink md:self-end"
          >
            nathan@novenstudio.fr
          </a>
          <p className="text-[13px] text-muted">
            © 2026 Noven Studio — Fait à Paris
          </p>
        </div>
      </div>
    </footer>
  );
}
