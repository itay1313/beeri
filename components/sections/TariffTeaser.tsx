import { home } from "@/content/home";
import { pages } from "@/content/pages";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TariffChart } from "@/components/visuals/TariffChart";
import { TextLink } from "@/components/ui/TextLink";
import { Reveal } from "@/components/motion/Reveal";
import { DeadlineBadge } from "@/components/ui/DeadlineBadge";
import { Countdown } from "@/components/ui/Countdown";

/** Home teaser for the tariff page: the schematic, the promise, the deadline. */
export function TariffTeaser() {
  const t = home.tariff;
  return (
    <section id="tariff" data-tone="dark" className="relative bg-cell-950 text-limestone scroll-mt-20 overflow-x-clip">
      <div aria-hidden="true" className="absolute inset-0 hatch hatch-dark opacity-40" style={{ ["--hatch-gap" as string]: "14px" }} />
      <div className="container-page section-y relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <DeadlineBadge className="mb-8">{t.urgency.badge}</DeadlineBadge>
              <SectionHeading index={t.index} eyebrow={t.eyebrow} title={t.heading} lede={t.sub} tone="dark" />
            </Reveal>
            <Reveal className="mt-10 grid gap-6">
              <p className="text-limestone/80 max-w-[56ch]">{t.what.body}</p>
              <p className="border-s-2 border-amber-500 ps-4 text-limestone max-w-[56ch]">{t.how.example}</p>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-2">
                <TextLink href={pages.tariff.path} dark>{t.teaserLink}</TextLink>
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
          <div className="lg:col-span-5">
            <Countdown />
          </div>
          <div className="lg:col-span-5">
            <p className="text-label text-amber-400 mb-2">{t.urgency.kicker}</p>
            <p className="text-h3 font-medium">{t.urgency.line}</p>
            <p className="mt-3 text-limestone/75 max-w-[52ch]">{t.urgency.push}</p>
          </div>
          <div className="lg:col-span-2 lg:text-end">
            <TextLink href={site.contactPath} dark>{t.cta}</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
