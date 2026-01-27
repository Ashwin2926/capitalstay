import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

/** * TYPES 
 */
interface Breadcrumb {
  name: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  backgroundImage?: string;
  children?: React.ReactNode;
}

const tokens = {
  colors: {
    darkBlue: '#1D2431',
    lightGray: '#E5E7EB',
    white: '#FFFFFF',
    orange: '#FB923C',
    bodyFade: '#F9FAFB',
  },
  spacing: {
    paddingTop: '120px',
    paddingBottom: '100px',
    maxWidth: '80rem',
    defaultPaddingX: '1.5rem',
    lgPaddingX: '2.5rem',
    mobilePaddingTop: '80px',
    mobilePaddingBottom: '60px',
  },
};

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  breadcrumbs, 
  backgroundImage, 
  children 
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Dynamic Styles ---

  const headerBaseStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    color: tokens.colors.white,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: backgroundImage
      ? `url(${backgroundImage})`
      : `linear-gradient(to bottom right, ${tokens.colors.darkBlue}, #374151)`,
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(29, 36, 49, 0.65)',
  };

  const contentWrapperStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    maxWidth: tokens.spacing.maxWidth,
    margin: '0 auto',
    paddingLeft: windowWidth >= 1024 ? tokens.spacing.lgPaddingX : tokens.spacing.defaultPaddingX,
    paddingRight: windowWidth >= 1024 ? tokens.spacing.lgPaddingX : tokens.spacing.defaultPaddingX,
    paddingTop: windowWidth >= 640 ? tokens.spacing.paddingTop : tokens.spacing.mobilePaddingTop,
    paddingBottom: windowWidth >= 640 ? tokens.spacing.paddingBottom : tokens.spacing.mobilePaddingBottom,
  };

  const titleStyle: React.CSSProperties = {
    marginTop: '1.5rem',
    fontSize: windowWidth >= 1024 ? '3rem' : windowWidth >= 640 ? '1.75rem' : '1.5rem',
    fontWeight: 600,
    lineHeight: 1.1,
    color: tokens.colors.white,
    textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    letterSpacing: '-0.025em',
  };

  const descriptionStyle: React.CSSProperties = {
    marginTop: '1rem',
    maxWidth: '48rem',
    fontSize: windowWidth >= 640 ? '1.25rem' : '1.125rem',
    color: tokens.colors.lightGray,
    lineHeight: 1.6,
    fontWeight: 300,
  };

  const breadcrumbLinkStyle = (isCurrent: boolean): React.CSSProperties => ({
    marginLeft: '0.5rem',
    transition: 'color 300ms',
    color: isCurrent ? tokens.colors.white : tokens.colors.lightGray,
    fontWeight: isCurrent ? 700 : 500,
    cursor: isCurrent ? 'default' : 'pointer',
    textDecoration: 'none',
  });

  return (
    <header style={headerBaseStyle}>
      <div style={overlayStyle}></div>

      <div style={contentWrapperStyle}>
        <nav aria-label="Breadcrumb">
          <ol style={{ 
            display: 'flex', 
            alignItems: 'center', 
            listStyle: 'none', 
            padding: 0, 
            margin: 0, 
            gap: '0.5rem', 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em' 
          }}>
            {breadcrumbs.map((crumb, index) => {
              const isCurrent = index === breadcrumbs.length - 1;
              return (
                <li key={crumb.name}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {index !== 0 && (
                      <ChevronRight 
                        size={16} 
                        style={{ color: tokens.colors.orange }} 
                      />
                    )}
                    <a
                      href={crumb.href}
                      style={breadcrumbLinkStyle(isCurrent)}
                      onClick={(e) => {
                        if (isCurrent) e.preventDefault();
                      }}
                    >
                      {crumb.name}
                    </a>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>

        <h1 style={titleStyle}>{title}</h1>

        <p style={descriptionStyle}>{description}</p>

        {children}
      </div>
    </header>
  );
};

export default PageHeader;