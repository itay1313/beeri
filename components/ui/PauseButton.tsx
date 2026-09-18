"use client";
import { cn } from "@/lib/cn";

/** Small pause/play toggle for anything that moves on its own for more than five seconds (WCAG 2.2.2). */
export function PauseButton({ paused, onToggle, label, dark = false, className }: { paused: boolean; onToggle: () => void; label: string; dark?: boolean; className?: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={paused ? `הפעלת ${label}` : `עצירת ${label}`}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors",
        dark ? "border-line-dark text-limestone hover:border-limestone" : "border-line text-ink hover:border-ink",
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
        {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />}
      </svg>
    </button>
  );
}
