/**
 * Surtitre. `as` permet d'en faire un vrai titre quand il nomme une section,
 * sans dupliquer le style ailleurs.
 */
export default function Eyebrow({
  children,
  as: Tag = "span",
}: {
  children: string;
  as?: "span" | "h2";
}) {
  return (
    <Tag className="block text-[14px] font-medium uppercase tracking-[0.24em] text-terracotta">
      {children}
    </Tag>
  );
}
