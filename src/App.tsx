import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom"; 
import { useSeo } from "./hooks/useSeo";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import RouteAnalyticsTracker from "./components/RouteAnalyticsTracker";
import CookieConsentBanner from "./components/CookieConsentBanner";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/Hero/HeroSection";
import AboutUs from "./components/AboutUs/About";
import ExploreOptionsPage from "./components/Hero/Explore";
import Amenities from "./components/Anemities/Anemities";
import FAQ from "./components/Offers/Offers";
import CallToAction from "./components/Lettings/CallToAction";
import Lettings from "./components/Lettings/Lettings";
import Testimonials from "./components/Testimonials/Testimonials";
import ContactUs from "./components/ContactUs/Contact";
import FloatingButtons from "./components/FloatingButtons/FloatingButtons";
import ServicesPage from "./components/Services/Services";
import FurnishingPage from "./components/Management/Furnishing";
import Presentation from "./components/Management/Management";
import NewsAndAccomplishments from "./components/Team/Feed";
import TeamPage from "./components/Team/Team";
import PropertyDetails from "./components/Property/PropertyDetails";
import Loader from "./components/Loader/Loader";
import PropertyListingModal from "./components/Management/PropertyListingModal";


const backgroundImages: string[] = [
  "/assets/background.webp",
  "/assets/background2.webp",
  "/assets/background3.webp",
  "/assets/background4.webp",
];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const toggleForm = () => setShowForm((prev) => !prev);

  // Set Default SEO for the whole app
useSeo({
  title: "Luxury Holiday Homes Dubai",
  description: "Premium short-term rentals and property management in Dubai."
});
const OrganizationSchema = () => (
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Capital Stay UAE",
      "url": "https://capitalstayuae.com",
      "logo": "https://capitalstayuae.com/assets/logo.webp",
      "telephone": "+971547047913",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Abdullah Kamber Business Center, Deira",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "120"
      }
    })}
  </script>
);
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const tasks = backgroundImages.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve; // Continue even if an image fails
          });
        });

        // Fail-safe: Maximum 2.5 seconds loading time
        const timeout = new Promise((resolve) => setTimeout(resolve, 2500));
        await Promise.race([Promise.all(tasks), timeout]);
      } finally {
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="App">
      <RouteAnalyticsTracker />
      <CookieConsentBanner />
      
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar toggleForm={toggleForm} isScrolled={isScrolled} />
          <div className={`navbar-spacer ${isScrolled ? "scrolled" : ""}`} />
          <MainContent showForm={showForm} toggleForm={toggleForm} />
          <OrganizationSchema />
          <Footer toggleForm={toggleForm}/>

          <PropertyListingModal 
            isOpen={showForm} 
            onClose={() => setShowForm(false)} 
          />
        </>
      )}
    </div>
  );
};

// --- Sub-Component for Routing Logic ---
const MainContent: React.FC<{ showForm: boolean; toggleForm: () => void }> = ({ 
  showForm, 
  toggleForm 
}) => {
  const location = useLocation();

  // Scroll to top/anchors on route change
  useEffect(() => {
    const hash = location.hash.substring(1); 
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={
        <>
          <HeroSection />
          <div id="about-us"><AboutUs /></div>
          <ExploreOptionsPage />
          <div id="amenities"><Amenities /></div>
          <div id="faq"><FAQ /></div>
          <CallToAction showForm={showForm} toggleForm={toggleForm} />
          <div id="lettings"><Lettings /></div>
          <div id="testimonials"><Testimonials /></div>
          <div id="contact"><ContactUs /></div> 
          <FloatingButtons />
      
          
        </>
      } />

      <Route path="/services" element={<ServicesPage />} />  
      <Route path="/landlord-services/property-management" element={<Presentation toggleForm={toggleForm} />} />
      <Route path="/landlord-services/furnishing-solutions" element={<FurnishingPage/>} />
      <Route path="/news" element={<NewsAndAccomplishments />} />
      <Route path="/team" element={<TeamPage />} />
      
      {/* Dynamic Property Route */}
     <Route path="/:propertyKey" element={<PropertyDetails />} />
      
      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;