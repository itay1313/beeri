import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "ghost" | "ghost-dark" | "link";

const base =
  "group inline-flex items-center justify-center gap-3 font-medium text-[1.0625rem] leading-none transition-[background-color,color,border-color,transform] duration-200 ease-out-expo select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-amber-500 text-cell-950 hover:bg-amber-400 active:translate-y-px min-h-[3.25rem] px-7 rounded-full",
  dark:
    "bg-cell-950 text-limestone hover:bg-cell-800 active:translate-y-px min-h-[3.25rem] px-7 rounded-full",
  ghost:
    "border border-ink/25 text-ink hover:border-ink min-h-[3.25rem] px-7 rounded-full",
  "ghost-dark":
    "border border-line-dark text-limestone hover:border-limestone min-h-[3.25rem] px-7 rounded-full",
  link: "text-current underline-offset-[6px] decoration-1 decoration-amber-500 hover:underline",
};

/** Arrow points "forward" in the reading direction (left in RTL). */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={cn("size-[1.1em] shrink-0 rtl:-scale-x-100 transition-transform duration-200 ease-out-expo group-hover:translate-x-1 rtl:group-hover:-translate-x-1", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
    >
      <path d="M3 10h13M11 4l6 6-6 6" />
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
