"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { useCapabilities } from "@/components/motion/useCapabilities";

type Props = {
  className?: string;
  /** dot pitch in CSS px */
  pitch?: number;
  /** rows of dots per strip, and empty rows between strips (agrovoltaic rows) */
  rowsPerStrip?: number;
  gapRows?: number;
};

/** RGB of --color-limestone and --color-amber-500 (canvas needs numbers) */
const LIMESTONE = [242, 237, 227] as const;
const AMBER = [227, 154, 46] as const;

/**
 * The PV field: a canvas of dots grouped in long strips. Near the cursor, dots brighten to amber and
 * drift along their row like current through a string. Touch/low-power: a slow autonomous wave.
 * Static under reduced motion. aria-hidden — purely decorative.
 */
export function PlotField({ className, pitch = 16, rowsPerStrip = 5, gapRows = 3 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { reducedMotion, hover, lowPower } = useCapabilities();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let visible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const start = performance.now();
    const p = lowPower ? pitch * 1.5 : pitch;
    const useWave = !hover || lowPower;
    const radius = 220;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const time = (t - start) / 1000;
      // ease the cursor
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      const breath = 0.85 + 0.15 * Math.sin(time * (Math.PI / 3)); // 6s breath
      const cols = Math.ceil(width / p) + 1;
      const rows = Math.ceil(height / p) + 1;
      const period = rowsPerStrip + gapRows;
      const waveX = useWave ? ((time * 40) % (width + 400)) - 200 : -9999;

      for (let r = 0; r < rows; r++) {
        if (r % period >= rowsPerStrip) continue; // gap between strips
        const y = r * p + p / 2;
        for (let c = 0; c < cols; c++) {
          const x = c * p + p / 2;
          let e = 0; // energy 0..1
          if (useWave) {
            const d = Math.abs(x - waveX);
            e = Math.max(0, 1 - d / 260);
            e = e * e;
          } else {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const d = Math.hypot(dx, dy);
            if (d < radius) {
              e = 1 - d / radius;
              e = e * e * (3 - 2 * e);
            }
          }
          const drift = e * 6; // px along the row, "current" direction
          const a = (0.18 + 0.55 * e) * breath;
          const rr = 1.1 + 1.1 * e;
          const col = e > 0.02
            ? `rgba(${lerp(LIMESTONE[0], AMBER[0], e)}, ${lerp(LIMESTONE[1], AMBER[1], e)}, ${lerp(LIMESTONE[2], AMBER[2], e)}, ${a})`
            : `rgba(${LIMESTONE[0]}, ${LIMESTONE[1]}, ${LIMESTONE[2]}, ${a})`;
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(x - drift, y, rr, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (t: number) => {
      if (!running || !visible) {
        raf = 0;
        return;
      }
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.relatedTarget) return; // only when the pointer leaves the window
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    resize();
    if (reducedMotion) {
      draw(start + 1000); // one static frame
    } else {
      raf = requestAnimationFrame(loop);
      if (!useWave) {
        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerout", onLeave);
      }
    }
    const io = new IntersectionObserver(
      ([en]) => {
        visible = en.isIntersecting;
        // pause the loop entirely while off-screen; resume on re-entry
        if (visible && running && !reducedMotion && !raf) raf = requestAnimationFrame(loop);
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(start + 1000);
    });
    ro.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
      io.disconnect();
      ro.disconnect();
    };
  }, [reducedMotion, hover, lowPower, pitch, rowsPerStrip, gapRows]);

  return <canvas ref={ref} aria-hidden="true" className={cn("block h-full w-full", className)} />;
}

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}
