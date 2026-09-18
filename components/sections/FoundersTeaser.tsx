import { home } from "@/content/home";
import { founders } from "@/content/founders";
import { pages } from "@/content/pages";
import { FounderCard } from "@/components/ui/FounderCard";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/** The one flat-colour moment on the page: an amber field, two tilted cards, the story in the middle. */
export function FoundersTeaser() {
  const a = home.about;
  const [first, second] = founders.people;
  return (
    <section id="about" data-tone="light" className="bg-amber-500 text-cell-950 scroll-mt-20 overflow-hidden">
      <div className="container-page section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 lg:items-center">
          <Reveal className="order-2 lg:order-none lg:col-span-4">
            <FounderCard person={first} tilt={-2.5} />
          </Reveal>

          <div className="order-1 lg:order-none lg:col-span-4 text-center px-2">
            <p className="text-label text-cell-950 mb-4">BE&apos;ERI ENERGY SOLUTIONS</p>
            <MaskedHeading as="h2" text={a.heading} className="text-h2 text-cell-950" />
            <Reveal>
              <p className="mt-6 text-[1.08rem] leading-relaxed text-cell-950 max-w-[36ch] mx-auto">{founders.story}</p>
              <div className="mt-8">
                <Button href={pages.about.path} variant="dark" arrow>עוד עלינו</Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="order-3 lg:order-none lg:col-span-4 lg:mt-28">
            <FounderCard person={second} tilt={2} alt />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
