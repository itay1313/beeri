import { PageShell } from "@/components/layout/PageShell";
import { Marquee } from "@/components/motion/Marquee";
import { marquee } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { Expertise } from "@/components/sections/Expertise";
import { LandTeaser } from "@/components/sections/LandTeaser";
import { TariffTeaser } from "@/components/sections/TariffTeaser";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FoundersTeaser } from "@/components/sections/FoundersTeaser";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Marquee items={marquee} />
      <Positioning />
      <Expertise />
      <LandTeaser />
      <TariffTeaser />
      <HowItWorks />
      <FoundersTeaser />
      <Contact />
    </PageShell>
  );
}
