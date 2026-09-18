"use client";
import { useActionState, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { subjectOptions, type ContactField } from "@/lib/validation";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { ArrowIcon } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";

const initial: ContactState = { status: "idle" };

const field =
  "w-full bg-transparent border-b border-line-dark py-3 text-limestone placeholder:text-limestone/35 focus:border-amber-400 transition-colors aria-[invalid=true]:border-amber-400";
const labelCls = "text-label text-limestone/70 mb-1 block";
const ORDER: ContactField[] = ["name", "phone", "email", "subject", "message"];

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const startedRef = useRef<HTMLInputElement>(null);
  const startTime = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const f = home.contact.form;
  const err = state.errors ?? {};
  const v = state.values ?? {};
  const id = (k: string) => `${uid}-${k}`;

  // timing check for the spam filter: the first time the form appeared, kept across error round trips
  useEffect(() => {
    if (!startTime.current) startTime.current = Date.now();
    if (startedRef.current) startedRef.current.value = String(startTime.current);
  }, [state]);

  // move focus where the user needs it: first invalid field, or the confirmation
  useEffect(() => {
    if (state.status === "success") statusRef.current?.focus();
    if (state.errors) {
      const first = ORDER.find((k) => state.errors?.[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-line-dark rounded-lg p-8 lg:p-10 focus:outline-none">
        <span aria-hidden="true" className="block h-px w-10 bg-amber-500 mb-6" />
        <p className="text-h3 text-limestone">{f.success}</p>
      </div>
    );
  }

  const a11y = (k: ContactField) => ({
    "aria-invalid": err[k] ? true : undefined,
    "aria-describedby": err[k] ? id(`${k}-err`) : undefined,
  });
  const errText = (k: ContactField) =>
    err[k] ? <p id={id(`${k}-err`)} className="text-small text-amber-400 mt-1">{err[k]}</p> : null;

  return (
    <form ref={formRef} action={action} noValidate className="grid gap-7" key={JSON.stringify(v)}>
      <h3 className="text-label text-amber-400">{f.title}</h3>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={labelCls}>{f.name}</label>
          <input id={id("name")} name="name" type="text" autoComplete="name" required defaultValue={v.name} className={field} {...a11y("name")} />
          {errText("name")}
        </div>
        <div>
          <label htmlFor={id("phone")} className={labelCls}>{f.phone}</label>
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" required defaultValue={v.phone} className={cn(field, "text-start")} {...a11y("phone")} />
          {errText("phone")}
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={id("email")} className={labelCls}>{f.email}</label>
          <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" dir="ltr" required defaultValue={v.email} className={cn(field, "text-start")} {...a11y("email")} />
          {errText("email")}
        </div>
        <div>
          <label htmlFor={id("subject")} className={labelCls}>{f.subject}</label>
          <div className="relative">
            <select id={id("subject")} name="subject" required defaultValue={v.subject ?? ""} className={cn(field, "appearance-none cursor-pointer pe-8")} {...a11y("subject")}>
              <option value="" disabled className="text-ink">{f.subjectPlaceholder}</option>
              {subjectOptions.map((o) => (
                <option key={o.value} value={o.value} className="text-ink">{o.label}</option>
              ))}
            </select>
            <svg aria-hidden="true" viewBox="0 0 16 16" className="pointer-events-none absolute end-1 top-1/2 -translate-y-1/2 size-4 text-limestone/60" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </div>
          {errText("subject")}
        </div>
      </div>

      <div>
        <label htmlFor={id("message")} className={labelCls}>
          {f.message} <span className="text-limestone/60">({f.messageHint})</span>
        </label>
        <textarea id={id("message")} name="message" rows={3} maxLength={2000} defaultValue={v.message} className={cn(field, "resize-y min-h-[5.5rem]")} {...a11y("message")} />
        {errText("message")}
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
