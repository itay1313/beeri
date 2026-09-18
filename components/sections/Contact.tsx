import { home } from "@/content/home";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact({ variant = "home", index }: { variant?: "home" | "page"; index?: string }) {
  const c = home.contact;
  const page = variant === "page";
  return (
    <section id={site.contactId} data-tone="dark" className="relative bg-cell-950 text-limestone scroll-mt-20 overflow-hidden">
      <span id="צור-קשר" className="absolute -top-20" aria-hidden="true" />
      <div className="container-page section-y relative z-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            {!page && (
              <Reveal>
                <SectionHeading index={index ?? c.index} eyebrow={c.eyebrow} title={c.heading} tone="dark" />
                <p className="text-lede font-light text-limestone/80 mt-6 max-w-[40ch]">{c.lede}</p>
              </Reveal>
            )}
            <Reveal className={page ? "" : "mt-12"}>
              {page ? (
                <h2 className="text-h3 font-medium text-limestone mb-6">{c.includesHeading}</h2>
              ) : (
                <h3 className="text-label text-limestone/60 mb-2">{c.includesHeading}</h3>
              )}
              <ol className="border-t border-line-dark">
                {c.includes.map((it, i) => (
                  <li key={it} className="border-b border-line-dark py-4 grid grid-cols-[2.5rem_1fr] gap-2 items-baseline">
                    <span className="font-tzar text-amber-400 font-bold text-[1.2rem]">0{i + 1}</span>
                    <span className="text-limestone/90">{it}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal className="mt-12">
              <h3 className="text-label text-limestone/60 mb-4">{c.peopleHeading}</h3>
              <ul className="grid gap-4">
                {site.people.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                    <span className="w-16 font-medium">{p.firstName}</span>
                    <a href={`tel:${p.phone}`} className="ltr font-tzar text-[1.35rem] font-medium tracking-wide hover:text-amber-400">{p.phoneDisplay}</a>
                    <a href={`mailto:${p.email}`} className="ltr text-limestone/70 hover:text-amber-400">{p.email}</a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>

    </section>
  );
}
