import type { Metadata } from "next";

type PageMeta = { path: string; metaTitle: string; metaDescription: string };

/** Per-page metadata: title, description, canonical and matching Open Graph fields. */
export function pageMetadata(p: PageMeta): Metadata {
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: p.path },
    openGraph: { title: p.metaTitle, description: p.metaDescription, url: p.path },
    twitter: { title: p.metaTitle, description: p.metaDescription },
  };
}
