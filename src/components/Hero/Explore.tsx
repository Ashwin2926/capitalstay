import React from "react";
import { motion } from "framer-motion";

// --- Minimalist Styled Arrow ---
const ArrowRightLong = () => (
  <svg width="34" height="10" viewBox="0 0 44 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 6H42M42 6L37 1M42 6L37 11" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

function ExploreOptionsPage() {
  const locations = [
    {
      name: "Downtown Dubai",
      description: "Iconic landmarks, luxury shopping, and energetic nightlife. Explore exclusive short-term rentals.",
      image: "/assets/discover/downtown_landmark.webp",
      isFeatured: true,
    },
    {
      name: "Dubai Marina",
      description: "Stunning waterfront views, upscale dining, and breathtaking skyline. Perfect for a premium stay.",
      image: "/assets/discover/landmark_marina.webp",
      isFeatured: false,
    },
    {
      name: "Jumeirah Village Circle",
      description: "Serene residential community with modern villas and lush greenery. Ideal for longer stays.",
      image: "/assets/discover/jvc_landmark.webp",
      isFeatured: false,
    },
    {
      name: "Business Bay",
      description: "Dynamic commercial hub with high-rise offices and scenic canal views. Best for business travelers.",
      image: "/assets/discover/business_landmark.webp",
      isFeatured: false,
    },
  ];

  const handleNavigateToBooking = () => {
    window.location.href = "https://booking.capitalstayuae.com/";
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Inter:wght@300;400&display=swap');

        .journal-section {
          background-color: #F8F7F4;
          padding: 80px 5%;
          color: #1A1A1A;
          font-family: 'Inter', sans-serif;
        }

        .journal-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .journal-main-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Responsive Grid System */
        .journal-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          align-items: end;
        }

        @media (min-width: 768px) {
          .journal-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1200px) {
          .journal-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }

        .journal-item {
          cursor: pointer;
          width: 100%;
        }

        .journal-img-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
          background: #eee;
        }

        /* Height Logic */
        .h-featured { height: 650px; }
        .h-standard { height: 500px; }

        @media (max-width: 767px) {
          .h-featured, .h-standard { height: 450px; }
        }

        .journal-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .journal-item:hover img {
          transform: scale(1.08);
        }

        /* Universal Card Overlay */
        .card-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          width: 85%;
          max-width: 280px;
          padding: 35px 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          z-index: 2;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          line-height: 1.2;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .card-desc {
          font-size: 0.75rem;
          line-height: 1.6;
          color: #555;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .explore-link {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #CCC;
          padding-bottom: 2px;
        }

        .journal-footer-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #1A1A1A;
          margin-top: 15px;
          display: block;
          opacity: 0.8;
        }
      `}} />

      <section className="journal-section">
        <div className="journal-header">
          <h2 className="journal-main-title">Key Destinations</h2>
        </div>

        <div className="journal-grid">
          {locations.map((loc, idx) => (
            <motion.div 
              key={idx}
              className="journal-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              onClick={handleNavigateToBooking}
            >
              <div className={`journal-img-wrapper ${loc.isFeatured ? 'h-featured' : 'h-standard'}`}>
                <img src={loc.image} alt={loc.name} loading="lazy" />
                
                <div className="card-overlay">
                  <h3 className="card-title">{loc.name}</h3>
                  <p className="card-desc">{loc.description}</p>
                  <div className="explore-link">
                    EXPLORE NOW <ArrowRightLong />
                  </div>
                </div>
              </div>
              <span className="journal-footer-label">{loc.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ExploreOptionsPage;