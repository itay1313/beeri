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
 * large agro field). Muted, looped, ≤ 4 MB, 1920px wide, mp4 (H.264) and ideally a webm.
 * Pending from Itamar / Michael; until it arrives the poster frame stands in.
 */
export const heroVideo = {
  src: "",
  webm: "",
  poster: images.moshavAerial,
};

/**
 * /nahala: short technical clip of the three options side by side at real scale (roof, one dunam
 * on the ground, agrivoltaic up to 10 dunam). Pending; until it arrives the page shows the drawn
 * cross-section (components/visuals/NahalaSection.tsx).
 */
export const nahalaVideo = {
  src: "",
  webm: "",
};

/**
 * Commercial & industrial tile: needs a photo of a factory or logistics warehouse with a rooftop
 * system. Pending from the client; until it arrives the tile shows a drawing (WarehouseRoof.tsx).
 */
export const industrialRoof: SiteImage | null = null;
