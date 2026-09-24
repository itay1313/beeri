"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { heroVideo } from "@/content/images";
import { useCapabilities } from "@/components/motion/useCapabilities";

/**
 * Full-bleed hero media: the poster frame always renders (LCP); once the video file is configured
 * and the device allows motion, it plays muted and looped on top. Slow Ken Burns on the poster while
 * there is no video. Poster and video are farm scale: one משק, not an open solar field.
 */
export function HeroMedia() {
  const caps = useCapabilities();
  const ref = useRef<HTMLVideoElement>(null);
  const img = heroVideo.poster;
  const useVideo = Boolean(heroVideo.src) && !caps.reducedMotion && !caps.lowPower;

  useEffect(() => {
    const v = ref.current;
    if (!v || !useVideo) return;
    v.play().catch(() => {});
  }, [useVideo]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-cell-950">
      <Image
        src={img.src}
        alt=""
        fill
        preload
        sizes="100vw"
        className={`object-cover object-[50%_55%] ${useVideo ? "" : "hero-kenburns"}`}
      />
      {useVideo && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster={img.src}
          className="absolute inset-0 h-full w-full object-cover"
        >
          {heroVideo.webm && <source src={heroVideo.webm} type="video/webm" />}
          <source src={heroVideo.src} type="video/mp4" />
        </video>
      )}
      {/* legibility: dark at the text side (right) and at the bottom band, dark strip under the header */}
      <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(12,17,23,0.92)_0%,rgba(12,17,23,0.72)_36%,rgba(12,17,23,0.18)_62%,rgba(12,17,23,0.05)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(to_top,rgba(12,17,23,0.95)_0%,rgba(12,17,23,0.55)_45%,rgba(12,17,23,0)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(12,17,23,0.7),rgba(12,17,23,0))]" />
    </div>
  );
}
