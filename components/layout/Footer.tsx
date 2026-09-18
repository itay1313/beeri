import Link from "next/link";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { Logo } from "./Logo";
import { Wordmark } from "@/components/ui/Wordmark";
import { Sunrise } from "@/components/visuals/Sunrise";

export function Footer({ sunrise = true }: { sunrise?: boolean }) {
  return (
    <footer data-tone="dark" className="bg-cell-950 text-limestone/70 overflow-x-clip">
      {sunrise && <Sunrise />}
      <div className="relative">
        <div className="container-page py-12 grid gap-10 md:grid-cols-[auto_1fr_auto] md:items-start border-t border-line-dark">
          <Logo tone="paper" height={56} />
          <nav aria-label="ניווט תחתון" className="md:justify-self-center">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-6 items-center py-1 hover:text-limestone">{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href={site.contactPath} className="inline-flex min-h-6 items-center py-1 hover:text-limestone">{site.contactLabel}</Link>
              </li>
            </ul>
          </nav>
          <ul className="flex flex-col gap-1 text-small md:text-end">
            {site.people.map((p) => (
              <li key={p.id} className="flex gap-3 md:justify-end">
                <span>{p.firstName}</span>
                <a href={`tel:${p.phone}`} className="ltr inline-flex min-h-6 items-center font-tzar text-[1rem] hover:text-limestone">{p.phoneDisplay}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-page py-5 border-t border-line-dark flex flex-wrap justify-between gap-4 text-[0.8rem] text-limestone/60">
          <span>{home.footer.legal}</span>
          <Link href="/accessibility" className="inline-flex min-h-6 items-center hover:text-limestone">{home.footer.accessibility}</Link>
        </div>
        <Wordmark className="border-t border-line-dark pt-6" />
      </div>
    </footer>
  );
}
