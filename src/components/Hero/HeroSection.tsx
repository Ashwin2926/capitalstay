import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const noopSubscribe = () => () => {};

// --- Premium Icons (Optimized with aria-hidden) ---
interface IconProps {
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const IconLocation = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} style={{ width: '1.2rem', height: '1.2rem', ...props.style }}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconUsers = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} style={{ width: '1.2rem', height: '1.2rem', ...props.style }}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);  

const IconSearch = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} style={{ width: '1.2rem', height: '1.2rem', ...props.style }}>
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const backgroundImages = [
  "/assets/background2.webp",
  "/assets/background.webp",
  "/assets/background3.webp",
  "/assets/background4.webp"
];

const dubaiLocations = ["Dubai", "Fujairah", "Ras Al-Khaimah", "Sharjah"];

export default function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const reduceMotion = useReducedMotion();
  const [location, setLocation] = useState('Any location');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const locationRef = useRef<HTMLDivElement>(null);
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const HOSTAWAY_BASE_URL = 'https://booking.capitalstayuae.com/search';
  // Empty in the prerendered HTML (a build-time date would go stale); filled in once hydrated
  const today = useSyncExternalStore(noopSubscribe, () => new Date().toISOString().split('T')[0], () => '');
  const getTodayString = () => today;

  const isDateInvalid = checkIn && checkOut && new Date(checkOut) <= new Date(checkIn);
  const nights = checkIn && checkOut && !isDateInvalid
    ? Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
    : 0;

  const formatDate = (value: string) =>
    value
      ? new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
      : '';

  const openPicker = (input: HTMLInputElement | null) => {
    if (!input) return;
    input.focus();
    try { input.showPicker?.(); } catch { /* older browsers open on focus/tap */ }
  };

  // Close the location menu on outside click or Escape
  useEffect(() => {
    if (!isLocationOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) setIsLocationOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsLocationOpen(false); };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [isLocationOpen]);

  // Fetch the other slides only after the page has finished loading,
  // so they never compete with the first paint.
  useEffect(() => {
    const preloadRest = () => {
      backgroundImages.slice(1).forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };
    if (document.readyState === 'complete') {
      const t = window.setTimeout(preloadRest, 1500);
      return () => window.clearTimeout(t);
    }
    window.addEventListener('load', preloadRest, { once: true });
    return () => window.removeEventListener('load', preloadRest);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!checkIn) return openPicker(checkInRef.current);
    if (!checkOut) return openPicker(checkOutRef.current);
    if (isDateInvalid) return;
    let url: string = `${HOSTAWAY_BASE_URL}?start=${checkIn}&end=${checkOut}&numberOfGuests=${guests}`;
    if (location !== 'Any location') url += `&city=${encodeURIComponent(location)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .hero-root {
          position: relative;
          min-height: 68vh;
          width: 100%;
          background: #000;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 88px 1.25rem 0 1.25rem;
        }

        .bg-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .bg-slide { 
          position: absolute; 
          inset: 0; 
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center; 
          z-index: 0;
          will-change: opacity;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.8) 100%);
          z-index: 1;
        }

        .content-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 56px;
        }

        @media (min-width: 768px) {
          .content-container { padding-bottom: 0; margin-bottom: -72px; }
        }

        .eyebrow {
          color: rgba(255,255,255,0.85);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .eyebrow::before {
          content: "";
          width: 28px;
          height: 1px;
          background: rgba(255,255,255,0.6);
          display: inline-block;
        }

        .main-headline {
          color: white;
          font-family: var(--font-display, "Cormorant Garamond", serif);
          font-size: clamp(2.4rem, 6vw, 3.75rem);
          font-weight: 400;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.35);
          max-width: 680px;
          letter-spacing: -0.01em;
        }

        .main-headline em {
          font-style: italic;
          font-weight: 400;
        }

        .booking-card {
          width: 100%;
          background: rgba(255, 255, 255, 0.97);
          border-radius: 24px;
          padding: 14px;
          box-shadow: 0 40px 80px -30px rgba(2, 6, 23, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.4) inset;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        @media (min-width: 1024px) {
          .booking-card { padding: 10px; border-radius: 999px; }
        }
        /* Native date input sits invisibly over the styled field */
        .date-native {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        .date-native::-webkit-calendar-picker-indicator {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      `}} />

    <section className="hero-root">
      <div className="bg-layer">
        {/* 2. REMOVED mode='wait' to allow simultaneous cross-fade overlap */}
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIdx}
            src={backgroundImages[currentIdx]}
            alt="Dubai Luxury Accommodation"
            fetchPriority="high" 
            className="bg-slide"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.5, ease: "easeInOut" }, scale: { duration: 7.5, ease: "linear" } }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </AnimatePresence>
        <div className="vignette" />
      </div>

      <motion.div
        className="hidden md:flex items-center gap-3 absolute top-24 right-6 z-20 bg-slate-900/60 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-3 text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 } }}
      >
        <ShieldCheck size={20} className="text-blue-400" />
        <div className="text-left leading-tight">
          <p className="text-[0.7rem] font-semibold uppercase tracking-wider">DTCM Licensed</p>
          <p className="text-[0.65rem] text-white/60">Fully compliant operator</p>
        </div>
      </motion.div>

      <div className="content-container">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Capital Stay — Dubai Holiday Homes
        </motion.p>

        <motion.h1
          className="main-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Discover your <em>dream home</em> in Dubai
        </motion.h1>

        <motion.div 
          className="booking-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSearch} aria-label="Search stays">
            <div className="grid grid-cols-2 gap-2 lg:flex lg:items-center lg:gap-0">
              {/* WHERE */}
              <div ref={locationRef} className="relative col-span-2 lg:flex-[1.25]">
                <button
                  type="button"
                  onClick={() => setIsLocationOpen(o => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={isLocationOpen}
                  className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-left transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:rounded-full lg:border-0 lg:bg-transparent lg:py-2.5 lg:pl-6 lg:hover:bg-slate-100"
                >
                  <IconLocation style={{ color: '#2563eb' }} aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Where</span>
                    <span className={`block truncate text-[15px] font-medium ${location === 'Any location' ? 'text-slate-500' : 'text-slate-900'}`}>
                      {location === 'Any location' ? 'Any destination' : location}
                    </span>
                  </span>
                </button>
                {isLocationOpen && (
                  <ul role="listbox" aria-label="Destination" className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl lg:min-w-[260px]">
                    {['Any location', ...dubaiLocations].map(loc => (
                      <li key={loc} role="option" aria-selected={location === loc}>
                        <button
                          type="button"
                          onClick={() => { setLocation(loc); setIsLocationOpen(false); }}
                          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition hover:bg-slate-50 ${location === loc ? 'text-blue-600' : 'text-slate-700'}`}
                        >
                          {loc === 'Any location' ? 'Any destination' : loc}
                          {location === loc && <span aria-hidden="true">✓</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <span aria-hidden="true" className="hidden h-8 w-px bg-slate-200 lg:block" />

              {/* CHECK-IN */}
              <div className={`relative rounded-2xl border px-4 py-3 transition focus-within:ring-2 focus-within:ring-blue-500 lg:flex-1 lg:rounded-full lg:border-0 lg:py-2.5 lg:pl-6 lg:hover:bg-slate-100 ${isDateInvalid ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50/70 hover:bg-white lg:bg-transparent'}`}>
                <label htmlFor="check-in" className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Check-in</label>
                <span className={`block truncate text-[15px] font-medium ${checkIn ? 'text-slate-900' : 'text-slate-500'}`}>{formatDate(checkIn) || 'Add date'}</span>
                <input
                  ref={checkInRef}
                  id="check-in"
                  type="date"
                  className="date-native"
                  min={getTodayString()}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  onClick={(e) => openPicker(e.currentTarget)}
                />
              </div>

              <span aria-hidden="true" className="hidden h-8 w-px bg-slate-200 lg:block" />

              {/* CHECK-OUT */}
              <div className={`relative rounded-2xl border px-4 py-3 transition focus-within:ring-2 focus-within:ring-blue-500 lg:flex-1 lg:rounded-full lg:border-0 lg:py-2.5 lg:pl-6 lg:hover:bg-slate-100 ${isDateInvalid ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50/70 hover:bg-white lg:bg-transparent'}`}>
                <label htmlFor="check-out" className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Check-out{nights > 0 && <span className="normal-case tracking-normal text-blue-600"> · {nights} night{nights > 1 ? 's' : ''}</span>}
                </label>
                <span className={`block truncate text-[15px] font-medium ${checkOut ? 'text-slate-900' : 'text-slate-500'}`}>{formatDate(checkOut) || 'Add date'}</span>
                <input
                  ref={checkOutRef}
                  id="check-out"
                  type="date"
                  className="date-native"
                  min={checkIn || getTodayString()}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  onClick={(e) => openPicker(e.currentTarget)}
                />
              </div>

              <span aria-hidden="true" className="hidden h-8 w-px bg-slate-200 lg:block" />

              {/* GUESTS */}
              <div className="col-span-2 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 lg:flex-[0.9] lg:rounded-full lg:border-0 lg:bg-transparent lg:pl-6 lg:pr-3">
                <div className="flex items-center gap-3">
                  <IconUsers style={{ color: '#2563eb' }} aria-hidden="true" className="lg:hidden" />
                  <div>
                    <span id="guest-label" className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Guests</span>
                    <span className="block text-[15px] font-medium text-slate-900" aria-live="polite">
                      {guests} guest{guests > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5" role="group" aria-labelledby="guest-label">
                  <button
                    type="button"
                    onClick={() => setGuests(g => Math.max(1, g - 1))}
                    disabled={guests <= 1}
                    aria-label="Remove a guest"
                    className="flex size-9 items-center justify-center rounded-full border border-slate-300 text-lg leading-none text-slate-700 transition hover:border-slate-900 disabled:opacity-30 lg:size-8"
                  >−</button>
                  <button
                    type="button"
                    onClick={() => setGuests(g => Math.min(16, g + 1))}
                    disabled={guests >= 16}
                    aria-label="Add a guest"
                    className="flex size-9 items-center justify-center rounded-full border border-slate-300 text-lg leading-none text-slate-700 transition hover:border-slate-900 disabled:opacity-30 lg:size-8"
                  >+</button>
                </div>
              </div>

              {/* SEARCH */}
              <button
                type="submit"
                disabled={!!isDateInvalid}
                className="col-span-2 mt-1 flex h-14 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900 px-7 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-slate-900/25 transition hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 lg:mt-0 lg:ml-2 lg:h-14 lg:rounded-full"
              >
                <IconSearch aria-hidden="true" />
                <span>Search</span>
              </button>
            </div>

            {isDateInvalid && (
              <p role="alert" className="mt-2 px-2 text-xs font-semibold text-red-600 lg:px-6">Check-out must be after check-in.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
    </>
  );
}