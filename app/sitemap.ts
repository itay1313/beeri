import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { pages } from "@/content/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  /** Bump when page content meaningfully changes. */
  const now = new Date("2026-09-18");
  return [
    { url: `${site.domain}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...Object.values(pages).map((p) => ({ url: `${site.domain}${p.path}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.domain}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
