"use client";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { PauseButton } from "@/components/ui/PauseButton";

type Props = {
  items: readonly string[];
  dark?: boolean;
  className?: string;
  /** seconds per full loop */
  duration?: number;
};

/**
 * Endless word line. CSS keyframes on two identical halves (translateX -50%), so it is always full
 * and never depends on scroll. Pause button, hover pause, static under reduced motion.
 */
export function Marquee({ items, dark = false, className, duration = 46 }: Props) {
  const [paused, setPaused] = useState(false);
  const half = [...items, ...items];
  return (
    <div className={cn("relative flex items-stretch border-y", dark ? "border-line-dark" : "border-line", className)}>
      <div
        aria-hidden="true"
        dir="ltr"
        className={cn("marquee flex-1 overflow-hidden select-none", dark ? "text-limestone/80" : "text-ink", paused && "is-paused")}
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
      <div className={cn("marquee-control hidden items-center px-3 lg:px-4 border-s", dark ? "border-line-dark" : "border-line")}>
        <PauseButton paused={paused} onToggle={() => setPaused((v) => !v)} label="הטקסט הנע" dark={dark} />
      </div>
    </div>
  );
}
