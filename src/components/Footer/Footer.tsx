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
  SiTrustpilot,
} from "react-icons/si";

const darkLogo = "/assets/logo.webp";

interface FooterProps {
  toggleForm: () => void;
}

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
          padding: ${isHomePage ? "80px" : "40px"} 80px 20px;
          margin-top: ${isHomePage ? "-60px" : "0px"};      
          position: relative;
          z-index: 2;
          border-top: 1px solid #f0f0f0;
        }

        /* ---------- CTA WITH DOTTED PATTERN ---------- */
        .cta {
          position: relative;
          margin: -120px auto 40px;
          width: 90%;
          max-width: 1200px;
          border-radius: 24px;
          padding: 40px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #0b1020, #3b2aa3, #7b3cff);
          box-shadow: 0 15px 40px rgba(59, 42, 163, 0.2);
          color: #fff;
          overflow: hidden;
        }

        /* The Dotted Map */
        .cta::after {
          content: "";
          position: absolute;
          right: -20px;
          top: -20px;
          width: 300px;
          height: 300px;
          background-image: radial-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 2px);
          background-size: 18px 18px;
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }

        .cta-text { position: relative; z-index: 2; }
        .cta-text h2 { font-size: 32px; font-weight: 600; margin-bottom: 8px; }
        .cta-text p { color: #d7d7ff; font-size: 16px; margin-bottom: 20px; }
        
        .cta button {
          position: relative; z-index: 2;
          background: #fff; color: #3b2aa3; border: none;
          padding: 12px 28px; border-radius: 10px; font-weight: 700;
          cursor: pointer; transition: 0.2s ease;
        }
          

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
        .links-grid li:hover { color: #3b2aa3; }

        .footer-contact-info p { color: #666; font-size: 13px; margin-bottom: 12px; line-height: 1.4; display: flex; align-items: center; gap: 8px; }

        /* ---------- BOTTOM AREA ---------- */
        .payments {
          margin-top: 30px; padding: 20px 0; border-top: 1px solid #eee;
          display: flex; justify-content: center; align-items: center; gap: 30px; flex-wrap: wrap;
        }
        .trust { display: flex; align-items: center; gap: 8px; font-size: 13px; background: #f9f9f9; padding: 6px 14px; border-radius: 50px; }
        .bottom-bar { text-align: center; color: #999; font-size: 11px; padding-bottom: 10px; }

        /* ---------- MOBILE ---------- */
        @media (max-width: 1024px) {
          .footer { padding: ${isHomePage ? "60px" : "40px"} 40px 20px; }
          .content { grid-template-columns: 1fr; gap: 40px; }
          .links-grid { grid-template-columns: repeat(2, 1fr); gap: 30px; }
        }

        @media (max-width: 600px) {
          .footer { padding: 40px 20px 20px; }
          .cta { flex-direction: column; text-align: center; padding: 30px; margin-top: -100px; }
          .links-grid { grid-template-columns: 1fr; text-align: center; }
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
              <a href="https://facebook.com" target="_blank" className="fb"><FaFacebookF /></a>
              <a href="https://instagram.com/capitalstaydubai" target="_blank" className="ig"><FaInstagram /></a>
              <a href="mailto:hellodubai@capitalstayuae.com" className="em"><FaEnvelope /></a>
              <a href="https://linkedin.com" target="_blank" className="li"><FaLinkedinIn /></a>
              <a href="https://tiktok.com" target="_blank" className="tt"><FaTiktok /></a>
              <a href="https://wa.me/971547047913" target="_blank" className="wa"><FaWhatsapp /></a>
            </div>
          </div>

          <div className="links-grid">
            <div>
              <h4>Explore</h4>
              <ul>
                <li onClick={() => handleNav("/#about-us")}>Our Story</li>
                <li onClick={() => handleNav("/#testimonials")}>Client Reviews</li>
                <li onClick={() => handleNav("/team")}>Meet the Team</li>
                <li onClick={() => handleNav("https://booking.capitalstayuae.com", true)}>Book Now</li>
              </ul>
            </div>
            <div>
              <h4>Support</h4>
              <ul>
                <li onClick={() => handleNav("/landlord-services/property-management")}>Property Management</li>
                <li onClick={() => handleNav("/services")}>Guest Services</li>
                <li onClick={() => toggleForm()}>List Your Property</li>
                <li onClick={() => handleNav("/#faq")}>FAQs</li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li onClick={() => handleNav("https://booking.capitalstayuae.com/terms-and-conditions")}>Terms & Conditions</li>
                <li onClick={() => handleNav("https://booking.capitalstayuae.com/privacy-policy")}>Privacy Policy</li>
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
          <SiVisa size={32} color="#1A1F71" />
          <SiMastercard size={32} color="#EB001B" />
          <SiAmericanexpress size={32} color="#007BC1" />
          <div className="trust">
            <SiTrustpilot color="#00B67A" size={18} />
            TrustScore <strong>4.9</strong>
          </div>
        </div>

        <div className="bottom-bar">
          © {year} Capital Stay. All Rights Reserved.
         &nbsp;  &nbsp;   &nbsp; | &nbsp;   &nbsp;  &nbsp;   &nbsp;  
            Design & Development by{' '} 
            <a
              href="https://ashwin2926.github.io/portfolio-nextjs/"
              className="text-sky-400 hover:underline"
              target="_blank"
            >
              AN
            </a>
         
        </div>
      </footer>
    </>
  );
}