export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`inline-flex min-h-11 flex-col items-center justify-center leading-none ${className}`}
    >
      <span
        className="font-serif text-[28px] font-semibold tracking-tight text-ink"
        style={{ lineHeight: 1 }}
      >
        N<span className="text-terracotta">o</span>ven
      </span>
      {/*
        Centrage explicite : `items-center` centre chaque ligne sur l'autre au
        lieu de les caler à gauche dans un conteneur dimensionné par la plus
        large. La marge droite négative retire l'interlettrage que la police
        ajoute après le dernier glyphe, sans quoi le bloc paraîtrait décalé
        d'une demi-chasse vers la gauche.
      */}
      <span className="-mr-[0.28em] mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
        — Studio —
      </span>
    </a>
  );
}
