// import React, { useEffect, useState, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ResultsPage = () => {
//   const resultImage = "/assets/results.webp";
//   const [loading, setLoading] = useState(true);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [error, setError] = useState(null);
//   const scriptLoaded = useRef(false);
//   const [iframeHeight, setIframeHeight] = useState("900px");
//   const [showScroll, setShowScroll] = useState(false);

//   const adjustIframeHeight = () => {
//     const iframe = document.getElementById("apartmentIframe");
//     if (iframe && iframe.contentWindow) {
//       setIframeHeight(`${iframe.contentWindow.document.body.scrollHeight}px`);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("message", adjustIframeHeight);
//     return () => window.removeEventListener("message", adjustIframeHeight);
//   }, []);

//   useEffect(() => {
//     if (!imageLoaded) return;
//     const smoobuURL = "https://login.smoobu.com/en/booking-tool/iframe/720452";
//     const iframeContainer = document.getElementById("apartmentIframeAll");
//     if (iframeContainer) iframeContainer.innerHTML = "";
    
//     if (!scriptLoaded.current) {
//       scriptLoaded.current = true;
//       const script = document.createElement("script");
//       script.id = "smoobuScript";
//       script.src = "https://login.smoobu.com/js/Settings/BookingToolIframe.js";
//       script.async = true;
//       script.onload = () => {
//         if (window.BookingToolIframe) {
//           window.BookingToolIframe.initialize({
//             url: smoobuURL,
//             baseUrl: "https://login.smoobu.com",
//             target: "#apartmentIframeAll",
//           });
//           setLoading(false);
//         }
//       };
//       script.onerror = () => {
//         setError("Failed to load booking data. Please try again later.");
//         setLoading(false);
//       };
//       document.body.appendChild(script);
//     }
//   }, [imageLoaded]);

//   useEffect(() => {
//     const checkScroll = () => setShowScroll(window.scrollY > 300);
//     window.addEventListener("scroll", checkScroll);
//     return () => window.removeEventListener("scroll", checkScroll);
//   }, []);

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   return (
//     <div
//       className="results-page container-fluid d-flex justify-content-center align-items-start"
//       style={{
//         paddingTop: "150px",
//         minHeight: "100vh",
//         background: `url(${resultImage}) no-repeat center center/cover`,
//         position: "relative",
//       }}
//     >
//       {/* Overlay */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           background: "rgba(0, 0, 0, 0.5)",
//         }}
//       ></div>

//       <img src={resultImage} alt="background" style={{ display: "none" }} onLoad={() => setImageLoaded(true)} />

//       {imageLoaded && (
//         <div
//           className="bg-transparent p-4 rounded position-relative"
//           style={{ maxWidth: "1200px", width: "100%", textAlign: "center", margin: "0 auto", padding: "20px" }}
//         >
//             <h5
//   className="text-center mb-4 text-white"
//   style={{
//     fontSize: "1rem",
//     fontWeight: "bold",
//     letterSpacing: "2px",
//     textTransform: "uppercase",
//     background: "rgba(255, 255, 255, 0.1)", // Light overlay for contrast
//     padding: "10px 20px",
//     borderRadius: "8px", // Soft rounded edges
//     display: "inline-block", // Prevents full-width background
//     boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)", // Subtle glow effect
//   }}
// >
//   Book Now
// </h5>

//           <h2 className="text-center mb-4 text-white" style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase" }}>
//             Find Your Dream Apartment
//           </h2>
        
//           {loading ? (
//             <p className="text-center text-white">Loading available apartments...</p>
//           ) : error ? (
//             <p className="text-danger text-center">{error}</p>
//           ) : (
//             <div id="apartmentIframeAll" style={{
//                 display: "block",
//                 border: "none",
//                 borderRadius: "12px",
//                 overflow: "auto",
//                 margin: "0 auto",
//                 padding: "10px",
//                 transition: "min-height 0.3s ease",
//                 background: "rgba(33, 81, 185, 0.5)",
//                 maxWidth: "80%",
//                 width: "100%",
//                 maxHeight: "850px"
//               }}
//             ></div>
//           )}
//         </div>
//       )}

//       {showScroll && (
//         <button
//           onClick={scrollToTop}
//           style={{
//             position: "fixed",
//             bottom: "20px",
//             right: "20px",
//             backgroundColor: "#fff",
//             color: "#000",
//             padding: "10px 15px",
//             borderRadius: "50%",
//             border: "none",
//             cursor: "pointer",
//             boxShadow: "0px 4px 10px rgba(77, 106, 193, 0)"
//           }}
//         >
//           ↑
//         </button>
//       )}
//     </div>
//   );
// };

// export default ResultsPage;
