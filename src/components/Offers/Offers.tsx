import { Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Offers.css";

 
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");

function FAQ() {
  const faqs = [
    {
      question: "What premium services does Capital Stay provide across Dubai?",
      answer: `Capital Stay offers end-to-end luxury 
      <a href="/vacation-rentals-dubai">vacation rentals</a> 
      and property management throughout Dubai. Whether you are in Business Bay, Al Barsha, or 
      <a href="/dubai-marina-holiday-homes">Dubai Marina</a>, guests enjoy 5-star amenities including 
      high-speed Wi-Fi, professional housekeeping, 24/7 guest support, and access to premium facilities 
      like infinity pools and gyms. For owners, we provide DTCM-licensed management and ROI optimization.`,
    },
    {
      question: "Where can I find Capital Stay holiday homes in Dubai?",
      answer: `We provide luxury holiday homes across Dubai’s most popular residential and business hubs, 
      including Downtown Dubai, Business Bay, and 
      <a href="/dubai-marina-holiday-homes">Dubai Marina</a>. 
      Our portfolio also extends to Abu Dhabi, Sharjah, and Ras Al Khaimah.`,
    },
    {
      question: "What are the typical rental costs for luxury apartments in Dubai?",
      answer: `Rental prices vary by district and apartment type. For example:
      • Al Barsha / Business Bay: One-bedrooms typically range from AED 90,000 to AED 150,000 annually.
      • Al Furjan / JLT: One-bedrooms range from AED 100,000 to AED 150,000.
      • Northern Emirates: Competitive rates starting from AED 45,000 in Ras Al Khaimah.
      Contact us for real-time daily or monthly 
      <a href="/short-term-rentals-dubai">short-term rental rates</a>.`,
    },
    {
      question: "What amenities are included in a Capital Stay holiday home?",
      answer: `Every apartment is curated to hotel standards. Guests can expect 24/7 concierge services, 
      fully-equipped kitchens, smart home technology, private parking, and high-quality linens. 
      Most buildings include fitness centers and swimming pools.`,
    },
    {
      question: "Are your apartments pet-friendly or suitable for families?",
      answer: `Yes! We offer family-friendly apartments in quieter residential communities across Dubai. 
      Pet policies vary by building, so please contact our team to confirm availability.`,
    },
    {
      question: "How do I book a viewing or a rental stay?",
      answer: `The process is simple:
      1. Browse our listings online.
      2. Contact us to schedule a viewing or confirm dates.
      3. Finalize your booking through our secure platform.
      4. Move in and enjoy your stay.`,
    },
  ];

  return (
    <div className="faq-section py-5 bg-light">
      <Helmet>
        <title>Dubai Holiday Home FAQs | All-Location Rental Guide | Capital Stay</title>
        <meta
          name="description"
          content="Find answers about luxury rentals across Dubai. Learn about prices, amenities, locations, and professional holiday home management by Capital Stay."
        />

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: stripHtml(faq.answer),
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="container">
        <h2 className="text-black fw-bold text-center mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-muted mb-5">
          Everything you need to know about luxury stays across the UAE.
        </p>

        <Accordion className="custom-faq-accordion">
          {faqs.map((faq, index) => (
            <Accordion.Item
              eventKey={index.toString()}
              key={index}
              className="mb-3 border-0 shadow-sm"
            >
              <Accordion.Header className="fw-semibold">
                {faq.question}
              </Accordion.Header>
              <Accordion.Body
                className="text-secondary"
                style={{ lineHeight: "1.7" }}
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FAQ;
