import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
 
import {COMPLETE_PROPERTY_DATA} from "../lib/locations"; 
 
import { FaMapMarkerAlt, FaCheckCircle, FaMoneyBillWave, FaQuestionCircle, FaChevronDown } from "react-icons/fa";
import PageHeader from "../Pageheader/PageHeader";
 
const IconStyle = { width: '1.5rem', height: '1.5rem', strokeWidth: 1.5 };  

const IconCalendar = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props} style={{ ...IconStyle, ...props.style }}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

const IconUsers = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props} style={{ ...IconStyle, ...props.style }}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconSearch = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props} style={{ width: '1.25rem', height: '1.25rem', strokeWidth: 2, ...props.style }}>
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

// Helper to get today's date in YYYY-MM-DD format for minDate attribute
const getTodayString = () => new Date().toISOString().split('T')[0];

// --- Universal Date Input Renderer (Moved from LandingPage) ---
const DateInput = ({ id, label, value, onChange, minDate }) => {
    return (
        <div className="flex flex-col flex-grow">
            <label htmlFor={id} className="visually-hidden">{label} Date</label>
            <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
                <IconCalendar className="text-blue-500"/>
                <input
                    id={id}
                    type="date"
                    value={value}
                    onChange={onChange}
                    className="flex-grow border-none bg-transparent text-gray-800 focus:outline-none p-0 pr-1" // Added p-0 pr-1 to minimize default input padding/margin
                    required
                    min={minDate} 
                    placeholder={label}
                    style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }} // Ensure date picker appearance is controlled by CSS
                />
            </div>
        </div>
    );
};


// --- Booking Form Component (Integrated Logic from LandingPage) ---
const BookingForm = ({ propertyKey }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    const HOSTAWAY_BASE_URL = 'https://booking.capitalstayuae.com/search'; 

    const handleConversionClick = (destinationUrl) => {
        if (window.gtag) {
            window.gtag("event", "conversion", {
                send_to: "AW-17549947546/inhXCNCfvJgbEJrlu7BB",
                value: 1.0,
                currency: "AED",
                event_callback: () => { /* Fallback action */ },
            });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        
        const formattedCheckIn = checkIn;
        const formattedCheckOut = checkOut;

        const locationName = propertyKey; // Use the property key as the location/city slug

        if (!formattedCheckIn || !formattedCheckOut || !guests) {
            alert("Please select check-in, check-out dates, and number of guests.");
            return;
        }
        
        // Construct the base URL with dates and guests
        let searchUrl = `${HOSTAWAY_BASE_URL}?start=${formattedCheckIn}&end=${formattedCheckOut}&numberOfGuests=${guests}`;
        
        // Add the 'city' parameter using the current propertyKey (e.g., business-bay)
        searchUrl += `&city=${encodeURIComponent(locationName)}`;

        // 1. Open the search results in a new tab
        window.open(searchUrl, '_blank');
        
        // 2. Report conversion for tracking
        handleConversionClick(searchUrl); 
    };

    return (
        
        <div className="p-6 "> 
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3 leading-tight">
                Check Rates & Book
            </h2>
            
            {/* Hostaway Embed Placeholder */}
            <div className="mb-4 p-4 bg-blue-50 text-sm text-blue-800 rounded-lg border border-blue-200">
                <p className="font-semibold">Search here</p>
                <p>Search will target property area: {propertyKey.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
                
                {/* Date Inputs */}
                <div className="flex gap-3">
                    <DateInput
                        id="check-in"
                        label="Check-in"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        minDate={getTodayString()}
                    />
                    <DateInput
                        id="check-out"
                        label="Check-out"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        minDate={checkIn || getTodayString()} 
                    />
                </div>

                {/* Guests Input */}
                <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Number of Guests</label>
                    <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
                        <IconUsers className="text-blue-500"/>
                        <input
                            type="number"
                            id="guests"
                            name="guests"
                            min="1"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            required
                            placeholder="Guests"
                            className="flex-grow border-none bg-transparent text-gray-800 focus:outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center items-center py-3 px-4 rounded-lg  text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-150 space-x-2"
                >
                    <IconSearch style={{ width: '1.25rem', height: '1.25rem', strokeWidth: 2 }}/>
                    <span>Search Availability</span>
                </button>
            </form>
        </div>
    );
};


const PropertyDetails = () => {
    const { Slug } = useParams(); 
    const navigate = useNavigate();

    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const CONSTANT_PREFIX = "luxury-apartments-in-";
    
    const normalizedFullSlug = Slug?.toLowerCase().replace(/[^a-z0-9-]+/g, '-') || ''; 

    let propertyKey = normalizedFullSlug;
    if (normalizedFullSlug.startsWith(CONSTANT_PREFIX)) {
        propertyKey = normalizedFullSlug.substring(CONSTANT_PREFIX.length);
    }

 
    const rawPropertyData = COMPLETE_PROPERTY_DATA[propertyKey]; 
    
 
    if (!rawPropertyData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-center p-10 bg-white rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold text-red-600 mb-2">Property Not Found</h2>
                    <p className="text-gray-600 mt-2">
                        The property you are looking for does not exist.
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        (Attempted Key: {propertyKey})
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    // Data Mapping 
    const property = {
        id: propertyKey,
        title: rawPropertyData.title,
        location: propertyKey.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        category: rawPropertyData.meta_title.includes('Apartments') ? 'Luxury Apartments' : 'Premium Rental',
        introduction_paragraph: rawPropertyData.intro?.[0] || 'No introduction provided.',
        
        amenities_list: [
            "24/7 Concierge Services",
            "State-of-the-art Fitness Centers",
            "Private Swimming Pools",
            "Private Parking",
            "High-speed Wi-Fi",
            "Smart Home Systems",
        ],

        promotional_content: {
            why_choose_title: rawPropertyData.why_choose_title,
            why_choose_content: rawPropertyData.why_choose?.map(item => `• ${item.title}: ${item.content}`).join('\n') || '',
            what_to_expect_title: "What to Expect",
            what_to_expect_content: rawPropertyData.what_to_expect?.map(item => `• ${item.title}: ${item.content}`).join('\n') || '',
        },

        rental_costs_annual: rawPropertyData.costs?.reduce((acc, cost) => {
            const [label, ...rest] = cost.split(':');
            acc[label.trim()] = rest.join(':').trim();
            return acc;
        }, {}) || {},

        how_to_rent_steps: rawPropertyData.how_to_rent?.map((step, index) => ({
            step: index + 1,
            title: step.split(': ')[0],
            description: step.split(': ')[1] || step,
        })) || [],

        faqs: rawPropertyData.faqs?.map(faq => ({
            question: faq.question,
            answer: Array.isArray(faq.answer) ? faq.answer.join('\n') : faq.answer,
        })) || [],

        top_locations_featured: rawPropertyData.top_locations?.map(loc => loc.title) || [],
    };


    const breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Explore",  }, 
        { name: property.location, href: `/${Slug}` }, 
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER SECTION (Assuming PageHeader handles its own Tailwind) */}
            <PageHeader
                title={property.title}
                description={property.category}
                breadcrumbs={breadcrumbs}
                backgroundImage="../assets/listing.webp"
            />

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            
                {/* 2-COLUMN GRID */}
                <div className="lg:grid lg:grid-cols-3 lg:gap-10">

                    {/* LEFT COLUMN (Primary Content) */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* PROPERTY OVERVIEW */}
                        <div className=" e p-6 md:p-8 rounded-xl">
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Property Overview</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{property.introduction_paragraph}</p>
                        </div>

                        {/* PROMOTIONAL CONTENT (Gradient Card) */}
                        {property.promotional_content && (
                            <div className="p-6 md:p-8 rounded-xl bg-gradient-to-br from-blue-50 to-white">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{property.promotional_content.why_choose_title}</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{property.promotional_content.why_choose_content}</p>

                                <h3 className="text-xl font-bold text-blue-700 mt-6 mb-3">What to Expect</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{property.promotional_content.what_to_expect_content}</p>
                            </div>
                        )}

                        {/* AMENITIES */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">Essential Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {property.amenities_list.map((amenity, index) => (
                                    <div className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 transition" key={index}>
                                        <FaCheckCircle className="text-xl text-green-500 flex-shrink-0" />
                                        <span className="text-sm font-medium text-gray-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* HOW TO RENT STEPS */}
                        {property.how_to_rent_steps.length > 0 && (
                            <div className="  p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">How to Secure Your Rental</h2>
                                <ol className="space-y-6">
                                    {property.how_to_rent_steps.map((stepItem) => (
                                        <li key={stepItem.step} className="flex space-x-4 items-start">
                                            <span className="flex items-center justify-center w-8 h-8 font-bold text-white bg-blue-600 rounded-full flex-shrink-0 shadow-md">
                                                {stepItem.step}
                                            </span>
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-900">{stepItem.title}</h4>
                                                <p className="text-gray-600 mt-1">{stepItem.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}

                        {/* RENTAL COSTS */}
                        <div className=" p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                                <FaMoneyBillWave className="text-blue-500 text-2xl" />
                                <span>Annual Rental Costs</span>
                            </h2>

                            <div className="divide-y divide-gray-200">
                                {Object.entries(property.rental_costs_annual).map(([label, cost], i, arr) => (
                                    <div className={`flex justify-between py-4 ${i === arr.length - 1 ? 'border-b border-blue-500' : ''}`} key={label}>
                                        <span className="text-lg font-medium text-gray-600">{label.replace(/_/g, " ")}</span>
                                        <span className="text-sm  text-gray-900">{cost}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* FAQs (Improved Accordion) */}
                        {property.faqs.length > 0 && (
                            <div className=" p-6 md:p-8 rounded-xl">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3 border-l-4 border-blue-500 pl-3">
                                    <FaQuestionCircle className="text-blue-500 text-xl" />
                                    <span>Quick FAQs</span>
                                </h2>
                                <div className="space-y-3">
                                    {property.faqs.map((faq, index) => (
                                        <div 
                                            key={index} 
                                            className={`rounded-lg overflow-hidden border ${openFaqIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                                        >
                                            <div 
                                                className="flex justify-between items-center p-4 cursor-pointer" 
                                                onClick={() => toggleFaq(index)}
                                            >
                                                <p className={`text-base font-semibold ${openFaqIndex === index ? 'text-blue-800' : 'text-gray-800'}`}>
                                                    Q: {faq.question}
                                                </p>
                                                <FaChevronDown className={`text-lg transition-transform duration-300 ${openFaqIndex === index ? 'transform rotate-180 text-blue-600' : 'text-gray-500'}`} />
                                            </div>
                                            <div 
                                                className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-96 opacity-100 p-4 pt-0' : 'max-h-0 opacity-0'}`}
                                            >
                                                <p className="text-gray-600 whitespace-pre-wrap border-t border-gray-200 pt-4">A: {faq.answer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN (Booking Form + Nearby) */}
                    <div className="lg:col-span-1 mt-10 lg:mt-0 space-y-10">

                        {/* NEW BOOKING FORM (Using logic moved from LandingPage) */}
                        <BookingForm propertyKey={propertyKey} />

                        {/* TOP LOCATIONS */}
                        {property.top_locations_featured.length > 0 && (
                            <div className="p-6 rounded-xl ">
                                <h2 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-blue-500 pl-3">Top Locations Nearby</h2>

                                <ul className="space-y-3">
                                    {property.top_locations_featured.map((loc, index) => (
                                        <li className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 transition hover:bg-gray-100" key={index}>
                                            <FaMapMarkerAlt className="text-blue-500 text-lg flex-shrink-0" />
                                            <span className="text-base font-medium text-gray-700">
                                                {loc}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;