"use client";
import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { Logo } from "./Logo";

/** Native <dialog>: focus trap, Esc to close, inert background for free. */
export function MobileNav({ light }: { light: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    const d = ref.current;
    if (!d || d.open) return;
    d.showModal();
    document.documentElement.style.overflow = "hidden";
  }, []);
  const close = useCallback(() => {
    const d = ref.current;
    if (!d || !d.open) return;
    d.close();
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="פתיחת תפריט"
        className={cn("lg:hidden inline-flex size-11 items-center justify-center -me-2 rounded-xs", light ? "text-ink" : "text-limestone")}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
          <path d="M3 7h18M3 12h18M3 17h12" />
        </svg>
      </button>

      <dialog
        ref={ref}
        aria-label="תפריט"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-cell-950 text-limestone p-0 backdrop:bg-cell-950/60 open:flex flex-col"
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between">
          <Logo tone="paper" height={40} />
          <button type="button" onClick={close} aria-label="סגירת תפריט" className="inline-flex size-11 items-center justify-center -me-2">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
        <nav aria-label="ניווט" className="container-page flex-1 flex flex-col justify-center">
          <ul className="flex flex-col">
            {site.nav.map((item, i) => (
              <li key={item.href} className="border-t border-line-dark last:border-b">
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-baseline gap-5 py-5 text-[1.75rem] font-medium leading-none"
                >
                  <span className="font-tzar text-[1rem] text-amber-400">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={site.contactPath}
            onClick={close}
            className="mt-10 inline-flex min-h-[3.25rem] items-center justify-center bg-amber-500 text-cell-950 font-medium rounded-full"
          >
            {site.cta.primary}
          </Link>
        </nav>
        <div className="container-page py-8 flex flex-col gap-2 text-limestone/70 text-small">
          {site.people.map((p) => (
            <a key={p.id} href={`tel:${p.phone}`} className="flex justify-between">
              <span>{p.firstName}</span>
              <span className="ltr font-tzar text-[1.05rem]">{p.phoneDisplay}</span>
            </a>
          ))}
        </div>
      </dialog>
    </>
  );
}
