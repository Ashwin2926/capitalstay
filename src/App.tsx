import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; 
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
import PropertyListingModal from "./components/Management/PropertyListingModal";
import ScrollProgress from "./components/ui/ScrollProgress";
import { motion, useReducedMotion } from "framer-motion";

// Secondary pages load on demand so the home page ships less code
const ServicesPage = lazy(() => import("./components/Services/Services"));
const FurnishingPage = lazy(() => import("./components/Management/Furnishing"));
const Presentation = lazy(() => import("./components/Management/Management"));
const NewsAndAccomplishments = lazy(() => import("./components/Team/Feed"));
const TeamPage = lazy(() => import("./components/Team/Team"));
const NotFound = lazy(() => import("./components/NotFound"));
const PropertyDetails = lazy(() => import("./components/Property/PropertyDetails"));



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
      }
    })}
  </script>
);

const App: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const toggleForm = () => setShowForm((prev) => !prev);

  // Set Default SEO for the whole app
useSeo({
  title: "Luxury Holiday Homes Dubai",
  description: "Premium short-term rentals and property management in Dubai."
});

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="App">
      <RouteAnalyticsTracker />
      <CookieConsentBanner />
      
      <ScrollProgress />
      <Navbar toggleForm={toggleForm} isScrolled={isScrolled} />
      <div className={`navbar-spacer ${isScrolled ? "scrolled" : ""}`} />
      <main id="main-content">
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <MainContent showForm={showForm} toggleForm={toggleForm} />
        </Suspense>
      </main>
      <OrganizationSchema />
      <Footer toggleForm={toggleForm}/>

      <PropertyListingModal 
        isOpen={showForm} 
        onClose={() => setShowForm(false)} 
      />
    </div>
  );
};

// --- Sub-Component for Routing Logic ---
const MainContent: React.FC<{ showForm: boolean; toggleForm: () => void }> = ({ 
  showForm, 
  toggleForm 
}) => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

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
    <motion.div
      key={location.pathname}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </motion.div>
  );
};

export default App;