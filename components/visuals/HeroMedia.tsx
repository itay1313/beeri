"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroVideo } from "@/content/images";
import { useCapabilities } from "@/components/motion/useCapabilities";
import { PauseButton } from "@/components/ui/PauseButton";

/**
 * Full-bleed hero media: the poster frame always renders (LCP); once the video file is configured
 * and the device allows motion, it plays muted and looped on top. Slow Ken Burns on the poster while
 * there is no video. Poster and video are farm scale: one משק, not an open solar field.
 * The loop runs longer than five seconds, so it gets a pause toggle (WCAG 2.2.2).
 */
export function HeroMedia() {
  const caps = useCapabilities();
  const ref = useRef<HTMLVideoElement>(null);
  const img = heroVideo.poster;
  const useVideo = Boolean(heroVideo.src) && !caps.reducedMotion && !caps.lowPower;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !useVideo) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [useVideo, paused]);

  return (
    <>
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
            className="absolute inset-0 h-full w-full object-cover object-[50%_55%]"
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
      {useVideo && (
        <PauseButton
          dark
          paused={paused}
          onToggle={() => setPaused((p) => !p)}
          label="סרטון הרקע"
          className="absolute z-20 bottom-[5.5rem] end-4 sm:end-6 lg:bottom-[6.5rem] lg:end-10 bg-cell-950/40 backdrop-blur-sm"
        />
      )}
    </>
  );
}
