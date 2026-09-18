import { cn } from "@/lib/cn";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { BlurText } from "@/components/motion/BlurText";

type Props = {
  index?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  tone?: "light" | "dark";
  as?: "h2" | "h3";
  align?: "start" | "center";
  className?: string;
  id?: string;
};

/** Eyebrow (index numeral + label), heading, optional lede. Numerals set in Ploni Tzar. */
export function SectionHeading({ index, eyebrow, title, lede, tone = "light", as: Tag = "h2", align = "start", className, id }: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-[62ch]", align === "center" && "mx-auto text-center", className)}>
      {(index || eyebrow) && (
        <p className={cn("text-label flex items-center gap-3 mb-5", dark ? "text-amber-400" : "text-amber-700")}>
          {index && <span className="font-tzar text-[1.05rem] font-bold tracking-normal">{index}</span>}
          {index && eyebrow && <span aria-hidden="true" className={cn("block h-px w-8", dark ? "bg-line-dark" : "bg-line")} />}
          {eyebrow && <span>{eyebrow.replace(/\*/g, "")}</span>}
        </p>
      )}
      <MaskedHeading as={Tag} id={id} text={title} className={cn(Tag === "h2" ? "text-h2" : "text-h3", dark ? "text-limestone" : "text-ink")} />
      {lede && <BlurText text={lede} delay={0.25} className={cn("text-lede mt-6 font-light", dark ? "text-limestone/80" : "text-ink-soft")} />}
    </div>
  );
}
