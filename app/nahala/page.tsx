import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { NahalaOptions } from "@/components/sections/NahalaOptions";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

const p = pages.nahala;
export const metadata: Metadata = pageMetadata(p);

export default function NahalaPage() {
  return (
    <PageShell>
      <PageHero eyebrow={p.eyebrow} titleLines={p.titleLines} lede={p.lede} image={p.image} />
      <NahalaOptions />
      <Process />
      <Contact index="04" />
    </PageShell>
  );
}
