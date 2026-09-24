"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { brandFilm } from "@/content/images";
import { cn } from "@/lib/cn";

/**
 * Company film behind a poster. Nothing downloads until the visitor presses play; then the poster
 * swaps for a native player with controls and sound. The film is separate footage from the hero loop.
 */
export function BrandFilm({ title, playLabel, className }: { title: string; playLabel: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  function start() {
    setPlaying(true);
    // the element mounts on this render; play inside the same user gesture
    requestAnimationFrame(() => {
      const v = ref.current;
      if (!v) return;
      v.focus();
      v.play().catch(() => {});
    });
  }

  return (
    <div className={cn("relative aspect-video overflow-hidden bg-cell-950 cut-br", className)}>
      {playing ? (
        <video
          ref={ref}
          controls
          autoPlay
          playsInline
          preload="auto"
          poster={brandFilm.poster.src}
          aria-label={title}
          onEnded={() => {
            setPlaying(false);
            // the video unmounts; hand focus back to the play button so keyboard users keep their place
            requestAnimationFrame(() => btn.current?.focus());
          }}
          className="absolute inset-0 h-full w-full object-contain bg-cell-950"
        >
          {brandFilm.webm && <source src={brandFilm.webm} type="video/webm" />}
          <source src={brandFilm.src} type="video/mp4" />
        </video>
      ) : (
        <button ref={btn} type="button" onClick={start} className="group absolute inset-0 block text-start cursor-pointer">
          <Image
            src={brandFilm.poster.src}
            alt=""
            fill
            sizes="(min-width:1280px) 1200px, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.03]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,17,23,0.78)_0%,rgba(12,17,23,0.2)_45%,rgba(12,17,23,0)_70%)]" />
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 sm:p-8 lg:p-10">
            <span className="inline-flex items-center gap-4">
              <span
                aria-hidden="true"
                className="inline-flex size-16 sm:size-20 lg:size-24 items-center justify-center rounded-full bg-amber-500 text-cell-950 transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-110 group-focus-visible:scale-110"
              >
                <svg viewBox="0 0 16 16" className="size-5 sm:size-6 translate-x-[1px]" fill="currentColor">
                  <path d="M4 2.5v11l9-5.5z" />
                </svg>
              </span>
              <span className="text-limestone">
                <span className="block text-[1.15rem] sm:text-h3 font-medium">{playLabel}</span>
                <span className="block text-label text-limestone/70 mt-1 ltr text-end">{brandFilm.duration}</span>
              </span>
            </span>
          </span>
          <span className="sr-only">{title}</span>
        </button>
      )}
    </div>
  );
}
