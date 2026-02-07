 
import {
  Package,
  Home,
  LayoutGrid,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../Pageheader/PageHeader";
import { Helmet } from "react-helmet-async";

// -------------------- DATA --------------------
const FEATURES = [
  {
    title: "Concept Development",
    icon: LayoutGrid,
    desc: "A tailored interior vision aligned with your property’s architecture and target guest profile.",
  },
  {
    title: "Sourcing & Procurement",
    icon: Package,
    desc: "Exclusive access to premium furniture, lighting, and finishes from trusted suppliers.",
  },
  {
    title: "White-Glove Installation",
    icon: Home,
    desc: "End-to-end delivery, assembly, styling, and quality control with minimal disruption.",
  },
  {
    title: "Client Collaboration",
    icon: Users,
    desc: "Transparent communication and approvals at every stage for complete confidence.",
  },
];

const PROCESS = [
  "Initial Consultation & Brief",
  "Design Concept & Mood Boards",
  "Furniture Sourcing & Budgeting",
  "Delivery & Installation",
  "Final Styling & Walkthrough",
];
/* --- SEO & AI SEARCH ENHANCEMENTS --- */
const FurnishingSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Luxury Property Furnishing & Interior Curation",
    "description": "Professional furnishing services for Dubai holiday homes. We transform properties into high-yield short-term rentals using data-backed interior design to increase nightly rates and guest reviews.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Capital Stay",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Furnishing Packages",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Concept Development & Mood Boards" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Furniture Procurement & Sourcing" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "White-Glove Installation & Styling" }}
      ]
    }
  };
  return (
    <Helmet>
      <title>Luxury Property Furnishing Dubai | High-Yield Interior Curation</title>
      <meta name="description" content="Elevate your Dubai property's ROI with Capital Stay's furnishing services. Bespoke interior design tailored for Airbnb, Booking.com, and luxury short-term rentals." />
      <meta name="keywords" content="Dubai holiday home furnishing, Airbnb interior design Dubai, short term rental furniture packages, property staging Dubai, luxury apartment curation" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// -------------------- COMPONENT --------------------
const FurnishingPage = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/#contact");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white text-black pb-24 font-sans">
      <FurnishingSchema />
      <PageHeader
        title="Luxury Property Interior Curation"
        description="Premium furnishing solutions designed to elevate short-term rental performance and guest experience."
        backgroundImage="../assets/furniture2.webp"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Landlord Services", href: "/landlord-services" },
          { name: "Furnishing", href: "/furnishing" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* INTRO */}
        <section className="text-center mt-20 mb-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-blue-600">Capital Stay</span> Furnishing Service
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our furnishing service transforms properties into high-performing luxury rentals.
            Many clients combine this with our{" "}
            <Link
              to="/landlord-services/property-management"
              className="text-blue-600 font-semibold hover:underline"
            >
              full-service property management
            </Link>{" "}
            for a completely hands-off experience.
          </p>
        </section>

        {/* HERO IMAGE */}
        <section className="relative h-[340px] md:h-[480px] rounded-3xl overflow-hidden mb-28 group">
          <img
            src="../assets/furniture.webp"
            alt="Luxury furnished interior"
            className="w-full h-full object-cover brightness-75 scale-100 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-10">
            <h2 className="text-white text-4xl md:text-6xl font-bold uppercase tracking-wide">
              Designed for Higher Returns
            </h2>
          </div>
        </section>

        {/* WHO IT’S FOR */}
        <section className="mb-28">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Who This Service Is For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Short-Term Rental Owners",
              "Property Investors",
              "Developers & Landlords",
            ].map((item, i) => (
              <div
                key={i}
                className="group p-10 bg-gray-50 border border-gray-200 rounded-3xl text-center transition-all duration-300 hover:bg-white hover:border-blue-600 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-200/40"
              >
                <h3 className="font-bold text-xl mb-4">{item}</h3>
                <p className="text-gray-600 text-sm">
                  Increase booking appeal, nightly rates, and long-term asset value.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="mb-28">
          <h2 className="text-3xl font-bold mb-14 text-center">
            Our Furnishing Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {PROCESS.map((step, i) => (
              <div
                key={i}
                className="relative bg-white border border-gray-200 rounded-2xl p-6 text-center transition hover:border-blue-600 hover:shadow-lg"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <p className="mt-6 text-sm font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((item, index) => (
              <div
                key={index}
                className="group bg-gray-50 p-8 rounded-3xl border border-gray-200 transition-all duration-300 hover:bg-white hover:border-blue-600 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-200/40"
              >
                <item.icon
                  size={40}
                  className="text-blue-600 mb-5 transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* INTEGRATED SERVICES */}
        <section className="mb-28 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-[2.5rem] p-14">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Integrated Landlord Services
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Furnishing performs best when integrated into a complete property ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Property Management", link: "/landlord-services/property-management" },
              { name: "Short-Term Rental Setup", link: "https://booking.capitalstayuae.com/" },
              { name: "Guest Services", link: "/services" },
            ].map((service, i) => (
              <Link
                key={i}
                to={service.link}
                className="group bg-white border border-gray-200 rounded-2xl p-8 text-center font-semibold transition hover:border-blue-600 hover:-translate-y-1 hover:shadow-lg"
              >
                {service.name}
                <ArrowRight className="mx-auto mt-4 text-blue-600 opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
          </div>
        </section>

        {/* ROI */}
        <section className="mb-28 text-center">
          <h2 className="text-3xl font-bold mb-14">Why Furnishing Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              "Higher Nightly Rates",
              "Faster Bookings",
              "Stronger Guest Reviews",
              "Premium Brand Perception",
            ].map((item, i) => (
              <div key={i} className="p-6">
                <CheckCircle className="mx-auto text-blue-600 mb-4" size={40} />
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-[2.5rem] p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Furnish Your Property?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            Speak with our consultants to design a furnishing solution that increases
            revenue and guest satisfaction.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={handleContactClick}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition inline-flex items-center gap-2"
            >
              Contact Us <ArrowRight size={20} />
            </button>

            <Link
              to="/landlord-services/property-management"
              className="px-10 py-4 rounded-xl border border-gray-300 font-bold text-lg hover:border-blue-600 hover:text-blue-600 hover:-translate-y-0.5 transition"
            >
              View All Landlord Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FurnishingPage;
