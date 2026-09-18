import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/content/images";

type Props = {
  image: SiteImage;
  cut?: "tl" | "tr" | "bl" | "br" | "none";
  duotone?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
};

/** Photograph with one 45° panel-cut corner, optional duotone. Wrapper needs explicit aspect/size. */
export function ImagePanel({ image, cut = "none", duotone = false, priority = false, sizes = "100vw", className, imgClassName }: Props) {
  return (
    <div className={cn("relative overflow-hidden", cut !== "none" && `cut-${cut}`, duotone && "duotone", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
