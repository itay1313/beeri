import Image from "next/image";
import { cn } from "@/lib/cn";
import type { founders } from "@/content/founders";

type Founder = (typeof founders.people)[number];

/**
 * Tilted limestone card on the amber field: name first, collage-cut portrait, one plain line and
 * one bold line. `full` adds the fact list for the about page.
 */
export function FounderCard({ person, tilt = 0, alt = false, full = false, className }: { person: Founder; tilt?: number; alt?: boolean; full?: boolean; className?: string }) {
  return (
    <article
      className={cn("bg-limestone text-ink rounded-xl p-7 sm:p-8 shadow-[0_30px_60px_-30px_rgba(12,17,23,0.45)] transition-transform duration-500 ease-out-expo hover:rotate-0", className)}
      style={{ rotate: `${tilt}deg` }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[clamp(1.9rem,1.4rem+1.4vw,2.6rem)] font-light leading-none tracking-[-0.01em]">{person.name}</h3>
      </div>
      <p className="text-label text-amber-700 mt-2">{person.role}</p>

      <div className={cn("relative mx-auto mt-6 aspect-square w-[78%] bg-limestone", alt ? "collage-alt -rotate-3" : "collage rotate-3")}>
        <Image src={person.portrait.src} alt="" fill sizes="(min-width:1024px) 22vw, 70vw" className="object-cover grayscale mix-blend-multiply scale-[1.12]" />
      </div>

      <p className="mt-6 text-[1.02rem] leading-snug text-ink-soft">{person.card.intro}</p>
      <p className="mt-3 text-[1.02rem] leading-snug font-semibold text-ink">{person.card.highlight}</p>

      {full && (
        <ul className="mt-6 border-t border-line">
          {person.facts.map((f) => (
            <li key={f} className="border-b border-line py-2.5 flex gap-3 text-small text-ink-soft">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-amber-500" />
              <span>{f}</span>
            </li>
          ))}
          <li className="pt-4 text-small text-ink">{person.summary}</li>
        </ul>
      )}
    </article>
  );
}
