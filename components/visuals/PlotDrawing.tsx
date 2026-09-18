import { cn } from "@/lib/cn";

/**
 * Survey drawing of a nahala plot (חלקה א׳): outline, residence, hatched buffer, PV area.
 * Percent-based viewBox so it stretches with its container; strokes stay 1px.
 */
export function PlotDrawing({ className, dark = true, id = "plot" }: { className?: string; dark?: boolean; id?: string }) {
  const base = dark ? "var(--color-limestone)" : "var(--color-ink)";
  const line = `color-mix(in srgb, ${base} 35%, transparent)`;
  const faint = `color-mix(in srgb, ${base} 12%, transparent)`;
  const amber = "var(--color-amber-500)";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <pattern id={`${id}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={faint} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        </pattern>
      </defs>
      {/* plot outline */}
      <polygon points="3,18 66,14 67,82 4,86" fill="none" stroke={line} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      {/* PV area (dots live here) */}
      <polygon points="6,22 42,20 43,80 7,82" fill="none" stroke={faint} strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
      {/* buffer 2.5 dunam */}
      <polygon points="45,20 55,19.5 55.5,80.5 45.5,80" fill={`url(#${id}-hatch)`} stroke={faint} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {/* residence + farm building */}
      <rect x="58" y="60" width="6.5" height="18" fill="none" stroke={line} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <rect x="58" y="24" width="6.5" height="30" fill="none" stroke={faint} strokeWidth="1" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
      {/* dimension line: PV width */}
      <line x1="6" y1="12" x2="42" y2="10.5" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="6" y1="9" x2="6" y2="15" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="42" y1="7.5" x2="42" y2="13.5" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {/* dimension line: buffer */}
      <line x1="45" y1="90" x2="55.5" y2="90" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="45" y1="87" x2="45" y2="93" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="55.5" y1="87" x2="55.5" y2="93" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
