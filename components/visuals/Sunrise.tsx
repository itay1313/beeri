"use client";
import { useRef } from "react";
import { m, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useCapabilities } from "@/components/motion/useCapabilities";
import { site } from "@/content/site";
import { PlotField } from "./PlotField";

const RAYS = 11;
const GLINTS = [0.92, 0.74, 0.58, 0.44, 0.32, 0.22];

/**
 * A scroll-driven sunrise. The stage is taller than the viewport and its frame is sticky, so the
 * sun climbs over the horizon as you scroll down and sets again as you scroll up — every time.
 * The sun is sized from the viewport (`--sun`, see globals.css) so the composition holds on any
 * screen: tagline on top, disc rising behind the horizon, rays fanning from its edge, glints on
 * the PV rows below. Reduced motion shows the final frame.
 */
export function Sunrise() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useCapabilities().reducedMotion;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const sprung = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });
  const done = useMotionValue(1);
  const p = reduce ? done : sprung;

  // disc travels from fully below the horizon to ~65% above it
  const sunY = useTransform(p, [0.05, 0.72], ["102%", "35%"]);
  const sky = useTransform(p, [0.1, 0.75], [0, 1]);
  const halo = useTransform(p, [0.2, 0.75], [0.4, 1]);
  const rays = useTransform(p, [0.45, 0.8], [0, 1]);
  const rayScale = useTransform(p, [0.45, 0.85], [0.82, 1]);
  const glints = useTransform(p, [0.35, 0.8], [0, 1]);
  const glintScale = useTransform(p, [0.35, 0.85], [0.3, 1]);
  const field = useTransform(p, [0.25, 0.85], [0.08, 0.6]);
  const textO = useTransform(p, [0.5, 0.82], [0, 1]);
  const textY = useTransform(p, [0.5, 0.82], [24, 0]);

  return (
    <div ref={ref} className="sunrise relative h-[140svh] md:h-[165svh] bg-cell-950" aria-hidden="true">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* sky warms from the horizon up */}
        <m.div
          className="absolute inset-0"
          style={{
            opacity: sky,
            background:
              "radial-gradient(90% 60% at 50% 62%, rgba(227,154,46,0.42) 0%, rgba(150,88,24,0.2) 38%, rgba(12,17,23,0) 72%)",
          }}
        />

        {/* tagline */}
        <m.div className="absolute inset-x-0 top-[13%] md:top-[12%] px-6 text-center" style={{ opacity: textO, y: textY }}>
          <p className="text-label text-amber-400 mb-3 md:mb-4 ltr">BE&apos;ERI ENERGY SOLUTIONS</p>
          <p className="text-[clamp(1.7rem,1.1rem+2.6vw,3.6rem)] leading-[1.05] font-light text-limestone max-w-[16ch] mx-auto">
            {site.tagline}
          </p>
        </m.div>

        {/* sky above the horizon: the sun is clipped here */}
        <div className="absolute inset-x-0 top-0 h-[62%] overflow-hidden">
          <m.div className="absolute left-1/2 bottom-0" style={{ x: "-50%", y: sunY, width: "var(--sun)", height: "var(--sun)" }}>
            {/* halo */}
            <m.div
              className="absolute rounded-full"
              style={{
                inset: "-45%",
                opacity: halo,
                background: "radial-gradient(closest-side, rgba(240,178,74,0.38), rgba(227,154,46,0.12) 55%, rgba(227,154,46,0) 100%)",
              }}
            />
            {/* rays share the disc's box, so they always centre on it */}
            <m.svg
              viewBox="-50 -50 100 100"
              className="absolute inset-0 h-full w-full overflow-visible"
              style={{ opacity: rays, scale: rayScale }}
            >
              {Array.from({ length: RAYS }).map((_, i) => {
                const a = Math.PI + (Math.PI * (i + 1)) / (RAYS + 1);
                const long = i % 2 === 0;
                const r1 = 58;
                const r2 = long ? 74 : 67;
                return (
                  <line
                    key={i}
                    x1={(Math.cos(a) * r1).toFixed(2)}
                    y1={(Math.sin(a) * r1).toFixed(2)}
                    x2={(Math.cos(a) * r2).toFixed(2)}
                    y2={(Math.sin(a) * r2).toFixed(2)}
                    stroke="#f0b24a"
                    strokeWidth={long ? 1.6 : 1.1}
                    strokeLinecap="round"
                  />
                );
              })}
            </m.svg>
            {/* disc: lit from above */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle at 50% 30%, #f6c46a 0%, #eaa53a 45%, #d98b1f 100%)" }}
            />
          </m.div>
        </div>

        {/* horizon */}
        <div className="absolute inset-x-0 top-[62%] h-px bg-limestone/30" />

        {/* ground */}
        <div className="absolute inset-x-0 top-[62%] bottom-0 overflow-hidden">
          <m.div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" style={{ opacity: field }}>
            <PlotField pitch={16} rowsPerStrip={2} gapRows={2} />
          </m.div>
          {/* glints: the sun's reflection breaking on the panel rows */}
          <m.div className="absolute inset-x-0 top-0 flex flex-col items-center" style={{ opacity: glints }}>
            {GLINTS.map((w, i) => (
              <m.span
                key={i}
                className="block rounded-full"
                style={{
                  width: `calc(var(--sun) * ${w})`,
                  height: i < 2 ? 3 : 2,
                  marginTop: `calc(var(--sun) * ${0.05 + i * 0.012})`,
                  background: `rgba(240,178,74,${0.75 - i * 0.1})`,
                  scaleX: glintScale,
                }}
              />
            ))}
          </m.div>
        </div>
      </div>
    </div>
  );
}
