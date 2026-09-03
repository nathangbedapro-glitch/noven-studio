import type { MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  /** Opens in a new tab. Sets `rel` itself so `noopener` is never forgotten. */
  external?: boolean;
  /** Rend un vrai <button> au lieu d'un lien : pour une action, pas une navigation. */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  href = "#contact",
  variant = "primary",
  fullWidth = false,
  external = false,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: Props) {
  const base =
    // Pas d'utilitaire focus-visible ici : ils neutralisaient la règle globale
    // d'index.css et laissaient l'anneau par défaut du navigateur s'afficher.
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-[16px] font-medium transition-all duration-200 ease-out active:scale-[0.97]";

  const variants = {
    primary:
      "bg-terracotta text-paper hover:bg-terracotta-hover hover:scale-[1.015] shadow-[0_1px_2px_rgba(26,26,26,0.08)]",
    secondary:
      "border border-hairline bg-transparent text-ink hover:border-terracotta hover:text-terracotta",
  };

  const classes = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${disabled ? "cursor-not-allowed opacity-60" : ""} ${className}`;

  // Une action ouvre une modale, elle ne navigue pas : un <a href> serait
  // annoncé comme un lien et suivrait la touche Entrée sans déclencher l'action.
  if (onClick || type === "submit") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {children}
    </a>
  );
}
