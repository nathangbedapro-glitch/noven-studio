type Props = {
  /** Image URL. When absent, the italic serif `label` is shown instead. */
  src?: string;
  /** Required whenever `src` is set — never empty, for screen readers. */
  alt?: string;
  /** Italic serif placeholder shown while artwork is pending. */
  label?: string;
  ratio?: keyof typeof ratios;
  border?: keyof typeof borders;
  className?: string;
  /** Styling hook on the media layer, e.g. a hover zoom driven by a parent group. */
  mediaClassName?: string;
  /** Styling hook on the placeholder text, whose size varies by context. */
  labelClassName?: string;
};

// Tailwind only sees class names that appear literally in the source, so the
// variants are looked up rather than built from the prop.
const ratios = {
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-[16/9]",
  "4/5": "aspect-[4/5]",
};

const borders = {
  hairline: "border border-hairline",
  accent: "border-2 border-terracotta",
};

/**
 * Design system image slot: beige, bordered frame holding either a real image
 * cropped to fill, or an italic serif caption while the artwork is pending.
 */
export default function MediaFrame({
  src,
  alt,
  label,
  ratio = "16/10",
  border = "hairline",
  className = "",
  mediaClassName = "",
  labelClassName = "text-[16px]",
}: Props) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[3px] bg-beige ${ratios[ratio]} ${borders[border]} ${className}`}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center ${mediaClassName}`}
      >
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <span
            className={`px-6 text-center font-serif italic text-muted ${labelClassName}`}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
