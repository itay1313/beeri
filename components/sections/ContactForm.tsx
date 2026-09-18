"use client";
import { useActionState, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { subjectOptions } from "@/lib/validation";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { ArrowIcon } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";

const initial: ContactState = { status: "idle" };

const field =
  "w-full bg-transparent border-b border-line-dark py-3 text-limestone placeholder:text-limestone/35 focus:border-amber-400 transition-colors";
const label = "text-label text-limestone/60 mb-1 block";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const startedRef = useRef<HTMLInputElement>(null);
  const uid = useId();
  const f = home.contact.form;
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <div role="status" className="border border-line-dark p-8 lg:p-10">
        <span aria-hidden="true" className="block h-px w-10 bg-amber-500 mb-6" />
        <p className="text-h3 text-limestone">{f.success}</p>
      </div>
    );
  }

  const err = state.errors ?? {};
  const id = (k: string) => `${uid}-${k}`;

  return (
    <form action={action} noValidate className="grid gap-7">
      <h3 className="text-label text-amber-400">{f.title}</h3>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={label}>{f.name}</label>
          <input id={id("name")} name="name" type="text" autoComplete="name" required className={field} aria-invalid={!!err.name} aria-describedby={err.name ? id("name-err") : undefined} />
          {err.name && <p id={id("name-err")} className="text-small text-amber-400 mt-1">{err.name}</p>}
        </div>
        <div>
          <label htmlFor={id("phone")} className={label}>{f.phone}</label>
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" required className={cn(field, "text-start")} aria-invalid={!!err.phone} aria-describedby={err.phone ? id("phone-err") : undefined} />
          {err.phone && <p id={id("phone-err")} className="text-small text-amber-400 mt-1">{err.phone}</p>}
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={id("email")} className={label}>{f.email}</label>
          <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" dir="ltr" required className={cn(field, "text-start")} aria-invalid={!!err.email} aria-describedby={err.email ? id("email-err") : undefined} />
          {err.email && <p id={id("email-err")} className="text-small text-amber-400 mt-1">{err.email}</p>}
        </div>
        <div>
          <label htmlFor={id("subject")} className={label}>{f.subject}</label>
          <select id={id("subject")} name="subject" required defaultValue="" className={cn(field, "appearance-none cursor-pointer")} aria-invalid={!!err.subject} aria-describedby={err.subject ? id("subject-err") : undefined}>
            <option value="" disabled className="text-ink">{f.subjectPlaceholder}</option>
            {subjectOptions.map((o) => (
              <option key={o.value} value={o.value} className="text-ink">{o.label}</option>
            ))}
          </select>
          {err.subject && <p id={id("subject-err")} className="text-small text-amber-400 mt-1">{err.subject}</p>}
        </div>
      </div>

      <div>
        <label htmlFor={id("message")} className={label}>
          {f.message} <span>({f.messageHint})</span>
        </label>
        <textarea id={id("message")} name="message" rows={3} className={cn(field, "resize-y min-h-[5.5rem]")} />
      </div>

      {/* honeypot + timing */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="0" />

      {state.status === "error" && !state.errors && (
        <p role="alert" className="text-small text-amber-400">
          {state.message ?? f.error}{" "}
          <a href={`tel:${site.people[0].phone}`} className="underline ltr">{site.people[0].phoneDisplay}</a>
        </p>
      )}

      <div>
        <Magnetic>
          <button
            type="submit"
            disabled={pending}
            className="group inline-flex items-center justify-center gap-3 min-h-[3.25rem] px-7 rounded-full bg-amber-500 text-cell-950 font-medium hover:bg-amber-400 disabled:opacity-60 transition-colors"
          >
            <span>{pending ? f.sending : site.cta.submit}</span>
            <ArrowIcon />
          </button>
        </Magnetic>
      </div>
    </form>
  );
}
