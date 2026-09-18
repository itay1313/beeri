import localFont from "next/font/local";

/**
 * Ploni + Ploni Tzar (AlefAlefAlef). Self-hosted under the site's own domain per the AAA web license.
 * Regular + DemiBold + Tzar Bold are preloaded; the rest load on demand.
 */
export const ploni = localFont({
  variable: "--font-ploni",
  display: "swap",
  preload: true,
  fallback: ["Arial Hebrew", "Arial", "sans-serif"],
  adjustFontFallback: false,
  src: [
    { path: "../public/fonts/ploni/ploni-light-aaa.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/ploni/ploni-regular-aaa.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/ploni/ploni-medium-aaa.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ploni/ploni-demibold-aaa.woff2", weight: "600", style: "normal" },
  ],
});

export const ploniTzar = localFont({
  variable: "--font-ploni-tzar",
  display: "swap",
  preload: false,
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
  adjustFontFallback: false,
  src: [
    { path: "../public/fonts/ploni-tzar/ploni-tzar-light-aaa.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/ploni-tzar/ploni-tzar-regular-aaa.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/ploni-tzar/ploni-tzar-medium-aaa.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ploni-tzar/ploni-tzar-bold-aaa.woff2", weight: "700", style: "normal" },
  ],
});
