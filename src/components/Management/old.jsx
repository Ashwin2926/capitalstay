// Management.jsx
import React, { useEffect, useState, useLayoutEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaHome,
  FaStar,
  FaChartLine,
  FaShieldAlt,
  FaWarehouse,
  FaHandshake,
  FaArrowRight,
  FaUserLock,
  FaCheckCircle, // Added for list items in Performance section
} from "react-icons/fa";
import PageHeader from "../Pageheader/PageHeader";
import { useNavigate } from "react-router-dom";

/* ------------------------------
 * Scoped Styles for Management Component (Simulating CSS Modules)
 * ------------------------------ */
const ScopedStyles = () => (
  // Using 'jsx' tag for component-specific styles
  <style jsx>{`
    .cs-root {
      /* Design Tokens */
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
      --cs-space-sm: 0.75rem;
      --cs-radius-md: 1rem;
      --cs-radius-lg: 1.5rem;
      --cs-h1: 2.75rem;
      --cs-h2: 1.75rem;
      --cs-h3: 1.25rem;
      --cs-lead: 1.125rem;

      min-height: 100vh;
      background: var(--cs-page-bg);
      color: var(--cs-neutral-900);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI",
        Roboto, "Helvetica Neue", Arial;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      padding: var(--cs-space-lg) 0;
    }

    .cs-container {
      max-width: 88rem;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      gap: var(--cs-space-xxl);
    }

    /* Utility / Primitive Classes */
    .cs-card {
     
      border-radius: var(--cs-radius-lg);
 
    }
    .cs-p-lg { padding: var(--cs-space-xl); }
    .cs-p-md { padding: var(--cs-space-lg); }

    /* --- ENHANCED HEADINGS STYLES --- */
    .cs-section-title {
      font-size: var(--cs-h2);
      font-weight: 800; /* Bolder */
      text-align: center;
      margin-bottom: var(--cs-space-md);
      color: var(--cs-neutral-900);
      
      /* Subtle Shadow/Depth */
      text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.05); 
    }

    .cs-subheading {
      font-size: var(--cs-h3);
      font-weight: 800; /* Bolder */
      color: var(--cs-neutral-900);
      margin-bottom: var(--cs-space-sm);
      
      /* Gradient Text Effect */
      background: linear-gradient(90deg, var(--cs-color-primary-800) 0%, var(--cs-color-primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    
    .cs-hero-title {
      font-size: clamp(1.5rem, 3vw, var(--cs-h1));
      line-height: 1.03;
      letter-spacing: -0.03em; /* Tighter spacing */
      font-weight: 900; /* Ultra Bold */
      margin-bottom: var(--cs-space-sm);
      
      /* Hero Gradient and Stronger Shadow */
      background: linear-gradient(90deg, var(--cs-neutral-900) 0%, var(--cs-color-primary-800) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); 
    }
    /* -------------------------------- */


    .cs-lead {
      font-size: var(--cs-lead);
      color: var(--cs-neutral-700);
      line-height: 1.6;
    }

    .cs-lead a {
      color: var(--cs-color-primary);
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s ease;
    }

    .cs-lead a:hover {
      border-color: var(--cs-color-primary);
    }

    .cs-icon-circle {
      width: 56px;
      height: 56px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 18px rgba(16, 24, 40, 0.06);
    }
    .cs-icon-bg-soft {
      background: var(--cs-color-primary-100);
      color: var(--cs-color-primary-800);
    }
    .cs-icon-bg-dark {
      background: var(--cs-color-primary-800);
      color: white;
    }

    /* Buttons */
    .cs-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.7rem 1.25rem;
      border-radius: 9999px;
      text-decoration: none;
      font-weight: 600;
      cursor: pointer;
      border: none; /* Ensure button style consistency */
    }
    .cs-btn-primary {
      background: var(--cs-color-primary);
      color: white;
      box-shadow: 0 6px 18px rgba(37, 99, 235, 0.12);
      transition: all 0.2s ease; /* Added transition */
    }
    .cs-btn-primary:hover {
        background: var(--cs-color-primary-800);
        box-shadow: 0 8px 20px rgba(37, 99, 235, 0.2);
    }
    .cs-btn-ghost {
      background: white;
      color: var(--cs-color-primary);
      border: 1px solid var(--cs-color-primary-200);
      transition: all 0.2s ease; /* Added transition */
    }
    .cs-btn-ghost:hover {
        background: var(--cs-color-primary-100);
        color: var(--cs-color-primary-800);
    }

    /* HERO */
    .cs-hero {
      display: grid;
      gap: var(--cs-space-lg);
      grid-template-columns: 1fr;
      align-items: center;
    }
    @media (min-width: 1024px) {
      .cs-hero { grid-template-columns: 1fr 1fr; gap: var(--cs-space-xl); }
    }

    .cs-hero-card {
      border-radius: calc(var(--cs-radius-lg) + 0.5rem);
      overflow: hidden;
      padding: var(--cs-space-lg);
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.6)
      );
    }


    .cs-hero-cta-group {
      margin-top: var(--cs-space-md);
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      align-items: center;
    }

    .cs-hero-image-wrap {
      border-radius: var(--cs-radius-lg);
      overflow: hidden;
    }
    .cs-hero-image {
      width: 100%;
      height: 22rem;
      object-fit: cover;
      display: block;
      transform-origin: center;
    }
    @media (min-width: 1024px) {
      .cs-hero-image { height: 36rem; }
    }

    /* Metrics grid */
    .cs-metrics-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
      .cs-metrics-grid { grid-template-columns: repeat(4, 1fr); }
    }
    .cs-metric {
      padding: 1.25rem;
      border-radius: var(--cs-radius-md);
 
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    
    }
    .cs-metric .value {
      font-weight: 800;
      font-size: 1.5rem;
      color: var(--cs-neutral-900);
      letter-spacing: -0.02em;
    }
    .cs-metric .label {
      font-size: 0.8rem;
      text-transform: uppercase;
      color: var(--cs-neutral-500);
      letter-spacing: 0.06em;
    }

    /* Performance Section - New Grid for Image/List Split */
    .cs-performance-grid {
        display: grid;
        gap: var(--cs-space-lg);
        grid-template-columns: 1fr;
    }
    @media (min-width: 1024px) {
        /* List on left, Image on right */
        .cs-performance-grid {
            grid-template-columns: 1.2fr 1fr;
            align-items: start;
        }
    }

    /* Split section (Why Choose + Services) */
    .cs-split {
      display: grid;
      gap: var(--cs-space-lg);
    }
    @media (min-width: 1024px) {
      /* IMPORTANT: Ensuring alignment here */
      .cs-split { grid-template-columns: 1fr 1.6fr; align-items: stretch; } 
    }

    .cs-why-panel {
      padding: var(--cs-space-lg);
      border-radius: var(--cs-radius-lg);
      background: linear-gradient(180deg, var(--cs-color-primary-100), white);
      display: flex;
      flex-direction: column;
      gap: var(--cs-space-md);
      min-height: 100%;
    }
    .cs-why-list {
      display: flex;
      flex-direction: column;
      gap: var(--cs-space-md);
      margin-top: var(--cs-space-sm);
    }
    .cs-why-item {
      display: flex;
      gap: var(--cs-space-md);
      align-items: flex-start;
    }
    .cs-why-item h4 { margin: 0; font-size: 1rem; font-weight: 700; }
    .cs-why-item p { margin: 0.25rem 0 0 0; color: var(--cs-neutral-700); font-size: 0.95rem; }

    /* services container - STYLED FOR DARK BACKGROUND */
    .cs-services {
    position: relative;
    overflow: hidden;
    z-index: 1;
    padding: var(--cs-space-lg);
    border-radius: var(--cs-radius-lg);
    box-shadow: 0 10px 30px rgba(16, 24, 40, 0.06);
    color: white;
}

.cs-services .cs-subheading,
.cs-services .cs-lead {
    color: white;
}
/* Ensure gradient subheading style is overridden for the dark background */
.cs-services .cs-subheading {
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
    
    -webkit-text-fill-color: unset;
    text-fill-color: unset;
    color: white; /* Force white */
}


/* Darkened background image with true black overlay */
.cs-services::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: var(--cs-radius-lg);

    background:
        linear-gradient(
            rgba(0, 0, 0, 0.45),   /* strong dark overlay */
            rgba(0, 0, 0, 0.55)
        ),
        url('../assets/services/Owner_bg.png');

    background-size: cover;
    background-position: center;

    filter: blur(1px);  /* optional */
}


    .cs-service-grid {
      display: grid;
      gap: 0.75rem;
      grid-template-columns: 1fr;
    }
    @media (min-width: 768px) {
      .cs-service-grid { grid-template-columns: repeat(2, 1fr); }
    }
    
    /* GLASSMORPHIC CARD STYLE - BLUR REMOVED */
    .cs-service-card-glass {
      /* Removed: backdrop-filter: blur(12px); */
      /* Removed: -webkit-backdrop-filter: blur(12px); */
      
      /* Background for the card - slightly more opaque for better contrast */
     
      /* Subtle border */
      border: 1px solid rgba(255, 255, 255, 0.3); /* translucent white */
      background: rgba(255, 255, 255, 0);       /* frosted background */
      /* Soft shadow for depth */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); 
      /* Text inside the card must be white/light color */
      color: white; 
    }
    
    /* Ensure hover effect respects the new dark card style */
    .cs-service:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4); 
    }

    /* Adjust content color inside service card for dark environment */
    .cs-service h4 { 
      color: white; /* Title is white */
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.5); 
    }
    .cs-service p { 
        color: white; /* Make description fully white for max visibility */
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    }
    .cs-service-card-glass .cs-icon-circle {
        background: rgba(255, 255, 255, 0.9); /* Icons circle background can be near-white */
        color: var(--cs-color-primary-800); /* Icon itself remains primary blue */
    }


    .cs-service {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border-radius: var(--cs-radius-md);
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }
    
    /* portal highlight (Dark Environment) - BLUR REMOVED */
    .cs-portal {
      padding: var(--cs-space-md);
      border-radius: var(--cs-radius-md);
      /* Removed: backdrop-filter: blur(10px); */
      /* Removed: -webkit-backdrop-filter: blur(10px); */
      
      background-color: rgba(30, 30, 30, 0.25); /* Slightly more opaque */
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      display: grid;
      gap: 0.5rem;
      margin-top: var(--cs-space-md);
      /* Text inside portal highlight is white */
      color: white;
    }

    .cs-portal .title { 
        font-weight: 700; 
        font-size: 1.05rem; 
        color: white;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5); 
    }
    .cs-portal .item {
      display: flex;
      gap: 0.6rem;
      align-items: center;
      color: white; /* Item text is fully white */
      font-weight: 600;
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    }
    /* Ensure icons inside the portal highlight are light */
    .cs-portal .item svg {
        color: white; 
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
        border-color: var(--cs-color-primary); /* Corrected variable use */
        background-color: var(--cs-color-primary-100); /* Using primary-100 as light */
      }

      .statBoxSecondary {
        border-color: #94A3B8; /* Slate 400 */
        background-color: #F9FAFB; /* Gray 50 */
      }

      .statLabel {
        font-size: 0.75rem;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--cs-color-primary-800); /* Using primary-800 for dark text */
        letter-spacing: 0.05em;
      }
      .statBoxSecondary .statLabel {
        color: var(--cs-neutral-700); /* Using neutral-700 as muted text */
      }

      .statValue {
        font-size: 1.875rem; /* 3xl */
        font-weight: 700;
        color: var(--cs-neutral-900); /* Using neutral-900 for dark text */
        margin-top: 0.25rem;
      }

    /* FAQ */
    .cs-faq {
      max-width: 56rem;
      margin: 0 auto;
      padding-top: var(--cs-space-md);
      border-top: 1px solid rgba(15, 23, 42, 0.04);
    }
    .cs-faq-item {
      padding: 1rem 0;
      border-bottom: 1px solid rgba(15, 23, 42, 0.04);
    }
    .cs-faq-question {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
    }
    .cs-faq-title { font-weight: 700; color: var(--cs-neutral-900); }
    .cs-faq-body {
      margin-top: 0.75rem;
      color: var(--cs-neutral-700);
      font-size: 0.98rem;
      line-height: 1.6;
    }

    /* Final CTA */
    .cs-final-cta {
      text-align: center;
      padding: var(--cs-space-xl);
      border-radius: var(--cs-radius-lg);
      background: linear-gradient(135deg, var(--cs-color-primary-100), white);
      border: 1px solid rgba(37, 99, 235, 0.06);
    }
  `}</style>
);

/* ------------------------------
 * Motion Variants (reuse)
 * ------------------------------ */
const VARIANTS = {
  // Slower and Sleeker Fade Up
  fadeUp: (delay = 0) => ({
    hidden: { opacity: 0, y: 30 }, // Increased y for more noticeable slide
    show: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }, // Slower duration, custom ease
  }),
  // Simple Pop-in for icons/small elements
  popIn: (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { delay, duration: 0.5, ease: "easeOut" } },
  }),
  // Hover for subtle effect
  subtleHover: {
    hover: { scale: 1.02, transition: { type: "spring", stiffness: 160, damping: 12 } },
  },
};

/* ------------------------------
 * New Counter Component
 * ------------------------------ */
const Counter = ({ value, suffix = "", duration = 2, startDelay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  // Parse the value, handling the non-numeric "yrs" case explicitly
  const numericValue = parseInt(value);
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (isInView && isNumeric) {
      setTimeout(() => {
        const start = 0;
        const end = numericValue;
        let frame = 0;
        const totalFrames = Math.round(duration * 60); // Assuming 60 fps
        const increment = end / totalFrames;

        const animate = () => {
          if (frame < totalFrames) {
            frame++;
            setDisplayValue(Math.round(start + increment * frame));
            requestAnimationFrame(animate);
          } else {
            setDisplayValue(end);
          }
        };
        animate();
      }, startDelay * 1000);
    } else if (!isNumeric) {
      // For non-numeric values (like "5+ yrs"), just set the final text after delay
      setTimeout(() => {
        setDisplayValue(value);
      }, startDelay * 1000);
    }
  }, [isInView, numericValue, isNumeric, duration, value, startDelay]);

  return (
    <span ref={ref}>
      {isNumeric ? displayValue : value}
      {isNumeric ? suffix : ""}
    </span>
  );
};


/* ------------------------------
 * Small reusable components
 * ------------------------------ */

// Simplified MotionBox for consistent fade-up animation on scroll
const MotionBox = ({ children, className = "", delay = 0, isElement = false }) => {
    const Component = isElement ? motion.div : motion.div;
    return (
      <Component
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={VARIANTS.fadeUp(delay)}
        className={className}
      >
        {children}
      </Component>
    );
  };

// Adjusted IconCircle to be animated
const IconCircle = ({ children, variant = "soft", delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.1 }}
    variants={VARIANTS.popIn(delay)}
    // Note: The icon background is now handled in the CSS for the dark glass card environment
    className={`cs-icon-circle ${variant === "dark" ? "cs-icon-bg-dark" : "cs-icon-bg-soft"}`}
  >
    {React.cloneElement(children, { size: 18 })}
  </motion.div>
);

// Added Motion to Buttons
const HeroLoginButton = ({ children, delay, ...rest }) => (
  <motion.a 
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.1 }}
    variants={VARIANTS.fadeUp(delay)}
    {...rest} 
    className="cs-btn cs-btn-ghost" 
    aria-label="Owner Portal Login"
  >
    <FaUserLock /> <span>{children}</span>
  </motion.a>
);

const HeaderLoginButton = ({ children, ...rest }) => (
  <a {...rest} className="cs-btn cs-btn-ghost" aria-label="Owner Login">
    <FaUserLock /> <span>{children}</span>
  </a>
);

// Metric updated to use the Counter component for value
const Metric = ({ icon, value, label, delay = 0 }) => {
    const valueParts = value.match(/(\d+)(.*)/); // Splits value into numeric part and suffix
    const numericPart = valueParts ? valueParts[1] : value;
    const suffixPart = valueParts ? valueParts[2] : '';
    
    // Explicitly check for non-numeric labels like "5+ yrs"
    const isNonNumeric = value.includes('yrs');

    return (
        <MotionBox delay={delay} className="cs-metric">
            <IconCircle delay={delay + 0.1}>{icon}</IconCircle> 
            <motion.div className="value" variants={VARIANTS.fadeUp(delay + 0.2)}>
              {isNonNumeric ? (
                // Use Counter only for the effect, if the value is purely string, it displays instantly
                <Counter value={value} suffix={suffixPart} duration={1.5} startDelay={delay + 0.2} />
              ) : (
                <Counter 
                  value={numericPart} 
                  suffix={suffixPart} 
                  duration={2} 
                  startDelay={delay + 0.2} 
                />
              )}
            </motion.div>
            <motion.div className="label" variants={VARIANTS.fadeUp(delay + 0.3)}>{label}</motion.div>
        </MotionBox>
    );
};


// Service updated for nested animation and new glassmorphic style
const Service = ({ icon, title, description, delay = 0 }) => (
  <MotionBox delay={delay} className="cs-service cs-service-card-glass"> {/* Added glassmorphic class */}
    <div style={{ flexShrink: 0 }}>
      <IconCircle delay={delay + 0.05}>{icon}</IconCircle> {/* Nested Icon animation */}
    </div>
    <div style={{ flex: 1 }}>
      <motion.h4 variants={VARIANTS.fadeUp(delay + 0.1)}>{title}</motion.h4>
      <motion.p variants={VARIANTS.fadeUp(delay + 0.2)}>{description}</motion.p>
    </div>
  </MotionBox>
);

// WhyItem updated for nested animation
const WhyItem = ({ icon, title, description, delay = 0 }) => (
  <MotionBox delay={delay} className="cs-why-item">
    <IconCircle variant="dark" delay={delay + 0.05}>{icon}</IconCircle> {/* Nested Icon animation */}
    <div>
      <motion.h4 variants={VARIANTS.fadeUp(delay + 0.1)}>{title}</motion.h4>
      <motion.p variants={VARIANTS.fadeUp(delay + 0.2)}>{description}</motion.p>
    </div>
  </MotionBox>
);

/* FAQ Item with simple accordion */
const FAQItem = ({ q, a, index = 0, delay = 0 }) => {
  const [open, setOpen] = React.useState(index === 0);
  return (
    <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={VARIANTS.fadeUp(delay)}
        className="cs-faq-item"
    >
      <button
        className="cs-faq-question"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        <div className="cs-faq-title">{q}</div>
        <motion.div 
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "all .25s" }}
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.25 }}
        >
          <FaArrowRight />
        </motion.div>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }} // Slower transition for sleeker effect
      >
        <div className="cs-faq-body">{a}</div>
      </motion.div>
    </motion.div>
  );
};

/* ------------------------------
 * MAIN Presentation component
 * ------------------------------ */
const Presentation = () => {
  const navigate = useNavigate();
  const baseDelay = 0.1; // Increased base delay for slower/sleeker feel
  const stagger = 0.15; // Increased stagger for a more noticeable cascade

useLayoutEffect(() => {
    // A micro-timeout ensures the browser has finished rendering the 
    // new page height before we try to move the scrollbar.
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" // "instant" prevents fighting with "smooth" scrolls
      });
    }, 0);

    // Clean up timer
    return () => clearTimeout(timer);
  }, []);
  

const handleClick = () => {
  navigate("/#contact");
  setTimeout(() => {
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth" });
  }, 10);
};


  return (
    <div className="cs-root">
      <ScopedStyles /> {/* Renders the locally-scoped <style> tag */}

      <PageHeader
        title={"Premier Property Management for Dubai Landlords"}
        description={
          "Partner with Capital Stay for seamless, high-performance short-term rental management that maximizes your asset's value and minimizes your effort."
        }
        backgroundImage={"../assets/dining.webp"}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Landlord Services", href: "/landlord-services" },
        ]}
      >
        <HeaderLoginButton href="https://dashboard.hostaway.com/login">
          Owner Login
        </HeaderLoginButton>
      </PageHeader>

      <main className="cs-container">
        {/* HERO */}
        <section className="cs-hero cs-hero-card cs-card">
          <div className="cs-hero-content cs-p-lg">
            
            {/* Split title/lead/cta for finer control */}
            <motion.h1 
                className="cs-hero-title"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={VARIANTS.fadeUp(baseDelay)}
            >
                Experience Effortless Ownership — Expert Property Care, Elevated Returns
            </motion.h1>
            
            <motion.p 
                className="cs-lead"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={VARIANTS.fadeUp(baseDelay + stagger)}
            >
                We combine <a href="/#amenities">local expertise</a>, premium presentation, and intelligent pricing
                to deliver <a href="/#testimonials">maximized revenue</a> and peace of mind for Dubai property owners.
            </motion.p>

            <div className="cs-hero-cta-group" style={{ marginTop: "1.25rem" }}>
                <MotionBox delay={baseDelay + stagger * 2} className="cs-btn-wrapper">
                  
                </MotionBox>
                {/* HeroLoginButton is now a motion component */}
                <HeroLoginButton 
                    href="https://dashboard.hostaway.com/login" 
                    delay={baseDelay + stagger * 3}
                >
                    Owner Portal Login
                </HeroLoginButton>
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
          </div>

          <motion.div
            className="cs-hero-image-wrap"
            initial={{ opacity: 0, scale: 0.95 }} // More subtle initial state
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover="hover"
            variants={VARIANTS.subtleHover}
            transition={{ duration: 1.0, ease: "easeOut" }} // Slower duration
            viewport={{ once: true }}
            style={{ padding: 0 }}
          >
            <img className="cs-hero-image" src="../assets/effort2.jpg" alt="Luxury property interior" />
            
          </motion.div>
        </section>

        {/* NEW PARTNER BADGES SECTION (Moved from Hero) */}
        <section className="cs-card cs-p-md" style={{ background: "white", padding: '1.5rem', border: '1px solid var(--cs-color-primary-200)', borderRadius: 'var(--cs-radius-lg)' }}>
            <motion.div 
                style={{ 
                    display: "flex", 
                    gap: "1.5rem", 
                    flexWrap: "wrap", 
                    alignItems: "center", 
                    justifyContent: "center" 
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={VARIANTS.fadeUp(baseDelay)}
            >
                {/* Partner badges — wrapped in MotionBox */}
                <MotionBox delay={baseDelay + stagger * 1}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <img src="../assets/badges/dtcm.png" alt="DTCM" style={{ height: 60}} />
                    <span style={{ fontWeight: 700, color: "var(--cs-neutral-700)" }}></span>
                  </div>
                </MotionBox>
                <MotionBox delay={baseDelay + stagger * 2}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <img src="../assets/badges/airbnd.png" alt="Airbnb" style={{ height: 30 }} />
                    <span style={{ color: "var(--cs-neutral-700)", fontWeight: 600 }}></span>
                  </div>
                </MotionBox>
                <MotionBox delay={baseDelay + stagger * 3}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <img src="../assets/badges/booking.png" alt="Booking" style={{ height: 30 }} />
                    <span style={{ color: "var(--cs-neutral-700)", fontWeight: 600 }}>  </span>
                  </div>
                </MotionBox>
                 <MotionBox delay={baseDelay + stagger * 4}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <img src="../assets/badges/expedia.svg" alt="Expedia" style={{ height: 30 }} />
                    <span style={{ color: "var(--cs-neutral-700)", fontWeight: 600 }}> </span>
                  </div>
                </MotionBox>
              </motion.div>
        </section>

        {/* METRICS & EXCELLENCE - RESTRUCTURED */}
        <section id="performance-excellence" className="cs-card cs-p-lg">
          <motion.h2 
            className="cs-section-title"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={VARIANTS.fadeUp(baseDelay)}
          >
            Our Track Record — Performance You Can Trust
          </motion.h2>

          <div style={{ marginTop: "1rem" }}>
            <div className="cs-metrics-grid">
              {/* Metrics updated to use the Metric component which now includes Counter */}
              <Metric icon={<FaMapMarkerAlt />} value="4+" label="Prime Locations" delay={baseDelay + stagger * 1} />
              <Metric icon={<FaHome />} value="100+" label="Managed Units" delay={baseDelay + stagger * 2} />
              <Metric icon={<FaChartLine />} value="90%" label="Target Occupancy" delay={baseDelay + stagger * 3} />
              <Metric icon={<FaStar />} value="5+ yrs" label="Market Expertise" delay={baseDelay + stagger * 4} />
            </div>
          </div>

         <div style={{ marginTop: "2rem" }} className="cs-performance-grid">
    {/* List of guarantees on the left (or top on mobile) - NOW NEW CONTENT */}
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <MotionBox delay={baseDelay + stagger * 5}>
        <h3 className="cs-subheading">Why Property Owners Trust Capital Stay</h3>
      </MotionBox>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
        {/* Applied MotionBox and staggered delays to list items */}
        
        {/* Item 1: Smart Compliance & Legal Support */}
        <MotionBox delay={baseDelay + stagger * 6}>
          <li style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <motion.div 
                style={{ marginTop: 2 }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={VARIANTS.popIn(baseDelay + stagger * 6 + 0.05)}
            >
              <FaCheckCircle style={{ fontSize: "1.25rem", color: "var(--cs-color-primary)" }} />
            </motion.div>
            <div>
              <div style={{ fontWeight: 700 }}>Smart Compliance & Legal Support</div>
              <div style={{ color: "var(--cs-neutral-700)" }}>Capital Stay handles all <a href="https://booking.capitalstayuae.com/terms-and-conditions">regulatory and compliance requirements</a> to ensure your property operates smoothly within local holiday-home guidelines.</div>
            </div>
          </li>
        </MotionBox>
        
        {/* Item 2: Owner Access Portal */}
        <MotionBox delay={baseDelay + stagger * 7}>
          <li style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <motion.div 
                style={{ marginTop: 2 }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={VARIANTS.popIn(baseDelay + stagger * 7 + 0.05)}
            >
               <FaCheckCircle style={{ fontSize: "1.25rem", color: "var(--cs-color-primary)" }} />
            </motion.div>
            <div>
              <div style={{ fontWeight: 700 }}>Owner Access Portal</div>
              <div style={{ color: "var(--cs-neutral-700)" }}>Our owners enjoy access to a simple, easy-to-use <a href="https://dashboard.hostaway.com/login">online portal</a> where performance, bookings and reports can be viewed clearly and conveniently at any time.</div>
            </div>
          </li>
        </MotionBox>

        {/* Item 3: Clear & Simple Financial Management */}
        <MotionBox delay={baseDelay + stagger * 8}>
          <li style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <motion.div 
                style={{ marginTop: 2 }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={VARIANTS.popIn(baseDelay + stagger * 8 + 0.05)}
            >
              <FaCheckCircle style={{ fontSize: "1.25rem", color: "var(--cs-color-primary)" }} />
            </motion.div>
            <div>
              <div style={{ fontWeight: 700 }}>Clear & Simple Financial Management</div>
              <div style={{ color: "var(--cs-neutral-700)" }}>We provide streamlined financial reporting with transparent statements so you can easily track income, performance and expenses without complexity.</div>
            </div>
          </li>
        </MotionBox>

        {/* Item 4: Proactive Property Care */}
        <MotionBox delay={baseDelay + stagger * 9}>
          <li style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <motion.div 
                style={{ marginTop: 2 }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={VARIANTS.popIn(baseDelay + stagger * 9 + 0.05)}
            >
               <FaCheckCircle style={{ fontSize: "1.25rem", color: "var(--cs-color-primary)" }} />
            </motion.div>
            <div>
              <div style={{ fontWeight: 700 }}>Proactive Property Care</div>
              <div style={{ color: "var(--cs-neutral-700)" }}>Capital Stay actively monitors and maintains your property, addressing issues before they escalate and ensuring your home stays in <a href="https://booking.capitalstayuae.com/privacy-policy">mint condition</a>.</div>
            </div>
          </li>
        </MotionBox>
      </ul>
    </div>

    {/* Image/Illustration on the right (or bottom on mobile) */}
    <motion.div 
        className="cs-card cs-p-md" 
        style={{ alignSelf: "center", padding: 0 }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={VARIANTS.fadeUp(baseDelay + stagger * 10)}
    >
      <img 
        src="../assets/access.jpg" 
        alt="Transparent financial reporting and digital dashboard" 
        style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: "0.75rem" }} 
      />
      
    </motion.div>
</div>
        </section>

        {/* SPLIT: Why Choose + Services */}
        <section className="cs-split">
          <MotionBox delay={baseDelay} className="cs-why-panel">
            <motion.h3 className="cs-subheading" variants={VARIANTS.fadeUp(baseDelay + stagger)}>A Truly Seamless, Full-Service Experience</motion.h3>
            <motion.p className="cs-lead" variants={VARIANTS.fadeUp(baseDelay + stagger * 2)}>
              Capital Stay delivers a <a href="https://dashboard.hostaway.com/login">seamless, full-service management experience</a> designed for property owners who value quality, care and performance. From bespoke furnishing and strategic marketing to guest services and meticulous property maintenance, every detail is handled with precision.
            </motion.p> 

            <div className="cs-why-list">
              {/* WhyItem is a MotionBox, staggering applied */}
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
          </MotionBox>

          <div className="cs-services cs-card"> 
            <div style={{ padding: 'var(--cs-space-lg)', position: 'relative', zIndex: 2 }}> 
                <MotionBox delay={baseDelay}>
                    <h3 className="cs-subheading">Comprehensive Owner Management Services</h3>
                </MotionBox>
                <MotionBox delay={baseDelay + stagger}>
                    <p className="cs-lead">Everything covered — from  maximizing revenue and guest care to full legal compliance.</p>
                </MotionBox>

                <div style={{ marginTop: "1rem" }} className="cs-service-grid">
                {/* Service is a MotionBox, staggering applied, now with dark background style */}
                <Service icon={<FaShieldAlt />} title="Legal Compliance & Licensing" description="Full DTCM compliance and licensing support to operate worry-free." delay={baseDelay + stagger * 2} />
                <Service icon={<FaChartLine />} title="Financial Reporting & Payouts" description="Clear monthly statements with automated, reliable payouts." delay={baseDelay + stagger * 3} />
                <Service icon={<FaHome />} title="Proactive Maintenance & Cleaning" description="Regular inspections and professional housekeeping services." delay={baseDelay + stagger * 4} />
                <Service icon={<FaStar />} title="Marketing & Channel Management" description="Optimized listings across global platforms to maximize visibility." delay={baseDelay + stagger * 5} />
                </div>

                <MotionBox delay={baseDelay + stagger * 6} className="cs-portal">
                <motion.div className="title" variants={VARIANTS.fadeUp(0.0)}>Owner Portal Highlights</motion.div>
                {/* Inner items for portal highlight */}
                <motion.div className="item" variants={VARIANTS.fadeUp(0.1)}><FaChartLine /> <span>Real-time Revenue Tracking</span></motion.div>
                <motion.div className="item" variants={VARIANTS.fadeUp(0.2)}><FaHandshake /> <span>Automated Monthly Payouts</span></motion.div>
                <motion.div className="item" variants={VARIANTS.fadeUp(0.3)}><FaWarehouse /> <span>Maintenance & Ticketing Log</span></motion.div>

                </MotionBox>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cs-card cs-p-lg">
          <motion.h2 
            className="cs-section-title"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={VARIANTS.fadeUp(baseDelay)}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="cs-faq">
            {/* FAQItem is now a MotionBox, staggering applied */}
            <FAQItem
              q="What is your standard management fee?"
              a={<p>A competitive management fee is deducted from gross rental income. This covers marketing, guest support, compliance, and maintenance coordination.</p>}
              index={0}
              delay={baseDelay + stagger * 1}
            />
            <FAQItem
              q="How is occupancy rate managed and optimized?"
              a={<p>We use **dynamic pricing**, targeted marketing, and premium presentation to drive consistent occupancy and higher ADR.</p>}
              index={1}
              delay={baseDelay + stagger * 2}
            />
            <FAQItem
              q="What is the process for owner personal usage?"
              a={<p>Owners can block out personal dates via the Owner Portal. We ask for a simple notice period to avoid clashing with confirmed bookings.</p>}
              index={2}
              delay={baseDelay + stagger * 3}
            />
            <FAQItem
              q="What if my property requires furnishing?"
              a={<p>We offer bespoke furnishing packages designed to accelerate revenue generation and suit the high-end short-stay market.</p>}
              index={3}
              delay={baseDelay + stagger * 4}
            />
            <FAQItem
              q="Is Capital Stay a legally licensed operator?"
              a={<p>Yes — we are a fully licensed holiday home operator in Dubai, compliant with **DTCM regulations**.</p>}
              index={4}
              delay={baseDelay + stagger * 5}
            />
            <FAQItem
              q="How is property damage handled?"
              a={<p>Guest deposits and insurance cover repairs. We coordinate all repairs and provide itemized invoices and documentation to owners.</p>}
              index={5}
              delay={baseDelay + stagger * 6}
            />
          </div>
        </section>

        {/* FINAL CTA */}
        <motion.section 
            id="contact" // Added ID for scrolling
            className="cs-final-cta cs-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={VARIANTS.fadeUp(baseDelay + stagger)}
        >
          <motion.h3 className="cs-subheading" variants={VARIANTS.fadeUp(0.1)}>Ready to maximize your property's potential?</motion.h3>
          <motion.p className="cs-lead" variants={VARIANTS.fadeUp(0.2)}>Speak to our team for a <a onClick={handleClick}>tailored plan</a> — premium presentation, smarter pricing, and full-service management.</motion.p>
          <div style={{ marginTop: "1rem" }}>
            <motion.button 
                className="cs-btn cs-btn-primary" 
                onClick={handleClick} // Updated to use the handleClick function
                variants={VARIANTS.fadeUp(0.3)}
            >
                Contact Us {/* Updated button text */}
            </motion.button>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Presentation;

