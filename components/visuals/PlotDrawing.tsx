import { cn } from "@/lib/cn";

/**
 * Survey drawing of a nahala plot (חלקה א׳): a long, narrow strip, as these plots are. The
 * residence sits at the road end (bottom), then the hatched buffer, then the field with the PV
 * area inside it. Percent-based viewBox so it stretches with its container; strokes stay 1px.
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
      {/* plot outline: a strip about four times longer than it is wide, slightly off-square like a surveyed plot */}
      <polygon points="58,2 95,3.5 94,98 57,96.5" fill="none" stroke={line} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      {/* PV area inside the field (dots live here) */}
      <polygon points="62,7 91,8.2 90.4,60 61.4,59" fill="none" stroke={faint} strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
      {/* buffer 2.5 dunam, between the field and the residence */}
      <polygon points="58.3,63 94.4,64.3 94.3,72 58.2,70.8" fill={`url(#${id}-hatch)`} stroke={faint} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {/* residence + farm building at the road end */}
      <rect x="62" y="84" width="12" height="9" fill="none" stroke={line} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <rect x="78" y="76" width="12" height="17" fill="none" stroke={faint} strokeWidth="1" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
      {/* dimension line: PV length, along the field */}
      <line x1="51" y1="7" x2="51" y2="59" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="48" y1="7" x2="54" y2="7" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="48" y1="59" x2="54" y2="59" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {/* dimension line: buffer depth */}
      <line x1="51" y1="63" x2="51" y2="70.8" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="48" y1="63" x2="54" y2="63" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="48" y1="70.8" x2="54" y2="70.8" stroke={amber} strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
