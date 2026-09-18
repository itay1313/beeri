/**
 * Image registry. `placeholder: true` marks assets that should be replaced
 * with real project photography before or shortly after launch.
 */
export const images = {
  heroRows: {
    src: "/images/sunrise-rows.jpg",
    alt: "שורות פאנלים סולאריים בשדה חקלאי עם זריחה באופק",
    width: 1858,
    height: 2000,
    placeholder: false,
    credit: "supplied by client (deck)",
  },
  aerialFarmland: {
    src: "/images/aerial-farmland.jpg",
    alt: "צילום אווירי של שטח חקלאי עם שורות פאנלים סולאריים",
    width: 2400,
    height: 1600,
    placeholder: false,
    credit: "stock, from existing site",
  },
  agrivoltaicRows: {
    src: "/images/agrivoltaic-rows-placeholder.jpg",
    alt: "שדה אגרו־וולטאי: גידול חקלאי בין שורות פאנלים",
    width: 1600,
    height: 900,
    placeholder: true,
    credit: "AI render supplied by client — replace",
  },
  barnBess: {
    src: "/images/barn-bess-placeholder.jpg",
    alt: "מבנה משק פתוח עם מערכת סולארית על הגג וארון אגירה לצד הקיר",
    width: 1800,
    height: 1013,
    placeholder: true,
    credit: "AI render supplied by client — replace",
  },
  moshavAerial: {
    src: "/images/moshav-aerial-placeholder.jpg",
    alt: "מבט אווירי על נחלה במושב עם מערכת סולארית על גג מבנה המשק ובשטח החקלאי",
    width: 1600,
    height: 900,
    placeholder: true,
    credit: "AI render supplied by client — replace",
  },
} as const;

/**
 * Optional hero video (drone footage). Leave `src` empty to use the photo only.
 * Keep it short (10–20s), muted, ≤ 4 MB, 1920px wide, with an mp4 (H.264) and ideally a webm.
 */
export const heroVideo = {
  src: "",
  webm: "",
  poster: images.heroRows.src,
};

export type SiteImage = (typeof images)[keyof typeof images];
