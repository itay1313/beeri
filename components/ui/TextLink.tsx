import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./Button";

/** Underlined text link with a forward arrow. The quieter sibling of Button. */
export function TextLink({ href, children, dark = false, className }: { href: string; children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-3 font-medium border-b border-amber-500",
        dark ? "text-limestone hover:text-amber-400" : "text-ink hover:text-amber-700",
        className,
      )}
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}
