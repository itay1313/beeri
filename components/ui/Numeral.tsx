import { cn } from "@/lib/cn";

/** Oversized survey numeral (01, 2026, 10). */
export function Numeral({ children, className, hollow = false }: { children: React.ReactNode; className?: string; hollow?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn("text-numeral block select-none", hollow && "font-light", className)}
    >
      {children}
    </span>
  );
}
