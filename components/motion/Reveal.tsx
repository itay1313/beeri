"use client";
import { m } from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "ul" | "ol";
  once?: boolean;
};

/** Section-level entrance: opacity + small rise, once, 20% in view. MotionConfig drops the transform under reduced motion. */
export function Reveal({ children, className, delay = 0, y = 16, as = "div", once = true }: Props) {
  const Tag = m[as];
  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Tag>
  );
}
