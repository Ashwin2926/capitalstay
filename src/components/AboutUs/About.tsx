import  { type FC, useEffect, useRef, memo } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

// ------------------------------------------------------
// Types
// ------------------------------------------------------
interface Metric {
  value: string;
  label: string;
}

interface AnimatedCountProps extends Metric {
  delay: number;
  inView: boolean;
}

// ------------------------------------------------------
// Metrics Data
// ------------------------------------------------------
const metricsData: Metric[] = [
  { value: "99%", label: "Guest Satisfaction Rate" },
  { value: "1000", label: "Nights Booked Annually" },
  { value: "24/7", label: "Dedicated Support" },
  { value: "5+", label: "Years Market Experience" }
];

// ------------------------------------------------------
// Animation Variants
// ------------------------------------------------------
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any
    }
  })
};

const sectionFade = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" } as any
  }
};

// ------------------------------------------------------
// Animated Metric (memoized)
// ------------------------------------------------------
const AnimatedCount = memo<AnimatedCountProps>(
  ({ value, label, delay, inView }) => {
    const isNumeric = /^[\d,+%]+$/.test(value) && !value.includes("/");
    const rawNumber = isNumeric ? Number(value.replace(/[^\d]/g, "")) : null;

    const suffix = value.endsWith("%") ? "%" : "";
    const plus = value.endsWith("+") ? "+" : "";

    const count = useSpring(0, { stiffness: 120, damping: 18 });

    const formatted = useTransform(count, (latest) =>
      rawNumber !== null
        ? `${Math.round(latest).toLocaleString()}${plus}${suffix}`
        : value
    );

    useEffect(() => {
      if (inView && rawNumber !== null) {
        count.set(rawNumber);
      }
    }, [inView, rawNumber, count]);

    return (
      <motion.div
        className="relative pt-6"
        variants={fadeInUp}
        custom={delay}
      >
        <span className="absolute top-0 left-0 w-10 h-1 bg-blue-600/20 rounded-full" />

        <div className="text-4xl md:text-5xl font-extrabold text-blue-600 leading-none">
          {rawNumber !== null ? <motion.span>{formatted}</motion.span> : value}
        </div>

        <p className="mt-2 text-sm text-gray-500 tracking-wide">
          {label}
        </p>
      </motion.div>
    );
  }
);

// ------------------------------------------------------
// AboutUs Component
// ------------------------------------------------------
const AboutUs: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  // --------------------------------------------------
  // Native SEO
  // --------------------------------------------------
  useEffect(() => {
    document.title =
      "Premier Property Management Dubai";

    const metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (metaDescription) {
      metaDescription.content =
        "Capital Stay UAE is Dubai’s leading luxury short-term rental and holiday home management company, delivering five-star guest experiences and maximum ROI for property owners.";
    }

    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (canonical) {
      canonical.href = "https://capitalstayuae.com/#about-us";
    }
  }, []);

  // --------------------------------------------------
  // AI / LLM Structured Data
  // --------------------------------------------------
useEffect(() => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Capital Stay UAE",
    url: "https://capitalstayuae.com",
    description:
      "Capital Stay UAE specializes in luxury short-term rental and holiday home management in Dubai.",
    areaServed: "Dubai, UAE",
    knowsAbout: [
      "Luxury short-term rentals Dubai",
      "Holiday home management UAE",
      "Airbnb property management Dubai",
      "Five-star guest experience"
    ]
  });

  document.head.appendChild(script);

  return () => {
    document.head.removeChild(script);
  };
}, []);


  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="bg-white font-sans py-20"
      aria-labelledby="about-heading"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4"
        variants={sectionFade}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <motion.p
              className="text-gray-500 uppercase tracking-widest text-sm mb-3"
              variants={fadeInUp}
              custom={0.1}
            >
              About Capital Stay
            </motion.p>

            <motion.h2
              id="about-heading"
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
              variants={fadeInUp}
              custom={0.2}
            >
              Our Commitment to{" "}
              <span className="text-blue-600">Luxury Rentals</span>
            </motion.h2>

            <motion.p
              className="text-lg leading-relaxed text-gray-600 mb-10"
              variants={fadeInUp}
              custom={0.3}
            >
              Capital Stay is{" "}
              <Link
                to="https://booking.capitalstayuae.com/search"
                className="text-blue-600 font-medium hover:underline"
              >
                Dubai’s premier short-term rental expert
              </Link>
              , helping property owners maximize revenue while delivering
              five-star hospitality experiences to guests worldwide.
            </motion.p>

            <div className="grid grid-cols-2 gap-x-12 gap-y-10 border-t border-gray-200 pt-8">
              {metricsData.map((metric, index) => (
                <AnimatedCount
                  key={metric.label}
                  {...metric}
                  delay={0.4 + index * 0.15}
                  inView={inView}
                />
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            variants={fadeInUp}
            custom={0.4}
          >
            <motion.img
              src="/assets/about.webp"
              alt="Luxury holiday homes managed by Capital Stay UAE in Dubai"
              fetchPriority="high" 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover aspect-[4/3]"
              initial={{ scale: 1.05 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
