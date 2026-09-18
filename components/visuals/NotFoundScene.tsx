"use client";
import { useEffect, useRef } from "react";
import { useCapabilities } from "@/components/motion/useCapabilities";

/* ---------------------------------------------------------------------------
 * "404" drawn on the panel's own PV cells: a 3×5 pixel font, each font pixel
 * becomes 2×2 cells. Grid is 24×12 with a one-cell margin.
 * ------------------------------------------------------------------------- */
const FONT: Record<string, string[]> = {
  "4": ["101", "101", "111", "001", "001"],
  "0": ["111", "101", "101", "101", "111"],
};
const COLS = 24;
const ROWS = 12;
const LIT = (() => {
  const lit = new Set<number>();
  let x0 = 1;
  for (const ch of "404") {
    FONT[ch].forEach((row, r) =>
      [...row].forEach((bit, c) => {
        if (bit !== "1") return;
        for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) lit.add((1 + r * 2 + dy) * COLS + x0 + c * 2 + dx);
      }),
    );
    x0 += 8; // 6 cells per digit + 2 gap
  }
  return lit;
})();
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => ({ i, lit: LIT.has(i), col: i % COLS, row: Math.floor(i / COLS) }));
const RAYS = 13;
const GLINTS = [0.9, 0.7, 0.52, 0.38, 0.26];

/**
 * 404 scene: the sun rises from below the horizon behind a single-axis solar tracker.
 * The panel follows the pointer (a tracker looking for the sun); on touch devices it sways slowly.
 * Everything is decorative (aria-hidden); the page's real heading lives outside.
 */
export function NotFoundScene() {
  const panelRef = useRef<HTMLDivElement>(null);
  const { reducedMotion, hover } = useCapabilities();

  useEffect(() => {
    const el = panelRef.current;
    if (!el || reducedMotion || !hover) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--ry", `${(tx * 22).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(16 - ty * 14).toFixed(2)}deg`);
        el.style.setProperty("--sheen", `${(50 + tx * 40).toFixed(1)}%`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion, hover]);

  const sway = !reducedMotion && !hover;

  return (
    <div aria-hidden="true" className="nf-stage relative flex-1 min-h-[24rem] md:min-h-[30rem] mt-10 md:mt-14 overflow-x-clip">
      {/* warm sky from the horizon up */}
      <div className="nf-sky absolute inset-0" />

      {/* sun, clipped at the horizon */}
      <div className="absolute inset-x-0 -top-16 bottom-[22%] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_30%)]">
        <div className="nf-sun absolute left-1/2 bottom-0" style={{ width: "var(--nf-sun)", height: "var(--nf-sun)" }}>
          <div className="nf-halo absolute rounded-full" />
          <svg viewBox="-50 -50 100 100" className="nf-rays absolute inset-0 h-full w-full overflow-visible">
            {Array.from({ length: RAYS }).map((_, i) => {
              const a = Math.PI + (Math.PI * (i + 1)) / (RAYS + 1);
              const long = i % 2 === 0;
              const r2 = long ? 74 : 66;
              return (
                <line
                  key={i}
                  x1={(Math.cos(a) * 57).toFixed(2)}
                  y1={(Math.sin(a) * 57).toFixed(2)}
                  x2={(Math.cos(a) * r2).toFixed(2)}
                  y2={(Math.sin(a) * r2).toFixed(2)}
                  stroke="var(--color-amber-400)"
                  strokeWidth={long ? 1.5 : 1}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          <div className="nf-disc absolute inset-0 rounded-full" />
        </div>
      </div>

      {/* horizon + ground with the sun's glints */}
      <div className="absolute inset-x-0 bottom-[22%] h-px bg-limestone/30" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] flex flex-col items-center">
        {GLINTS.map((w, i) => (
          <span
            key={w}
            className={`nf-glint block shrink-0 rounded-full bg-amber-400 ${i < 2 ? "h-[3px]" : "h-[2px]"}`}
            style={{ width: `calc(var(--nf-sun) * ${w})`, marginTop: `calc(var(--nf-sun) * ${0.045 + i * 0.012})`, opacity: 0.75 - i * 0.13, animationDelay: `${1.4 + i * 0.08}s` }}
          />
        ))}
      </div>

      {/* the tracker: panel on a post, planted on the horizon */}
      <div className="absolute left-1/2 bottom-[22%] -translate-x-1/2 flex flex-col items-center [perspective:1100px]">
        <div
          ref={panelRef}
          className={`nf-panel relative ${sway ? "nf-sway" : ""}`}
          style={{ width: "var(--nf-panel)" }}
        >
          {/* aluminium frame */}
          <div className="relative rounded-[6px] p-[5px] bg-[linear-gradient(135deg,#6b7480,#2b3642_40%,#4a5361)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
            <div
              dir="ltr"
              className="relative grid gap-[2px] bg-[#0a1422] p-[3px] rounded-[3px] overflow-hidden"
              style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            >
              {CELLS.map((c) => (
                <span
                  key={c.i}
                  className={c.lit ? "nf-cell nf-lit" : "nf-cell"}
                  style={c.lit ? { animationDelay: `${1.1 + c.col * 0.035 + c.row * 0.02}s` } : undefined}
                />
              ))}
              {/* glass sheen follows the tilt */}
              <span className="nf-sheen pointer-events-none absolute inset-0" />
            </div>
          </div>
        </div>
        {/* pivot + post */}
        <span className="relative -mt-2 z-[-1] block size-4 rounded-full bg-[#4a5361] ring-2 ring-cell-950" />
        <span className="block w-[6px] h-[clamp(2.5rem,7vh,5rem)] bg-[linear-gradient(to_right,#5b6470,#2b3642)]" />
        <span className="block w-10 h-[3px] rounded-full bg-[#4a5361]" />
      </div>
    </div>
  );
}
