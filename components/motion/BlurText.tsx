"use client";
import { m } from "motion/react";
import { useCapabilities } from "./useCapabilities";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  className?: string;
  as?: "p" | "span";
  delay?: number;
  stagger?: number;
  children?: React.ReactNode;
};

/** Word-by-word blur-in on view (React Bits "Blur Text", reinterpreted). For ledes and statements, never body copy. */
export function BlurText({ text, className, as: Tag = "p", delay = 0, stagger = 0.022, children }: Props) {
  const { reducedMotion } = useCapabilities();
  if (reducedMotion) {
    return (
      <Tag className={cn(className)}>
        {text} {children}
      </Tag>
    );
  }
  const words = text.split(" ");
  return (
    <Tag className={cn(className)}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <m.span
            key={`${w}-${i}`}
            className="inline-block will-change-[filter,opacity,transform]"
            initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: delay + i * stagger, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </m.span>
        ))}
      </span>{" "}
      {children}
    </Tag>
  );
}
