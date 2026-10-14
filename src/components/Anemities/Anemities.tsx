 
import { motion } from 'framer-motion';
import { Headset, Wifi, Book, Clock, Shield, Gem } from 'lucide-react';
 
// --- Asset/Token Definitions ---
const BackgroundImage = '/assets/background3.webp';  
const tokens = {
    color: {
        primary: '#2563eb',      // Accent Blue
        textLight: '#FFFFFF',
        textMuted: 'rgba(255, 255, 255, 0.7)',
        bgOverlay: 'rgba(0, 0, 0, 0.65)', // Stronger dark overlay
        cardBg: 'rgba(255, 255, 255, 0.08)', // Semi-transparent card
        shadow: 'rgba(0, 0, 0, 0.5)',
    },
    spacing: {
        maxWidth: '1200px',
        padding: '3rem',
    }
};

const amenities = [
  { icon: <Headset size={36} />, title: '24/7 Customer Support', desc: 'Need help? Our team is here—anytime, anywhere.' },
  { icon: <Wifi size={36} />, title: 'Instant WiFi Access', desc: 'Stay connected effortlessly with high-speed WiFi.' },
  { icon: <Book size={36} />, title: 'Curated City Guides', desc: 'Explore top spots and hidden gems with our expert tips.' },
  { icon: <Clock size={36} />, title: 'Flexible Late Checkout', desc: 'More time? Just ask. We’ll accommodate your schedule.' },
  { icon: <Shield size={36} />, title: 'Seamless & Secure', desc: 'Book with confidence, backed by our CapitalStay Promise.' },
  { icon: <Gem size={36} />, title: 'Handpicked Homes', desc: 'Every stay is vetted for quality, comfort, and style.' },
];

const Amenities = () => {
  return (
    <section>
        {/* Component-scoped CSS for styling and responsiveness */}
        <style>{`
            /* Base Styles */
            .amenities-section {
                position: relative;
                background-size: cover;
                background-position: center;
                color: ${tokens.color.textLight};
                padding: 4rem 0;
                overflow: hidden;
            }

            .overlay {
                position: absolute;
                inset: 0;
                background: ${tokens.color.bgOverlay};
                z-index: 1;
            }

            .content-wrapper {
                position: relative;
                z-index: 2;
                max-width: ${tokens.spacing.maxWidth};
                margin: 0 auto;
                padding: 0 ${tokens.spacing.padding};
                text-align: center;
            }

            /* Typography */
            .title {
                font-family: var(--font-display, "Cormorant Garamond", serif);
                font-size: 2.5rem;
                font-weight: 500;
                margin-bottom: 0.6rem;
            }

            .subtitle {
                font-size: 1rem;
                color: ${tokens.color.textMuted};
                max-width: 560px;
                margin: 0 auto 2.75rem;
            }

            /* Grid Layout (3 columns on desktop, 2 on tablet, 1 on mobile) */
            .amenities-grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 0.625rem;
            }

            @media (min-width: 768px) {
                .amenities-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem 1.25rem;
                }
            }

            @media (min-width: 1024px) {
                .amenities-grid {
                    /* Main requirement: 3 columns (2 rows of 3 items = 6 items total) */
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                }
            }

            /* Card Styling */
            .amenity-card {
                background: ${tokens.color.cardBg};
                padding: 1.5rem;
                border-radius: 0.9rem;
                box-shadow: 0 10px 30px ${tokens.color.shadow};
                border: 1px solid rgba(255, 255, 255, 0.15);
                text-align: left;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                min-height: 150px; /* Ensure visual consistency */
            }

            /* Icon Styling */
            .icon {
                color: ${tokens.color.primary};
                margin-bottom: 0.75rem;
                padding: 8px;
                background: rgba(37, 99, 235, 0.1);
                border-radius: 50%;
                transition: background 0.3s ease;
            }

            .amenity-card:hover .icon {
                background: ${tokens.color.primary};
                color: ${tokens.color.textLight};
            }

            .amenity-title {
                font-size: 1.1rem;
                font-weight: 700;
                margin-bottom: 0.4rem;
                color: ${tokens.color.textLight};
            }

            .amenity-desc {
                font-size: 0.875rem;
                color: ${tokens.color.textMuted};
            }
            /* Phones: compact app-style tiles, two per row */
            @media (max-width: 767px) {
                .content-wrapper { padding: 0 16px; }
                .title { font-size: 2rem; line-height: 1.15; }
                .subtitle { font-size: 0.9rem; margin-bottom: 2rem; }
                .amenity-card {
                    padding: 1rem;
                    min-height: 0;
                    border-radius: 1rem;
                    box-shadow: none;
                    background: rgba(255, 255, 255, 0.07);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                .amenity-card .icon { padding: 7px; margin-bottom: 0.65rem; }
                .amenity-card .icon svg { width: 22px; height: 22px; }
                .amenity-title { font-size: 0.875rem; line-height: 1.25; margin-bottom: 0.3rem; }
                .amenity-desc { font-size: 0.75rem; line-height: 1.45; }
            }
        `}</style>

        <section
          className="amenities-section" 
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
          {/* Darker, more subtle overlay */}
          <div className="overlay"></div> 

          <div className="content-wrapper">  
            <motion.h2
              className="title"  
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Peace of Mind with Every Booking
            </motion.h2>
            <motion.p
              className="subtitle"  
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              From fresh towels to late checkout, our app puts you in control.
            </motion.p>

            <div className="amenities-grid">  
              {amenities.map(({ icon, title, desc }, index) => (
                <motion.div
                  key={index}
                  className="amenity-card"  
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, translateY: -5 }}
                  viewport={{ once: true }}
                >
                  <div className="icon">{icon}</div>  
                  <h6 className="amenity-title">{title}</h6>  
                  <p className="amenity-desc">{desc}</p>  
                </motion.div>
              ))}
            </div>
          </div>
        </section>
    </section>
  );
};

export default Amenities;