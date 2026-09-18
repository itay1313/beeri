import { cn } from "@/lib/cn";

/** Horizontal rule with an optional amber tick at the start edge. */
export function Hairline({ tick = false, dark = false, className }: { tick?: boolean; dark?: boolean; className?: string }) {
  return (
    <div role="presentation" className={cn("relative", dark ? "hairline-dark" : "hairline", className)}>
      {tick && <span className="absolute -top-px start-0 h-px w-8 bg-amber-500" />}
    </div>
  );
}
