import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";

const whiteLogo = "/assets/logo_white.webp";
const darkLogo = "/assets/logo.webp";

const HOVER_COLOR_CLASS = "text-blue-500";
const HOVER_BG_CLASS = "hover:bg-blue-500/30";

// --- Types & Interfaces ---

interface SectionMappings {
  home: string;
  propertyManagement: string;
  furnishingSolutions: string;
  ourStory: string;
  clientReviews: string;
  meetTheTeam: string;
}

interface GuestServiceMappings {
  airportTransfer: string;
  maidServices: string;
  carRental: string;
  privateChef: string;
  yatchRentals: string;
}

type DropdownName = "landlord" | "guest" | "more" | null;

const sectionMappings: SectionMappings = {
  home: "/",
  propertyManagement: "landlord-services/property-management",
  furnishingSolutions: "landlord-services/furnishing-solutions",
  ourStory: "about-us",
  clientReviews: "testimonials",
  meetTheTeam: "team",
};

const guestServiceMappings: GuestServiceMappings = {
  airportTransfer: "services#airport-transfer",
  maidServices: "services#daily-maid-services",
  carRental: "services#car-rental",
  privateChef: "services#private-chef",
  yatchRentals: "services#yatch-rental-services"
};

const formatKey = (key: string) =>
  key.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase());

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  isActive: boolean;
  isLast: boolean;
  isGlassmorphic: boolean;
  isMobile: boolean;
  link?: string;
}

// --- Sub-Components ---

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  isActive,
  isLast,
  isGlassmorphic,
  isMobile,
  link,
}) => {
  const textColor = isGlassmorphic ? "text-white" : "text-black";

  const baseClasses =
    `block px-4 py-2 text-sm font-medium transition-colors duration-150 
     ${textColor} cursor-pointer
     no-underline !no-underline
     hover:!no-underline focus:!no-underline active:!no-underline
     hover:${textColor} focus:${textColor} visited:${textColor}`;

  const hoverBg =
    isGlassmorphic || isMobile
      ? "hover:bg-gray-100/10"
      : "hover:bg-gray-100";

  const divider = isLast ? "" : "border-b border-gray-100/60";
  const activeClass = isActive ? "font-semibold" : "";

  return (
    <a
      href={link || undefined}
      onClick={onClick}
      className={`${baseClasses} ${hoverBg} ${divider} ${activeClass}`}
      role="menuitem"
      tabIndex={0}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
};


// --- Main Component ---

interface NavbarProps {
  toggleForm: () => void;
  isScrolled: boolean;
}

export default function Navbar({ toggleForm, isScrolled }: NavbarProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHomePage = location.pathname === "/";
  const currentPath = location.pathname.startsWith('/') ? location.pathname.substring(1) : location.pathname;

  const navRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLButtonElement>(null);
  const landlordDropdownRef = useRef<HTMLLIElement>(null);
  const guestDropdownRef = useRef<HTMLLIElement>(null);
  const aboutDropdownRef = useRef<HTMLLIElement>(null);

  const toggleNav = () => {
    const newState = !isNavOpen;
    setIsNavOpen(newState);
    if (newState) setOpenDropdown(null);
    document.body.style.overflow = newState ? "hidden" : "auto";
  };

  const closeNav = () => {
    setIsNavOpen(false);
    setOpenDropdown(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (isNavOpen) {
        if (
          navRef.current && !navRef.current.contains(target) &&
          togglerRef.current && !togglerRef.current.contains(target)
        ) {
          closeNav();
          return;
        }
      }

      if (!isNavOpen && openDropdown) {
        const dropdownRefs: Record<string, HTMLElement | null> = {
          landlord: landlordDropdownRef.current,
          guest: guestDropdownRef.current,
          more: aboutDropdownRef.current,
        };
        
        if (dropdownRefs[openDropdown] && !dropdownRefs[openDropdown]?.contains(target)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isNavOpen, openDropdown]);

  const handleLinkClick = (
    e: React.MouseEvent, 
    key: keyof SectionMappings | keyof GuestServiceMappings
  ) => {
    e.preventDefault();
    closeNav(); 
    
    const sectionTarget = sectionMappings[key as keyof SectionMappings];
    const guestTarget = guestServiceMappings[key as keyof GuestServiceMappings];
    const target = sectionTarget || guestTarget;

    if (!target) return;

    if (["ourStory", "clientReviews"].includes(key)) {
      navigate(`/#${target}`);
      return;
    }
    
    if (key === "home") {
      navigate("/");
      return;
    }

    if (guestTarget) {
      const [path, hash] = guestTarget.split("#");
      navigate(`/${path}${hash ? `#${hash}` : ""}`);
      return;
    }

    navigate(`/${target}`);
  };

  const handleListProperty = (e: React.MouseEvent) => {
      e.preventDefault();
      closeNav(); 
      toggleForm();
  };

  const toggleDropdown = (dropdownName: DropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };
  
  const isGlassmorphic = isHomePage && !isScrolled;
  const isTransparent = isHomePage && !isScrolled && !isNavOpen;
  const logoSrc = isTransparent ? whiteLogo : darkLogo;
  const togglerColor = isNavOpen ? "white" : (isTransparent ? "white" : "black");

  const base = "fixed top-0 w-full z-[9999] transition-all duration-300 ease-in-out flex items-center";
  const heightClass = isTransparent ? "h-[80px]" : "h-[60px]";
  const bgClass = isTransparent ? "bg-transparent text-white" : "bg-white/95 backdrop-blur-md text-[#333] shadow-md";

  const linkBase = `uppercase text-sm px-3 py-2 cursor-pointer transition-all duration-200 no-underline`;
  const mobileLinkBase = `text-white py-3 text-lg uppercase transition-colors duration-200 block no-underline`;
  const mobileDropdownContainer = `w-full pl-4 mt-2 mb-4 bg-gray-900/80 backdrop-blur-sm rounded-lg`; 
  
  const desktopDropdownClass = isGlassmorphic
    ? `absolute top-full mt-2 min-w-[240px] bg-white/10 text-white rounded-lg shadow-xl overflow-hidden backdrop-blur-lg border border-white/20`
    : `absolute top-full mt-2 min-w-[240px] bg-white text-[#333] rounded-lg shadow-xl overflow-hidden border border-gray-100`;

  const getNavLinkClasses = (isActive: boolean) => {
    const baseBorderColor = isTransparent ? "border-white" : "border-gray-900";
    return `${linkBase} ${isActive ? `font-bold border-b-2 ${baseBorderColor} lg:border-blue-500` : `font-medium` } hover:${HOVER_COLOR_CLASS} no-underline`;
  };

  const isHomeActive = currentPath === "";
  const isLandlordActive = currentPath.startsWith("landlord-services");
  const isGuestActive = currentPath.startsWith("services");
  const isAboutActive = ["about-us", "testimonials", "team"].includes(currentPath);
  
  return (
    <nav className={`${base} ${heightClass} ${bgClass}`}>
      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        <a href="/" onClick={e => handleLinkClick(e, "home")}>
          <img 
            src={logoSrc} 
            alt="Capital Stay Logo" 
            className={`transition-all duration-300 ${isTransparent ? 'h-[70px]' : 'h-[50px]'}`} 
          />
        </a>

        <button ref={togglerRef} className="lg:hidden z-[10000] p-2" onClick={toggleNav}>
          {isNavOpen ? <FaTimes size={24} color={togglerColor} /> : <FaBars size={24} color={togglerColor} />}
        </button>

        <div
          ref={navRef}
          className={`
            lg:flex lg:items-center lg:w-auto
            ${isNavOpen 
              ? "fixed top-0 right-0 w-[85%] max-w-sm h-screen pt-24 pb-8 px-6 overflow-y-auto bg-black/90 backdrop-blur-md flex flex-col items-start text-white transition-transform duration-300 transform translate-x-0" 
              : "hidden lg:translate-x-0"}
          `}
        >
          <ul className="lg:flex lg:space-x-1 lg:items-center w-full lg:w-auto">
            <li>
              <button 
                className={getNavLinkClasses(isHomeActive)} 
                onClick={e => handleLinkClick(e, "home")}
              >
                Home
              </button>
            </li>

            <li className="relative w-full lg:w-auto" ref={landlordDropdownRef}>
              <button
                className={`${isNavOpen ? mobileLinkBase : getNavLinkClasses(isLandlordActive)} flex items-center justify-between lg:justify-start w-full hover:${HOVER_COLOR_CLASS}`}
                onClick={() => toggleDropdown("landlord")}
              >
               Landlord Services<FaAngleDown className={`ml-1 transition-transform duration-200 ${openDropdown === "landlord" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "landlord" && (
                <div className={`${isNavOpen ? mobileDropdownContainer : desktopDropdownClass}`}>
                    <DropdownItem 
                        onClick={e => handleLinkClick(e, "propertyManagement")}
                        isActive={currentPath === sectionMappings.propertyManagement}
                        isLast={false} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}
                    >Property Management</DropdownItem>
                    <DropdownItem 
                        onClick={e => handleLinkClick(e, "furnishingSolutions")}
                        isActive={currentPath === sectionMappings.furnishingSolutions}
                        isLast={false} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}
                    >Furnishing Solutions</DropdownItem>
                    <DropdownItem 
                        onClick={handleListProperty}
                        isActive={false}
                        isLast={false} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}
                    >List Your Property</DropdownItem>
                    <DropdownItem 
                        link="https://dashboard.hostaway.com/login"
                        isActive={false}
                        isLast={true} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}
                    >Login</DropdownItem>
                </div>
              )}
            </li>

            <li className="relative w-full lg:w-auto" ref={guestDropdownRef}>
              <button
                className={`${isNavOpen ? mobileLinkBase : getNavLinkClasses(isGuestActive)} flex items-center justify-between lg:justify-start w-full hover:${HOVER_COLOR_CLASS}`}
                onClick={() => toggleDropdown("guest")}
              >
                Guest Services <FaAngleDown className={`ml-1 transition-transform duration-200 ${openDropdown === "guest" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "guest" && (
                <div className={`${isNavOpen ? mobileDropdownContainer : desktopDropdownClass}`}>
                  {Object.keys(guestServiceMappings).map((key, index, arr) => (
                    <DropdownItem 
                        key={key} 
                        onClick={e => handleLinkClick(e, key as keyof GuestServiceMappings)}
                        isActive={location.hash.includes(guestServiceMappings[key as keyof GuestServiceMappings].split('#')[1])}
                        isLast={index === arr.length - 1}
                        isGlassmorphic={!isNavOpen && isGlassmorphic}
                        isMobile={isNavOpen}
                    >
                      {formatKey(key)}
                    </DropdownItem>
                  ))}
                </div>
              )}
            </li>

            <li className="relative w-full lg:w-auto" ref={aboutDropdownRef}>
              <button
                className={`${isNavOpen ? mobileLinkBase : getNavLinkClasses(isAboutActive)} flex items-center justify-between lg:justify-start w-full hover:${HOVER_COLOR_CLASS}`}
                onClick={() => toggleDropdown("more")}
              >
                About <FaAngleDown className={`ml-1 transition-transform duration-200 ${openDropdown === "more" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "more" && (
                <div className={`${isNavOpen ? mobileDropdownContainer : `${desktopDropdownClass} lg:right-0 lg:left-auto`}`}>
                    <DropdownItem 
                      onClick={e => handleLinkClick(e, "ourStory")}
                      isActive={currentPath === sectionMappings.ourStory}
                      isLast={false} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}
                    >Our Story</DropdownItem>
                    <DropdownItem 
                      onClick={e => handleLinkClick(e, "clientReviews")}
                      isActive={currentPath === sectionMappings.clientReviews}
                      isLast={false} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}
                    >Client Reviews</DropdownItem>
                    <DropdownItem 
                      onClick={e => handleLinkClick(e, "meetTheTeam")}
                      isActive={currentPath === sectionMappings.meetTheTeam}
                      isLast={true} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}
                    >Meet The Team</DropdownItem>
                </div>
              )}
            </li>
          </ul>
          
          {isNavOpen && (
            <div className="mt-8 w-full">
              <button
                onClick={() => { closeNav(); toggleForm(); }}
                className={`w-full py-3 text-lg font-bold uppercase rounded-md transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600`}
              >
                Contact Us
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}