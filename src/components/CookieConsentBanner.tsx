import React, { useState, useEffect } from 'react';

// 1. Extend the Global Window interface correctly for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gaInitialized?: boolean;
    gtag: (...args: any[]) => void;
  }
}

// This function will initialize Google Analytics
const initializeGA = (): void => {
  // Use your ID directly if not using .env
  const measurementId = "G-BJLMEJQ88P"; 
  
  window.dataLayer = window.dataLayer || [];
  const gtag = function(...args: any[]) { 
    window.dataLayer.push(args); 
  };
  
  gtag('js', new Date());
  gtag('config', measurementId);
  
  window.gaInitialized = true;
};

// --- Typed Helper Functions to manage cookies ---
const setCookie = (name: string, value: string, days: number): void => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
// ------------------------------------------

const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    const consent = getCookie('cookie_consent');
    if (consent === 'granted') {
      initializeGA();
    } else if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = (): void => {
    setCookie('cookie_consent', 'granted', 365);
    setShowBanner(false);
    initializeGA();
  };

  const handleDecline = (): void => {
    setCookie('cookie_consent', 'denied', 365);
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[1150] mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/95 p-4 text-white shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:px-6"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <p className="m-0 text-[13px] leading-snug text-white/85 sm:flex-1">
        We use cookies for analytics to improve your experience.
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={handleDecline}
          className="flex-1 rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex-none"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="flex-1 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:flex-none"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
