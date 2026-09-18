import { home } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "@/components/visuals/ProcessTimeline";
import { Reveal } from "@/components/motion/Reveal";

export function Process() {
  const p = home.process;
  return (
    <section id="process" data-tone="light" className="bg-dust scroll-mt-20">
      <div className="container-page section-y">
        <Reveal>
          <SectionHeading index={p.index} eyebrow={p.sub} title={p.heading} />
        </Reveal>
        <div className="mt-14 lg:mt-20">
          <ProcessTimeline steps={p.steps} />
        </div>
      </div>
    </section>
  );
}
