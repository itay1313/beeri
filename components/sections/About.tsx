import { home } from "@/content/home";
import { founders } from "@/content/founders";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FounderCard } from "@/components/ui/FounderCard";

/** /about: the founding story, then both founders as full cards on the amber field. */
export function About() {
  const s = home.about.page.story;
  const [first, second] = founders.people;
  return (
    <>
      <section id="story" data-tone="light" className="bg-limestone scroll-mt-20">
        <div className="container-page section-y">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading index={s.index} eyebrow={s.eyebrow} title={s.heading} />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7">
              <p className="text-lede font-light text-ink">{founders.story}</p>
            </Reveal>
          </div>
        </div>
      </section>
      <section aria-label="המייסדים" data-tone="light" className="bg-amber-500 overflow-hidden">
        <div className="container-page section-y grid gap-10 md:grid-cols-2 lg:gap-16 lg:px-[8%] justify-items-center">
          <Reveal className="w-full max-w-[30rem]">
            <FounderCard person={first} tilt={-1.5} full />
          </Reveal>
          <Reveal delay={0.1} className="w-full max-w-[30rem] md:mt-20">
            <FounderCard person={second} tilt={1.5} alt full />
          </Reveal>
        </div>
      </section>
    </>
  );
}
