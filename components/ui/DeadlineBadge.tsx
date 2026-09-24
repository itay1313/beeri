import { cn } from "@/lib/cn";

/** Amber pill for time-limited offers. The dot pulses once per 2s; still under reduced motion. */
export function DeadlineBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2.5 rounded-full bg-amber-500 ps-3 pe-4 py-1.5 text-label text-cell-950 font-medium", className)}>
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inset-0 rounded-full bg-cell-950 opacity-60 motion-safe:animate-ping [animation-duration:2s]" />
        <span className="relative size-2 rounded-full bg-cell-950" />
      </span>
      {children}
    </p>
  );
}
