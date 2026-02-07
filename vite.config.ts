import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { COMPLETE_PROPERTY_DATA } from './src/components/lib/locations';
import Sitemap from 'vite-plugin-sitemap';

const neighborhoodRoutes = Object.keys(COMPLETE_PROPERTY_DATA).map(
  (key) => `/locations/${key}`
);
// 2. Define static routes and important Hostaway links
const externalAndStaticRoutes = [
  '/',
  '/about-us',
  '/contact-us',
  '/explore',
  '/management',
  '/luxury-apartments-in-arabian-ranches',
  '/luxury-apartments-in-dubai-marina',
  '/luxury-apartments-in-downtown-dubai',
  '/luxury-apartments-in-palm-jumeirah',
'/Luxury-Apartments-in-Business-Bay/',
'/Luxury-Apartments-in-al-barsha',
'/Luxury-Apartments-in-al-furjan',
'/Luxury-Apartments-in-deira',
'/Luxury-Apartments-in-al-quoz',
'/Luxury-Apartments-in-dubai-creek',
'/Luxury-Apartments-in-dubai-international-financial-centre-difc',
'/Luxury-Apartments-in-dubai-investment-park',
'/Luxury-Apartments-in-dubai-silicon-oasis',
'/Luxury-Apartments-in-dubai-sports-city',
'/Luxury-Apartments-in-fujairah',
'/Luxury-Apartments-in-green-community',
'/Luxury-Apartments-in-jumeirah-lakes-towers-jlt',
'/Luxury-Apartments-in-jumeirah-village-circle-jvc',
'/Luxury-Apartments-in-palm-jumeirah',
'/Luxury-Apartments-in-ras-al-khaimah',
'/Luxury-Apartments-in-sharjah',
'/Luxury-Apartments-in-the-greens-and-views',
'/Luxury-Apartments-in-umm-al-quwain',
'/Luxury-Apartments-in-abu-dhabi',
  'https://booking.capitalstayuae.com/',
  'https://booking.capitalstayuae.com/privacy-policy',
  'https://booking.capitalstayuae.com/terms-and-conditions'
];
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    Sitemap({
      hostname: 'https://capitalstayuae.com',
      dynamicRoutes: [
        ...neighborhoodRoutes,
        ...externalAndStaticRoutes
      ],
      // This creates a clean sitemap.xml in your /dist folder on build
      generateRobotsTxt: true, 
      readable: true,
    }),
  ],
})
