import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { NahalaOptions } from "@/components/sections/NahalaOptions";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

const p = pages.nahala;
export const metadata: Metadata = { title: p.metaTitle, description: p.metaDescription, alternates: { canonical: p.path } };

export default function NahalaPage() {
  return (
    <PageShell>
      <PageHero index="01" eyebrow={p.eyebrow} titleLines={p.titleLines} lede={p.lede} image={p.image} />
      <NahalaOptions />
      <Process />
      <Contact />
    </PageShell>
  );
}
