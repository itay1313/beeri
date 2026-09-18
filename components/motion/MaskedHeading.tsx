"use client";
import { useRef } from "react";
import { m, useInView } from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  /** stagger per word, seconds */
  stagger?: number;
  id?: string;
};

/**
 * Masked heading: every word rises out of its own clipping box (React Bits "Masked Heading",
 * reinterpreted). Word-level so it survives any line wrap in Hebrew. The heading element is the
 * in-view target (the words start clipped out of view, so they could never observe themselves).
 */
export function MaskedHeading({ text, as: Tag = "h2", className, delay = 0, stagger = 0.045, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  // "*word*" or "*several words*" marks the second voice (Light weight)
  const words = parseVoices(text);
  const plain = text.replace(/\*/g, "");
  return (
    <Tag ref={ref as React.RefObject<never>} id={id} className={cn(className)}>
      <span className="visually-hidden">{plain}</span>
      {words.map(({ w, light: isLight }, i) => (
        <span key={`${w}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
          <m.span
            className={cn("inline-block will-change-transform", isLight && "font-light")}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{ duration: 0.7, delay: delay + i * stagger, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {w}
          </m.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

function parseVoices(text: string) {
  const out: { w: string; light: boolean }[] = [];
  let light = false;
  for (const raw of text.split(" ")) {
    if (raw.startsWith("*")) light = true;
    out.push({ w: raw.replace(/\*/g, ""), light });
    if (raw.endsWith("*")) light = false;
  }
  return out;
}
