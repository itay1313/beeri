import Image from "next/image";
import { home } from "@/content/home";
import { founders } from "@/content/founders";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FounderCard } from "@/components/ui/FounderCard";

export function About({ variant = "home" }: { variant?: "home" | "page" }) {
  const a = home.about;
  const page = variant === "page";
  return (
    <>
    <section id="about" data-tone="light" className="bg-limestone scroll-mt-20">
      <div className="container-page section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            {page ? (
              <SectionHeading index="01" eyebrow="הסיפור" title="שני שותפים, שני עולמות" />
            ) : (
              <SectionHeading index={a.index} eyebrow="BE'ERI ENERGY SOLUTIONS" title={a.heading} />
            )}
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7 grid gap-6">
            {!page && <p className="text-lede font-light text-ink">{a.intro}</p>}
            <p className={page ? "text-lede font-light text-ink" : "text-ink-soft"}>{founders.story}</p>
            {!page && (
            <p className="text-ink-soft">
              {a.modelsLine}{" "}
              {founders.models.map((m, i) => (
                <span key={m} className="font-medium text-ink">
                  {m}
                  {i < founders.models.length - 1 ? " / " : "."}
                </span>
              ))}
            </p>
            )}
          </Reveal>
        </div>

        {page ? null : (
        <Reveal as="ul" className="mt-16 lg:mt-24 grid gap-12 md:grid-cols-2 md:gap-10 border-t border-line pt-12">
          {founders.people.map((p) => (
            <li key={p.id} className="grid gap-6">
              <div className="flex items-center gap-5">
                <Image src={p.portrait.src} alt={p.portrait.alt} width={160} height={160} className={page ? "size-32 lg:size-40 rounded-full grayscale" : "size-24 lg:size-28 rounded-full grayscale"} />
                <div>
                  <h3 className="text-h3 font-medium text-ink">{p.name}</h3>
                  <p className="text-label text-amber-700 mt-1">{p.role}</p>
                </div>
              </div>
              <ul className="border-t border-line">
                {p.facts.map((f) => (
                  <li key={f} className="border-b border-line py-3 flex gap-3 text-ink-soft">
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-amber-500" />
                    <span>{f}</span>
                  </li>
                ))}
                {founders.showPartners && p.id === "itamar" && (
                  <li className="border-b border-line py-3 text-ink-soft">
                    <span className="text-label">בין הלקוחות:</span> {founders.partners.join(" · ")}
                  </li>
                )}
              </ul>
              <p className="text-ink">{p.summary}</p>
            </li>
          ))}
        </Reveal>
        )}
      </div>
    </section>
    {page && (
      <section data-tone="light" className="bg-amber-500 overflow-hidden">
        <div className="container-page section-y grid gap-10 md:grid-cols-2 lg:gap-16 lg:px-[8%]">
          <Reveal>
            <FounderCard person={founders.people[0]} tilt={-1.5} full />
          </Reveal>
          <Reveal delay={0.1} className="md:mt-20">
            <FounderCard person={founders.people[1]} tilt={1.5} alt full />
          </Reveal>
        </div>
      </section>
    )}
    </>
  );
}
