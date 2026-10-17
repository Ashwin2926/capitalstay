import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");

const faqs = [
  {
    question: "What premium services does Capital Stay provide across Dubai?",
    answer: `Capital Stay offers end-to-end luxury
    <a href="https://booking.capitalstayuae.com/">vacation rentals</a>
    and property management throughout Dubai. Whether you are in Business Bay, Al Barsha, or
    <a href="/luxury-apartments-in-dubai-marina">Dubai Marina</a>, guests enjoy 5-star amenities including
    high-speed Wi-Fi, professional housekeeping, 24/7 guest support, and access to premium facilities
    like infinity pools and gyms. For owners, we provide DTCM-licensed management and ROI optimization.`,
  },
  {
    question: "Where can I find Capital Stay holiday homes in Dubai?",
    answer: `We provide luxury holiday homes across Dubai’s most popular residential and business hubs,
    including Downtown Dubai, Business Bay, and
    <a href="/luxury-apartments-in-dubai-marina">Dubai Marina</a>.
    Our portfolio also extends to Abu Dhabi, Sharjah, and Ras Al Khaimah.`,
  },
  {
    question: "What are the typical rental costs for luxury apartments in Dubai?",
    answer: `Rental prices vary by district and apartment type. For example:
    • Al Barsha / Business Bay: One-bedrooms typically range from AED 90,000 to AED 150,000 annually.
    • Al Furjan / JLT: One-bedrooms range from AED 100,000 to AED 150,000.
    • Northern Emirates: Competitive rates starting from AED 45,000 in Ras Al Khaimah.
    Contact us for real-time daily or monthly
    <a href="https://booking.capitalstayuae.com/">short-term rental rates</a>.`,
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

const FAQSchema = () => (
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
);

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-slate-50 py-14 px-4" aria-labelledby="faq-heading">
      <FAQSchema />

      <div className="max-w-3xl mx-auto">
        <p className="text-center text-blue-600 uppercase tracking-[0.2em] text-xs font-semibold mb-3">FAQ</p>
        <h2 id="faq-heading" className="font-display text-3xl md:text-4xl font-medium text-center text-gray-900 mb-3 tracking-tight">
          Frequently asked questions
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Everything you need to know about luxury stays across the UAE.
        </p>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <span className="font-semibold text-sm text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`shrink-0 text-blue-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    size={20}
                    aria-hidden
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 pb-5 text-sm text-gray-600 leading-relaxed [&_a]:text-blue-600 [&_a]:font-medium [&_a]:hover:underline whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
