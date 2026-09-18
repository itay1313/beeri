"use client";
import { useSyncExternalStore } from "react";

export type Capabilities = {
  reducedMotion: boolean;
  hover: boolean;
  lowPower: boolean;
};

const SERVER = "0|1|0";

function subscribe(cb: () => void) {
  const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hv = window.matchMedia("(hover: hover) and (pointer: fine)");
  rm.addEventListener("change", cb);
  hv.addEventListener("change", cb);
  window.addEventListener("resize", cb);
  return () => {
    rm.removeEventListener("change", cb);
    hv.removeEventListener("change", cb);
    window.removeEventListener("resize", cb);
  };
}

function snapshot() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const low =
    (navigator.hardwareConcurrency ?? 8) <= 4 || Boolean(nav.connection?.saveData) || window.innerWidth < 768;
  return `${+reduced}|${+hover}|${+low}`;
}

/** Cheap heuristics for deciding how much motion to run. Stable snapshot string → no render churn. */
export function useCapabilities(): Capabilities {
  const s = useSyncExternalStore(subscribe, snapshot, () => SERVER);
  const [r, h, l] = s.split("|");
  return { reducedMotion: r === "1", hover: h === "1", lowPower: l === "1" };
}
