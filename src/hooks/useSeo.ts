import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'realestate';
}

export const useSeo = ({ title, description, keywords, image, type = 'website' }: SeoOptions) => {
  useEffect(() => {
    const siteName = "Capital Stay UAE";
    const fullTitle = `${title} | ${siteName}`;
    const url = window.location.href;

    document.title = fullTitle;

    const metaConfigs = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || "Dubai holiday homes, property management Dubai, short term rental ROI" },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image || '/assets/og-default.jpg' },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { name: 'twitter:card', content: 'summary_large_image' },
    ];

    metaConfigs.forEach(config => {
      const selector = config.name ? `meta[name="${config.name}"]` : `meta[property="${config.property}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (config.name) element.setAttribute('name', config.name);
        if (config.property) element.setAttribute('property', config.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', config.content);
    });

    // Handle Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [title, description, keywords, image, type]);
};