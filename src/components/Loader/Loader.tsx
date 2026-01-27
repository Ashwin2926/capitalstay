import React from "react";
import { motion, type Variants } from "framer-motion";
import "./Loader.css";

/**
 * Variants must be typed as 'Variants' from framer-motion 
 * to avoid "property does not exist" errors in TSX.
 */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15 } 
  },
  exit: { 
    opacity: 0, 
    scale: 1.05,
    transition: { duration: 0.5, ease: "easeInOut" } 
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 12 } 
  }
};

const Loader: React.FC = () => {
  return (
    <motion.div
      className="loader-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      /* SEO/AI Optimization: Identifying the temporary state */
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* 1. Spinner (Decorative) */}
      <motion.div
        className="clean-futuristic-spinner"
        variants={itemVariants}
        aria-hidden="true" 
      />

      {/* 2. Main Title (Semantic for SEO) */}
      <motion.h1
        className="loader-text"
        variants={itemVariants}
      >
        Capital Stay
      </motion.h1>
      
      {/* 3. Subtext */}
      <motion.p
        className="text-highlight"
        variants={itemVariants}
      >
        DUBAI
      </motion.p>

      {/* 4. AI Search & Crawler Hidden Metadata */}
      <span className="sr-only">
        Capital Stay UAE - Luxury Holiday Home Rentals in Dubai. 
        Premium Short Term Stay Apartments.
      </span>
    </motion.div>
  );
};

export default Loader;