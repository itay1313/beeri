import { site } from "@/content/site";
import { founders } from "@/content/founders";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.nameHe,
    url: site.domain,
    logo: `${site.domain}/logo/beeri-logo-navy.png`,
    description: site.description,
    foundingDate: String(site.foundedYear),
    founder: founders.people.map((p) => ({ "@type": "Person", name: p.name })),
    contactPoint: site.people.map((p) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: p.phone,
      email: p.email,
      availableLanguage: ["he", "en"],
    })),
    areaServed: "IL",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.domain,
    inLanguage: "he",
  };
}
