import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { faqJsonLd } from "@/lib/schema";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

const p = pages.faq;
export const metadata: Metadata = pageMetadata(p);

export default function FaqPage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <PageHero eyebrow={p.eyebrow} titleLines={p.titleLines} lede={p.lede} image={p.image} />
      <Faq />
      <Contact index="02" />
    </PageShell>
  );
}
