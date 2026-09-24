import { home } from "@/content/home";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { TariffChart } from "@/components/visuals/TariffChart";
import { Reveal } from "@/components/motion/Reveal";
import { DeadlineBadge } from "@/components/ui/DeadlineBadge";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RoofSplit } from "@/components/visuals/RoofSplit";

/** legend swatches, matching the drawing: dark existing panels, hatched new panels, solid battery */
const swatch = {
  existing: "bg-cell-950 border border-limestone/55",
  added: "hatch border border-amber-400 [--hatch-color:var(--color-amber-500)] [--hatch-gap:4px]",
  battery: "bg-amber-500",
} as const;

/** /tariff: what, how and who, with the day chart pinned beside the text, then the roof drawing. */
export function Tariff() {
  const t = home.tariff;
  return (
    <section id="tariff" data-tone="dark" className="relative bg-cell-950 text-limestone scroll-mt-20 overflow-x-clip">
      <div aria-hidden="true" className="absolute inset-0 hatch hatch-dark opacity-40" style={{ ["--hatch-gap" as string]: "14px" }} />
      <div className="container-page section-y relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <DeadlineBadge className="mb-8">{t.urgency.badge}</DeadlineBadge>
              <SectionHeading index={t.page.index} eyebrow={t.page.eyebrow} title={t.page.heading} tone="dark" />
            </Reveal>
            <Reveal className="mt-14 grid gap-10">
              <div className="border-t border-line-dark pt-6">
                <h3 className="text-h3 font-medium mb-3">{t.what.title}</h3>
                <p className="text-limestone/80 max-w-[58ch]">{t.what.body}</p>
              </div>
              <div className="border-t border-line-dark pt-6">
                <h3 className="text-h3 font-medium mb-3">{t.how.title}</h3>
                <p className="text-limestone/80">{t.how.intro}</p>
                <ol className="mt-4 grid gap-4">
                  {t.how.items.map((it, i) => (
                    <li key={it} className="grid grid-cols-[2rem_1fr] gap-3 text-limestone/80 max-w-[58ch]">
                      <span className="font-tzar text-amber-400 font-bold text-[1.1rem] pt-1">0{i + 1}</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 border-s-2 border-amber-500 ps-4 text-limestone">{t.how.example}</p>
              </div>
              <div className="border-t border-line-dark pt-6">
                <h3 className="text-h3 font-medium mb-3">{t.who.title}</h3>
                <ul className="grid gap-3">
                  {t.who.items.map((it) => (
                    <li key={it} className="flex gap-3 text-limestone/80 max-w-[58ch]">
                      <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-amber-500" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal className="lg:sticky lg:top-28">
              <TariffChart />
            </Reveal>
          </div>
        </div>

        <div className="mt-20 lg:mt-28 border-t border-line-dark pt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-label text-amber-400 mb-3">{t.roof.eyebrow}</p>
            <MaskedHeading as="h3" text={t.roof.heading} className="text-h2 text-limestone" />
            <Reveal>
              <ol className="mt-10 grid gap-6">
                {t.roof.items.map((it) => (
                  <li key={it.key} className="grid grid-cols-[1.25rem_1fr] gap-4">
                    <span aria-hidden="true" className={`mt-1.5 block size-4 ${swatch[it.key]}`} />
                    <div>
                      <p className="font-medium text-limestone">{it.title}</p>
                      <p className="mt-1 text-limestone/75 max-w-[44ch]">{it.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7">
            <RoofSplit className="w-full h-auto" />
          </Reveal>
        </div>

        <Reveal className="mt-20 lg:mt-28 border-t border-line-dark pt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <span aria-hidden="true" className="outline-numeral font-tzar font-light text-[clamp(5rem,12vw,11rem)] leading-[0.85]">
              {t.urgency.marker}
            </span>
          </div>
          <div className="lg:col-span-5">
            <p className="text-label text-amber-400 mb-3">{t.urgency.kicker}</p>
            <p className="text-h3 font-medium">{t.urgency.line}</p>
            <p className="mt-3 text-limestone/75 max-w-[52ch]">{t.urgency.push}</p>
          </div>
          <div className="lg:col-span-3 lg:text-end">
            <TextLink href={site.contactPath} dark>{t.cta}</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
