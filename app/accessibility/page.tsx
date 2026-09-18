import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: `הצהרת הנגישות של אתר ${site.name}.`,
  alternates: { canonical: "/accessibility" },
};

/** Draft — details (accessibility coordinator, date) to be confirmed by the client before launch. */
export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main id="main" data-tone="light" className="container-page py-40 max-w-[72ch]">
        <p className="text-label text-amber-700 mb-5">{site.name}</p>
        <h1 className="text-h2">הצהרת נגישות</h1>
        <div className="mt-10 grid gap-5 text-ink-soft">
          <p>
            אנו רואים חשיבות רבה בהנגשת האתר לאנשים עם מוגבלות. האתר נבנה בהתאם להנחיות WCAG 2.2 ברמה AA: מבנה
            סמנטי, ניווט מלא במקלדת, סימון פוקוס גלוי, ניגודיות צבעים תקינה, תיאורי תמונות, תוויות לשדות טופס ותמיכה
            בהעדפת הפחתת תנועה.
          </p>
          <p>
            נתקלתם בקושי? נשמח לשמוע ולתקן. ניתן לפנות אלינו בטלפון{" "}
            <a href={`tel:${site.people[0].phone}`} className="ltr underline decoration-amber-500 underline-offset-4">{site.people[0].phoneDisplay}</a>{" "}
            או בדוא״ל{" "}
            <a href={`mailto:${site.people[0].email}`} className="ltr underline decoration-amber-500 underline-offset-4">{site.people[0].email}</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
