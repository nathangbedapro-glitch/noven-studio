import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "Notre approche", href: "#approche" },
  { label: "Réalisations", href: "#realisations" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Échap referme le menu mobile et rend le focus au bouton.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "border-b border-hairline/70 bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-10">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline inline-flex min-h-11 items-center text-[16px] text-ink/80 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center rounded-full bg-terracotta px-5 py-2 text-[14px] font-medium text-paper transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-terracotta-hover active:scale-[0.97]"
          >
            Contact
          </a>
        </nav>

        <button
          ref={burgerRef}
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-[1.5px] w-6 bg-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-[1.5px] w-6 bg-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-[1.5px] w-6 bg-ink transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-hairline/70 bg-paper/95 backdrop-blur-md transition-[max-height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "max-h-80" : "max-h-0 border-t-transparent"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-[17px] text-ink/85"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-terracotta px-5 py-3 text-center text-[16px] font-medium text-paper"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
