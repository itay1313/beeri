import Link from "next/link";
import { home } from "@/content/home";
import { images } from "@/content/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePanel } from "@/components/ui/ImagePanel";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

const tileImages = [images.moshavAerial, images.barnBess, images.heroRows] as const;
const cuts = ["tl", "tr", "tl"] as const;
/** tile 3 reuses the hero photograph, so it is cropped into the panel rows instead of the sun */
const crops = ["", "", "object-[50%_88%]"] as const;

/** Three photographic panels on an offset grid; each links to its page. */
export function Expertise() {
  const e = home.expertise;
  return (
    <section id="expertise" data-tone="light" className="bg-dust scroll-mt-20">
      <div className="container-page section-y">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading index={e.index} eyebrow={e.eyebrow} title={e.heading} />
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-lede font-light text-ink-soft">{e.lede}</p>
        </Reveal>

        <ul className="mt-14 lg:mt-20 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {e.items.map((item, i) => (
            <li key={item.n} className={cn(i === 1 && "md:mt-16 lg:mt-24")}>
              <Link href={item.href} className="group block">
                <ImageReveal delay={i * 0.08}>
                  <ImagePanel
                    image={tileImages[i]}
                    cut={cuts[i]}
                    sizes="(min-width:768px) 33vw, 100vw"
                    className="aspect-[3/4]"
                    imgClassName={`${crops[i]} transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.04]`}
                  />
                </ImageReveal>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-4">
                  <h3 className="text-h3 font-medium text-ink group-hover:text-amber-700 transition-colors">{item.title}</h3>
                  <span className="font-tzar text-[1rem] font-bold text-amber-700 tabular">({item.n})</span>
                </div>
                <p className="mt-3 text-small text-ink-soft max-w-[40ch]">{item.body}</p>
                <div className="mt-4 flex items-center justify-between">
                  <ul className="flex flex-wrap gap-x-3 gap-y-1 text-label text-ink-soft">
                    {item.tags.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span aria-hidden="true" className="size-1 rounded-full bg-amber-500" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <ArrowIcon className="size-5 text-ink-soft group-hover:text-ink" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
