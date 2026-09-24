import { faq } from "@/content/faq";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/** /faq: numbered ledger of native disclosures. No JS; the first answer starts open. */
export function Faq() {
  return (
    <section data-tone="light" className="bg-limestone">
      <div className="container-page section-y lg:grid lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading index={faq.index} eyebrow={faq.eyebrow} title={faq.heading} />
          <div className="mt-10 hidden lg:block">
            <Button href={site.contactPath} variant="ghost" arrow>{site.cta.short}</Button>
          </div>
        </Reveal>

        <Reveal as="ol" className="mt-12 lg:mt-0 lg:col-span-8 border-t border-line">
          {faq.items.map((item, i) => (
            <li key={item.q} className="border-b border-line">
              <details className="faq-item group" open={i === 0}>
                <summary className="grid grid-cols-[2.25rem_1fr_auto] lg:grid-cols-[4.5rem_1fr_auto] items-baseline gap-x-3 lg:gap-x-4 py-7 lg:py-9 cursor-pointer list-none">
                  <span aria-hidden="true" className="font-tzar text-[1.05rem] font-bold text-amber-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-h3 font-medium text-ink text-balance group-hover:text-amber-700 transition-colors duration-300">{item.q}</h3>
                  <span aria-hidden="true" className="relative size-4 self-center">
                    <span className="absolute inset-x-0 top-1/2 h-px bg-ink" />
                    <span className="absolute inset-y-0 start-1/2 w-px bg-ink transition-transform duration-300 ease-out-expo group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="ps-[calc(2.25rem+0.75rem)] lg:ps-[calc(4.5rem+1rem)] sm:pe-8 pb-8 lg:pb-10 -mt-2 text-ink-soft max-w-[62ch] text-pretty">
                  {item.a}
                </p>
              </details>
            </li>
          ))}
        </Reveal>

        <div className="mt-12 lg:hidden">
          <Button href={site.contactPath} variant="ghost" arrow>{site.cta.short}</Button>
        </div>
      </div>
    </section>
  );
}
