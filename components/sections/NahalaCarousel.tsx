"use client";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { home } from "@/content/home";
import { nahalaCarousel } from "@/content/images";
import { cn } from "@/lib/cn";
import { useCapabilities } from "@/components/motion/useCapabilities";
import { PauseButton } from "@/components/ui/PauseButton";

/** autoplay: the opening frame holds longer, then every 3 s */
const FIRST_MS = 7000;
const STEP_MS = 3000;

/**
 * One nahala, four projects: the client's aerial frames with their copy set live over them.
 * The badge, the option chips and the location mini-map are baked into each frame, so on wide
 * screens the text sits in the frame's dark band at the positions of the client's captioned
 * versions (container-query units keep it in step with the image). Below `lg` the text moves
 * under the frame. Arrows, index tabs, keyboard and swipe; with `autoplay` it also advances (7 s on the opening frame, then every 3 s),
 * with a pause toggle (starts paused under reduced motion). Crossfade, none under reduced motion.
 */
export function NahalaCarousel({ autoplay = false }: { autoplay?: boolean }) {
  const c = home.land.page.carousel;
  const slides = c.slides;
  const n = slides.length;
  const [i, setI] = useState(0);
  const { reducedMotion } = useCapabilities();
  const id = useId();
  const pointer = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((to: number) => setI(((to % n) + n) % n), [n]);

  // autoplay: one timer per slide, so a manual step restarts the 3 s count
  const [paused, setPaused] = useState(false);
  const running = autoplay && !paused && !reducedMotion;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setI((k) => (k + 1) % n), i === 0 ? FIRST_MS : STEP_MS);
    return () => window.clearTimeout(t);
  }, [running, i, n]);

  const onKey = (e: React.KeyboardEvent) => {
    // RTL: the "next" slide is to the left
    if (e.key === "ArrowLeft") { e.preventDefault(); go(i + 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(i - 1); }
    if (e.key === "Home") { e.preventDefault(); go(0); }
    if (e.key === "End") { e.preventDefault(); go(n - 1); }
  };
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    // keep receiving the pointer even when the finger lifts outside the frame
    e.currentTarget.setPointerCapture(e.pointerId);
    pointer.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const p = pointer.current;
    pointer.current = null;
    if (!p) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    // swipe left (dx < 0) reveals the next slide in RTL
    go(dx < 0 ? i + 1 : i - 1);
  };

  const pad = (k: number) => String(k + 1).padStart(2, "0");
  const fade = reducedMotion ? "transition-none" : "transition-[opacity,transform] duration-[900ms] ease-out-expo";

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={c.label}
      className="@container"
      onKeyDown={onKey}
    >
      {/* the frame */}
      <div
        className="relative aspect-video overflow-hidden bg-cell-950 cut-tl select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointer.current = null)}
      >
        {slides.map((s, k) => {
          const active = k === i;
          const opening = k === 0;
          return (
            <div
              key={s.key}
              id={`${id}-slide-${k}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${k + 1} מתוך ${n}`}
              aria-hidden={!active}
              className={cn("absolute inset-0", fade, active ? "opacity-100 scale-100" : "opacity-0 scale-[1.03] pointer-events-none")}
            >
              <Image
                src={nahalaCarousel[k].src}
                alt={nahalaCarousel[k].alt}
                fill
                sizes="(min-width:1400px) 1320px, 100vw"
                priority={k === 0}
                className="object-cover"
                draggable={false}
              />
              {/* live text in the frame's dark band, wide screens only */}
              <div
                className={cn(
                  "hidden lg:block absolute text-limestone text-start",
                  opening ? "top-[25%] start-[6.2%] w-[48%]" : "top-[17.5%] start-[6.2%] w-[35%]",
                  fade,
                  active ? "translate-y-0" : "translate-y-[1.5cqw]",
                )}
              >
                <h4 className={cn("font-semibold leading-[1.05] text-[4.8cqw]", !opening && "max-w-[12ch]")}>{s.title}</h4>
                <p className="mt-[1.2cqw] text-[1.55cqw] leading-[1.45] text-limestone/85">{s.body}</p>
                {s.challenges.length > 0 && (
                  <div className="mt-[1.4cqw] border-t border-limestone/25 pt-[1.1cqw]">
                    <p className="text-[1.05cqw] font-medium tracking-[0.06em] text-amber-400">{c.challengesLabel}</p>
                    <ul className="mt-[0.7cqw] grid gap-[0.45cqw] text-[1.35cqw] leading-[1.4]">
                      {s.challenges.map((ch) => (
                        <li key={ch} className="flex items-baseline gap-[0.8cqw]">
                          <span aria-hidden="true" className="mb-[0.15cqw] block size-[0.65cqw] shrink-0 rotate-45 bg-amber-400" />
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* the same text under the frame on narrow screens */}
      <div className="lg:hidden mt-6">
        {slides.map((s, k) => (
          <div key={s.key} hidden={k !== i} className="max-w-[52ch]">
            <h4 className="text-h3 font-semibold text-ink">{s.title}</h4>
            <p className="mt-3 text-ink-soft">{s.body}</p>
            {s.challenges.length > 0 && (
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-label text-amber-700">{c.challengesLabel}</p>
                <ul className="mt-2 grid gap-1.5 text-small text-ink">
                  {s.challenges.map((ch) => (
                    <li key={ch} className="flex items-baseline gap-3">
                      <span aria-hidden="true" className="block size-1.5 shrink-0 rotate-45 bg-amber-500" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* controls: arrows, index tabs, counter */}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-4">
        <div className="flex items-center gap-2">
          <ArrowButton label={c.prev} onClick={() => go(i - 1)} direction="back" />
          <ArrowButton label={c.next} onClick={() => go(i + 1)} direction="forward" />
          {autoplay && !reducedMotion && (
            <PauseButton paused={paused} onToggle={() => setPaused((v) => !v)} label="החלפת התמונות" />
          )}
        </div>
        <ol className="order-last w-full flex flex-wrap items-center gap-x-5 gap-y-1 lg:order-none lg:w-auto">
          {slides.map((s, k) => (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => go(k)}
                aria-current={k === i ? "true" : undefined}
                aria-controls={`${id}-slide-${k}`}
                className={cn(
                  "group flex min-h-9 items-center gap-2 text-label transition-colors",
                  k === i ? "text-ink" : "text-ink-soft hover:text-ink",
                )}
              >
                <span className={cn("font-tzar text-[0.95rem] font-bold", k === i ? "text-amber-700" : "text-ink-soft group-hover:text-amber-700")}>{pad(k)}</span>
                <span className={cn("border-b", k === i ? "border-ink" : "border-transparent")}>{s.tab}</span>
              </button>
            </li>
          ))}
        </ol>
        <span aria-live={running ? "off" : "polite"} className="ms-auto font-tzar text-[0.95rem] tabular text-ink-soft ltr">
          {pad(i)} / {pad(n - 1)}
        </span>
      </div>
    </section>
  );
}

function ArrowButton({ label, onClick, direction }: { label: string; onClick: () => void; direction: "back" | "forward" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink"
    >
      {/* forward points left in RTL */}
      <svg aria-hidden="true" viewBox="0 0 20 20" className={cn("size-5", direction === "forward" && "-scale-x-100")} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
        <path d="M3 10h13M11 4l6 6-6 6" />
      </svg>
    </button>
  );
}
