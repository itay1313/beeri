# BE'ERI Energy Solutions — website

Hebrew (RTL) marketing site. Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion.

## Routes

| Route | Page | Composition |
|---|---|---|
| `/` | Home | Hero (photo/video) · positioning · expertise ledger · nahala teaser · tariff teaser · flow diagram · founders teaser · contact |
| `/nahala` | חלקה א׳ | Page hero · three options as photo rows · תמ״א 1/24 spec sheet · six-step process · contact |
| `/tariff` | התעריף המשלים | Page hero · what / how / who + roof schematic · flow diagram + alternatives · contact |
| `/about` | מי אנחנו | Page hero · statement · four services · business models · founders · contact |
| `/contact` | צור קשר | Page hero · what the consultation includes · form |
| `/accessibility` | הצהרת נגישות | Draft statement (confirm details before launch) |

Inner-page hero copy lives in `content/pages.ts`; everything else comes from `content/home.ts`.

## Run

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## Where things live

| What | Where |
|---|---|
| All copy (hero, sections, form labels) | `content/home.ts` |
| Inner-page titles, ledes, meta tags | `content/pages.ts` |
| Optional hero drone video (`heroVideo`) | `content/images.ts` |
| Company facts: phones, emails, nav, CTA labels | `content/site.ts` |
| תמ״א 1/24 numbers (single source of truth) | `content/spec.ts` |
| Founders' bios and portraits | `content/founders.ts` |
| Image registry (alt text, `placeholder` flag) | `content/images.ts` |
| Design tokens (colors, type scale, spacing) | `app/globals.css` (`@theme` block + `:root`) |
| Fonts (Ploni / Ploni Tzar, self-hosted) | `app/fonts.ts`, `public/fonts/` |
| Sections | `components/sections/*` |
| Visuals: dot field, plot drawing, flow diagram, roof schematic | `components/visuals/*` |
| Contact section (phone, WhatsApp, email per founder) | `components/sections/Contact.tsx`, numbers in `content/site.ts` |
| SEO: metadata, OG image, sitemap, robots, JSON-LD | `app/layout.tsx`, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `lib/schema.ts` |
| Old Wix store URLs → home | `next.config.ts` (`redirects`) |

## Motion elements (all respect `prefers-reduced-motion`)

| Component | Where it is used |
|---|---|
| `MaskedHeading` — words rise out of clipping boxes | every section title (`SectionHeading`) |
| `BlurText` — word-by-word blur-in | section ledes, `Statement` paragraphs |
| `CountUp` — numbers count up in view | תמ״א spec sheet, home land teaser |
| `Magnetic` — CTA drifts toward the cursor | hero CTA, form submit, nahala CTA (pointer devices only) |
| `Marquee` — endless CSS word line with a pause button | under the home and about heroes |
| `ImageReveal` — photo un-clips from the bottom with a settle | positioning, expertise tiles, land aerial |
| `Sunrise` — scroll-driven sunrise above the footer (rises on scroll down, sets on scroll up) | every page except 404 and accessibility (`PageShell sunrise={false}`) |
| `EnergyFlowDiagram` — day/peak states, pause button; horizontal on tablet+, vertical on phones | how-it-works |
| `TariffChart` — one day against the connection cap, draws in on view | tariff teaser and /tariff |
| `PlotField` — canvas dot field, paused off-screen | sunrise ground |

## Shared UI

`Button` (primary / dark / ghost pills), `TextLink` (underlined arrow link), `SectionHeading` (index + eyebrow + masked title;
wrap words in `*asterisks*` in content to set them in Light), `PageHero`, `ImagePanel`, `FounderCard`, `PauseButton`.
Section numbers restart on every page; pass `index` to `HowItWorks` / `Contact` when reusing them.

## Editing content

Edit the `.ts` files in `content/`. Every string on the page comes from there; sections never hard-code text.
Line breaks in the hero headline are authored in `home.hero.titleLines`.

## Replacing images

Drop the new file in `public/images/`, update the entry in `content/images.ts` (src, alt, width, height) and set
`placeholder: false`. Entries with `placeholder: true` mark images to replace with real project photography; nothing renders differently.

## Contact

There is no form. The contact section lists each founder with a tap-to-call number, a WhatsApp link
(`wa.me`, prefilled message in `content/home.ts → contact.direct.whatsappText`) and a mailto link with a
prefilled subject. Change numbers and addresses in `content/site.ts → people`.

## Fonts / license

**The licensed font files are committed** (`public/fonts/`, `assets/fonts/`), so this repository must stay
**private**. Making it public would distribute the fonts, which the licence forbids.


Ploni and Ploni Tzar are licensed from AlefAlefAlef for **one domain, self-hosted**. Keep them served from
beeri-energy.com only. Protect preview deployments (Vercel Deployment Protection) rather than leaving them public.

## Deploy

Vercel: import the repo (no environment variables needed), point `beeri-energy.com` (and `www`) to Vercel.
`www` is the canonical host (`content/site.ts → domain`).
