 
   
     
 import React, { useState, useCallback, useEffect } from 'react';
import { ChevronDown, Plane, Car, Home, Utensils, Sailboat } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Seo from '../Seo';
import { SITE_URL, ORGANIZATION_ID } from '../lib/seo';
import PageHeader from '../Pageheader/PageHeader';
import ReadMore from '../ui/ReadMore';

/* ----------------------------- SERVICE DATA (SEO FLOODED) -------------------------------- */
const SERVICE_ITEMS = [
  {
    id: 'airport-transfer',
    title: 'Luxury Airport Transfers Dubai',
    icon: Plane,
    description: `Experience a seamless and stress-free arrival with CapitalStay’s luxury airport transfer service. 
Guests are welcomed personally at the airport—assisted with luggage and escorted to a premium vehicle selected 
for comfort and class. Chauffeurs monitor flights in real time and provide optional in-car refreshments, 
preferred music, VIP fast-track coordination, and multi-stop routing to your holiday home in Marina or Downtown.`,
    image: '../assets/services/Airport_transfer.webp',
  },
  {
    id: 'car-rental',
    title: 'Chauffeur & Luxury Car Rental Dubai',
    icon: Car,
    description: `CapitalStay’s private car rental service provides a curated fleet of luxury sedans, executive cars, 
and premium SUVs. Concierge-level support includes vehicle delivery/pickup, full sanitization, insurance, and 
optional driver services. Perfect for business trips in DIFC, events, and leisure drives across the Jumeirah coastline.`,
    image: '../assets/services/Car_rental.webp',
  },
  {
    id: 'daily-maid-services',
    title: 'Professional Housekeeping & Maid Services',
    icon: Home,
    description: `Discrete, professional housekeeping tailored to your schedule: bed and linen changes, bathroom refresh, 
kitchen and floor care, and optional laundry/ironing and turndown service. Staff are vetted, trained in privacy, 
and committed to consistent luxury-level standards for your short-term stay.`,
    image: '../assets/services/maid.webp',
  },
  {
    id: 'yatch-rental-services',
    title: 'Private Yacht Charter Dubai Marina',
    icon: Sailboat,
    description: `Cruise Dubai’s iconic coastline in unmatched luxury. Our private yacht charters are fully customizable — from romantic dinners under the stars and unforgettable sunset voyages to panoramic views of Burj Al Arab, Palm Jumeirah, and Bluewaters Island.`,
    image: '../assets/services/Yatch_Services.webp',
  },
  {
    id: 'private-chef',
    title: 'In-Villa Private Chef & Fine Dining',
    icon: Utensils,
    description: `Indulge in customized in-residence dining prepared by experienced private chefs. Menus cover everything 
from daily meals to multi-course tasting experiences, including grocery sourcing, service, and kitchen cleanup. 
Ideal for luxury villas in Palm Jumeirah or penthouses in Business Bay.`,
    image: '../assets/services/private-chef-in-dubai.jpg'
  },
];

/* ---------------------------- ACCORDION ITEM -------------------------------- */
interface AccordionItemProps {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ id, title, description, image, icon: Icon, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div id={id} className={`accordion-item-wrapper ${isOpen ? 'is-open-item' : ''}`}>
      <button
        className={`accordion-header-btn ${isOpen ? 'is-open' : ''}`}
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
      >
        <div className="header-left">
          <Icon className={`header-icon ${isOpen ? 'text-primary' : 'text-muted'}`} />
          <span className="header-title">{title}</span>
        </div>
        <ChevronDown className="chevron-icon" aria-hidden />
      </button>

      <div
        id={`${id}-content`}
        className={`accordion-content ${isOpen ? 'open' : ''}`}
        role="region"
        aria-labelledby={id}
      >
        <div className="content-inner-grid">
          <div className="content-text-area">
            <ReadMore collapsedHeight={150}>
              <p className="content-description">{description}</p>
            </ReadMore>
          </div>

          {image && (
            <div className="content-image-wrapper">
              <img
                src={image}
                alt={title}
                className="content-image"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.onerror = null;
                  img.src = 'https://placehold.co/800x400/0A0A0E/E0E0E0?text=Image+Unavailable';
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------- RIGHT PANEL -------------------------------- */
const RightImagePanel = () => {
  return (
    <aside className="image-section-container" aria-hidden>
      <div className="image-stack">
        <div className="image-card image-card-main">
          <img
            src="../assets/services/guest_services_explore.webp"
            alt="Premium Concierge Services Dubai"
            className="image-card-img"
          />
        </div>
        <div className="info-card">
          <h4 className="info-card-title">Tailored Experiences</h4>
          <p className="info-card-text">Thoughtfully designed to complement the CapitalStay experience.</p>
        </div>
        <div className="image-card image-card-small">
          <img
            src="../assets/services/experience.avif"
            alt="Executive Holiday Home Experience"
            className="image-card-img"
          />
        </div>
      </div>
    </aside>
  );
};

/* --------------------------------- MAIN PAGE -------------------------------- */
const ServicesPage = () => {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first item open

  const toggleItem = useCallback((index: number | null) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  // Hash Navigation Logic
  useEffect(() => {
    const hash = location.hash ? location.hash.substring(1) : '';
    if (hash) {
      const idx = SERVICE_ITEMS.findIndex((s) => s.id === hash);
      if (idx !== -1) {
        setOpenIndex(idx);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [location.hash]);

  return (
    <>
      <Seo
        title="Luxury Guest Services Dubai | Airport Transfer & Yacht Charter | Capital Stay"
        description="Elevate your Dubai stay with Capital Stay's executive lifestyle services. Premium airport transfers, luxury car rentals, private chefs, and yacht charters."
        jsonLd={{
          "@type": "ItemList",
          "name": "Capital Stay Premium Services",
          "itemListElement": SERVICE_ITEMS.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Service",
              "name": item.title,
              "description": item.description.replace(/\s+/g, " ").trim(),
              "url": `${SITE_URL}/services#${item.id}`,
              "provider": { "@id": ORGANIZATION_ID },
              "areaServed": { "@type": "City", "name": "Dubai" }
            }
          }))
        }}
      />

      <PageHeader
        title="Executive Lifestyle Services"
        description="Premium services curated by CapitalStay — designed for comfort, luxury, and complete peace of mind."
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: ' Services', href: '/services' }]}
        backgroundImage="../assets/services/guest_services_banner.webp"
      />

      <div className="services-page-wrapper">
         <style>{`
        :root {
          --primary-blue: #2563eb;
          --accent-blue: #1d4ed8;
          --bg: #ffffff;
          --card-bg: #f8f8fb;
          --muted: #6b7280;
          --text: #111827;
          --radius-lg: 1rem;
          --radius-md: 0.75rem;
        }

        /* Page wrapper */
        .services-page-wrapper {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          padding: 2.75rem 1rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 2.25rem;
          max-width: 90rem;
          margin-left: auto;
          margin-right: auto;
        }

        .header-main-title {
          font-family: var(--font-display, "Cormorant Garamond", serif);
          font-size: 2.5rem;
          line-height: 1.15;
          font-weight: 500;
          margin: 0;
          background: linear-gradient(90deg, #002a5f 0%, var(--primary-blue) 100%);
          -webkit-background-clip: text;
          color: transparent;
          letter-spacing: -0.01em;
        }

        .header-subtitle {
          margin-top: 0.6rem;
          color: var(--muted);
          font-size: 0.95rem;
          max-width: 56rem;
          margin-left: auto;
          margin-right: auto;
        }

        /* Grid layout: left accordion, right panel */
        .main-grid {
          max-width: 90rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
        }

        @media (min-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr 360px; /* Right column fixed width for consistent layout */
            align-items: start;
            gap: 3rem;
          }
        }

        /* Accordion container */
        .accordion-list {
     
          border-radius: var(--radius-lg);
          padding: 0.75rem;
      
          overflow: hidden;
        }

        /* Individual item */
        .accordion-item-wrapper {
          border-radius: 0.75rem;
          margin: 0.5rem 0;
          overflow: visible;
          background: transparent;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .accordion-item-wrapper.is-open-item {
          transform: translateY(-2px);
        }

        .accordion-header-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          width: 100%;
          padding: 1.25rem 1.25rem;
          background: transparent;
          border: none;
          text-align: left;
          border-radius: 0.65rem;
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease;
        }

        .accordion-header-btn:hover {
          background: rgba(15, 23, 42, 0.03);
        }

        .accordion-header-btn.is-open {
          background: linear-gradient(90deg, rgba(37, 99, 235, 0.06), rgba(29, 78, 216, 0.03));
          box-shadow: inset 3px 0 0 var(--primary-blue);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-icon {
          width: 1.4rem;
          height: 1.4rem;
        }

        .header-title {
          font-weight: 700;
          font-size: 1.06rem;
          color: var(--text);
        }

        .text-primary {
          color: var(--primary-blue);
        }
        .text-muted {
          color: var(--muted);
        }

        .chevron-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: var(--primary-blue);
          transition: transform 0.36s cubic-bezier(.2,.9,.3,1);
        }
        .accordion-header-btn.is-open .chevron-icon {
          transform: rotate(180deg);
        }

        /* Accordion content */
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease;
        }

        .accordion-content.open {
          max-height: 900px; /* generous to accommodate rich text */
          opacity: 1;
        }

        .content-inner-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          padding: 1.25rem 1.25rem 1.75rem;
        }

        @media (min-width: 720px) {
          .content-inner-grid {
            grid-template-columns: 1fr 340px;
            gap: 1.75rem;
            padding: 1.5rem 1.5rem 2rem;
          }
        }

        .content-text-area {
          align-self: start;
        }

        .content-description {
          margin: 0 0 1.25rem;
          color: var(--text);
          line-height: 1.65;
          white-space: pre-line;
        }

        .request-service-btn {
          display: inline-block;
          padding: 0.75rem 1.25rem;
          background: var(--primary-blue);
          color: white;
          border-radius: 0.5rem;
          border: none;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.14);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .request-service-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.22);
        }

        .content-image-wrapper {
          border-radius: 0.6rem;
          overflow: hidden;
          border: 1px solid rgba(15, 23, 42, 0.04);
          background: #fff;
          width: 100%;
          max-width: 100%;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .content-image:hover {
          transform: scale(1.03);
        }

        /* ---------------------- RIGHT PANEL (vertical stack) --------------------- */

        .image-section-container {
          display: none; /* hidden on small screens */
        }

        @media (min-width: 1024px) {
          .image-section-container {
            display: block;
            position: sticky;
            top: 6rem;
            align-self: start;
            height: calc(100vh - 8rem);
            padding-left: 0;
          }
        }

        .image-stack {
          display: grid;
          grid-template-rows: 1fr auto 240px;
          gap: 1rem;
          height: 100%;
        }

        .image-card {
          border-radius: var(--radius-md);
          overflow: hidden;
       
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-card-main {
          min-height: 260px;
          max-height: 360px;
        }

        .image-card-small {
          min-height: 160px;
          max-height: 220px;
        }

        .image-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }

        .image-card:hover .image-card-img {
          transform: scale(1.03);
        }

        .info-card {
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.5rem;
          background: white;
          border: 1px solid rgba(16, 24, 40, 0.04);
          box-shadow: 0 6px 20px rgba(13, 20, 30, 0.06);
        }

        .info-card-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text);
        }

        .info-card-text {
          margin: 0;
          color: var(--muted);
          font-size: 0.95rem;
        }

        /* Small screens: full-width accordion and compact content-image sizes */
        @media (max-width: 1023px) {
          .content-image-wrapper {
            height: 200px;
          }
        }
      `}</style>
        
        <header className="page-header">
          <h2 className="header-main-title">Explore Services we offer</h2>
          <p className="header-subtitle">Tailored lifestyle solutions for the modern traveler in Dubai.</p>
        </header>

        <div className="main-grid">
          <section className="accordion-list" aria-label="Services list">
            {SERVICE_ITEMS.map((item, idx) => (
              <AccordionItem
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                icon={item.icon}
                isOpen={openIndex === idx}
                onClick={() => toggleItem(idx)}
              />
            ))}
          </section>

          <RightImagePanel />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;