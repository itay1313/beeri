import Link from "next/link";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import { HeroMedia } from "@/components/visuals/HeroMedia";
import { Magnetic } from "@/components/motion/Magnetic";

/**
 * Full-bleed photograph (or drone video) with the headline set over it at the inline start.
 * The "surveyed plot" language survives as a thin annotation strip along the bottom.
 */
export function Hero() {
  const h = home.hero;
  return (
    <section
      id="top"
      data-tone="dark"
      className="relative overflow-hidden bg-cell-950 text-limestone min-h-[100svh] lg:h-[max(100svh,52rem)] flex flex-col"
    >
      <HeroMedia />

      <div className="container-page relative z-10 flex-1 flex flex-col justify-center pt-[7rem] pb-[8.5rem] lg:pt-[8rem] lg:pb-[10rem]">
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-8 xl:col-span-7">
            <p className="hero-in text-label text-amber-400 mb-6 ltr text-end" style={{ ["--i" as string]: 0 }}>{h.eyebrow}</p>
            <h1 className="text-display text-limestone">
              {h.titleLines.map((line, i) => (
                <span key={i} className="hero-in block" style={{ ["--i" as string]: i + 1 }}>{line}</span>
              ))}
            </h1>
            <p className="hero-in text-lede font-light text-limestone/85 mt-8 max-w-[44ch]" style={{ ["--i" as string]: 4 }}>{h.lede}</p>
            <div className="hero-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ ["--i" as string]: 5 }}>
              <Magnetic>
                <Button href={site.contactPath} arrow>{site.cta.primary}</Button>
              </Magnetic>
              <Link href={h.secondary.href} className="group inline-flex items-center gap-2 font-medium text-limestone/85 hover:text-limestone">
                {h.secondary.label}
                <ArrowIcon direction="down" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* annotation strip: the plot's real numbers, survey style */}
      <div className="hero-fade absolute inset-x-0 bottom-0 z-10">
        <div className="container-page">
          <div className="border-t border-line-dark py-5 lg:py-6 flex flex-wrap items-center gap-x-10 gap-y-3">
            <span className="text-label text-limestone/60 me-2">{h.photoCaption}</span>
            {h.annotations.map((a) => (
              <DimensionLabel key={a.label} dark label={a.label} value={a.value} />
            ))}
            <a
              href="#expertise"
              className="ms-auto hidden md:flex min-h-8 items-center gap-3 text-label text-limestone/75 hover:text-limestone"
            >
              <span className="font-tzar text-[1rem] font-bold">01</span>
              <span aria-hidden="true" className="block h-px w-8 bg-line-dark" />
              {h.scrollCue}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
