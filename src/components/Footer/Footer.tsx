import { useNavigate, useLocation } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import {
  SiVisa,
  SiMastercard,
  SiAmericanexpress,
  SiAirbnb,
} from "react-icons/si";

const darkLogo = "/assets/logo.webp";

interface FooterProps {
  toggleForm: () => void;
}

// Real links (keyboard, new tab, crawlable) that keep the smooth in-app navigation on a plain click
const FooterLink = ({
  to,
  children,
  external = false,
  onNavigate,
}: {
  to: string;
  children: React.ReactNode;
  external?: boolean;
  onNavigate: (path: string) => void;
}) => (
  <li>
    <a
      href={to}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        if (external || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onNavigate(to);
      }}
    >
      {children}
    </a>
  </li>
);

export default function Footer({ toggleForm }: FooterProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const year = new Date().getFullYear();

  // Only show CTA on the home page
  const isHomePage = location.pathname === "/";

  

  const handleNav = (path: string, isExternal: boolean = false): void => {
    if (isExternal) {
      window.open(path, "_blank");
    } else {
      if (path.includes("#")) {
        const [url, hash] = path.split("#");
        navigate(url);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        navigate(path);
      }
    }
  };

  return (
    <>
      <style>{`
        .footer {
          background: #ffffff;
          color: #1a1a1a;
          /* If no CTA, reduce the top padding significantly */
          padding: ${isHomePage ? "56px" : "40px"} 60px 20px;
          margin-top: ${isHomePage ? "-40px" : "0px"};
          position: relative;
          z-index: 2;
          border-top: 1px solid #f0f0f0;
        }

        /* ---------- CTA WITH DOTTED PATTERN ---------- */
        .cta {
          position: relative;
          margin: -90px auto 40px;
          width: 90%;
          max-width: 1100px;
          border-radius: 20px;
          padding: 28px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #0b1226, #1e3a8a, #2563eb);
          box-shadow: 0 15px 40px rgba(37, 99, 235, 0.25);
          color: #fff;
          overflow: hidden;
        }

        /* The Dotted Map */
        .cta::after {
          content: "";
          position: absolute;
          right: -20px;
          top: -20px;
          width: 200px;
          height: 200px;
          background-image: radial-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 2px);
          background-size: 16px 16px;
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }

        .cta-text { position: relative; z-index: 2; }
        .cta-text h2 { font-family: var(--font-display, "Cormorant Garamond", serif); font-size: 28px; font-weight: 500; margin-bottom: 6px; }
        .cta-text p { color: #d7d7ff; font-size: 14px; margin-bottom: 16px; }

        .cta button {
          position: relative; z-index: 2;
          background: #fff; color: #1d4ed8; border: none;
          padding: 10px 22px; border-radius: 9px; font-weight: 700; font-size: 14px;
          cursor: pointer; transition: 0.2s ease;
        }
        .cta button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }


        /* ---------- CONTENT GRID ---------- */
        .content { 
          display: grid; 
          grid-template-columns: 1fr 2.5fr; 
          gap: 60px; 
          margin-top: 20px;
          align-items: start;
        }
        .brand img { width: 160px; margin-bottom: 15px; }
        .brand p { color: #555; line-height: 1.6; margin-bottom: 24px; font-size: 14px; }

        /* ---------- SOCIALS WITH BRAND COLORS ---------- */
        .socials { display: flex; gap: 10px; }
        .socials a {
          width: 36px; height: 36px; border-radius: 50%;
          background: #f5f5f5; display: flex; align-items: center;
          justify-content: center; color: #333; transition: 0.3s;
        }
        .socials .fb  { background: #1877F2; color: #fff; }
        .socials .ig {background: #E4405F; color: #fff; }
        .socials .em { background: #EA4335; color: #fff; }
        .socials .li { background: #0A66C2; color: #fff; }
        .socials .tt { background: #000000; color: #fff; }
        .socials .wa { background: #25D366; color: #fff; }

        /* ---------- LINKS ---------- */
        .links-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .links-grid h4 { font-size: 14px; font-weight: 700; margin-bottom: 20px; color: #000; text-transform: uppercase; }
        .links-grid ul { padding: 0; list-style: none; margin: 0; }
        .links-grid li { color: #666; margin-bottom: 12px; cursor: pointer; font-size: 14px; transition: color 0.2s; }
        .links-grid li:hover { color: #2563eb; }
        .links-grid a, .links-grid button { color: inherit; text-decoration: none; background: none; border: 0; padding: 0; font: inherit; cursor: pointer; text-align: inherit; }
        .links-grid a:focus-visible, .links-grid button:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; border-radius: 2px; }

        .footer-contact-info p { color: #666; font-size: 13px; margin-bottom: 12px; line-height: 1.4; display: flex; align-items: center; gap: 8px; }

        /* ---------- BOTTOM AREA ---------- */
        .payments {
          margin-top: 30px; padding: 20px 0; border-top: 1px solid #eee;
          display: flex; justify-content: center; align-items: center; gap: 30px; flex-wrap: wrap;
        }
        .trust { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #1f2937; text-decoration: none; background: #f9f9f9; padding: 6px 14px; border-radius: 50px; border: 1px solid transparent; transition: border-color 0.2s; }
        .trust:hover { border-color: #E00B41; }
        .bottom-bar {
          display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;
          text-align: center; color: #6b7280; font-size: 11px; padding-bottom: 10px;
        }
        .bottom-bar-divider { color: #ddd; }

        /* ---------- MOBILE ---------- */
        @media (max-width: 1024px) {
          .footer { padding: ${isHomePage ? "60px" : "40px"} 40px 20px; }
          .content { grid-template-columns: 1fr; gap: 40px; }
          .links-grid { grid-template-columns: repeat(2, 1fr); gap: 30px; }
        }

        @media (max-width: 600px) {
          .footer { padding: 40px 20px 20px; }
          .cta { flex-direction: column; text-align: center; padding: 24px; margin-top: -70px; }
          .links-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 16px; text-align: left; }
          .links-grid h4 { font-size: 11px; letter-spacing: 0.14em; margin-bottom: 14px; color: #0f172a; }
          .links-grid li { font-size: 13px; margin-bottom: 10px; }
          .footer-contact-info { grid-column: 1 / -1; padding-top: 20px; border-top: 1px solid #eee; }
          .footer-contact-info p { overflow-wrap: anywhere; }
          .socials { justify-content: center; }
          .brand { text-align: center; }
          .brand img { margin: 0 auto 15px; }
        }
      `}</style>

      <footer className="footer">
        {/* Conditional Rendering for CTA */}
        {isHomePage && (
          <div className="cta">
            <div className="cta-text">
              <h2>Book your stay with confidence</h2>
              <p>Luxury serviced apartments in Dubai — flexible, secure, and fully managed.</p>
              <button onClick={() => handleNav("https://booking.capitalstayuae.com", true)}>Book now</button>
            </div>
          </div>
        )}

        <div className="content">
          <div className="brand">
            <img src={darkLogo} alt="Capital Stay" />
            <p>Providing premium comfort and hospitality for the modern traveler across Dubai's most iconic locations.</p>
            <div className="socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Capital Stay on Facebook" className="fb"><FaFacebookF /></a>
              <a href="https://instagram.com/capitalstaydubai" target="_blank" rel="noopener noreferrer" aria-label="Capital Stay on Instagram" className="ig"><FaInstagram /></a>
              <a href="mailto:hellodubai@capitalstayuae.com" aria-label="Email Capital Stay" className="em"><FaEnvelope /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Capital Stay on LinkedIn" className="li"><FaLinkedinIn /></a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="Capital Stay on TikTok" className="tt"><FaTiktok /></a>
              <a href="https://wa.me/971547047913" target="_blank" rel="noopener noreferrer" aria-label="Chat with Capital Stay on WhatsApp" className="wa"><FaWhatsapp /></a>
            </div>
          </div>

          <div className="links-grid">
            <div>
              <h4>Explore</h4>
              <ul>
                <FooterLink onNavigate={handleNav} to="/#about-us">Our Story</FooterLink>
                <FooterLink onNavigate={handleNav} to="/#testimonials">Client Reviews</FooterLink>
                <FooterLink onNavigate={handleNav} to="/team">Meet the Team</FooterLink>
                <FooterLink onNavigate={handleNav} to="https://booking.capitalstayuae.com" external>Book Now</FooterLink>
              </ul>
            </div>
            <div>
              <h4>Support</h4>
              <ul>
                <FooterLink onNavigate={handleNav} to="/landlord-services/property-management">Property Management</FooterLink>
                <FooterLink onNavigate={handleNav} to="/services">Guest Services</FooterLink>
                <li><button type="button" onClick={() => toggleForm()}>List Your Property</button></li>
                <FooterLink onNavigate={handleNav} to="/#faq">FAQs</FooterLink>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <FooterLink onNavigate={handleNav} to="https://booking.capitalstayuae.com/terms-and-conditions" external>Terms & Conditions</FooterLink>
                <FooterLink onNavigate={handleNav} to="https://booking.capitalstayuae.com/privacy-policy" external>Privacy Policy</FooterLink>
                {/* <li onClick={() => handleNav("/refund")}>Refund Policy</li> */}
              </ul>
            </div>
            <div className="footer-contact-info">
              <h4>Get in touch</h4>
              <p>📍 Abdullah Kamber Business Center, Dubai</p>
              <p>📞 +971 54 704 7913</p>
              <p>📧 hellodubai@capitalstayuae.com</p>
            </div>
          </div>
        </div>

        <div className="payments">
          <SiVisa size={32} color="#1A1F71" role="img" aria-label="Visa" />
          <SiMastercard size={32} color="#EB001B" role="img" aria-label="Mastercard" />
          <SiAmericanexpress size={32} color="#007BC1" role="img" aria-label="American Express" />
          <a
            className="trust"
            href="https://www.airbnb.ae/users/show/551099812"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiAirbnb color="#E00B41" size={18} aria-hidden="true" />
            <span>Read our <strong>Airbnb reviews</strong></span>
          </a>
        </div>

        <div className="bottom-bar">
          <span>© {year} Capital Stay. All Rights Reserved.</span>
          <span className="bottom-bar-divider">|</span>
          <span>
            Design &amp; Development by{" "}
            <a
              href="https://ashwin2926.github.io/portfolio-nextjs/"
              className="text-blue-700 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              AN
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}