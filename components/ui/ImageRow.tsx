import { cn } from "@/lib/cn";
import type { SiteImage } from "@/content/images";
import { ImagePanel } from "./ImagePanel";

type Props = {
  index: string;
  title: string;
  body: string;
  image: SiteImage;
  caption?: string;
  flip?: boolean;
  children?: React.ReactNode;
};

/** Photo + text row for solution pages. Alternates sides with `flip`. Caption follows the "(01)" convention. */
export function ImageRow({ index, title, body, image, caption, flip = false, children }: Props) {
  return (
    <article className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-center border-t border-line py-12 lg:py-20">
      <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
        <ImagePanel image={image} cut={flip ? "tr" : "tl"} sizes="(min-width:1024px) 56vw, 100vw" className="aspect-[3/2]" />
        <div className="mt-3 flex justify-between text-label text-ink-soft">
          <span>{caption ?? image.alt}</span>
          <span className="font-tzar text-[0.95rem] tabular">({index})</span>
        </div>
      </div>
      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <span className="font-tzar text-[2.75rem] font-bold leading-none text-amber-700">{index}</span>
        <h3 className="text-h3 mt-3 text-ink">{title}</h3>
        <p className="mt-4 text-ink-soft max-w-[48ch]">{body}</p>
        {children}
      </div>
    </article>
  );
}
