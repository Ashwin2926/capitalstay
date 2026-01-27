import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Ampact.css";


const Ampact = () => {
  const natureImage = "/assets/nature.webp";
const diningImage = "/assets/dining.webp";
const beachImage = "/assets/beaches.webp";
  const cards = [
    {
      id: 1,
      image: natureImage,
      title: "Explore Nature’s Wonders",
      subtitle: "Pristine Landscapes",
      description:
        "Immerse yourself in the lush greenery and diverse wildlife that Raja Ampat offers.",
    },
    {
      id: 2,
      image: diningImage,
      title: "Luxurious Dining",
      subtitle: "Gourmet Experiences",
      description:
        "Indulge in world-class dining experiences with breathtaking ocean views.",
    },
    {
      id: 3,
      image: beachImage,
      title: "Idyllic Beaches",
      subtitle: "Crystal-Clear Waters",
      description:
        "Relax on the finest beaches, where turquoise waters meet golden sands.",
    },
  ];

  return (
    <div className="container-fluid p-5 raja-container">
      {/* Header Section */}
      <div className="row align-items-center mb-5">
        <div className="col-lg-6">
          <h6 className="section-subtitle text-primary">Capital Stay</h6>
          <h1 className="section-title">Discover the Beauty of Paradise</h1>
        </div>
        <div className="col-lg-6">
          <p className="section-description text-black">
            Explore Capital Stay’s stunning natural beauty, luxurious amenities,
            and breathtaking beaches—an experience like no other.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="row mt-4">
        {cards.map((card) => (
          <div key={card.id} className="col-lg-4 col-md-6 mb-4">
            <div className="feature-card">
              <img src={card.image} alt={card.title} className="feature-img" />
              <div className="card-content">
                <h3 className="text-primary">{card.title}</h3>
                <p className="text-white">{card.subtitle}</p>
                <span className="card-description">{card.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ampact;
