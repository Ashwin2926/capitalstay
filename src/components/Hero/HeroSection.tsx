import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Premium Icons ---
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

  // --- Date Validation Logic ---
  const isDateInvalid = checkIn && checkOut && new Date(checkOut) <= new Date(checkIn);
  const isSearchDisabled = !checkIn || !checkOut || isDateInvalid;

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
          min-height: 100vh;
          width: 100%;
          background: #000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 100px 1.25rem 60px 1.25rem;
          overflow: hidden;
        }

        /* BACKGROUND FIX: contained within section */
        .bg-layer { 
          position: absolute; 
          inset: 0; 
          z-index: 0; 
          pointer-events: none;
        }

        .bg-slide { 
          position: absolute; 
          inset: 0; 
          background-size: cover; 
          background-position: center; 
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
          z-index: 1;
        }

        .content-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .main-headline {
          color: white;
          font-size: clamp(2.2rem, 8vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 2rem;
          text-shadow: 0 4px 15px rgba(0,0,0,0.4);
          max-width: 800px;
        }

        .booking-card {
          background: white;
          border-radius: 28px;
          padding: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          width: 100%;
        }

        .label-text {
          display: block;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.6rem;
        }

        .input-wrapper {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          min-height: 54px;
          transition: all 0.2s ease;
        }

        .input-wrapper:focus-within {
          border-color: #2563eb;
          background: white;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .input-wrapper.error-state { 
          border-color: #ef4444; 
          background: #fef2f2; 
        }

        .input-wrapper input {
          border: none;
          background: transparent;
          width: 100%;
          margin-left: 0.75rem;
          outline: none;
          color: #0f172a;
          font-size: 1rem;
          font-family: inherit;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.8rem;
          margin-top: 6px;
          font-weight: 600;
        }

        /* Responsive Form Layout */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .date-row {
          display: grid;
          grid-template-columns: 1fr; /* Stacked by default for mobile */
          gap: 12px;
        }

        @media (min-width: 640px) {
          .date-row { grid-template-columns: 1fr 1fr; } /* Side-by-side for tablets+ */
        }

        @media (min-width: 1024px) {
          .form-grid { grid-template-columns: 1fr 1.4fr 0.7fr; } /* Desktop layout */
          .booking-card { padding: 2.5rem; }
        }

        .filter-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f1f5f9;
        }

        .filter-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .pill {
          padding: 0.6rem 1.25rem;
          border-radius: 100px;
          border: 1.5px solid #e2e8f0;
          background: white;
          font-size: 0.85rem;
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
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 16px;
          padding: 1.1rem;
          width: 100%;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .search-btn:hover:not(:disabled) {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .search-btn:disabled { 
          background: #cbd5e1; 
          cursor: not-allowed; 
        }

        @media (min-width: 768px) {
          .search-btn { width: auto; padding: 1rem 3.5rem; border-radius: 100px; }
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
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIdx}
              className="bg-slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{ backgroundImage: `url(${backgroundImages[currentIdx]})` }}
            />
          </AnimatePresence>
          <div className="vignette" />
        </div>

        <div className="content-container">
          <motion.h1 
            className="main-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Discover Your Dream Home in Dubai
          </motion.h1>

          <motion.div 
            className="booking-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSearch}>
              <div className="form-grid">
                {/* Location Selection */}
                <div style={{ position: 'relative' }}>
                  <label className="label-text">Location</label>
                  <div className="input-wrapper" onClick={() => setIsLocationOpen(!isLocationOpen)} style={{cursor: 'pointer'}}>
                    <IconLocation style={{ color: '#ef4444' }} />
                    <input type="text" readOnly value={location} />
                  </div>
                  {isLocationOpen && (
                    <div className="location-popover">
                      <div className="location-item" style={{ fontWeight: '800', borderBottom: '1px solid #f1f5f9' }} onClick={() => { setLocation('Any location'); setIsLocationOpen(false); }}>
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

                {/* Date Selection */}
                <div>
                  <label className="label-text">Check-in & Check-out</label>
                  <div className="date-row">
                    <div className={`input-wrapper ${isDateInvalid ? 'error-state' : ''}`}>
                      <input type="date" min={getTodayString()} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
                    </div>
                    <div className={`input-wrapper ${isDateInvalid ? 'error-state' : ''}`}>
                      <input type="date" min={checkIn || getTodayString()} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
                    </div>
                  </div>
                  {isDateInvalid && <div className="error-message">Check-out must be after check-in date.</div>}
                </div>

                {/* Guest Selection */}
                <div>
                  <label className="label-text">Guests</label>
                  <div className="input-wrapper">
                    <IconUsers style={{ color: '#2563eb' }} />
                    <input type="number" min="1" value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <div className="filter-row">
                  {['Hotels', 'Villas', 'Apartments'].map(type => (
                    <button key={type} type="button" className={`pill ${activeFilter === type ? 'active' : ''}`} onClick={() => setActiveFilter(type)}>
                      {type}
                    </button>
                  ))}
                </div>

                <button type="submit" className="search-btn" disabled={isSearchDisabled || false}>
                  <span>Search Properties</span> <IconSearch />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}