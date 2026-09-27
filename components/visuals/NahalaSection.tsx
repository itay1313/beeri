"use client";
import { useRef } from "react";
import { m, useInView } from "motion/react";
import { home } from "@/content/home";
import { useCapabilities } from "@/components/motion/useCapabilities";

/**
 * Side-on cross-section of one nahala: residence, the farm building with panels on its roof, a
 * ground array of about one dunam beside it, the buffer, and an agrivoltaic field of up to 10 dunam.
 * One scale for width and height, so the three options read at their real size next to each other.
 * Shown under the carousel of the client's aerial frames.
 */

const PPM = 5.2; // px per metre, both axes
const W = 1160;
const RIGHT = 24; // RTL: the drawing starts at the house, on the right
const GY = 196; // ground line
const x = (metres: number) => W - RIGHT - metres * PPM;
const y = (metres: number) => GY - metres * PPM;

// zones in metres from the house side
const HOUSE = [0, 12] as const;
const BARN = [20, 40] as const;
const GROUND = [46, 78] as const;
const BUFFER = [80, 104] as const;
const AGRO = [106, 208] as const;

const groundRows = Array.from({ length: 6 }, (_, i) => GROUND[0] + 1 + i * 5.2);
const agroRows = Array.from({ length: 10 }, (_, i) => AGRO[0] + 3 + i * 10);

export function NahalaSection({ className }: { className?: string }) {
  const s = home.land.page.scale;
  const opts = home.land.options;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useCapabilities().reducedMotion;
  const on = inView || reduce;
  const ease = [0.2, 0.7, 0.2, 1] as const;
  const fade = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0 },
    animate: { opacity: on ? 1 : 0 },
    transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease },
  });
  const draw = (delay: number, duration = 1) => ({
    initial: { pathLength: reduce ? 1 : 0 },
    animate: { pathLength: on ? 1 : 0 },
    transition: { duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease },
  });

  const ink = "var(--color-ink)";
  const soft = "var(--color-ink-soft)";
  const amber = "var(--color-amber-700)";
  const panel = "var(--color-amber-500)";

  /** bracket over a zone: option number + title, plus its width under the ground line */
  const zone = (from: number, to: number, n: string, title: string, size: string | null, delay: number) => {
    const a = x(to);
    const b = x(from);
    const mid = (a + b) / 2;
    return (
      <m.g {...fade(delay)}>
        <path d={`M ${a} 128 L ${a} 120 L ${b} 120 L ${b} 128`} fill="none" stroke={amber} strokeWidth="1.2" />
        {/* rtl: anchor "start" is the right edge, so both run leftwards from the bracket's right end */}
        <text x={b} y={106} textAnchor="start" direction="rtl" fontSize="17" fontFamily="var(--font-tzar)" fontWeight="700" fill={amber}>{n}</text>
        <text x={b - 26} y={106} textAnchor="start" direction="rtl" fontSize="17" fill={ink}>{title}</text>
        {size && (
          <>
            <path d={`M ${a} ${GY + 14} L ${b} ${GY + 14} M ${a} ${GY + 9} L ${a} ${GY + 19} M ${b} ${GY + 9} L ${b} ${GY + 19}`} stroke={soft} strokeOpacity="0.7" strokeWidth="1" />
            <text x={mid} y={GY + 38} textAnchor="middle" direction="rtl" fontSize="14" fill={soft}>{size}</text>
          </>
        )}
      </m.g>
    );
  };

  return (
    <svg ref={ref} viewBox={`0 80 ${W} 182`} role="img" aria-labelledby="nahala-sec-t nahala-sec-d" className={className}>
      <title id="nahala-sec-t">{s.heading.replace(/\*/g, "")}</title>
      <desc id="nahala-sec-d">{s.caption}</desc>
      <defs>
        <pattern id="nahala-sec-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={soft} strokeOpacity="0.35" strokeWidth="1" />
        </pattern>
      </defs>

      {/* ground */}
      <m.path d={`M ${x(AGRO[1] + 2)} ${GY} L ${x(-2)} ${GY}`} stroke={ink} strokeOpacity="0.6" strokeWidth="1.2" {...draw(0, 1.2)} />

      {/* residence */}
      <m.g stroke={ink} strokeOpacity="0.45" strokeWidth="1.1" fill="none" {...fade(0.2)}>
        <path d={`M ${x(HOUSE[0])} ${GY} L ${x(HOUSE[0])} ${y(3.2)} L ${x(6)} ${y(5.6)} L ${x(HOUSE[1])} ${y(3.2)} L ${x(HOUSE[1])} ${GY}`} />
        <text x={x(6)} y={y(1.4)} textAnchor="middle" direction="rtl" fontSize="13" fill={soft} stroke="none">{s.labels.home}</text>
      </m.g>

      {/* residence area, under the ground line: rtl "start" is the right edge, so the label runs leftwards and stays inside the frame */}
      <m.g {...fade(0.4)}>
        <path d={`M ${x(HOUSE[1])} ${GY + 14} L ${x(HOUSE[0])} ${GY + 14} M ${x(HOUSE[1])} ${GY + 9} L ${x(HOUSE[1])} ${GY + 19} M ${x(HOUSE[0])} ${GY + 9} L ${x(HOUSE[0])} ${GY + 19}`} stroke={soft} strokeOpacity="0.7" strokeWidth="1" />
        <text x={x(HOUSE[0])} y={GY + 38} textAnchor="start" direction="rtl" fontSize="14" fill={soft}>{s.sizes.home}</text>
      </m.g>

      {/* 01: farm building, panels on the south slope */}
      <m.g {...fade(0.5)}>
        <path d={`M ${x(BARN[0])} ${GY} L ${x(BARN[0])} ${y(5)} L ${x(30)} ${y(7.6)} L ${x(BARN[1])} ${y(5)} L ${x(BARN[1])} ${GY}`} fill="var(--color-dust)" stroke={ink} strokeOpacity="0.7" strokeWidth="1.2" />
        <path d={`M ${x(30.8)} ${y(7.55)} L ${x(39.2)} ${y(5.35)}`} stroke={panel} strokeWidth="4" strokeLinecap="butt" />
      </m.g>

      {/* 02: one dunam of fixed-tilt rows on the ground */}
      <m.g {...fade(0.9)}>
        {groundRows.map((r, i) => (
          <m.g key={r} {...fade(0.9 + i * 0.06)}>
            <path d={`M ${x(r + 1.6)} ${GY} L ${x(r + 1.6)} ${y(1.1)} M ${x(r + 3)} ${GY} L ${x(r + 3)} ${y(1.9)}`} stroke={ink} strokeOpacity="0.5" strokeWidth="1" />
            <path d={`M ${x(r)} ${y(0.7)} L ${x(r + 3.4)} ${y(2.2)}`} stroke={panel} strokeWidth="3.5" />
          </m.g>
        ))}
      </m.g>

      {/* buffer */}
      <m.g {...fade(1.2)}>
        <rect x={x(BUFFER[1])} y={GY - 10} width={(BUFFER[1] - BUFFER[0]) * PPM} height="10" fill="url(#nahala-sec-hatch)" />
        <text x={(x(BUFFER[0]) + x(BUFFER[1])) / 2} y={GY - 18} textAnchor="middle" direction="rtl" fontSize="13" fill={soft}>{s.labels.buffer}</text>
        {/* minimum buffer, stacked above: the gap between the ground and agro brackets is narrow */}
        <text textAnchor="middle" direction="rtl" fontSize="12.5" fill={ink} fillOpacity="0.75">
          {s.labels.bufferNote.map((line, i) => (
            <tspan key={line} x={(x(BUFFER[0]) + x(BUFFER[1])) / 2} y={GY - 70 + i * 16} fontWeight={i === 0 ? 700 : 400}>{line}</tspan>
          ))}
        </text>
      </m.g>

      {/* 03: elevated agrivoltaic rows with crops growing underneath */}
      <m.path
        d={Array.from({ length: Math.floor((AGRO[1] - AGRO[0]) / 1.6) }, (_, i) => {
          const m0 = AGRO[0] + i * 1.6;
          return `M ${x(m0)} ${GY} Q ${x(m0 + 0.8)} ${y(1.3)} ${x(m0 + 1.6)} ${GY}`;
        }).join(" ")}
        fill="none"
        stroke={soft}
        strokeOpacity="0.55"
        strokeWidth="1"
        {...draw(1.4, 1.4)}
      />
      {agroRows.map((r, i) => (
        <m.g key={r} {...fade(1.6 + i * 0.07)}>
          <path d={`M ${x(r + 1.5)} ${GY} L ${x(r + 1.5)} ${y(4.6)}`} stroke={ink} strokeOpacity="0.55" strokeWidth="1" />
          <path d={`M ${x(r)} ${y(4.4)} L ${x(r + 3)} ${y(5)}`} stroke={panel} strokeWidth="3.5" />
        </m.g>
      ))}

      {zone(BARN[0], BARN[1], opts[0].n, opts[0].title, null, 0.7)}
      {zone(GROUND[0], GROUND[1], opts[1].n, opts[1].title, s.sizes.ground, 1.1)}
      {zone(AGRO[0], AGRO[1], opts[2].n, opts[2].title, s.sizes.agro, 1.9)}

    </svg>
  );
}
