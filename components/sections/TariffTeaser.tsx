import Link from "next/link";
import { home } from "@/content/home";
import { pages } from "@/content/pages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TariffChart } from "@/components/visuals/TariffChart";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/** Home teaser for the tariff page: the schematic, the promise, the deadline. */
export function TariffTeaser() {
  const t = home.tariff;
  return (
    <section id="tariff" data-tone="dark" className="relative bg-cell-950 text-limestone scroll-mt-20 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 hatch hatch-dark opacity-40" style={{ ["--hatch-gap" as string]: "14px" }} />
      <div className="container-page section-y relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading index={t.index} eyebrow={t.heading} title={t.heading} lede={t.sub} tone="dark" />
            </Reveal>
            <Reveal className="mt-10 grid gap-6">
              <p className="text-limestone/80 max-w-[56ch]">{t.what.body}</p>
              <p className="border-s-2 border-amber-500 ps-4 text-limestone max-w-[56ch]">{t.how.example}</p>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-2">
                <Link href={pages.tariff.path} className="group inline-flex items-center gap-3 font-medium text-limestone border-b border-amber-500 pb-1 hover:text-amber-400">
                  איך האסדרה עובדת ולמי היא מתאימה
                  <ArrowIcon />
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <TariffChart />
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16 lg:mt-24 border-t border-line-dark pt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-3">
            <span aria-hidden="true" className="font-tzar font-light text-[clamp(4rem,9vw,8rem)] leading-[0.85] text-transparent [-webkit-text-stroke:1px_rgba(242,237,227,0.45)]">
              {t.urgency.marker}
            </span>
          </div>
          <div className="lg:col-span-6">
            <p className="text-label text-amber-400 mb-2">{t.urgency.kicker}</p>
            <p className="text-h3 font-medium">{t.urgency.line}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
