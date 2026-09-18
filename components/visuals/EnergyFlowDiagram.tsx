"use client";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { home } from "@/content/home";
import { useCapabilities } from "@/components/motion/useCapabilities";
import { PauseButton } from "@/components/ui/PauseButton";

type Mode = "day" | "peak";
type NodeId = "sun" | "pv" | "production" | "battery" | "grid";
type Pt = { x: number; y: number };

/**
 * Sun → panels → production → battery → grid, as a product visualization.
 * Two states: day (produce, export within the connection, charge) and peak hours (discharge).
 * Horizontal on tablet/desktop, vertical on phones — same node drawings, no horizontal scroll.
 * Auto-cycles every 8s, pauses on hover/focus, static under reduced motion.
 */
export function EnergyFlowDiagram({ className }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("day");
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [announce, setAnnounce] = useState("");
  const caps = useCapabilities();
  const uid = useId();
  const c = home.howItWorks;

  const paused = stopped || hovered;
  useEffect(() => {
    if (caps.reducedMotion || paused) return;
    const t = setInterval(() => setMode((m) => (m === "day" ? "peak" : "day")), 8000);
    return () => clearInterval(t);
  }, [caps.reducedMotion, paused]);

  const day = mode === "day";
  const animate = !caps.reducedMotion;
  const label = (id: NodeId) => c.nodes.find((n) => n.id === id)?.label ?? "";

  // RTL reading order: sun on the right (horizontal) / top (vertical)
  const H = { sun: { x: 900, y: 110 }, pv: { x: 700, y: 150 }, production: { x: 500, y: 150 }, battery: { x: 300, y: 150 }, grid: { x: 100, y: 150 } };
  const V = { sun: { x: 124, y: 70 }, pv: { x: 124, y: 205 }, production: { x: 124, y: 330 }, battery: { x: 124, y: 460 }, grid: { x: 124, y: 600 } };
  /** phone labels sit in their own column on the reading side, clear of every drawing */
  const LABEL_X = 330;

  return (
    <div
      className={cn("relative", className)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div role="radiogroup" aria-label="מצב המערכת" className="flex items-center gap-2 mb-8">
        {(["day", "peak"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            onClick={() => {
              setMode(m);
              setStopped(true); // the reader took control: stop cycling
              setAnnounce(`${c.states[m].label}: ${c.states[m].text}`);
            }}
            className={cn(
              "min-h-11 px-6 rounded-full text-[0.95rem] font-medium border transition-colors duration-200",
              mode === m ? "bg-cell-950 text-limestone border-cell-950" : "border-line text-ink hover:border-ink",
            )}
          >
            {c.states[m].label}
          </button>
        ))}
        {!caps.reducedMotion && (
          <PauseButton className="ms-auto" paused={stopped} onToggle={() => setStopped((v) => !v)} label="ההחלפה האוטומטית" />
        )}
      </div>

      <DiagramStyles animate={animate} />

      {/* tablet / desktop: horizontal */}
      <svg viewBox="0 0 1000 300" role="img" aria-labelledby={`${uid}-t`} aria-describedby={`${uid}-d`} className="hidden md:block w-full h-auto overflow-visible">
        <title id={`${uid}-t`}>תרשים זרימת אנרגיה: שמש, פאנלים, ייצור, אגירה ורשת</title>
        <desc id={`${uid}-d`}>{c.states[mode].text}</desc>
        <Link d={`M ${H.sun.x - 60} ${H.pv.y} H ${H.pv.x + 60}`} on={day} />
        <Link d={`M ${H.pv.x - 60} ${H.pv.y} H ${H.production.x + 44}`} on={day} />
        <Link d={`M ${H.production.x - 44} ${H.pv.y} H ${H.battery.x + 70}`} on={day} />
        <Link d={`M ${H.battery.x - 70} ${H.pv.y} H ${H.grid.x + 30}`} on={day} />
        <Link d={`M ${H.production.x} ${H.pv.y + 44} V ${H.pv.y + 90} H ${H.battery.x} V ${H.pv.y + 46}`} on={day} />
        <Link d={`M ${H.battery.x} ${H.pv.y - 46} V ${H.pv.y - 90} H ${H.grid.x} V ${H.pv.y - 40}`} on={!day} />
        <Sun at={H.sun} day={day} />
        <Panels at={H.pv} day={day} />
        <Meter at={H.production} day={day} />
        <Battery at={H.battery} day={day} />
        <Grid at={H.grid} />
        {(Object.keys(H) as NodeId[]).map((id) => (
          <text key={id} x={H[id].x} y={280} textAnchor="middle" fontSize="18" fontWeight="500" fill="var(--color-ink)">{label(id)}</text>
        ))}
      </svg>

      {/* phone: vertical, labels beside each node */}
      <svg viewBox="0 0 340 680" role="img" aria-labelledby={`${uid}-tm`} aria-describedby={`${uid}-d`} className="md:hidden w-full max-w-[22rem] mx-auto h-auto overflow-visible">
        <title id={`${uid}-tm`}>תרשים זרימת אנרגיה: שמש, פאנלים, ייצור, אגירה ורשת</title>
        <Link d={`M ${V.sun.x} ${V.sun.y + 58} V ${V.pv.y - 44}`} on={day} />
        <Link d={`M ${V.pv.x} ${V.pv.y + 44} V ${V.production.y - 44}`} on={day} />
        <Link d={`M ${V.production.x} ${V.production.y + 44} V ${V.battery.y - 46}`} on={day} />
        {/* export within the connection: bypass on the inline-end side (left) */}
        <Link d={`M ${V.production.x - 44} ${V.production.y} H 18 V ${V.grid.y} H ${V.grid.x - 36}`} on={day} />
        <Link d={`M ${V.battery.x} ${V.battery.y + 46} V ${V.grid.y - 44}`} on={!day} />
        <Sun at={V.sun} day={day} />
        <Panels at={V.pv} day={day} />
        <Meter at={V.production} day={day} />
        <Battery at={V.battery} day={day} />
        <Grid at={V.grid} />
        {(Object.keys(V) as NodeId[]).map((id) => (
          <text key={id} x={LABEL_X} y={V[id].y + 7} textAnchor="start" direction="rtl" fontSize="21" fontWeight="500" fill="var(--color-ink)">{label(id)}</text>
        ))}
      </svg>

      <p role="status" className="visually-hidden">{announce}</p>
      <p className="mt-6 max-w-[52ch] text-lede font-light text-ink-soft">
        <span className="text-label text-amber-700 me-3">{c.states[mode].label}</span>
        {c.states[mode].text}
      </p>
    </div>
  );
}

function DiagramStyles({ animate }: { animate: boolean }) {
  return (
    <style>{`
      .efd-link { stroke: var(--color-line); stroke-width: 1.5; fill: none; transition: stroke .5s; }
      .efd-link.on { stroke: var(--color-amber-500); stroke-dasharray: 5 9; }
      ${animate ? ".efd-link.on { animation: efdFlow 1.4s linear infinite; }" : ""}
      @keyframes efdFlow { to { stroke-dashoffset: -28; } }
      .efd-node { transition: opacity .5s; }
      .efd-dim { opacity: .35; }
      ${animate ? ".efd-sun-on .efd-ray { animation: efdRay 4s ease-in-out infinite; }" : ""}
      @keyframes efdRay { 0%,100% { opacity: .5 } 50% { opacity: 1 } }
    `}</style>
  );
}

function Link({ d, on }: { d: string; on: boolean }) {
  return <path d={d} className={cn("efd-link", on && "on")} />;
}

const f2 = (n: number) => n.toFixed(2);

function Sun({ at, day }: { at: Pt; day: boolean }) {
  return (
    <g className={cn("efd-node", day ? "efd-sun-on" : "efd-dim")}>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line
            key={i}
            className="efd-ray"
            x1={f2(at.x + Math.cos(a) * 44)}
            y1={f2(at.y + Math.sin(a) * 44)}
            x2={f2(at.x + Math.cos(a) * 58)}
            y2={f2(at.y + Math.sin(a) * 58)}
            stroke="var(--color-amber-500)"
            strokeWidth="1.5"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        );
      })}
      <circle cx={at.x} cy={at.y} r="34" fill="var(--color-amber-500)" />
    </g>
  );
}

function Panels({ at, day }: { at: Pt; day: boolean }) {
  return (
    <g className="efd-node">
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 4 }).map((_, col) => (
          <rect
            key={`${r}${col}`}
            x={at.x - 54 + col * 28}
            y={at.y - 40 + r * 28}
            width="24"
            height="24"
            fill={day ? "var(--color-cell-800)" : "var(--color-cell-700)"}
            stroke="var(--color-cell-950)"
            strokeWidth="1"
          />
        )),
      )}
    </g>
  );
}

function Meter({ at, day }: { at: Pt; day: boolean }) {
  const arc = `M ${at.x - 26} ${at.y + 14} A 30 30 0 0 1 ${at.x + 26} ${at.y + 14}`;
  return (
    <g className="efd-node">
      <circle cx={at.x} cy={at.y} r="40" fill="var(--color-limestone)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <path d={arc} fill="none" stroke="var(--color-line)" strokeWidth="6" />
      <path
        d={arc}
        fill="none"
        stroke="var(--color-amber-500)"
        strokeWidth="6"
        pathLength={100}
        strokeDasharray={day ? "78 100" : "22 100"}
        style={{ transition: "stroke-dasharray .8s cubic-bezier(.2,.7,.2,1)" }}
      />
      <line x1={at.x} y1={at.y + 14} x2={at.x + (day ? 18 : -18)} y2={at.y - 8} stroke="var(--color-ink)" strokeWidth="2" style={{ transition: "all .8s cubic-bezier(.2,.7,.2,1)" }} />
    </g>
  );
}

function Battery({ at, day }: { at: Pt; day: boolean }) {
  return (
    <g className="efd-node">
      <rect x={at.x - 70} y={at.y - 46} width="140" height="92" fill="var(--color-limestone)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <rect x={at.x - 56} y={at.y - 32} width="112" height="64" fill="var(--color-dust)" />
      <rect x={at.x - 56} y={at.y - 32} width={day ? 96 : 40} height="64" fill="var(--color-amber-500)" style={{ transition: "width 1.2s cubic-bezier(.2,.7,.2,1)" }} />
      <rect x={at.x + 70} y={at.y - 12} width="8" height="24" fill="var(--color-ink)" />
    </g>
  );
}

function Grid({ at }: { at: Pt }) {
  return (
    <g className="efd-node">
      <line x1={at.x} y1={at.y - 40} x2={at.x} y2={at.y + 46} stroke="var(--color-ink)" strokeWidth="3" />
      <line x1={at.x - 34} y1={at.y - 26} x2={at.x + 34} y2={at.y - 26} stroke="var(--color-ink)" strokeWidth="2.5" />
      <line x1={at.x - 24} y1={at.y - 8} x2={at.x + 24} y2={at.y - 8} stroke="var(--color-ink)" strokeWidth="2" />
      <path d={`M ${at.x - 34} ${at.y - 26} q 17 14 34 0 q 17 14 34 0`} fill="none" stroke="var(--color-ink-soft)" strokeWidth="1" />
    </g>
  );
}
