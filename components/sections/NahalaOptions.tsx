import { home } from "@/content/home";
import { site } from "@/content/site";
import { PlotSpecSheet } from "@/components/visuals/PlotSpecSheet";
import { Statement } from "@/components/ui/Statement";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Magnetic } from "@/components/motion/Magnetic";
import { NahalaScale } from "./NahalaScale";
import { NahalaProjects } from "./NahalaProjects";

/** /nahala: the four projects from the header carousel with a pinned location rail, the same three at one scale, then the TAMA spec sheet. */
export function NahalaOptions() {
  const l = home.land;
  return (
    <section data-tone="light" className="bg-limestone">
      <div className="container-page section-y">
        <Reveal>
          <SectionHeading index={l.page.options.index} eyebrow={l.page.options.eyebrow} title={l.heading} />
        </Reveal>
        <div className="mt-12 lg:mt-16">
          <NahalaProjects />
        </div>

        <Reveal className="mt-20 lg:mt-28">
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
