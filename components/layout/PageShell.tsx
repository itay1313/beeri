import { Header } from "./Header";
import { Footer } from "./Footer";

/** Header + main + footer. `sunrise={false}` for short utility pages (404, accessibility). */
export function PageShell({ children, sunrise = true }: { children: React.ReactNode; sunrise?: boolean }) {
  return (
    <>
      <Header />
      <main id="main" className="bg-limestone">{children}</main>
      <Footer sunrise={sunrise} />
    </>
  );
}
