export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className="font-serif text-[28px] font-semibold tracking-tight text-ink"
        style={{ lineHeight: 1 }}
      >
        N<span className="text-terracotta">o</span>ven
      </span>
      <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-[#888]">
        — Studio —
      </span>
    </a>
  );
}
