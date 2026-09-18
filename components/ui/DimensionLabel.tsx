import { cn } from "@/lib/cn";

/** Survey-style annotation: tick line + label + value in tabular numerals. */
export function DimensionLabel({ label, value, dark = false, className }: { label: string; value: string; dark?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-baseline gap-3", dark ? "text-limestone" : "text-ink", className)}>
      <span aria-hidden="true" className={cn("block h-px w-6 self-center", dark ? "bg-amber-400" : "bg-amber-500")} />
      <span className={cn("text-label", dark ? "text-limestone/60" : "text-ink-soft")}>{label}</span>
      <span className="font-tzar text-[1.35rem] font-bold leading-none">{value}</span>
    </div>
  );
}
