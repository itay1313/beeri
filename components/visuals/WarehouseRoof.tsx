"use client";
import { useRef } from "react";
import { m, useInView } from "motion/react";
import { useCapabilities } from "@/components/motion/useCapabilities";

/**
 * Stand-in for the commercial & industrial photo: a logistics warehouse with a rooftop array, drawn
 * in the same isometric line language as RoofSplit. Replaced by `industrialRoof` once the client
 * sends a real photo. Sized for a 3:4 tile on a dark ground.
 */

const S = 22.5;
const OX = 182;
const OY = 240;
const C30 = Math.cos(Math.PI / 6);
type P3 = [number, number, number];
const iso = ([x, y, z]: P3) => [OX + (x - y) * C30 * S, OY + (x + y) * 0.5 * S - z * S] as const;
const pts = (ps: P3[]) => ps.map((p) => iso(p).map((v) => v.toFixed(1)).join(",")).join(" ");

// warehouse: long, deep, low, flat roof with a parapet
const L = 14;
const D = 8;
const H = 3;
const P = 0.25; // parapet

// rooftop array: two blocks either side of a service walkway, rows running along the length
const rows: P3[][][] = [];
for (const [y0, y1] of [[0.7, 3.6], [4.4, 7.3]] as const) {
  const block: P3[][] = [];
  const n = 4;
  const pitch = (y1 - y0) / n;
  for (let r = 0; r < n; r++) {
    const a = y0 + r * pitch + 0.08;
    const b = a + pitch - 0.22;
    for (let c = 0; c < 8; c++) {
      const u0 = 0.7 + c * 1.58;
      const u1 = u0 + 1.45;
      block.push([[u0, a, H + 0.12], [u1, a, H + 0.12], [u1, b, H + 0.12], [u0, b, H + 0.12]]);
    }
  }
  rows.push(block);
}

const docks = [1.6, 3.8, 6, 8.2, 10.4];

export function WarehouseRoof({ className, label }: { className?: string; label: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useCapabilities().reducedMotion;
  const on = inView || reduce;
  const ease = [0.2, 0.7, 0.2, 1] as const;
  const fade = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0 },
    animate: { opacity: on ? 1 : 0 },
    transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease },
  });
  const line = "var(--color-limestone)";

  return (
    <svg ref={ref} viewBox="0 0 480 640" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="wh-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="var(--color-amber-500)" strokeWidth="1.3" />
        </pattern>
      </defs>

      {/* yard */}
      <m.polygon points={pts([[-1.5, -1.5, 0], [L + 1.5, -1.5, 0], [L + 1.5, D + 3.5, 0], [-1.5, D + 3.5, 0]])} fill={line} fillOpacity="0.035" stroke={line} strokeOpacity="0.14" {...fade(0)} />

      {/* walls: side (x = L) and front (y = D) */}
      <m.g strokeWidth="1.2" {...fade(0.1)}>
        <polygon points={pts([[L, 0, 0], [L, D, 0], [L, D, H], [L, 0, H]])} fill="var(--color-cell-950)" stroke={line} strokeOpacity="0.5" />
        <polygon points={pts([[0, D, 0], [L, D, 0], [L, D, H], [0, D, H]])} fill="var(--color-cell-900)" stroke={line} strokeOpacity="0.7" />
        {/* cladding seams */}
        {Array.from({ length: 13 }, (_, i) => i + 1).map((u) => (
          <polygon key={u} points={pts([[u, D, 0.05], [u, D, H - 0.05]])} fill="none" stroke={line} strokeOpacity="0.12" strokeWidth="0.75" />
        ))}
        {/* loading docks */}
        {docks.map((u) => (
          <polygon key={u} points={pts([[u, D, 0.35], [u + 1.3, D, 0.35], [u + 1.3, D, 1.9], [u, D, 1.9]])} fill="var(--color-cell-950)" stroke={line} strokeOpacity="0.55" strokeWidth="0.9" />
        ))}
      </m.g>

      {/* roof + parapet */}
      <m.g {...fade(0.2)}>
        <polygon points={pts([[0, 0, H], [L, 0, H], [L, D, H], [0, D, H]])} fill="var(--color-cell-800)" stroke={line} strokeOpacity="0.8" strokeWidth="1.2" />
        <polygon points={pts([[0, D, H], [L, D, H], [L, D, H + P], [0, D, H + P]])} fill="var(--color-cell-900)" stroke={line} strokeOpacity="0.6" strokeWidth="0.9" />
        <polygon points={pts([[L, 0, H], [L, D, H], [L, D, H + P], [L, 0, H + P]])} fill="var(--color-cell-950)" stroke={line} strokeOpacity="0.45" strokeWidth="0.9" />
      </m.g>

      {/* the array lands row by row */}
      {rows.flatMap((block, bi) =>
        block.map((p, i) => (
          <m.polygon
            key={`${bi}-${i}`}
            points={pts(p)}
            fill="url(#wh-hatch)"
            stroke="var(--color-amber-400)"
            strokeWidth="0.7"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: on ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.5 + bi * 0.35 + Math.floor(i / 8) * 0.08, ease }}
          />
        )),
      )}
    </svg>
  );
}
