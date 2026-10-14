import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import MobileRail from "../ui/MobileRail";

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
    }
    // {
    //   name: "Azizi Riviera at Meydan One",
    //   description: "Dynamic commercial hub with high-rise offices and scenic canal views. Best for business travelers.",
    //   image: "/assets/discover/azizi.webp",
    //   isFeatured: false,
    //   bookingUrl: "https://booking.capitalstayuae.com/listings/389022"
    // }
  ];

  return (
    <>
      <Helmet>
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
        .journal-section { padding: 56px 16px; background-color: #f9f9f9; }
        .journal-header { margin-bottom: 32px; text-align: center; }
        .journal-main-title { font-family: var(--font-display, "Cormorant Garamond", serif); font-size: 2.5rem; font-weight: 500; color: #1A1A1A; }
        .journal-item {
          cursor: pointer;
          position: relative;
          display: block;
          overflow: hidden;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        }
        .journal-img-wrapper { position: relative; width: 100%; height: 100%; overflow: hidden; }
        .journal-img-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
        .journal-item:hover img { transform: scale(1.05); }
        .featured-tag {
          position: absolute; top: 16px; left: 16px; z-index: 2;
          background: rgba(255,255,255,0.92); color: #0f172a;
          font-size: 0.65rem; font-weight: 800; letter-spacing: 0.1em;
          padding: 6px 12px; border-radius: 999px; text-transform: uppercase;
        }
        .card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 22px; color: white; }
        .card-title { font-family: var(--font-display, "Cormorant Garamond", serif); font-size: 1.5rem; font-weight: 500; margin-bottom: 8px; }
        .journal-item.is-featured .card-title { font-size: 2rem; }
        .card-desc { font-size: 0.85rem; opacity: 0.8; margin-bottom: 14px; line-height: 1.5; max-width: 32rem; }
        .explore-link { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; display: flex; align-items: center; gap: 10px; }
        .explore-link svg { transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
        .journal-item:hover .explore-link svg, .journal-item:focus-visible .explore-link svg { transform: translateX(8px); }
        .card-overlay { transition: background 0.6s ease; }
        .journal-item:hover .card-overlay { background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 70%); }
        .journal-item:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { .journal-item img, .explore-link svg { transition: none !important; } }
      `}} />

      <section className="journal-section">
        <div className="journal-header">
          <h2 className="journal-main-title">Key Destinations</h2>
        </div>

        <MobileRail
          label="Key destinations"
          className="mx-auto max-w-7xl"
          slideClassName="w-[80%] h-[420px] sm:w-[46%]"
          desktopClassName="md:grid-cols-4 md:auto-rows-[260px] md:gap-[22px] md:h-auto"
          getSlideClassName={(i) => (locations[i]?.isFeatured ? "md:col-span-2 md:row-span-2 md:h-auto" : "md:col-span-2 md:h-auto")}
        >
          {locations.map((loc, idx) => (
            <motion.a
              key={idx}
              href={loc.bookingUrl}
              target="_blank" // Opens booking engine in a new tab to keep users on main site
              rel="noopener noreferrer"
              className={`journal-item ${loc.isFeatured ? "is-featured" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <div className="journal-img-wrapper">
                <img src={loc.image} alt={`${loc.name} Dubai holiday home rentals`} loading="lazy" />
                {loc.isFeatured && <span className="featured-tag">Featured</span>}
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
        </MobileRail>
      </section>
    </>
  );
}

export default ExploreOptionsPage;