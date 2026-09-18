"use client";
import { useRef } from "react";
import { m, useInView } from "motion/react";
import { home } from "@/content/home";

/**
 * A day in the life of a complementary-tariff system, drawn as a production curve against the
 * connection cap. Below the cap: exported. Above it: charged into the battery. Evening peak:
 * discharged at the cap. Shapes only — no values on the axes.
 */
const W = 520;
const H = 340;
const X0 = 44;
const X1 = 496;
const BASE = 272;
const TOP = 56;
const CAP = 158;
const x = (h: number) => X0 + ((X1 - X0) * h) / 24;

function bell() {
  const pts: string[] = [];
  for (let h = 5.5; h <= 18.5; h += 0.25) {
    const t = Math.max(0, Math.sin((Math.PI * (h - 5.5)) / 13));
    pts.push(`${x(h).toFixed(1)},${(BASE - (BASE - TOP) * Math.pow(t, 1.35)).toFixed(1)}`);
  }
  return pts;
}

export function TariffChart({ className }: { className?: string }) {
  const c = home.tariff.chart;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const pts = bell();
  const area = `M ${x(5.5)},${BASE} L ${pts.join(" L ")} L ${x(18.5)},${BASE} Z`;
  const line = `M ${pts.join(" L ")}`;
  const ease = [0.2, 0.7, 0.2, 1] as const;
  const show = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: inView ? 1 : 0 },
    transition: { duration: 0.7, delay, ease },
  });
  const grow = (delay: number) => ({
    initial: { scaleY: 0 },
    animate: { scaleY: inView ? 1 : 0 },
    transition: { duration: 0.9, delay, ease },
    style: { transformOrigin: `0px ${BASE}px`, transformBox: "view-box" as const },
  });

  return (
    <figure className={className}>
      <figcaption className="text-label text-limestone/60 mb-4">{c.title}</figcaption>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="tariff-chart-t tariff-chart-d" className="w-full h-auto">
        <title id="tariff-chart-t">{c.title}</title>
        <desc id="tariff-chart-d">{c.caption}</desc>
        <defs>
          <clipPath id="tc-below"><rect x="0" y={CAP} width={W} height={BASE - CAP} /></clipPath>
          <clipPath id="tc-above"><rect x="0" y="0" width={W} height={CAP} /></clipPath>
          <pattern id="tc-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#e39a2e" strokeWidth="1.4" />
          </pattern>
        </defs>

        {/* hour grid */}
        {[0, 6, 12, 18, 24].map((h) => (
          <g key={h}>
            <line x1={x(h)} y1={TOP - 16} x2={x(h)} y2={BASE} stroke="rgba(242,237,227,0.08)" />
            <text x={x(h)} y={BASE + 24} textAnchor="middle" fontSize="15" fill="rgba(242,237,227,0.6)" style={{ fontFamily: "var(--font-tzar)" }}>
              {String(h % 24).padStart(2, "0")}:00
            </text>
          </g>
        ))}
        <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke="rgba(242,237,227,0.35)" />

        {/* exported: production under the cap */}
        <m.path d={area} clipPath="url(#tc-below)" fill="rgba(242,237,227,0.14)" {...grow(0.1)} />
        {/* charged: production above the cap */}
        <m.path d={area} clipPath="url(#tc-above)" fill="url(#tc-hatch)" {...grow(0.35)} />
        {/* discharged at evening peak, at the cap */}
        <m.path
          d={`M ${x(18.5)},${BASE} L ${x(18.5)},${CAP} L ${x(22.5)},${CAP} L ${x(22.5)},${BASE} Z`}
          fill="#e39a2e"
          {...grow(1.1)}
        />

        {/* production curve draws in */}
        <m.path
          d={line}
          fill="none"
          stroke="#f2ede3"
          strokeWidth="1.75"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.3, ease }}
        />

        {/* connection cap */}
        <m.g {...show(0.6)}>
          <line x1={X0} y1={CAP} x2={X1} y2={CAP} stroke="#f2ede3" strokeWidth="1" strokeDasharray="5 5" />
          <text x={X1} y={CAP - 10} textAnchor="start" fontSize="15" fill="#f2ede3" direction="rtl">{c.cap}</text>
        </m.g>

        {/* labels */}
        <m.g {...show(0.9)}>
          <text x={x(12)} y={TOP - 20} textAnchor="middle" fontSize="15" fill="#f0b24a" direction="rtl">{c.charge}</text>
          <line x1={x(12)} y1={TOP - 14} x2={x(12)} y2={TOP + 30} stroke="#f0b24a" strokeWidth="1" />
          <text x={x(12)} y={BASE - 20} textAnchor="middle" fontSize="15" fill="rgba(242,237,227,0.85)" direction="rtl">{c.export}</text>
        </m.g>
        <m.g {...show(1.5)}>
          <text x={x(20.5)} y={CAP - 30} textAnchor="middle" fontSize="15" fill="#f0b24a" direction="rtl">{c.discharge}</text>
          <line x1={x(20.5)} y1={CAP - 24} x2={x(20.5)} y2={CAP - 4} stroke="#f0b24a" strokeWidth="1" />
        </m.g>
      </svg>
      <p className="mt-5 text-small text-limestone/70 max-w-[46ch]">{c.caption}</p>
    </figure>
  );
}
