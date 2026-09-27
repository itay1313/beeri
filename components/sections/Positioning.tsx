import { home } from "@/content/home";
import { images } from "@/content/images";
import { Statement } from "@/components/ui/Statement";
import { ImageCycle } from "@/components/motion/ImageCycle";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Four words stacked at display size beside a tall photograph, and the one paragraph that says why BE'ERI exists. */
export function Positioning() {
  const p = home.positioning;
  return (
    <section data-tone="light" className="bg-limestone">
      <div className="container-page section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            <ol className="grid gap-1" aria-label="מה אנחנו עושים">
              {p.words.map((w, i) => (
                <li key={w} className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-line pt-3 pb-2 first:border-t-0">
                  <span className="font-tzar text-[1rem] font-bold text-amber-700">0{i + 1}</span>
                  <MaskedHeading as="span" text={w} delay={i * 0.08} className="text-display text-ink block" />
                </li>
              ))}
            </ol>
            <Reveal className="mt-12 lg:mt-16">
              <Statement text={p.statement} highlight={p.punch} />
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ImageReveal>
              <ImageCycle slides={p.slides.map((sl) => ({ image: images[sl.image], caption: sl.caption }))} />
            </ImageReveal>
          </div>
        </div>

      </div>
    </section>
  );
}
