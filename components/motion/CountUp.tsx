"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useCapabilities } from "./useCapabilities";

/**
 * Counts every number inside a string up from zero when it scrolls into view
 * (React Bits "Count Up", extended to mixed strings like "30–50" or "≥ 75"). Decimals are preserved.
 */
export function CountUp({ value, className, duration = 1.4 }: { value: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useCapabilities().reducedMotion;
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      setT(1 - Math.pow(1 - p, 3)); // ease-out cubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, duration]);

  const progress = reduce ? 1 : t;
  const parts = value.split(/(\d+(?:\.\d+)?)/);
  return (
    <span ref={ref} className={className}>
      <span className="visually-hidden">{value}</span>
      <span aria-hidden="true">
      {parts.map((part, i) => {
        if (!/^\d/.test(part)) return <span key={i}>{part}</span>;
        const decimals = part.includes(".") ? part.split(".")[1].length : 0;
        const n = parseFloat(part) * progress;
        return (
          <span key={i} className="tabular">
            {n.toFixed(decimals)}
          </span>
        );
      })}
      </span>
    </span>
  );
}
