"use client";
import { useRef } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

type Step = { n: string; title: string; body: string; glyph?: string };

/** Vertical timeline; the amber line fills as the reader scrolls through the steps (scroll-linked, so it also runs under reduced motion). */
export function ProcessTimeline({ steps }: { steps: readonly Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute top-0 bottom-0 start-[1.25rem] lg:start-[16.666%] w-px bg-line" />
      <m.span
        aria-hidden="true"
        className="absolute top-0 bottom-0 start-[1.25rem] lg:start-[16.666%] w-px bg-amber-500 origin-top"
        style={{ scaleY }}
      />
      {steps.map((s) => (
        <li key={s.n} className="relative grid gap-4 lg:grid-cols-12 py-10 lg:py-14 ps-12 lg:ps-0">
          <span aria-hidden="true" className="absolute top-[3.1rem] lg:top-[4.3rem] start-[calc(1.25rem-4px)] lg:start-[calc(16.666%-4px)] size-[9px] rounded-full bg-amber-500 ring-4 ring-dust" />
          <div className="lg:col-span-2">
            <span className="font-tzar text-[2.5rem] lg:text-[3.5rem] font-bold leading-none text-ink">{s.n}</span>
          </div>
          <div className="lg:col-span-4 lg:col-start-3 lg:ps-10 lg:pe-8">
            <h3 className="text-h3 font-medium">{s.title}</h3>
            {s.glyph === "daynight" && <DayNightGlyph className="mt-5" />}
          </div>
          <p className={cn("lg:col-span-5 lg:col-start-7 text-ink-soft max-w-[52ch]")}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Stylised connection-availability map: day (unlikely) vs night (available). No real geography. */
function DayNightGlyph({ className }: { className?: string }) {
  return (
    <div role="img" className={cn("flex items-center gap-4 text-label text-ink-soft", className)} aria-label="סטטוס חיבור: יום מוגבל, לילה זמין">
      <span className="inline-flex items-center gap-2">
        <span className="relative size-6 rounded-full border border-line overflow-hidden">
          <span className="absolute inset-0 hatch" style={{ ["--hatch-color" as string]: "var(--color-line)", ["--hatch-gap" as string]: "4px" }} />
        </span>
        יום
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="size-6 rounded-full bg-amber-500" />
        לילה + אגירה
      </span>
    </div>
  );
}
