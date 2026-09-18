import Link from "next/link";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TariffChart } from "@/components/visuals/TariffChart";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui/Button";

export function Tariff({ variant = "home" }: { variant?: "home" | "page" }) {
  const t = home.tariff;
  const page = variant === "page";
  return (
    <section id="tariff" data-tone="dark" className="relative bg-cell-950 text-limestone scroll-mt-20 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 hatch hatch-dark opacity-40" style={{ ["--hatch-gap" as string]: "14px" }} />
      <div className="container-page section-y relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              {page ? (
                <SectionHeading index="01" eyebrow="האסדרה" title="מה זה, איך זה עובד ולמי זה מתאים" tone="dark" />
              ) : (
                <SectionHeading index={t.index} eyebrow={t.heading} title={t.heading} lede={t.sub} tone="dark" />
              )}
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
                    <li key={i} className="grid grid-cols-[2rem_1fr] gap-3 text-limestone/80 max-w-[58ch]">
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
                  {t.who.items.map((it, i) => (
                    <li key={i} className="flex gap-3 text-limestone/80 max-w-[58ch]">
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

        <Reveal className="mt-20 lg:mt-28 border-t border-line-dark pt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <span aria-hidden="true" className="font-tzar font-light text-[clamp(5rem,12vw,11rem)] leading-[0.85] text-transparent [-webkit-text-stroke:1px_rgba(242,237,227,0.45)]">
              {t.urgency.marker}
            </span>
          </div>
          <div className="lg:col-span-5">
            <p className="text-label text-amber-400 mb-3">{t.urgency.kicker}</p>
            <p className="text-h3 font-medium">{t.urgency.line}</p>
          </div>
          <div className="lg:col-span-3 lg:text-end">
            <Link href={site.contactPath} className="group inline-flex items-center gap-3 font-medium text-limestone border-b border-amber-500 pb-1 hover:text-amber-400">
              {t.cta}
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
