"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/**
 * Transparent over the dark hero; limestone with a hairline once the page scrolls.
 * `data-header-tone` on sections is read via IntersectionObserver so text stays legible over light sections.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Which section sits under the header's bottom edge? Observe a 1px band at y = header height.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    let io: IntersectionObserver | undefined;
    const observe = () => {
      io?.disconnect();
      const band = 72;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setOnDark(e.target.getAttribute("data-tone") === "dark");
          }
        },
        { rootMargin: `-${band}px 0px -${Math.max(0, window.innerHeight - band - 1)}px 0px`, threshold: 0 },
      );
      sections.forEach((s) => io!.observe(s));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", observe);
      io?.disconnect();
    };
  }, []);

  const pathname = usePathname();
  const light = !onDark;
  const primaryPerson = site.people[0];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-300",
        scrolled && light && "bg-limestone/92 backdrop-blur-sm border-b border-line",
        scrolled && !light && "bg-cell-950/85 backdrop-blur-sm border-b border-line-dark",
        light ? "text-ink" : "text-limestone",
      )}
    >
      <a
        href="#main"
        className="visually-hidden focus:not-sr-only focus:absolute focus:top-3 focus:start-3 focus:z-[100] focus:bg-amber-500 focus:text-cell-950 focus:px-4 focus:py-2 focus:rounded-full focus:[clip:auto] focus:[width:auto] focus:[height:auto]"
      >
        דלגו לתוכן
      </a>
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Logo tone={light ? "navy" : "paper"} height={40} preload />

        <nav aria-label="ניווט ראשי" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {site.nav.map((item) => {
              const active = item.href === pathname;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[1rem] font-medium after:absolute after:bottom-0 after:start-0 after:h-px after:bg-amber-500 after:transition-[width] after:duration-300 after:ease-out-expo hover:after:w-full",
                      active ? "after:w-full" : "after:w-0",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={`tel:${primaryPerson.phone}`}
            className="ltr hidden xl:inline-flex items-center gap-2 font-tzar text-[1.05rem] font-medium tracking-wide opacity-80 hover:opacity-100"
          >
            {primaryPerson.phoneDisplay}
          </a>
          <Link
            href={site.contactPath}
            className={cn(
              "hidden sm:inline-flex items-center min-h-[2.6rem] px-5 rounded-full text-[0.95rem] font-medium transition-colors duration-200",
              light ? "bg-cell-950 text-limestone hover:bg-cell-800" : "bg-amber-500 text-cell-950 hover:bg-amber-400",
            )}
          >
            {site.cta.short}
          </Link>
          <MobileNav light={light} />
        </div>
      </div>
    </header>
  );
}
