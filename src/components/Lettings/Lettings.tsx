import React, { useEffect } from "react";
import { motion } from "framer-motion"; // Add motion for refined effects

function Lettings() {
  const letting1 = "/assets/lettings/lettings1.webp";
  const letting2 = "/assets/lettings/lettings2.webp";
  
  // --- Booking URL Constant ---
  const BOOKING_URL = "https://booking.capitalstayuae.com/";
    const handleNavigateToBooking = () => {
    window.location.href = "https://booking.capitalstayuae.com/";
  };

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Stop observing after first visibility
          }
        });
      },
      { threshold: 0.15 } // Trigger when 15% of the element is visible
    );

    document.querySelectorAll(".fade-in-section").forEach((el) => observer.observe(el));
    
    // Cleanup observer
    return () => observer.disconnect();
  }, []);

  // Google Ads Click Handler for External Links (Updated URL)
  const handleConversionClick = (url: string) => {
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17549947546/inhXCNCfvJgbEJrlu7BB",
        value: 1.0,
        currency: "AED",
        event_callback: () => {
          window.location.href = url;
        },
      });
    } else {
      window.location.href = url;
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } as const,
  };
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } } as const,
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* --- Premium Lettings Styles (Single File) --- */
        
        /* General Container Styles */
        .lettings-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 1.5rem; /* Increased padding */
          background: #ffffff; /* Clean white background */
          font-family: 'Inter', sans-serif;
        }

        /* Section Title Styling */
        .section-title {
          font-size: 2.8rem;
          color: #1a2e4d; /* Deep navy */
          letter-spacing: -0.5px;
          line-height: 1.2;
          font-weight: 800; /* Extra bold for impact */
        }

        /* Text Styling */
        .text-lead-muted {
          font-size: 1.15rem;
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        /* Buttons */
        .btn-premium {
          padding: 0.9rem 2.5rem;
          background: linear-gradient(45deg, #0d6efd, #0056b3); /* Blue gradient */
          color: #ffffff;
          font-weight: 700;
          border: none;
          border-radius: 50px; /* Fully rounded */
          box-shadow: 0 8px 20px rgba(0, 100, 255, 0.3);
          transition: all 0.4s ease;
          letter-spacing: 0.5px;
        }

        .btn-premium:hover {
          background: linear-gradient(45deg, #0056b3, #0d6efd);
          transform: translateY(-5px); /* More dramatic lift */
          box-shadow: 0 12px 30px rgba(0, 100, 255, 0.4);
        }

        /* Image Wrapper (Tilted/Shadowed Look) */
        .image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          padding: 1rem; /* Padding to show shadow clearly */
        }
        
        .image-wrapper::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.03); /* Light background for lift */
            border-radius: 20px;
            z-index: 1;
        }

        .letting-image {
          width: 100%;
          max-height: 450px;
          object-fit: cover;
          border-radius: 16px;
          display: block;
          position: relative;
          z-index: 2;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2); /* Strong shadow */
          /* Subtle tilt for a dynamic presentation */
          transform: rotateZ(-0.5deg) scale(1.02); 
          transition: transform 0.6s ease-in-out;
        }

        .image-wrapper:hover .letting-image {
          transform: rotateZ(0deg) scale(1.05);
        }

        /* Subtle Section Animations */
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .fade-in-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Gradient Divider */
        .gradient-divider {
          height: 1px;
          background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
          margin: 6rem 0;
        }

        /* Responsive Adjustments */
        @media (max-width: 991px) {
            .section-title {
                font-size: 2.2rem;
            }
            .text-lead-muted {
                font-size: 1.05rem;
            }
            .image-wrapper {
                margin-top: 2rem;
            }
        }
        @media (max-width: 576px) {
            .section-title {
                font-size: 1.8rem;
            }
            .lettings-container {
                padding: 3rem 1rem;
            }
            .image-wrapper {
                padding: 0.5rem;
            }
        }
      `}} />

      <div className="lettings-container container">
        
        {/* Lettings Section (Short-term/long-term) */}
        <div className="row align-items-center fade-in-section mb-5">
          <motion.div 
            className="col-lg-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariants}
          >
            <h2 className="section-title mb-3">Long-Term Lettings</h2>
            <p className="text-lead-muted">
              Affordable renting in key locations in Dubai. Live with us in your dream home
              for a minimum of 1 month stay. We accommodate hundreds of families, working
              professionals, and students just like you! Most of our properties come with premium concierge
              services.
            </p>
            <button
                onClick={handleNavigateToBooking} // <-- Added Booking Link
              className="btn btn-premium"
            >
              View Long-Term Properties
            </button>
          </motion.div>
          <motion.div 
            className="col-lg-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={imageVariants}
          >
            <div className="image-wrapper">
              <img
                src={letting1}
                alt="Long-term Lettings"
                className="letting-image"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* Gradient Divider */}
        <div className="gradient-divider"></div>

        {/* Stay with Us Section (Short-term/Holiday Homes) */}
        <div className="row align-items-center fade-in-section">
          <motion.div 
            className="col-lg-6 order-lg-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariants}
          >
            <h2 className="section-title mb-3">Luxury Holiday Stays</h2>
            <p className="text-lead-muted">
              Stay with us in one of our modern, hand-picked apartments in fantastic tourist destinations. All
              within short distances of Dubai's key features. Experience effortless check-in, 24-hour
              on-call experienced host, luxury bed linens, towels, and essential amenities.
            </p>
            <button
              onClick={handleNavigateToBooking}  
              className="btn btn-premium"
            >
              Book Short-Term Stay
            </button>
          </motion.div>
          <motion.div 
            className="col-lg-6 order-lg-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={imageVariants}
          >
            <div className="image-wrapper">
              <img
                src={letting2}
                alt="Luxury Short-term Stay"
                className="letting-image"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Lettings;