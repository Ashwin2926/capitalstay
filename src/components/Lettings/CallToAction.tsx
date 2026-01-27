import React, { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

/* -----------------------------------------------------
   Global EmailJS typing
----------------------------------------------------- */
declare global {
  interface Window {
    emailjs?: {
      init: (publicKey: string) => void;
      send: (
        serviceID: string,
        templateID: string,
        templateParams: object
      ) => Promise<{ status: number; text: string }>;
    };
  }
}

/* -----------------------------------------------------
   Visual Styles (Scoped)
----------------------------------------------------- */
const ScopedStyles = () => (
  <style>{`
    .cta-container {
      position: relative;
      padding: 100px 0;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 450px;
    }
    .cta-container::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 58, 138, 0.7));
      z-index: 1;
    }
    .cta-container .container { position: relative; z-index: 2; }
    
    .btn-cta-premium {
      background: #2563eb;
      color: white;
      padding: 1rem 2.5rem;
      border-radius: 999px;
      font-weight: 800;
      font-size: 1.1rem;
      border: none;
      transition: all 0.3s ease;
      box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
      margin-top: 1.5rem;
    }
    .btn-cta-premium:hover {
      background: #1d4ed8;
      transform: translateY(-3px);
      box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.4);
    }

    /* Form Styles */
    .form-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow-y: auto;
    }
    .form-container {
      background: white;
      width: 100%;
      max-width: 650px;
      border-radius: 1.5rem;
      padding: 2.5rem;
      position: relative;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .sleek-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
      background: #f8fafc;
      transition: all 0.2s;
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
      transition: 0.2s;
    }
    .btn-form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    
    body.modal-open { overflow: hidden; }

    .internal-link-small {
      color: #2563eb;
      text-decoration: underline;
      font-weight: 600;
      font-size: 0.85rem;
    }
  `}</style>
);

/* -----------------------------------------------------
   Types & Helper
----------------------------------------------------- */
interface CallToActionProps {
  showForm: boolean;
  toggleForm: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  propertyType: string;
  unitType: string;
  city: string;
  size: string;
  notes: string;
}

const loadEmailJSScript = (onLoadCallback: () => void): void => {
  if (window.emailjs) {
    onLoadCallback();
    return;
  }
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
  script.async = true;
  script.onload = onLoadCallback;
  document.head.appendChild(script);
};

const image = "/assets/listing.webp";

/* -----------------------------------------------------
   Component
----------------------------------------------------- */
const CallToAction: React.FC<CallToActionProps> = ({ showForm, toggleForm }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    propertyType: "Apartment",
    unitType: "1 Bedroom",
    city: "",
    size: "",
    notes: ""
  });

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEmailJSApiReady, setIsEmailJSApiReady] = useState<boolean>(false);

  /* -----------------------------------------------------
     SEO + AI Search Readiness
  ----------------------------------------------------- */
  useEffect(() => {
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Property Listing Request",
      "description": "Request a free rental income valuation for your Dubai property.",
      "mainEntity": {
        "@type": "Question",
        "name": "How to list my property in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fill out the Capital Stay UAE form to receive a professional holiday home management quote."
        }
      }
    });
    document.head.appendChild(schema);
    return () => { document.head.removeChild(schema); };
  }, []);

  useEffect(() => {
    loadEmailJSScript(() => {
      setIsEmailJSApiReady(true);
      window.emailjs?.init("jzU3ljJnmjWkLjbkh");
    });
    document.body.classList.toggle("modal-open", showForm);
  }, [showForm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailJSApiReady || !window.emailjs) return;
    setIsSubmitting(true);

    window.emailjs
      .send("service_6we7wug", "template_f03j55f", formData)
      .then(() => {
        setSuccessMessage("Your request has been submitted successfully!");
        setTimeout(() => {
          toggleForm();
          setSuccessMessage("");
          navigate(0);
        }, 2500);
      })
      .catch((err) => setSuccessMessage(`Error: ${err?.text || "Failed to send."}`))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <ScopedStyles />

      <section
        className="cta-container container-fluid"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="container text-center text-white">
          <h2 className="display-5 font-black mb-3">
            Rent Your Property Confidently with Capital Stay
          </h2>
          <p className="lead mb-4 opacity-90">
            Professional <Link to="/management" className="text-white fw-bold">property management</Link> with 24/7 support and higher returns.
          </p>
          <button
            className="btn btn-cta-premium"
            onClick={toggleForm}
          >
            List Your Property
          </button>
        </div>
      </section>

      {showForm && (
        <div className="form-overlay" role="dialog" onClick={toggleForm}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <div className="form-header">
              <h3 className="fw-bold text-slate-900">Request a Free Quote</h3>
              <button type="button" className="btn-close" onClick={toggleForm} />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">First Name*</label>
                  <input type="text" name="firstName" className="sleek-input" required value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Last Name*</label>
                  <input type="text" name="lastName" className="sleek-input" required value={formData.lastName} onChange={handleChange} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Phone Number*</label>
                <input type="tel" name="phone" className="sleek-input" required value={formData.phone} onChange={handleChange} placeholder="+971..." />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">Your Email*</label>
                <input type="email" name="email" className="sleek-input" required value={formData.email} onChange={handleChange} />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Property Type</label>
                  <select name="propertyType" className="sleek-input" value={formData.propertyType} onChange={handleChange}>
                    <option>Apartment</option>
                    <option>Villa/House</option>
                    <option>Penthouse</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Unit Type</label>
                  <select name="unitType" className="sleek-input" value={formData.unitType} onChange={handleChange}>
                    <option>Studio</option>
                    <option>1 Bedroom</option>
                    <option>2 Bedrooms</option>
                    <option>3+ Bedrooms</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Location (Area/City)*</label>
                  <input type="text" name="city" className="sleek-input" required value={formData.city} onChange={handleChange} placeholder="e.g. Dubai Marina" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Approx. Size (sqft)</label>
                  <input type="text" name="size" className="sleek-input" value={formData.size} onChange={handleChange} />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold">Additional Notes</label>
                <textarea name="notes" rows={3} className="sleek-input" value={formData.notes} onChange={handleChange} placeholder="Tell us about your property..." />
              </div>

              {successMessage && (
                <div className={`alert py-2 ${successMessage.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
                  {successMessage}
                </div>
              )}

              <button type="submit" className="btn btn-form-submit w-100" disabled={isSubmitting || !isEmailJSApiReady}>
                {isSubmitting ? "Sending..." : "Receive My Free Valuation"}
              </button>
              
              <p className="text-center mt-3 text-muted" style={{ fontSize: '0.75rem' }}>
                By submitting, you agree to our <a href="https://booking.capitalstayuae.com/terms-and-conditions" className="internal-link-small">Terms</a> and <a href="https://booking.capitalstayuae.com/privacy-policy" className="internal-link-small">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CallToAction;