import Link from "next/link";
import { home } from "@/content/home";
import { images } from "@/content/images";
import { pages } from "@/content/pages";
import { ImagePanel } from "@/components/ui/ImagePanel";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { specSheet } from "@/content/spec";
import { CountUp } from "@/components/motion/CountUp";

/** Home teaser for the nahala page: an edge-to-edge aerial with the options panel overlapping it. */
export function LandTeaser() {
  const l = home.land;
  const facts = specSheet.slice(0, 3);
  return (
    <section id="land" data-tone="light" className="bg-limestone scroll-mt-20 overflow-hidden">
      <div className="container-page pt-[var(--section-y)]">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading index={l.index} eyebrow="חלקה א׳" title={l.heading} />
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-ink-soft">{l.intro}</p>
        </Reveal>
      </div>

      {/* edge-to-edge photograph */}
      <div className="mt-12 lg:mt-16">
        <ImageReveal>
          <Link href={pages.nahala.path} className="group block">
            <ImagePanel image={images.aerialFarmland} sizes="100vw" className="aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2.6/1]" imgClassName="object-[50%_45%] transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.02]" />
          </Link>
        </ImageReveal>
      </div>

      {/* overlapping panel */}
      <div className="container-page relative">
        <Reveal className="-mt-10 sm:-mt-16 lg:-mt-28 me-auto lg:w-[64%] bg-limestone p-6 sm:p-8 lg:p-12 border border-line">
          <ol className="border-t border-line">
            {l.options.map((o) => (
              <li key={o.n} className="border-b border-line py-5 grid grid-cols-[2.75rem_1fr] gap-4 items-baseline">
                <span className="font-tzar text-[1.4rem] font-bold text-amber-700">{o.n}</span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[1.3rem] font-medium text-ink">{o.title}</h3>
                  <p className="text-small text-ink-soft max-w-[40ch]">{o.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
            <dl className="grid grid-cols-3 gap-6 lg:gap-10">
              {facts.map((f) => (
                <div key={f.label}>
                  <dd className="flex items-baseline gap-1.5">
                    <CountUp value={f.value} className="font-tzar text-[2.2rem] lg:text-[2.6rem] font-bold leading-none text-ink" />
                    <span className="text-label text-amber-700">{f.unit}</span>
                  </dd>
                  <dt className="text-label text-ink-soft mt-1 max-w-[14ch]">{f.label}</dt>
                </div>
              ))}
            </dl>
            <Link href={pages.nahala.path} className="group inline-flex items-center gap-3 font-medium text-ink border-b border-amber-500 pb-1 hover:text-amber-700">
              כל הפרטים על חלקה א׳
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </div>
      <div className="pb-[var(--section-y)]" />
    </section>
  );
}
