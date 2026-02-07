import React, { useState, useLayoutEffect } from "react";
import { motion, easeInOut } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaHome,
  FaStar,
  FaChartLine,
  FaShieldAlt,
  FaWarehouse,
  FaHandshake,
  FaUserLock,
  FaCheckCircle,
  FaChevronDown,
  FaArrowRight,
} from "react-icons/fa";
import PageHeader from "../Pageheader/PageHeader";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PropertyListingModal from "./PropertyListingModal";

/* ------------------------------
 * SEO & AI SEARCH SCHEMA (JSON-LD)
 * ------------------------------ */
const SchemaMetadata = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Capital Stay Property Management",
    "serviceType": "DTCM Licensed Holiday Home Management",
    "areaServed": "Dubai",
    "description": "Professional property management for Dubai landlords. High-yield short-term rentals, DTCM compliance, and 5-star hosting.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Capital Stay",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Abdullah Kamber Business Center, Deira",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      },
      "telephone": "+971547047913"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://capitalstayuae.com/landlord-services/property-management"
    }
  };

  return (
    <Helmet>
      <title>Expert Property Management Dubai | Maximize Rental ROI | Capital Stay</title>
      <meta name="description" content="Join Dubai's leading holiday home managers. We handle DTCM licensing, marketing, and 5-star guest services to boost your rental income. List your property today." />
      <meta name="keywords" content="Dubai property management, short term rental Dubai, landlord services Dubai, Airbnb management Dubai, DTCM holiday home" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is Capital Stay a legally licensed operator in Dubai?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Capital Stay is a fully licensed holiday home operator authorized by Dubai's DTCM."
              }
            },
            {
              "@type": "Question",
              "name": "How does Capital Stay optimize occupancy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use AI-driven dynamic pricing and marketing across major OTAs to target 90% occupancy."
              }
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

/* ------------------------------
 * Scoped Styles
 * ------------------------------ */
const ScopedStyles = () => (
  <style>{`
    .cs-root {
      --cs-color-primary: #2563eb;
      --cs-color-primary-100: #dbecff;
      --cs-color-primary-200: #bfdbfe;
      --cs-color-primary-800: #1e3a8a;
      --cs-neutral-900: #0f172a;
      --cs-neutral-700: #334155;
      --cs-neutral-500: #64748b;
      --cs-page-bg: #f9fafb;
      --cs-space-xxl: 4.5rem;
      --cs-space-xl: 3rem;
      --cs-space-lg: 2rem;
      --cs-space-md: 1.25rem;
      --cs-radius-lg: 1.5rem;
      --cs-h1: 2.75rem;
      --cs-h2: 1.75rem;
      --cs-h3: 1.25rem;
      background: var(--cs-page-bg);
      font-family: Inter, system-ui, sans-serif;
    }
    .cs-container {
      max-width: 88rem;
      margin: 0 auto;
      padding: var(--cs-space-lg) 1rem;
      display: flex;
      flex-direction: column;
      gap: var(--cs-space-xxl);
    }
    .cs-card { background: white; border-radius: var(--cs-radius-lg); overflow: hidden; }
    .cs-p-lg { padding: var(--cs-space-xl); }
    .cs-p-md { padding: var(--cs-space-lg); }
    .cs-hero-title {
      font-size: var(--cs-h1);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, var(--cs-neutral-900) 0%, var(--cs-color-primary-800) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .cs-subheading {
      font-size: var(--cs-h3);
      font-weight: 800;
      background: linear-gradient(90deg, var(--cs-color-primary-800) 0%, var(--cs-color-primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }
    .cs-services {
      position: relative;
      z-index: 1;
      background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('../assets/services/Owner_bg.png');
      background-size: cover;
      background-position: center;
      color: white;
    }
    .cs-glass-card {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(1px);
      transition: all 0.3s ease;
    }
    .cs-btn-primary {
      background: var(--cs-color-primary);
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 999px;
      font-weight: 700;
      transition: transform 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .cs-btn-primary:hover { transform: translateY(-2px); }
    .statBoxPrimary { border-left: 4px solid var(--cs-color-primary); background: var(--cs-color-primary-100); padding: 1rem; border-radius: 0.5rem; }
    .statBoxSecondary { border-left: 4px solid #94a3b8; background: #f1f5f9; padding: 1rem; border-radius: 0.5rem; }
  `}</style>
);

/* ------------------------------
 * Helper Components
 * ------------------------------ */
const VARIANTS = {
  fadeUp: (delay: number) => ({
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: easeInOut } },
  }),
  popIn: (delay: number) => ({
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { delay, duration: 0.5 } },
  }),
};

const MotionBox = ({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) => (
  <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={VARIANTS.fadeUp(delay)} className={className}>
    {children}
  </motion.div>
);

const Metric = ({ icon, value, label, delay }: { icon: React.ReactNode; value: string; label: string; delay: number }) => (
  <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={VARIANTS.popIn(delay)} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
    <div className="text-blue-600 mb-4 text-2xl">{icon}</div>
    <div className="text-3xl font-black text-slate-900 mb-1">{value}</div>
    <div className="text-[0.7rem] uppercase font-bold text-slate-500 tracking-widest">{label}</div>
  </motion.div>
);

const WhyItem = ({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) => (
  <MotionBox delay={delay} className="flex gap-4">
    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-900">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  </MotionBox>
);

const FAQItem = ({ q, a, delay }: { q: string; a: string | React.ReactNode; delay: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={VARIANTS.fadeUp(delay)} className="border-b border-slate-100 py-5">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full text-left group">
        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{q}</span>
        <FaChevronDown className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="mt-4 text-slate-600 leading-relaxed text-sm prose prose-blue">{a}</div>}
    </motion.div>
  );
};

/* ------------------------------
 * Main Component
 * ------------------------------ */
const Presentation = ({toggleForm}: {toggleForm: () => void}) => {
  const navigate = useNavigate();
  const baseDelay = 0.1;
  const stagger = 0.15;

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // GA4 Analytics Trackers
  const trackGTM = (eventName: string, label: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, {
        event_category: "Landlord Engagement",
        event_label: label,
      });
    }
  };

  const handleContactClick = () => {
    trackGTM("click_contact_us", "Management Page");
    navigate("/#contact");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleListPropertyClick = () => {
      trackGTM("click_list_property", "Management Page Main CTA");
      toggleForm(); // This now calls the App.tsx toggle
    };

  return (
    <div className="cs-root">
      <SchemaMetadata />
      <ScopedStyles />
      <PageHeader
        title="Premier Property Management for Dubai Landlords"
        description="Partner with Capital Stay for seamless, high-performance short-term rental management that maximizes your asset's value and minimizes your effort."
        backgroundImage="../assets/dining.webp"
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Landlord Services", href: "/landlord-services" }]}
      >
        <div className="flex gap-3">
          <button 
            onClick={handleListPropertyClick}
            className="cs-btn-primary"
          >
            List Your Property
          </button>
          <a href="https://dashboard.hostaway.com/login" className="px-6 py-2 bg-white w-fit text-blue-600 border border-blue-100 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center gap-2">
            <FaUserLock /> Owner Login
          </a>
        </div>
      </PageHeader>

      <main className="cs-container">
        {/* HERO SECTION */}
        <section className="cs-card grid lg:grid-cols-2 gap-8 items-center">
          <div className="cs-p-lg">
            <motion.h1 className="cs-hero-title" initial="hidden" whileInView="show" viewport={{ once: true }} variants={VARIANTS.fadeUp(baseDelay)}>
              Experience Effortless Ownership — Expert Property Care, Elevated Returns
            </motion.h1>
            
            <motion.p className="text-lg text-slate-600 leading-relaxed mb-8" initial="hidden" whileInView="show" viewport={{ once: true }} variants={VARIANTS.fadeUp(baseDelay + stagger)}>
              We combine <span className="text-blue-600 font-semibold">local expertise</span>, premium presentation, and intelligent pricing to deliver <span className="text-blue-600 font-semibold">maximized revenue</span> and peace of mind for Dubai property owners.
            </motion.p>

            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap gap-4">
                 <button onClick={handleListPropertyClick} className="cs-btn-primary">
                   List Your Property <FaArrowRight />
                 </button>
                 <button onClick={handleContactClick} className="cs-btn-primary bg-transparent border border-white/30 text-black hover:bg-white/10">
                   Contact Us
                 </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="statBoxPrimary">
                  <p className="text-[0.65rem] font-black uppercase text-blue-800 tracking-tighter">Focus</p>
                  <p className="text-xl font-black text-slate-900">Asset Growth</p>
                </div>
                <div className="statBoxSecondary">
                  <p className="text-[0.65rem] font-black uppercase text-slate-500 tracking-tighter">Transparency</p>
                  <p className="text-xl font-black text-slate-900">Owner Portal Access</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="h-full min-h-[400px]">
            <img className="w-full h-full object-cover" src="../assets/effort2.webp" alt="Luxury property management in Dubai" />
          </motion.div>
        </section>

        {/* PARTNER BADGES */}
        <section className="cs-card cs-p-md border border-slate-100">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-80 grayscale hover:grayscale-0 transition-all">
            <img src="../assets/badges/dtcm.png" alt="DTCM Licensed" className="h-16 object-contain" />
            <img src="../assets/badges/airbnd.png" alt="Airbnb Partner" className="h-8 object-contain" />
            <img src="../assets/badges/booking.png" alt="Booking.com" className="h-8 object-contain" />
            <img src="../assets/badges/expedia.svg" alt="Expedia" className="h-8 object-contain" />
          </div>
        </section>

        {/* METRICS & TRACK RECORD */}
        <section className="space-y-12">
          <motion.h2 className="text-3xl font-black text-center text-slate-900" initial="hidden" whileInView="show" variants={VARIANTS.fadeUp(baseDelay)}>
            Our Track Record — Performance You Can Trust
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Metric icon={<FaMapMarkerAlt />} value="4+" label="Prime Locations" delay={baseDelay + stagger * 1} />
            <Metric icon={<FaHome />} value="100+" label="Managed Units" delay={baseDelay + stagger * 2} />
            <Metric icon={<FaChartLine />} value="90%" label="Target Occupancy" delay={baseDelay + stagger * 3} />
            <Metric icon={<FaStar />} value="5+ yrs" label="Market Expertise" delay={baseDelay + stagger * 4} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mt-16">
            <div className="space-y-8">
              <h3 className="cs-subheading">Why Property Owners Trust Capital Stay</h3>
              <ul className="space-y-6">
                {[
                  { t: "Smart Compliance & Legal Support", d: "Capital Stay handles all regulatory requirements to ensure your property operates smoothly within local holiday-home guidelines." },
                  { t: "Owner Access Portal", d: "Access a simple, easy-to-use online portal where performance, bookings and reports can be viewed clearly at any time." },
                  { t: "Clear & Simple Financial Management", d: "Streamlined financial reporting with transparent statements so you can easily track income and expenses." },
                  { t: "Proactive Property Care", d: "Addressing issues before they escalate, ensuring your home stays in mint condition." }
                ].map((item, i) => (
                  <motion.li key={i} className="flex gap-4" initial="hidden" whileInView="show" viewport={{ once: true }} variants={VARIANTS.fadeUp(baseDelay + (i * 0.1))}>
                    <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">{item.t}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.d}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="../assets/access.jpg" alt="Digital property management dashboard" className="w-full h-[450px] object-cover" />
            </div>
          </div>
        </section>

        {/* SPLIT: FULL SERVICE PANEL + DARK SERVICE GRID */}
        <section className="grid lg:grid-cols-[1fr_1.6fr] gap-8">
          <div className="bg-gradient-to-b from-blue-50 to-white p-10 rounded-[2rem] border border-blue-100">
            <h3 className="cs-subheading">A Truly Seamless, Full-Service Experience</h3>
            <p className="text-slate-600 mb-10 text-sm leading-relaxed">Everything handled with precision—from bespoke furnishing to strategic marketing.</p>
            <div className="space-y-8">
              <WhyItem 
                icon={<FaWarehouse />} 
                title="Meticulous Property Maintenance" 
                description="Your home is maintained in mint condition, protecting both its value and presentation at all times." 
                delay={baseDelay + stagger * 3} 
              />
              <WhyItem 
                icon={<FaHome />} 
                title="Complete Lifestyle Flexibility" 
                description="We offer complete lifestyle flexibility, allowing owners to reserve their property for personal use whenever required." 
                delay={baseDelay + stagger * 4} 
              />
              <WhyItem 
                icon={<FaHandshake />} 
                title="Fair & Transparent Contracts" 
                description="Our agreements are designed around fairness and transparency, with no long-term binding commitments—simply a three-month notice period." 
                delay={baseDelay + stagger * 5} 
              />
              <WhyItem 
                icon={<FaShieldAlt />} 
                title="Strategic Marketing & Pricing" 
                description="We combine local expertise, premium presentation, and intelligent pricing to deliver maximized revenue and peace of mind." 
                delay={baseDelay + stagger * 6} 
              />
            </div>
          </div>

          <div className="cs-services cs-p-lg rounded-[2rem]">
            <h3 className="text-2xl font-black mb-2 text-white">Comprehensive Owner Management Services</h3>
            <p className="text-white/70 mb-8 text-sm">Everything covered — from maximizing revenue and guest care to full legal compliance.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { i: <FaShieldAlt />, t: "Legal Compliance & Licensing", d: "Full DTCM compliance and licensing support to operate worry-free." },
                { i: <FaChartLine />, t: "Financial Reporting & Payouts", d: "Clear monthly statements with automated, reliable payouts." },
                { i: <FaHome />, t: "Proactive Maintenance & Cleaning", d: "Regular inspections and professional housekeeping services." },
                { i: <FaStar />, t: "Marketing & Channel Management", d: "Optimized listings across global platforms to maximize visibility." }
              ].map((s, i) => (
                <div key={i} className="cs-glass-card p-6 rounded-2xl flex gap-4">
                  <div className="w-10 h-10 bg-white text-blue-900 rounded-full flex items-center justify-center flex-shrink-0">{s.i}</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{s.t}</h4>
                    <p className="text-white/60 text-xs mt-1">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-black/40 border border-white/10 p-6 rounded-2xl">
              <p className="text-[0.6rem] uppercase font-black tracking-widest text-white/50 mb-4">Owner Portal Highlights</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-md font-bold text-white"><FaChartLine className="text-blue-400"/> Revenue Tracking</div>
                <div className="flex items-center gap-2 text-md font-bold text-white"><FaHandshake className="text-blue-400"/> Auto-Payouts</div>
                <div className="flex items-center gap-2 text-md font-bold text-white"><FaWarehouse className="text-blue-400"/> Maintenance Logs</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-white-300 ">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <FAQItem q="What is your standard management fee?" a="A competitive management fee is deducted from gross rental income. This covers global marketing, 24/7 guest support, DTCM compliance, and professional maintenance coordination." delay={0.1} />
            <FAQItem q="How is occupancy rate managed and optimized?" a="We use AI-driven dynamic pricing, targeted marketing, and high-fidelity photography to ensure consistent occupancy and higher Average Daily Rates (ADR)." delay={0.2} />
            <FAQItem q="Is Capital Stay a legally licensed operator?" a="Yes—we are a fully licensed holiday home operator by Dubai's DTCM, ensuring your property is 100% compliant with local laws." delay={0.3} />
            <FAQItem q="How is property damage handled?" a="Guest security deposits and comprehensive insurance cover repairs. We manage the entire restoration process and provide itemized documentation for your records." delay={0.4} />
          </div>
        </section>

        {/* FINAL CTA */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={VARIANTS.fadeUp(0.2)}
          className="relative overflow-hidden rounded-[2.5rem] px-12 py-20 text-center
                     bg-[radial-gradient(circle_at_top,_#2563eb_0%,_#1e40af_40%,_#0f172a_85%)]
                     shadow-[0_40px_100px_rgba(37,99,235,0.35)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15)_0%,_transparent_55%)]" />

          <h3 className="relative z-10 text-3xl md:text-4xl font-black tracking-tight text-white mb-5">
            Ready to Maximize Your Property's Potential?
          </h3>

          <p className="relative z-10 text-blue-100 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
            Speak to our team for a tailored revenue projection plan — premium presentation,
            smarter pricing, and full-service hosting.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleListPropertyClick}
              className="px-10 py-4 bg-white text-[#1e40af] rounded-full font-bold text-lg shadow-lg hover:bg-gray-50 transition-colors"
            >
              List Your Property Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContactClick}
              className="px-10 py-4 border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Presentation;