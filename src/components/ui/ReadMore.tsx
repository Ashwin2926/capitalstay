import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type ReadMoreProps = {
  children: ReactNode;
  /** Height of the collapsed preview on phones, in pixels. */
  collapsedHeight?: number;
  className?: string;
  /** Toggle colour; use "light" on dark backgrounds. */
  tone?: "dark" | "light";
};

/**
 * Collapses long text on phones with a soft fade and a "Read more" toggle.
 * From `md` up the full text always shows. The toggle only appears when the
 * text is actually taller than the preview.
 */
export default function ReadMore({ children, collapsedHeight = 132, className = "", tone = "dark" }: ReadMoreProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      if (!expanded) setOverflowing(el.scrollHeight > el.clientHeight + 2);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded]);

  const collapsed = !expanded;
  const showToggle = overflowing || expanded;

  return (
    <div className={className}>
      <div
        ref={ref}
        id={id}
        style={{ "--rm-h": `${collapsedHeight}px` } as CSSProperties}
        className={
          collapsed
            ? "max-md:max-h-[var(--rm-h)] max-md:overflow-hidden" +
              (overflowing ? " max-md:[mask-image:linear-gradient(to_bottom,black_55%,transparent)]" : "")
            : ""
        }
      >
        {children}
      </div>
      {showToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={id}
          className={`mt-2 inline-flex items-center gap-1.5 rounded py-1 text-xs font-semibold uppercase tracking-[0.14em] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            tone === "light" ? "text-white" : "text-blue-600"
          }`}
        >
          {expanded ? "Show less" : "Read more"}
          <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" className={`transition-transform ${expanded ? "rotate-180" : ""}`}>
            <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      )}
    </div>
  );
}
