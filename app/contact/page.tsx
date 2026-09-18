import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { Contact } from "@/components/sections/Contact";

const p = pages.contact;
export const metadata: Metadata = { title: p.metaTitle, description: p.metaDescription, alternates: { canonical: p.path } };

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero index="04" eyebrow={p.eyebrow} titleLines={p.titleLines} image={p.image} />
      <Contact variant="page" />
    </PageShell>
  );
}
