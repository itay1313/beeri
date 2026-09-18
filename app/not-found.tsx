import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { NotFoundScene } from "@/components/visuals/NotFoundScene";
import { site } from "@/content/site";
import { home } from "@/content/home";

export const metadata: Metadata = { title: home.notFound.title.replace(/\*/g, ""), robots: { index: false } };

export default function NotFound() {
  const n = home.notFound;
  return (
    <PageShell sunrise={false}>
      <section data-tone="dark" className="relative bg-cell-950 text-limestone min-h-[max(100svh,44rem)] flex flex-col">
        <div className="container-page relative z-10 pt-[7.5rem] lg:pt-[8.5rem] text-center">
          <p className="hero-in text-label text-amber-400 mb-4 flex items-center justify-center gap-3" style={{ ["--i" as string]: 0 }}>
            <span aria-hidden="true" className="block h-px w-8 bg-amber-400" />
            {n.eyebrow}
            <span aria-hidden="true" className="block h-px w-8 bg-amber-400" />
          </p>
          <MaskedHeading as="h1" text={n.title} className="text-h2 text-limestone" />
          <p className="hero-in mt-5 text-lede font-light text-limestone/80 max-w-[40ch] mx-auto" style={{ ["--i" as string]: 3 }}>{n.body}</p>
          <div className="hero-in mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3" style={{ ["--i" as string]: 4 }}>
            <Button href="/" arrow>{n.home}</Button>
            <span className="text-small text-limestone/60">{n.or}</span>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-8 items-center font-medium text-limestone underline decoration-amber-500 underline-offset-[6px] hover:text-amber-400">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <NotFoundScene />
      </section>
    </PageShell>
  );
}
