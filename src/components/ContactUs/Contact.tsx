import React from "react";
import "./Contact.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
 
const address = "Abdullah Kamber Business Center - M Floor - 202 Salah Al Din St - Deira - Dubai";

const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.977322199388!2d55.333639999999995!3d25.2713483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69f71acdc341%3A0xa8c6a0ebff2d81bc!2sCapital%20Stay%20Dubai!5e0!3m2!1sen!2sae!4v1742274779314!5m2!1sen!2sae`; // Replace YOUR_Maps_API_KEY with your actual API key

  return (
    <div id="contact" className="contact-container">
      <h1 className="contact-header">Get in Touch</h1>
      <p className="contact-subtext">We would love to hear from you. Reach out to us through any of the channels below.</p>
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-card">
            <FaPhone className="contact-icon" />
            <a href="tel:+971547047913" className="contact-link">+971 547 047 913</a>
          </div>
          <div className="contact-card">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:hellodubai@capitalstayuae.com" className="contact-link">hellodubai@capitalstayuae.com</a>
          </div>
          <div className="contact-card">
            <FaMapMarkerAlt className="contact-icon" />
            <p>Abdullah Kamber Business Center - M Floor - 202 Salah Al Din St - Deira - Dubai</p>
          </div>
        </div>
        <div className="contact-map-container">
          <iframe
            className="contact-map"
            src={mapEmbedUrl}  
            allowFullScreen
            loading="lazy"
            title="Office Location Map"  
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;