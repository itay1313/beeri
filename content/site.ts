/**
 * Site-wide facts. Every phone number, email and label lives here once.
 */
export const site = {
  name: "BE'ERI Energy Solutions",
  nameHe: "בארי פתרונות אנרגיה",
  shortName: "BE'ERI",
  domain: "https://www.beeri-energy.com",
  tagline: "פתרונות אנרגיה לנחלות, לאגרו ולתעשייה",
  description:
    "בארי פתרונות אנרגיה: פתרונות אגירה ואנרגיה סולארית לנחלות, למגזר החקלאי ולתעשייה. תכנון, ליווי רגולטורי והקמה מלאה, עד שהמערכת מייצרת לכם כסף.",
  foundedYear: 2026,
  people: [
    {
      id: "michael",
      firstName: "מיכאל",
      fullName: "מיכאל דנקנר",
      latinName: "Michael",
      phone: "+972526122550",
      phoneDisplay: "052-612-2550",
      email: "Michael@beeri-energy.com",
    },
    {
      id: "itamar",
      firstName: "איתמר",
      fullName: "איתמר מרציאנו",
      latinName: "Itamar",
      phone: "+972524734291",
      phoneDisplay: "052-473-4291",
      email: "Itamar@beeri-energy.com",
    },
  ],
  nav: [
    { href: "/nahala", label: "חלקה א׳" },
    { href: "/tariff", label: "התעריף המשלים" },
    { href: "/#how-it-works", label: "איך זה עובד" },
    { href: "/about", label: "מי אנחנו" },
  ],
  contactId: "contact",
  contactPath: "/contact",
  /** thin meta strips between sections */
  meta: {
    brand: "© BE'ERI 2026",
    sectors: "נחלות · אגרו · תעשייה",
    services: "רגולציה · ליווי · תכנון · ניהול והקמה",
  },
  cta: {
    primary: "קבעו שיחת ייעוץ ללא התחייבות",
    short: "לשיחת ייעוץ",
    land: "בדקו איזה פתרון מתאים לנחלה שלכם",
    submit: "שלחו וניצור קשר",
  },
} as const;

/** words for the scrolling line under the hero */
export const marquee = ["נחלות", "אגרו", "תעשייה", "אגירת אנרגיה", "התעריף המשלים", "תמ״א 1 / 24", "חלקה א׳"] as const;

export type Person = (typeof site.people)[number];
