import Image from "next/image";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { founders } from "@/content/founders";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/Button";

/** Contact buttons: icon-over-label tiles on phones, inline pills from `sm` up. */
const TILE =
  "flex-col gap-1.5 min-h-[4.5rem] px-1 text-[0.9rem] whitespace-nowrap max-sm:rounded-[1.1rem] sm:flex-row sm:gap-3 sm:min-h-12 sm:px-6 sm:text-[1.0625rem]";

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-[1.1em] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M5.5 2.5h2.2l1.2 3.6-1.6 1.1a9.5 9.5 0 0 0 4.5 4.5l1.1-1.6 3.6 1.2v2.2A1.5 1.5 0 0 1 15 15C8.4 15 3 9.6 3 3a.5.5 0 0 1 .5-.5z" transform="translate(1 1)" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-[1.1em] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="M3 5.5l7 5.5 7-5.5" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-[1.15em] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M10 2.5a7.5 7.5 0 0 0-6.5 11.2L2.5 17.5l3.9-1a7.5 7.5 0 1 0 3.6-14z" />
      <path d="M7.4 6.6c.2-.4.5-.4.7-.4h.4c.1 0 .3 0 .4.3l.6 1.4c0 .2 0 .3-.1.4l-.4.5c-.1.1-.1.3 0 .4.5.9 1.3 1.7 2.2 2.2.1.1.3.1.4 0l.5-.6c.1-.1.3-.2.4-.1l1.4.6c.2.1.3.2.3.4 0 .5-.2 1.2-.8 1.5-.6.3-1.4.4-3-.4a8 8 0 0 1-3.3-3.3c-.6-1.2-.4-2.2 0-2.9z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Closing section: what the consultation covers, then the two founders with direct phone, WhatsApp
 * and email. No form: people call or write.
 */
export function Contact({ variant = "home", index }: { variant?: "home" | "page"; index?: string }) {
  const c = home.contact;
  const d = c.direct;
  const page = variant === "page";
  const mailto = (email: string) => `mailto:${email}?subject=${encodeURIComponent(d.mailSubject)}`;
  const whatsapp = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(d.whatsappText)}`;

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
                <h3 className="text-label text-limestone/70 mb-2">{c.includesHeading}</h3>
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
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              {page ? (
                <h2 className="text-h3 font-medium text-limestone">{d.heading}</h2>
              ) : (
                <h3 className="text-h3 font-medium text-limestone">{d.heading}</h3>
              )}
              <p className="mt-2 text-limestone/70">{d.sub}</p>

              <ul className="mt-8 grid gap-5">
                {site.people.map((p) => {
                  const f = founders.people.find((x) => x.id === p.id);
                  return (
                    <li key={p.id} className="rounded-xl border border-line-dark bg-cell-900/60 p-6 sm:p-7">
                      <div className="flex items-center gap-4">
                        {f && (
                          <Image src={f.portrait.src} alt="" width={112} height={112} className="size-14 rounded-full grayscale" />
                        )}
                        <div>
                          <p className="text-[1.35rem] font-medium leading-tight">{f?.name ?? p.firstName}</p>
                          {f && <p className="text-label text-amber-400 mt-1">{f.role}</p>}
                        </div>
                      </div>

                      <div className="mt-6 grid gap-1">
                        <a
                          href={`tel:${p.phone}`}
                          className="ltr text-end font-tzar text-[clamp(2rem,1.5rem+2vw,2.75rem)] font-bold leading-none tracking-wide hover:text-amber-400 transition-colors"
                        >
                          {p.phoneDisplay}
                        </a>
                        <a href={mailto(p.email)} className="ltr text-end text-limestone/80 hover:text-amber-400 transition-colors break-all">
                          {p.email}
                        </a>
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                        <a
                          href={`tel:${p.phone}`}
                          aria-label={`${d.call} ל${p.firstName}`}
                          className={buttonClass("primary", TILE, "custom")}
                        >
                          <PhoneIcon />
                          <span>{d.call}</span>
                        </a>
                        <a
                          href={whatsapp(p.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${d.whatsapp} ל${p.firstName} (נפתח בחלון חדש)`}
                          className={buttonClass("ghost-dark", TILE, "custom")}
                        >
                          <WhatsAppIcon />
                          <span>{d.whatsapp}</span>
                        </a>
                        <a
                          href={mailto(p.email)}
                          aria-label={`${d.email} ל${p.firstName}`}
                          className={buttonClass("ghost-dark", TILE, "custom")}
                        >
                          <MailIcon />
                          <span>{d.email}</span>
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
