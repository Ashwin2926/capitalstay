import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import "./Contact.css";

const ContactUs = () => {
  return (
    <div id="contact" className="contact-container">
      <div className="contact-header-section">
        <h2 className="contact-header">Connect with Capital Stay</h2>
        <p className="contact-subtext">
          Expert holiday home management and premium short-term stays in the UAE's most desirable neighborhoods.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          
          {/* PHONE */}
          <div className="contact-card">
            <div className="contact-icon"><FaPhone /></div>
            <div className="contact-details">
              <span className="contact-label">Reservation Desk</span>
              <a href="tel:+971547047913" className="contact-link">+971 54 704 7913</a>
            </div>
          </div>

          {/* WHATSAPP */}
          <div className="contact-card whatsapp-accent">
            <div className="contact-icon whatsapp-icon"><FaWhatsapp /></div>
            <div className="contact-details">
              <span className="contact-label">Instant Support</span>
              <a href="https://wa.me/971547047913" target="_blank" rel="noreferrer" className="contact-link">Chat with a Host</a>
            </div>
          </div>

          {/* EMAIL */}
          <div className="contact-card">
            <div className="contact-icon"><FaEnvelope /></div>
            <div className="contact-details">
              <span className="contact-label">Business Inquiries</span>
              <a href="mailto:hellodubai@capitalstayuae.com" className="contact-link contact-link-email">hellodubai@<wbr />capitalstayuae.com</a>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="contact-card">
            <div className="contact-icon"><FaMapMarkerAlt /></div>
            <address className="contact-details not-italic">
              <span className="contact-label">Office Location</span>
              <strong className="contact-address-title">Abdullah Kamber Business Center</strong>
              <span className="contact-address-text">M Floor, 202 Salah Al Din St, Deira, Dubai</span>
            </address>
          </div>
        </div>

        {/* MAP */}
        <div className="contact-map-container">
           <iframe 
             title="Capital Stay Dubai Office Location"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.234!2d55.3330!3d25.2697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69f71acdc341%3A0xa8c6a0ebff2d81bc!2sCapital%20Stay%20Dubai!5e0!3m2!1sen!2sae!4v1742274779314!5m2!1sen!2sae"
             width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
             className="contact-map"
           ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;



