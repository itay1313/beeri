import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/** Raster logo (client supplied no vector). Aspect 514×404. */
export function Logo({ tone = "navy", className, height = 44 }: { tone?: "navy" | "paper"; className?: string; height?: number }) {
  const width = Math.round((514 / 404) * height);
  return (
    <Link href="/" aria-label={`${site.name} – דף הבית`} className={cn("inline-flex shrink-0", className)}>
      <Image
        src={tone === "paper" ? "/logo/beeri-logo-paper.png" : "/logo/beeri-logo-navy.png"}
        alt=""
        width={width}
        height={height}
        priority
        className="h-auto"
        style={{ width, height }}
      />
    </Link>
  );
}
