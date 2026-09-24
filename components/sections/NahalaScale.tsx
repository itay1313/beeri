"use client";
import { useEffect, useRef } from "react";
import { home } from "@/content/home";
import { nahalaVideo } from "@/content/images";
import { useCapabilities } from "@/components/motion/useCapabilities";
import { NahalaSection } from "@/components/visuals/NahalaSection";

/** Roof, ground dunam and agro field at one scale: the technical clip once supplied, the drawing until then. */
export function NahalaScale() {
  const s = home.land.page.scale;
  const caps = useCapabilities();
  const ref = useRef<HTMLVideoElement>(null);
  const useVideo = Boolean(nahalaVideo.src) && !caps.reducedMotion && !caps.lowPower;

  useEffect(() => {
    if (useVideo) ref.current?.play().catch(() => {});
  }, [useVideo]);

  return (
    <figure>
      {useVideo ? (
        <video
          ref={ref}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label={s.caption}
          className="w-full aspect-video bg-dust object-cover"
        >
          {nahalaVideo.webm && <source src={nahalaVideo.webm} type="video/webm" />}
          <source src={nahalaVideo.src} type="video/mp4" />
        </video>
      ) : (
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <NahalaSection className="block h-auto w-full min-w-[760px]" />
        </div>
      )}
      <figcaption className="mt-4 max-w-[70ch] text-small text-ink-soft">{s.caption}</figcaption>
    </figure>
  );
}
