import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-3 font-medium text-[1.0625rem] leading-none transition-[background-color,color,border-color,transform] duration-200 ease-out-expo select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-amber-500 text-cell-950 hover:bg-amber-400 active:translate-y-px min-h-[3.25rem] px-7 rounded-full",
  dark:
    "bg-cell-950 text-limestone hover:bg-cell-800 active:translate-y-px min-h-[3.25rem] px-7 rounded-full",
  ghost:
    "border border-ink/25 text-ink hover:border-ink min-h-[3.25rem] px-7 rounded-full",
};

/**
 * Arrow in the reading direction. "forward" points left in RTL (the next thing), "down" for in-page jumps.
 * Direction is explicit so it never depends on stylesheet order.
 */
export function ArrowIcon({ className, direction = "forward" }: { className?: string; direction?: "forward" | "down" }) {
  const down = direction === "down";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={cn(
        "size-[1.1em] shrink-0 transition-transform duration-200 ease-out-expo",
        down ? "group-hover:translate-y-1" : "-scale-x-100 group-hover:-translate-x-1",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
    >
      {down ? <path d="M10 3v13M4 10l6 6 6-6" /> : <path d="M3 10h13M11 4l6 6-6 6" />}
    </svg>
  );
}

type Props = {
  href?: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({ href, variant = "primary", arrow = false, className, children, ...rest }: Props) {
  const cls = cn(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        <span>{children}</span>
        {arrow && <ArrowIcon />}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      <span>{children}</span>
      {arrow && <ArrowIcon />}
    </button>
  );
}
