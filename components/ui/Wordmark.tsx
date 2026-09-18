import { cn } from "@/lib/cn";

/** Edge-to-edge brand line, clipped at the bottom. The one loud typographic moment on the page. */
export function Wordmark({ text = "BE'ERI", className }: { text?: string; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("overflow-hidden select-none", className)}>
      <div className="ltr font-tzar font-bold leading-[0.78] text-[clamp(5rem,19.5vw,18rem)] tracking-[-0.02em] text-limestone translate-y-[14%] whitespace-nowrap text-center">
        {text}
      </div>
    </div>
  );
}
