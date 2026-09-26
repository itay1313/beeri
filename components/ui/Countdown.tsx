"use client";
import { useEffect, useState } from "react";
import { home } from "@/content/home";
import { spec } from "@/content/spec";
import { cn } from "@/lib/cn";
import { useCapabilities } from "@/components/motion/useCapabilities";

const TARGET = Date.parse(spec.tariffCloseAt);

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/**
 * Live clock to the closing of the complementary tariff (end of 2026). Renders dashes on the
 * server and fills in on mount, so the markup never disagrees with the client's clock. Ticks
 * every second; under reduced motion the seconds are dropped and it ticks once a minute.
 */
export function Countdown({ className }: { className?: string }) {
  const t = home.tariff.urgency.countdown;
  const { reducedMotion } = useCapabilities();
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(TARGET - Date.now());
    tick();
    const every = reducedMotion ? 60_000 : 1000;
    const timer = setInterval(tick, every);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  const parts = left === null ? null : split(left);
  const closed = left !== null && left <= 0;
  const units = (["days", "hours", "minutes", "seconds"] as const).filter((u) => u !== "seconds" || !reducedMotion);
  const show = (u: (typeof units)[number]) => {
    if (!parts) return "––";
    const v = parts[u];
    return u === "days" ? String(v) : String(v).padStart(2, "0");
  };

  return (
    <div className={cn("text-limestone", className)}>
      <p className="text-label text-limestone/60 mb-3">{t.label}</p>
      {closed ? (
        <p className="text-h3 font-medium">{t.closed}</p>
      ) : (
        <div role="timer" aria-label={t.label} className="flex items-end gap-5 sm:gap-7 border-t border-line-dark pt-4">
          {units.map((u) => (
            <div key={u} className="flex flex-col">
              <span className="font-tzar font-light leading-none tabular text-[clamp(2.75rem,5.2vw,4.75rem)]">{show(u)}</span>
              <span className="mt-2 text-label text-amber-400">{t.units[u]}</span>
            </div>
          ))}
        </div>
      )}
      {!closed && <p className="mt-3 text-label text-limestone/60">{t.until}</p>}
    </div>
  );
}
