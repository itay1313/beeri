import { cn } from "@/lib/cn";

type Props = {
  items: readonly string[];
  dark?: boolean;
  className?: string;
  /** seconds per full loop */
  duration?: number;
};

/**
 * Endless word line. Pure CSS: two identical halves, translateX(-50%) loop, so it is always full
 * and never depends on scroll. Pauses on hover; static under reduced motion.
 */
export function Marquee({ items, dark = false, className, duration = 46 }: Props) {
  const half = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      dir="ltr"
      className={cn("marquee overflow-hidden border-y select-none", dark ? "border-line-dark text-limestone/80" : "border-line text-ink", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {half.map((w, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span dir="rtl" className="px-6 lg:px-8 py-4 lg:py-5 text-[1.35rem] lg:text-[1.9rem] font-light whitespace-nowrap">{w}</span>
                <span className="size-1.5 rounded-full bg-amber-500" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
