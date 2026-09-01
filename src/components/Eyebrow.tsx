export default function Eyebrow({ children }: { children: string }) {
  return (
    <span className="block text-[11px] font-medium uppercase tracking-[0.24em] text-terracotta">
      {children}
    </span>
  );
}
