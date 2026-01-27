// RouteAnalyticsTracker.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const RouteAnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      // UPDATED TO YOUR NEW ID
      window.gtag("config", "G-BJLMEJQ88P", {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);  

  return null;  
};

export default RouteAnalyticsTracker;