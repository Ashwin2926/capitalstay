import   { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './FloatingButtons.css';

const FloatingButtons = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

 
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle the "+" menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="floating-buttons">
      {/* Back to Top Button */}
      {showScroll && (
        <button className="back-to-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}

      {/* Floating Action Button */}
      <div className="fab-container">
        <button className="fab" onClick={toggleMenu}>
          +
        </button>
        {menuOpen && (
          <div className="fab-menu">
            <a
              href="https://wa.me/971547047913"  
              target="_blank"
              rel="noopener noreferrer"
              className="fab-icon whatsapp"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            {/* <a
              href="#chatra"
              className="fab-icon chatra"
            >
              <FontAwesomeIcon icon={faComments} />
            </a> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingButtons;
