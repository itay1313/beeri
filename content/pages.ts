import { home } from "./home";
import { images } from "./images";

/** Inner pages: hero copy is drawn from the approved homepage copy; only the short titles are new. */
export const pages = {
  nahala: {
    path: "/nahala",
    navLabel: "חלקה א׳",
    eyebrow: "חלקה א׳ · תמ״א 1 / תיקון 24",
    titleLines: ["פרויקט סולארי", "בחלקה א׳"],
    lede: home.land.intro,
    image: images.moshavAerial,
    metaTitle: "חלקה א׳: פתרונות סולאריים לנחלה",
    metaDescription:
      "התקנה על גגות, דונם קרקעי ואגרו־וולטאי עד 10 דונם בחלקה א׳. התנאים המרכזיים של תמ״א 1/24 והתהליך המלא, שלב אחר שלב.",
  },
  tariff: {
    path: "/tariff",
    navLabel: "התעריף המשלים",
    eyebrow: "אגירת אנרגיה · הרחבת מערכת קיימת",
    titleLines: ["התעריף", "המשלים"],
    lede: home.tariff.sub,
    image: images.barnBess,
    metaTitle: "התעריף המשלים: הרחבת מערכת סולארית ללא הרחבת חיבור",
    metaDescription:
      "אסדרת התעריף המשלים מאפשרת להרחיב מערכת סולארית קיימת בעזרת סוללת אגירה, ללא הגדלת החיבור. מה זה, איך זה עובד ולמי זה מתאים.",
  },
  about: {
    path: "/about",
    navLabel: "מי אנחנו",
    eyebrow: "BE'ERI ENERGY SOLUTIONS",
    titleLines: ["מי אנחנו"],
    lede: home.about.intro,
    image: images.aerialFarmland,
    metaTitle: "מי אנחנו",
    metaDescription:
      "בארי פתרונות אנרגיה: חברה יזמית לפיתוח וקידום פרויקטים סולאריים ואגירה במגזר החקלאי, המסחרי והתעשייתי. הכירו את איתמר מרציאנו ומיכאל דנקנר.",
  },
  faq: {
    path: "/faq",
    navLabel: "שאלות נפוצות",
    eyebrow: "חלקה א׳ · היתרים וחקלאות מיטבית",
    titleLines: ["שאלות", "נפוצות"],
    lede: "מה נדרש כדי להקים מתקן אגרו־וולטאי בנחלה, מה נבדק בדרך, ומה קורה אחרי שהוא עומד בשטח.",
    image: images.heroRows,
    metaTitle: "שאלות נפוצות: היתרים וחקלאות מיטבית בחלקה א׳",
    metaDescription:
      "אילו היתרים נדרשים למתקן אגרו־וולטאי בחלקה א׳, מה בודק משרד החקלאות, מה נחשב חקלאות מיטבית ומי מעבד את הקרקע. תשובות קצרות וישירות.",
  },
  contact: {
    path: "/contact",
    navLabel: "צור קשר",
    eyebrow: "שיחת ייעוץ ללא התחייבות",
    titleLines: ["בואו נדבר", "אנרגיה"],
    lede: home.contact.lede,
    image: images.agrivoltaicRows,
    metaTitle: "צור קשר",
    metaDescription: "קבעו שיחת ייעוץ ללא התחייבות עם בארי פתרונות אנרגיה. מיכאל 052-612-2550 · איתמר 052-473-4291.",
  },
} as const;

