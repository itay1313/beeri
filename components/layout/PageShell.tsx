import { Header } from "./Header";
import { Footer } from "./Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <Header />
      <main id="main" className="bg-limestone">{children}</main>
      <Footer />
    </MotionProvider>
  );
}
