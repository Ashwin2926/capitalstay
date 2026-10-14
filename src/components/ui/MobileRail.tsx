import { Children, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type MobileRailProps = {
  children: ReactNode;
  /** Accessible name for the scrollable region, e.g. "Key destinations". */
  label: string;
  /** Desktop layout classes applied from `md` up, e.g. "md:grid-cols-3 md:gap-6". */
  desktopClassName?: string;
  /** Width of each slide on phones. Leaves a peek of the next card. */
  slideClassName?: string;
  /** Extra classes for an individual slide, e.g. desktop grid spans. */
  getSlideClassName?: (index: number) => string;
  /** Use on dark backgrounds so the progress indicator stays visible. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * App-style horizontal rail on phones (snap scrolling, peek of the next card,
 * slim progress line and counter); a regular grid from `md` up.
 */
export default function MobileRail({
  children,
  label,
  desktopClassName = "md:grid-cols-3 md:gap-6",
  slideClassName = "w-[80%] sm:w-[46%]",
  getSlideClassName,
  tone = "light",
  className = "",
}: MobileRailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    setProgress(ratio);
    setActive(Math.round(ratio * (items.length - 1)));
  }, [items.length]);

  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const dark = tone === "dark";
  const thumbWidth = items.length > 0 ? 100 / items.length : 100;

  return (
    <div className={className}>
      <div
        ref={trackRef}
        onScroll={update}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        className={`no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-1 md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0 focus-visible:outline-none ${desktopClassName}`}
      >
        {items.map((child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className={`shrink-0 snap-start ${slideClassName} md:w-auto [&>*]:h-full ${getSlideClassName?.(i) ?? ""}`}
          >
            {child}
          </div>
        ))}
        {/* Trailing spacer so the last card can snap fully into view */}
        <div aria-hidden="true" className="w-1 shrink-0 md:hidden" />
      </div>

      {items.length > 1 && (
        <div className="mt-5 flex items-center gap-4 md:hidden" aria-hidden="true">
          <span
            className={`font-display text-sm tabular-nums tracking-[0.2em] ${dark ? "text-white/80" : "text-slate-700"}`}
          >
            {String(active + 1).padStart(2, "0")}
            <span className={dark ? "text-white/60" : "text-slate-600"}>
              {" / "}
              {String(items.length).padStart(2, "0")}
            </span>
          </span>
          <div className={`relative h-px flex-1 ${dark ? "bg-white/20" : "bg-slate-200"}`}>
            <div
              className={`absolute inset-y-[-0.5px] rounded-full transition-[left] duration-150 ${dark ? "bg-white" : "bg-blue-600"}`}
              style={{ width: `${thumbWidth}%`, left: `${progress * (100 - thumbWidth)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
