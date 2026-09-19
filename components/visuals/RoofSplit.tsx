"use client";
import { useRef } from "react";
import { m, useInView } from "motion/react";
import { home } from "@/content/home";
import { useCapabilities } from "@/components/motion/useCapabilities";

/**
 * One barn, one roof, one connection: the existing array exports straight to the grid, the
 * complementary array on the empty half charges a battery, and the battery exports in the evening
 * through the same connection. Isometric line drawing in the day chart's vocabulary.
 */

// isometric projection: x runs down-right, y runs down-left, z is up
const S = 30;
const OX = 262;
const OY = 88;
const C30 = Math.cos(Math.PI / 6);
type P3 = [number, number, number];
const iso = ([x, y, z]: P3) => [OX + (x - y) * C30 * S, OY + (x + y) * 0.5 * S - z * S] as const;
const pts = (ps: P3[]) => ps.map((p) => iso(p).map((v) => v.toFixed(1)).join(",")).join(" ");
const path = (ps: P3[]) => "M " + ps.map((p) => iso(p).map((v) => v.toFixed(1)).join(",")).join(" L ");

// barn
const L = 10; // length
const D = 5; // depth
const EAVE = 2.2;
const RIDGE = 3.4;
/** point on the visible roof slope: u along the length (0..L), v down the slope (0 ridge .. 1 eave) */
const roof = (u: number, v: number): P3 => [u, D / 2 + (D / 2) * v, RIDGE - (RIDGE - EAVE) * v];

// panels: 2 rows down the slope, 5 per half along the length
function panels(from: number) {
  const out: P3[][] = [];
  const cols = 5;
  const w = L / 2 / cols;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < cols; c++) {
      const u0 = from + c * w + 0.08;
      const u1 = from + (c + 1) * w - 0.08;
      const v0 = 0.06 + r * 0.47;
      const v1 = v0 + 0.43;
      out.push([roof(u0, v0), roof(u1, v0), roof(u1, v1), roof(u0, v1)]);
    }
  }
  return out;
}

// battery container beside the gable end
const B = { x0: L + 1.4, x1: L + 3.6, y0: 3.2, y1: 5, h: 1.3 };
// grid connection point
const G: P3 = [L + 6.5, 7.5, 0];

export function RoofSplit({ className }: { className?: string }) {
  const r = home.tariff.roof;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useCapabilities().reducedMotion;
  const on = inView || reduce;
  const ease = [0.2, 0.7, 0.2, 1] as const;
  const fade = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0 },
    animate: { opacity: on ? 1 : 0 },
    transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease },
  });
  const draw = (delay: number) => ({
    initial: { pathLength: reduce ? 1 : 0 },
    animate: { pathLength: on ? 1 : 0 },
    transition: { duration: reduce ? 0 : 1, delay: reduce ? 0 : delay, ease },
  });

  const line = "var(--color-limestone)";
  const posts = [0, 2.5, 5, 7.5, 10];
  const [gx, gy] = iso(G);

  // ground routes (z = 0): existing half → grid, new half → battery, battery → grid
  // both grid routes meet at the pylon from opposite sides: one connection
  const routeExisting: P3[] = [[2.5, D, 0], [2.5, 8.1, 0], [G[0], 8.1, 0], [G[0], G[1], 0]];
  const routeCharge: P3[] = [[7.5, D, 0], [7.5, 5.8, 0], [L + 2.5, 5.8, 0], [L + 2.5, B.y1, 0]];
  const routeDischarge: P3[] = [[L + 3.2, B.y1, 0], [L + 3.2, G[1], 0], [G[0], G[1], 0]];

  /** rtl text: "end" anchors the text's left edge, so it runs rightwards from the point */
  const label = (at: P3, text: string, tone: "amber" | "light", dy = -14, anchor: "start" | "middle" | "end" = "middle", dx = 0) => {
    const [x, y] = iso(at);
    return (
      <text x={x + dx} y={y + dy} textAnchor={anchor} fontSize="18" direction="rtl" fill={tone === "amber" ? "var(--color-amber-400)" : line} fillOpacity={tone === "light" ? 0.85 : 1}>
        {text}
      </text>
    );
  };

  return (
    <svg ref={ref} viewBox="0 0 560 510" role="img" aria-labelledby="roof-t roof-d" className={className}>
      <title id="roof-t">{r.heading.replace(/\*/g, "")}</title>
      <desc id="roof-d">{r.caption}</desc>
      <defs>
        <pattern id="roof-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="var(--color-amber-500)" strokeWidth="1.6" />
        </pattern>
      </defs>

      {/* ground slab */}
      <m.polygon points={pts([[-0.6, -0.6, 0], [L + 0.6, -0.6, 0], [L + 0.6, D + 0.6, 0], [-0.6, D + 0.6, 0]])} fill={line} fillOpacity="0.04" stroke={line} strokeOpacity="0.18" {...fade(0)} />

      {/* ground routes */}
      <m.path d={path(routeExisting)} fill="none" stroke={line} strokeOpacity="0.55" strokeWidth="1.5" {...draw(0.9)} />
      <m.path d={path(routeCharge)} fill="none" stroke="var(--color-amber-400)" strokeWidth="1.5" strokeDasharray="4 5" className={reduce ? undefined : "flow-dash"} {...fade(1.3)} />
      <m.path d={path(routeDischarge)} fill="none" stroke="var(--color-amber-500)" strokeWidth="2.25" {...draw(1.7)} />
      {!reduce && on && (
        <path d={path(routeDischarge)} fill="none" stroke="var(--color-cell-950)" strokeWidth="2.25" strokeDasharray="3 15" className="flow-dash-late" />
      )}

      {/* back posts, gable and frame */}
      <m.g stroke={line} strokeOpacity="0.35" strokeWidth="1" fill="none" {...fade(0.1)}>
        {posts.map((u) => <path key={`b${u}`} d={path([[u, 0, 0], [u, 0, EAVE]])} />)}
        <path d={path([[0, 0, EAVE], [L, 0, EAVE]])} />
        <path d={path([[0, 0, EAVE], [0, D / 2, RIDGE], [0, D, EAVE]])} />
      </m.g>

      {/* front posts */}
      <m.g stroke={line} strokeOpacity="0.7" strokeWidth="1.25" fill="none" {...fade(0.2)}>
        {posts.map((u) => <path key={`f${u}`} d={path([[u, D, 0], [u, D, EAVE]])} />)}
        <path d={path([[L, 0, 0], [L, 0, EAVE], [L, D / 2, RIDGE], [L, D, EAVE], [L, D, 0]])} />
        <path d={path([[L, 0, EAVE], [L, D, EAVE]])} strokeOpacity="0.35" />
      </m.g>

      {/* roof slope */}
      <m.polygon points={pts([roof(0, 0), roof(L, 0), roof(L, 1), roof(0, 1)])} fill="var(--color-cell-800)" stroke={line} strokeOpacity="0.8" strokeWidth="1.25" {...fade(0.3)} />
      <m.path d={path([roof(L / 2, 0), roof(L / 2, 1)])} stroke={line} strokeOpacity="0.4" strokeDasharray="3 4" {...fade(0.5)} />

      {/* existing array */}
      <m.g {...fade(0.5)}>
        {panels(0).map((p, i) => (
          <polygon key={i} points={pts(p)} fill="var(--color-cell-950)" stroke={line} strokeOpacity="0.55" strokeWidth="0.75" />
        ))}
      </m.g>

      {/* complementary array: panels land one by one */}
      {panels(L / 2).map((p, i) => (
        <m.polygon
          key={i}
          points={pts(p)}
          fill="url(#roof-hatch)"
          stroke="var(--color-amber-400)"
          strokeWidth="0.9"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -10 }}
          animate={{ opacity: on ? 1 : 0, y: on ? 0 : -10 }}
          transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.8 + (i % 5) * 0.07 + Math.floor(i / 5) * 0.12, ease }}
        />
      ))}

      {/* battery container */}
      <m.g {...fade(1.1)}>
        <polygon points={pts([[B.x0, B.y0, B.h], [B.x1, B.y0, B.h], [B.x1, B.y1, B.h], [B.x0, B.y1, B.h]])} fill="var(--color-cell-800)" stroke="var(--color-amber-400)" strokeWidth="1.1" />
        <polygon points={pts([[B.x1, B.y0, 0], [B.x1, B.y1, 0], [B.x1, B.y1, B.h], [B.x1, B.y0, B.h]])} fill="var(--color-cell-900)" stroke="var(--color-amber-400)" strokeWidth="1.1" />
        <polygon points={pts([[B.x0, B.y1, 0], [B.x1, B.y1, 0], [B.x1, B.y1, B.h], [B.x0, B.y1, B.h]])} fill="var(--color-cell-950)" stroke="var(--color-amber-400)" strokeWidth="1.1" />
        {/* charge level */}
        <polygon points={pts([[B.x0 + 0.25, B.y1, 0.2], [B.x0 + 1.5, B.y1, 0.2], [B.x0 + 1.5, B.y1, B.h - 0.25], [B.x0 + 0.25, B.y1, B.h - 0.25]])} fill="var(--color-amber-500)" />
      </m.g>

      {/* grid pylon, drawn flat */}
      <m.g stroke={line} strokeWidth="1.4" strokeLinecap="round" fill="none" {...fade(1.2)}>
        <path d={`M ${gx} ${gy + 8} L ${gx} ${gy - 60}`} />
        <path d={`M ${gx - 24} ${gy - 50} L ${gx + 24} ${gy - 50} M ${gx - 16} ${gy - 36} L ${gx + 16} ${gy - 36}`} />
        <path d={`M ${gx - 10} ${gy + 8} L ${gx} ${gy - 26} L ${gx + 10} ${gy + 8}`} strokeOpacity="0.5" />
        {[-24, 24, -16, 16].map((dx, i) => <circle key={i} cx={gx + dx} cy={gy - (i < 2 ? 50 : 36) + 5} r="2.2" fill={line} stroke="none" />)}
      </m.g>

      {/* labels */}
      <m.g {...fade(1.6)}>
        {label(roof(2.5, 0), r.labels.existing, "light", -12, "end", 12)}
        {label(roof(7.5, 0), r.labels.added, "amber", -12, "end", 12)}
        {label([B.x1, B.y0, B.h], r.labels.battery, "amber", -14)}
        {label(G, r.labels.grid, "light", 30)}
        <text x={gx} y={gy + 52} textAnchor="middle" fontSize="15" direction="rtl" fill="var(--color-amber-400)">{r.labels.cap}</text>
      </m.g>
    </svg>
  );
}
