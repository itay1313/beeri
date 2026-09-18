import { home } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnergyFlowDiagram } from "@/components/visuals/EnergyFlowDiagram";
import { Reveal } from "@/components/motion/Reveal";

export function HowItWorks() {
  const c = home.howItWorks;
  return (
    <section id="how-it-works" data-tone="light" className="bg-limestone scroll-mt-20">
      <div className="container-page section-y">
        <Reveal>
          <SectionHeading index={c.index} eyebrow="איך זה עובד" title={c.heading} lede={c.lede} />
        </Reveal>
        <Reveal className="mt-14 lg:mt-20">
          <EnergyFlowDiagram />
        </Reveal>

        <Reveal className="mt-24 lg:mt-32">
          <h3 className="text-h3 font-medium text-ink max-w-[30ch]">{c.alternatives.heading}</h3>
          <ol className="mt-10 grid md:grid-cols-3 border-t border-line">
            {c.alternatives.items.map((a) => (
              <li key={a.n} className="relative border-b md:border-b-0 md:border-e border-line last:border-e-0 py-7 md:pe-8 md:ps-0 md:last:pe-0">
                {a.featured && <span aria-hidden="true" className="absolute -top-px start-0 h-px w-12 bg-amber-500" />}
                <span className="font-tzar text-[1.6rem] font-bold leading-none text-amber-700">{a.n}</span>
                <p className="mt-4 text-[1.2rem] font-medium leading-snug text-ink">{a.title}</p>
                {"note" in a && a.note && <p className="mt-3 text-label text-amber-700">{a.note}</p>}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-small text-ink-soft max-w-[70ch]">{c.alternatives.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
