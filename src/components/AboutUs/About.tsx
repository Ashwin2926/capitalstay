import  { type FC, useEffect, useRef, memo } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

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
        className="relative rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_20px_-8px_rgba(15,23,42,0.12)]"
        variants={fadeInUp}
        custom={delay}
      >
        <div className="text-2xl md:text-[1.75rem] font-extrabold text-blue-600 leading-none">
          {rawNumber !== null ? <motion.span>{formatted}</motion.span> : value}
        </div>

        <p className="mt-1.5 text-xs text-gray-500 tracking-wide leading-snug">
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
      className="relative bg-white font-sans pt-24 pb-16 md:pt-28 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Ambient background accent — anchors the section instead of a flat white void */}
      <div className="pointer-events-none absolute -top-24 -left-32 w-[420px] h-[420px] rounded-full bg-blue-50 blur-3xl opacity-70" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-amber-50 blur-3xl opacity-60" />

      <motion.div
        className="relative max-w-7xl mx-auto px-4"
        variants={sectionFade}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <motion.p
              className="flex items-center gap-2 text-blue-600 uppercase tracking-widest text-xs font-semibold mb-3"
              variants={fadeInUp}
              custom={0.1}
            >
              <span className="w-6 h-px bg-blue-600" />
              About Capital Stay
            </motion.p>

            <motion.h2
              id="about-heading"
              className="font-display text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-4 leading-[1.15]"
              variants={fadeInUp}
              custom={0.2}
            >
              Our commitment to{" "}
              <em className="italic text-blue-600">luxury rentals</em>
            </motion.h2>

            <motion.p
              className="text-base leading-relaxed text-gray-600 mb-8 max-w-lg"
              variants={fadeInUp}
              custom={0.3}
            >
              Capital Stay is{" "}
              <Link
                to="https://booking.capitalstayuae.com/search"
                className="text-blue-600 font-medium hover:underline"
              >
                Dubai’s Premium short-term rental expert
              </Link>
              , helping property owners maximize revenue while delivering
              five-star hospitality experiences to guests worldwide.
            </motion.p>

            <div className="grid grid-cols-2 gap-4">
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
            className="relative"
            variants={fadeInUp}
            custom={0.4}
          >
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.25)] ring-1 ring-black/5">
              <motion.img
                src="/assets/dining.webp"
                alt="Furnished luxury living room managed by Capital Stay UAE in Dubai"
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-cover aspect-[4/3]"
                initial={{ scale: 1.05 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating trust badge — reuses the site's existing DTCM-licensed claim, not a fabricated stat */}
            <motion.div
              className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-white rounded-2xl shadow-[0_20px_40px_-12px_rgba(15,23,42,0.25)] border border-gray-100 px-5 py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-none">DTCM Licensed</p>
                <p className="text-xs text-gray-500 mt-1">Fully compliant holiday home operator</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
