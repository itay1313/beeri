import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { Tariff } from "@/components/sections/Tariff";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Contact } from "@/components/sections/Contact";

const p = pages.tariff;
export const metadata: Metadata = pageMetadata(p);

export default function TariffPage() {
  return (
    <PageShell>
      <PageHero eyebrow={p.eyebrow} titleLines={p.titleLines} lede={p.lede} image={p.image} />
      <Tariff />
      <HowItWorks index="02" />
      <Contact index="03" />
    </PageShell>
  );
}
