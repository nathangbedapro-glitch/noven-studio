import Eyebrow from "./Eyebrow";

type Props = {
  eyebrow?: string;
  title: string;
  className?: string;
};

/**
 * Design system section heading: optional eyebrow above a serif h2 set at the
 * `--text-section` scale, clamp(2.5rem, 5vw, 3.75rem).
 */
export default function SectionHeading({
  eyebrow,
  title,
  className = "",
}: Props) {
  return (
    <header className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={`${eyebrow ? "mt-5 " : ""}font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.01em]`}
      >
        {title}
      </h2>
    </header>
  );
}
