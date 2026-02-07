import React, { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

/* --- Types & Global Declarations --- */
declare global {
  interface Window {
    emailjs?: {
      init: (publicKey: string) => void;
      send: (serviceID: string, templateID: string, templateParams: object) => Promise<{ status: number; text: string }>;
    };
  }
}

interface FormData {
  firstName: string; lastName: string; phone: string; email: string;
  propertyType: string; unitType: string; city: string; size: string; notes: string;
}

interface PropertyListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* --- Component Logic --- */
const PropertyListingModal: React.FC<PropertyListingModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", phone: "", email: "",
    propertyType: "Apartment", unitType: "1 Bedroom",
    city: "", size: "", notes: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailReady, setIsEmailReady] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load EmailJS
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
      script.async = true;
      script.onload = () => {
        setIsEmailReady(true);
        window.emailjs?.init("jzU3ljJnmjWkLjbkh");
      };
      document.head.appendChild(script);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailReady || !window.emailjs) return;
    setIsSubmitting(true);

    window.emailjs
      .send("service_6we7wug", "template_f03j55f", formData)
      .then(() => {
        setSuccessMessage("Your request has been submitted successfully!");
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
          navigate(0);
        }, 2000);
      })
      .catch((err) => setSuccessMessage(`Error: ${err?.text || "Failed to send."}`))
      .finally(() => setIsSubmitting(false));
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .form-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px;
        }
        .form-container {
          background: white;
          width: 100%;
          max-width: 650px;
          max-height: 90vh;
          border-radius: 1.5rem;
          padding: 2rem;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          overflow-y: auto;
        }
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .sleek-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          background: #f8fafc;
          transition: all 0.2s;
          font-size: 1rem;
        }
        .sleek-input:focus {
          outline: none;
          border-color: #2563eb;
          background: white;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
        .btn-form-submit {
          background: #2563eb;
          color: white;
          font-weight: 700;
          padding: 1rem;
          border-radius: 0.75rem;
          border: none;
          width: 100%;
          transition: 0.2s;
        }
        .btn-form-submit:hover { background: #1d4ed8; }
        .btn-form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .internal-link-small {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 600;
          font-size: 0.85rem;
        }

        @media (max-width: 576px) {
          .form-container { padding: 1.5rem; border-radius: 1rem; }
          .form-header h3 { font-size: 1.25rem; }
        }
      `}</style>

      <div className="form-overlay" onClick={onClose}>
        <div className="form-container" onClick={(e) => e.stopPropagation()}>
          <div className="form-header">
            <h3 className="fw-bold text-slate-900 m-0">Request a Free Quote</h3>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold">First Name*</label>
                <input type="text" name="firstName" className="sleek-input" required value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Last Name*</label>
                <input type="text" name="lastName" className="sleek-input" required value={formData.lastName} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold">Phone Number*</label>
                <input type="tel" name="phone" className="sleek-input" required value={formData.phone} onChange={handleChange} placeholder="+971..." />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold">Your Email*</label>
                <input type="email" name="email" className="sleek-input" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Property Type</label>
                <select name="propertyType" className="sleek-input" value={formData.propertyType} onChange={handleChange}>
                  <option>Apartment</option>
                  <option>Villa/House</option>
                  <option>Penthouse</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Unit Type</label>
                <select name="unitType" className="sleek-input" value={formData.unitType} onChange={handleChange}>
                  <option>Studio</option>
                  <option>1 Bedroom</option>
                  <option>2 Bedrooms</option>
                  <option>3+ Bedrooms</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Location*</label>
                <input type="text" name="city" className="sleek-input" required value={formData.city} onChange={handleChange} placeholder="e.g. Dubai Marina" />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Size (sqft)</label>
                <input type="text" name="size" className="sleek-input" value={formData.size} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold">Additional Notes</label>
                <textarea name="notes" rows={2} className="sleek-input" value={formData.notes} onChange={handleChange} placeholder="Property details..." />
              </div>
            </div>

            {successMessage && (
              <div className={`alert mt-3 py-2 ${successMessage.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
                {successMessage}
              </div>
            )}

            <button type="submit" className="btn-form-submit mt-4" disabled={isSubmitting || !isEmailReady}>
              {isSubmitting ? "Sending..." : "Submit Property Details"}
            </button>
            
            <p className="text-center mt-3 text-muted mb-0" style={{ fontSize: '0.75rem' }}>
              By submitting, you agree to our <a href="https://booking.capitalstayuae.com/terms-and-conditions" className="internal-link-small">Terms</a> and <a href="https://booking.capitalstayuae.com/privacy-policy" className="internal-link-small">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default PropertyListingModal;