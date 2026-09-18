import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { home } from "@/content/home";

export const metadata: Metadata = { title: home.notFound.title, robots: { index: false } };

export default function NotFound() {
  const n = home.notFound;
  return (
    <PageShell sunrise={false}>
      <section data-tone="light" className="container-page min-h-[72svh] flex flex-col justify-center pt-40 pb-24">
        <span className="font-tzar text-[clamp(5rem,3rem+8vw,9rem)] font-bold leading-none text-amber-700">404</span>
        <h1 className="text-h2 mt-4">{n.title}</h1>
        <p className="mt-4 text-lede font-light text-ink-soft max-w-[44ch]">{n.body}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/" variant="dark" arrow>{n.home}</Button>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-8 items-center font-medium text-ink underline decoration-amber-500 underline-offset-[6px] hover:text-amber-700">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
