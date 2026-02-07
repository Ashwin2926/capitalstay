import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

// --- Minimalist Styled Arrow ---
const ArrowRightLong = () => (
  <svg width="34" height="10" viewBox="0 0 44 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 6H42M42 6L37 1M42 6L37 11" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

function ExploreOptionsPage() {
  // Update these URLs with the actual filter links from your Booking.com/Hostaway engine
  const locations = [
    {
      name: "Downtown Dubai",
      description: "Iconic landmarks, luxury shopping, and energetic nightlife. Explore exclusive short-term rentals.",
      image: "/assets/discover/downtown.webp",
      isFeatured: true,
      bookingUrl: "https://booking.capitalstayuae.com/listings/389018"
    },
    {
      name: "Dubai Marina",
      description: "Stunning waterfront views, upscale dining, and breathtaking skyline. Perfect for a premium stay.",
      image: "/assets/discover/marina.webp",
      isFeatured: false,
      bookingUrl: "https://booking.capitalstayuae.com/listings/457363"
    },
    {
      name: "Beachfront Palm Jumeriah",
      description: "Serene residential community with modern villas and lush greenery. Ideal for longer stays.",
      image: "/assets/discover/beachfront.webp",
      isFeatured: false,
      bookingUrl: "https://booking.capitalstayuae.com/listings/389016"
    },
    {
      name: "Azizi Riviera at Meydan One",
      description: "Dynamic commercial hub with high-rise offices and scenic canal views. Best for business travelers.",
      image: "/assets/discover/azizi.webp",
      isFeatured: false,
      bookingUrl: "https://booking.capitalstayuae.com/listings/389022"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Explore Luxury Vacation Rentals in Dubai | Capital Stay</title>
        <meta name="description" content="Discover the best neighborhoods in Dubai. Browse holiday homes in Downtown, Dubai Marina, JVC, and Business Bay." />
        {/* Schema for SEO to recognize these as served locations */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": locations.map((loc, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": loc.name,
              "description": loc.description,
              "url": loc.bookingUrl
            }))
          })}
        </script>
      </Helmet>

      <style dangerouslySetInnerHTML={{ __html: `
        .journal-section { padding: 80px 5%; background-color: #f9f9f9; }
        .journal-header { margin-bottom: 50px; text-align: center; }
        .journal-main-title { font-size: 2.5rem; font-weight: 800; color: #1A1A1A; }
        .journal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .journal-item { cursor: pointer; position: relative; overflow: hidden; border-radius: 12px; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .journal-img-wrapper { position: relative; height: 400px; overflow: hidden; }
        .journal-img-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
        .journal-item:hover img { transform: scale(1.05); }
        .card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 30px; color: white; }
        .card-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 10px; }
        .card-desc { font-size: 0.9rem; opacity: 0.8; margin-bottom: 20px; line-height: 1.5; }
        .explore-link { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; display: flex; align-items: center; gap: 10px; }
      `}} />

      <section className="journal-section">
        <div className="journal-header">
          <h2 className="journal-main-title">Key Destinations</h2>
        </div>

        <div className="journal-grid">
          {locations.map((loc, idx) => (
            <motion.a 
              key={idx}
              href={loc.bookingUrl}
              target="_blank" // Opens booking engine in a new tab to keep users on main site
              rel="noopener noreferrer"
              className="journal-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <div className="journal-img-wrapper">
                <img src={loc.image} alt={`${loc.name} Dubai holiday home rentals`} loading="lazy" />
                <div className="card-overlay">
                  <h3 className="card-title">{loc.name}</h3>
                  <p className="card-desc">{loc.description}</p>
                  <div className="explore-link">
                    BOOK IN {loc.name.toUpperCase()} <ArrowRightLong />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </>
  );
}

export default ExploreOptionsPage;