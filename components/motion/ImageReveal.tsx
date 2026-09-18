"use client";
import { useRef } from "react";
import { m, useInView } from "motion/react";
import { useCapabilities } from "./useCapabilities";
import { cn } from "@/lib/cn";

/**
 * Photograph un-clips from the bottom while settling from a slight zoom. Wrap an ImagePanel.
 * The observed element is never clipped (IntersectionObserver applies clip-path to its target),
 * so the state comes from an outer ref and the clip lives on a child.
 */
export function ImageReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { reducedMotion } = useCapabilities();
  if (reducedMotion) return <div className={cn("relative", className)}>{children}</div>;
  const ease = [0.2, 0.7, 0.2, 1] as const;
  return (
    <div ref={ref} className={cn("relative", className)}>
      <m.div
        className="h-full"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: inView ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
        transition={{ duration: 1.1, delay, ease }}
      >
        <m.div
          className="h-full"
          initial={{ scale: 1.08 }}
          animate={{ scale: inView ? 1 : 1.08 }}
          transition={{ duration: 1.6, delay, ease }}
        >
          {children}
        </m.div>
      </m.div>
    </div>
  );
}
