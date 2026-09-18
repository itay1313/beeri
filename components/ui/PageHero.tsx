import Image from "next/image";
import type { SiteImage } from "@/content/images";

type Props = {
  eyebrow: string;
  titleLines: readonly string[];
  lede?: string;
  image: SiteImage;
};

/** Inner-page opener: full-bleed photo, giant title at the inline start, lede below. */
export function PageHero({ eyebrow, titleLines, lede, image }: Props) {
  return (
    <section data-tone="dark" className="relative overflow-hidden bg-cell-950 text-limestone min-h-[72svh] lg:min-h-[78svh] flex flex-col justify-end">
      <div aria-hidden="true" className="absolute inset-0">
        <Image src={image.src} alt="" fill preload sizes="100vw" className="object-cover hero-kenburns" />
        {/* legibility: a flat base dim, a tall bottom fade under the text block, and a side fade on the text side (right in RTL) */}
        <div className="absolute inset-0 bg-cell-950/35" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,17,23,0.97)_0%,rgba(12,17,23,0.85)_30%,rgba(12,17,23,0.55)_58%,rgba(12,17,23,0.1)_85%,rgba(12,17,23,0.4)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(12,17,23,0.7)_0%,rgba(12,17,23,0.35)_45%,rgba(12,17,23,0)_75%)]" />
      </div>
      <div className="container-page relative z-10 pt-[9rem] pb-12 lg:pb-16">
        <div className="lg:grid lg:grid-cols-12 lg:items-end gap-8">
          <div className="lg:col-span-8">
            <p className="hero-in text-label text-amber-400 mb-5 flex items-center gap-3 [text-shadow:0_1px_12px_rgba(12,17,23,0.8)]" style={{ ["--i" as string]: 0 }}>
              <span aria-hidden="true" className="block h-px w-8 bg-amber-400" />
              {eyebrow}
            </p>
            <h1 className="text-display text-limestone [text-shadow:0_2px_24px_rgba(12,17,23,0.45)]">
              {titleLines.map((l, i) => (
                <span key={l} className="hero-in block" style={{ ["--i" as string]: i + 1 }}>{l}</span>
              ))}
            </h1>
          </div>
          {lede && (
            <p className="hero-in lg:col-span-4 text-lede font-light text-limestone/85 mt-8 lg:mt-0 max-w-[40ch]" style={{ ["--i" as string]: 3 }}>
              {lede}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
