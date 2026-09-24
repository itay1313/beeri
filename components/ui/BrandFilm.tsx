"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { brandFilm } from "@/content/images";
import { cn } from "@/lib/cn";

/**
 * Company film behind a poster. Nothing downloads until the visitor presses play; then the poster
 * swaps for a native player with controls and sound. The film is separate footage from the hero loop.
 */
export function BrandFilm({ title, caption, playLabel, className }: { title: string; caption?: string; playLabel: string; className?: string }) {
  const plain = title.replace(/\*/g, "");
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
          aria-label={plain}
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
        <>
          <button ref={btn} type="button" onClick={start} aria-label={`${playLabel}: ${plain}`} className="group absolute inset-0 block cursor-pointer">
            <Image
              src={brandFilm.poster.src}
              alt=""
              fill
              sizes="(min-width:1280px) 1200px, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.03]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,17,23,0.85)_0%,rgba(12,17,23,0.35)_40%,rgba(12,17,23,0)_65%)]" />
            {/* play control: bottom corner opposite the title, same inset */}
            <span aria-hidden="true" className="absolute bottom-5 end-5 sm:bottom-8 sm:end-8 lg:bottom-10 lg:end-10 flex items-center gap-4 text-limestone">
              <span className="hidden sm:block text-end">
                <span className="block font-medium">{playLabel}</span>
                <span className="block text-label text-limestone/70 mt-0.5 ltr">{brandFilm.duration}</span>
              </span>
              <span className="inline-flex size-14 sm:size-20 lg:size-24 items-center justify-center rounded-full bg-amber-500 text-cell-950 transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-110 group-focus-visible:scale-110">
                <svg viewBox="0 0 16 16" className="size-5 sm:size-6 translate-x-[1px]" fill="currentColor">
                  <path d="M4 2.5v11l9-5.5z" />
                </svg>
              </span>
            </span>
          </button>
          {/* title set on the film itself, APV style; the button underneath takes the clicks */}
          <div className="pointer-events-none absolute bottom-5 start-5 sm:bottom-8 sm:start-8 lg:bottom-10 lg:start-10 max-w-[60%] text-limestone">
            <h2 className="text-[1.5rem] sm:text-[length:var(--text-h3)] lg:text-[length:var(--text-h2)] font-medium leading-[1.02]">
              {title.split(/(\*[^*]+\*)/).map((part, i) =>
                part.startsWith("*") ? (
                  <span key={i} className="font-light">{part.slice(1, -1)}</span>
                ) : (
                  part
                ),
              )}
            </h2>
            {caption && <p className="mt-4 hidden sm:block text-small text-limestone/80 max-w-[40ch]">{caption}</p>}
          </div>
        </>
      )}
    </div>
  );
}
