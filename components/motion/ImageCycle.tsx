"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/content/images";
import { useCapabilities } from "./useCapabilities";
import { PauseButton } from "@/components/ui/PauseButton";

type Slide = { image: SiteImage; caption: string };

/**
 * Crossfading photo + caption. Advances every `interval` ms, pauses on hover and via the pause
 * button (WCAG 2.2.2), stays on the first slide under reduced motion. A thin line shows progress.
 */
export function ImageCycle({
  slides,
  interval = 5000,
  cut = "br",
  className,
  sizes = "(min-width:1024px) 40vw, 100vw",
}: {
  slides: readonly Slide[];
  interval?: number;
  cut?: "tl" | "tr" | "bl" | "br";
  className?: string;
  sizes?: string;
}) {
  const [i, setI] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { reducedMotion } = useCapabilities();
  const running = !reducedMotion && !stopped && !hovered;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), interval);
    return () => clearTimeout(t);
  }, [running, i, interval, slides.length]);

  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <figure className={className} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <div className={cn("relative overflow-hidden aspect-[4/5]", `cut-${cut}`)}>
        {slides.map((s, n) => (
          <Image
            key={s.image.src}
            src={s.image.src}
            alt={n === i ? s.image.alt : ""}
            aria-hidden={n !== i}
            fill
            sizes={sizes}
            loading={n === i || n === (i + 1) % slides.length ? "eager" : "lazy"}
            className={cn(
              "object-cover transition-[opacity,transform] duration-[1400ms] ease-out-expo",
              n === i ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]",
            )}
          />
        ))}
        {/* progress: restarts on every slide, freezes while paused */}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-cell-950/25">
          <span
            key={`${i}-${running}`}
            className={cn("block h-full bg-amber-500 origin-right", running ? "cycle-progress" : "scale-x-0")}
            style={{ animationDuration: `${interval}ms` }}
          />
        </span>
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-4 text-label text-ink-soft">
        <span className="grid flex-1">
          {slides.map((s, n) => (
            <span
              key={s.caption}
              aria-hidden={n !== i}
              className={cn("[grid-area:1/1] transition-opacity duration-700", n === i ? "opacity-100" : "opacity-0")}
            >
              {s.caption}
            </span>
          ))}
        </span>
        <span className="flex items-center gap-3">
          <span className="font-tzar text-[0.95rem] tabular ltr">
            {pad(i)} / {pad(slides.length - 1)}
          </span>
          {!reducedMotion && <PauseButton paused={stopped} onToggle={() => setStopped((v) => !v)} label="החלפת התמונות" className="size-9" />}
        </span>
      </figcaption>
    </figure>
  );
}
