import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { Tariff } from "@/components/sections/Tariff";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Contact } from "@/components/sections/Contact";

const p = pages.tariff;
export const metadata: Metadata = { title: p.metaTitle, description: p.metaDescription, alternates: { canonical: p.path } };

export default function TariffPage() {
  return (
    <PageShell>
      <PageHero index="02" eyebrow={p.eyebrow} titleLines={p.titleLines} lede={p.lede} image={p.image} />
      <Tariff variant="page" />
      <HowItWorks />
      <Contact />
    </PageShell>
  );
}
