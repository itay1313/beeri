import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { home } from "@/content/home";
import { founders } from "@/content/founders";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { Marquee } from "@/components/motion/Marquee";
import { marquee } from "@/content/site";
import { Statement } from "@/components/ui/Statement";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/motion/Reveal";

const p = pages.about;
export const metadata: Metadata = { title: p.metaTitle, description: p.metaDescription, alternates: { canonical: p.path } };

export default function AboutPage() {
  const pos = home.positioning;
  return (
    <PageShell>
      <PageHero index="03" eyebrow={p.eyebrow} titleLines={p.titleLines} lede={p.lede} image={p.image} />
      <Marquee items={marquee} />
      <section data-tone="light" className="bg-limestone">
        <div className="container-page section-y">
          <Reveal className="lg:grid lg:grid-cols-12">
            <div className="lg:col-span-9">
              <Statement text={pos.statement} highlight={pos.punch} />
            </div>
          </Reveal>
          <Reveal as="ul" className="mt-16 lg:mt-24 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line" aria-label="מה אנחנו עושים">
            {pos.words.map((w, i) => (
              <li key={w} className="border-b sm:border-b-0 border-line sm:border-e last:border-e-0 py-6 sm:pe-6">
                <span className="font-tzar text-[1rem] font-bold text-amber-700">0{i + 1}</span>
                <p className="text-h3 font-medium text-ink mt-2">{w}</p>
              </li>
            ))}
          </Reveal>
          <Reveal className="mt-16 lg:mt-24 border-t border-line pt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <span className="text-label text-ink-soft">מודלים עסקיים</span>
            {founders.models.map((m) => (
              <span key={m} className="text-h3 font-medium text-ink">{m}</span>
            ))}
          </Reveal>
        </div>
      </section>
      <About variant="page" />
      <Contact />
    </PageShell>
  );
}
