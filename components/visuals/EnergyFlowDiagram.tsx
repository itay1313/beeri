"use client";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { home } from "@/content/home";
import { useCapabilities } from "@/components/motion/useCapabilities";

type Mode = "day" | "peak";

/**
 * Sun → panels → production → battery → grid, as a product visualization.
 * Two states: day (produce, export within the connection, charge) and peak hours (discharge to grid).
 * Auto-cycles every 8s, pauses on hover/focus, static under reduced motion. Keyboard-operable toggle.
 */
export function EnergyFlowDiagram({ className }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("day");
  const [paused, setPaused] = useState(false);
  const caps = useCapabilities();
  const uid = useId();
  const c = home.howItWorks;

  useEffect(() => {
    if (caps.reducedMotion || paused) return;
    const t = setInterval(() => setMode((m) => (m === "day" ? "peak" : "day")), 8000);
    return () => clearInterval(t);
  }, [caps.reducedMotion, paused]);

  const day = mode === "day";
  const animate = !caps.reducedMotion;

  // geometry (RTL: sun on the right, grid on the left)
  const y = 150;
  const xs = { sun: 900, pv: 700, prod: 500, bat: 300, grid: 100 };

  return (
    <div
      className={cn("relative", className)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div role="radiogroup" aria-label="מצב המערכת" className="flex items-center gap-2 mb-8">
        {(["day", "peak"] as Mode[]).map((m) => (
          <button
            key={m}
            role="radio"
            aria-checked={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "min-h-11 px-6 rounded-full text-[0.95rem] font-medium border transition-colors duration-200",
              mode === m ? "bg-cell-950 text-limestone border-cell-950" : "border-line text-ink hover:border-ink",
            )}
          >
            {c.states[m].label}
          </button>
        ))}
      </div>

      <div tabIndex={0} role="region" aria-label="תרשים זרימת האנרגיה (גלילה אופקית)" className="overflow-x-auto -mx-[var(--page-x)] px-[var(--page-x)] md:mx-0 md:px-0 md:overflow-visible focus-visible:outline-offset-[-2px]">
      <svg viewBox="0 0 1000 300" role="img" aria-labelledby={`${uid}-t`} aria-describedby={`${uid}-d`} className="min-w-[40rem] md:min-w-0 w-full h-auto overflow-visible">
        <title id={`${uid}-t`}>תרשים זרימת אנרגיה: שמש, פאנלים, ייצור, אגירה ורשת</title>
        <desc id={`${uid}-d`}>{c.states[mode].text}</desc>
        <style>{`
          .efd-link { stroke: var(--color-line); stroke-width: 1.5; fill: none; transition: stroke .5s; }
          .efd-link.on { stroke: var(--color-amber-500); stroke-dasharray: 5 9; }
          ${animate ? ".efd-link.on { animation: efdFlow 1.4s linear infinite; } .efd-link.on.rev { animation-direction: reverse; }" : ""}
          @keyframes efdFlow { to { stroke-dashoffset: -28; } }
          .efd-node { transition: opacity .5s, fill .5s, stroke .5s; }
          .efd-dim { opacity: .35; }
          .efd-ray { transform-origin: ${xs.sun}px ${y - 40}px; transition: opacity .5s; }
          ${animate ? ".efd-sun-on .efd-ray { animation: efdRay 4s ease-in-out infinite; }" : ""}
          @keyframes efdRay { 0%,100% { opacity: .5 } 50% { opacity: 1 } }
        `}</style>

        {/* links (RTL: forward = toward the left) */}
        <line x1={xs.sun - 40} y1={y} x2={xs.pv + 60} y2={y} className={cn("efd-link", day && "on")} />
        <line x1={xs.pv - 60} y1={y} x2={xs.prod + 44} y2={y} className={cn("efd-link", day && "on")} />
        {/* production → grid (straight, within the approved connection) */}
        <path d={`M ${xs.prod - 44} ${y} H ${xs.bat + 70} `} className={cn("efd-link", day && "on")} />
        <path d={`M ${xs.bat - 70} ${y} H ${xs.grid + 30}`} className={cn("efd-link", day && "on")} />
        {/* production → battery: surplus (down branch) */}
        <path d={`M ${xs.prod} ${y + 44} V ${y + 90} H ${xs.bat} V ${y + 46}`} className={cn("efd-link", day && "on")} />
        {/* battery → grid at peak */}
        <path d={`M ${xs.bat} ${y - 46} V ${y - 90} H ${xs.grid} V ${y - 40}`} className={cn("efd-link", !day && "on")} />

        {/* SUN */}
        <g className={cn("efd-node", day ? "efd-sun-on" : "efd-dim")}>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const r1 = 44, r2 = 58;
            return (
              <line
                key={i}
                className="efd-ray"
                x1={r2f(xs.sun + Math.cos(a) * r1)}
                y1={r2f(y - 40 + Math.sin(a) * r1)}
                x2={r2f(xs.sun + Math.cos(a) * r2)}
                y2={r2f(y - 40 + Math.sin(a) * r2)}
                stroke="var(--color-amber-500)"
                strokeWidth="1.5"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            );
          })}
          <circle cx={xs.sun} cy={y - 40} r="34" fill="var(--color-amber-500)" />
        </g>
        {/* PANELS */}
        <g className="efd-node">
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: 4 }).map((_, cIdx) => (
              <rect
                key={`${r}${cIdx}`}
                x={xs.pv - 54 + cIdx * 28}
                y={y - 40 + r * 28}
                width="24"
                height="24"
                fill={day ? "var(--color-cell-800)" : "var(--color-cell-700)"}
                stroke="var(--color-cell-950)"
                strokeWidth="1"
              />
            )),
          )}
        </g>
        {/* PRODUCTION (meter) */}
        <g className="efd-node">
          <circle cx={xs.prod} cy={y} r="40" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
          <path d={`M ${xs.prod - 26} ${y + 14} A 30 30 0 0 1 ${xs.prod + 26} ${y + 14}`} fill="none" stroke="var(--color-line)" strokeWidth="6" strokeLinecap="butt" />
          <path
            d={`M ${xs.prod - 26} ${y + 14} A 30 30 0 0 1 ${xs.prod + 26} ${y + 14}`}
            fill="none"
            stroke="var(--color-amber-500)"
            strokeWidth="6"
            pathLength={100}
            strokeDasharray={day ? "78 100" : "22 100"}
            style={{ transition: "stroke-dasharray .8s cubic-bezier(.2,.7,.2,1)" }}
          />
          <line x1={xs.prod} y1={y + 14} x2={xs.prod + (day ? 18 : -18)} y2={y - 8} stroke="var(--color-ink)" strokeWidth="2" style={{ transition: "all .8s cubic-bezier(.2,.7,.2,1)" }} />
        </g>
        {/* BATTERY */}
        <g className="efd-node">
          <rect x={xs.bat - 70} y={y - 46} width="140" height="92" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
          <rect x={xs.bat - 56} y={y - 32} width="112" height="64" fill="var(--color-dust)" />
          <rect
            x={xs.bat - 56}
            y={y - 32}
            width={day ? 96 : 40}
            height="64"
            fill="var(--color-amber-500)"
            style={{ transition: "width 1.2s cubic-bezier(.2,.7,.2,1)" }}
          />
          <rect x={xs.bat + 70} y={y - 12} width="8" height="24" fill="var(--color-ink)" />
        </g>
        {/* GRID (pole) */}
        <g className="efd-node">
          <line x1={xs.grid} y1={y - 40} x2={xs.grid} y2={y + 46} stroke="var(--color-ink)" strokeWidth="3" />
          <line x1={xs.grid - 34} y1={y - 26} x2={xs.grid + 34} y2={y - 26} stroke="var(--color-ink)" strokeWidth="2.5" />
          <line x1={xs.grid - 24} y1={y - 8} x2={xs.grid + 24} y2={y - 8} stroke="var(--color-ink)" strokeWidth="2" />
          <path d={`M ${xs.grid - 34} ${y - 26} q 17 14 34 0 q 17 14 34 0`} fill="none" stroke="var(--color-ink-soft)" strokeWidth="1" />
        </g>

        {/* labels */}
        {(
          [
            ["sun", xs.sun, y - 40],
            ["pv", xs.pv, y],
            ["production", xs.prod, y],
            ["battery", xs.bat, y],
            ["grid", xs.grid, y],
          ] as const
        ).map(([id, x]) => (
          <text key={id} x={x} y={y + 130} textAnchor="middle" fontSize="18" fontWeight="500" fill="var(--color-ink)">
            {c.nodes.find((n) => n.id === id)?.label}
          </text>
        ))}
      </svg>
      </div>

      <p aria-live="polite" className="mt-6 max-w-[52ch] text-lede font-light text-ink-soft">
        <span className="text-label text-amber-700 me-3">{c.states[mode].label}</span>
        {c.states[mode].text}
      </p>
    </div>
  );
}

function r2f(n: number) {
  return n.toFixed(2);
}
