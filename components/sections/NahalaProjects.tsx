"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { home } from "@/content/home";
import { nahalaCarousel, nahalaLocationMaps } from "@/content/images";
import { cn } from "@/lib/cn";

/**
 * /nahala: the four projects of the header carousel, laid out one under the other as static
 * image + text. On wide screens a tall "מיקום בנחלה" rail stays pinned beside them and switches
 * to the project in view. The rail is the mini-map from the client's frames, turned upright;
 * the frames themselves are cropped above their own mini-map there. Narrow screens show the
 * whole frame (mini-map included) and no rail.
 */
export function NahalaProjects() {
  const c = home.land.page.carousel;
  const projects = c.slides.slice(1);
  const frames = nahalaCarousel.slice(1);
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // the project crossing the middle of the viewport is the one on the map
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.k));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-12">
      <ol className="lg:col-span-10 grid gap-16 lg:gap-28">
        {projects.map((p, k) => (
          <li
            key={p.key}
            ref={(el) => { refs.current[k] = el; }}
            data-k={k}
            aria-current={k === active ? "step" : undefined}
          >
            <div className="relative overflow-hidden bg-cell-950 cut-tl aspect-video lg:aspect-[12/5]">
              <Image
                src={frames[k].src}
                alt={frames[k].alt}
                fill
                sizes="(min-width:1024px) 70vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-6 lg:mt-8 grid gap-6 lg:grid-cols-10 lg:gap-10">
              <div className="lg:col-span-6">
                <h3 className="text-h3 font-semibold text-ink flex items-baseline gap-3">
                  <span className="font-tzar font-bold text-amber-700">{String(k + 1).padStart(2, "0")}</span>
                  {p.title}
                </h3>
                <p className="mt-3 text-ink-soft max-w-[52ch]">{p.body}</p>
              </div>
              {p.challenges.length > 0 && (
                <div className="lg:col-span-4 border-t border-line pt-4 lg:border-t-0 lg:border-s lg:pt-0 lg:ps-6">
                  <p className="text-label text-amber-700">{c.challengesLabel}</p>
                  <ul className="mt-2 grid gap-1.5 text-small text-ink">
                    {p.challenges.map((ch) => (
                      <li key={ch} className="flex items-baseline gap-3">
                        <span aria-hidden="true" className="block size-1.5 shrink-0 rotate-45 bg-amber-500" />
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* the rail: pinned beside the projects on wide screens */}
      <aside aria-label="מיקום בנחלה" className="hidden lg:block lg:col-span-2">
        <div className="sticky top-28 flex flex-col items-center">
          <p className="text-label text-ink">מיקום בנחלה</p>
          <p className="mt-3 text-small text-ink-soft">אזור המגורים</p>
          <div className="relative mt-2 h-[min(calc(100svh-21rem),40rem)] aspect-[115/1076] border border-ink/70 bg-cell-950 overflow-hidden">
            {nahalaLocationMaps.map((m, k) => (
              <Image
                key={m.src}
                src={m.src}
                alt=""
                fill
                sizes="72px"
                className={cn("object-cover transition-opacity duration-500", k === active ? "opacity-100" : "opacity-0")}
              />
            ))}
          </div>
          <p className="mt-2 text-small text-ink-soft">חלקה א׳ חקלאית</p>
          <p aria-live="polite" className="mt-5 text-center text-small font-medium text-ink">
            <span className="block font-tzar font-bold text-amber-700">{String(active + 1).padStart(2, "0")}</span>
            {projects[active].tab}
          </p>
        </div>
      </aside>
    </div>
  );
}
