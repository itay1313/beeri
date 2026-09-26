/**
 * Image registry. `placeholder: true` marks assets that should be replaced
 * with real project photography before or shortly after launch.
 *
 * Client rule (2026-09-24): no utility-scale solar fields anywhere on the site. Every photo shows a
 * roof or a small-to-mid project at farm scale, with the system clearly visible.
 */
export type SiteImage = { src: string; alt: string; width: number; height: number; placeholder: boolean; credit: string };

export const images = {
  aerialFarmland: {
    src: "/images/aerial-farmland.jpg",
    alt: "צילום אווירי של שטחים חקלאיים ומבני משק",
    width: 2400,
    height: 1600,
    placeholder: false,
    credit: "stock, from existing site",
  },
  /** crop of moshavAerial: the barn, the house and a ground array of up to one dunam beside them */
  groundDunam: {
    src: "/images/ground-dunam-placeholder.jpg",
    alt: "מתקן קרקעי קטן צמוד למבנה משק, בין הבית לשטח החקלאי",
    width: 660,
    height: 440,
    placeholder: true,
    credit: "AI render supplied by client (crop) — replace",
  },
  /** crop of the client's agro render (full frame read as an open field): the corner of a bounded plot, no horizon */
  agrivoltaicPlot: {
    src: "/images/agrivoltaic-plot-placeholder.jpg",
    alt: "פינת חלקה אגרו־וולטאית תחומה בדרך עפר, עם גידול חקלאי מתחת לפאנלים",
    width: 960,
    height: 600,
    placeholder: true,
    credit: "AI render supplied by client (crop) — replace",
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
} as const satisfies Record<string, SiteImage>;

/**
 * Hero video: a few seconds of a farm-scale project (an agricultural roof or a single משק, not a
 * large agro field). Muted, looped, ≤ 4 MB, 1920px wide, mp4 (H.264) plus a webm.
 * PLACEHOLDER: a slow drone-style orbit cut from the client's single-farm render
 * (14 s, seamless loop). Replace the files with the real footage from Itamar / Michael and
 * re-export the poster from its first frame so the swap is invisible.
 */
export const heroVideo = {
  src: "/videos/hero-farm-placeholder.mp4",
  webm: "/videos/hero-farm-placeholder.webm",
  poster: {
    src: "/images/hero-farm-poster-placeholder.jpg",
    alt: "",
    width: 1920,
    height: 1080,
    placeholder: true,
    credit: "first frame of the placeholder hero loop — replace with the real video",
  } satisfies SiteImage,
  placeholder: true,
};

/**
 * Company film: plays on click (sound allowed), presents the projects and the company. Different
 * footage from the hero loop. PLACEHOLDER: 23 s silent montage of the client renders ending on the
 * logo. Replace with the real film; keep the poster a strong frame from it.
 */
export const brandFilm = {
  src: "/videos/beeri-film-placeholder.mp4",
  webm: "/videos/beeri-film-placeholder.webm",
  poster: {
    src: "/images/beeri-film-poster-barn-placeholder.jpg",
    alt: "",
    width: 1920,
    height: 1080,
    placeholder: true,
    credit: "frame of the placeholder film — replace",
  } satisfies SiteImage,
  /** shown on the poster; update with the real film's length */
  duration: "0:23",
  placeholder: true,
};

/**
 * /nahala carousel: the client's five aerial frames of one nahala (Drive, 2026-09-25), the
 * text-free versions. The badge, the option chips and the location mini-map are part of the
 * frame; the title, body and challenges are live text (NahalaCarousel.tsx). 16:9, 1920px.
 */
const frame = (file: string, alt: string): SiteImage => ({
  src: `/images/nahala/${file}`,
  alt,
  width: 1920,
  height: 1080,
  placeholder: false,
  credit: "client (Drive, 2026-09-25)",
});
export const nahalaCarousel = [
  frame("00-nahala.jpg", "מבט אווירי על נחלה: אזור המגורים בקצה, ומעבר לו חלקה א׳ החקלאית, ארוכה וצרה"),
  frame("01-roofs.jpg", "פאנלים סולאריים על גגות שני מבני משק, מבט אווירי"),
  frame("02-ground.jpg", "מתקן קרקעי של כדונם בקצה החלקה החקלאית, צמוד לאזור המגורים"),
  frame("03-agro.jpg", "שורות פאנלים מוגבהות לאורך החלקה החקלאית, עם גידול מתחתיהן"),
  frame("04-storage.jpg", "ארון סוללות בין מבני המשק, לצד המתקן הקרקעי"),
] as const satisfies readonly SiteImage[];

/** Commercial & industrial tile: an industrial park with rooftop systems (client, Drive 2026-09-25). */
export const industrialRoof: SiteImage = {
  src: "/images/industrial-park-roofs.jpg",
  alt: "מבט אווירי על אזור תעשייה: מערכות סולאריות על גגות המפעלים והמחסנים",
  width: 1600,
  height: 1200,
  placeholder: false,
  credit: "client (Drive, 2026-09-25)",
};
