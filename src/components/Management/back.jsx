



import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaHome, FaStar, FaChartLine, FaShieldAlt, FaWarehouse, FaHandshake, FaArrowRight, FaUserLock } from 'react-icons/fa';
import PageHeader from '../Pageheader/PageHeader'; // Assuming PageHeader is external
 

const CustomStyles = () => (
  <style global jsx>
    {`
      /* ----------------------- Custom Variables (Design Tokens) ----------------------- */
      :root {
        --color-primary: #3B82F6; /* Blue 500 */
        --color-primary-light: #EFF6FF; /* Blue 50 */
        --color-primary-dark: #2563EB; /* Blue 600 */
        --color-text-dark: #020617; /* Slate 950 */
        --color-text-muted: #475569; /* Slate 600 */
        --color-card-bg: #FFFFFF;
        --color-accent-bg: #F1F5F9; /* Slate 100 */
        --color-dark-panel: #1E3A8A; /* Blue 800 for dark contrast */

        --spacing-xxl: 7rem; /* 28 */
        --spacing-xl: 6rem; /* 24 */
        --spacing-lg: 4rem; /* 16 */
        --spacing-md: 2.5rem; /* 10 */
        --spacing-sm: 1.5rem; /* 6 */

        --radius-lg: 1.5rem; /* 24px */
        --radius-xl: 2.5rem; /* 40px - for hero image */
      }

      /* ----------------------- Utility & Root Styles ----------------------- */
      .root {
        min-height: 100vh;
        padding-top: 0.25rem;
        background-color: #F9FAFB; /* Gray 50 */
        color: var(--color-text-dark);
      }

      .mainContent {
        max-width: 80rem; /* max-w-7xl */
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: var(--spacing-lg);
        padding-bottom: var(--spacing-lg);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xxl); /* space-y-28 */
      }

      /* Responsive Container Padding */
      @media (min-width: 1024px) {
        .mainContent {
          padding-left: 2rem;
          padding-right: 2rem;
        }
      }

      .sectionHeadingCenter {
        font-size: 2rem;
        font-weight: 800;
        text-align: center;
        margin-bottom: var(--spacing-lg);
        letter-spacing: -0.025em;
        color: var(--color-text-dark);
      }

      .subHeading {
        font-size: 1.875rem; /* 3xl */
        font-weight: 800;
        color: var(--color-text-dark);
        margin-bottom: var(--spacing-sm);
        letter-spacing: -0.025em;
      }

      /* ----------------------- Background & Floating CTA ----------------------- */
      .backgroundPattern {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        opacity: 0.05;
        background-image: url('/images/patterns/soft-grid.webp'); 
        background-size: cover;
        background-position: center;
      }


      .floatingCta {
        position: fixed;
        right: 1.5rem;
        bottom: 1.5rem;
        z-index: 50;
        display: none;
        align-items: center;
        gap: 0.75rem;
        background-color: var(--color-primary);
        color: white;
        padding: 0.75rem 1.25rem;
        border-radius: 9999px; /* full */
        /* Changed shadow from 2xl to base */
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); 
        transition: background-color 0.3s;
        font-weight: 500;
      }

      @media (min-width: 768px) {
        .floatingCta {
          display: inline-flex;
        }
      }

      .floatingCta:hover {
        background-color: var(--color-primary-dark);
      }


      /* ----------------------- Primitives (Buttons & Icons) ----------------------- */
      
      /* Login Button in Header */
      .headerLoginButton {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.5rem;
          border-radius: 9999px;
          color: var(--color-primary);
          background-color: white;
          border: 2px solid var(--color-primary);
          transition: all 0.3s ease;
          font-weight: 600;
          text-decoration: none;
          /* Changed shadow from xl to md */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      }
      .headerLoginButton:hover {
          background-color: var(--color-primary);
          color: white;
      }
      
      /* New style for the Login button inside the Hero CTA group */
      .heroLoginButton {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          border: 1px solid var(--color-primary);
          color: var(--color-primary);
          background-color: white;
          transition: all 0.3s ease;
          font-weight: 600;
          text-decoration: none;
      }
      .heroLoginButton:hover {
          background-color: var(--color-primary-light);
          transform: scale(1.02);
      }


      .iconCircle {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9999px; /* full */
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* shadow-md */
      }

      .iconCirclePrimary {
        background-color: #BFDBFE; /* Blue 200 */
      }
      .iconCircleLight {
        background-color: var(--color-primary-light);
      }
      .iconCircleDark {
        background-color: var(--color-dark-panel);
      }

      .iconClassPrimary {
        width: 1.5rem;
        height: 1.5rem;
        color: var(--color-primary-dark);
      }
      .iconClassWhite {
        width: 1.5rem;
        height: 1.5rem;
        color: white;
      }

      .ctaButton {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 2rem;
        border-radius: 9999px;
        /* Changed shadow from xl to base */
        box-shadow: 0 1px 3px 0 rgba(59, 130, 246, 0.5), 0 1px 2px 0 rgba(59, 130, 246, 0.06); 
        color: white;
        background-color: var(--color-primary);
        transition: all 0.3s ease;
        font-weight: 600;
        text-decoration: none;
      }

      .ctaButton:hover {
        background-color: var(--color-primary-dark);
        transform: scale(1.02);
      }

      .secondaryButton {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        border: 1px solid #E5E7EB; /* gray-200 */
        color: #374151; /* slate-700 */
        background-color: white;
        transition: all 0.3s ease;
        font-size: 0.875rem;
        font-weight: 500;
        text-decoration: none;
      }
      .secondaryButton:hover {
        background-color: #F9FAFB; /* gray-50 */
      }
      .secondaryButtonIcon {
        width: 0.75rem;
        height: 0.75rem;
        transition: transform 0.3s;
      }
      .secondaryButton:hover .secondaryButtonIcon {
        transform: translateX(3px);
      }

      /* ----------------------- HERO Section ----------------------- */
      .heroSection {
        position: relative;
 ;
        border-radius: var(--radius-lg);
        padding: 2rem;
  
        overflow: hidden;
      }

      .heroWrapper {
        display: flex;
        flex-direction: column;
        gap: 2.5rem; /* space-x-16 */
        align-items: center;
      }

      @media (min-width: 1024px) {
        .heroSection {
          padding: 4rem;
        }
        .heroWrapper {
          flex-direction: row;
        }
        .heroTextContainer {
          width: 50%;
        }
        .heroImageContainer {
          width: 50%;
        }
      }

      .heroTitle {
        /* Increased text size for wider heading */
        font-size: 1rem; /* 4xl+ */
        font-weight: 600;
        color: var(--color-text-dark);
  
       
      }
      @media (min-width: 1024px) {
        .heroTitle {
          /* Further increase for desktop */
          font-size: 2rem; /* 7xl */
        }
      }

      .heroDescription {
        margin-top: 1.5rem;
        font-size: 1.25rem; /* xl */
        color: var(--color-text-muted);
      }

      .heroCtaGroup {
        margin-top: 2rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }

      /* Hero Stats */
      .heroStatsContainer {
        margin-top: 2.5rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        max-width: 32rem;
      }

      .statBoxPrimary, .statBoxSecondary {
        padding: 1rem;
        border-left-width: 4px;
        border-radius: 0.5rem;
      }

      .statBoxPrimary {
        border-color: var(--color-primary);
        background-color: var(--color-primary-light);
      }

      .statBoxSecondary {
        border-color: #94A3B8; /* Slate 400 */
        background-color: #F9FAFB; /* Gray 50 */
      }

      .statLabel {
        font-size: 0.75rem;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--color-primary-dark);
        letter-spacing: 0.05em;
      }
      .statBoxSecondary .statLabel {
        color: var(--color-text-muted);
      }

      .statValue {
        font-size: 1.875rem; /* 3xl */
        font-weight: 700;
        color: var(--color-text-dark);
        margin-top: 0.25rem;
      }

      /* Hero Image */
      .heroImageWrapper {
        overflow: hidden;
        border-radius: var(--radius-xl);
        /* Changed shadow from 2xl to base */
        box-shadow: 0 1px 3px 0 rgba(59, 130, 246, 0.3), 0 1px 2px 0 rgba(59, 130, 246, 0.06); 
        transition: transform 0.3s ease-out;
      }

      .heroImage {
        width: 100%;
        height: 18rem; /* h-72 */
        object-fit: cover;
      }

      @media (min-width: 1024px) {
        .heroImage {
          height: 28rem; /* h-96 */
        }
      }


      /* ----------------------- METRICS & EXCELLENCE ----------------------- */
      .sectionCard {
     
        border-radius: var(--radius-lg);
        padding: 2rem;
   
      }
      @media (min-width: 768px) {
        .sectionCard {
          padding: 3rem;
        }
      }

      /* Metric Boxes */
      .metricGrid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-bottom: var(--spacing-xxl);
      }
      @media (min-width: 1024px) {
        .metricGrid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .metricBox {
        padding: 1.5rem;
        border-radius: 0.75rem;
        border: 1px solid #93C5FD; /* blue-300 */
        /* Changed shadow from lg to base + color hint */
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(59, 130, 246, 0.1); 
        background-color: var(--color-card-bg);
      }

      .metricContent {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .metricIconContainer {
        margin-bottom: 1rem;
      }
      .metricIconClass {
        width: 1.75rem;
        height: 1.75rem;
        color: var(--color-primary-dark);
      }

      .metricValue {
        font-size: 2.25rem; /* 4xl */
        font-weight: 800;
        color: var(--color-text-dark);
        letter-spacing: -0.025em;
      }

      .metricLabel {
        font-size: 0.875rem; /* sm */
        color: #64748B; /* slate-500 */
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-top: 0.25rem;
      }

      /* Excellence Section */
      .excellenceWrapper {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        align-items: center;
      }
      @media (min-width: 1024px) {
        .excellenceWrapper {
          flex-direction: row;
          gap: 4rem;
        }
        .excellenceContent {
          flex: 1;
        }
      }

      .excellenceList {
        list-style: none;
        padding: 0;
        margin: 0;
        space-y: 1rem;
      }

      .excellenceItem {
        display: flex;
        align-items: flex-start;
        margin-top: 1rem;
        color: #374151; /* slate-700 */
        font-size: 1.125rem; /* lg */
      }

      .excellenceStar {
        color: var(--color-primary);
        font-size: 1.5rem; /* 2xl */
        margin-right: 0.75rem;
        margin-top: 0.1rem;
        line-height: 1;
      }

      .excellenceText {
        font-weight: 500;
      }

      .excellenceImageWrapper {
        border-radius: 1.5rem;
        overflow: hidden;
        /* Changed shadow from 2xl to base */
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); 
      }
      .excellenceImage {
        width: 100%;
        height: 20rem; /* h-80 */
        object-fit: cover;
      }


      /* ----------------------- Split Section (WHY CHOOSE + SERVICES) ----------------------- */
      .splitSection {
        display: grid;
        gap: 2.5rem;
      }
      @media (min-width: 1024px) {
        .splitSection {
          grid-template-columns: 1fr 2fr;
        }
      }

      /* Dark Panel - Why Choose Us */
      .whyChoosePanel {
        background-color: #93C5FD;
        color: white;
        border-radius: var(--radius-lg);
        padding: 2rem;
        /* Changed shadow from 2xl to base */
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      }
      .whyChooseTitle {
        font-size: 1.875rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #000000ff; /* Blue 300 */
      }
      .whyChooseDescription {
        color: #000000ff; /* Gray 300 */
        margin-bottom: 2rem;
      }
      .whyChooseList {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .whyChooseItem {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
      }
      .whyChooseItemTitle {
        font-weight: 600;
        font-size: 1.25rem;
        color: white;
      }
      .whyChooseItemDescription {
        font-size: 0.875rem;
        color: #000000ff; /* Gray 400 */
        margin-top: 0.25rem;
      }

      /* Services */
      .servicesContainer {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .servicesCard {
        background-color: var(--color-card-bg);
        border-radius: var(--radius-lg);
        padding: 2rem;
        /* Changed shadow from xl to base */
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); 
        border: 1px solid #F3F4F6;
      }
      .servicesDescription {
        font-size: 1.125rem;
        color: var(--color-text-muted);
        margin-bottom: 1.5rem;
      }

      .serviceGrid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      @media (min-width: 768px) {
        .serviceGrid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .serviceCard {
        display: flex;
        align-items: flex-start;
        padding: 1.5rem;
        background-color: #F8FAFC; /* Slate 50 */
        border-radius: 1rem;
        border: 1px solid #F1F5F9; /* Slate 100 */
        transition: all 0.3s ease;
      }
      .serviceCard:hover {
        border-color: #93C5FD; /* Blue 300 */
        /* Changed shadow from xl to base */
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); 
      }

      .serviceIconWrapper {
        flex-shrink: 0;
        margin-right: 1rem;
      }
      .serviceTitle {
        font-weight: 600;
        font-size: 1.125rem;
        color: var(--color-text-dark);
      }
      .serviceDescription {
        font-size: 0.875rem;
        color: var(--color-text-muted);
        margin-top: 0.25rem;
      }

      /* Portal Highlight */
      .portalHighlight {
        background-color: var(--color-primary-light);
        border-radius: var(--radius-lg);
        padding: 2rem;
        box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05); /* shadow-inner (kept this one) */
        border: 1px solid #93C5FD; /* Blue 300 */
      }
      .portalTitle {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-text-dark);
        margin-bottom: 1rem;
      }
      .portalList {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }
      @media (min-width: 768px) {
        .portalList {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .portalListItem {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-text-muted);
        font-size: 0.875rem;
        font-weight: 500;
      }
      .portalListIcon {
        color: var(--color-primary);
      }


      /* ----------------------- FAQ Section ----------------------- */
      .faqWrapper {
        max-width: 56rem; /* max-w-4xl */
        margin-left: auto;
        margin-right: auto;
        border-top: 1px solid #E5E7EB;
      }

      .faqItem {
        border-bottom: 1px solid #E5E7EB; /* gray-200 */
        padding-top: 1rem;
        padding-bottom: 1rem;
      }

      .faqQuestion {
        width: 100%;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
      }

      .faqTitle {
        font-weight: 600;
        font-size: 1.125rem;
        color: #1F2937; /* Slate 800 */
        transition: color 0.3s;
      }

      .faqQuestion:hover .faqTitle {
        color: var(--color-primary);
      }

      .faqToggleIcon {
        transform: rotate(0deg);
        transition: transform 0.35s ease-out;
        color: var(--color-primary);
      }
      .faqToggleOpen {
        transform: rotate(180deg);
      }
      .faqArrow {
        width: 1rem;
        height: 1rem;
      }

      .faqAnswerContainer {
        overflow: hidden;
        margin-top: 0.75rem;
        color: var(--color-text-muted);
      }
      .faqAnswer {
        padding-left: 0.25rem;
        padding-bottom: 0.5rem;
      }


      /* ----------------------- Final CTA Section ----------------------- */
      .finalCtaSection {
        text-align: center;
        padding: 4rem 2rem;
        background: linear-gradient(to top right, var(--color-primary-light), white);
        border-radius: var(--radius-lg);
        border: 1px solid #93C5FD;
        /* Changed shadow from xl to base */
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      }
      .finalCtaDescription {
        font-size: 1.125rem;
        color: var(--color-text-muted);
        margin-bottom: 2rem;
        max-width: 42rem;
        margin-left: auto;
        margin-right: auto;
      }
      .finalCtaButton {
        margin-left: auto;
        margin-right: auto;
      }
    `}
  </style>
);

 
// Tokens are unchanged, keeping them for reference.
const tokens = {
  colors: {
    primary: 'blue-500', 
    primaryLight: 'blue-50',
    brandText: 'slate-950', 
    muted: 'slate-600',
    cardBg: 'white',
    accent: 'slate-100', 
  },
  radii: 'rounded-3xl',
  spacing: {
    section: 'py-20 lg:py-28',
    container: 'max-w-7xl mx-auto px-4 lg:px-8',
  },
  font: {
    heading: 'font-extrabold tracking-tight',
  }
};

const MotionCard = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

 
const IconCircle = ({ children, size = 'w-14 h-14', bg = 'iconCirclePrimary', iconClass = 'iconClassPrimary' }) => (
  <div className={`iconCircle ${size} ${bg}`}> 
    {React.cloneElement(children, { className: iconClass })}
  </div>
);

const CTAButton = ({ children, className = '', ...rest }) => (
  <a
    {...rest}
    className={`ctaButton ${className}`}
  >
    {children}
  </a>
);

const SecondaryButton = ({ children, className = '', ...rest }) => (
  <a
    {...rest}
    className={`secondaryButton ${className}`}
  >
    {children} <FaArrowRight className="secondaryButtonIcon" />
  </a>
);

// Adjusted Login Button for Hero Section
const HeroLoginButton = ({ children, className = '', ...rest }) => (
    <a
      {...rest}
      className={`heroLoginButton ${className}`}
    >
      <FaUserLock /> {children}
    </a>
);

const HeaderLoginButton = ({ children, className = '', ...rest }) => (
    <a
      {...rest}
      className={`headerLoginButton ${className}`}
    >
      <FaUserLock /> {children}
    </a>
);

/* ----------------------- Reusable UI (cards, metric, service, faq) ----------------------- */
const MetricBox = ({ icon, value, label, delay = 0 }) => (
  <MotionCard delay={delay} className="metricBox">
    <div className="metricContent">
      <div className="metricIconContainer">
        <IconCircle iconClass='metricIconClass'>{icon}</IconCircle>
      </div>
      <h4 className="metricValue">{value}</h4>
      <p className="metricLabel">{label}</p>
    </div>
  </MotionCard>
);

const ServiceCard = ({ icon, title, description, delay = 0 }) => (
  <MotionCard delay={delay} className="serviceCard">
    <div className="serviceIconWrapper">
      <IconCircle bg={"iconCircleLight"}>{icon}</IconCircle>
    </div>
    <div>
      <h4 className="serviceTitle">{title}</h4>
      <p className="serviceDescription">{description}</p>
    </div>
  </MotionCard>
);

const FAQItem = ({ q, a, index }) => {
  const [open, setOpen] = React.useState(index === 0);
  return (
    <div className="faqItem">
      <button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        className="faqQuestion"
      >
        <span className="faqTitle">{q}</span>
        <span className={`faqToggleIcon ${open ? 'faqToggleOpen' : ''}`}>
          <FaArrowRight className="faqArrow" />
        </span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="faqAnswerContainer"
      >
        <div className="faqAnswer">{a}</div>
      </motion.div>
    </div>
  );
};

 
const Presentation = () => {
  return (
    <div className="root">
 
      <CustomStyles /> 

      <PageHeader
        title={"Premium Property Management for Dubai Landlords"}
        description={"Partner with Capital Stay for seamless, high-performance short-term rental management that maximizes your asset's value and minimizes your effort."}
        backgroundImage={"../assets/dining.webp"}
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Landlord Services', href: '/landlord-services' }]}
      >
          {/* Main Header Login Button */}
          <HeaderLoginButton href="https://dashboard.hostaway.com/login">
            Owner Login
          </HeaderLoginButton>
      </PageHeader>

 
     

 
      <div className="backgroundPattern"></div>
      
      <main className="mainContent"> 

 
        <section className="heroSection">
          <div className="heroWrapper"> 
            <div className="heroTextContainer">
              <motion.h1 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="heroTitle">
              Experience Effortless Ownership With Expert Property Care
              </motion.h1>
              <motion.p initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.12 }} className="heroDescription"> 
               We provide Dubai property owners with a sophisticated, full-service strategy that guarantees optimal performance and complete peace of mind.
              </motion.p>

              <div className="heroCtaGroup"> 
               
                
                {/* 2. Login/Portal Access (Secondary Focus, but prominent in this context) */}
                <HeroLoginButton href="https://dashboard.hostaway.com/login">
                    Owner Portal Login
                </HeroLoginButton>
                
              </div>

              {/* Statistics Section */}
              <div className="heroStatsContainer">
                <div className="statBoxPrimary">
                  <p className="statLabel">Focus</p>
                  <p className="statValue">Asset Growth</p>
                </div>
                <div className="statBoxSecondary">
                  <p className="statLabel">Transparency</p>
                  <p className="statValue">Owner Portal Access</p>
                </div>
              </div>
            </div>

            <div className="heroImageContainer">
              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.5, type: "spring", stiffness: 100 }} className="heroImageWrapper"> 
                <img src="../assets/dining.webp" alt="Property Management Consultation" className="heroImage" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* METRICS & EXCELLENCE */}
        <section id="performance-excellence" className="sectionCard">
          <h2 className="sectionHeadingCenter">Our Track Record: Performance You Can Trust</h2>

          <div className="metricGrid"> 
            <MetricBox icon={<FaMapMarkerAlt />} value={"4+"} label={"Prime Locations"} delay={0.05} />
            <MetricBox icon={<FaHome />} value={"100+"} label={"Managed Units"} delay={0.12} />
            <MetricBox icon={<FaChartLine />} value={"90%"} label={"Target Occupancy"} delay={0.18} />
            <MetricBox icon={<FaStar />} value={"5+ Years"} label={"Market Expertise"} delay={0.24} />
          </div>

          <div className="excellenceWrapper"> 
            <div className="excellenceContent">
              <h3 className="subHeading">How We Guarantee High Performance</h3>
              <ul className="excellenceList"> 
                <li className="excellenceItem"><span className="excellenceStar">★</span> <span className="excellenceText">Dynamic Pricing Mastery — Maximize revenue with AI-driven, real-time rate adjustments based on market demand</span></li>
                <li className="excellenceItem"><span className="excellenceStar">★</span><span className="excellenceText">Luxury Property Presentation — Professional styling and photography to attract premium guests</span></li>
                <li className="excellenceItem"><span className="excellenceStar">★</span><span className="excellenceText">24/7 Guest Care — Multilingual, round-the-clock support for a flawless guest experience.</span></li>
                <li className="excellenceItem"><span className="excellenceStar">★</span><span className="excellenceText">Live Owner Portal — Full financial and booking transparency at your fingertips.</span></li>
              </ul>
            </div>
            <div className="excellenceImageWrapper"> 
              <img src="../assets/logo.webp" alt="Transparent Financial Reporting" className="excellenceImage" />
            </div>
          </div>
        </section>

 
        <section className="splitSection">
          
      
          <div className="whyChoosePanel"> 
            <h3 className="whyChooseTitle">Why Property Owners Partner with Capital Stay</h3>
            <p className="whyChooseDescription">We offer a superior management experience, combining cutting-edge technology with dedicated local expertise to protect your investment and optimize its returns.</p>

            <div className="whyChooseList">
              {[
                { icon: <FaWarehouse />, title: "Bespoke Furnishing & Design", description: "Elevate your property's appeal with market-leading interior design and furnishing packages." },
                { icon: <FaHome />, title: "Premium Property Care", description: "Your home is meticulously maintained in mint condition by our dedicated in-house team." },
                { icon: <FaHandshake />, title: "Unrestricted Owner Use", description: "Enjoy the freedom to reserve your property for personal use whenever you wish." },
                { icon: <FaShieldAlt />, title: "Transparent Contracts", description: "Benefit from a simple, flexible contract with no long-term binding commitment." },
              ].map((item, i) => (
                <div key={i} className="whyChooseItem">
                  <IconCircle bg={"iconCircleDark"} iconClass='iconClassWhite'>{item.icon}</IconCircle> 
                  <div>
                    <h4 className="whyChooseItemTitle">{item.title}</h4>
                    <p className="whyChooseItemDescription">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

 
          <div className="servicesContainer">
            <div className="servicesCard">
              <h3 className="subHeading">Our Full-Service Landlord Management</h3>
              <p className="servicesDescription">A comprehensive, hands-off service covering every aspect of short-term rental operations, from compliance to maintenance.</p>

              <div className="serviceGrid"> 
                <ServiceCard icon={<FaShieldAlt />} title="Legal Compliance & Licensing" description="Ensuring full adherence to DTCM regulations and legal requirements." />
                <ServiceCard icon={<FaChartLine />} title="Financial Reporting & Payouts" description="Clear, monthly statements and automated, on-time owner payouts." />
                <ServiceCard icon={<FaHome />} title="Proactive Maintenance & Cleaning" description="Regular inspections and professional cleaning to keep your property flawless." />
                <ServiceCard icon={<FaStar />} title="Expert Marketing & Bookings" description="Maximizing visibility on global platforms with optimized listings." />
              </div>
            </div>

   
            <div className="portalHighlight">
              <h4 className="portalTitle">Your Dedicated Owner Portal Access</h4>
              <ul className="portalList">
                <li className="portalListItem"><FaChartLine className="portalListIcon" /> Real-time Revenue Tracking</li>
                <li className="portalListItem"><FaHandshake className="portalListIcon" /> Automated Monthly Payouts</li>
                <li className="portalListItem"><FaWarehouse className="portalListIcon" /> Maintenance & Ticketing Log</li>
              </ul>
            </div>
          </div>
        </section>

     
        <section id="landlord-faq" className="sectionCard">
          <h2 className="sectionHeadingCenter">Frequently Asked Questions (FAQ)</h2>

          <div className="faqWrapper">
            <FAQItem q="What is your standard management fee?" a={<p>A competitive management fee is deducted from the gross rental income. This covers all marketing, guest support, compliance, and coordination of maintenance.</p>} index={0} />

            <FAQItem q="How is occupancy rate managed and optimized?" a={<p>We use a combination of **dynamic pricing algorithms**, targeted digital marketing, and premium property presentation to consistently aim for optimized occupancy .</p>} index={1} />

            <FAQItem q="What is the process for owner personal usage?" a={<p>Owners can block out dates for personal use anytime via their dedicated Owner Portal. We simply require a notice period to avoid disrupting confirmed bookings.</p>} index={2} />

            <FAQItem q="What if my property requires furnishing?" a={<p>We offer specialized **furnishing and styling packages** tailored for the high-end short-term rental market, ensuring your property is ready to generate maximum revenue immediately.</p>} index={3} />
            
            <FAQItem q="Is Capital Stay a legally licensed operator?" a={<p>Yes, Capital Stay is a fully licensed holiday home operator in Dubai, operating in full compliance with DTCM regulations and providing all necessary legal support.</p>} index={4} />

            <FAQItem q="How is property damage handled?" a={<p>Guest security deposits and our comprehensive insurance policies cover damages. We manage all repair coordination, providing full documentation and itemized invoices to the owner.</p>} index={5} />

          </div>
        </section>

      </main>
    </div>
  );
};

export default Presentation;

