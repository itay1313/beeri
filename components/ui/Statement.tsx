import { cn } from "@/lib/cn";
import { BlurText } from "@/components/motion/BlurText";

/**
 * Large, quiet paragraph with one phrase in full ink. Use for positioning lines, not body copy.
 * Pass the highlighted phrase separately so it is never split by the layout.
 */
export function Statement({ text, highlight, dark = false, className }: { text: string; highlight?: string; dark?: boolean; className?: string }) {
  return (
    <BlurText
      text={text}
      stagger={0.014}
      className={cn("text-h3 lg:text-[clamp(1.75rem,1.2rem+1.9vw,2.75rem)] leading-[1.3] font-light max-w-[34ch]", dark ? "text-limestone/55" : "text-ink-soft", className)}
    >
      {highlight && <span className={cn("font-medium", dark ? "text-limestone" : "text-ink")}>{highlight}</span>}
    </BlurText>
  );
}
