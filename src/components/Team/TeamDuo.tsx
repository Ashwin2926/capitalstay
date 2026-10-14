import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SpotlightMember } from "./TeamSpotlight";

/** Phone layout: both portraits side by side; tapping one opens a profile sheet. */
export default function TeamDuo({ members }: { members: SpotlightMember[] }) {
  const [open, setOpen] = useState<SpotlightMember | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {members.map((m, i) => (
          <motion.button
            key={m.name}
            type="button"
            onClick={() => setOpen(m)}
            className={`group text-left ${i % 2 === 1 ? "mt-10" : ""}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            aria-haspopup="dialog"
          >
            <div className="relative aspect-[3/4.4] overflow-hidden rounded-t-full rounded-b-2xl bg-slate-200 shadow-[0_24px_40px_-24px_rgba(15,23,42,0.6)]">
              <img src={m.image} alt="" className="h-full w-full object-cover object-top transition-transform duration-700 group-active:scale-[1.03]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" /></svg>
              </span>
            </div>
            <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-700">{m.role}</p>
            <h3 className="mt-1 font-display text-2xl font-medium leading-none text-slate-900">{m.name.split(" ")[0]}</h3>
            <span className="sr-only">Open profile</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[1300] flex items-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Close profile" className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setOpen(null)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${open.name}, ${open.role}`}
              className="relative max-h-[88vh] w-full overflow-y-auto rounded-t-[28px] bg-white pb-[max(1.5rem,env(safe-area-inset-bottom))]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => info.offset.y > 120 && setOpen(null)}
            >
              <span aria-hidden="true" className="mx-auto mt-3 block h-1 w-10 rounded-full bg-slate-300" />
              <div className="flex items-center gap-4 px-6 pt-5">
                <img src={open.image} alt="" className="size-20 rounded-t-full rounded-b-xl object-cover object-top" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700">{open.role}</p>
                  <h3 className="mt-1 font-display text-3xl font-medium leading-none text-slate-900">{open.name}</h3>
                </div>
              </div>
              <p className="px-6 pt-5 text-[15px] leading-relaxed text-slate-600">{open.description}</p>
              <div className="px-6 pt-6">
                <button type="button" onClick={() => setOpen(null)} className="w-full rounded-full bg-slate-900 py-3.5 text-sm font-semibold text-white">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
