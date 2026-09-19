import { home } from "@/content/home";
import { founders } from "@/content/founders";
import { pages } from "@/content/pages";
import { FounderCard } from "@/components/ui/FounderCard";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/** The one flat-colour moment on the page: an amber field, two tilted cards, the story in the middle.
 * The story comes first in the DOM so the h2 precedes the cards' h3s; grid order places it visually. */
export function FoundersTeaser() {
  const a = home.about;
  const [first, second] = founders.people;
  return (
    <section id="about" data-tone="light" className="bg-amber-500 text-cell-950 scroll-mt-20 overflow-hidden">
      <div className="container-page section-y">
        <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-12 lg:items-center">
          <div className="order-1 md:col-span-2 lg:order-2 lg:col-span-4 text-center px-2">
            <p className="text-label text-cell-950 mb-4 flex items-center justify-center gap-3">
              <span className="font-tzar text-[1.05rem] font-bold tracking-normal">{a.index}</span>
              <span aria-hidden="true" className="block h-px w-8 bg-cell-950/40" />
              <span>{a.eyebrow}</span>
            </p>
            <MaskedHeading as="h2" text={a.heading} className="text-h2 text-cell-950" />
            <Reveal>
              <p className="mt-6 text-[1.08rem] leading-relaxed text-cell-950 max-w-[36ch] mx-auto">{founders.story}</p>
              <div className="mt-8">
                <Button href={pages.about.path} variant="dark" arrow>{a.teaserLink}</Button>
              </div>
            </Reveal>
          </div>

          <Reveal className="order-2 lg:order-1 lg:col-span-4 max-w-[26rem] w-full mx-auto">
            <FounderCard person={first} tilt={-2.5} />
          </Reveal>

          <Reveal delay={0.1} className="order-3 lg:order-3 lg:col-span-4 lg:mt-28 max-w-[26rem] w-full mx-auto">
            <FounderCard person={second} tilt={2} alt />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
