import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SITE_URL } from "../lib/seo";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";

const whiteLogo = "/assets/logo_white.webp";

const HOVER_COLOR_CLASS = "text-blue-500";

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
  yatchRentals: "services#yatch-rental-services",
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
  link,
}) => {
  const baseClasses =
    "block px-4 py-2.5 text-sm font-medium transition-colors duration-150 text-white/90 cursor-pointer no-underline hover:!no-underline focus:!no-underline active:!no-underline";

  const hoverBg = "hover:bg-white/10";
  const divider = isLast ? "" : "border-b border-white/10";
  const activeClass = isActive ? "font-semibold text-white" : "";

  return (
    <a
      href={link}
      onClick={onClick}
      className={`${baseClasses} ${hoverBg} ${divider} ${activeClass}`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
};

// --- SEO / AEO Site Navigation Schema ---

const SiteNavigationSchema = () => (
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      hasPart: [
        {
          "@type": "WebPage",
          name: "Dubai Holiday Home Management",
          url: `${SITE_URL}/landlord-services/property-management`,
        },
        {
          "@type": "WebPage",
          name: "Dubai Furnishing Solutions",
          url: `${SITE_URL}/landlord-services/furnishing-solutions`,
        },
        {
          "@type": "WebPage",
          name: "Luxury Guest Services",
          url: `${SITE_URL}/services`,
        },
      ],
    })}
  </script>
);

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
  const currentPath = location.pathname.startsWith("/")
    ? location.pathname.substring(1)
    : location.pathname;

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

    if (["ourStory", "clientReviews"].includes(key as string)) {
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

  const base = "fixed top-0 w-full z-[9999] transition-all duration-300 ease-in-out flex items-center";
  const heightClass = isTransparent ? "h-20" : "h-16";
  const bgClass = isTransparent
    ? "bg-transparent text-white"
    : "bg-slate-900/92 backdrop-blur-md text-white shadow-lg";

  const linkBase = "uppercase text-[0.7rem] tracking-[0.12em] px-2.5 py-2 cursor-pointer transition-all duration-200 no-underline";
  const mobileLinkBase = "text-white py-3 text-lg uppercase tracking-wide transition-colors duration-200 block no-underline";
  const mobileDropdownContainer = "w-full pl-4 mt-2 mb-4 bg-white/5 backdrop-blur-sm rounded-lg";

  const desktopDropdownClass = "absolute top-full mt-2 min-w-[240px] bg-slate-900/95 text-white rounded-lg shadow-xl overflow-hidden backdrop-blur-lg border border-white/10";

  const desktopDropdownRightAligned = `${desktopDropdownClass} right-0 left-auto`;

  const getNavLinkClasses = (isActive: boolean) => {
    return `${linkBase} ${isActive ? "font-semibold border-b border-blue-500 text-white" : "font-medium text-white/80"} hover:${HOVER_COLOR_CLASS}`;
  };

  const isHomeActive = currentPath === "";
  const isLandlordActive = currentPath.startsWith("landlord-services");
  const isGuestActive = currentPath.startsWith("services");
  const isAboutActive = ["about-us", "testimonials", "team"].includes(currentPath);

  return (
    <nav className={`${base} ${heightClass} ${bgClass}`} role="navigation" aria-label="Main Navigation">
      <SiteNavigationSchema />

      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        <a href="/" onClick={(e) => handleLinkClick(e, "home")} aria-label="Capital Stay UAE Homepage">
          <img src={whiteLogo} alt="Capital Stay UAE Holiday Homes" className={`transition-all ${isTransparent ? "h-10" : "h-8"}`} />
        </a>

        <button
          ref={togglerRef}
          className="lg:hidden z-[10000] p-2"
          onClick={toggleNav}
          aria-expanded={isNavOpen}
          aria-label={isNavOpen ? "Close Menu" : "Open Dubai Travel Menu"}
        >
          {isNavOpen ? <FaTimes size={24} color="white" /> : <FaBars size={24} color="white" />}
        </button>

        <div
          ref={navRef}
          className={`lg:flex lg:items-center lg:w-auto ${isNavOpen ? "fixed top-0 right-0 w-[85%] max-w-sm h-screen pt-24 pb-8 px-6 overflow-y-auto bg-black/90 backdrop-blur-md flex flex-col items-start text-white" : "hidden"}`}
        >
          <ul className="lg:flex lg:space-x-1 lg:items-center w-full lg:w-auto">
            <li>
              <button className={getNavLinkClasses(isHomeActive)} onClick={(e) => handleLinkClick(e, "home")}>Home</button>
            </li>

            <li className="relative w-full lg:w-auto" ref={landlordDropdownRef}>
              <button className={`${isNavOpen ? mobileLinkBase : getNavLinkClasses(isLandlordActive)} flex items-center`} onClick={() => toggleDropdown("landlord")} aria-expanded={openDropdown === "landlord"}>
                Landlord Services <FaAngleDown className={`ml-1 ${openDropdown === "landlord" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "landlord" && (
                <div className={isNavOpen ? mobileDropdownContainer : desktopDropdownRightAligned}>
                  <DropdownItem onClick={(e) => handleLinkClick(e, "propertyManagement")} isActive={false} isLast={false} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}>
                    <strong>Property Management</strong>
                    <span className="block text-xs opacity-75">DTCM-Licensed ROI Optimization</span>
                  </DropdownItem>
                  <DropdownItem onClick={(e) => handleLinkClick(e, "furnishingSolutions")} isActive={false} isLast={false} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}>
                    <strong>Furnishing & Design</strong>
                    <span className="block text-xs opacity-75">Bespoke Holiday Home Interior Curation</span>
                  </DropdownItem>
                  <DropdownItem onClick={handleListProperty} isActive={false} isLast={false} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}>
                    <strong>List Your Property</strong>
                    <span className="block text-xs opacity-75">Earn ROI with DTCM‑Licensed Holiday Home Management</span>
                  </DropdownItem>
                  <DropdownItem link="https://dashboard.hostaway.com/login" isActive={false} isLast={true} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}>
                    <strong>Owner Login</strong>
                    <span className="block text-xs opacity-75">Secure Property Performance Dashboard</span>
                  </DropdownItem>
                </div>
              )}
            </li>

            <li className="relative w-full lg:w-auto" ref={guestDropdownRef}>
              <button className={`${isNavOpen ? mobileLinkBase : getNavLinkClasses(isGuestActive)} flex items-center`} onClick={() => toggleDropdown("guest")} aria-expanded={openDropdown === "guest"}>
                Guest Services <FaAngleDown className={`ml-1 ${openDropdown === "guest" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "guest" && (
                <div className={isNavOpen ? mobileDropdownContainer : desktopDropdownRightAligned}>
                  {Object.keys(guestServiceMappings).map((key, index, arr) => (
                    <DropdownItem key={key} onClick={(e) => handleLinkClick(e, key as keyof GuestServiceMappings)} isActive={false} isLast={index === arr.length - 1} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}>
                      {formatKey(key)}
                    </DropdownItem>
                  ))}
                </div>
              )}
            </li>

            <li className="relative w-full lg:w-auto" ref={aboutDropdownRef}>
              <button className={`${isNavOpen ? mobileLinkBase : getNavLinkClasses(isAboutActive)} flex items-center`} onClick={() => toggleDropdown("more")} aria-expanded={openDropdown === "more"}>
                About <FaAngleDown className={`ml-1 ${openDropdown === "more" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "more" && (
                <div className={isNavOpen ? mobileDropdownContainer : desktopDropdownRightAligned}>
                  <DropdownItem onClick={(e) => handleLinkClick(e, "ourStory")} isActive={false} isLast={false} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}>Our Story</DropdownItem>
                  <DropdownItem onClick={(e) => handleLinkClick(e, "clientReviews")} isActive={false} isLast={false} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}>Client Reviews</DropdownItem>
                  <DropdownItem onClick={(e) => handleLinkClick(e, "meetTheTeam")} isActive={false} isLast={true} isGlassmorphic={!isNavOpen && isGlassmorphic} isMobile={isNavOpen}>Meet The Team</DropdownItem>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
