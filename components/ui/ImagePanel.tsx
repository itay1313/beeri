import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/content/images";

type Props = {
  image: SiteImage;
  cut?: "tl" | "tr" | "bl" | "br" | "none";
  sizes?: string;
  className?: string;
  imgClassName?: string;
};

/** Photograph with one 45° panel-cut corner. Wrapper needs an explicit aspect ratio or size. */
export function ImagePanel({ image, cut = "none", sizes = "100vw", className, imgClassName }: Props) {
  return (
    <div className={cn("relative overflow-hidden", cut !== "none" && `cut-${cut}`, className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
