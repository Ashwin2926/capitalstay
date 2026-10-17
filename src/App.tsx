import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; 
import { Helmet } from "react-helmet-async";
import Seo from "./components/Seo";
import { SITE_URL, ORGANIZATION_ID } from "./components/lib/seo";
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



// Site-wide entity data for search engines and AI answer engines.
// Keep these facts identical to llms.txt and the Google Business Profile.
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LodgingBusiness",
      "@id": ORGANIZATION_ID,
      "name": "Capital Stay UAE",
      "alternateName": "Capital Stay",
      "url": `${SITE_URL}/`,
      "logo": `${SITE_URL}/assets/logo.webp`,
      "image": `${SITE_URL}/assets/og-image.jpg`,
      "description":
        "DTCM-licensed holiday home operator in Dubai offering luxury short-term rentals and full-service holiday home management for property owners.",
      "telephone": "+971547047913",
      "email": "hellodubai@capitalstayuae.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Abdullah Kamber Business Center, Deira",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 25.2697, "longitude": 55.333 },
      "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"].map((name) => ({
        "@type": "City",
        "name": name
      })),
      "knowsAbout": [
        "Luxury short-term rentals Dubai",
        "Holiday home management UAE",
        "Airbnb property management Dubai",
        "DTCM holiday home licensing",
        "Five-star guest experience"
      ],
      "sameAs": [
        "https://instagram.com/capitalstaydubai",
        "https://www.airbnb.ae/users/show/551099812"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+971547047913",
        "email": "hellodubai@capitalstayuae.com",
        "contactType": "customer service"
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": `${SITE_URL}/`,
      "name": "Capital Stay UAE",
      "publisher": { "@id": ORGANIZATION_ID },
      "inLanguage": "en"
    }
  ]
};

const App: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const toggleForm = () => setShowForm((prev) => !prev);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="App">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(siteSchema)}</script>
      </Helmet>
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
            <Seo
              title="Luxury Holiday Homes & Short-Term Rentals in Dubai | Capital Stay"
              description="Stay in premium DTCM-licensed holiday homes across Dubai Marina, Downtown, Business Bay and more. Top-tier amenities, seamless booking and 24/7 guest support."
              path="/"
            />
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