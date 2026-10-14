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
          max-width: 580px;
          max-height: 90vh;
          border-radius: 1.25rem;
          padding: 1.75rem;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          overflow-y: auto;
        }
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.1rem;
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
            <h3 className="font-bold text-slate-900 text-xl m-0">Request a Free Quote</h3>
            <button type="button" onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition text-xl leading-none">
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="lp-firstName" className="block text-sm font-bold mb-1.5">First Name*</label>
                <input type="text" id="lp-firstName" name="firstName" className="sleek-input" required value={formData.firstName} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="lp-lastName" className="block text-sm font-bold mb-1.5">Last Name*</label>
                <input type="text" id="lp-lastName" name="lastName" className="sleek-input" required value={formData.lastName} onChange={handleChange} />
              </div>
            </div>
            <div>
              <label htmlFor="lp-phone" className="block text-sm font-bold mb-1.5">Phone Number*</label>
              <input type="tel" id="lp-phone" name="phone" className="sleek-input" required value={formData.phone} onChange={handleChange} placeholder="+971..." />
            </div>
            <div>
              <label htmlFor="lp-email" className="block text-sm font-bold mb-1.5">Your Email*</label>
              <input type="email" id="lp-email" name="email" className="sleek-input" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="lp-propertyType" className="block text-sm font-bold mb-1.5">Property Type</label>
                <select id="lp-propertyType" name="propertyType" className="sleek-input" value={formData.propertyType} onChange={handleChange}>
                  <option>Apartment</option>
                  <option>Villa/House</option>
                  <option>Penthouse</option>
                </select>
              </div>
              <div>
                <label htmlFor="lp-unitType" className="block text-sm font-bold mb-1.5">Unit Type</label>
                <select id="lp-unitType" name="unitType" className="sleek-input" value={formData.unitType} onChange={handleChange}>
                  <option>Studio</option>
                  <option>1 Bedroom</option>
                  <option>2 Bedrooms</option>
                  <option>3+ Bedrooms</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="lp-city" className="block text-sm font-bold mb-1.5">Location*</label>
                <input type="text" id="lp-city" name="city" className="sleek-input" required value={formData.city} onChange={handleChange} placeholder="e.g. Dubai Marina" />
              </div>
              <div>
                <label htmlFor="lp-size" className="block text-sm font-bold mb-1.5">Size (sqft)</label>
                <input type="text" id="lp-size" name="size" className="sleek-input" value={formData.size} onChange={handleChange} />
              </div>
            </div>
            <div>
              <label htmlFor="lp-notes" className="block text-sm font-bold mb-1.5">Additional Notes</label>
              <textarea id="lp-notes" name="notes" rows={2} className="sleek-input" value={formData.notes} onChange={handleChange} placeholder="Property details..." />
            </div>

            {successMessage && (
              <div className={`rounded-lg py-2 px-3 text-sm font-medium ${successMessage.startsWith("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                {successMessage}
              </div>
            )}

            <button type="submit" className="btn-form-submit" disabled={isSubmitting || !isEmailReady}>
              {isSubmitting ? "Sending..." : "Submit Property Details"}
            </button>

            <p className="text-center text-slate-500 mb-0" style={{ fontSize: '0.75rem' }}>
              By submitting, you agree to our <a href="https://booking.capitalstayuae.com/terms-and-conditions" className="internal-link-small">Terms</a> and <a href="https://booking.capitalstayuae.com/privacy-policy" className="internal-link-small">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default PropertyListingModal;