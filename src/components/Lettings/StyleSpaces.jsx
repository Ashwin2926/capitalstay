import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion"; // For animations
import "./Spaces.css"; // Import the updated custom styles

function StyleSpaces() {
  // Ensure the paths are correct relative to your project structure
  const card1 = "/assets/styles/villa.webp";
  const card2 = "/assets/styles/calm.webp";
  const card3 = "/assets/styles/water.webp";
  const card4 = "/assets/styles/city.webp";
  const card5 = "/assets/styles/mountains.webp";

  const spaces = [
    { image: card1, title: "Luxury Villa" }, // Updated title for premium feel
    { image: card2, title: "Serene & Elegant" }, // Updated title
    { image: card3, title: "Waterfront Living" }, // Updated title
    { image: card4, title: "Urban Chic" }, // Updated title
    { image: card5, title: "Mountain Retreat" }, // Updated title
  ];

  // Animation variants for staggering and appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger the animation of children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };


  return (
    <motion.div
      id="style-spaces"
      className="container-fluid py-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-center fw-bold mb-2 modern-heading refined-heading">
         Spaces that Match Your Style
      </h3>
      <motion.div className="spaces-grid">
        {spaces.map((space, index) => (
          <motion.div
            className="card space-card"
            key={index}
            variants={itemVariants} // Apply item variants
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Keep hover effect
          >
            <div className="image-container">
              <img
                src={space.image}
                className="card-img-top rounded image-hover"
                alt={`Image of ${space.title}`}
                // Styles moved to CSS for better separation of concerns
              />
              <div className="image-overlay"></div>
            </div>
            <div className="card-body"> {/* Text alignment moved to CSS */}
              <h5 className="card-title fw-bold"> {/* Gradient badge styling moved to CSS */}
                {space.title}
              </h5>
         
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default StyleSpaces;
