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

const optionImages = [images.barnBess, images.aerialFarmland, images.agrivoltaicRows] as const;

/** /nahala: the three land options as photo rows, then the TAMA spec sheet. */
export function NahalaOptions() {
  const l = home.land;
  return (
    <section data-tone="light" className="bg-limestone">
      <div className="container-page section-y">
        <Reveal>
          <SectionHeading index="01" eyebrow="שלוש דרכים" title={l.heading} />
        </Reveal>
        <div className="mt-12 lg:mt-16 border-b border-line">
          {l.options.map((o, i) => (
            <Reveal key={o.n}>
              <ImageRow index={o.n} title={o.title} body={o.body} image={optionImages[i]} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 lg:mt-28">
          <SectionHeading index="02" eyebrow="התנאים" title={l.conditionsHeading} as="h2" />
          <div className="mt-10 lg:mt-14">
            <PlotSpecSheet />
          </div>
        </Reveal>

        <Reveal className="mt-20 lg:mt-28 grid gap-10 lg:grid-cols-12 lg:items-end border-t border-line pt-12">
          <div className="lg:col-span-8">
            <Statement text={l.note.split(" – ")[0] + "."} highlight="כאן בארי אנרגיה נכנסת לתמונה ועוזרת לכם להתגבר על החסמים." />
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
