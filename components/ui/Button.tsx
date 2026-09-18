import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "ghost" | "ghost-dark";

const base =
  "group inline-flex items-center justify-center font-medium leading-none rounded-full transition-[background-color,color,border-color,transform] duration-200 ease-out-expo select-none";

/** Default size. Pass `size: "custom"` to buttonClass() and supply your own sizing instead. */
const sizeMd = "gap-3 min-h-[3.25rem] px-7 text-[1.0625rem]";

const variants: Record<Variant, string> = {
  primary: "bg-amber-500 text-cell-950 hover:bg-amber-400 active:translate-y-px",
  dark: "bg-cell-950 text-limestone hover:bg-cell-800 active:translate-y-px",
  ghost: "border border-ink/25 text-ink hover:border-ink",
  "ghost-dark": "border border-limestone/30 text-limestone hover:border-limestone",
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

/**
 * Button styling for plain anchors (tel:, mailto:, external). With size "custom" no sizing classes are
 * added, so the caller's min-height / padding / font size apply without fighting the defaults.
 */
export function buttonClass(variant: Variant = "primary", className?: string, size: "md" | "custom" = "md") {
  return cn(base, variants[variant], size === "md" && sizeMd, className);
}

export function Button({ href, variant = "primary", arrow = false, className, children, ...rest }: Props) {
  const cls = cn(base, variants[variant], sizeMd, className);
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
