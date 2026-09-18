import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { Contact } from "@/components/sections/Contact";

const p = pages.contact;
export const metadata: Metadata = pageMetadata(p);

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero eyebrow={p.eyebrow} titleLines={p.titleLines} image={p.image} />
      <Contact variant="page" />
    </PageShell>
  );
}
