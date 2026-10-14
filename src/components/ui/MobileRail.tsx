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
  /** Milliseconds between automatic advances while the rail is on screen. */
  autoplayInterval?: number;
  className?: string;
};

const PAUSE_AFTER_INTERACTION = 8000;

/**
 * App-style horizontal rail on phones (snap scrolling, peek of the next card,
 * slim progress line) that glides to the next card on its own while it is on
 * screen; a regular grid from `md` up.
 */
export default function MobileRail({
  children,
  label,
  desktopClassName = "md:grid-cols-3 md:gap-6",
  slideClassName = "w-[80%] sm:w-[46%]",
  getSlideClassName,
  tone = "light",
  autoplayInterval = 4200,
  className = "",
}: MobileRailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const pausedUntilRef = useRef(0);
  const items = Children.toArray(children);
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  const pause = useCallback(() => {
    pausedUntilRef.current = Date.now() + PAUSE_AFTER_INTERACTION;
  }, []);

  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  // Track whether the rail is on screen
  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance while visible, scrollable (phones) and not recently touched
  useEffect(() => {
    if (items.length < 2) return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el || !visibleRef.current || document.hidden) return;
      if (Date.now() < pausedUntilRef.current) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max < 4) return; // grid layout on larger screens

      const slides = Array.from(el.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement && child.dataset.slide === "true",
      );
      if (slides.length < 2) return;

      const gutter = slides[0].offsetLeft;
      const current = slides.reduce(
        (best, slide, i) =>
          Math.abs(slide.offsetLeft - gutter - el.scrollLeft) <
          Math.abs(slides[best].offsetLeft - gutter - el.scrollLeft)
            ? i
            : best,
        0,
      );
      const atEnd = el.scrollLeft >= max - 4;
      const next = atEnd ? 0 : Math.min(current + 1, slides.length - 1);
      el.scrollTo({ left: Math.min(slides[next].offsetLeft - gutter, max), behavior: "smooth" });
    }, autoplayInterval);

    return () => window.clearInterval(id);
  }, [items.length, autoplayInterval]);

  const dark = tone === "dark";
  const thumbWidth = items.length > 0 ? 100 / items.length : 100;

  return (
    <div className={className}>
      <div
        ref={trackRef}
        onScroll={update}
        onPointerDown={pause}
        onTouchStart={pause}
        onWheel={pause}
        onKeyDown={pause}
        onFocus={pause}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        className={`no-scrollbar relative -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-1 md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0 focus-visible:outline-none ${desktopClassName}`}
      >
        {items.map((child, i) => (
          <div
            key={i}
            data-slide="true"
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
        <div className="mx-auto mt-5 w-24 md:hidden" aria-hidden="true">
          <div className={`relative h-[2px] rounded-full ${dark ? "bg-white/20" : "bg-slate-200"}`}>
            <div
              className={`absolute inset-y-0 rounded-full transition-[left] duration-200 ${dark ? "bg-white" : "bg-blue-600"}`}
              style={{ width: `${thumbWidth}%`, left: `${progress * (100 - thumbWidth)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
