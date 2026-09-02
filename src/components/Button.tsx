import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  /** Opens in a new tab. Sets `rel` itself so `noopener` is never forgotten. */
  external?: boolean;
  className?: string;
};

export default function Button({
  children,
  href = "#contact",
  variant = "primary",
  fullWidth = false,
  external = false,
  className = "",
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-[15px] font-medium transition-all duration-200 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

  const variants = {
    primary:
      "bg-terracotta text-paper hover:bg-terracotta-hover hover:scale-[1.015] shadow-[0_1px_2px_rgba(26,26,26,0.08)]",
    secondary:
      "border border-hairline bg-transparent text-ink hover:border-terracotta hover:text-terracotta",
  };

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </a>
  );
}
