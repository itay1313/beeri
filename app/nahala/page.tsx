import type { Metadata } from "next";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/layout/PageShell";
import { NahalaCarousel } from "@/components/sections/NahalaCarousel";
import { NahalaOptions } from "@/components/sections/NahalaOptions";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

const p = pages.nahala;
export const metadata: Metadata = pageMetadata(p);

export default function NahalaPage() {
  return (
    <PageShell>
      {/* the aerial carousel is this page's header; the page title stays for screen readers and search */}
      <section data-tone="light" className="bg-limestone">
        <div className="container-page pt-[6.5rem] lg:pt-[7.5rem] pb-12 lg:pb-16">
          <h1 className="visually-hidden">{p.titleLines.join(" ")}</h1>
          <NahalaCarousel autoplay />
        </div>
      </section>
      <NahalaOptions />
      <Process />
      <Contact index="04" />
    </PageShell>
  );
}
