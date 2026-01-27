'use client';

import React, { useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
/**
 * TYPES
 */
interface Testimonial {
  id: string;
  text: string;
  name: string;
  image: string;
  stars: number;
  date: string; // ISO format for schema: YYYY-MM-DD
  link: string;
}

/**
 * DATA
 */
const AIRBNB_PROFILE_LINK = "https://www.airbnb.ae/users/show/551099812";
const PROFILE_IMAGE = "/assets/airbnb.webp";
const AIRBNB_LOGO = "/assets/airbnb.webp";

const testimonialsData: Testimonial[] = [
  {
    id: "ali-feb2025",
    text: "It was a great and seamless experience. Nice, clean and cozy apartment.",
    name: "Ali Raza",
    date: "2025-02-01",
    image: PROFILE_IMAGE,
    stars: 5,
    link: AIRBNB_PROFILE_LINK,
  },
  {
    id: "nayan-mar2025",
    text: "Really nice place.",
    name: "Nayan",
    date: "2025-03-01",
    image: PROFILE_IMAGE,
    stars: 4,
    link: AIRBNB_PROFILE_LINK,
  },
  {
    id: "gaurav-feb2025",
    text: "It was a good stay but some basic items were missing like dish washer, toaster. Rest all was good.",
    name: "Gaurav",
    date: "2025-02-15",
    image: PROFILE_IMAGE,
    stars: 5,
    link: AIRBNB_PROFILE_LINK,
  },
    {
    id: "falah-Jan2026",
    text: "its one of those places that you will fall in love with from first sight. 😍🥰✨ clean and quiet place not far a way from downtown but you need a car since they dont have a public transport close by. 🚗🛣️🅿️",
    name: "Falah",
    date: "2026-01-21",
    image: PROFILE_IMAGE,
    stars: 5,
    link: AIRBNB_PROFILE_LINK,
  },
  {
    id: "mahdi-jan2026",
    text: "Nice apartment and good located.",
    name: "Mahdi",
    date: "2026-01-24",
    image: PROFILE_IMAGE,
    stars: 5,
    link: AIRBNB_PROFILE_LINK,
  },
];


const StarRating: React.FC<{ stars: number }> = ({ stars }) => (
  <div className="flex gap-1 mt-2" aria-label={`${stars} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-xl ${i < stars ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ))}
  </div>
);

const TestimonialCard: React.FC<{ 
  testimonial: Testimonial; 
  onClick: (link: string) => void 
}> = ({ testimonial, onClick }) => (
  <article
    className="
      relative max-w-3xl mx-auto cursor-pointer p-8 sm:p-10 rounded-3xl 
      bg-white border border-gray-100 shadow-xl
      hover:shadow-2xl hover:scale-[1.01] transition-all duration-500
    "
    onClick={() => onClick(testimonial.link)}
  >
    <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
      {/* Profile Image Section */}
      <div className="relative shrink-0">
        <img
          src={testimonial.image}
          alt={`${testimonial.name}'s profile`}
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          loading="lazy"
        />
        <img
          src={AIRBNB_LOGO}
          alt="Verified Airbnb Review"
          className="absolute bottom-0 right-[-5px] w-8 h-8 rounded-full shadow-lg"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <div className="text-5xl text-red-500 font-serif leading-none mb-2 opacity-30">
          “
        </div>
        <p className="text-lg sm:text-xl text-gray-700 font-light tracking-wide italic mb-4 leading-relaxed">
          {testimonial.text}
        </p>

        <div className="mt-4">
          <StarRating stars={testimonial.stars} />
          <h4 className="mt-3 text-xl font-bold text-gray-900 uppercase tracking-tight">
            {testimonial.name}
          </h4>
          <time dateTime={testimonial.date} className="text-sm text-gray-500">
            {new Date(testimonial.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </time>
        </div>
      </div>
    </div>
  </article>
);

const Testimonials: React.FC = () => {
  const openLink = useCallback((link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  }, []);

  /**
   * AI & SEO Optimization: JSON-LD Schema
   * This generates a Review schema so Google/AI can index your ratings.
   */
  const schemaMarkup = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": testimonialsData.map((t, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": t.name
          },
          "datePublished": t.date,
          "reviewBody": t.text,
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": t.stars,
            "bestRating": "5"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Airbnb"
          }
        }
      }))
    };
  }, []);

  return (
    <section className="bg-gray-50 py-20 px-6 overflow-hidden">
      {/* Inject Schema for AI Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="container mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4 uppercase">
            What Our <span className="text-red-500">Guests Say</span>
          </h2>
          <div className="w-20 h-1.5 bg-red-500 mx-auto rounded-full"></div>
        </header>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-16"
        >
          {testimonialsData.map((t) => (
            <SwiperSlide key={t.id}>
              <TestimonialCard testimonial={t} onClick={openLink} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-12">
          <button
            onClick={() => openLink(AIRBNB_PROFILE_LINK)}
            className="
              bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-12 
              rounded-full shadow-xl hover:shadow-2xl transition-all duration-300
              hover:scale-105 active:scale-95 text-lg uppercase tracking-wider
            "
          >
            Leave Your Review on Airbnb ✨
          </button>
          <p className="text-gray-400 text-sm mt-4 font-medium uppercase tracking-widest">
            Verified Airbnb Host Since 2020
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

