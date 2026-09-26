import { home } from "@/content/home";
import { NahalaSection } from "@/components/visuals/NahalaSection";

/** Roof, ground dunam and agro field at one scale: the drawn cross-section. */
export function NahalaScale() {
  const s = home.land.page.scale;
  return (
    <figure>
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <NahalaSection className="block h-auto w-full min-w-[760px]" />
      </div>
      <figcaption className="mt-4 max-w-[70ch] text-small text-ink-soft">{s.caption}</figcaption>
    </figure>
  );
}
