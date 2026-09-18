"use client";
import { useRef } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { useCapabilities } from "./useCapabilities";

/** Magnetic wrapper (React Bits "Magnet"): the child drifts toward a nearby cursor and springs back. Pointer devices only. */
export function Magnetic({ children, strength = 0.28, radius = 140, className }: { children: React.ReactNode; strength?: number; radius?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const caps = useCapabilities();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const enabled = caps.hover && !caps.reducedMotion;

  const onMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy);
    if (d > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(dx * strength);
    y.set(dy * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={className} style={{ display: "inline-block", padding: enabled ? 12 : 0, margin: enabled ? -12 : 0 }}>
      <m.div style={{ x: sx, y: sy, display: "inline-block" }}>{children}</m.div>
    </div>
  );
}
