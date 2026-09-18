import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" data-tone="light" className="container-page min-h-[70svh] flex flex-col justify-center py-40">
        <span className="font-tzar text-[6rem] font-bold leading-none text-amber-700">404</span>
        <h1 className="text-h2 mt-4">העמוד לא נמצא</h1>
        <p className="mt-4 text-ink-soft">האתר הוא עמוד אחד. כל מה שחיפשתם נמצא בדף הבית.</p>
        <Link href="/" className="mt-8 inline-flex font-medium underline decoration-amber-500 underline-offset-[6px]">חזרה לדף הבית</Link>
      </main>
      <Footer />
    </>
  );
}
