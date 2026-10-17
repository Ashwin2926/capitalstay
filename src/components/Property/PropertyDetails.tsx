import React from "react";
import { useParams } from "react-router-dom";
import { COMPLETE_PROPERTY_DATA } from "../lib/locations"; 
import { FaMapMarkerAlt, FaCheckCircle, FaMoneyBillWave, FaChevronDown, FaInfoCircle, FaStar, FaKey, FaCompass } from "react-icons/fa";
import PageHeader from "../Pageheader/PageHeader";
import MobileRail from "../ui/MobileRail";
import ReadMore from "../ui/ReadMore";
import NotFound from "../NotFound";
import Seo from "../Seo";
import { SITE_URL, ORGANIZATION_ID } from "../lib/seo";

// --- Interfaces for Type Safety ---

interface RawProperty {
    title: string;
    meta_title: string;
    meta_description?: string;
    category?: string; // Used for PageHeader description
    intro?: string[];
    why_choose_title?: string;
    why_choose?: { title: string; content: string }[];
    what_to_expect?: { title: string; content: string }[];
    costs?: string[];
    how_to_rent?: string[];
    faqs?: { question: string; answer: string | string[] }[];
    top_locations?: { title: string; content?: string }[];
    discover?: string[];
}

const PropertyDetails: React.FC = () => {
const { propertyKey } = useParams<{ propertyKey: string }>();
    
    // 1. Define your constant prefix
    const CONSTANT_PREFIX = "luxury-apartments-in-";

    // 2. Extract the neighborhood name from the URL
    // This converts the URL to lowercase and removes the prefix
    const cleanKey = propertyKey
        ?.toLowerCase()
        .replace(CONSTANT_PREFIX.toLowerCase(), "");

    // 3. Retrieve data from locations.ts using the cleaned key
    const property = cleanKey ? (COMPLETE_PROPERTY_DATA as Record<string, RawProperty>)[cleanKey] : null;

    if (!property) {
        return <NotFound />;
    }

    const pagePath = `/${CONSTANT_PREFIX}${cleanKey}`;
    const areaName = cleanKey!.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const pageUrl = `${SITE_URL}${pagePath}`;

    // Original Logic for Breadcrumbs
    const breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Locations", href: "/" },
        { name: cleanKey?.replace(/-/g, " ") || "Details", href: pagePath },
    ];

    // AI Search Schema (JSON-LD) - Dynamic for every neighborhood
    const structuredData = [
        {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            "url": pageUrl,
            "name": property.meta_title,
            "description": property.meta_description,
            "about": {
                "@type": "Place",
                "name": areaName,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": areaName,
                    "addressCountry": "AE"
                }
            },
            "publisher": { "@id": ORGANIZATION_ID }
        },
        {
            "@type": "Service",
            "name": `Luxury holiday home rentals in ${areaName}`,
            "serviceType": "Short-term holiday home rental",
            "provider": { "@id": ORGANIZATION_ID },
            "areaServed": { "@type": "Place", "name": areaName },
            "url": pageUrl
        },
        ...(property.faqs?.length
            ? [{
                "@type": "FAQPage",
                "mainEntity": property.faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": Array.isArray(faq.answer) ? faq.answer.join(" ") : faq.answer
                    }
                }))
            }]
            : [])
    ];

    return (
        <div className="bg-[#fcfcfc] min-h-screen font-sans">
            <Seo
                title={property.meta_title}
                description={property.meta_description ?? property.title}
                path={pagePath}
                jsonLd={structuredData}
            />

            {/* RESTORED ORIGINAL PAGEHEADER LOGIC */}
            <PageHeader
                title={property.title}
                description={property.category || "Luxury Holiday Home Rentals"}
                breadcrumbs={breadcrumbs}
                backgroundImage="../assets/listing.webp"
            />

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* MAIN CONTENT */}
                    <div className="lg:col-span-2 min-w-0 space-y-12 md:space-y-16">
                        
                        {/* Intro Section */}
                        <section className="bg-white p-6 md:p-8 rounded-[1.75rem] shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6 text-blue-600">
                                <FaInfoCircle className="text-xl" />
                                <span className="font-bold uppercase tracking-widest text-[10px]">Overview</span>
                            </div>
                            <ReadMore collapsedHeight={170}>
                                {property.intro?.map((para, i) => (
                                    <p key={i} className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 last:mb-0">
                                        {para}
                                    </p>
                                ))}
                            </ReadMore>
                        </section>

                        {/* Why Choose Section */}
                        {property.why_choose && (
                            <section>
                                <h2 className="text-2xl font-black text-gray-900 mb-6">{property.why_choose_title}</h2>
                                <MobileRail label={property.why_choose_title ?? "Why choose"} desktopClassName="md:grid-cols-2 md:gap-6" slideClassName="w-[80%] sm:w-[46%]">
                                    {property.why_choose.map((item, i) => (
                                        <div key={i} className="p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center gap-3 mb-4">
                                                <FaCheckCircle className="text-blue-600" />
                                                <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                                            </div>
                                            <ReadMore collapsedHeight={112}>
                                                <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                                            </ReadMore>
                                        </div>
                                    ))}
                                </MobileRail>
                            </section>
                        )}

                        {/* What to Expect Section */}
                        {property.what_to_expect && (
                            <section className="space-y-8">
                                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <FaStar className="text-yellow-400" /> What to Expect
                                </h2>
                                <MobileRail label="What to expect" desktopClassName="md:grid-cols-1 md:gap-6" slideClassName="w-[80%] sm:w-[46%]">
                                    {property.what_to_expect.map((item, i) => (
                                        <div key={i} className="flex gap-6 items-start bg-gray-50 p-6 rounded-2xl max-md:flex-col max-md:gap-4">
                                            <div className="h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-full flex-shrink-0 font-bold">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                                <p className="text-gray-600 leading-relaxed max-md:text-sm">{item.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </MobileRail>
                            </section>
                        )}

                        {/* Costs Section */}
                        {property.costs && (
                            <section className="bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-10 text-white relative overflow-hidden shadow-2xl">
                                <div className="relative z-10">
                                    <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-3">
                                        <FaMoneyBillWave className="text-blue-400" /> Market Rates & Estimates
                                    </h2>
                                    <div className="grid grid-cols-2 gap-2.5 md:gap-4">
                                        {property.costs.map((cost, i) => (
                                            <div key={i} className="p-3.5 md:p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md font-medium text-blue-50 text-[13px] leading-snug md:text-base">
                                                {cost}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20" />
                            </section>
                        )}

                        {/* How to Rent Section */}
                        {property.how_to_rent && (
                            <section className="bg-blue-50 p-5 md:p-8 rounded-[1.75rem] border border-blue-100 overflow-hidden">
                                <h2 className="text-2xl font-black text-blue-900 mb-6 md:mb-8 flex items-center gap-3">
                                    <FaKey className="text-blue-600" /> Booking Process
                                </h2>
                                <MobileRail label="Booking process" desktopClassName="md:grid-cols-1 md:gap-4" slideClassName="w-[72%] sm:w-[46%]">
                                    {property.how_to_rent.map((step, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-blue-50 max-md:flex-col max-md:items-start max-md:gap-2">
                                            <span className="text-blue-600 font-black max-md:font-display max-md:text-3xl max-md:font-medium">0{i + 1}</span>
                                            <p className="text-gray-700 font-semibold max-md:text-sm">{step}</p>
                                        </div>
                                    ))}
                                </MobileRail>
                            </section>
                        )}

                        {/* FAQs Section */}
                        {property.faqs && (
                            <section className="space-y-8">
                                <h2 className="text-2xl font-black text-gray-900">Neighborhood FAQs</h2>
                                <div className="space-y-4">
                                    {property.faqs.map((faq, i) => (
                                        <details key={i} className="group bg-white rounded-2xl border border-gray-200 transition-all">
                                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-gray-800 text-lg">
                                                {faq.question}
                                                <FaChevronDown className="transition-transform group-open:rotate-180 text-blue-500" />
                                            </summary>
                                            <div className="px-6 pb-6 text-gray-600 border-t border-gray-50 pt-5 leading-relaxed">
                                                {Array.isArray(faq.answer) ? (
                                                    <ul className="space-y-3">
                                                        {faq.answer.map((ans, idx) => <li key={idx} className="flex gap-2"><span>•</span> {ans}</li>)}
                                                    </ul>
                                                ) : <p>{faq.answer}</p>}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* SIDEBAR */}
                    <aside className="lg:col-span-1 min-w-0 space-y-8">
                        {/* Discover / Insights */}
                        {property.discover && (
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                    <FaCompass className="text-blue-500" /> Local Insights
                                </h3>
                                {property.discover.map((text, i) => (
                                    <p key={i} className="text-gray-500 text-sm italic leading-relaxed mb-4 last:mb-0">
                                        "{text}"
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Top Locations Sidebar */}
                        {property.top_locations && (
                            <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-xl sticky top-24">
                                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-red-500" /> Major Hubs Nearby
                                </h3>
                                <div className="space-y-6">
                                    {property.top_locations.map((loc, i) => (
                                        <div key={i} className="border-l-2 border-blue-500 pl-4">
                                            <h4 className="font-bold text-blue-50 text-sm mb-1">{loc.title}</h4>
                                            {loc.content && <p className="text-gray-400 text-xs">{loc.content}</p>}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-12">
                                    <a 
                                        href="https://booking.capitalstayuae.com" 
                                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all shadow-lg"
                                    >
                                        BOOK YOUR STAY
                                    </a>
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;