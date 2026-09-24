import { home } from "@/content/home";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { ImageRow } from "@/components/ui/ImageRow";
import { PlotSpecSheet } from "@/components/visuals/PlotSpecSheet";
import { Statement } from "@/components/ui/Statement";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Magnetic } from "@/components/motion/Magnetic";
import { NahalaScale } from "./NahalaScale";

/** roof, one dunam on the ground, agro up to 10 dunam: all three at farm scale, same 3:2 frame */
const optionImages = [images.barnBess, images.groundDunam, images.agrivoltaicPlot] as const;

/** /nahala: the three land options as photo rows, the same three at one scale, then the TAMA spec sheet. */
export function NahalaOptions() {
  const l = home.land;
  return (
    <section data-tone="light" className="bg-limestone">
      <div className="container-page section-y">
        <Reveal>
          <SectionHeading index={l.page.options.index} eyebrow={l.page.options.eyebrow} title={l.heading} />
        </Reveal>
        <div className="mt-12 lg:mt-16 border-b border-line">
          {l.options.map((o, i) => (
            <Reveal key={o.n}>
              <ImageRow index={o.n} title={o.title} body={o.body} image={optionImages[i]} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 lg:mt-20">
          <SectionHeading eyebrow={l.page.scale.eyebrow} title={l.page.scale.heading} as="h3" />
          <div className="mt-8 lg:mt-10">
            <NahalaScale />
          </div>
        </Reveal>

        <Reveal className="mt-20 lg:mt-28">
          <SectionHeading index={l.page.conditions.index} eyebrow={l.page.conditions.eyebrow} title={l.conditionsHeading} />
          <div className="mt-10 lg:mt-14">
            <PlotSpecSheet />
          </div>
        </Reveal>

        <Reveal className="mt-20 lg:mt-28 grid gap-10 lg:grid-cols-12 lg:items-end border-t border-line pt-12">
          <div className="lg:col-span-8">
            <Statement text={l.page.noteText} highlight={l.page.noteHighlight} />
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Magnetic>
              <Button href={site.contactPath} variant="ghost" arrow>{site.cta.land}</Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
