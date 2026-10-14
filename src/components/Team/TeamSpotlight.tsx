import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReadMore from "../ui/ReadMore";

export type SpotlightMember = {
  name: string;
  role: string;
  description: string;
  image: string;
};

const DURATION = 6500;

/**
 * Phone layout for the team: one portrait at a time, story-style.
 * Progress segments fill and advance on their own while on screen; the arrows
 * at the top corners or a swipe move between people.
 */
export default function TeamSpotlight({ members }: { members: SpotlightMember[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);

  const go = (next: number) => {
    const n = members.length;
    setDirection(next > index || (index === n - 1 && next === 0) ? 1 : -1);
    setIndex(((next % n) + n) % n);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const autoplay = visible && !paused && !reduceMotion && members.length > 1;

  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % members.length);
    }, DURATION);
    return () => window.clearTimeout(t);
  }, [autoplay, index, members.length]);

  const member = members[index];

  return (
    <div ref={rootRef} aria-roledescription="carousel" aria-label="Our team">
      <article className="overflow-hidden rounded-[28px] bg-slate-950 text-white shadow-[0_30px_60px_-30px_rgba(2,6,23,0.7)]">
        {/* Portrait */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={member.name}
              src={member.image}
              alt={`${member.name} - ${member.role} at Capital Stay Dubai`}
              className="absolute inset-0 h-full w-full object-cover object-top"
              custom={direction}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 60, scale: 1.04 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              drag={reduceMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 50) {
                  go(index + (info.offset.x < 0 ? 1 : -1));
                  setPaused(true);
                }
              }}
            />
          </AnimatePresence>

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Story progress segments */}
          {members.length > 1 && (
            <div className="absolute inset-x-4 top-4 flex gap-1.5" aria-hidden="true">
              {members.map((m, i) => (
                <span key={m.name} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
                  <span
                    key={`${m.name}-${index}-${autoplay}`}
                    className="block h-full rounded-full bg-white"
                    style={{
                      width: i < index ? "100%" : i > index ? "0%" : autoplay ? undefined : "100%",
                      animation: i === index && autoplay ? `team-story ${DURATION}ms linear forwards` : undefined,
                    }}
                  />
                </span>
              ))}
            </div>
          )}

          {/* Navigation arrows at the top corners */}
          {members.length > 1 && (
            <div className="absolute inset-x-3 top-9 flex justify-between">
              {[
                { label: "Previous team member", step: -1, path: "M7.5 2L3.5 6l4 4" },
                { label: "Next team member", step: 1, path: "M4.5 2l4 4-4 4" },
              ].map(({ label, step, path }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={() => {
                    go(index + step);
                    setPaused(true);
                  }}
                  className="flex size-10 items-center justify-center rounded-full border border-white/25 bg-slate-950/35 text-white backdrop-blur-md transition active:scale-95 hover:bg-slate-950/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
                    <path d={path} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Name over the photo */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={member.name}
              className="pointer-events-none absolute inset-x-6 bottom-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200">{member.role}</p>
              <h3 className="mt-1 font-display text-[2.4rem] font-medium leading-none">{member.name}</h3>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bio */}
        <div className="px-6 pb-6 pt-2" aria-live="polite" onClickCapture={() => setPaused(true)}>
          <span aria-hidden="true" className="mb-4 block h-px w-10 bg-white/30" />
          <ReadMore key={member.name} collapsedHeight={110} tone="light">
            <p className="text-sm leading-relaxed text-white/80">
              {member.description}
            </p>
          </ReadMore>
        </div>
      </article>

      <style>{`@keyframes team-story { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}
