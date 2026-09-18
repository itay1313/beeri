import { specSheet } from "@/content/spec";
import { PlotDrawing } from "./PlotDrawing";
import { CountUp } from "@/components/motion/CountUp";

/** תמ״א 1/24 numbers as a survey spec sheet, next to the plot drawing. */
export function PlotSpecSheet() {
  return (
    <div className="grid gap-10 md:grid-cols-[1fr_minmax(0,18rem)] md:gap-12">
      <dl className="grid sm:grid-cols-2 gap-x-10">
        {specSheet.map((s) => (
          <div key={s.label} className="border-t border-line py-5">
            <dt className="text-small text-ink-soft order-2">{s.label}</dt>
            <dd className="flex items-baseline gap-2 mb-1">
              <CountUp value={s.value} className="font-tzar text-[2.75rem] font-bold leading-none text-ink" />
              <span className="text-label text-amber-700">{s.unit}</span>
            </dd>
          </div>
        ))}
      </dl>
      <div aria-hidden="true" className="relative hidden md:block aspect-[3/4]">
        <PlotDrawing dark={false} id="spec-plot" />
        <span className="absolute top-[1%] left-[8%] text-label text-amber-700">אגרו־וולטאי</span>
        <span className="absolute bottom-[2%] left-[42%] text-label text-amber-700">חיץ</span>
        <span className="absolute top-[55%] left-[57%] text-label text-ink-soft">מגורים</span>
      </div>
    </div>
  );
}
