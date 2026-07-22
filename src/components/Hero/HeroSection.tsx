import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

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
  const [location, setLocation] = useState('Any location');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [activeFilter, setActiveFilter] = useState('Hotels');

  const HOSTAWAY_BASE_URL = 'https://booking.capitalstayuae.com/search';
  const getTodayString = () => new Date().toISOString().split('T')[0];

  const isDateInvalid = checkIn && checkOut && new Date(checkOut) <= new Date(checkIn);
  const isSearchDisabled = !checkIn || !checkOut || isDateInvalid;

  // 1. PRELOAD IMAGES: Prevents flickering by caching images ahead of time
  useEffect(() => {
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isSearchDisabled) return;
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
          background: white;
          border-radius: 18px;
          padding: 1.25rem;
          box-shadow: 0 30px 60px -20px rgba(15, 23, 42, 0.35);
          border: 1px solid rgba(15, 23, 42, 0.04);
          width: 100%;
        }

        .label-text {
          display: block;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.6rem 0.85rem;
          display: flex;
          align-items: center;
          min-height: 44px;
          transition: all 0.2s ease;
        }
 
        .input-wrapper input[type="date"] {
          appearance: none;
          min-width: 100%;
          background: transparent;
        }

        .input-wrapper:focus-within {
          border-color: #2563eb;
          background: white;
          outline: 2px solid rgba(37, 99, 235, 0.2);
        }

        .input-wrapper.error-state { 
          border-color: #ef4444; 
          background: #fef2f2; 
        }

        .input-wrapper input {
          border: none;
          background: transparent;
          width: 100%;
          margin-left: 0.6rem;
          outline: none;
          color: #0f172a;
          font-size: 0.9rem;
          font-family: inherit;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.8rem;
          margin-top: 6px;
          font-weight: 600;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .date-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        @media (min-width: 640px) {
          .date-row { grid-template-columns: 1fr 1fr; }
        }

        @media (min-width: 1024px) {
          .form-grid { grid-template-columns: 1fr 1.4fr 0.7fr; }
          .booking-card { padding: 1.75rem; }
        }

        .filter-section {
          margin-top: 1.1rem;
          padding-top: 1.1rem;
          border-top: 1px solid #f1f5f9;
        }

        .filter-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 1.1rem;
        }

        .pill {
          padding: 0.5rem 1.1rem;
          border-radius: 100px;
          border: 1.5px solid #e2e8f0;
          background: white;
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pill.active { 
          background: #2563eb; 
          color: white; 
          border-color: #2563eb; 
        }

        .search-btn {
          background: #1e293b;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 0.85rem;
          width: 100%;
          font-weight: 600;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .search-btn:hover:not(:disabled) {
          background: #0f172a;
          transform: translateY(-1px);
        }

        .search-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }

        @media (min-width: 768px) {
          .search-btn { width: auto; padding: 0.85rem 2.5rem; border-radius: 100px; }
          .filter-section { display: flex; align-items: center; justify-content: space-between; }
          .filter-row { margin-bottom: 0; }
        }

        .location-popover {
          position: absolute;
          top: 105%;
          left: 0;
          right: 0;
          background: white;
          z-index: 100;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }

        .location-item {
          padding: 14px 18px;
          cursor: pointer;
          transition: background 0.2s;
          font-weight: 500;
          color: #475569;
        }
        .location-item:hover { background: #f1f5f9; color: #2563eb; }
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
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
          <form onSubmit={handleSearch}>
            <div className="form-grid">
              <div style={{ position: 'relative' }}>
                <label htmlFor="loc-input" className="label-text">Location</label>
                <div 
                  className="input-wrapper" 
                  onClick={() => setIsLocationOpen(!isLocationOpen)} 
                  style={{cursor: 'pointer'}}
                >
                  <IconLocation style={{ color: '#ef4444' }} aria-hidden="true" />
                  <input 
                    id="loc-input"
                    type="text" 
                    readOnly 
                    value={location} 
                    aria-haspopup="listbox"
                    aria-expanded={isLocationOpen}
                    placeholder="Where are you going?"
                  />
                </div>
                {isLocationOpen && (
                  <div className="location-popover" role="listbox">
                    <div className="location-item highlight" onClick={() => { setLocation('Any location'); setIsLocationOpen(false); }}>
                      Any location
                    </div>
                    {dubaiLocations.map(loc => (
                      <div key={loc} className="location-item" onClick={() => { setLocation(loc); setIsLocationOpen(false); }}>
                        {loc}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="check-in" className="label-text">Check-in & Check-out</label>
                <div className="date-row">
                  <div className={`input-wrapper ${isDateInvalid ? 'error-state' : ''}`}>
                    <input 
                      id="check-in"
                      type="date" 
                      min={getTodayString()} 
                      value={checkIn} 
                      onChange={(e) => setCheckIn(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className={`input-wrapper ${isDateInvalid ? 'error-state' : ''}`}>
                    <input 
                      id="check-out"
                      aria-label="Check-out date"
                      type="date" 
                      min={checkIn || getTodayString()} 
                      value={checkOut} 
                      onChange={(e) => setCheckOut(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                {isDateInvalid && <div className="error-message">Check-out must be after check-in date.</div>}
              </div>

              <div>
                <label htmlFor="guest-count" className="label-text">Guests</label>
                <div className="input-wrapper">
                  <IconUsers style={{ color: '#2563eb' }} aria-hidden="true" />
                  <input 
                    id="guest-count"
                    type="number" 
                    min="1" 
                    value={guests} 
                    onChange={(e) => setGuests(Number(e.target.value))} 
                  />
                </div>
              </div>
            </div>

            <div className="filter-section">
              <div className="filter-row" role="group" aria-label="Property type filters">
                {['Hotels', 'Villas', 'Apartments'].map(type => (
                  <button 
                    key={type} 
                    type="button" 
                    className={`pill ${activeFilter === type ? 'active' : ''}`} 
                    onClick={() => setActiveFilter(type)}
                    aria-pressed={activeFilter === type}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <button 
                type="submit" 
                className="search-btn" 
                // 3. BOOLEAN CASTING: Fixed the TypeScript error
                disabled={!!isSearchDisabled} 
              >
                <span>Search Properties</span> 
                <IconSearch aria-hidden="true" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
    </>
  );
}