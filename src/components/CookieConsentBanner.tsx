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
    <div style={styles.banner as React.CSSProperties}>
      <p style={styles.text as React.CSSProperties}>
        We use cookies to enhance your experience. By clicking "Accept", you agree to our use of cookies for analytics.
      </p>
      <div style={{ display: 'flex' }}>
        <button style={styles.button as React.CSSProperties} onClick={handleAccept}>Accept</button>
        <button style={styles.buttonDecline as React.CSSProperties} onClick={handleDecline}>Decline</button>
      </div>
    </div>
  );
};

// Typed Styles object
const styles: Record<string, React.CSSProperties> = {
  banner: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#222',
    color: 'white',
    padding: '15px 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    margin: 0,
    marginRight: '20px',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '0 5px',
    fontWeight: 'bold',
  },
  buttonDecline: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '0 5px',
    fontWeight: 'bold',
  }
};

export default CookieConsentBanner;