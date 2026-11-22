import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: `מדיניות הפרטיות של ${site.name}: איזה מידע אנו אוספים, למה, ומה הזכויות שלך.`,
  alternates: { canonical: "/privacy" },
  openGraph: { title: "מדיניות פרטיות", url: "/privacy" },
};

const sections: { title: string; items: string[] }[] = [
  {
    title: "איזה מידע אנו אוספים",
    items: [
      "פרטי קשר שמסרת לנו: שם, טלפון ודוא״ל.",
      "פרטים על הנכס שמסרת לנו, כגון שם המושב, הקשר שלך לנחלה וגודל השטח.",
      "מידע שמסרת באתר, בשיחה איתנו או בטופסי פרסום ברשתות החברתיות (פייסבוק ואינסטגרם).",
    ],
  },
  {
    title: "למה אנו משתמשים במידע",
    items: [
      "כדי לחזור אליך ולבדוק את היתכנות הפרויקט בנכס שלך.",
      "כדי לשלוח לך הצעה ומידע רלוונטי על פרויקטים סולאריים ואגירה.",
      "כדי לשפר את השירות ואת הפרסום שלנו.",
    ],
  },
  {
    title: "העברת מידע לאחרים",
    items: [
      "אנו לא מוכרים מידע אישי. נעביר מידע רק לספקי שירות שעובדים בשבילנו (למשל מערכות דיוור, אחסון ופרסום כמו Meta ו־Google), ליועצים מקצועיים במסגרת בדיקת הפרויקט, או כשהחוק מחייב זאת.",
    ],
  },
  {
    title: "שמירת המידע",
    items: ["אנו שומרים את המידע כל עוד הוא נדרש למטרות שלמעלה, ומאבטחים אותו באמצעים סבירים."],
  },
];

const linkClass = "ltr underline decoration-amber-500 underline-offset-4";

export default function PrivacyPage() {
  const contact = site.people[0];
  return (
    <PageShell sunrise={false}>
      <section data-tone="light" className="container-page pt-40 pb-28 max-w-[72ch]">
        <p className="text-label text-amber-700 mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-8 bg-amber-500" />
          BE&apos;ERI ENERGY SOLUTIONS
        </p>
        <h1 className="text-h2">מדיניות פרטיות</h1>
        <div className="mt-10 grid gap-10 text-ink-soft">
          <p>
            בארי פתרונות אנרגיה (״בארי״, ״אנחנו״) מכבדת את פרטיותך. מדיניות זו מסבירה איזה מידע אנו אוספים, למה,
            ומה הזכויות שלך.
          </p>

          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-h3 text-ink mb-3">{s.title}</h2>
              {s.items.length > 1 ? (
                <ul className="grid gap-2 list-disc ps-5 marker:text-amber-500">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{s.items[0]}</p>
              )}
            </div>
          ))}

          <div>
            <h2 className="text-h3 text-ink mb-3">הזכויות שלך</h2>
            <p>
              לפי חוק הגנת הפרטיות, התשמ״א־1981, את/ה רשאי/ת לעיין במידע עליך, לבקש לתקן אותו או לבקש למחוק אותו, וכן
              לבקש שלא נפנה אליך יותר. לפניות:{" "}
              <a href={`mailto:${contact.email}`} className={linkClass}>{contact.email}</a>.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink mb-3">עוגיות ומדידה</h2>
            <p>
              האתר עשוי להשתמש בעוגיות ובכלי מדידה (כמו Meta Pixel ו־Google Analytics) כדי להבין איך משתמשים בו
              ולהציג פרסום רלוונטי. אפשר לחסום עוגיות בהגדרות הדפדפן.
            </p>
          </div>

          <div>
            <h2 className="text-h3 text-ink mb-3">שינויים</h2>
            <p>אנו עשויים לעדכן מדיניות זו מעת לעת. הגרסה העדכנית תופיע תמיד בעמוד זה.</p>
          </div>

          <p className="text-small text-ink-soft/80 border-t border-line pt-6">עודכן לאחרונה: נובמבר 2026</p>
        </div>
      </section>
    </PageShell>
  );
}
