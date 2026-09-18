import { cn } from "@/lib/cn";

/** The logo's half-sun abstracted: amber glow rising on a horizon hairline. Physically centered. */
export function SunHorizon({ size = 320, className, lineClassName }: { size?: number; className?: string; lineClassName?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative pointer-events-none overflow-hidden", className)}>
      <div className={cn("absolute inset-x-0 bottom-0 h-px", lineClassName ?? "bg-line-dark")} />
      <div
        className="absolute bottom-0 left-1/2 sun-glow rounded-full"
        style={{ width: size * 1.9, height: size * 1.9, transform: "translate(-50%, 50%)" }}
      />
      <div
        className="absolute bottom-0 left-1/2 bg-amber-500"
        style={{ width: size * 0.36, height: size * 0.18, transform: "translateX(-50%)", borderRadius: `${size}px ${size}px 0 0` }}
      />
    </div>
  );
}
