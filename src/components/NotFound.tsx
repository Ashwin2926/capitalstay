import { Link } from "react-router-dom";
import Seo from "./Seo";
import { motion } from "framer-motion";
import { COMPLETE_PROPERTY_DATA } from "./lib/locations";

const popularAreas = Object.keys(COMPLETE_PROPERTY_DATA).slice(0, 8);

const toLabel = (key: string) => key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 pb-24 pt-32 text-white md:pt-40">
      <Seo
        title="Page not found | Capital Stay"
        description="This page doesn't exist. Explore Capital Stay's luxury holiday homes across Dubai."
        noindex
      />

      {/* Soft ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[140px]" />

      <motion.div
        className="relative mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-display text-7xl font-medium italic text-white/20 md:text-8xl">404</p>
        <h1 className="mt-2 font-display text-4xl font-medium leading-tight md:text-5xl">
          This page has checked out
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/75">
          The address may have changed or never existed. Head home, or explore one of our most-booked neighbourhoods.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Back to home
          </Link>
          <a
            href="https://booking.capitalstayuae.com"
            className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Browse available stays
          </a>
        </div>

        <nav aria-label="Popular neighbourhoods" className="mt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Popular neighbourhoods</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {popularAreas.map((key) => (
              <li key={key}>
                <Link
                  to={`/luxury-apartments-in-${key}`}
                  className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-white/40 hover:text-white"
                >
                  {toLabel(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </section>
  );
}
